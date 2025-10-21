"use client";

import { RecipeCard } from "./RecipeCard";
import { Button } from "./ui/Button";
import { usePlanStore } from "../lib/state/planStore";
import type { PlanDay as PlanDayType } from "../lib/types";
import { getClientRecipeById } from "../lib/clientData";

const dayShortcuts = {
  Luni: "Lun",
  Marți: "Mar",
  Miercuri: "Mie",
  Joi: "Joi",
  Vineri: "Vin",
  Sâmbătă: "Sâm",
  Duminică: "Dum",
};

type PlanDayProps = {
  day: PlanDayType;
  dayIndex: number;
  onViewRecipe: (recipeId: string) => void;
  onSwapMeal: (dayIndex: number, mealIndex: number) => void;
};

export function PlanDay({
  day,
  dayIndex,
  onViewRecipe,
  onSwapMeal,
}: PlanDayProps) {
  const togglePinned = usePlanStore((state) => state.togglePinned);
  const isPinned = usePlanStore((state) => state.isPinned);

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-[#e2e8f0] bg-[#f8fafc] p-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-[#059669]">
            {dayShortcuts[day.day as keyof typeof dayShortcuts] ?? day.day.slice(0, 3)}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-[#0f172a]">{day.day}</h3>
            <p className="text-sm text-[#64748b]">{day.meals.length} mese</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" disabled>
          Swap zi (în curând)
        </Button>
      </header>
      <div className="flex flex-col gap-4">
        {day.meals.map((meal, mealIndex) => {
          const recipe = getClientRecipeById(meal.recipeId);
          if (!recipe) return null;
          const pinned = isPinned(meal.recipeId);
          return (
            <RecipeCard
              key={`${day.day}-${meal.recipeId}`}
              recipe={recipe}
              servings={meal.servings}
              isPinned={pinned}
              onPinToggle={() => togglePinned(meal.recipeId)}
              onSwap={() => onSwapMeal(dayIndex, mealIndex)}
              onView={() => onViewRecipe(meal.recipeId)}
            />
          );
        })}
      </div>
    </section>
  );
}
