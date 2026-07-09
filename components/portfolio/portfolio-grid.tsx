"use client";

import configs from "@/lib/configs";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";


export function PortfolioGrid() {
  return (
    <div className="grid grid-cols-4 lg:grid-cols-8">
      {Array.from({ length: configs.portfolio.totalVolume }, (_, i) => (
        <div key={i} className="w-full h-full">
          <Dialog>
            <DialogTrigger className="w-full h-full p-0">
              <Image
                src={`/images/portfolio/${i + 1}.jpg`}
                alt={`Portfolio ${i + 1}`}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </DialogTrigger>
            <DialogContent className="p-0">
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
      ))}
    </div>
  );
}
