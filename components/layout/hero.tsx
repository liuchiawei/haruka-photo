"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Hero() {
  const t = useTranslations("Home");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const handleClick = () => {
    setIsFullscreen(!isFullscreen);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <h1 className="h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-heading font-bold text-white text-center text-shadow-lg [writing-mode:vertical-lr]">
        {t("title")}
      </h1>
      <button className="absolute bottom-4 right-4 z-40" onClick={handleClick}>
        {isFullscreen ? "Fullscreen" : "Normal"}
      </button>
      <Image
        src="/images/assets/hero.jpg"
        alt="Hero"
        width={1000}
        height={1000}
        className={cn(
          "w-1/2 aspect-17/12 object-cover -z-10",
          isFullscreen
            ? "w-full h-full object-cover"
            : "w-3/4 md:w-1/2 aspect-17/12 object-cover",
        )}
      />
    </div>
  );
}
