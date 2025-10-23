import { NextResponse } from "next/server";
import { Recipe, DietMode, MealType } from "@/lib/types";

// Mock database de rețete - prețuri actualizate conform piața RO 2024
const MOCK_RECIPES: Recipe[] = [
  {
    id: "1",
    name: "Piept de pui la grătar cu legume",
    description: "Piept de pui marinat servit cu mix de legume proaspete",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["lunch", "dinner"],
    calories: 420,
    protein: 45,
    carbs: 25,
    fat: 12,
    prepTime: 15,
    cookTime: 25,
    servings: 1,
    ingredients: [
      { name: "Piept de pui fără piele", quantity: 200, unit: "g", price: 3.00 },
      { name: "Broccoli proaspăt", quantity: 150, unit: "g", price: 1.35 },
      { name: "Morcovi", quantity: 100, unit: "g", price: 0.50 },
      { name: "Ulei de măsline extravirgin", quantity: 10, unit: "ml", price: 0.60 },
      { name: "Condimente și ierburi", quantity: 5, unit: "g", price: 0.30 },
    ],
    instructions: ["Marinează puiul", "Gătește la grătar", "Fierbe legumele"],
    dietMode: ["omnivore", "high_protein"],
    allergens: [],
    price: 5.75,
    tags: ["high-protein", "low-carb", "mediteraneană"],
  },
  {
    id: "2",
    name: "Orez integral cu ton și avocado",
    description: "Bowl sănătos cu orez, ton conservă și avocado proaspăt",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["lunch", "dinner"],
    calories: 510,
    protein: 35,
    carbs: 48,
    fat: 18,
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    ingredients: [
      { name: "Orez integral", quantity: 80, unit: "g", price: 0.96 },
      { name: "Ton în ulei de măsline (conservă)", quantity: 120, unit: "g", price: 4.50 },
      { name: "Avocado", quantity: 80, unit: "g", price: 4.80 },
      { name: "Roșii cherry", quantity: 50, unit: "g", price: 1.00 },
      { name: "Lămâie", quantity: 10, unit: "g", price: 0.20 },
      { name: "Sare și piper", quantity: 2, unit: "g", price: 0.10 },
    ],
    instructions: ["Fierbe orezul", "Amestecă ingredientele", "Servește"],
    dietMode: ["omnivore", "high_protein"],
    allergens: ["fish"],
    price: 11.56,
    tags: ["quick", "balanced", "omega-3"],
  },
  {
    id: "3",
    name: "Omletă cu spanac și brânză feta",
    description: "Omletă proteică cu spanac proaspăt și brânză feta",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["breakfast"],
    calories: 380,
    protein: 28,
    carbs: 12,
    fat: 24,
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    ingredients: [
      { name: "Ouă", quantity: 3, unit: "buc", price: 2.70 },
      { name: "Spanac proaspăt", quantity: 80, unit: "g", price: 1.60 },
      { name: "Brânză feta", quantity: 40, unit: "g", price: 2.40 },
      { name: "Unt", quantity: 10, unit: "g", price: 0.50 },
      { name: "Ceapă verde", quantity: 10, unit: "g", price: 0.15 },
    ],
    instructions: ["Bate ouăle", "Adaugă spanacul", "Gătește în tigaie"],
    dietMode: ["omnivore", "vegetarian", "low_carb"],
    allergens: ["eggs", "lactose"],
    price: 7.35,
    tags: ["quick", "breakfast", "vegetarian"],
  },
  {
    id: "4",
    name: "Somon la cuptor cu cartofi dulci",
    description: "File de somon cu garnitură de cartofi dulci copți",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["lunch", "dinner"],
    calories: 550,
    protein: 42,
    carbs: 45,
    fat: 20,
    prepTime: 10,
    cookTime: 30,
    servings: 1,
    ingredients: [
      { name: "File de somon proaspăt", quantity: 180, unit: "g", price: 19.80 },
      { name: "Cartofi dulci", quantity: 200, unit: "g", price: 2.40 },
      { name: "Ulei de măsline extravirgin", quantity: 10, unit: "ml", price: 0.60 },
      { name: "Lămâie", quantity: 30, unit: "g", price: 0.60 },
      { name: "Usturoi", quantity: 5, unit: "g", price: 0.15 },
      { name: "Condimente (rozmarin, sare, piper)", quantity: 3, unit: "g", price: 0.25 },
    ],
    instructions: ["Taie cartofii", "Condimentează somonul", "Coace la cuptor"],
    dietMode: ["omnivore", "high_protein"],
    allergens: ["fish"],
    price: 23.80,
    tags: ["omega-3", "gourmet", "healthy-fats"],
  },
  {
    id: "5",
    name: "Paste integrale cu pesto și legume",
    description: "Paste integrale cu sos pesto și legume de sezon",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["lunch", "dinner"],
    calories: 480,
    protein: 18,
    carbs: 62,
    fat: 16,
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    ingredients: [
      { name: "Paste integrale (penne)", quantity: 100, unit: "g", price: 1.50 },
      { name: "Pesto verde", quantity: 30, unit: "g", price: 3.60 },
      { name: "Zucchini", quantity: 120, unit: "g", price: 1.80 },
      { name: "Roșii cherry", quantity: 60, unit: "g", price: 1.20 },
      { name: "Parmezan", quantity: 15, unit: "g", price: 1.50 },
      { name: "Usturoi", quantity: 5, unit: "g", price: 0.15 },
    ],
    instructions: ["Fierbe pastele", "Prepară sosul", "Amestecă totul"],
    dietMode: ["omnivore", "vegetarian"],
    allergens: ["gluten", "lactose", "nuts"],
    price: 9.75,
    tags: ["vegetarian", "mediterranean", "quick"],
  },
  {
    id: "6",
    name: "Smoothie bowl cu fructe și granola",
    description: "Bowl energizant cu smoothie de fructe și topping-uri",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["breakfast", "snack"],
    calories: 420,
    protein: 15,
    carbs: 68,
    fat: 12,
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    ingredients: [
      { name: "Banane", quantity: 150, unit: "g", price: 1.50 },
      { name: "Fructe de pădure congelate", quantity: 100, unit: "g", price: 3.50 },
      { name: "Iaurt grecesc", quantity: 100, unit: "g", price: 2.50 },
      { name: "Granola", quantity: 40, unit: "g", price: 2.40 },
      { name: "Miere", quantity: 10, unit: "g", price: 0.50 },
      { name: "Semințe de chia", quantity: 10, unit: "g", price: 0.60 },
    ],
    instructions: ["Blendează fructele", "Toarnă în bol", "Adaugă topping-uri"],
    dietMode: ["omnivore", "vegetarian"],
    allergens: ["lactose", "gluten"],
    price: 11.00,
    tags: ["breakfast", "energizing", "antioxidants"],
  },
  {
    id: "7",
    name: "Chiftele de curcan cu piure de conopidă",
    description: "Chiftele aromate din carne de curcan cu piure light de conopidă",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["lunch", "dinner"],
    calories: 390,
    protein: 38,
    carbs: 18,
    fat: 16,
    prepTime: 15,
    cookTime: 25,
    servings: 1,
    ingredients: [
      { name: "Carne de curcan tocată", quantity: 180, unit: "g", price: 3.60 },
      { name: "Conopidă", quantity: 200, unit: "g", price: 2.00 },
      { name: "Ou", quantity: 1, unit: "buc", price: 0.90 },
      { name: "Pesmet", quantity: 20, unit: "g", price: 0.30 },
      { name: "Ceapă", quantity: 30, unit: "g", price: 0.15 },
      { name: "Usturoi", quantity: 5, unit: "g", price: 0.15 },
      { name: "Lapte", quantity: 50, unit: "ml", price: 0.30 },
      { name: "Condimente", quantity: 5, unit: "g", price: 0.25 },
    ],
    instructions: ["Amestecă carnea", "Formează chiftelele", "Fierbe conopida", "Coace la cuptor"],
    dietMode: ["omnivore", "high_protein", "low_carb"],
    allergens: ["eggs", "gluten", "lactose"],
    price: 7.65,
    tags: ["high-protein", "low-carb", "comfort-food"],
  },
  {
    id: "8",
    name: "Terci de ovăz cu fructe și nuci",
    description: "Mic dejun sățios cu terci de ovăz, fructe proaspete și nuci crocante",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["breakfast"],
    calories: 450,
    protein: 18,
    carbs: 58,
    fat: 16,
    prepTime: 5,
    cookTime: 10,
    servings: 1,
    ingredients: [
      { name: "Fulgi de ovăz", quantity: 80, unit: "g", price: 0.80 },
      { name: "Lapte", quantity: 250, unit: "ml", price: 1.50 },
      { name: "Banană", quantity: 100, unit: "g", price: 1.00 },
      { name: "Nuci", quantity: 20, unit: "g", price: 1.60 },
      { name: "Miere", quantity: 15, unit: "g", price: 0.75 },
      { name: "Scorțișoară", quantity: 2, unit: "g", price: 0.15 },
    ],
    instructions: ["Fierbe ovăzul cu laptele", "Adaugă fructele", "Presară nuci și miere"],
    dietMode: ["omnivore", "vegetarian"],
    allergens: ["lactose", "nuts", "gluten"],
    price: 5.80,
    tags: ["breakfast", "comfort-food", "energizing"],
  },
  {
    id: "9",
    name: "Salată de quinoa cu legume coapte",
    description: "Salată proteică cu quinoa, legume coapte și dressing de lămâie",
    imageUrl: "/placeholder-meal.jpg",
    mealType: ["lunch", "dinner"],
    calories: 420,
    protein: 16,
    carbs: 52,
    fat: 14,
    prepTime: 15,
    cookTime: 30,
    servings: 1,
    ingredients: [
      { name: "Quinoa", quantity: 80, unit: "g", price: 2.40 },
      { name: "Ardei roșu", quantity: 100, unit: "g", price: 1.50 },
      { name: "Vinete", quantity: 120, unit: "g", price: 1.20 },
      { name: "Roșii cherry", quantity: 60, unit: "g", price: 1.20 },
      { name: "Năut fiert", quantity: 80, unit: "g", price: 1.20 },
      { name: "Rucola", quantity: 30, unit: "g", price: 1.50 },
      { name: "Ulei de măsline", quantity: 15, unit: "ml", price: 0.90 },
      { name: "Lămâie", quantity: 20, unit: "g", price: 0.40 },
    ],
    instructions: ["Fierbe quinoa", "Coace legumele", "Amestecă totul", "Adaugă dressing"],
    dietMode: ["omnivore", "vegetarian"],
    allergens: [],
    price: 10.30,
    tags: ["vegetarian", "high-fiber", "mediterranean"],
  },
];

// Generează mai multe rețete prin variații
function generateMoreRecipes(): Recipe[] {
  const variations = [
    { prefix: "Curry de ", carbs: +10, price: +1 },
    { prefix: "Salată cu ", carbs: -15, price: +0.5 },
    { prefix: "Wrap cu ", carbs: +8, price: +0.8 },
    { prefix: "Bowl proteic cu ", protein: +5, price: +1.2 },
  ];

  const additionalRecipes: Recipe[] = [];
  
  MOCK_RECIPES.forEach((recipe, idx) => {
    if (idx < 3) {
      const variation = variations[idx % variations.length];
      additionalRecipes.push({
        ...recipe,
        id: `${parseInt(recipe.id) + 100}`,
        name: variation.prefix + recipe.name.toLowerCase(),
        carbs: recipe.carbs + (variation.carbs || 0),
        protein: recipe.protein + (variation.protein || 0),
        price: recipe.price + (variation.price || 0),
        calories: recipe.calories + ((variation.carbs || 0) * 4) + ((variation.protein || 0) * 4),
      });
    }
  });

  return [...MOCK_RECIPES, ...additionalRecipes];
}

export async function GET(request: Request) {
  // Simulare delay network
  await new Promise((resolve) => setTimeout(resolve, 500));

  const { searchParams } = new URL(request.url);
  const dietMode = searchParams.get("dietMode") as DietMode | null;
  const mealType = searchParams.get("mealType") as MealType | null;

  let recipes = generateMoreRecipes();

  // Filtrează după dietMode
  if (dietMode) {
    recipes = recipes.filter((r) => r.dietMode.includes(dietMode));
  }

  // Filtrează după mealType
  if (mealType) {
    recipes = recipes.filter((r) => r.mealType.includes(mealType));
  }

  return NextResponse.json({ recipes, total: recipes.length });
}

