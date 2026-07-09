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
      <DrawerTrigger className="absolute top-4 right-4">
        <Menu className="size-4" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <div className="flex justify-end items-center gap-2">
            <ThemeSwitcher />
            <LangSwitcher />
          </div>
        </DrawerHeader>
        <ul className="flex flex-col gap-2">
          {Object.values(configs.nav).map((nav) => (
            <Link key={nav.path} href={nav.path}>
              {nav.label}
            </Link>
          ))}
        </ul>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
