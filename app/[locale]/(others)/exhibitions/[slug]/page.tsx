import { EXHIBITIONS } from "@/lib/info-exhibitions";
import { notFound } from "next/navigation";

export default function ExhibitionPage({
  params,
}: {
  params: { slug: string };
}) {
  const exhibition = EXHIBITIONS.find(
    (exhibition) => exhibition.slug === params.slug,
  );
  if (!exhibition) {
    notFound();
  }
  return (
    <div>
      <h1>{exhibition.title}</h1>
      <p>{exhibition.description}</p>
      <p>
        {exhibition.date.start} - {exhibition.date.end}
      </p>
      <p>{exhibition.location.name}</p>
      <p>{exhibition.location.address}</p>
    </div>
  );
}
