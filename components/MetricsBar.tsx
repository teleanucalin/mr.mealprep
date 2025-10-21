import { formatKcal, formatMacro, currencyRON } from "../lib/format";
import type { PlanSummary } from "../lib/types";

const metrics = (
  summary: PlanSummary,
): Array<{ label: string; value: string; subLabel?: string }> => [
  {
    label: "Calorii / zi",
    value: formatKcal(summary.averageDayNutrition.kcal),
  },
  {
    label: "Proteine / zi",
    value: formatMacro(summary.averageDayNutrition.protein_g),
    subLabel: summary.proteinPerKg ? `${summary.proteinPerKg.toFixed(1)} g/kg` : undefined,
  },
  {
    label: "Cost estimat",
    value: currencyRON.format(summary.totalCostRON),
    subLabel: `${summary.totalServings} porții`,
  },
  {
    label: "Timp total",
    value: `${Math.round(summary.totalTimeMinutes / 60)} h`,
    subLabel: `${summary.uniqueRecipes} rețete unice`,
  },
];

type MetricsBarProps = {
  summary: PlanSummary;
};

export function MetricsBar({ summary }: MetricsBarProps) {
  const items = metrics(summary);
  return (
    <section className="grid grid-cols-2 gap-3 rounded-3xl border border-[#e2e8f0] bg-white p-4 text-sm text-[#0f172a] sm:grid-cols-4">
      {items.map((item) => (
        <article key={item.label} className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-[#64748b]">
            {item.label}
          </span>
          <span className="text-lg font-semibold">{item.value}</span>
          {item.subLabel && <span className="text-xs text-[#94a3b8]">{item.subLabel}</span>}
        </article>
      ))}
    </section>
  );
}
