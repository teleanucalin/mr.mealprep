"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePlan } from "@/store/usePlan";
import { useOnboarding } from "@/store/useOnboarding";
import { useSubscription } from "@/store/useSubscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Zap, TrendingDown, DollarSign, Clock, Lock, AlertCircle } from "lucide-react";
import { MacroBadge } from "@/components/MacroBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { COPY } from "@/lib/copy";
import { useToast } from "@/components/ui/use-toast";
import { Efficiency } from "@/lib/types";

const EFFICIENCY_OPTIONS: { value: Efficiency; label: string; icon: React.ReactNode }[] = [
  { value: "efficient", label: "Eficient", icon: <DollarSign className="h-4 w-4" /> },
  { value: "balanced", label: "Echilibrat", icon: <Zap className="h-4 w-4" /> },
  { value: "variety", label: "Varietate", icon: <TrendingDown className="h-4 w-4" /> },
];

export default function PlanPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { profile } = useOnboarding();
  const { weekPlan, efficiency, lockMacros, isGenerating, setWeekPlan, setEfficiency, setLockMacros, setMacroTarget, setIsGenerating } = usePlan();
  const { currentTier, getCurrentPlan } = useSubscription();
  const [showPaywall, setShowPaywall] = useState(false);
  const [efficiencyValue, setEfficiencyValue] = useState(1); // 0=efficient, 1=balanced, 2=variety

  useEffect(() => {
    // Map efficiency value to index
    const index = EFFICIENCY_OPTIONS.findIndex((opt) => opt.value === efficiency);
    if (index !== -1) setEfficiencyValue(index);
  }, [efficiency]);

  const handleEfficiencyChange = (value: number[]) => {
    const index = value[0];
    setEfficiencyValue(index);
    setEfficiency(EFFICIENCY_OPTIONS[index].value);
  };

  const handleGeneratePlan = async () => {
    if (!profile.age || !profile.sex) {
      toast({
        title: "Profil incomplet",
        description: "Completează onboarding-ul mai întâi",
        variant: "destructive",
      });
      router.push("/onboarding");
      return;
    }

    // Check subscription limits
    const plan = getCurrentPlan();
    if (currentTier === "free" && weekPlan && weekPlan.days.length >= 4) {
      setShowPaywall(true);
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/mock/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profile,
          efficiency,
          lockMacros,
          dietMode: "omnivore",
        }),
      });

      const data = await response.json();
      setWeekPlan(data.weekPlan);
      setMacroTarget(data.macroTarget);

      toast({
        title: "Plan generat!",
        description: "Planul tău săptămânal este gata",
      });
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut genera planul. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="fade-in">
        <h1 className="text-3xl font-bold">{COPY.plan.title}</h1>
        <p className="text-muted-foreground">{COPY.plan.subtitle}</p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Personalizează planul</CardTitle>
          <CardDescription>
            Ajustează preferințele pentru a obține planul perfect
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Efficiency Slider */}
          <div className="space-y-4">
            <Label>{COPY.plan.efficiency.label}</Label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-20">Eficient</span>
              <Slider
                value={[efficiencyValue]}
                onValueChange={handleEfficiencyChange}
                min={0}
                max={2}
                step={1}
                className="flex-1"
              />
              <span className="text-sm text-muted-foreground w-20 text-right">Varietate</span>
            </div>
            <div className="flex justify-center">
              <Badge variant="outline" className="gap-2">
                {EFFICIENCY_OPTIONS[efficiencyValue].icon}
                {EFFICIENCY_OPTIONS[efficiencyValue].label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              {COPY.plan.efficiency.help}
            </p>
          </div>

          {/* Lock Macros */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                {COPY.plan.lockMacros.label}
              </Label>
              <p className="text-xs text-muted-foreground">
                {COPY.plan.lockMacros.help}
              </p>
            </div>
            <Switch
              checked={lockMacros}
              onCheckedChange={setLockMacros}
              disabled={!getCurrentPlan().limits.lockMacros}
            />
          </div>

          {!getCurrentPlan().limits.lockMacros && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Lock macros este disponibil doar în planurile Pro și Gourmet
              </AlertDescription>
            </Alert>
          )}

          {/* Generate Button */}
          <Button
            onClick={handleGeneratePlan}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? "Generăm planul..." : weekPlan ? COPY.plan.regenerate : COPY.plan.generate}
          </Button>
        </CardContent>
      </Card>

      {/* Loading State */}
      {isGenerating && (
        <Card className="scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary animate-pulse" />
              Generăm planul tău...
            </CardTitle>
            <CardDescription>
              AI calculează macro-uri și optimizează rețetele
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProgressBar indeterminate size="md" />
            
            <div className="grid grid-cols-3 gap-4 animate-pulse">
              <div className="text-center">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
              <div className="text-center">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
              <div className="text-center">
                <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Plan Preview */}
      {weekPlan && !isGenerating && (
        <>
          <Card className="scale-in bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                Rezumat plan săptămânal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '0ms' }}>
                  <p className="text-sm text-muted-foreground">Calorii totale</p>
                  <p className="text-2xl font-bold text-orange-600">{Math.round(weekPlan.weeklyCalories)}</p>
                </div>
                <div className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '100ms' }}>
                  <p className="text-sm text-muted-foreground">Proteine</p>
                  <p className="text-2xl font-bold text-blue-600">{Math.round(weekPlan.weeklyProtein)}g</p>
                </div>
                <div className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '200ms' }}>
                  <p className="text-sm text-muted-foreground">Carbohidrați</p>
                  <p className="text-2xl font-bold text-green-600">{Math.round(weekPlan.weeklyCarbs)}g</p>
                </div>
                <div className="animate-in slide-in-from-bottom duration-300" style={{ animationDelay: '300ms' }}>
                  <p className="text-sm text-muted-foreground">Grăsimi</p>
                  <p className="text-2xl font-bold text-yellow-600">{Math.round(weekPlan.weeklyFat)}g</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Cost săptămânal estimat: </span>
                <span className="font-semibold">{weekPlan.weeklyPrice.toFixed(2)} RON</span>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Plan {currentTier === "free" ? "Free (4 zile)" : "complet"}</AlertTitle>
                <AlertDescription>
                  {currentTier === "free"
                    ? "Upgrade la Pro sau Gourmet pentru plan complet de 7 zile"
                    : "Plan complet pentru toată săptămâna"}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Button onClick={() => router.push("/week")} size="lg" className="w-full">
            {COPY.plan.sendToWeek}
          </Button>
        </>
      )}

      {/* Paywall Dialog */}
      <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{COPY.plan.paywall.title}</DialogTitle>
            <DialogDescription>{COPY.plan.paywall.message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaywall(false)}>
              {COPY.common.cancel}
            </Button>
            <Button onClick={() => router.push("/#pricing")}>
              {COPY.plan.paywall.cta}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

