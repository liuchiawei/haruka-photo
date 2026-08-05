"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PortfolioSlug, PortfolioSubcategory } from "@/lib/portfolio";
import { getBentoSpanClass } from "@/lib/portfolio-bento";
import { PageTitle } from "@/components/layout/page-title";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type PortfolioSubIndexProps = {
  category: PortfolioSlug;
  title: string;
  coverSrc: string;
  subcategories: PortfolioSubcategory[];
};

export function PortfolioSubIndex({
  category,
  title,
  coverSrc,
  subcategories,
}: PortfolioSubIndexProps) {
  const t = useTranslations("Portfolio");

  return (
    <div>
      <PageTitle title={title} coverSrc={coverSrc} />
      <div className="flex flex-col gap-10 px-4 md:px-8 lg:px-16 py-4 md:py-8 lg:py-12 md:gap-14 lg:gap-20">
        {subcategories.map((subcategory) => {
          const previews = subcategory.images.slice(0, 4);
          const subTitle = t(`subcategories.${subcategory.slug}`);

          return (
            <section
              key={subcategory.slug}
              className="flex flex-col gap-3 md:gap-4"
            >
              <Link
                href={`/portfolio/${category}/${subcategory.slug}`}
                className="group w-fit self-end flex items-center gap-2 md:gap-4 text-xl md:text-2xl lg:text-4xl font-light uppercase tracking-wide transition-opacity hover:opacity-60"
              >
                <ArrowRight className="size-4 md:size-6 transition-transform group-hover:translate-x-1" />
                <span>{subTitle}</span>
              </Link>
              <div className="grid grid-cols-2 gap-2 auto-rows-48 md:grid-cols-4 md:auto-rows-56 md:gap-3">
                {previews.map((src, index) => {
                  const isFeatured = index % 6 === 0;
                  const size = isFeatured ? 600 : 300;
                  const alt = `${subTitle} ${index + 1}`;

                  return (
                    <motion.div
                      key={src}
                      className={cn(
                        "size-full min-h-0 overflow-hidden",
                        getBentoSpanClass(index),
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, ease: "easeIn" }}
                    >
                      <Dialog>
                        <DialogTrigger className="size-full p-0 group overflow-hidden">
                          <Image
                            src={src}
                            alt={alt}
                            width={size}
                            height={size}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                            loading="lazy"
                          />
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="p-0">
                          <Image
                            src={src}
                            alt={alt}
                            width={800}
                            height={800}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </DialogContent>
                      </Dialog>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
