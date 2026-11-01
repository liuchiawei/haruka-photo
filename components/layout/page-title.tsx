"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { AppImage as Image } from "@/components/image";
import { motion, useReducedMotion } from "motion/react";
import configs from "@/lib/configs";

export function PageTitle({
  title,
  subtitle,
  info,
  coverSrc,
}: {
  title: string;
  subtitle?: string;
  info?: string;
  coverSrc: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 1.2;

  return (
    <div className="relative w-full mx-auto overflow-hidden h-40 md:h-56 lg:h-72 p-4 grid grid-cols-2">
      {/* Background image */}
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
      <Link
        href="/"
        className="col-span-2 w-28 lg:w-36 text-[10px] lg:text-sm z-10 font-light text-white text-shadow-md wrap-break-word inline-block uppercase tracking-widest"
      >
        {configs.siteTitle}
      </Link>
      {subtitle && (
        <p className={cn(SubtitleStyle)}>
          {subtitle}
        </p>
      )}
      {info && (
        <p className={cn(SubtitleStyle, "text-right")}>
          {info}
        </p>
      )}
      {/* Cover image overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      {/* Page title */}
      <h1
        aria-label="page title"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 px-4 text-center text-2xl md:text-3xl xl:text-4xl font-heading font-thin tracking-widest uppercase text-white text-shadow-lg text-shadow-black/40 wrap-break-word"
      >
        {title}
      </h1>
    </div>
  );
}

const SubtitleStyle = "self-end z-10 text-[8px] lg:text-xs font-light text-white text-shadow-md wrap-break-word inline-block uppercase tracking-widest select-none";