import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "../constants";

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface UIState {
  isOnboardingComplete: boolean;
  varietyLevel: "low" | "balanced" | "high";
  lockMacros: boolean;
  stickyCTAEnabled: boolean;
  toasts: ToastMessage[];
  addToast: (toast: ToastMessage) => void;
  removeToast: (id: string) => void;
  setOnboardingComplete: (value: boolean) => void;
  setVarietyLevel: (level: "low" | "balanced" | "high") => void;
  setLockMacros: (locked: boolean) => void;
  setStickyCTAEnabled: (enabled: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isOnboardingComplete: false,
      varietyLevel: "balanced",
      lockMacros: true,
      stickyCTAEnabled: true,
      toasts: [],
      addToast: (toast) =>
        set((state) => ({ toasts: [...state.toasts, toast] })),
      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
      setOnboardingComplete: (value) => set({ isOnboardingComplete: value }),
      setVarietyLevel: (level) => set({ varietyLevel: level }),
      setLockMacros: (locked) => set({ lockMacros: locked }),
      setStickyCTAEnabled: (enabled) => set({ stickyCTAEnabled: enabled }),
    }),
    {
      name: STORAGE_KEYS.ui,
    },
  ),
);

