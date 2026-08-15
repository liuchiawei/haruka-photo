import configs from "@/lib/configs";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        configs.maxWidth,
        configs.pagePadding,
        "mx-auto w-full py-20",
      )}
    >
      {children}
      <Toaster />
    </main>
  );
}
