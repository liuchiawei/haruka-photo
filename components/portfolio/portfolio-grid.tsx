"use client";

import configs from "@/lib/configs";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: configs.portfolio.totalVolume }, (_, i) => (
        <PortfolioGridItem key={i} i={i} />
      ))}
    </div>
  );
}

const PortfolioGridItem = ({ i }: { i: number }) => {
  return (
    <div key={i} className="size-full aspect-square">
      <Dialog>
        <DialogTrigger className="size-full p-0">
          <Image
            src={`/images/portfolio/${i + 1}.jpg`}
            alt={`Portfolio ${i + 1}`}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="p-0">
          <Image
            src={`/images/portfolio/${i + 1}.jpg`}
            alt={`Portfolio ${i + 1}`}
            width={800}
            height={800}
            className="w-full h-full object-cover"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
