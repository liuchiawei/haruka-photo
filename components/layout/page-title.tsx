export function PageTitle({ title }: { title: string }) {
  return (
    <h1
      aria-label="page title"
      className="text-center text-[2rem] md:text-[3rem] xl:text-[6rem] 2xl:text-[10rem] font-heading font-thin tracking-widest uppercase wrap-break-word"
    >
      {title}
    </h1>
  );
}
