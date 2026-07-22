import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageTitle } from "@/components/layout/page-title";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import {
  getCategoryImages,
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

  const images = getCategoryImages(slug);

  if (images.length === 0) {
    notFound();
  }

  const t = await getTranslations("Portfolio");

  return (
    <div className="w-full">
      <PageTitle title={t(`categories.${slug}`)} />
      <PortfolioGrid slug={slug} images={images} />
    </div>
  );
}
