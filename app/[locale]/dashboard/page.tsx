import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { logout } from "@/app/actions/auth";
import { ImageManager } from "@/components/dashboard/image-manager";
import { LoginForm } from "@/components/dashboard/login-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminSession } from "@/lib/auth";
import { getDashboardImages } from "@/lib/blob-portfolio";
import { getAllCategoryKeys } from "@/lib/portfolio";

export default async function DashboardPage() {
  const session = await getAdminSession();
  const t = await getTranslations("Dashboard");

  if (!session) {
    return <LoginForm />;
  }

  return (
    <div className="flex w-full flex-col gap-10">
      <header className="flex items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold tracking-widest uppercase">
          {t("title")}
        </h1>
        <form action={logout}>
          <Button type="submit" variant="outline">
            {t("logout")}
          </Button>
        </form>
      </header>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardImageSection />
      </Suspense>
    </div>
  );
}

async function DashboardImageSection() {
  const images = await getDashboardImages();

  return (
    <ImageManager images={images} categoryKeys={getAllCategoryKeys()} />
  );
}

function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} className="aspect-square w-full" />
      ))}
    </div>
  );
}
