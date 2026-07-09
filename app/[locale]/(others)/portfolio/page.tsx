import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";
import { useTranslations } from "next-intl";
export default function PortfolioPage() {
  const t = useTranslations("Portfolio");
  return (
    <div className="">
      <h1
        aria-label="page title"
        className="text-center text-[4rem] md:text-[9rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-heading font-black tracking-tighter uppercase"
      >
        {t("title")}
      </h1>
      <PortfolioGrid />
    </div>
  );
}
