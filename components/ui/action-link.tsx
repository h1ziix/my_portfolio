import { ArrowUpRight, Download } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function ActionLink({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ActionLinkProps) {
  const Icon = props.download ? Download : ArrowUpRight;
  const base =
    "focus-ring group inline-flex min-h-12 items-center justify-center gap-3 border px-5 font-mono text-xs uppercase tracking-caps transition";
  const variants = {
    primary:
      "border-signal-violet bg-signal-violet text-white shadow-violet hover:bg-transparent",
    secondary:
      "hairline bg-white/[0.02] text-zinc-200 hover:border-white/35 hover:bg-white/[0.06]"
  };

  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span>{children}</span>
      <Icon
        aria-hidden="true"
        className={`h-4 w-4 transition ${
          props.download
            ? "group-hover:translate-y-0.5"
            : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        }`}
      />
    </a>
  );
}
