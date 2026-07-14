import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";

export function Contact() {
  return (
    <section
      id="contact"
      className="shell min-h-[86vh] py-24 md:py-32"
      aria-labelledby="contact-title"
    >
      <Reveal className="grid gap-12 border-t hairline pt-8 lg:grid-cols-[1fr_0.68fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-caps text-signal-violet">
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-6 max-w-5xl text-balance text-5xl font-semibold uppercase leading-[0.9] text-white md:text-8xl"
          >
            Have a complex problem?
            <br />
            Let&apos;s turn it into
            <br />a working product.
          </h2>
        </div>

        <div className="self-end">
          <p className="max-w-lg text-pretty text-lg leading-8 text-zinc-300">
            Open to remote and hybrid opportunities where product sense,
            backend execution, automation and AI workflow design matter.
          </p>

          <div className="mt-10 grid border-t hairline">
            {portfolio.socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  className="focus-ring group grid grid-cols-[32px_1fr] gap-4 border-b hairline py-5"
                  aria-label={`${social.label}: ${social.value}`}
                >
                  <Icon
                    aria-hidden="true"
                    className="h-5 w-5 text-zinc-500 transition group-hover:text-signal-violet"
                  />
                  <span>
                    <span className="block font-mono text-[0.68rem] uppercase tracking-caps text-zinc-500">
                      {social.label}
                    </span>
                    <span className="mt-1 block text-lg text-white">
                      {social.value}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          <ActionLink
            href="https://github.com/h1ziix"
            target="_blank"
            rel="noreferrer"
            className="mt-10"
          >
            View GitHub
          </ActionLink>
        </div>
      </Reveal>
    </section>
  );
}
