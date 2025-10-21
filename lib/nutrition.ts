import { UserProfile, MacroTarget, ActivityLevel } from "./types";

// Coeficienți PAL (Physical Activity Level)
const PAL_COEFFICIENTS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

/**
 * Calculează BMR folosind Mifflin-St Jeor
 * Dacă există %BF, folosește Katch-McArdle pentru mai mare precizie
 */
export function calculateBMR(profile: UserProfile): number {
  const { weight, height, age, sex, bodyFatPercentage } = profile;

  // Katch-McArdle (dacă avem %BF)
  if (bodyFatPercentage !== undefined) {
    const leanMass = weight * (1 - bodyFatPercentage / 100);
    return 370 + 21.6 * leanMass;
  }

  // Mifflin-St Jeor
  const baseCalc = 10 * weight + 6.25 * height - 5 * age;
  return sex === "M" ? baseCalc + 5 : baseCalc - 161;
}

/**
 * Calculează TDEE (Total Daily Energy Expenditure)
 */
export function calculateTDEE(profile: UserProfile): number {
  const bmr = calculateBMR(profile);
  const pal = PAL_COEFFICIENTS[profile.activityLevel];
  return bmr * pal;
}

/**
 * Calculează targetul caloric bazat pe obiectiv și ritm
 */
export function calculateCalorieTarget(profile: UserProfile): number {
  const tdee = calculateTDEE(profile);
  const paceMultiplier = 1 + profile.pace / 100;
  return Math.round(tdee * paceMultiplier);
}

/**
 * Calculează macro-targetele
 * Proteine: 1.8-2.2 g/kg (mai mult pentru cut)
 * Grăsimi: min 0.8 g/kg
 * Carbohidrați: restul caloriilor
 */
export function calculateMacroTargets(profile: UserProfile): MacroTarget {
  const calories = calculateCalorieTarget(profile);
  const { weight, objective } = profile;

  // Proteine: mai mult la cut, mai puțin la bulk
  let proteinPerKg = 2.0;
  if (objective === "cut") proteinPerKg = 2.2;
  if (objective === "bulk") proteinPerKg = 1.8;
  
  const protein = Math.round(weight * proteinPerKg);

  // Grăsimi: minim 0.8 g/kg, mai mult la low-carb
  const fatPerKg = 0.8;
  const fat = Math.round(weight * fatPerKg);

  // Carbohidrați: ce rămâne
  const proteinCalories = protein * 4;
  const fatCalories = fat * 9;
  const carbCalories = calories - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4);

  return {
    calories,
    protein,
    carbs: Math.max(carbs, 50), // minim 50g
    fat,
  };
}

/**
 * Verifică dacă un set de macro-uri respectă targetul (±5% kcal, ±7% macros)
 */
export function checkMacroCompliance(
  actual: { calories: number; protein: number; carbs: number; fat: number },
  target: MacroTarget
): { compliant: boolean; violations: string[] } {
  const violations: string[] = [];

  const caloriesDiff = Math.abs((actual.calories - target.calories) / target.calories) * 100;
  if (caloriesDiff > 5) {
    violations.push(`Calorii: ${caloriesDiff.toFixed(1)}% diferență (max 5%)`);
  }

  const proteinDiff = Math.abs((actual.protein - target.protein) / target.protein) * 100;
  if (proteinDiff > 7) {
    violations.push(`Proteine: ${proteinDiff.toFixed(1)}% diferență (max 7%)`);
  }

  const carbsDiff = Math.abs((actual.carbs - target.carbs) / target.carbs) * 100;
  if (carbsDiff > 7) {
    violations.push(`Carbohidrați: ${carbsDiff.toFixed(1)}% diferență (max 7%)`);
  }

  const fatDiff = Math.abs((actual.fat - target.fat) / target.fat) * 100;
  if (fatDiff > 7) {
    violations.push(`Grăsimi: ${fatDiff.toFixed(1)}% diferență (max 7%)`);
  }

  return {
    compliant: violations.length === 0,
    violations,
  };
}

/**
 * Calculează macro-uri totale pentru o zi/săptămână
 */
export function aggregateMacros(
  items: Array<{ calories: number; protein: number; carbs: number; fat: number }>
): { calories: number; protein: number; carbs: number; fat: number } {
  return items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories,
      protein: acc.protein + item.protein,
      carbs: acc.carbs + item.carbs,
      fat: acc.fat + item.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );
}

