"use client";

import { useState } from "react";
import { RefreshCw, Lock, Unlock, Sparkles, ArrowLeftRight } from "lucide-react";

import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { usePlanStore } from "../lib/state/planStore";
import { useUIStore } from "../lib/state/uiStore";

const varietyLabels: Record<string, number> = {
  low: 15,
  balanced: 50,
  high: 90,
};

const varietyNames: Record<string, string> = {
  low: "Varietate scăzută",
  balanced: "Varietate echilibrată",
  high: "Varietate ridicată",
};

type PlanEditorMiniProps = {
  onSwap: (dayIndex: number, mealIndex: number) => void;
};

export function PlanEditorMini({ onSwap }: PlanEditorMiniProps) {
  const { plan, regenerate, summary } = usePlanStore();
  const { varietyLevel, lockMacros, setVarietyLevel, setLockMacros, addToast } = useUIStore();
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleVarietyChange = (value: number) => {
    const level = value < 33 ? "low" : value > 66 ? "high" : "balanced";
    setVarietyLevel(level);
  };

  const handleRegenerate = async () => {
    if (!plan) return;
    setIsRegenerating(true);
    regenerate();
    addToast({
      id: `regen-${Date.now()}`,
      title: "Plan regenerat",
      description: "AI păstrează macro-urile setate",
    });
    setTimeout(() => setIsRegenerating(false), 600);
  };

  const badgeLabel = varietyNames[varietyLevel] ?? "Varietate";

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-[#e2e8f0] bg-white p-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#059669]" />
          <h2 className="text-lg font-semibold text-[#0f172a]">Editor rapid</h2>
        </div>
        <Badge variant="success">{badgeLabel}</Badge>
      </header>
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-[#0f172a]">Varietate</span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={varietyLabels[varietyLevel]}
          onChange={(event) => handleVarietyChange(Number(event.target.value))}
          className="w-full accent-[#059669]"
          aria-label="Nivel varietate"
        />
        <div className="flex justify-between text-xs text-[#64748b]">
          <span>Scăzut</span>
          <span>Echilibrat</span>
          <span>Ridicat</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3">
        <div className="flex items-center gap-3 text-sm text-[#0f172a]">
          {lockMacros ? (
            <Lock className="h-4 w-4 text-[#059669]" />
          ) : (
            <Unlock className="h-4 w-4 text-[#64748b]" />
          )}
          <div className="flex flex-col">
            <span className="font-medium">{lockMacros ? "Macro-urile sunt blocate" : "Macro-urile pot varia"}</span>
            <span className="text-xs text-[#64748b]">
              {lockMacros ? "AI va păstra țintele curente" : "AI poate ajusta macro-urile pentru varietate"}
            </span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setLockMacros(!lockMacros)}
        >
          {lockMacros ? "Deblochează" : "Blochează"}
        </Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Button
          variant="secondary"
          icon={<RefreshCw className="h-4 w-4" />}
          onClick={handleRegenerate}
          isLoading={isRegenerating}
        >
          Regenerare plan
        </Button>
        <Button
          variant="ghost"
          icon={<ArrowLeftRight className="h-4 w-4" />}
          onClick={() => onSwap(0, 0)}
        >
          Sugestii swap
        </Button>
      </div>
      <p className="text-xs text-[#64748b]">
        Păstrează (pin) rețetele preferate pentru a nu fi schimbate la regenerate. Macro-urile: {summary?.averageDayNutrition.protein_g.toFixed(0)} g proteină / zi, {summary?.averageDayNutrition.kcal.toFixed(0)} kcal / zi.
      </p>
    </section>
  );
}
