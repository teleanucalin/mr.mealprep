import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "../constants";
import { getWeeklyPlan } from "../data";
import { generatePlan, regenerateDay } from "../generator";
import { summarizePlan } from "../calculations";
import type {
  MealPreference,
  PlanDay,
  WeeklyPlan,
  PlanSummary,
} from "../types";

interface PlanState {
  plan: WeeklyPlan;
  preference: MealPreference | null;
  summary?: PlanSummary;
  setPlan: (plan: WeeklyPlan) => void;
  setPreference: (preference: MealPreference) => void;
  regenerate: (preference?: MealPreference) => void;
  regenerateDay: (dayIndex: number) => void;
  updateMeal: (dayIndex: number, mealIndex: number, updater: (meal: PlanDay["meals"][number]) => PlanDay["meals"][number]) => void;
}

const defaultPlan = getWeeklyPlan();

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      plan: defaultPlan,
      preference: null,
      summary: summarizePlan(defaultPlan),
      setPlan: (plan) => set({ plan, summary: summarizePlan(plan) }),
      setPreference: (preference) => set({ preference }),
      regenerate: (preference) => {
        const currentPreference = preference ?? get().preference;
        if (!currentPreference) return;
        const newPlan = generatePlan(currentPreference);
        set({ plan: newPlan, summary: summarizePlan(newPlan) });
      },
      regenerateDay: (dayIndex) => {
        const { plan, preference } = get();
        if (!preference) return;
        const newPlan = regenerateDay(plan, dayIndex, preference);
        set({ plan: newPlan, summary: summarizePlan(newPlan) });
      },
      updateMeal: (dayIndex, mealIndex, updater) => {
        const { plan } = get();
        const days = plan.days.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day;
          return {
            ...day,
            meals: day.meals.map((meal, mIdx) => {
              if (mIdx !== mealIndex) return meal;
              return updater(meal);
            }),
          };
        });
        const updatedPlan: WeeklyPlan = { ...plan, days };
        set({ plan: updatedPlan, summary: summarizePlan(updatedPlan) });
      },
    }),
    {
      name: STORAGE_KEYS.plan,
    },
  ),
);

