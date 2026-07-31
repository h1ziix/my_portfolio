import Image from "next/image";
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

          <div className="mt-8 flex items-center justify-between gap-5">
            <ActionLink
              href="https://github.com/h1ziix"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </ActionLink>
            <div
              aria-hidden="true"
              className="relative h-32 w-32 shrink-0 transition duration-500 hover:-translate-y-1 hover:translate-x-1 hover:rotate-2"
            >
              <Image
                src="/brand/toksoz-cursor.gif"
                alt=""
                fill
                unoptimized
                sizes="128px"
                className="object-contain mix-blend-screen [mask-image:radial-gradient(circle,black_58%,transparent_94%)] motion-reduce:hidden"
              />
              <Image
                src="/brand/toksoz-cursor.webp"
                alt=""
                fill
                sizes="128px"
                className="hidden object-contain mix-blend-screen [mask-image:radial-gradient(circle,black_58%,transparent_94%)] motion-reduce:block"
              />
              <span className="absolute right-2 top-0 font-mono text-lg text-signal-violet">
                ✦
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
