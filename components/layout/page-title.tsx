"use client";

import { AppImage as Image } from "@/components/image";
import { motion, useReducedMotion } from "motion/react";

export function PageTitle({
  title,
  coverSrc,
}: {
  title: string;
  coverSrc: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 1.2;

  return (
    <div className="relative w-full mx-auto overflow-hidden h-40 md:h-56 lg:h-72">
      <motion.div
        initial={{ scale: shouldReduceMotion ? 1 : 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={coverSrc}
          alt="cover image"
          fill
          className="object-cover lg:object-[100%_25%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      <h1
        aria-label="page title"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 px-4 text-center text-2xl md:text-3xl xl:text-4xl font-heading font-thin tracking-widest uppercase text-white text-shadow-lg text-shadow-black/40 wrap-break-word"
      >
        {title}
      </h1>
    </div>
  );
}
