import { profile } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name} · Built with Claude Code
      </p>
      <a href="#top" className="hover:text-foreground">
        Back to top ↑
      </a>
    </footer>
  );
}
