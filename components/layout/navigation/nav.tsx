"use client";

import { Link } from "@/i18n/navigation";
import { ThemeSwitcher } from "./theme-swither";
import { LangSwitcher } from "./lang-switcher";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import configs from "@/lib/configs";
import { Menu } from "lucide-react";
import SNSLinks from "@/components/sns-links";
import { motion, useReducedMotion } from "motion/react";

export function Nav() {
  const shouldReduceMotion = useReducedMotion();
  const listVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.04 },
    },
  };
  const itemVariants = {
    hidden: shouldReduceMotion ? { x: 0, Opacity: 1 } : { x: 100, Opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: { duration: shouldReduceMotion ? 0 : 0.6, type: "spring" as const },
    },
  };

  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger className="fixed top-4 right-4 z-40 text-white text-shadow-lg text-shadow-black cursor-pointer">
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="px-6 pb-4 bg-background/10 dark:bg-background/20 backdrop:blur-sm border-none text-neutral-100">
        <DrawerHeader className="px-0 flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold uppercase">
            {configs.siteTitle}
          </Link>
          <div className="flex gap-2">
            <ThemeSwitcher className="rounded-full" />
            <LangSwitcher className="rounded-full" />
          </div>
        </DrawerHeader>
        <motion.ul
          className="mt-4 flex list-none flex-col gap-2"
          initial="hidden"
          animate="show"
          variants={listVariants}
        >
          {Object.values(configs.nav).map((nav) => (
            <motion.li key={nav.path} variants={itemVariants}>
              <Link
                href={nav.path}
                className="block w-full text-xl tracking-wide hover:bg-input/50 rounded-md p-2 transition-colors"
              >
                {nav.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>
        <DrawerFooter className="px-0">
          <SNSLinks variant="short" />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
