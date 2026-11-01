import { getTranslations } from "next-intl/server";
import { ExhibitionListItem } from "@/components/exhibitions/exhibition-list-item";
import { PageContainer } from "@/components/layout/page-container";
import { EXHIBITIONS } from "@/lib/info-exhibitions";

export default async function ExhibitionsPage() {
  const t = await getTranslations("Exhibitions");

  return (
    <PageContainer title={t("title")} coverSrc="/images/assets/hero.jpg">
      <div className="h-full min-h-96 flex flex-col gap-10">
        {EXHIBITIONS.map((exhibition) => (
          <ExhibitionListItem
            key={`${exhibition.title}-${exhibition.date.start}`}
            exhibition={exhibition}
          />
        ))}
      </div>
    </PageContainer>
  );
}
