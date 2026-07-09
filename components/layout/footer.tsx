import configs from "@/lib/configs";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className={cn("w-full py-8 flex justify-end", configs.pagePadding)}>
      <p className="text-xs lg:text-sm text-right">
        &copy; {new Date().getFullYear()} Haruka Kikuchi.
        <br />
        All rights reserved.
      </p>
    </footer>
  );
}
