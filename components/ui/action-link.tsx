import type { AnchorHTMLAttributes, ReactNode } from "react";

type ActionVariant = "primary" | "secondary";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: ActionVariant;
};

const base =
  "action-link focus-ring inline-flex min-h-12 min-w-0 max-w-full items-center justify-center rounded-control border px-5 text-base font-medium transition-colors duration-150 active:translate-y-px aria-disabled:cursor-progress aria-disabled:opacity-70";
const variants: Record<ActionVariant, string> = {
  primary:
    "action-primary border-primary bg-primary text-on-action hover:border-primary-hover hover:bg-primary-hover",
  secondary:
    "action-secondary border-ink bg-transparent text-ink hover:bg-ink hover:text-bg",
};

/** Shared by links and buttons, so one action looks the same wherever it appears. */
export function actionClasses(variant: ActionVariant = "secondary") {
  return `${base} ${variants[variant]}`;
}

export function ActionLink({
  children,
  variant = "secondary",
  className = "",
  ...props
}: ActionLinkProps) {
  return (
    <a className={`${actionClasses(variant)} ${className}`} {...props}>
      <span>{children}</span>
      <span className="action-arrow" aria-hidden="true">
        {props.download ? "↓" : variant === "primary" ? "→" : "↗"}
      </span>
    </a>
  );
}
