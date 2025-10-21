import { create } from "zustand";
import { persist } from "zustand/middleware";

import { STORAGE_KEYS } from "../constants";
import { getClientRecipeById } from "../clientData";
import type { CartIngredientLine } from "../types";
import { sumBy } from "../utils";

interface CartState {
  items: CartIngredientLine[];
  totalCostRON: number;
  estimatedServings: number;
  reset: () => void;
  setCart: (items: CartIngredientLine[], totalCostRON: number, estimatedServings: number) => void;
  removeIngredient: (name: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalCostRON: 0,
      estimatedServings: 0,
      reset: () => set({ items: [], totalCostRON: 0, estimatedServings: 0 }),
      setCart: (items, totalCostRON, estimatedServings) =>
        set({ items, totalCostRON, estimatedServings }),
      removeIngredient: (name) => {
        const { items } = get();
        const filtered = items.filter((item) => item.name !== name);
        const totalCostRON = sumBy(filtered, (item) => {
          const recipeCost = item.recipeIds.reduce((acc, id) => {
            const recipe = getClientRecipeById(id);
            if (!recipe) return acc;
            return acc + recipe.costRON;
          }, 0);
          return recipeCost;
        });
        set({
          items: filtered,
          totalCostRON,
          estimatedServings: filtered.length,
        });
      },
    }),
    {
      name: STORAGE_KEYS.cart,
    },
  ),
);

