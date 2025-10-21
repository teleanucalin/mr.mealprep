"use client";

import { useRouter } from "next/navigation";

import { Button } from "../../../components/ui/Button";
import { useUIStore } from "../../../lib/state/uiStore";

export default function SuccessPage() {
  const router = useRouter();
  const clearToasts = useUIStore((state) => state.clearToasts);

  return (
    <section className="flex flex-col items-center gap-6 rounded-3xl border border-[#e2e8f0] bg-white p-6 text-center">
      <h1 className="text-3xl font-semibold text-[#059669]">Planul tău este gata!</h1>
      <p className="max-w-md text-sm text-[#475569]">
        Am pregătit planul pe 7 zile și coșul aferent. Poți reveni oricând să faci modificări sau să generezi un coș nou.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={() => router.push("/plan")}>Vezi planul</Button>
        <Button variant="secondary" onClick={() => router.push("/recipe/r_omleta_hp")}>Descoperă rețeta vedetă</Button>
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          clearToasts();
          router.push("/");
        }}
      >
        Înapoi la început
      </Button>
    </section>
  );
}

