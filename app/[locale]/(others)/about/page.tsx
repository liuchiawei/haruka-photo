import { useTranslations } from "next-intl";
import Image from "next/image";
import configs from "@/lib/configs";
import { cn } from "@/lib/utils";

export default function About() {
  const t = useTranslations("About");
  const messages = t.raw("messages").split("\n\n");
  return (
    <div className="flex flex-col-reverse lg:flex-col gap-4">
      <h1
        aria-label="page title"
        className="text-center text-[4rem] md:text-[9rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-heading font-black tracking-tighter leading-none lg:leading-normal uppercase"
      >
        {t("title")}
      </h1>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 relative">
          <Image
            src="/images/assets/haruka.jpg"
            alt="Portrait of Haruka"
            width={600}
            height={600}
            className="w-full aspect-square lg:aspect-12/17 object-cover"
          />
          <h2 className="absolute bottom-4 right-4 text-xl text-white">{t("name")}</h2>
        </div>
        <section
          aria-label="page content"
          className={cn("w-full lg:w-1/2 pt-6 flex flex-col lg:justify-end gap-2 lg:pb-0 font-light", configs.pagePadding)}
        >
        {messages.map((message: string, index: number) => (
          <p key={index}>{message}</p>
        ))}
        </section>
      </div>
    </div>
  );
}
