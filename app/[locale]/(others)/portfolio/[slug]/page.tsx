import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageTitle } from "@/components/layout/page-title";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { PortfolioSubIndex } from "@/components/portfolio/portfolio-sub-index";
import {
  getCategoryImages,
  getPortfolioSubcategories,
  hasChildren,
  isPortfolioSlug,
  PORTFOLIO_SLUGS,
} from "@/lib/portfolio";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PORTFOLIO_SLUGS.map((slug) => ({ slug }));
}

export default async function PortfolioCategoryPage({ params }: Props) {
  const { slug } = await params;

  if (!isPortfolioSlug(slug)) {
    notFound();
  }

  const t = await getTranslations("Portfolio");

  if (hasChildren(slug)) {
    const subcategories = await getPortfolioSubcategories(slug);

    if (subcategories.length === 0) {
      notFound();
    }

    return (
      <PortfolioSubIndex
        category={slug}
        title={t(`categories.${slug}`)}
        coverSrc={subcategories[0].cover}
        subcategories={subcategories}
      />
    );
  }

  const images = await getCategoryImages(slug);

  if (images.length === 0) {
    notFound();
  }

  return (
    <>
      <PageTitle title={t(`categories.${slug}`)} coverSrc={images[0]} />
      <PortfolioGrid slug={slug} images={images} />
    </>
  );
}
