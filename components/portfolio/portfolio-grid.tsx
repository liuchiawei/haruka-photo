"use client";

import Image from "next/image";
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
        <PortfolioGridItem
          key={src}
          slug={slug}
          src={src}
          index={index}
        />
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
    <div className="size-full aspect-square">
      <Dialog>
        <DialogTrigger className="size-full p-0">
          <Image
            src={src}
            alt={alt}
            width={300}
            height={300}
            className="w-full h-full object-cover"
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
    </div>
  );
};
