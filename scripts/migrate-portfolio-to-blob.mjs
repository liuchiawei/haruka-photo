import { createReadStream } from "node:fs";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { del, list, put } from "@vercel/blob";

const PORTFOLIO_PREFIX = "portfolio/";
const MANIFEST_PATH = "portfolio/manifest.json";
const LOCAL_DIR = path.join(process.cwd(), "public/images/portfolio");
const CONCURRENCY = 5;

function sortImagesByIndex(a, b) {
  const numA = parseInt(a.match(/(\d+)/)?.[1] ?? "0", 10);
  const numB = parseInt(b.match(/(\d+)/)?.[1] ?? "0", 10);
  return numA - numB;
}

async function collectJpgs(dir, relative = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const nextRelative = relative ? `${relative}/${entry.name}` : entry.name;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectJpgs(fullPath, nextRelative)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".jpg")) {
      files.push({
        filename: entry.name,
        relativePath: nextRelative,
        categoryKey: path.posix.dirname(nextRelative),
        localPath: fullPath,
      });
    }
  }

  return files;
}

async function listAllBlobs(prefix) {
  const blobs = [];
  let cursor;

  do {
    const result = await list({ prefix, cursor });
    blobs.push(...result.blobs);
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  return blobs;
}

async function mapPool(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, () => worker()),
  );

  return results;
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID) {
    throw new Error("Missing Blob credentials. Run with --env-file=.env.local");
  }

  let files;
  try {
    files = await collectJpgs(LOCAL_DIR);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      throw new Error(`No local portfolio images found at ${LOCAL_DIR}`);
    }
    throw error;
  }

  files.sort((a, b) => {
    const categoryCmp = a.categoryKey.localeCompare(b.categoryKey);
    if (categoryCmp !== 0) {
      return categoryCmp;
    }
    return sortImagesByIndex(a.filename, b.filename);
  });

  if (files.length === 0) {
    throw new Error(`No local portfolio images found at ${LOCAL_DIR}`);
  }

  console.log(`Uploading ${files.length} images to Vercel Blob...`);

  const uploaded = await mapPool(files, CONCURRENCY, async (file, index) => {
    const pathname = `${PORTFOLIO_PREFIX}${file.relativePath}`;
    const blob = await put(pathname, createReadStream(file.localPath), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "image/jpeg",
    });

    console.log(`[${index + 1}/${files.length}] ${pathname}`);

    return {
      pathname: blob.pathname,
      url: blob.url,
      categoryKey: file.categoryKey,
    };
  });

  const categories = {};
  for (const image of uploaded) {
    const current = categories[image.categoryKey] ?? [];
    current.push({ pathname: image.pathname, url: image.url });
    categories[image.categoryKey] = current;
  }

  const manifest = { version: 1, categories };
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
  console.log(`Wrote ${MANIFEST_PATH}`);

  const keep = new Set(uploaded.map((image) => image.pathname));
  keep.add(MANIFEST_PATH);

  const existing = await listAllBlobs(PORTFOLIO_PREFIX);
  const extra = existing.filter((blob) => !keep.has(blob.pathname));

  if (extra.length > 0) {
    await del(extra.map((blob) => blob.url));
    console.log(`Deleted ${extra.length} extra blob(s)`);
  }

  console.log("Migration complete.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
