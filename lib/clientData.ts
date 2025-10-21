import rawData from "../data/mock.json";
import type { MockData, Recipe } from "./types";

const data = rawData as MockData;

const recipeMap = Object.fromEntries(
  data.recipes.map((recipe) => [recipe.id, recipe] satisfies [string, Recipe]),
);

export const getClientRecipeById = (id: string): Recipe | undefined => recipeMap[id];

export const getClientRecipes = (): Recipe[] => data.recipes;

export const getClientWeeklyPlan = () => data.weeklyPlan;

