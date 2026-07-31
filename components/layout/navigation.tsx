import Image from "next/image";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { portfolio } from "@/data/portfolio";

export function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/78 backdrop-blur-xl">
      <nav
        aria-label="Primary navigation"
        className="shell flex min-h-16 items-center justify-between gap-6"
      >
        <a
          href="#top"
          className="focus-ring group inline-flex items-center gap-2 font-mono text-sm font-semibold uppercase tracking-caps text-white"
        >
          <span>{portfolio.person.displayName}</span>
          <span
            aria-hidden="true"
            className="relative h-6 w-6 shrink-0 transition duration-300 group-hover:rotate-3"
          >
            <Image
              src="/brand/toksoz-keycap.gif"
              alt=""
              fill
              unoptimized
              sizes="24px"
              className="object-contain [mask-image:radial-gradient(circle,black_58%,transparent_94%)] motion-reduce:hidden"
            />
            <Image
              src="/brand/toksoz-keycap.webp"
              alt=""
              fill
              sizes="24px"
              className="hidden object-contain [mask-image:radial-gradient(circle,black_58%,transparent_94%)] motion-reduce:block"
            />
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {portfolio.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring font-mono text-xs uppercase tracking-caps text-zinc-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 bg-signal-violet shadow-[0_0_16px_rgba(176,38,255,0.9)]"
          />
          <p className="hidden font-mono text-[0.68rem] uppercase tracking-caps text-zinc-400 sm:block">
            {portfolio.person.availability}
          </p>
          <a
            href="#contact"
            className="focus-ring border border-white/12 px-3 py-2 font-mono text-[0.68rem] uppercase tracking-caps text-zinc-200 transition hover:border-signal-violet hover:text-white sm:hidden"
          >
            Contact
          </a>
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
