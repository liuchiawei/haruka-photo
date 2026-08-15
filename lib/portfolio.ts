import { getBlobUrlsForKey } from "@/lib/blob-portfolio";

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

export function getAllCategoryKeys(): string[] {
  return PORTFOLIO_SLUGS.flatMap((slug) => {
    const children = getCategoryChildren(slug);
    if (children.length === 0) {
      return [slug];
    }

    return children.map((sub) => `${slug}/${sub}`);
  });
}

export function isValidCategoryKey(key: string): boolean {
  const [category, sub, extra] = key.split("/");
  if (extra || !category || !isPortfolioSlug(category)) {
    return false;
  }

  if (!sub) {
    return !hasChildren(category);
  }

  return isPortfolioSubSlug(category, sub);
}

export async function getSubcategoryImages(
  category: PortfolioSlug,
  sub: PortfolioSubSlug,
): Promise<string[]> {
  return getBlobUrlsForKey(`${category}/${sub}`);
}

export async function getCategoryImages(
  slug: PortfolioSlug,
): Promise<string[]> {
  if (hasChildren(slug)) {
    const nested = await Promise.all(
      getCategoryChildren(slug).map((sub) => getSubcategoryImages(slug, sub)),
    );
    return nested.flat();
  }

  return getBlobUrlsForKey(slug);
}

export async function getPortfolioSubcategories(
  category: PortfolioSlug,
): Promise<PortfolioSubcategory[]> {
  const subcategories = await Promise.all(
    getCategoryChildren(category).map(async (slug) => {
      const images = await getSubcategoryImages(category, slug);
      return {
        slug,
        images,
        cover: images[0] ?? "",
      };
    }),
  );

  return subcategories.filter((subcategory) => subcategory.images.length > 0);
}

export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  const categories = await Promise.all(
    PORTFOLIO_SLUGS.map(async (slug) => {
      const images = await getCategoryImages(slug);
      return {
        slug,
        images,
        cover: images[0] ?? "",
      };
    }),
  );

  return categories.filter((category) => category.images.length > 0);
}
