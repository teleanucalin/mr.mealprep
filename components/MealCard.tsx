import { Recipe } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MacroBadge } from "./MacroBadge";
import { Clock, ChefHat } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface MealCardProps {
  recipe: Recipe;
  onClick?: () => void;
  actions?: React.ReactNode;
}

export function MealCard({ recipe, onClick, actions }: MealCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-shadow hover:shadow-md",
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="aspect-[4/3] bg-muted relative">
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

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

