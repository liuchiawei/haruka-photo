import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { AppImage as Image } from "@/components/image";
import { PageContainer } from "@/components/layout/page-container";
import { Link } from "@/i18n/navigation";
import { EXHIBITIONS } from "@/lib/info-exhibitions";
import { ArrowLeft } from "lucide-react";

function isBlobUrl(src: string) {
  return src.includes(".blob.vercel-storage.com");
}

function parseDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return EXHIBITIONS.map((exhibition) => ({ slug: exhibition.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exhibition = EXHIBITIONS.find((item) => item.slug === slug);

  if (!exhibition) {
    return {};
  }

  return { title: exhibition.title };
}

export default async function ExhibitionPage({ params }: Props) {
  const { slug } = await params;
  const exhibition = EXHIBITIONS.find((item) => item.slug === slug);

  if (!exhibition) {
    notFound();
  }

  const t = await getTranslations("Exhibitions");
  const locale = await getLocale();
  const formatDate = new Intl.DateTimeFormat(locale, { dateStyle: "medium" });
  const dateLabel = `${formatDate.format(parseDate(exhibition.date.start))} – ${formatDate.format(parseDate(exhibition.date.end))}`;
  const coverSrc = isBlobUrl(exhibition.image)
    ? exhibition.image
    : "/images/assets/hero.jpg";

  return (
    <PageContainer title={exhibition.title} coverSrc={coverSrc}>
      <Link
        href="/exhibitions"
        className="mb-4 group w-fit flex items-center gap-2 text-sm tracking-wide underline-offset-4 transition-opacity hover:opacity-60"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
        {t("back")}
      </Link>
      <article className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        <div className="relative aspect-4/3 w-full overflow-hidden lg:w-1/2">
          <Image
            src={exhibition.image}
            alt={exhibition.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            unoptimized={!isBlobUrl(exhibition.image)}
            priority
          />
        </div>
        <div className="flex w-full flex-col justify-end gap-3 lg:w-1/2">
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
          <p className="font-light opacity-80">{exhibition.location.address}</p>
          <p className="font-light">{exhibition.description}</p>
        </div>
      </article>
    </PageContainer>
  );
}
