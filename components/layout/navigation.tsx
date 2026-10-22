"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { portfolio } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MotionToggle } from "@/components/ui/motion-toggle";
import { Ribbon } from "@/components/ui/ribbon";

export function Navigation({ innerPage = false }: { innerPage?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState<CSSProperties>({ opacity: 0 });
  const linksRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (innerPage) return () => window.removeEventListener("scroll", onScroll);
    const destinations = new Set(portfolio.navigation.map((item) => item.href));
    const sections = Array.from(
      document.querySelectorAll("main > section[id]"),
    );
    let observer: IntersectionObserver;
    const observeSections = () => {
      observer?.disconnect();
      const visible = new Set<Element>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
          }
          const current = sections
            .filter((section) => visible.has(section))
            .at(-1);
          const href = current ? `#${current.id}` : "";
          setActive(destinations.has(href) ? href : "");
        },
        // Percentage root margins resolve against width, even on the vertical axis.
        {
          rootMargin: `-${window.innerHeight * 0.15}px 0px -${window.innerHeight * 0.65}px 0px`,
        },
      );
      sections.forEach((section) => observer.observe(section));
    };
    observeSections();
    window.addEventListener("resize", observeSections);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", observeSections);
    };
  }, [innerPage]);

  useLayoutEffect(() => {
    const links = linksRef.current;
    if (!links) return;
    const measure = () => {
      const item = links.querySelector<HTMLAnchorElement>("[aria-current]");
      if (!item) {
        setIndicator((previous) => ({ ...previous, opacity: 0 }));
        return;
      }
      setIndicator({
        width: item.offsetWidth,
        transform: `translateX(${item.offsetLeft}px)`,
        opacity: 1,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(links);
    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    dialog.showModal();
    const trigger = menuButton.current;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.documentElement.style.overflow = previousOverflow;
      window.removeEventListener("resize", onResize);
      if (dialog.open) dialog.close();
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <a href="#main-content" className="skip-link focus-ring">
        Skip to content
      </a>
      <nav aria-label="Primary navigation" className="site-nav shell">
        <a
          href={innerPage ? "/" : "#top"}
          className="nav-brand focus-ring"
        >
          <span aria-hidden="true" className="nav-monogram">
            TS
            <span />
          </span>
          <span className="nav-wordmark display">{portfolio.person.name}</span>
          <span className="sr-only">, home</span>
        </a>
        <div ref={linksRef} className="nav-links">
          {portfolio.navigation.map((item) => (
            <a
              key={item.href}
              href={`${innerPage ? "/" : ""}${item.href}`}
              aria-current={active === item.href ? "location" : undefined}
              className="nav-link focus-ring meta"
            >
              {item.label}
            </a>
          ))}
          <span className="nav-indicator" style={indicator} aria-hidden="true">
            <Ribbon variant="edge" gradient="ember" />
          </span>
        </div>
        <div className="nav-actions">
          <a
            href={portfolio.person.resumeHref}
            download
            className="nav-resume focus-ring meta"
          >
            Resume <span aria-hidden="true">↓</span>
          </a>
          <ThemeToggle />
          <MotionToggle />
          <button
            ref={menuButton}
            type="button"
            className="menu-toggle focus-ring"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className="mobile-menu"
        aria-label="Navigation"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-top">
          <span className="display">{portfolio.person.displayName}</span>
          <button
            type="button"
            className="sheet-close focus-ring"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {portfolio.navigation.map((item, index) => (
            <a
              key={item.href}
              href={`${innerPage ? "/" : ""}${item.href}`}
              className="focus-ring"
              onClick={() => setOpen(false)}
            >
              <span className="meta">0{index + 1}</span>
              <span className="display">{item.label}</span>
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <a
          href={portfolio.person.resumeHref}
          download
          className="mobile-menu-resume focus-ring"
          onClick={() => setOpen(false)}
        >
          <span className="meta">PDF</span>
          <span className="display">Resume</span>
          <span aria-hidden="true">↓</span>
        </a>
        <p className="meta text-slate">
          {portfolio.person.location} / {portfolio.person.workFormat}
        </p>
      </dialog>
    </header>
  );
}
