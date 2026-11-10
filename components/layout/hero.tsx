"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import configs from "@/lib/configs";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Eye } from "lucide-react";

const portfolioLink = <Link href={configs.nav.portfolio.path} />;

export default function Hero() {
  const t = useTranslations("Home");
  const shouldReduceMotion = useReducedMotion();
  const duration = shouldReduceMotion ? 0 : 2;

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: "-50%", y: "calc(-50% + 10px)" }}
        animate={{ opacity: 1, x: "-50%", y: "-50%" }}
        transition={{ duration, ease: "easeOut" }}
        className="absolute left-1/2 top-1/2 z-10 flex max-w-md flex-col items-center gap-8"
      >
        <h1 className="text-center text-2xl font-thin leading-relaxed tracking-widest text-white uppercase text-shadow-lg text-shadow-black/40 md:text-3xl lg:text-5xl xl:text-[2rem]">
          {configs.siteTitle}
        </h1>
        {/* CTA Button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                nativeButton={false}
                variant="ghost"
                size="lg"
                className="bg-transparent text-neutral-200 hover:text-white hover:bg-transparent hover:scale-110 transition-transform"
                render={portfolioLink}
                aria-label={t("viewPortfolio")}
              >
                <Eye strokeWidth={1} className="size-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>{t("viewPortfolio")}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
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
