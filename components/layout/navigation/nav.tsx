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

export function Nav() {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger className="absolute top-4 right-4 z-40">
        <Menu className="size-4" />
      </DrawerTrigger>
      <DrawerContent className="px-4 bg-background/80 backdrop:blur-sm">
        <DrawerHeader className="px-0 flex-row justify-between items-center">
          <Link href="/" className="text-2xl font-bold uppercase">
            logo
          </Link>
          <div className="flex gap-2">
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </DrawerHeader>
        <ul className="flex flex-col gap-2">
          {Object.values(configs.nav).map((nav) => (
            <Link key={nav.path} href={nav.path} className="w-full hover:bg-input/50 rounded-md p-2 transition-colors">
              {nav.label}
            </Link>
          ))}
        </ul>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
