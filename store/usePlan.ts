import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WeekPlan, Efficiency, DietMode, MacroTarget } from "@/lib/types";

interface PlanState {
  weekPlan: WeekPlan | null;
  efficiency: Efficiency;
  lockMacros: boolean;
  dietMode: DietMode;
  macroTarget: MacroTarget | null;
  isGenerating: boolean;

  setWeekPlan: (plan: WeekPlan) => void;
  setEfficiency: (efficiency: Efficiency) => void;
  setLockMacros: (lock: boolean) => void;
  setDietMode: (mode: DietMode) => void;
  setMacroTarget: (target: MacroTarget) => void;
  setIsGenerating: (generating: boolean) => void;
  reset: () => void;
}

export const usePlan = create<PlanState>()(
  persist(
    (set) => ({
      weekPlan: null,
      efficiency: "balanced",
      lockMacros: true,
      dietMode: "omnivore",
      macroTarget: null,
      isGenerating: false,

      setWeekPlan: (plan) => set({ weekPlan: plan }),
      setEfficiency: (efficiency) => set({ efficiency }),
      setLockMacros: (lock) => set({ lockMacros: lock }),
      setDietMode: (mode) => set({ dietMode: mode }),
      setMacroTarget: (target) => set({ macroTarget: target }),
      setIsGenerating: (generating) => set({ isGenerating: generating }),

      reset: () =>
        set({
          weekPlan: null,
          efficiency: "balanced",
          lockMacros: true,
          dietMode: "omnivore",
          macroTarget: null,
          isGenerating: false,
        }),
    }),
    {
      name: "plan-storage",
    }
  )
);

