"use client";

import Image from "next/image";
import clsx from "clsx";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { formatKcal, formatMacro } from "../lib/format";
import type { Recipe } from "../lib/types";

const mealLabels: Record<string, string> = {
  breakfast: "Mic dejun",
  lunch: "Prânz",
  dinner: "Cină",
  snack: "Gustare",
};

type RecipeCardProps = {
  recipe: Recipe;
  servings?: number;
  isPinned?: boolean;
  onPinToggle?: () => void;
  onSwap?: () => void;
  onView?: () => void;
};

export function RecipeCard({
  recipe,
  servings = 1,
  isPinned,
  onPinToggle,
  onSwap,
  onView,
}: RecipeCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white shadow-sm">
      <div className="relative h-40 w-full">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 320px, 100vw"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-12 text-sm text-white">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-white/80">
              {mealLabels[recipe.category]}
            </span>
            <h3 className="text-base font-semibold">{recipe.title}</h3>
          </div>
          <Badge variant="neutral" className="bg-white/90 text-[#059669]">
            {formatKcal(recipe.nutrition.kcal)}
          </Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 px-4 py-4">
        <div className="flex items-center justify-between text-sm text-[#475569]">
          <span>{recipe.timeMinutes} min</span>
          <span>{recipe.costRON.toFixed(1)} lei / porție</span>
          <span>{servings} porție</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-xs font-medium text-[#059669]">
          <Badge variant="success" className="justify-center text-xs">
            Prot: {formatMacro(recipe.nutrition.protein_g)}
          </Badge>
          <Badge variant="success" className="justify-center text-xs">
            Carb: {formatMacro(recipe.nutrition.carbs_g)}
          </Badge>
          <Badge variant="success" className="justify-center text-xs">
            Grăs: {formatMacro(recipe.nutrition.fat_g)}
          </Badge>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 text-sm">
          <Button variant="ghost" size="sm" onClick={onView}>
            Detalii
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={clsx(isPinned && "text-[#047857]")}
              onClick={onPinToggle}
            >
              {isPinned ? "Deblochează" : "Păstrează"}
            </Button>
            <Button variant="secondary" size="sm" onClick={onSwap}>
              Swap
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
