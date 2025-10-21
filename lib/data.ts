import { readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

import type {
  CheckoutData,
  MockData,
  PantryInventory,
  Recipe,
  WeeklyPlan,
} from "./types";

const nutritionSchema = z.object({
  kcal: z.number(),
  protein_g: z.number(),
  carbs_g: z.number(),
  fat_g: z.number(),
  fiber_g: z.number(),
});

const ingredientSchema = z.object({
  name: z.string(),
  qty: z.number(),
  unit: z.string(),
  optional: z.boolean().optional(),
});

const recipeSchema: z.ZodType<Recipe> = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  dietMode: z.array(
    z.enum(["omnivor", "vegetarian", "high-protein", "low-carb", "gourmet"]),
  ),
  image: z.string(),
  servingSize: z.number(),
  timeMinutes: z.number(),
  costRON: z.number(),
  nutrition: nutritionSchema,
  ingredients: z.array(ingredientSchema),
  steps: z.array(z.string()),
});

const planMealSchema = z.object({
  type: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  recipeId: z.string(),
  servings: z.number(),
});

const planDaySchema = z.object({
  day: z.string(),
  meals: z.array(planMealSchema),
});

const weeklyPlanSchema: z.ZodType<WeeklyPlan> = z.object({
  meta: z.object({
    kcalTargetPerDay: z.number(),
    proteinTarget_g_per_day: z.number(),
    varietyLevel: z.enum(["low", "balanced", "high"]),
    lockMacros: z.boolean(),
  }),
  days: z.array(planDaySchema),
});

const pantrySchema: z.ZodType<PantryInventory> = z.object({
  alwaysInCart: z.boolean(),
  pantry: z.array(z.string()),
});

const checkoutSchema: z.ZodType<CheckoutData> = z.object({
  deliveryWindow: z.string(),
  cart: z.array(
    z.object({
      recipeId: z.string(),
      servings: z.number(),
    }),
  ),
  totals: z.object({
    items: z.number(),
    estimatedCostRON: z.number(),
  }),
});

const mockDataSchema: z.ZodType<MockData> = z.object({
  recipes: z.array(recipeSchema),
  weeklyPlan: weeklyPlanSchema,
  inventory: pantrySchema,
  checkout: checkoutSchema,
});

let cachedData: MockData | null = null;

const loadData = (): MockData => {
  if (cachedData) {
    return cachedData;
  }
  const filePath = join(process.cwd(), "data", "mock.json");
  const raw = readFileSync(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const validated = mockDataSchema.parse(parsed);
  cachedData = validated;
  return validated;
};

export const getAllRecipes = (): Recipe[] => loadData().recipes;

export const getWeeklyPlan = (): WeeklyPlan => loadData().weeklyPlan;

export const getInventory = (): PantryInventory => loadData().inventory;

export const getCheckout = (): CheckoutData => loadData().checkout;

export const getRecipeById = (id: string): Recipe | undefined =>
  getAllRecipes().find((recipe) => recipe.id === id);

export const getRecipesByCategory = (category: Recipe["category"]): Recipe[] =>
  getAllRecipes().filter((recipe) => recipe.category === category);

export const getRecipesByDiet = (diet: Recipe["dietMode"][number]): Recipe[] =>
  getAllRecipes().filter((recipe) => recipe.dietMode.includes(diet));

