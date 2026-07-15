"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import configs from "@/lib/configs";

export default function Hero() {
  const t = useTranslations("Home");
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-3xl md:text-5xl lg:text-[3rem] xl:text-[5rem] font-light text-center text-white text-shadow-lg tracking-widest uppercase"
      >
        {configs.siteTiltle}
      </motion.h1>
      <Image
        src="/images/assets/hero.jpg"
        alt="Hero"
        width={1200}
        height={1200}
        className={cn("w-full h-full object-cover -z-10")}
      />
    </div>
  );
}
