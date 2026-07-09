import configs from "@/lib/configs";
import { cn } from "@/lib/utils";

export default function OthersLayout({ children }: { children: React.ReactNode }) {
  return <main className={cn(configs.maxWidth, "mx-auto py-4 flex flex-col items-center justify-center")}>{children}</main>;
}