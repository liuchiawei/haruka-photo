"use server";

import { requireAdmin } from "@/lib/auth";
import {
  deletePortfolioBlob,
  readManifest,
  writeManifest,
} from "@/lib/blob-portfolio";
import { isValidCategoryKey } from "@/lib/portfolio";
import { revalidatePortfolioPaths } from "@/lib/revalidate-portfolio";

type UploadedImageInput = {
  url: string;
  pathname: string;
  categoryKey: string;
};

export async function registerUploadedImages(images: UploadedImageInput[]) {
  await requireAdmin();

  if (images.length === 0) {
    return { ok: true as const };
  }

  for (const image of images) {
    if (!isValidCategoryKey(image.categoryKey)) {
      throw new Error("Invalid category");
    }
  }

  const manifest = await readManifest();

  for (const image of images) {
    const current = manifest.categories[image.categoryKey] ?? [];
    if (!current.some((entry) => entry.pathname === image.pathname)) {
      current.push({ pathname: image.pathname, url: image.url });
    }
    manifest.categories[image.categoryKey] = current;
  }

  await writeManifest(manifest);

  const keys = new Set(images.map((image) => image.categoryKey));
  for (const key of keys) {
    revalidatePortfolioPaths(key);
  }

  return { ok: true as const };
}

export async function deleteImage(input: {
  url: string;
  pathname: string;
  categoryKey: string;
}) {
  await requireAdmin();

  if (!isValidCategoryKey(input.categoryKey)) {
    throw new Error("Invalid category");
  }

  await deletePortfolioBlob(input.url);

  const manifest = await readManifest();
  const current = manifest.categories[input.categoryKey] ?? [];
  manifest.categories[input.categoryKey] = current.filter(
    (entry) => entry.pathname !== input.pathname,
  );
  await writeManifest(manifest);
  revalidatePortfolioPaths(input.categoryKey);

  return { ok: true as const };
}

export async function reorderImages(categoryKey: string, pathnames: string[]) {
  await requireAdmin();

  if (!isValidCategoryKey(categoryKey)) {
    throw new Error("Invalid category");
  }

  const manifest = await readManifest();
  const current = manifest.categories[categoryKey] ?? [];
  const byPathname = new Map(current.map((entry) => [entry.pathname, entry]));
  manifest.categories[categoryKey] = pathnames.flatMap((pathname) => {
    const entry = byPathname.get(pathname);
    return entry ? [entry] : [];
  });
  await writeManifest(manifest);
  revalidatePortfolioPaths(categoryKey);

  return { ok: true as const };
}
