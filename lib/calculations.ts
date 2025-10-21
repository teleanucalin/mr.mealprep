import type {
  DailySummary,
  NutritionFacts,
  PlanDay,
  PlanSummary,
  Recipe,
  WeeklyPlan,
} from "./types";
import { getClientRecipeById } from "./clientData";
import { sumBy } from "./utils";

const emptyNutrition = (): NutritionFacts => ({
  kcal: 0,
  protein_g: 0,
  carbs_g: 0,
  fat_g: 0,
  fiber_g: 0,
});

const addNutrition = (
  base: NutritionFacts,
  addition: NutritionFacts,
  servings = 1,
): NutritionFacts => ({
  kcal: base.kcal + addition.kcal * servings,
  protein_g: base.protein_g + addition.protein_g * servings,
  carbs_g: base.carbs_g + addition.carbs_g * servings,
  fat_g: base.fat_g + addition.fat_g * servings,
  fiber_g: base.fiber_g + addition.fiber_g * servings,
});

const averageNutrition = (totals: NutritionFacts, divisor: number): NutritionFacts => ({
  kcal: totals.kcal / divisor,
  protein_g: totals.protein_g / divisor,
  carbs_g: totals.carbs_g / divisor,
  fat_g: totals.fat_g / divisor,
  fiber_g: totals.fiber_g / divisor,
});

export const summarizeDay = (day: PlanDay): DailySummary => {
  const mealsWithRecipes = day.meals
    .map((meal) => {
      const recipe = getClientRecipeById(meal.recipeId);
      if (!recipe) return null;
      return {
        ...recipe,
        servings: meal.servings,
      };
    })
    .filter(Boolean) as Array<Recipe & { servings: number }>;

  const totalNutrition = mealsWithRecipes.reduce((acc, recipe) => {
    return addNutrition(acc, recipe.nutrition, recipe.servings);
  }, emptyNutrition());

  const totalCostRON = mealsWithRecipes.reduce(
    (acc, recipe) => acc + recipe.costRON * recipe.servings,
    0,
  );

  const totalTimeMinutes = mealsWithRecipes.reduce(
    (acc, recipe) => acc + recipe.timeMinutes * Math.max(recipe.servings, 1),
    0,
  );

  const totalServings = sumBy(mealsWithRecipes, (recipe) => recipe.servings);

  return {
    day: day.day,
    totalNutrition,
    totalCostRON,
    totalTimeMinutes,
    meals: mealsWithRecipes,
    totalServings,
  };
};

export const summarizePlan = (
  plan: WeeklyPlan,
  options?: { weightKg?: number },
): PlanSummary => {
  const daySummaries = plan.days.map(summarizeDay);

  const totalWeekNutrition = daySummaries.reduce(
    (acc, summary) => addNutrition(acc, summary.totalNutrition),
    emptyNutrition(),
  );

  const totalCostRON = daySummaries.reduce(
    (acc, summary) => acc + summary.totalCostRON,
    0,
  );

  const totalTimeMinutes = daySummaries.reduce(
    (acc, summary) => acc + summary.totalTimeMinutes,
    0,
  );

  const totalServings = daySummaries.reduce(
    (acc, summary) => acc + summary.totalServings,
    0,
  );

  const uniqueRecipes = new Set(
    daySummaries.flatMap((summary) => summary.meals.map((meal) => meal.id)),
  ).size;

  const averageDayNutrition = averageNutrition(
    totalWeekNutrition,
    daySummaries.length || 1,
  );

  const proteinPerKg = options?.weightKg
    ? totalWeekNutrition.protein_g / options.weightKg / daySummaries.length
    : undefined;

  return {
    totalWeekNutrition,
    averageDayNutrition,
    totalCostRON,
    totalTimeMinutes,
    totalServings,
    uniqueRecipes,
    proteinPerKg,
  };
};

export const summarizeRecipes = (recipes: Recipe[], servings = 1) => {
  return recipes.reduce(
    (acc, recipe) => ({
      nutrition: addNutrition(acc.nutrition, recipe.nutrition, servings),
      costRON: acc.costRON + recipe.costRON * servings,
      timeMinutes: acc.timeMinutes + recipe.timeMinutes * servings,
    }),
    {
      nutrition: emptyNutrition(),
      costRON: 0,
      timeMinutes: 0,
    },
  );
};

