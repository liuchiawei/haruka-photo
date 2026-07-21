import fs from "fs";
import path from "path";

export const PORTFOLIO_SLUGS = [
  "event",
  "documentary",
  "street",
  "portrait",
  "other",
] as const;

export type PortfolioSlug = (typeof PORTFOLIO_SLUGS)[number];

export type PortfolioCategory = {
  slug: PortfolioSlug;
  images: string[];
  cover: string;
};

const PORTFOLIO_DIR = path.join(process.cwd(), "public/images/portfolio");

export function isPortfolioSlug(slug: string): slug is PortfolioSlug {
  return (PORTFOLIO_SLUGS as readonly string[]).includes(slug);
}

function sortImagesByIndex(a: string, b: string): number {
  const numA = parseInt(a.match(/(\d+)/)?.[1] ?? "0", 10);
  const numB = parseInt(b.match(/(\d+)/)?.[1] ?? "0", 10);
  return numA - numB;
}

export function getCategoryImages(slug: PortfolioSlug): string[] {
  const dir = path.join(PORTFOLIO_DIR, slug);

  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".jpg"))
    .sort(sortImagesByIndex)
    .map((file) => `/images/portfolio/${slug}/${file}`);
}

export function getPortfolioCategories(): PortfolioCategory[] {
  return PORTFOLIO_SLUGS.map((slug) => {
    const images = getCategoryImages(slug);
    return {
      slug,
      images,
      cover: images[0] ?? "",
    };
  }).filter((category) => category.images.length > 0);
}
