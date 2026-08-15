export function sanitizeFilename(filename: string): string {
  const base = filename.split(/[/\\]/).pop() ?? "image";
  const sanitized = base
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return sanitized || "image";
}
