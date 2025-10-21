"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

type Step = {
  label: string;
  description?: string;
};

type StepperProps = {
  steps: Step[];
  activeIndex: number;
  onStepClick?: (index: number) => void;
};

export function Stepper({ steps, activeIndex, onStepClick }: StepperProps) {
  return (
    <ol className="flex flex-col gap-4" aria-label="Pași onboarding">
      {steps.map((step, index) => {
        const status = index < activeIndex ? "complete" : index === activeIndex ? "current" : "upcoming";
        return (
          <li key={step.label}>
            <button
              type="button"
              className={clsx(
                "flex w-full items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-colors",
                status === "current" && "border-[#059669] bg-white shadow-card",
                status === "complete" && "border-[#bbf7d0] bg-[#ecfdf5] text-[#047857]",
                status === "upcoming" && "border-[#e2e8f0] text-[#64748b]",
              )}
              onClick={() => onStepClick?.(index)}
              aria-current={status === "current" ? "step" : undefined}
            >
              <motion.span
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold",
                  status === "current" && "bg-[#059669] text-white",
                  status === "complete" && "bg-white text-[#047857]",
                  status === "upcoming" && "bg-[#f8fafc]",
                )}
                layout
              >
                {status === "complete" ? "✓" : index + 1}
              </motion.span>
              <span className="flex flex-col">
                <span className="text-base font-semibold text-[#0f172a]">{step.label}</span>
                {step.description && (
                  <span className="text-sm text-[#64748b]">{step.description}</span>
                )}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
