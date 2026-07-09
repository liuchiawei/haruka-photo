import { useTranslations } from "next-intl";

export default function About() {
    const t = useTranslations("About");
    const messages = t.raw("messages").split("\n\n");
    return (
        <main>
            <h1>{t("title")}</h1>
            {messages.map((message: string, index: number) => (
                <p key={index}>{message}</p>
            ))}
        </main>
    );
}