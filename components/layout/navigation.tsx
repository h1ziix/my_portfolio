import { ScrollProgress } from "@/components/layout/scroll-progress";
import { portfolio } from "@/data/portfolio";

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-canvas">
      <a href="#main-content" className="skip-link focus-ring">Skip to content</a>
      <nav aria-label="Primary navigation" className="shell flex min-h-16 min-w-0 items-center justify-between gap-3 md:gap-6">
        <a href="#top" className="focus-ring inline-flex min-h-11 shrink-0 items-center gap-3 text-sm font-semibold tracking-tight text-text-primary">
          <span aria-hidden="true" className="font-mono text-accent-text">[ts]</span>
          <span>{portfolio.person.name}</span>
        </a>
        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          {portfolio.navigation.map((item) => (
            <a key={item.href} href={item.href} className="focus-ring inline-flex min-h-11 items-center text-sm text-text-secondary transition-colors hover:text-accent-text">{item.label}</a>
          ))}
        </div>
        <div className="flex min-w-0 items-center gap-2 md:hidden">
          {portfolio.navigation.filter((item) => item.href === "#work" || item.href === "#contact").map((item) => (
            <a key={item.href} href={item.href} className="focus-ring inline-flex min-h-11 items-center px-2 text-xs font-medium text-text-secondary transition-colors hover:text-accent-text">{item.label}</a>
          ))}
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
