"use client";

import { Languages } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function LangSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(className, "cursor-pointer")}>
        <Languages className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-sm">
        <DropdownMenuItem>
          <Link href={pathname} locale="en" className="w-full">
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={pathname} locale="ja" className="w-full">
            日本語
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={pathname} locale="zh-TW" className="w-full">
            繁體中文
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
