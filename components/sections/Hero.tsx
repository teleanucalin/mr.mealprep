import { useCallback } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

const highlights = [
  "Plan AI în 60s",
  "Macro-perfect pe profil",
  "Coș gata de comandă",
];

type HeroProps = {
  onCTAClick: () => void;
  onLearnMore?: () => void;
};

export function Hero({ onCTAClick, onLearnMore }: HeroProps) {
  const handleLearnMore = useCallback(() => {
    if (onLearnMore) {
      onLearnMore();
      return;
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    }
  }, [onLearnMore]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-5 pb-16 pt-12 text-[#0f172a]">
      <div className="flex flex-col gap-6">
        <Badge variant="success" className="self-start">
          Demo mobil în 60–120s
        </Badge>
        <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
          Nutriție inteligentă pentru sală, busy life sau slăbire fără stres
        </h1>
        <p className="text-lg text-[#475569]">
          Mr. Mealprep combină AI nutrițional cu shopping automat. Primești un plan personalizat pe 7 zile și un coș gata de comandă pentru toate ingredientele.
        </p>
        <div className="flex flex-col gap-3 text-sm text-[#475569] sm:flex-row sm:items-center sm:gap-6">
          {highlights.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#059669]" aria-hidden />
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button size="lg" onClick={onCTAClick} className="w-full sm:w-auto">
            Începe testul gratuit
          </Button>
          <Button variant="secondary" size="lg" className="w-full sm:w-auto" onClick={handleLearnMore}>
            Vezi cum funcționează
          </Button>
        </div>
      </div>
      <figure className="relative aspect-[3/2] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#ecfdf5] via-white to-[#d9f99d]">
        <Image
          src="/images/quinoa_legume_branza.jpg"
          alt="Bol cu quinoa, legume și brânză din planul AI"
          fill
          className="object-cover"
          priority
        />
        <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[#0f172a]">
          Exemplu din planul AI: Quinoa cu legume & brânză (520 kcal)
        </figcaption>
      </figure>
    </section>
  );
}
