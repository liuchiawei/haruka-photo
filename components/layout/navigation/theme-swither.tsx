"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeSwitcher({
  className,
  size = "icon",
  variant = "ghost",
}: {
  className?: string;
  size?: "default" | "xs" | "sm" | "lg" | "icon";
  variant?: "ghost" | "outline" | "default" | "destructive" | "link";
}) {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant={variant}
      size={size}
      className={cn(className)}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
