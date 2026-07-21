import { PortfolioIndex } from "@/components/portfolio/portfolio-index";
import { getPortfolioCategories } from "@/lib/portfolio";

export default function PortfolioPage() {
  const categories = getPortfolioCategories();

  return <PortfolioIndex categories={categories} />;
}
