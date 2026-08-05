import fs from "fs";
import path from "path";

export const PORTFOLIO = {
  portrait: {
    children: ["studio", "location", "documentary"] as const,
  },
  documentary: {},
  architecture: {},
  street: {},
  event: {},
} as const;

export type PortfolioSlug = keyof typeof PORTFOLIO;

export const PORTFOLIO_SLUGS = Object.keys(PORTFOLIO) as PortfolioSlug[];

export type PortfolioSubSlug = (typeof PORTFOLIO)["portrait"]["children"][number];

export type PortfolioCategory = {
  slug: PortfolioSlug;
  images: string[];
  cover: string;
};

export type PortfolioSubcategory = {
  slug: PortfolioSubSlug;
  images: string[];
  cover: string;
};

const PORTFOLIO_DIR = path.join(process.cwd(), "public/images/portfolio");

export function isPortfolioSlug(slug: string): slug is PortfolioSlug {
  return slug in PORTFOLIO;
}

export function getCategoryChildren(
  slug: PortfolioSlug,
): readonly PortfolioSubSlug[] {
  const entry = PORTFOLIO[slug];
  if ("children" in entry) {
    return entry.children;
  }
  return [];
}

export function hasChildren(slug: PortfolioSlug): boolean {
  return getCategoryChildren(slug).length > 0;
}

export function isPortfolioSubSlug(
  category: PortfolioSlug,
  sub: string,
): sub is PortfolioSubSlug {
  return (getCategoryChildren(category) as readonly string[]).includes(sub);
}

function sortImagesByIndex(a: string, b: string): number {
  const numA = parseInt(a.match(/(\d+)/)?.[1] ?? "0", 10);
  const numB = parseInt(b.match(/(\d+)/)?.[1] ?? "0", 10);
  return numA - numB;
}

function resolveDir(...segments: string[]): string | null {
  if (!fs.existsSync(PORTFOLIO_DIR)) {
    return null;
  }

  const exactDir = path.join(PORTFOLIO_DIR, ...segments);
  if (fs.existsSync(exactDir)) {
    return exactDir;
  }

  return null;
}

function listJpgImages(dir: string, urlPrefix: string): string[] {
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".jpg"))
    .sort(sortImagesByIndex)
    .map((file) => `${urlPrefix}/${file}`);
}

export function getSubcategoryImages(
  category: PortfolioSlug,
  sub: PortfolioSubSlug,
): string[] {
  const dir = resolveDir(category, sub);

  if (!dir) {
    return [];
  }

  return listJpgImages(dir, `/images/portfolio/${category}/${sub}`);
}

export function getCategoryImages(slug: PortfolioSlug): string[] {
  if (hasChildren(slug)) {
    return getCategoryChildren(slug).flatMap((sub) =>
      getSubcategoryImages(slug, sub),
    );
  }

  const dir = resolveDir(slug);

  if (!dir) {
    return [];
  }

  return listJpgImages(dir, `/images/portfolio/${slug}`);
}

export function getPortfolioSubcategories(
  category: PortfolioSlug,
): PortfolioSubcategory[] {
  return getCategoryChildren(category)
    .map((slug) => {
      const images = getSubcategoryImages(category, slug);
      return {
        slug,
        images,
        cover: images[0] ?? "",
      };
    })
    .filter((subcategory) => subcategory.images.length > 0);
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
