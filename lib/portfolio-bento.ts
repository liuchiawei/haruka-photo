export const BENTO_SPAN_CLASSES = [
  "col-span-2 md:col-span-2 md:row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-2 md:col-span-2",
  "col-span-1 md:row-span-2",
  "col-span-1",
] as const;

export function getBentoSpanClass(index: number) {
  return BENTO_SPAN_CLASSES[index % BENTO_SPAN_CLASSES.length];
}
