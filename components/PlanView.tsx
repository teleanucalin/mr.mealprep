"use client";

import { useState } from "react";

import { usePlanStore } from "../lib/state/planStore";
import { useUIStore } from "../lib/state/uiStore";
import { getClientRecipeById } from "../lib/clientData";
import { MetricsBar } from "./MetricsBar";
import { PlanEditorMini } from "./PlanEditorMini";
import { PlanDay } from "./PlanDay";
import { RecipeDetail } from "./RecipeDetail";
import { RecipePickerSheet } from "./RecipePickerSheet";
import { CTASticky } from "./CTASticky";
import { ToastContainer } from "./Toast";

export function PlanView() {
  const { plan, summary, swapMeal } = usePlanStore();
  const { toasts, removeToast, stickyCTAEnabled } = useUIStore();
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [pickerState, setPickerState] = useState<{ open: boolean; dayIndex: number; mealIndex: number }>({
    open: false,
    dayIndex: 0,
    mealIndex: 0,
  });

  const handleSwap = (dayIndex: number, mealIndex: number) => {
    setPickerState({ open: true, dayIndex, mealIndex });
  };

  const handleSelectRecipe = (recipeId: string) => {
    swapMeal(pickerState.dayIndex, pickerState.mealIndex, recipeId);
    setPickerState((prev) => ({ ...prev, open: false }));
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      {summary && <MetricsBar summary={summary} />}
      <PlanEditorMini onSwap={handleSwap} />
      <div className="flex flex-col gap-5">
        {plan.days.map((day, index) => (
          <PlanDay
            key={day.day}
            day={day}
            dayIndex={index}
            onViewRecipe={setSelectedRecipeId}
            onSwapMeal={handleSwap}
          />
        ))}
      </div>
      {stickyCTAEnabled && (
        <CTASticky
          label="Plan gata pentru 7 zile"
          subLabel={`${summary?.totalServings ?? 0} porții • ${summary?.uniqueRecipes ?? 0} rețete`}
          actionLabel="Generează coșul"
          onAction={() => {
            const event = new CustomEvent("plan:generate-cart");
            window.dispatchEvent(event);
          }}
        />
      )}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
      {selectedRecipeId && (
        <RecipeDetail
          recipe={getClientRecipeById(selectedRecipeId)!}
          onClose={() => setSelectedRecipeId(null)}
        />
      )}
      <RecipePickerSheet
        open={pickerState.open}
        onClose={() => setPickerState((prev) => ({ ...prev, open: false }))}
        category={plan.days[pickerState.dayIndex].meals[pickerState.mealIndex].type}
        onSelect={handleSelectRecipe}
      />
    </div>
  );
}
