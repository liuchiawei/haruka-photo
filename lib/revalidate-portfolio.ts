import { routing } from "@/i18n/routing";
import { revalidatePath } from "next/cache";

export function revalidatePortfolioPaths(categoryKey: string) {
  const [category, sub] = categoryKey.split("/");

  for (const locale of routing.locales) {
    revalidatePath(`/${locale}/dashboard`);
    revalidatePath(`/${locale}/portfolio`);
    revalidatePath(`/${locale}/portfolio/${category}`);
    if (sub) {
      revalidatePath(`/${locale}/portfolio/${category}/${sub}`);
    }
  }
}
