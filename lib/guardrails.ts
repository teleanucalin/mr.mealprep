import { Recipe, Allergen, GuardrailViolation } from "./types";

export interface GuardrailCheck {
  passed: boolean;
  violations: GuardrailViolation[];
  needsConfirmation: boolean;
}

/**
 * Validează o substituție de rețetă conform gard-rails-urilor:
 * - ±5% calorii
 * - ±7% macros (proteine, carbs, grăsimi)
 * - +10% preț (nu mai scump cu mai mult de 10%)
 * - Respectă alergiile
 */
export function validateSubstitution(
  originalRecipe: Recipe,
  substitutionRecipe: Recipe,
  userAllergens: Allergen[]
): GuardrailCheck {
  const violations: GuardrailViolation[] = [];

  // Check calorii (±5%)
  const caloriesDiff =
    Math.abs((substitutionRecipe.calories - originalRecipe.calories) / originalRecipe.calories) * 100;
  if (caloriesDiff > 5) {
    violations.push({
      type: "calories",
      message: `Diferență calorii: ${caloriesDiff.toFixed(1)}% (max 5%)`,
      severity: "warning",
    });
  }

  // Check proteine (±7%)
  const proteinDiff =
    Math.abs((substitutionRecipe.protein - originalRecipe.protein) / originalRecipe.protein) * 100;
  if (proteinDiff > 7) {
    violations.push({
      type: "protein",
      message: `Diferență proteine: ${proteinDiff.toFixed(1)}% (max 7%)`,
      severity: "warning",
    });
  }

  // Check carbohidrați (±7%)
  const carbsDiff =
    Math.abs((substitutionRecipe.carbs - originalRecipe.carbs) / originalRecipe.carbs) * 100;
  if (carbsDiff > 7) {
    violations.push({
      type: "carbs",
      message: `Diferență carbohidrați: ${carbsDiff.toFixed(1)}% (max 7%)`,
      severity: "warning",
    });
  }

  // Check grăsimi (±7%)
  const fatDiff =
    Math.abs((substitutionRecipe.fat - originalRecipe.fat) / originalRecipe.fat) * 100;
  if (fatDiff > 7) {
    violations.push({
      type: "fat",
      message: `Diferență grăsimi: ${fatDiff.toFixed(1)}% (max 7%)`,
      severity: "warning",
    });
  }

  // Check preț (+10%)
  const priceDiff = ((substitutionRecipe.price - originalRecipe.price) / originalRecipe.price) * 100;
  if (priceDiff > 10) {
    violations.push({
      type: "price",
      message: `Preț mai mare cu ${priceDiff.toFixed(1)}% (max +10%)`,
      severity: "warning",
    });
  }

  // Check alergeni (BLOCKER)
  const hasAllergen = substitutionRecipe.allergens.some((allergen) =>
    userAllergens.includes(allergen)
  );
  if (hasAllergen) {
    violations.push({
      type: "allergen",
      message: `Conține alergeni: ${substitutionRecipe.allergens
        .filter((a) => userAllergens.includes(a))
        .join(", ")}`,
      severity: "error",
    });
  }

  const hasErrors = violations.some((v) => v.severity === "error");
  const hasWarnings = violations.some((v) => v.severity === "warning");

  return {
    passed: violations.length === 0,
    violations,
    needsConfirmation: hasWarnings && !hasErrors,
  };
}

/**
 * Calculează scorul de potrivire pentru substituții
 */
export function calculateMatchScore(
  originalRecipe: Recipe,
  substitutionRecipe: Recipe,
  userAllergens: Allergen[]
): number {
  let score = 100;

  // Penalizări pentru diferențe macro
  const caloriesDiff =
    Math.abs((substitutionRecipe.calories - originalRecipe.calories) / originalRecipe.calories) * 100;
  score -= caloriesDiff * 2;

  const proteinDiff =
    Math.abs((substitutionRecipe.protein - originalRecipe.protein) / originalRecipe.protein) * 100;
  score -= proteinDiff * 1.5;

  const carbsDiff =
    Math.abs((substitutionRecipe.carbs - originalRecipe.carbs) / originalRecipe.carbs) * 100;
  score -= carbsDiff;

  const fatDiff =
    Math.abs((substitutionRecipe.fat - originalRecipe.fat) / originalRecipe.fat) * 100;
  score -= fatDiff;

  // Penalizare pentru preț mai mare
  const priceDiff = ((substitutionRecipe.price - originalRecipe.price) / originalRecipe.price) * 100;
  if (priceDiff > 0) {
    score -= priceDiff * 1.5;
  }

  // Penalizare masivă pentru alergeni
  const hasAllergen = substitutionRecipe.allergens.some((allergen) =>
    userAllergens.includes(allergen)
  );
  if (hasAllergen) {
    score -= 50;
  }

  // Bonus pentru timp de gătit similar
  const timeDiff = Math.abs(
    substitutionRecipe.prepTime + substitutionRecipe.cookTime -
      (originalRecipe.prepTime + originalRecipe.cookTime)
  );
  if (timeDiff < 10) {
    score += 5;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

