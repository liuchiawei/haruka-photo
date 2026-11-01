"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import configs from "@/lib/configs";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 2;

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen relative overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, x: "-50%", y: "calc(-50% + 10px)" }}
        animate={{ opacity: 1, x: "-50%", y: "-50%" }}
        transition={{ duration, ease: "easeOut" }}
        className="max-w-md absolute left-1/2 top-1/2 z-10 text-2xl md:text-3xl lg:text-5xl xl:text-[2rem] font-thin text-center text-white text-shadow-lg text-shadow-black/40 tracking-widest leading-relaxed uppercase"
      >
        {configs.siteTiltle}
      </motion.h1>
      <div className="w-full h-full overflow-hidden">
        <motion.div
          initial={{ scale: shouldReduceMotion ? 1 : 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration, ease: "easeOut" }}
          className="w-full h-full"
        >
          <Image
            src="/images/assets/hero.jpg"
            alt="Hero"
            width={1200}
            height={1200}
            className={cn("w-full h-full object-cover -z-10")}
          />
        </motion.div>
      </div>
    </div>
  );
}
