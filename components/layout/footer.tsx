import configs from "@/lib/configs";
import { cn } from "@/lib/utils";
import SNSLinks from "@/components/sns-links";
export default function Footer() {
  return (
    <footer
      className={cn(
        "w-full py-8 flex flex-col md:flex-row justify-center md:justify-between items-center md:items-end gap-4",
        configs.pagePadding,
      )}
    >
      <SNSLinks />
      <p
        aria-label="Copyright"
        className="text-xs lg:text-sm text-center md:text-right"
      >
        &copy; {new Date().getFullYear()} Haruka Kikuchi.
        <br />
        All rights reserved.
      </p>
    </footer>
  );
}
