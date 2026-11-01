import { SiGmail, SiInstagram } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import configs from "@/lib/configs";

export default function SNSLinks() {
  return (
    <div aria-label="Social Links" className="flex flex-1 flex-col gap-2">
      <FooterLink href={configs.instagram.url}>
        <SiInstagram />{" "}
        <span className="text-sm lg:text-lg">
          @{configs.instagram.username}
        </span>
      </FooterLink>
      <FooterLink href={`mailto:${configs.email}`}>
        <SiGmail /> <span className="text-sm lg:text-lg">{configs.email}</span>
      </FooterLink>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-2 w-fit p-1 md:p-2"
    >
      {children}
    </Link>
  );
}
