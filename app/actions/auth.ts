"use server";

import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/navigation";
import {
  clearSessionCookie,
  setSessionCookie,
  verifyCredentials,
} from "@/lib/auth";

export async function login(
  _prev: { error: "invalid" } | null,
  formData: FormData,
): Promise<{ error: "invalid" } | null> {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!verifyCredentials(username, password)) {
    return { error: "invalid" as const };
  }

  await setSessionCookie(username);
  const locale = await getLocale();
  redirect({ href: "/dashboard", locale });
  return null;
}

export async function logout() {
  await clearSessionCookie();
  const locale = await getLocale();
  redirect({ href: "/dashboard", locale });
}
