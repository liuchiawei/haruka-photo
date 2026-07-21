"use client";

import { usePathname } from "next/navigation";
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
import { cn } from "@/lib/utils";
import configs from "@/lib/configs";
import { Menu } from "lucide-react";
import SNSLinks from "@/components/sns-links";

export function Nav() {
  const pathname = usePathname();
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger
        className={cn(
          "absolute top-4 right-4 z-40 text-shadow-lg",
          pathname === "/" ? "text-white" : "text-foreground",
        )}
      >
        <Menu className="size-6" />
      </DrawerTrigger>
      <DrawerContent className="px-4 bg-background/80 backdrop:blur-sm">
        <DrawerHeader className="px-0 flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold uppercase">
            {configs.siteTiltle}
          </Link>
          <div className="flex gap-2">
            <ThemeSwitcher className="rounded-full" />
            <LangSwitcher className="rounded-full" />
          </div>
        </DrawerHeader>
        <ul className="mt-2 flex flex-col gap-2">
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
        <DrawerFooter>
          <SNSLinks />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
