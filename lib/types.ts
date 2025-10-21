// Tipuri principale pentru aplicație

export type Sex = "M" | "F";

export type Objective = "cut" | "maintain" | "bulk";

export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active";

export type DietMode = "omnivore" | "high_protein" | "low_carb" | "vegetarian";

export type Allergen =
  | "gluten"
  | "lactose"
  | "nuts"
  | "eggs"
  | "soy"
  | "fish"
  | "shellfish"
  | "peanuts";

export type SubscriptionTier = "free" | "pro" | "gourmet";

export type Efficiency = "efficient" | "balanced" | "variety";

export type DayOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export interface UserProfile {
  // Date de bază (obligatorii)
  age: number; // 16-80
  sex: Sex;
  weight: number; // kg, 30-200
  height: number; // cm, 130-220
  objective: Objective;
  pace: number; // ex. -15, 0, +10 (%)
  activityLevel: ActivityLevel;
  allergens: Allergen[];
  mealsPerDay: number; // 2-5
  cookingTime: number; // minute, 10-60
  budgetPerServing: number; // RON, 10-60
  batchCooking: boolean;
  
  // Date opționale
  bodyFatPercentage?: number; // 5-45
  cuisinePreferences?: string[];
  mealTimeWindows?: Record<MealType, { start: string; end: string }>;
  equipment?: string[];
  multipleServings?: boolean;
  overrideMacros?: { protein: number; carbs: number; fat: number };
  deviceHealthConnected?: boolean;
}

export interface MacroTarget {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  price: number; // RON per unit
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  imageUrl: string; // placeholder
  mealType: MealType[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  dietMode: DietMode[];
  allergens: Allergen[];
  price: number; // RON per serving
  tags: string[];
}

export interface Meal {
  id: string;
  mealType: MealType;
  recipe: Recipe;
  servings: number;
}

export interface DayPlan {
  day: DayOfWeek;
  meals: Meal[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalPrice: number;
}

export interface WeekPlan {
  id: string;
  userId?: string;
  days: DayPlan[];
  weeklyCalories: number;
  weeklyProtein: number;
  weeklyCarbs: number;
  weeklyFat: number;
  weeklyPrice: number;
  efficiency: Efficiency;
  lockMacros: boolean;
  dietMode: DietMode;
  createdAt: Date;
}

export interface DeliveryWindow {
  id: string;
  day: DayOfWeek;
  timeSlot: string; // ex. "10:00-13:00"
  available: boolean;
  cutoffTime: Date; // ex. Joi 18:00
}

export interface CartItem {
  ingredient: Ingredient;
  quantity: number;
  recipeIds: string[]; // pentru tracking
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  serviceFee: number; // 3.5%, max 9.99 RON
  deliveryFee: number; // 0 dacă >250 RON
  total: number;
  deliveryWindow?: DeliveryWindow;
  alwaysInCart: boolean;
}

export interface SubstitutionOption {
  recipe: Recipe;
  matchScore: number; // 0-100
  caloriesDiff: number; // %
  proteinDiff: number; // %
  carbsDiff: number; // %
  fatDiff: number; // %
  priceDiff: number; // %
  warnings: string[];
}

export interface GuardrailViolation {
  type: "calories" | "protein" | "carbs" | "fat" | "price" | "allergen";
  message: string;
  severity: "warning" | "error";
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  price: number; // RON/month
  annualPrice: number; // RON/year (discounted)
  features: string[];
  limits: {
    recipesPerWeek: number;
    profiles: number;
    smartSubstitutions: boolean;
    lockMacros: boolean;
    alwaysInCart: boolean;
    exportGroceryList: boolean;
    brandPreferences: boolean;
    priorityDelivery: boolean;
  };
}

