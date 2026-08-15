import { PortfolioIndex } from "@/components/portfolio/portfolio-index";
import { getPortfolioCategories } from "@/lib/portfolio";

export default async function PortfolioPage() {
  const categories = await getPortfolioCategories();

  return <PortfolioIndex categories={categories} />;
}
