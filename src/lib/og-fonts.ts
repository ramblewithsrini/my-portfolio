import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Space Grotesk for generated images (social card, icons), read from the
// installed @fontsource package so builds don't depend on a network fetch.
// next/og accepts .woff (not .woff2).
const dir = join(process.cwd(), "node_modules/@fontsource/space-grotesk/files");

export async function ogFonts() {
  const [medium, bold] = await Promise.all([
    readFile(join(dir, "space-grotesk-latin-500-normal.woff")),
    readFile(join(dir, "space-grotesk-latin-700-normal.woff")),
  ]);
  return [
    { name: "Space Grotesk", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Space Grotesk", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}
