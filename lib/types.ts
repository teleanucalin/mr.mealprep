export type DietMode =
  | "omnivor"
  | "vegetarian"
  | "high-protein"
  | "low-carb"
  | "gourmet";

export type MealCategory =
  | "breakfast"
  | "lunch"
  | "dinner"
  | "snack";

export type PlanAudience = "A" | "B" | "E";

export interface NutritionFacts {
  kcal: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
}

export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
  optional?: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  category: MealCategory;
  dietMode: DietMode[];
  image: string;
  servingSize: number;
  timeMinutes: number;
  costRON: number;
  nutrition: NutritionFacts;
  ingredients: Ingredient[];
  steps: string[];
}

export interface PlanMeal {
  type: MealCategory;
  recipeId: string;
  servings: number;
}

export interface PlanDay {
  day: string;
  meals: PlanMeal[];
}

export interface PlanMeta {
  kcalTargetPerDay: number;
  proteinTarget_g_per_day: number;
  varietyLevel: "low" | "balanced" | "high";
  lockMacros: boolean;
}

export interface WeeklyPlan {
  meta: PlanMeta;
  days: PlanDay[];
}

export interface PantryInventory {
  alwaysInCart: boolean;
  pantry: string[];
}

export interface CheckoutCartItem {
  recipeId: string;
  servings: number;
}

export interface CheckoutData {
  deliveryWindow: string;
  cart: CheckoutCartItem[];
  totals: {
    items: number;
    estimatedCostRON: number;
  };
}

export interface MockData {
  recipes: Recipe[];
  weeklyPlan: WeeklyPlan;
  inventory: PantryInventory;
  checkout: CheckoutData;
}

export interface MealPreference {
  audience: PlanAudience;
  kcalTargetPerDay: number;
  proteinTargetPerKg: number;
  weightKg: number;
  dietMode?: DietMode;
  allergies?: string[];
  budgetPerServingRON?: number;
  maxPrepMinutes?: number;
  mealsPerDay: number;
}

export interface RecipeWithServings extends Recipe {
  servings: number;
}

export interface DailySummary {
  day: string;
  totalNutrition: NutritionFacts;
  totalCostRON: number;
  totalTimeMinutes: number;
  meals: RecipeWithServings[];
  totalServings: number;
  proteinPerKg?: number;
}

export interface PlanSummary {
  totalWeekNutrition: NutritionFacts;
  averageDayNutrition: NutritionFacts;
  totalCostRON: number;
  totalTimeMinutes: number;
  totalServings: number;
  uniqueRecipes: number;
  proteinPerKg?: number;
}

export interface CartIngredientLine {
  name: string;
  unit: string;
  quantity: number;
  optional?: boolean;
  recipeIds: string[];
}

export interface CartSummary {
  items: CartIngredientLine[];
  totalCostRON: number;
  estimatedServings: number;
}

