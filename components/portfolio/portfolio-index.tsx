"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { PortfolioCategory } from "@/lib/portfolio";
import { PageTitle } from "@/components/layout/page-title";

type PortfolioIndexProps = {
  categories: PortfolioCategory[];
};

export function PortfolioIndex({ categories }: PortfolioIndexProps) {
  const t = useTranslations("Portfolio");

  return (
    <div>
      <PageTitle title={t("title")} />
      <div className="p-1 grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/portfolio/${category.slug}`}
            className="group relative aspect-square overflow-hidden"
          >
            <Image
              src={category.cover}
              alt={t(`categories.${category.slug}`)}
              width={600}
              height={600}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span className="absolute inset-0 flex items-end justify-center bg-black/20 p-4 text-lg font-medium uppercase tracking-wide text-white">
              {t(`categories.${category.slug}`)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
