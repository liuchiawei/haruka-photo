import { getTranslations } from "next-intl/server";
import { AppImage as Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { EXHIBITIONS } from "@/lib/info-exhibitions";
import { MapPin } from "lucide-react";

type Exhibition = (typeof EXHIBITIONS)[number];

function isBlobUrl(src: string) {
  return src.includes(".blob.vercel-storage.com");
}

function formatMonthDay(iso: string) {
  const [, month, day] = iso.split("-");
  return `${month.padStart(2, "0")}.${day.padStart(2, "0")}`;
}

type ExhibitionListItemProps = {
  exhibition: Exhibition;
};

export async function ExhibitionListItem({
  exhibition,
}: ExhibitionListItemProps) {
  const t = await getTranslations("Exhibitions");
  const dateLabel = `${formatMonthDay(exhibition.date.start)} ー ${formatMonthDay(exhibition.date.end)}`;

  return (
    <article className="flex gap-4 lg:gap-8">
      {/* Exhibition image */}
      <div className="w-30 lg:w-40 overflow-hidden">
        <Link href={`/exhibitions/${exhibition.slug}`}>
          <Image
            src={exhibition.image}
            alt={exhibition.title}
            width={200}
            height={200}
            className="object-cover"
            loading="lazy"
            unoptimized={!isBlobUrl(exhibition.image)}
          />
        </Link>
      </div>
      {/* Exhibition details */}
      <div className="w-full flex flex-col justify-end gap-3">
        {/* Exhibition title */}
        <h2 className="text-lg font-thin uppercase tracking-wide md:text-xl lg:text-3xl">
          {exhibition.title}
        </h2>
        {/* Exhibition date */}
        <p className="text-xs tracking-wide opacity-70 md:text-sm">
          {dateLabel}
        </p>
        {/* Exhibition location */}
        <a
          href={exhibition.location.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-xs tracking-wide opacity-70"
        >
          <MapPin className="size-4" />
          {exhibition.location.name}
        </a>
        <Button
          variant="outline"
          className="w-fit underline-offset-4 transition-opacity hover:opacity-60 rounded-full"
        >
          <Link href={`/exhibitions/${exhibition.slug}`}>
            {t("viewDetails")}
          </Link>
        </Button>
      </div>
    </article>
  );
}
