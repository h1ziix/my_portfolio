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
    "focus-ring group inline-flex min-h-12 min-w-0 max-w-full items-center justify-center gap-3 rounded-control border px-4 text-sm font-medium transition-colors duration-150 active:translate-y-px sm:px-5";
  const variants = {
    primary:
      "border-accent bg-accent text-on-accent hover:border-accent-hover hover:bg-accent-hover",
    secondary:
      "border-border-strong bg-surface text-text-primary hover:border-accent hover:bg-accent-subtle"
  };

  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...props}>
      <span className="min-w-0 break-words">{children}</span>
      <Icon
        aria-hidden="true"
        className={`h-4 w-4 shrink-0 transition ${
          props.download
            ? "group-hover:translate-y-0.5"
            : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        }`}
      />
    </a>
  );
}
