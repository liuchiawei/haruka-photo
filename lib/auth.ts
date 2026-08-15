import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV !== "production") {
    return "haruka-photo-dev-auth-secret";
  }

  throw new Error("AUTH_SECRET is required in production");
}

function hmac(value: string): Buffer {
  return createHmac("sha256", getAuthSecret()).update(value).digest();
}

function safeEqual(left: string, right: string): boolean {
  const leftHash = hmac(left);
  const rightHash = hmac(right);
  return timingSafeEqual(leftHash, rightHash);
}

function sign(payload: string): string {
  return hmac(payload).toString("hex");
}

function createSessionToken(username: string): string {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const payload = `${username}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

function parseSessionToken(token: string): { username: string } | null {
  const lastDot = token.lastIndexOf(".");
  if (lastDot <= 0) {
    return null;
  }

  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const expected = sign(payload);

  if (!safeEqual(signature, expected)) {
    return null;
  }

  const separator = payload.lastIndexOf(".");
  if (separator <= 0) {
    return null;
  }

  const username = payload.slice(0, separator);
  const expiresAt = Number(payload.slice(separator + 1));

  if (!username || !Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return null;
  }

  return { username };
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "admin";
  const userOk = safeEqual(username, expectedUser);
  const passOk = safeEqual(password, expectedPass);
  return userOk && passOk;
}

export async function setSessionCookie(username: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ username: string } | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  return parseSessionToken(token);
}

export async function requireAdmin(): Promise<{ username: string }> {
  const session = await getAdminSession();
  if (!session) {
    throw new UnauthorizedError();
  }

  return session;
}
