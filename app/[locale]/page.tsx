import { useTranslations } from "next-intl";
import Hero from "@/components/layout/hero";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <div>
      <Hero />
    </div>
  );
}
