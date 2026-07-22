"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import type { PortfolioSlug } from "@/lib/portfolio";

type PortfolioGridProps = {
  slug: PortfolioSlug;
  images: string[];
};

export function PortfolioGrid({ slug, images }: PortfolioGridProps) {
  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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

  return (
    <motion.div
      className="size-full aspect-square"
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
            width={300}
            height={300}
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
