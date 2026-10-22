import { portfolio } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="shell site-footer">
      <svg
        className="footer-wordmark display"
        viewBox="0 0 1280 228"
        aria-hidden="true"
        focusable="false"
      >
        <text
          x="0"
          y="180"
          textLength="1280"
          lengthAdjust="spacingAndGlyphs"
          fill="currentColor"
        >
          {portfolio.person.displayName}
        </text>
      </svg>
      <div className="footer-bottom meta">
        <p>
          © {new Date().getFullYear()} {portfolio.person.name}
        </p>
        <div className="footer-links">
          {portfolio.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="text-link focus-ring"
            >
              {social.label}
              {social.href.startsWith("http") ? (
                <span aria-hidden="true">↗</span>
              ) : null}
            </a>
          ))}
        </div>
        <a href="#top" className="text-link focus-ring">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
