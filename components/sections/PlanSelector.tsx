import clsx from "clsx";
import { Button } from "../ui/Button";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    price: "0 lei",
    features: ["Preview 3 rețete", "Fără coș de cumpărături", "Acces limitat la editor"],
    disabled: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "49 lei / lună",
    highlight: "Recomandat",
    features: [
      "AI personalizat + editor complet",
      "Coș gata de comandă & agregare",
      "Macro/Micro pe obiective A, B, E",
    ],
  },
  {
    id: "gourmet",
    name: "Gourmet",
    price: "99 lei / lună",
    features: ["Chef-curated", "Pairing vinuri", "Livrare white-glove"],
    disabled: true,
  },
];

type PlanSelectorProps = {
  onStartTrial: () => void;
};

export function PlanSelector({ onStartTrial }: PlanSelectorProps) {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-24">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-[#0f172a]">Alege planul</h2>
        <p className="text-[#475569]">
          Pentru demo, planul Pro este disponibil cu trial gratuit. Celelalte planuri sunt locked pentru a menține focusul.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {plans.map((plan) => {
          const isActive = plan.id === "pro";
          return (
            <article
              key={plan.id}
              className={clsx(
                "flex h-full flex-col gap-5 rounded-3xl border p-6",
                isActive
                  ? "border-[#059669] bg-white shadow-card"
                  : "border-[#e2e8f0] bg-white opacity-70",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-[#0f172a]">{plan.name}</h3>
                  <p className="text-sm text-[#475569]">{plan.price}</p>
                </div>
                {plan.highlight && (
                  <span className="rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-semibold text-[#047857]">
                    {plan.highlight}
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-2 text-sm text-[#475569]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button
                  size="md"
                  disabled={!isActive}
                  className="w-full"
                  onClick={isActive ? onStartTrial : undefined}
                >
                  {isActive ? "Start trial 7 zile" : "În curând"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
