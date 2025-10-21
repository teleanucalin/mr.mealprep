import { useMemo } from "react";

import { aggregateIngredients } from "../../lib/aggregation";
import { usePlanStore } from "../../lib/state/planStore";

export function CartList() {
  const plan = usePlanStore((state) => state.plan);

  const cartItems = useMemo(() => {
    if (!plan) return [];
    return aggregateIngredients(plan.days);
  }, [plan]);

  if (!cartItems.length) {
    return (
      <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6 text-center text-sm text-[#475569]">
        Coșul va fi generat după ce finalizezi planul.
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6">
      <h2 className="text-lg font-semibold text-[#0f172a]">Ingredientele tale</h2>
      <ul className="mt-4 flex flex-col gap-3 text-sm text-[#475569]">
        {cartItems.map((item) => (
          <li key={`${item.name}-${item.unit}`} className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-medium text-[#0f172a]">{item.name}</span>
              <span className="text-xs text-[#94a3b8]">
                folosit în {item.recipeIds.length} rețete
              </span>
            </div>
            <span>
              {item.quantity.toFixed(1)} {item.unit}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

