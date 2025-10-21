"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { getClientRecipes } from "../lib/clientData";
import type { MealCategory } from "../lib/types";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { formatKcal } from "../lib/format";

type RecipePickerSheetProps = {
  open: boolean;
  onClose: () => void;
  category: MealCategory;
  onSelect: (recipeId: string) => void;
};

export function RecipePickerSheet({ open, onClose, category, onSelect }: RecipePickerSheetProps) {
  const recipes = useMemo(
    () => getClientRecipes().filter((recipe) => recipe.category === category),
    [category],
  );

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-sm">
          <motion.div
            className="mt-auto rounded-t-3xl bg-white p-5 shadow-card"
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <header className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-[#0f172a]">
                  Alege altă rețetă
                </h2>
                <p className="text-sm text-[#64748b]">
                  Selecția respectă categoria curentă ({category}).
                </p>
              </div>
              <button
                type="button"
                className="rounded-full bg-[#f1f5f9] p-2 text-[#475569]"
                onClick={onClose}
                aria-label="Închide selector"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="flex flex-col gap-3">
              {recipes.slice(0, 3).map((recipe) => (
                <article
                  key={recipe.id}
                  className="flex items-center justify-between rounded-2xl border border-[#e2e8f0] p-4"
                >
                  <div className="flex flex-col gap-1 text-sm text-[#0f172a]">
                    <span className="font-semibold">{recipe.title}</span>
                    <span className="text-xs text-[#64748b]">
                      {formatKcal(recipe.nutrition.kcal)} • {recipe.timeMinutes} min • {recipe.costRON.toFixed(1)} lei
                    </span>
                    <div className="flex gap-2 text-xs">
                      <Badge variant="success">Prot {recipe.nutrition.protein_g} g</Badge>
                      <Badge variant="success">Carb {recipe.nutrition.carbs_g} g</Badge>
                    </div>
                  </div>
                  <Button size="sm" onClick={() => onSelect(recipe.id)}>
                    Alege
                  </Button>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

