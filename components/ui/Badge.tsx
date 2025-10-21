import clsx from "clsx";

type BadgeProps = {
  children: React.ReactNode;
  variant?: "success" | "info" | "neutral";
  icon?: React.ReactNode;
  className?: string;
};

const variantStyles: Record<string, string> = {
  success: "bg-[#ecfdf5] text-[#047857] border border-[#bbf7d0]",
  info: "bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe]",
  neutral: "bg-white text-[#0f172a] border border-[#e2e8f0]",
};

export function Badge({ children, variant = "neutral", icon, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
        variantStyles[variant],
        className,
      )}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </span>
  );
}
