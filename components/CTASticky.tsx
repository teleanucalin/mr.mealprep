"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";

type CTAStickyProps = {
  label: string;
  subLabel?: string;
  actionLabel: string;
  onAction: () => void;
  disabled?: boolean;
  className?: string;
};

export function CTASticky({
  label,
  subLabel,
  actionLabel,
  onAction,
  disabled,
  className,
}: CTAStickyProps) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={clsx(
        "fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur-lg",
        className,
      )}
      role="region"
      aria-label="Acțiune principală"
    >
      <div className="mx-auto flex w-full max-w-md flex-col gap-2 px-4 py-4" style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center justify-between text-sm text-[#475569]">
          <span className="font-semibold text-[#0f172a]">{label}</span>
          {subLabel && <span>{subLabel}</span>}
        </div>
        <Button onClick={onAction} disabled={disabled} size="lg" className="w-full">
          {actionLabel}
        </Button>
      </div>
    </motion.div>
  );
}
