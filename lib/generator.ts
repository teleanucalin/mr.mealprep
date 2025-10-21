import { getAllRecipes, getWeeklyPlan } from "./data";
import type {
  MealPreference,
  PlanDay,
  WeeklyPlan,
} from "./types";
import { hashString, seedRandom } from "./utils";

const mealOrder = ["breakfast", "lunch", "dinner", "snack"] as const;

const filterRecipes = (preference: MealPreference) => {
  const recipes = getAllRecipes();
  return recipes.filter((recipe) => {
    if (preference.dietMode && !recipe.dietMode.includes(preference.dietMode)) {
      return false;
    }
    if (preference.maxPrepMinutes && recipe.timeMinutes > preference.maxPrepMinutes) {
      return false;
    }
    if (preference.budgetPerServingRON && recipe.costRON > preference.budgetPerServingRON) {
      return false;
    }
    return true;
  });
};

const pickRecipes = (
  pool: ReturnType<typeof filterRecipes>,
  seed: number,
  mealsPerDay: number,
) => {
  const random = seedRandom(seed);
  const choices: Record<string, string[]> = {};

  mealOrder.slice(0, mealsPerDay).forEach((mealType) => {
    const filtered = pool.filter((recipe) => recipe.category === mealType);
    if (!filtered.length) return;
    const pick = filtered[Math.floor(random() * filtered.length) % filtered.length];
    choices[mealType] = [pick.id];
  });

  return choices;
};

export const generatePlan = (preference: MealPreference): WeeklyPlan => {
  const fallbackPlan = getWeeklyPlan();
  const pool = filterRecipes(preference);
  if (!pool.length) {
    return fallbackPlan;
  }

  const seed = hashString(JSON.stringify(preference));
  const baseDays = fallbackPlan.days;

  const generatedDays: PlanDay[] = baseDays.map((day, index) => {
    const picks = pickRecipes(pool, seed + index, preference.mealsPerDay);
    const meals = day.meals.map((meal) => {
      const replacements = picks[meal.type];
      if (replacements && replacements.length) {
        return {
          ...meal,
          recipeId: replacements[0],
        };
      }
      return meal;
    });

    return {
      ...day,
      meals,
    };
  });

  return {
    meta: {
      kcalTargetPerDay: preference.kcalTargetPerDay,
      proteinTarget_g_per_day: preference.proteinTargetPerKg * preference.weightKg,
      varietyLevel: preference.mealsPerDay <= 3 ? "low" : "balanced",
      lockMacros: true,
    },
    days: generatedDays,
  };
};

export const regenerateDay = (
  plan: WeeklyPlan,
  dayIndex: number,
  preference: MealPreference,
): WeeklyPlan => {
  const pool = filterRecipes(preference);
  if (!pool.length) {
    return plan;
  }

  const seed = hashString(`${preference.audience}-${dayIndex}-${Date.now()}`);
  const picks = pickRecipes(pool, seed, preference.mealsPerDay);

  const days = plan.days.map((day, index) => {
    if (index !== dayIndex) return day;
    return {
      ...day,
      meals: day.meals.map((meal) => {
        const replacements = picks[meal.type];
        if (replacements && replacements.length) {
          return {
            ...meal,
            recipeId: replacements[0],
          };
        }
        return meal;
      }),
    };
  });

  return {
    ...plan,
    days,
  };
};

