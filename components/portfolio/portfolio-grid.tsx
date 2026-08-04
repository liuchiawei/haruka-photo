"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { PortfolioSlug } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

type PortfolioGridProps = {
  slug: PortfolioSlug;
  images: string[];
};

const BENTO_SPAN_CLASSES = [
  "col-span-2 md:col-span-2 md:row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2 md:col-span-2",
  "col-span-1 md:row-span-2",
  "col-span-1",
] as const;

function getBentoSpanClass(index: number) {
  return BENTO_SPAN_CLASSES[index % BENTO_SPAN_CLASSES.length];
}

export function PortfolioGrid({ slug, images }: PortfolioGridProps) {
  return (
    <div className="w-full p-4 grid grid-cols-2 md:grid-cols-4 auto-rows-48 md:auto-rows-56 gap-2 md:gap-3">
      {images.map((src, index) => (
        <PortfolioGridItem key={src} slug={slug} src={src} index={index} />
      ))}
    </div>
  );
}

const PortfolioGridItem = ({
  slug,
  src,
  index,
}: {
  slug: PortfolioSlug;
  src: string;
  index: number;
}) => {
  const alt = `${slug} ${index + 1}`;
  const isFeatured = index % 6 === 0;
  const size = isFeatured ? 600 : 300;

  return (
    <motion.div
      className={cn("size-full min-h-0 overflow-hidden", getBentoSpanClass(index))}
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
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="p-0">
          <Image
            src={src}
            alt={alt}
            width={800}
            height={800}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};
