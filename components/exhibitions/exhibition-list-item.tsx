import { getLocale, getTranslations } from "next-intl/server";
import { AppImage as Image } from "@/components/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { EXHIBITIONS } from "@/lib/info-exhibitions";
import { MapPin } from "lucide-react";

type Exhibition = (typeof EXHIBITIONS)[number];

function isBlobUrl(src: string) {
  return src.includes(".blob.vercel-storage.com");
}

function parseDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

type ExhibitionListItemProps = {
  exhibition: Exhibition;
};

export async function ExhibitionListItem({
  exhibition,
}: ExhibitionListItemProps) {
  const t = await getTranslations("Exhibitions");
  const locale = await getLocale();
  const formatDate = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const dateLabel = `${formatDate.format(parseDate(exhibition.date.start))} – ${formatDate.format(parseDate(exhibition.date.end))}`;

  return (
    <article className="flex gap-4 lg:gap-8">
      {/* Exhibition image */}
      <div className="w-30 lg:w-40 aspect-square overflow-hidden">
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
        {/* Exhibition description */}
        <p className="w-3/4 font-light truncate">{exhibition.description}</p>
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
