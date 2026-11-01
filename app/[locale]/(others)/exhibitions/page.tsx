import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { AppImage as Image } from "@/components/image";
import { PageTitle } from "@/components/layout/page-title";
import { Button } from "@/components/ui/button";
import { EXHIBITIONS } from "@/lib/info-exhibitions";

function isBlobUrl(src: string) {
  return src.includes(".blob.vercel-storage.com");
}

function parseDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export default async function ExhibitionsPage() {
  const t = await getTranslations("Exhibitions");
  const locale = await getLocale();
  const formatDate = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });

  return (
    <div className="w-full mx-auto">
      <PageTitle title={t("title")} coverSrc="/images/assets/hero.jpg" />
      <div className="flex flex-col gap-10 px-4 py-4 md:px-8 md:py-8 lg:px-16 lg:py-12">
        {EXHIBITIONS.map((exhibition) => {
          const dateLabel = `${formatDate.format(parseDate(exhibition.date.start))} – ${formatDate.format(parseDate(exhibition.date.end))}`;

          return (
            <article
              key={`${exhibition.title}-${exhibition.date.start}`}
              className="flex flex-col gap-4 lg:flex-row lg:gap-8"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden lg:w-1/2">
                <Link href={`/exhibitions/${exhibition.slug}`}>
                  <Image
                    src={exhibition.image}
                    alt={exhibition.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    unoptimized={!isBlobUrl(exhibition.image)}
                  />
                </Link>
              </div>
              <div className="flex w-full flex-col justify-end gap-3 lg:w-1/2">
                <h2 className="text-xl font-thin uppercase tracking-wide md:text-2xl lg:text-4xl">
                  {exhibition.title}
                </h2>
                <p className="text-sm tracking-wide opacity-70 md:text-base">
                  {dateLabel}
                </p>
                <a
                  href={exhibition.location.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit underline-offset-4 transition-opacity hover:opacity-60"
                >
                  {exhibition.location.name}
                </a>
                <p className="font-light opacity-80">
                  {exhibition.location.address}
                </p>
                <p className="font-light">{exhibition.description}</p>
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
        })}
      </div>
    </div>
  );
}
