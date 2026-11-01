import configs from "@/lib/configs";
import { cn } from "@/lib/utils";
import { PageTitle } from "@/components/layout/page-title";

export function PageContainer({
  title,
  coverSrc,
  children,
}: {
  title: string;
  coverSrc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen flex flex-col items-center">
      <PageTitle title={title} coverSrc={coverSrc} />
      <main className={cn(configs.pagePadding, configs.maxWidth)}>
        {children}
      </main>
    </div>
  );
}
