import type { CartIngredientLine, PlanDay } from "./types";
import { getRecipeById } from "./data";

interface AggregateOptions {
  excludeOptional?: boolean;
}

export const aggregateIngredients = (
  days: PlanDay[],
  options: AggregateOptions = {},
): CartIngredientLine[] => {
  const lines = new Map<string, CartIngredientLine>();

  days.forEach((day) => {
    day.meals.forEach((meal) => {
      const recipe = getRecipeById(meal.recipeId);
      if (!recipe) return;
      recipe.ingredients.forEach((ingredient) => {
        if (options.excludeOptional && ingredient.optional) return;
        const key = `${ingredient.name}-${ingredient.unit}`;
        const existing = lines.get(key);
        if (existing) {
          existing.quantity += ingredient.qty * meal.servings;
          existing.recipeIds.push(recipe.id);
        } else {
          lines.set(key, {
            name: ingredient.name,
            unit: ingredient.unit,
            quantity: ingredient.qty * meal.servings,
            optional: ingredient.optional,
            recipeIds: [recipe.id],
          });
        }
      });
    });
  });

  return Array.from(lines.values()).sort((a, b) => a.name.localeCompare(b.name));
};

