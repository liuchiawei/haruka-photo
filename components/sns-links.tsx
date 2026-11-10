import { SiGmail, SiInstagram } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import configs from "@/lib/configs";
import { cn } from "@/lib/utils";

export default function SNSLinks({
  variant = "long",
}: {
  variant?: "long" | "short";
}) {
  return (
    <div
      aria-label="Social Links"
      className={cn(
        "flex flex-1",
        variant === "long" ? "flex-col gap-2" : "justify-end gap-6",
      )}
    >
      <FooterLink href={configs.instagram.url}>
        <SiInstagram />{" "}
        {variant === "long" && (
          <span className="text-sm lg:text-lg">
            @{configs.instagram.username}
          </span>
        )}
      </FooterLink>
      <FooterLink href={`mailto:${configs.email}`}>
        <SiGmail />{" "}
        {variant === "long" && (
          <span className="text-sm lg:text-lg">{configs.email}</span>
        )}
      </FooterLink>
    </div>
  );
}

function FooterLink({
  href,
  children,
  variant = "long",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "long" | "short";
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "flex items-center gap-4 w-fit",
        variant === "short" ? "gap-2" : "hover:scale-110 transition-transform",
      )}
    >
      {children}
    </Link>
  );
}
