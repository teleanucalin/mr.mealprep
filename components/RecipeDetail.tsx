"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { Badge } from "./ui/Badge";
import type { Recipe } from "../lib/types";
import { formatKcal, formatMacro } from "../lib/format";

type RecipeDetailProps = {
  recipe: Recipe;
  onClose: () => void;
};

export function RecipeDetail({ recipe, onClose }: RecipeDetailProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 pb-4 pt-10 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalii rețetă ${recipe.title}`}
    >
      <article className="relative flex w-full max-w-lg flex-col gap-4 overflow-hidden rounded-3xl bg-white shadow-card">
        <button
          type="button"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[#475569] shadow-sm"
          onClick={onClose}
          aria-label="Închide detalii rețetă"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative h-48 w-full">
          <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 px-5 pb-6">
          <header className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-[#0f172a]">{recipe.title}</h2>
            <p className="text-sm text-[#475569]">
              {recipe.timeMinutes} min • {recipe.costRON.toFixed(1)} lei • {formatKcal(recipe.nutrition.kcal)}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="success">Proteine: {formatMacro(recipe.nutrition.protein_g)}</Badge>
              <Badge variant="success">Carbo: {formatMacro(recipe.nutrition.carbs_g)}</Badge>
              <Badge variant="success">Grăsimi: {formatMacro(recipe.nutrition.fat_g)}</Badge>
              <Badge variant="info">Fibră: {formatMacro(recipe.nutrition.fiber_g)}</Badge>
            </div>
          </header>
          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-[#0f172a]">Ingrediente</h3>
            <ul className="flex flex-col gap-2 text-sm text-[#475569]">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="flex items-center justify-between">
                  <span>{ingredient.name}</span>
                  <span>
                    {ingredient.qty} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <section className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-[#0f172a]">Pași</h3>
            <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm text-[#475569]">
              {recipe.steps.map((step, index) => (
                <li key={step} className="leading-relaxed">
                  <span className="font-medium text-[#0f172a]">Pas {index + 1}:</span> {step}
                </li>
              ))}
            </ol>
          </section>
        </div>
      </article>
    </div>
  );
}

