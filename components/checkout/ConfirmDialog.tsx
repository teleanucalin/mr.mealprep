"use client";

import { motion, AnimatePresence } from "framer-motion";

import { Button } from "../ui/Button";

type ConfirmDialogProps = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmDialog({ open, onCancel, onConfirm }: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-sm rounded-3xl border border-[#e2e8f0] bg-white p-6 text-center"
            role="alertdialog"
            aria-modal="true"
          >
            <h2 className="text-xl font-semibold text-[#0f172a]">Finalizezi comanda?</h2>
            <p className="mt-2 text-sm text-[#475569]">
              Aceasta este o simulare. Vei fi redirecționat către pagina de success pentru a încheia demo-ul.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Button onClick={onConfirm}>Da, finalizează demo</Button>
              <Button variant="ghost" onClick={onCancel}>
                Înapoi la formular
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

