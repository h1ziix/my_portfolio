import { ActionLink } from "@/components/ui/action-link";

export default function NotFound() {
  return (
    <main className="shell flex min-h-screen flex-col justify-center py-16">
      <h1 className="display max-w-[16ch] text-hero">This page isn’t here.</h1>
      <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-8 text-slate">
        The link may be old or mistyped. The portfolio is a single page, so everything is on the home page.
      </p>
      <div className="mt-8">
        <ActionLink href="/" variant="primary">Go to the home page</ActionLink>
      </div>
    </main>
  );
}
