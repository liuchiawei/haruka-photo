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
        "w-full min-w-screen mx-auto flex flex-col items-center justify-center",
      )}
    >
      <div className="w-full mx-auto">
        {children}
        <Footer />
      </div>
    </main>
  );
}
