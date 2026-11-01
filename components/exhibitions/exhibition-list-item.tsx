import { AppImage as Image } from "@/components/image";
import { Link } from "@/i18n/navigation";
import type { EXHIBITIONS } from "@/lib/info-exhibitions";
import { MapPin, Calendar } from "lucide-react";

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
  const dateLabel = `${formatMonthDay(exhibition.date.start)} ー ${formatMonthDay(exhibition.date.end)}`;

  return (
    <div className="flex gap-4 lg:gap-8">
      {/* Exhibition image */}
      <Link
        className="overflow-hidden"
        href={`/exhibitions/${exhibition.slug}`}
      >
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
      {/* Exhibition details */}
      <div className="w-full space-y-1">
        {/* Exhibition title */}
        <Link
          href={`/exhibitions/${exhibition.slug}`}
          className="text-lg font-thin uppercase tracking-wide md:text-xl lg:text-3xl mb-3"
        >
          {exhibition.title}
        </Link>
        {/* Exhibition date */}
        <div className="flex items-center gap-2 text-xs tracking-wide opacity-70">
          <Calendar className="size-4" />
          {dateLabel}
        </div>
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
      </div>
    </div>
  );
}
