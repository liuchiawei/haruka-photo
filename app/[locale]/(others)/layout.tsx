import configs from "@/lib/configs";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/footer";

export default function OthersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      className={cn(
        configs.maxWidth,
        "mx-auto flex flex-col items-center justify-center",
      )}
    >
      {children}
      <Footer />
    </main>
  );
}
