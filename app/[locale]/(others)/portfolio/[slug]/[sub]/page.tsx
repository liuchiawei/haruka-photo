import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageTitle } from "@/components/layout/page-title";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import {
  getCategoryChildren,
  getSubcategoryImages,
  hasChildren,
  isPortfolioSlug,
  isPortfolioSubSlug,
  PORTFOLIO_SLUGS,
} from "@/lib/portfolio";

type Props = {
  params: Promise<{ slug: string; sub: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_SLUGS.filter(hasChildren).flatMap((slug) =>
    getCategoryChildren(slug).map((sub) => ({ slug, sub })),
  );
}

export default async function PortfolioSubcategoryPage({ params }: Props) {
  const { slug, sub } = await params;

  if (!isPortfolioSlug(slug) || !isPortfolioSubSlug(slug, sub)) {
    notFound();
  }

  const images = getSubcategoryImages(slug, sub);

  if (images.length === 0) {
    notFound();
  }

  const t = await getTranslations("Portfolio");

  return (
    <>
      <PageTitle title={t(`subcategories.${sub}`)} coverSrc={images[0]} />
      <PortfolioGrid slug={sub} images={images} />
    </>
  );
}
