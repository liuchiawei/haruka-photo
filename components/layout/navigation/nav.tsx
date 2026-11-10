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

export function Nav() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger className="fixed top-4 right-4 z-40 text-white text-shadow-lg text-shadow-black cursor-pointer">
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="px-6 bg-background/10 dark:bg-background/20 backdrop:blur-sm border-none text-neutral-100">
        <DrawerHeader className="px-0 flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold uppercase">
            {configs.siteTitle}
          </Link>
          <div className="flex gap-2">
            <ThemeSwitcher className="hover:bg-transparent hover:text-white rounded-full" />
            <LangSwitcher className="rounded-full" />
          </div>
        </DrawerHeader>
        <ul className="mt-4 flex flex-col gap-2">
          {Object.values(configs.nav).map((nav) => (
            <Link
              key={nav.path}
              href={nav.path}
              className="w-full text-xl tracking-wide hover:bg-input/50 rounded-md p-2 transition-colors"
            >
              {nav.label}
            </Link>
          ))}
        </ul>
        <DrawerFooter className="px-0">
          <SNSLinks />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
