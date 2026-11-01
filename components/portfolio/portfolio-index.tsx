"use client";

import { AppImage as Image } from "@/components/image";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { PortfolioCategory } from "@/lib/portfolio";
import { getBentoSpanClass } from "@/lib/portfolio-bento";
import { PageContainer } from "@/components/layout/page-container";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import configs from "@/lib/configs";

type PortfolioIndexProps = {
  categories: PortfolioCategory[];
};

export function PortfolioIndex({ categories }: PortfolioIndexProps) {
  const t = useTranslations("Portfolio");

  return (
    <PageContainer title={t("title")} coverSrc="/images/assets/hero.jpg">
      <div
        className={cn(
          configs.pagePadding,
          "flex flex-col gap-10 py-4 md:py-8 lg:py-12 md:gap-14 lg:gap-20 [&>*:nth-child(odd)>:first-child]:self-end",
        )}
      >
        {categories.map((category) => {
          const previews = category.images.slice(0, 4);
          const title = t(`categories.${category.slug}`);

          return (
            <section
              key={category.slug}
              className="flex flex-col gap-3 md:gap-4"
            >
              <Link
                href={`/portfolio/${category.slug}`}
                className="group w-fit flex items-center gap-2 md:gap-4 text-lg md:text-xl lg:text-2xl font-thin uppercase tracking-wide opacity-60 transition-opacity hover:opacity-100"
              >
                <ArrowRight
                  strokeWidth={1}
                  className="size-4 md:size-6 transition-transform group-hover:translate-x-1"
                />
                <span>{title}</span>
              </Link>
              <div className="grid grid-cols-2 gap-2 auto-rows-48 md:grid-cols-4 md:auto-rows-56 md:gap-3">
                {previews.map((src, index) => {
                  const isFeatured = index % 6 === 0;
                  const size = isFeatured ? 600 : 300;

                  const alt = `${title} ${index + 1}`;

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
    </PageContainer>
  );
}
