import { NextResponse } from "next/server";
import { Recipe, DietMode, MealType } from "@/lib/types";

// Mock database de rețete
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
      { name: "Piept de pui", quantity: 200, unit: "g", price: 3.5 },
      { name: "Broccoli", quantity: 150, unit: "g", price: 1.2 },
      { name: "Morcovi", quantity: 100, unit: "g", price: 0.8 },
      { name: "Ulei de măsline", quantity: 10, unit: "ml", price: 0.5 },
    ],
    instructions: ["Marinează puiul", "Gătește la grătar", "Fierbe legumele"],
    dietMode: ["omnivore", "high_protein"],
    allergens: [],
    price: 6.0,
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
      { name: "Orez integral", quantity: 80, unit: "g", price: 0.8 },
      { name: "Ton conservă", quantity: 120, unit: "g", price: 2.5 },
      { name: "Avocado", quantity: 80, unit: "g", price: 2.0 },
      { name: "Roșii cherry", quantity: 50, unit: "g", price: 0.7 },
    ],
    instructions: ["Fierbe orezul", "Amestecă ingredientele", "Servește"],
    dietMode: ["omnivore", "high_protein"],
    allergens: ["fish"],
    price: 6.0,
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
      { name: "Ouă", quantity: 3, unit: "buc", price: 1.2 },
      { name: "Spanac proaspăt", quantity: 80, unit: "g", price: 1.0 },
      { name: "Brânză feta", quantity: 40, unit: "g", price: 1.5 },
      { name: "Ulei", quantity: 5, unit: "ml", price: 0.3 },
    ],
    instructions: ["Bate ouăle", "Adaugă spanacul", "Gătește în tigaie"],
    dietMode: ["omnivore", "vegetarian", "low_carb"],
    allergens: ["eggs", "lactose"],
    price: 4.0,
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
      { name: "File somon", quantity: 180, unit: "g", price: 8.0 },
      { name: "Cartofi dulci", quantity: 200, unit: "g", price: 1.5 },
      { name: "Ulei de măsline", quantity: 10, unit: "ml", price: 0.5 },
      { name: "Lămâie", quantity: 0.5, unit: "buc", price: 0.5 },
    ],
    instructions: ["Taie cartofii", "Condimentează somonul", "Coace la cuptor"],
    dietMode: ["omnivore", "high_protein"],
    allergens: ["fish"],
    price: 10.5,
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
      { name: "Paste integrale", quantity: 100, unit: "g", price: 1.2 },
      { name: "Pesto", quantity: 30, unit: "g", price: 2.0 },
      { name: "Zucchini", quantity: 120, unit: "g", price: 1.0 },
      { name: "Roșii cherry", quantity: 60, unit: "g", price: 0.8 },
    ],
    instructions: ["Fierbe pastele", "Prepară sosul", "Amestecă totul"],
    dietMode: ["omnivore", "vegetarian"],
    allergens: ["gluten", "lactose", "nuts"],
    price: 5.0,
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
      { name: "Banane", quantity: 150, unit: "g", price: 1.0 },
      { name: "Fructe de pădure", quantity: 100, unit: "g", price: 2.5 },
      { name: "Iaurt grecesc", quantity: 100, unit: "g", price: 1.5 },
      { name: "Granola", quantity: 40, unit: "g", price: 1.5 },
    ],
    instructions: ["Blendează fructele", "Toarnă în bol", "Adaugă topping-uri"],
    dietMode: ["omnivore", "vegetarian"],
    allergens: ["lactose", "gluten"],
    price: 6.5,
    tags: ["breakfast", "energizing", "antioxidants"],
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

