import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import configs from "@/lib/configs";
import { PageContainer } from "@/components/layout/page-container";
import { Link } from "@/i18n/navigation";
import { EXHIBITIONS } from "@/lib/info-exhibitions";
import { ArrowLeft } from "lucide-react";
import { PortfolioGrid } from "@/components/portfolio/portfolio-grid";

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
  const formatDate = new Intl.DateTimeFormat(locale, { dateStyle: "short" });
  const dateLabel = `${formatDate.format(parseDate(exhibition.date.start))} – ${formatDate.format(parseDate(exhibition.date.end))}`;
  const coverSrc = isBlobUrl(exhibition.image)
    ? exhibition.image
    : "/images/assets/hero.jpg";

  return (
    <PageContainer
      title={exhibition.title}
      subtitle={t("title")}
      info={dateLabel}
      coverSrc={coverSrc}
      className="space-y-4"
    >
      <ExhibitionDescription
        title={t("concept")}
        description={
          exhibition.description[locale as keyof typeof exhibition.description]
        }
      />
      <ExhibitionGallery slug={slug} imagesCount={exhibition.imagesCount} />
      <ExhibitionInformation
        dateTitle={t("date")}
        locationTitle={t("location")}
        date={dateLabel}
        location={exhibition.location}
      />
      {/* Back button */}
      <Link
        href="/exhibitions"
        className="mb-4 group flex items-center justify-center gap-2 text-center text-sm tracking-wide underline-offset-4 transition-opacity hover:opacity-60"
      >
        <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
        {t("back")}
      </Link>
    </PageContainer>
  );
}

const ExhibitionDescription = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className={cn("flex justify-between", configs.itemGrid)}>
      <h1 className="w-2/5 lg:w-full text-md lg:text-3xl font-thin uppercase">{title}</h1>
      <p className="w-full text-xs lg:text-sm text-justify">{description}</p>
    </div>
  );
};

const ExhibitionGallery = ({
  slug,
  imagesCount,
}: {
  slug: string;
  imagesCount: number;
}) => {
  return (
    <PortfolioGrid
      images={Array.from(
        { length: imagesCount },
        (_, index) => `/images/exhibitions/${slug}-${index + 1}.jpg`,
      )}
    />
  );
};

const ExhibitionInformation = ({
  dateTitle,
  locationTitle,
  date,
  location,
}: {
  dateTitle: string;
  locationTitle: string;
  date: string;
  location: (typeof EXHIBITIONS)[number]["location"];
}) => {
  return (
    <div className={cn("flex flex-col", configs.itemGrid)}>
      <div className={cn("flex items-center", configs.itemGrid)}>
        <h2 className="font-thin uppercase">
          {dateTitle}
        </h2>
        <p className="w-full text-xs lg:text-sm">{date}</p>
      </div>
      <div className={cn("flex", configs.itemGrid)}>
        <h2 className="font-thin uppercase">
          {locationTitle}
        </h2>
        <div className="flex flex-col">
          <a
            href={location.url}
            target="_blank"
            rel="noreferrer"
            className="w-fit underline-offset-4 transition-opacity hover:opacity-60"
          >
            {location.name}
          </a>
          <p className="text-xs lg:text-sm font-light">{location.address}</p>
        </div>
      </div>
    </div>
  );
};