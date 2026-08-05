"use client";

import Image from "next/image";
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
    <div className="relative w-screen overflow-hidden h-40 md:h-56 lg:h-72">
      <motion.div
        initial={{ scale: shouldReduceMotion ? 1 : 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={coverSrc}
          alt=""
          fill
          className="object-cover lg:object-[100%_25%]"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      <h1
        aria-label="page title"
        className="absolute inset-x-0 bottom-4 md:bottom-6 z-10 px-4 text-center text-[1.5rem] md:text-[2.5rem] xl:text-[4rem] font-heading font-thin tracking-widest uppercase text-white text-shadow-lg wrap-break-word"
      >
        {title}
      </h1>
    </div>
  );
}
