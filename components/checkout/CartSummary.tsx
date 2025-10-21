import { useMemo } from "react";

import { usePlanStore } from "../../lib/state/planStore";
import { summarizePlan } from "../../lib/calculations";
import { currencyRON, formatKcal } from "../../lib/format";

type CartSummaryProps = {
  onGenerateCart: () => void;
};

export function CartSummary({ onGenerateCart }: CartSummaryProps) {
  const plan = usePlanStore((state) => state.plan);

  const summary = useMemo(() => {
    if (!plan) return null;
    return summarizePlan(plan);
  }, [plan]);

  if (!summary) return null;

  return (
    <aside className="rounded-3xl border border-[#e2e8f0] bg-white p-6 text-sm text-[#475569]">
      <h2 className="text-lg font-semibold text-[#0f172a]">Rezumat săptămânal</h2>
      <ul className="mt-4 flex flex-col gap-2">
        <li className="flex justify-between">
          <span>Kcal / zi</span>
          <span>{formatKcal(summary.averageDayNutrition.kcal)}</span>
        </li>
        <li className="flex justify-between">
          <span>Proteine / zi</span>
          <span>{summary.averageDayNutrition.protein_g.toFixed(0)} g</span>
        </li>
        <li className="flex justify-between">
          <span>Cost estimat</span>
          <span>{currencyRON.format(summary.totalCostRON)}</span>
        </li>
        <li className="flex justify-between">
          <span>Mese</span>
          <span>{summary.totalServings} porții</span>
        </li>
      </ul>
      <button
        type="button"
        onClick={onGenerateCart}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#059669] py-3 text-sm font-semibold text-white"
      >
        Regenerare coș
      </button>
    </aside>
  );
}

