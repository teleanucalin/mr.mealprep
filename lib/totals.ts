import type { PlanDay } from "./types";
import { getRecipeById } from "./data";

export const planTotals = (days: PlanDay[]) => {
  return days.reduce(
    (acc, day) => {
      const nutrition = { ...acc.nutrition };
      let costRON = acc.costRON;
      let timeMinutes = acc.timeMinutes;
      let servings = acc.servings;
      day.meals.forEach((meal) => {
        const recipe = getRecipeById(meal.recipeId);
        if (!recipe) return;
        nutrition.kcal += recipe.nutrition.kcal * meal.servings;
        nutrition.protein_g += recipe.nutrition.protein_g * meal.servings;
        nutrition.carbs_g += recipe.nutrition.carbs_g * meal.servings;
        nutrition.fat_g += recipe.nutrition.fat_g * meal.servings;
        nutrition.fiber_g += recipe.nutrition.fiber_g * meal.servings;
        costRON += recipe.costRON * meal.servings;
        timeMinutes += recipe.timeMinutes * meal.servings;
        servings += meal.servings;
      });
      return {
        nutrition,
        costRON,
        timeMinutes,
        servings,
      };
    },
    {
      nutrition: {
        kcal: 0,
        protein_g: 0,
        carbs_g: 0,
        fat_g: 0,
        fiber_g: 0,
      },
      costRON: 0,
      timeMinutes: 0,
      servings: 0,
    },
  );
};

