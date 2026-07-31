import Image from "next/image";
import { portfolio } from "@/data/portfolio";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function About() {
  return (
    <section className="shell py-24 md:py-32" aria-labelledby="about-title">
      <Reveal>
        <SectionLabel
          id="about-title"
          eyebrow="Approach"
          title={"I don't just ship code. I turn ambiguous problems into working systems."}
          kicker="I start with the business workflow, map the data and constraints, then own the implementation from interface and backend logic through testing and delivery."
        />
      </Reveal>

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.62fr_1fr]">
        <Reveal className="border-l border-signal-violet pl-6">
          <p className="max-w-xl text-pretty text-xl leading-9 text-zinc-300">
            {portfolio.person.profile} My work sits between product thinking,
            backend reliability, interface quality and practical automation.
          </p>
          <div
            aria-hidden="true"
            className="relative mx-auto mt-8 h-56 w-full max-w-[280px] transition duration-500 hover:scale-[1.03] sm:mx-0"
          >
            <Image
              src="/brand/toksoz-keycap.gif"
              alt=""
              fill
              unoptimized
              sizes="280px"
              className="object-contain mix-blend-screen [mask-image:radial-gradient(circle,black_58%,transparent_94%)] motion-reduce:hidden"
            />
            <Image
              src="/brand/toksoz-keycap.webp"
              alt=""
              fill
              sizes="280px"
              className="hidden object-contain mix-blend-screen [mask-image:radial-gradient(circle,black_58%,transparent_94%)] motion-reduce:block"
            />
            <span className="absolute right-4 top-3 font-mono text-2xl text-signal-violet">
              ✦
            </span>
          </div>
        </Reveal>

        <ol className="grid border-t hairline">
          {portfolio.approach.map((item, index) => (
            <Reveal
              as="li"
              key={item}
              delay={index * 0.04}
              className="grid gap-4 border-b hairline py-5 sm:grid-cols-[120px_1fr]"
            >
              <span className="font-mono text-xs uppercase tracking-caps text-signal-violet">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-2xl font-medium text-white">{item}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
