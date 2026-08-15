import Image, { type ImageProps } from "next/image";

function isVercelBlobUrl(src: ImageProps["src"]) {
  return typeof src === "string" && src.includes(".blob.vercel-storage.com");
}

export function AppImage({ unoptimized, ...props }: ImageProps) {
  return (
    <Image
      {...props}
      unoptimized={
        unoptimized ??
        (isVercelBlobUrl(props.src) && process.env.NODE_ENV !== "production")
      }
    />
  );
}
