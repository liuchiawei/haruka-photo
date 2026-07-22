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
    <div className="w-full">
      <h1
        aria-label="page title"
        className="text-center text-[2rem] md:text-[3rem] xl:text-[6rem] 2xl:text-[10rem] font-heading font-thin tracking-widest uppercase wrap-break-word"
      >
        {t(`categories.${slug}`)}
      </h1>
      <PortfolioGrid slug={slug} images={images} />
    </div>
  );
}
