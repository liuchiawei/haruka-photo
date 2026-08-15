"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { AppImage as Image } from "@/components/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { upload } from "@vercel/blob/client";
import { ArrowDown, ArrowUp, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import {
  deleteImage,
  registerUploadedImages,
  reorderImages,
} from "@/app/actions/images";
import type { DashboardImage } from "@/lib/blob-portfolio";
import { sanitizeFilename } from "@/lib/filename";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ImageManagerProps = {
  images: DashboardImage[];
  categoryKeys: string[];
};

function categoryLabel(
  key: string,
  t: ReturnType<typeof useTranslations<"Portfolio">>,
): string {
  const [category, sub] = key.split("/");
  const categoryName = t(`categories.${category as "event"}`);
  if (!sub) {
    return categoryName;
  }

  return `${categoryName} / ${t(`subcategories.${sub as "studio"}`)}`;
}

export function ImageManager({ images, categoryKeys }: ImageManagerProps) {
  const t = useTranslations("Dashboard");
  const tp = useTranslations("Portfolio");
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categoryKey, setCategoryKey] = useState(categoryKeys[0] ?? "");
  const [items, setItems] = useState(images);
  const [imagesSnapshot, setImagesSnapshot] = useState(images);
  const [pendingDelete, setPendingDelete] = useState<DashboardImage | null>(
    null,
  );
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  if (images !== imagesSnapshot) {
    setImagesSnapshot(images);
    setItems(images);
  }

  const visible = useMemo(
    () => items.filter((image) => image.categoryKey === categoryKey),
    [items, categoryKey],
  );

  function persistOrder(nextVisible: DashboardImage[]) {
    setItems((current) => [
      ...current.filter((image) => image.categoryKey !== categoryKey),
      ...nextVisible,
    ]);

    startTransition(async () => {
      await reorderImages(
        categoryKey,
        nextVisible.map((image) => image.pathname),
      );
      router.refresh();
    });
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= visible.length) {
      return;
    }

    const nextVisible = [...visible];
    const current = nextVisible[index];
    nextVisible[index] = nextVisible[target];
    nextVisible[target] = current;
    persistOrder(nextVisible);
  }

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0 || !categoryKey) {
      return;
    }

    const files = Array.from(fileList).filter((file) =>
      ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    );

    if (files.length === 0) {
      toast.error(t("invalidFileType"));
      return;
    }

    setUploading(true);

    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const pathname = `portfolio/${categoryKey}/${Date.now()}-${sanitizeFilename(file.name)}`;
          const blob = await upload(pathname, file, {
            access: "public",
            handleUploadUrl: "/api/blob/upload",
            clientPayload: JSON.stringify({ categoryKey }),
            multipart: true,
          });

          return {
            url: blob.url,
            pathname: blob.pathname,
            categoryKey,
          };
        }),
      );

      await registerUploadedImages(uploaded);
      toast.success(t("uploadSuccess"));
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message || t("uploadFailed"));
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function confirmDelete() {
    if (!pendingDelete) {
      return;
    }

    const image = pendingDelete;
    setPendingDelete(null);
    setItems((current) =>
      current.filter((item) => item.pathname !== image.pathname),
    );

    startTransition(async () => {
      await deleteImage(image);
      toast.success(t("deleteSuccess"));
      router.refresh();
    });
  }

  const busy = uploading || isPending;

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-56 flex-col gap-2">
          <Label>{t("category")}</Label>
          <Select
            value={categoryKey}
            onValueChange={(value) => {
              if (value) {
                setCategoryKey(value);
              }
            }}
          >
            <SelectTrigger className="w-full min-w-56">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryKeys.map((key) => (
                <SelectItem key={key} value={key}>
                  {categoryLabel(key, tp)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={(event) => {
              void handleFiles(event.target.files);
            }}
          />
          <Button
            type="button"
            disabled={busy || !categoryKey}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload data-icon="inline-start" />
            {uploading ? t("uploading") : t("upload")}
          </Button>
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("empty")}</p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((image, index) => (
            <li
              key={image.pathname}
              className="group relative overflow-hidden bg-muted"
            >
              <Image
                src={image.url}
                alt=""
                width={400}
                height={400}
                className="aspect-square h-auto w-full object-cover"
              />
              <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2">
                <span className="bg-background/80 px-2 py-1 text-[10px] font-semibold tracking-widest uppercase">
                  {index === 0 ? t("cover") : `${t("priority")} ${index + 1}`}
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex justify-end gap-1 bg-linear-to-t from-black/50 to-transparent p-2">
                <Button
                  type="button"
                  size="icon-xs"
                  variant="secondary"
                  disabled={busy || index === 0}
                  onClick={() => move(index, -1)}
                  aria-label={t("moveUp")}
                >
                  <ArrowUp />
                </Button>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="secondary"
                  disabled={busy || index === visible.length - 1}
                  onClick={() => move(index, 1)}
                  aria-label={t("moveDown")}
                >
                  <ArrowDown />
                </Button>
                <Button
                  type="button"
                  size="icon-xs"
                  variant="destructive"
                  disabled={busy}
                  onClick={() => setPendingDelete(image)}
                  aria-label={t("delete")}
                >
                  <Trash2 />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog
        open={Boolean(pendingDelete)}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDelete(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete")}</AlertDialogTitle>
            <AlertDialogDescription>{t("deleteConfirm")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDelete}>
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
