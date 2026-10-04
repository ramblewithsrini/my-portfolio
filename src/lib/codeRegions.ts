import { readFileSync } from "node:fs";
import { join } from "node:path";

// The source files whose regions can be shown on the site. Paths are written
// out in full (not built from variables) so the bundler includes only these
// two files, rather than tracing the whole project.
const sources = {
  typescript: { file: "src/lib/mdm.ts", read: () => readFileSync(join(process.cwd(), "src", "lib", "mdm.ts"), "utf8") },
  python: { file: "python/mdm.py", read: () => readFileSync(join(process.cwd(), "python", "mdm.py"), "utf8") },
};

export type CodeSource = keyof typeof sources;

export const sourceFile = (lang: CodeSource) => sources[lang].file;

/**
 * Read a named region from a real source file at build time, so code shown on
 * the site is always the code that runs. Regions are marked with
 * `// #region name` … `// #endregion` (TypeScript) or
 * `# region name` … `# endregion` (Python).
 */
export function codeRegion(lang: CodeSource, name: string) {
  const source = sources[lang].read().replace(/\r\n/g, "\n");
  const [open, close] =
    lang === "python" ? [`# region ${name}\n`, "# endregion"] : [`// #region ${name}\n`, "// #endregion"];
  const start = source.indexOf(open);
  if (start < 0) throw new Error(`Region "${name}" not found in ${sources[lang].file}`);
  const from = start + open.length;
  const end = source.indexOf(close, from);
  if (end < 0) throw new Error(`Region "${name}" in ${sources[lang].file} is not closed`);
  return source.slice(from, end).replace(/\n+$/, "");
}
