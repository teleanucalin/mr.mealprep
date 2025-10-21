"use client";

import { Recipe } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MacroBadge } from "@/components/MacroBadge";
import { Clock, ChefHat } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";

interface MealCardProps {
  recipe: Recipe;
  onClick?: () => void;
  actions?: React.ReactNode;
}

export function MealCard({ recipe, onClick, actions }: MealCardProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!onClick) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick();
  }, [onClick]);

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative group",
        onClick && "cursor-pointer active:scale-[0.98]"
      )}
      onClick={handleClick}
    >
      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full bg-primary/20 animate-ripple pointer-events-none"
          style={{
            left: ripple.x - 50,
            top: ripple.y - 50,
            width: 100,
            height: 100,
          }}
        />
      ))}
      
      <div className="aspect-[4/3] bg-muted relative group-hover:bg-muted/80 transition-colors duration-300">
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
          <ChefHat className="h-12 w-12" />
        </div>
        {/* Placeholder pentru imagine */}
        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
          {formatPrice(recipe.price)}/porție
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-base line-clamp-2">{recipe.name}</CardTitle>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {recipe.description}
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2">
          <MacroBadge type="calories" value={recipe.calories} />
          <MacroBadge type="protein" value={recipe.protein} />
          <MacroBadge type="carbs" value={recipe.carbs} />
          <MacroBadge type="fat" value={recipe.fat} />
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{recipe.prepTime + recipe.cookTime} min</span>
          </div>
          {recipe.tags.length > 0 && (
            <div className="flex-1 truncate">
              {recipe.tags.slice(0, 2).join(", ")}
            </div>
          )}
        </div>
      </CardContent>

      {actions && <CardFooter className="pt-0">{actions}</CardFooter>}
    </Card>
  );
}

