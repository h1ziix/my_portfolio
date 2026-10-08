import { ArrowUpRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionLabel } from "@/components/ui/section-label";

export function Contact() {
  const email = portfolio.socials.find((social) => social.href.startsWith("mailto:"));
  const otherSocials = portfolio.socials.filter(
    (social) => !social.href.startsWith("mailto:")
  );

  return (
    <section
      id="contact"
      className="content-shell section-space"
      aria-labelledby="contact-title"
    >
      <Reveal>
        <SectionLabel
          id="contact-title"
          eyebrow="05 / Contact"
          title="Let’s build something useful."
          kicker="Open to AI product, full-stack and automation opportunities."
        />
      </Reveal>

      <Reveal className="mt-8 grid min-w-0 gap-8 md:mt-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12">
        <div className="min-w-0">
          {email ? (
            <>
              <ActionLink href={email.href} variant="primary">
                Email me
              </ActionLink>
              <p className="mt-3 break-words text-sm leading-6 text-text-secondary">
                {email.value}
              </p>
            </>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm leading-6 text-text-muted">
            <span>{portfolio.person.location}</span>
            <span aria-hidden="true">/</span>
            <span>{portfolio.person.availability}</span>
          </div>
        </div>

        <ul className="min-w-0 border-t border-border">
          {otherSocials.map((social) => (
            <li key={social.label} className="min-w-0 border-b border-border">
              <a
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="focus-ring group flex min-h-11 min-w-0 items-center justify-between gap-4 py-4 transition-colors hover:text-accent-text"
                aria-label={`${social.label}: ${social.value}`}
              >
                <span className="min-w-0">
                  <span className="block text-base font-medium text-text-primary transition-colors group-hover:text-accent-text">
                    {social.label}
                  </span>
                  <span className="mt-1 block break-words text-sm leading-6 text-text-muted">
                    {social.value}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-text-muted transition-colors group-hover:text-accent-text"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
