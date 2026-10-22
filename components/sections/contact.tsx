import { portfolio } from "@/data/portfolio";
import { ActionLink } from "@/components/ui/action-link";
import { additionalContactLinks } from "@/data/contact-links";
import { Ribbon } from "@/components/ui/ribbon";
import { CopyEmail } from "@/components/ui/copy-email";

export function Contact() {
  const { person } = portfolio;
  const email = portfolio.socials.find((social) =>
    social.href.startsWith("mailto:"),
  );
  const city = person.location.split(",")[0];
  return (
    <section
      id="contact"
      className="section contact-section tape-clip"
      aria-labelledby="contact-title"
    >
      <div className="contact-backdrop">
        <Ribbon
          variant="cross"
          gradient="ember"
          accessibleText="Shipped. Open to work. Remote or hybrid."
        >
          SHIPPED ✦ OPEN TO WORK ✦ REMOTE OR HYBRID
        </Ribbon>
      </div>
      <div className="shell contact-content">
        <span className="section-index meta" aria-hidden="true">
          05 /
        </span>
        <h2 id="contact-title" className="display contact-title">
          Get in touch
        </h2>
        <div className="contact-intro grid-12">
          <p>
            {person.availability}, {person.workFormat.toLowerCase()} from {city}
            .
          </p>
          <div className="contact-actions">
            {email ? (
              <ActionLink href={email.href} variant="primary">
                Send an email
              </ActionLink>
            ) : null}
            <ActionLink href={person.resumeHref} download>
              Download resume
            </ActionLink>
          </div>
        </div>
        {email ? (
          <div className="contact-email-row">
            <a className="contact-email display focus-ring" href={email.href}>
              {email.value}
            </a>
            <CopyEmail email={email.value} />
          </div>
        ) : null}
        <ul className="contact-index">
          {portfolio.socials.map((social, index) => {
            const external = social.href.startsWith("http");
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="contact-index-row focus-ring"
                >
                  <span className="meta contact-index-number">
                    0{index + 1}
                  </span>
                  <span className="display">{social.label}</span>
                  <span className="contact-value">{social.value}</span>
                  <span className="index-arrow" aria-hidden="true">
                    {external ? "↗" : "→"}
                  </span>
                  {external ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            );
          })}
          {additionalContactLinks.map((social, index) => {
            const configured = /^https?:\/\//.test(social.href);
            const contents = (
              <>
                <span className="meta contact-index-number">
                  0{index + portfolio.socials.length + 1}
                </span>
                <span className="display">{social.label}</span>
                <span className="contact-value">
                  {configured ? (
                    social.href.replace(/^https?:\/\//, "")
                  ) : (
                    <>
                      <span className="meta">{social.href}</span>
                      <span className="placeholder-note">Add profile URL</span>
                    </>
                  )}
                </span>
                <span className="index-arrow" aria-hidden="true">
                  {configured ? "↗" : "—"}
                </span>
              </>
            );
            return (
              <li
                key={social.label}
                data-profile-status={configured ? "configured" : "placeholder"}
              >
                {configured ? (
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-index-row focus-ring"
                  >
                    {contents}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <div
                    className="contact-index-row contact-placeholder"
                    aria-disabled="true"
                  >
                    {contents}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
