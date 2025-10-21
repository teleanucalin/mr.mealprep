import { motion } from "framer-motion";
import { BrainCircuit, CalendarClock, ShoppingCart } from "lucide-react";

const items = [
  {
    icon: BrainCircuit,
    title: "Completezi 5 întrebări",
    description:
      "Stabilești obiectivul (sală, busy life sau slăbire), macro-ținte și restricții. Totul în mai puțin de un minut.",
  },
  {
    icon: CalendarClock,
    title: "Primești planul AI",
    description:
      "7 zile cu mese echilibrate, varietate ajustabilă și editor pentru Swap / Regenerate fără să strici macro-urile.",
  },
  {
    icon: ShoppingCart,
    title: "Coș gata de comandă",
    description:
      "Ingredientele deduplicate, cantități exacte și livrare mock în 2 click-uri. Poți salva preferințele pentru data viitoare.",
  },
];

type HowItWorksProps = {
  id?: string;
};

export function HowItWorks({ id }: HowItWorksProps) {
  return (
    <section
      id={id}
      className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-5 pb-16"
    >
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold text-[#0f172a]">Cum funcționează</h2>
        <p className="text-[#475569]">
          Flow-ul este optimizat pentru demo pe mobil: sub 3 decizii grele pe ecran, feedback instant și CTA sticky pentru fiecare pas.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true, amount: 0.6 }}
            className="flex flex-col gap-4 rounded-3xl border border-[#e2e8f0] bg-white p-6 shadow-sm"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ecfdf5] text-[#059669]">
              <item.icon className="h-6 w-6" />
            </span>
            <h3 className="text-lg font-semibold text-[#0f172a]">{item.title}</h3>
            <p className="text-sm text-[#475569]">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
