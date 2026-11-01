import { getTranslations } from "next-intl/server";
import { ExhibitionListItem } from "@/components/exhibitions/exhibition-list-item";
import { PageTitle } from "@/components/layout/page-title";
import { EXHIBITIONS } from "@/lib/info-exhibitions";

export default async function ExhibitionsPage() {
  const t = await getTranslations("Exhibitions");

  return (
    <div className="w-full mx-auto">
      <PageTitle title={t("title")} coverSrc="/images/assets/hero.jpg" />
      <div className="flex flex-col gap-10 px-4 py-4 md:px-8 md:py-8 lg:px-16 lg:py-12">
        {EXHIBITIONS.map((exhibition) => (
          <ExhibitionListItem
            key={`${exhibition.title}-${exhibition.date.start}`}
            exhibition={exhibition}
          />
        ))}
      </div>
    </div>
  );
}
