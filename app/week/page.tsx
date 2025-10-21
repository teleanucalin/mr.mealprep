"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePlan } from "@/store/usePlan";
import { useCart } from "@/store/useCart";
import { useOnboarding } from "@/store/useOnboarding";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MealCard } from "@/components/MealCard";
import { MacroBadge } from "@/components/MacroBadge";
import { EmptyState } from "@/components/EmptyState";
import { GuardrailNotice } from "@/components/GuardrailNotice";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, ShoppingCart, Calendar } from "lucide-react";
import { COPY } from "@/lib/copy";
import { useToast } from "@/components/ui/use-toast";
import { Recipe, SubstitutionOption, Meal } from "@/lib/types";
import { validateSubstitution } from "@/lib/guardrails";

export default function WeekPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { weekPlan, setWeekPlan } = usePlan();
  const { addWeekPlanToCart } = useCart();
  const { profile } = useOnboarding();
  const [showSubstitutionDialog, setShowSubstitutionDialog] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [substitutions, setSubstitutions] = useState<SubstitutionOption[]>([]);
  const [loadingSubstitutions, setLoadingSubstitutions] = useState(false);
  const [confirmingSubstitution, setConfirmingSubstitution] = useState<Recipe | null>(null);

  if (!weekPlan) {
    return (
      <EmptyState
        icon={<Calendar className="h-12 w-12" />}
        title="Niciun plan generat"
        description="Creează un plan săptămânal mai întâi"
        action={{
          label: "Creează plan",
          onClick: () => router.push("/plan"),
        }}
      />
    );
  }

  const handleOpenSubstitutions = async (meal: Meal) => {
    setSelectedMeal(meal);
    setShowSubstitutionDialog(true);
    setLoadingSubstitutions(true);

    try {
      const response = await fetch("/api/mock/substitutions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalRecipe: meal.recipe,
          userAllergens: profile.allergens || [],
        }),
      });

      const data = await response.json();
      setSubstitutions(data.substitutions);
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut încărca substituțiile",
        variant: "destructive",
      });
    } finally {
      setLoadingSubstitutions(false);
    }
  };

  const handleSubstitute = (newRecipe: Recipe) => {
    if (!selectedMeal || !weekPlan) return;

    // Validate substitution
    const validation = validateSubstitution(
      selectedMeal.recipe,
      newRecipe,
      profile.allergens || []
    );

    // If there are errors (allergens), block
    if (validation.violations.some((v) => v.severity === "error")) {
      toast({
        title: "Substituție blocată",
        description: "Rețeta conține alergeni",
        variant: "destructive",
      });
      return;
    }

    // If there are warnings, ask for confirmation
    if (validation.needsConfirmation) {
      setConfirmingSubstitution(newRecipe);
      return;
    }

    // Otherwise, proceed with substitution
    performSubstitution(newRecipe);
  };

  const performSubstitution = (newRecipe: Recipe) => {
    if (!selectedMeal || !weekPlan) return;

    // Find and replace the meal in the week plan
    const updatedDays = weekPlan.days.map((day) => ({
      ...day,
      meals: day.meals.map((meal) =>
        meal.id === selectedMeal.id
          ? { ...meal, recipe: newRecipe }
          : meal
      ),
    }));

    // Recalculate totals for each day
    const recalculatedDays = updatedDays.map((day) => {
      const totalCalories = day.meals.reduce((sum, m) => sum + m.recipe.calories, 0);
      const totalProtein = day.meals.reduce((sum, m) => sum + m.recipe.protein, 0);
      const totalCarbs = day.meals.reduce((sum, m) => sum + m.recipe.carbs, 0);
      const totalFat = day.meals.reduce((sum, m) => sum + m.recipe.fat, 0);
      const totalPrice = day.meals.reduce((sum, m) => sum + m.recipe.price, 0);

      return {
        ...day,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFat,
        totalPrice,
      };
    });

    setWeekPlan({
      ...weekPlan,
      days: recalculatedDays,
      weeklyCalories: recalculatedDays.reduce((sum, d) => sum + d.totalCalories, 0),
      weeklyProtein: recalculatedDays.reduce((sum, d) => sum + d.totalProtein, 0),
      weeklyCarbs: recalculatedDays.reduce((sum, d) => sum + d.totalCarbs, 0),
      weeklyFat: recalculatedDays.reduce((sum, d) => sum + d.totalFat, 0),
      weeklyPrice: recalculatedDays.reduce((sum, d) => sum + d.totalPrice, 0),
    });

    toast({
      title: "Rețetă înlocuită!",
      description: `${selectedMeal.recipe.name} → ${newRecipe.name}`,
    });

    setShowSubstitutionDialog(false);
    setConfirmingSubstitution(null);
  };

  const handleAddToCart = () => {
    addWeekPlanToCart(weekPlan);
    toast({
      title: "Adăugat în coș!",
      description: "Toate ingredientele au fost adăugate",
    });
    router.push("/checkout");
  };

  const dayLabels: Record<string, string> = {
    monday: "Luni",
    tuesday: "Marți",
    wednesday: "Miercuri",
    thursday: "Joi",
    friday: "Vineri",
    saturday: "Sâmbătă",
    sunday: "Duminică",
  };

  const mealLabels: Record<string, string> = {
    breakfast: "Mic dejun",
    lunch: "Prânz",
    dinner: "Cină",
    snack: "Gustare",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{COPY.week.title}</h1>
          <p className="text-muted-foreground">{COPY.week.subtitle}</p>
        </div>
        <Button onClick={handleAddToCart} className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          {COPY.week.addToCart}
        </Button>
      </div>

      {/* Week Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Rezumat săptămânal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Calorii</p>
              <p className="text-xl font-bold">{Math.round(weekPlan.weeklyCalories)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Proteine</p>
              <p className="text-xl font-bold">{Math.round(weekPlan.weeklyProtein)}g</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Carbohidrați</p>
              <p className="text-xl font-bold">{Math.round(weekPlan.weeklyCarbs)}g</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Grăsimi</p>
              <p className="text-xl font-bold">{Math.round(weekPlan.weeklyFat)}g</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Cost</p>
              <p className="text-xl font-bold">{weekPlan.weeklyPrice.toFixed(2)} RON</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Days Accordion */}
      <Accordion type="single" collapsible className="space-y-2" defaultValue="monday">
        {weekPlan.days.map((day) => (
          <AccordionItem key={day.day} value={day.day} className="border rounded-lg px-4">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold">{dayLabels[day.day]}</span>
                  <Badge variant="outline">{day.totalCalories.toFixed(0)} kcal</Badge>
                </div>
                <div className="flex gap-2">
                  <MacroBadge type="protein" value={day.totalProtein} variant="outline" />
                  <MacroBadge type="carbs" value={day.totalCarbs} variant="outline" />
                  <MacroBadge type="fat" value={day.totalFat} variant="outline" />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {day.meals.map((meal) => (
                <div key={meal.id} className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    {mealLabels[meal.mealType]}
                  </h4>
                  <MealCard
                    recipe={meal.recipe}
                    actions={
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full gap-2"
                        onClick={() => handleOpenSubstitutions(meal)}
                      >
                        <RefreshCw className="h-4 w-4" />
                        {COPY.week.substitute}
                      </Button>
                    }
                  />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Substitution Dialog */}
      <Dialog open={showSubstitutionDialog} onOpenChange={setShowSubstitutionDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Înlocuiește rețeta</DialogTitle>
            <DialogDescription>
              Selectează o rețetă alternativă pentru{" "}
              <strong>{selectedMeal?.recipe.name}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {loadingSubstitutions ? (
              <>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </>
            ) : (
              substitutions.map((sub) => {
                const validation = validateSubstitution(
                  selectedMeal?.recipe!,
                  sub.recipe,
                  profile.allergens || []
                );

                return (
                  <div key={sub.recipe.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        Match: {sub.matchScore}%
                      </Badge>
                      {sub.warnings.length > 0 && (
                        <Badge variant="destructive">
                          {sub.warnings.length} avertismente
                        </Badge>
                      )}
                    </div>
                    <MealCard
                      recipe={sub.recipe}
                      actions={
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={() => handleSubstitute(sub.recipe)}
                          variant={validation.needsConfirmation ? "outline" : "default"}
                        >
                          Selectează
                        </Button>
                      }
                    />
                    {validation.violations.length > 0 && (
                      <GuardrailNotice violations={validation.violations} />
                    )}
                  </div>
                );
              })
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubstitutionDialog(false)}>
              Anulează
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for guardrail override */}
      <Dialog
        open={!!confirmingSubstitution}
        onOpenChange={(open) => !open && setConfirmingSubstitution(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmă substituția</DialogTitle>
            <DialogDescription>
              Această rețetă depășește limitele recomandate (±5% kcal, ±7% macro, +10% preț).
              Ești sigur că vrei să continui?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmingSubstitution(null)}>
              Anulează
            </Button>
            <Button
              onClick={() => {
                if (confirmingSubstitution) {
                  performSubstitution(confirmingSubstitution);
                }
              }}
            >
              Înțeleg și continui
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

