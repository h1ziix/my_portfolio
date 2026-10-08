import { ArrowUp } from "lucide-react";
import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="content-shell">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border py-5 text-xs leading-6 text-text-muted">
        <p className="font-mono">{portfolio.person.name}</p>
        <a
          href="#top"
          className="focus-ring inline-flex min-h-11 items-center gap-2 font-mono transition-colors hover:text-accent-text"
        >
          Back to top
          <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
        </a>
      </div>
    </footer>
  );
}
