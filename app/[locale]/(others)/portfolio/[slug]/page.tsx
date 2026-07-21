import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
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
    <div>
      <h1
        aria-label="page title"
        className="text-center text-[4rem] md:text-[9rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-roboto font-thin tracking-widest uppercase"
      >
        {t(`categories.${slug}`)}
      </h1>
      <PortfolioGrid slug={slug} images={images} />
    </div>
  );
}
