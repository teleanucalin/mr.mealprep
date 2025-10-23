import { NextResponse } from "next/server";
import { WeekPlan, DayPlan, Meal, DayOfWeek, UserProfile } from "@/lib/types";
import { calculateMacroTargets } from "@/lib/nutrition";
import { GET as getRecipes } from "../recipes/route";

// Simulare generare plan săptămânal
export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const body = await request.json();
    const { profile, efficiency, lockMacros, dietMode } = body;

    // Validate profile has required fields
    if (!profile || !profile.age || !profile.sex || !profile.weight || !profile.height || !profile.activityLevel) {
      return NextResponse.json(
        { error: "Invalid profile: missing required fields" },
        { status: 400 }
      );
    }

    // Ensure pace is set (default to 0 if missing)
    const completeProfile = {
      ...profile,
      pace: profile.pace ?? 0,
    };

    // Calculează macro targets
    const macroTarget = calculateMacroTargets(completeProfile as UserProfile);

    // Mock plan săptămânal - în realitate ar folosi AI/algoritm de optimizare
    const days: DayOfWeek[] = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    // Get recipes directly instead of HTTP fetch (avoids Vercel auth issues)
    const url = new URL(request.url);
    url.searchParams.set('dietMode', dietMode);
    const recipesRequest = new Request(url.toString());
    
    const recipesResponse = await getRecipes(recipesRequest);
    const { recipes } = await recipesResponse.json();

    const dayPlans: DayPlan[] = days.map((day, idx) => {
      // Selectează rețete pentru această zi
      const breakfast = recipes[idx % recipes.length];
      const lunch = recipes[(idx + 1) % recipes.length];
      const dinner = recipes[(idx + 2) % recipes.length];

      const meals: Meal[] = [
        {
          id: `${day}-breakfast`,
          mealType: "breakfast",
          recipe: breakfast,
          servings: 1,
        },
        {
          id: `${day}-lunch`,
          mealType: "lunch",
          recipe: lunch,
          servings: 1,
        },
        {
          id: `${day}-dinner`,
          mealType: "dinner",
          recipe: dinner,
          servings: 1,
        },
      ];

      const totalCalories = meals.reduce(
        (sum, m) => sum + m.recipe.calories * m.servings,
        0
      );
      const totalProtein = meals.reduce(
        (sum, m) => sum + m.recipe.protein * m.servings,
        0
      );
      const totalCarbs = meals.reduce(
        (sum, m) => sum + m.recipe.carbs * m.servings,
        0
      );
      const totalFat = meals.reduce(
        (sum, m) => sum + m.recipe.fat * m.servings,
        0
      );
      const totalPrice = meals.reduce(
        (sum, m) => sum + m.recipe.price * m.servings,
        0
      );

      return {
        day,
        meals,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        totalPrice,
      };
    });

    const weekPlan: WeekPlan = {
      id: `plan-${Date.now()}`,
      days: dayPlans,
      weeklyCalories: dayPlans.reduce((sum, d) => sum + d.totalCalories, 0),
      weeklyProtein: dayPlans.reduce((sum, d) => sum + d.totalProtein, 0),
      weeklyCarbs: dayPlans.reduce((sum, d) => sum + d.totalCarbs, 0),
      weeklyFat: dayPlans.reduce((sum, d) => sum + d.totalFat, 0),
      weeklyPrice: dayPlans.reduce((sum, d) => sum + d.totalPrice, 0),
      efficiency: efficiency || "balanced",
      lockMacros: lockMacros ?? true,
      dietMode: dietMode || "omnivore",
      createdAt: new Date(),
    };

    return NextResponse.json({ weekPlan, macroTarget });
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate plan", 
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

