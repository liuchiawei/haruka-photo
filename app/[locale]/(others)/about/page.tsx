import { useTranslations } from "next-intl";
import Image from "next/image";
import configs from "@/lib/configs";
import { cn } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";

export default function About() {
  const t = useTranslations("About");
  const messages = t.raw("messages").split("\n\n");
  return (
    <PageContainer title={t("title")} coverSrc="/images/assets/hero.jpg">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        {/* Portrait Image */}
        <div className="w-full lg:w-1/2 relative">
          <Image
            src="/images/assets/haruka.jpg"
            alt="Portrait of Haruka"
            width={600}
            height={600}
            className="w-full aspect-square object-cover"
          />
          <h2 className="absolute bottom-4 right-4 text-xl text-white">
            {t("name")}
          </h2>
        </div>
        {/* Information */}
        <section
          aria-label="page content"
          className={cn(
            "w-full lg:w-1/2 pt-6 flex flex-col lg:justify-end gap-2 lg:pb-0 font-light lg:self-end",
            configs.pagePadding,
          )}
        >
          {messages.map((message: string, index: number) => (
            <p className="text-sm lg:text-base text-justify" key={index}>{message}</p>
          ))}
        </section>
      </div>
    </PageContainer>
  );
}
