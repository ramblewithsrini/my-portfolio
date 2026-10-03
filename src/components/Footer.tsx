import Link from "next/link";
import { hasPublishedArticles } from "@/data/insights";
import { profile } from "@/data/portfolio";
import { sourceUrl } from "@/data/underTheHood";

export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name} · Built with Claude Code
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        {/* Insights is reachable from the footer on phones, where the nav has no room for it. */}
        {hasPublishedArticles && (
          <Link href="/insights" className="hover:text-foreground">
            Insights
          </Link>
        )}
        <Link href="/under-the-hood" className="hover:text-foreground">
          Under the hood
        </Link>
        <a href={sourceUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">
          Source on GitHub ↗
        </a>
        <a href="#top" className="hover:text-foreground">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
