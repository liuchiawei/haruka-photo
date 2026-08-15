import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { PORTFOLIO_PREFIX } from "@/lib/blob-portfolio";
import { isValidCategoryKey } from "@/lib/portfolio";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        await requireAdmin();

        const payload = JSON.parse(clientPayload ?? "{}") as {
          categoryKey?: string;
        };
        const categoryKey = payload.categoryKey;

        if (!categoryKey || !isValidCategoryKey(categoryKey)) {
          throw new Error("Invalid category");
        }

        const expectedPrefix = `${PORTFOLIO_PREFIX}${categoryKey}/`;
        if (!pathname.startsWith(expectedPrefix)) {
          throw new Error("Invalid pathname");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp"],
          addRandomSuffix: true,
          maximumSizeInBytes: 50 * 1024 * 1024,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}
