import { cache } from "react";
import { del, get, list, put, type ListBlobResultBlob } from "@vercel/blob";

export const PORTFOLIO_PREFIX = "portfolio/";
export const MANIFEST_PATH = "portfolio/manifest.json";

export type ManifestEntry = {
  pathname: string;
  url: string;
};

export type PortfolioManifest = {
  version: 1;
  categories: Record<string, ManifestEntry[]>;
};

export type DashboardImage = {
  url: string;
  pathname: string;
  categoryKey: string;
};

function emptyManifest(): PortfolioManifest {
  return { version: 1, categories: {} };
}

export function hasBlobCredentials(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID,
  );
}

export function categoryKeyFromPathname(pathname: string): string | null {
  const relative = pathname.startsWith(PORTFOLIO_PREFIX)
    ? pathname.slice(PORTFOLIO_PREFIX.length)
    : pathname;

  if (relative === "manifest.json" || relative.endsWith("/manifest.json")) {
    return null;
  }

  const parts = relative.split("/").filter(Boolean);
  if (parts.length < 2) {
    return null;
  }

  return parts.slice(0, -1).join("/");
}

function isManifestEntry(item: unknown): item is ManifestEntry {
  return Boolean(
    item &&
      typeof item === "object" &&
      typeof (item as ManifestEntry).pathname === "string" &&
      typeof (item as ManifestEntry).url === "string",
  );
}

function parseManifest(raw: unknown): PortfolioManifest {
  if (!raw || typeof raw !== "object") {
    return emptyManifest();
  }

  const categories = (raw as { categories?: unknown }).categories;
  if (!categories || typeof categories !== "object") {
    return emptyManifest();
  }

  const result: Record<string, ManifestEntry[]> = {};
  for (const [key, value] of Object.entries(categories)) {
    if (Array.isArray(value) && value.every(isManifestEntry)) {
      result[key] = value;
    }
  }

  return { version: 1, categories: result };
}

async function listAllBlobs(prefix: string): Promise<ListBlobResultBlob[]> {
  const blobs: ListBlobResultBlob[] = [];
  let cursor: string | undefined;

  do {
    const result = await list({ prefix, cursor });
    blobs.push(...result.blobs);
    cursor = result.hasMore ? result.cursor : undefined;
  } while (cursor);

  return blobs;
}

export async function listPortfolioImages(): Promise<ListBlobResultBlob[]> {
  if (!hasBlobCredentials()) {
    return [];
  }

  try {
    const blobs = await listAllBlobs(PORTFOLIO_PREFIX);
    return blobs.filter(
      (blob) =>
        blob.pathname !== MANIFEST_PATH &&
        !blob.pathname.endsWith("/manifest.json"),
    );
  } catch {
    return [];
  }
}

export async function readManifest(): Promise<PortfolioManifest> {
  if (!hasBlobCredentials()) {
    return emptyManifest();
  }

  try {
    const result = await get(MANIFEST_PATH, {
      access: "public",
      useCache: false,
    });

    if (!result || result.statusCode !== 200) {
      return emptyManifest();
    }

    const text = await new Response(result.stream).text();
    return parseManifest(JSON.parse(text) as unknown);
  } catch {
    return emptyManifest();
  }
}

export async function writeManifest(manifest: PortfolioManifest): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export const getDashboardImages = cache(async (): Promise<DashboardImage[]> => {
  const [manifest, blobs] = await Promise.all([
    readManifest(),
    listPortfolioImages(),
  ]);

  const byPathname = new Map(blobs.map((blob) => [blob.pathname, blob]));
  const used = new Set<string>();
  const ordered: DashboardImage[] = [];

  for (const [categoryKey, entries] of Object.entries(manifest.categories)) {
    for (const entry of entries) {
      used.add(entry.pathname);
      ordered.push({
        url: byPathname.get(entry.pathname)?.url ?? entry.url,
        pathname: entry.pathname,
        categoryKey,
      });
    }
  }

  for (const blob of blobs) {
    if (used.has(blob.pathname)) {
      continue;
    }

    const categoryKey = categoryKeyFromPathname(blob.pathname);
    if (!categoryKey) {
      continue;
    }

    ordered.push({
      url: blob.url,
      pathname: blob.pathname,
      categoryKey,
    });
  }

  return ordered;
});

export async function getBlobUrlsForKey(categoryKey: string): Promise<string[]> {
  const images = await getDashboardImages();
  return images
    .filter((image) => image.categoryKey === categoryKey)
    .map((image) => image.url);
}

export async function deletePortfolioBlob(url: string): Promise<void> {
  await del(url);
}
