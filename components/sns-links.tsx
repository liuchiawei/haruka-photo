import { SiGmail, SiInstagram } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import configs from "@/lib/configs";

export default function SNSLinks() {
  return (
    <div aria-label="Social Links" className="flex flex-1 flex-col gap-2">
      <Link
        aria-label="Instagram"
        href={configs.instagram.url}
        target="_blank"
        className="flex items-center gap-2"
      >
        <SiInstagram />{" "}
        <span className="text-sm lg:text-lg">
          @{configs.instagram.username}
        </span>
      </Link>
      <Link
        aria-label="Email"
        href={`mailto:${configs.email}`}
        target="_blank"
        className="flex items-center gap-2"
      >
        <SiGmail /> <span className="text-sm lg:text-lg">{configs.email}</span>
      </Link>
    </div>
  );
}
