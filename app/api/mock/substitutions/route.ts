import { NextResponse } from "next/server";
import { Recipe, SubstitutionOption, Allergen } from "@/lib/types";
import { calculateMatchScore, validateSubstitution } from "@/lib/guardrails";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 400));

  try {
    const body = await request.json();
    const { originalRecipe, userAllergens } = body;

    // Fetch toate rețetele pentru a găsi substituții
    const recipesResponse = await fetch(
      request.url.replace("/substitutions", "/recipes")
    );
    const { recipes } = await recipesResponse.json();

    // Filtrează și scorează rețetele pentru substituții
    const substitutions: SubstitutionOption[] = recipes
      .filter((r: Recipe) => r.id !== originalRecipe.id)
      .filter((r: Recipe) => {
        // Același tip de masă
        return r.mealType.some((mt) => originalRecipe.mealType.includes(mt));
      })
      .map((recipe: Recipe) => {
        const matchScore = calculateMatchScore(
          originalRecipe,
          recipe,
          userAllergens || []
        );

        const caloriesDiff =
          ((recipe.calories - originalRecipe.calories) / originalRecipe.calories) * 100;
        const proteinDiff =
          ((recipe.protein - originalRecipe.protein) / originalRecipe.protein) * 100;
        const carbsDiff =
          ((recipe.carbs - originalRecipe.carbs) / originalRecipe.carbs) * 100;
        const fatDiff =
          ((recipe.fat - originalRecipe.fat) / originalRecipe.fat) * 100;
        const priceDiff =
          ((recipe.price - originalRecipe.price) / originalRecipe.price) * 100;

        const validation = validateSubstitution(
          originalRecipe,
          recipe,
          userAllergens || []
        );

        const warnings: string[] = validation.violations.map((v) => v.message);

        return {
          recipe,
          matchScore,
          caloriesDiff,
          proteinDiff,
          carbsDiff,
          fatDiff,
          priceDiff,
          warnings,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 4); // Top 4 substituții

    return NextResponse.json({ substitutions });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch substitutions" },
      { status: 500 }
    );
  }
}

