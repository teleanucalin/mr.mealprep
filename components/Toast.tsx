"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";

type Toast = {
  id: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
};

type ToastProps = {
  toasts: Toast[];
  onDismiss: (id: string) => void;
};

export function ToastContainer({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-3 px-4">
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-auto w-full max-w-sm rounded-2xl border border-[#cbd5f5]/60 bg-white p-4 shadow-card"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-[#0f172a]">{toast.title}</p>
                {toast.description && (
                  <p className="text-sm text-[#475569]">{toast.description}</p>
                )}
                {toast.actionLabel && toast.onAction && (
                  <button
                    type="button"
                    className="mt-1 inline-flex items-center text-sm font-medium text-[#059669]"
                    onClick={() => toast.onAction?.()}
                  >
                    {toast.actionLabel}
                  </button>
                )}
              </div>
              <button
                type="button"
                className={clsx(
                  "rounded-full p-1 text-[#64748b] transition-colors hover:bg-[#f1f5f9]",
                )}
                onClick={() => onDismiss(toast.id)}
                aria-label="Închide notificarea"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

