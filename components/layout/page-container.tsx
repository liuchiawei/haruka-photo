import configs from "@/lib/configs";
import { cn } from "@/lib/utils";
import { PageTitle } from "@/components/layout/page-title";

export function PageContainer({
  title,  
  subtitle,
  info,
  coverSrc,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  info?: string;
  coverSrc: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-screen flex flex-col items-center">
      <PageTitle title={title} subtitle={subtitle} info={info} coverSrc={coverSrc} />
      <main className={cn(configs.pagePadding, configs.maxWidth, className)}>
        {children}
      </main>
    </div>
  );
}
