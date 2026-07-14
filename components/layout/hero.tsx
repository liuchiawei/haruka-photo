"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import configs from "@/lib/configs";

export default function Hero() {
  const t = useTranslations("Home");
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl xl:text-2xl 2xl:text-4xl font-serif font-bold text-white text-center text-shadow-lg tracking-widest [writing-mode:vertical-lr]"
        >
          {configs.siteTiltle}
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm xl:text-base 2xl:text-lg font-roboto font-light text-white text-center text-shadow-lg tracking-wide"
        >
          {configs.siteSubtitle}
        </motion.h2>
      </div>
      <Image
        src="/images/assets/hero.jpg"
        alt="Hero"
        width={1200}
        height={1200}
        className={cn(
          "w-full aspect-video lg:aspect-auto lg:h-full object-cover -z-10",
        )}
      />
    </div>
  );
}
