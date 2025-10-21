import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "../constants";
import { getClientWeeklyPlan } from "../clientData";
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
  pinned: Record<string, boolean>;
  setPlan: (plan: WeeklyPlan) => void;
  setPreference: (preference: MealPreference) => void;
  regenerate: (preference?: MealPreference) => void;
  regenerateDay: (dayIndex: number) => void;
  updateMeal: (
    dayIndex: number,
    mealIndex: number,
    updater: (meal: PlanDay["meals"][number]) => PlanDay["meals"][number],
  ) => void;
  swapMeal: (dayIndex: number, mealIndex: number, recipeId: string) => void;
  togglePinned: (recipeId: string) => void;
  isPinned: (recipeId: string) => boolean;
}

const defaultPlan = getClientWeeklyPlan();

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      plan: defaultPlan,
      preference: null,
      summary: summarizePlan(defaultPlan),
      pinned: {},
      setPlan: (plan) => set({ plan, summary: summarizePlan(plan) }),
      setPreference: (preference) => set({ preference }),
      regenerate: (preference) => {
        const currentPreference = preference ?? get().preference;
        if (!currentPreference) return;
        const previousPlan = get().plan;
        const newPlan = generatePlan(currentPreference);
        const pinned = get().pinned;
        const mergedPlan: WeeklyPlan = {
          ...newPlan,
          days: newPlan.days.map((day, index) => {
            const previousDay = previousPlan.days[index];
            return {
              ...day,
              meals: day.meals.map((meal, mealIndex) => {
                const prevMeal = previousDay?.meals[mealIndex];
                if (prevMeal && pinned[prevMeal.recipeId]) {
                  return prevMeal;
                }
                return meal;
              }),
            };
          }),
        };
        set({ plan: mergedPlan, summary: summarizePlan(mergedPlan) });
      },
      regenerateDay: (dayIndex) => {
        const { plan, preference } = get();
        if (!preference) return;
        const pinned = get().pinned;
        const regenerated = regenerateDay(plan, dayIndex, preference);
        const mergedPlan: WeeklyPlan = {
          ...plan,
          days: plan.days.map((day, index) => {
            if (index !== dayIndex) return day;
            const regeneratedDay = regenerated.days[dayIndex];
            return {
              ...day,
              meals: day.meals.map((meal, mealIndex) => {
                if (pinned[meal.recipeId]) {
                  return meal;
                }
                return regeneratedDay?.meals[mealIndex] ?? meal;
              }),
            };
          }),
        };
        set({ plan: mergedPlan, summary: summarizePlan(mergedPlan) });
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
      swapMeal: (dayIndex, mealIndex, recipeId) => {
        const { plan, pinned } = get();
        const days = plan.days.map((day, dIdx) => {
          if (dIdx !== dayIndex) return day;
          return {
            ...day,
            meals: day.meals.map((meal, mIdx) => {
              if (mIdx !== mealIndex) return meal;
              return {
                ...meal,
                recipeId,
              };
            }),
          };
        });
        const updatedPinned = { ...pinned };
        const previousRecipeId = plan.days[dayIndex]?.meals[mealIndex]?.recipeId;
        if (previousRecipeId && updatedPinned[previousRecipeId]) {
          delete updatedPinned[previousRecipeId];
        }
        set({
          plan: { ...plan, days },
          summary: summarizePlan({ ...plan, days }),
          pinned: updatedPinned,
        });
      },
      togglePinned: (recipeId) => {
        const { pinned } = get();
        const updated = { ...pinned };
        if (updated[recipeId]) {
          delete updated[recipeId];
        } else {
          updated[recipeId] = true;
        }
        set({ pinned: updated });
      },
      isPinned: (recipeId) => Boolean(get().pinned[recipeId]),
    }),
    {
      name: STORAGE_KEYS.plan,
    },
  ),
);

