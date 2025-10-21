"use client";

import { forwardRef } from "react";
import { Loader2 } from "lucide-react";
import clsx from "clsx";

const baseStyles =
  "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#059669] disabled:opacity-50 disabled:cursor-not-allowed";

const variantStyles: Record<string, string> = {
  primary:
    "bg-[#059669] text-white shadow-button hover:bg-[#047857] active:bg-[#065f46]",
  secondary:
    "bg-white text-[#059669] border border-[#059669]/30 hover:border-[#059669]/60",
  ghost: "bg-transparent text-[#059669] hover:bg-[#ecfdf5]",
};

const sizeStyles: Record<string, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-7 text-base",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled,
    icon,
    iconPosition = "left",
    children,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      ref={ref}
      disabled={isDisabled}
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "transition-transform duration-150 ease-out hover:translate-y-[-1px] active:translate-y-0",
        className,
      )}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-2 inline-flex items-center" aria-hidden>
          {icon}
        </span>
      )}
      <span className="flex items-center gap-2">
        {children}
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      </span>
      {icon && iconPosition === "right" && (
        <span className="ml-2 inline-flex items-center" aria-hidden>
          {icon}
        </span>
      )}
    </button>
  );
});
