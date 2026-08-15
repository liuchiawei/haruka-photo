"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { login } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const t = useTranslations("Dashboard");
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <Card className="mx-auto w-full max-w-sm ring-0 shadow-none">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("loginDescription")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">{t("username")}</Label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">{t("password")}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          {state?.error === "invalid" ? (
            <p className="text-sm text-destructive" role="alert">
              {t("invalidCredentials")}
            </p>
          ) : null}
          <Button type="submit" disabled={pending}>
            {pending ? t("signingIn") : t("login")}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
