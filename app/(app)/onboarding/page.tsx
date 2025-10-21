"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Stepper } from "../../../components/ui/Stepper";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { usePlanStore } from "../../../lib/state/planStore";
import { useUIStore } from "../../../lib/state/uiStore";

const schema = z.object({
  audience: z.enum(["A", "B", "E"]),
  kcalTargetPerDay: z.coerce.number().min(1200).max(4000),
  weightKg: z.coerce.number().min(40).max(140),
  proteinTargetPerKg: z.coerce.number().min(1.2).max(2.5),
  mealsPerDay: z.coerce.number().min(3).max(5),
  dietMode: z.enum(["omnivor", "vegetarian", "high-protein", "low-carb"]),
  maxPrepMinutes: z.coerce.number().min(10).max(90),
  budgetPerServingRON: z.coerce.number().min(5).max(50),
  allergies: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const steps = [
  { label: "Obiectiv", description: "Alege profilul (A/B/E)" },
  { label: "Ținte calorice", description: "Definește kcal & greutate" },
  { label: "Macro & mese", description: "Proteine și mese/zi" },
  { label: "Preferințe", description: "Dietă & alergii" },
  { label: "Lifestyle", description: "Timp & buget" },
];

const audiences = [
  { id: "A", title: "Atleți" },
  { id: "B", title: "Busy" },
  { id: "E", title: "Easy weight-loss" },
];

const dietModes = [
  { id: "omnivor", label: "Omnivor" },
  { id: "vegetarian", label: "Vegetarian" },
  { id: "high-protein", label: "High-protein" },
  { id: "low-carb", label: "Low-carb" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const setPreference = usePlanStore((state) => state.setPreference);
  const regenerate = usePlanStore((state) => state.regenerate);
  const setOnboardingComplete = useUIStore((state) => state.setOnboardingComplete);
  const [step, setStep] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      audience: "A",
      kcalTargetPerDay: 2400,
      weightKg: 75,
      proteinTargetPerKg: 2,
      mealsPerDay: 4,
      dietMode: "omnivor",
      maxPrepMinutes: 30,
      budgetPerServingRON: 18,
      allergies: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const preference = {
      audience: values.audience,
      kcalTargetPerDay: values.kcalTargetPerDay,
      weightKg: values.weightKg,
      proteinTargetPerKg: values.proteinTargetPerKg,
      mealsPerDay: values.mealsPerDay,
      dietMode: values.dietMode,
      maxPrepMinutes: values.maxPrepMinutes,
      budgetPerServingRON: values.budgetPerServingRON,
      allergies: values.allergies?.split(",").map((item) => item.trim()).filter(Boolean),
    } as const;

    setPreference(preference);
    regenerate(preference);
    setOnboardingComplete(true);
    router.push("/plan");
  });

  const nextStep = async () => {
    const valid = await trigger();
    if (!valid) return;
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const currentAudience = watch("audience");
  const kcal = watch("kcalTargetPerDay");

  return (
    <div className="flex flex-col gap-6">
      <Stepper steps={steps} activeIndex={step} />
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        {step === 0 && (
          <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-[#0f172a]">Ce te interesează?</h2>
            <Controller
              name="audience"
              control={control}
              render={({ field }) => (
                <div className="grid gap-3 sm:grid-cols-3">
                  {audiences.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => field.onChange(option.id)}
                      className={`rounded-2xl border p-4 text-left transition-colors ${
                        field.value === option.id
                          ? "border-[#059669] bg-[#ecfdf5] text-[#047857]"
                          : "border-[#e2e8f0] text-[#0f172a]"
                      }`}
                    >
                      <span className="text-sm font-semibold">{option.title}</span>
                      <p className="mt-1 text-xs text-[#64748b]">Profil {option.id}</p>
                    </button>
                  ))}
                </div>
              )}
            />
          </section>
        )}

        {step === 1 && (
          <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0f172a]">Țintă calorică</h2>
            <p className="mb-4 text-sm text-[#64748b]">
              Ajustează în funcție de obiectiv. Pentru {currentAudience} recomandăm 2200–2800 kcal.
            </p>
            <Controller
              name="kcalTargetPerDay"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <input
                    type="range"
                    min={1200}
                    max={4000}
                    step={50}
                    value={field.value}
                    onChange={(event) => field.onChange(Number(event.target.value))}
                    className="w-full accent-[#059669]"
                    aria-label="Țintă calorică zilnică"
                  />
                  <div className="flex items-center justify-between text-xs text-[#64748b]">
                    <span>1200 kcal</span>
                    <span>2600 kcal</span>
                    <span>4000 kcal</span>
                  </div>
                </div>
              )}
            />
            <div className="mt-4 flex items-center justify-between text-sm text-[#0f172a]">
              <span>Kcal/zi: {kcal}</span>
              <Controller
                name="weightKg"
                control={control}
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <span>Greutate (kg)</span>
                    <input
                      type="number"
                      min={40}
                      max={140}
                      className="h-10 w-20 rounded-xl border border-[#e2e8f0] px-3"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </label>
                )}
              />
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0f172a]">Macro & mese</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="proteinTargetPerKg"
                control={control}
                render={({ field }) => (
                  <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
                    Proteine g/kg
                    <input
                      type="number"
                      step="0.1"
                      min={1.2}
                      max={2.5}
                      value={field.value}
                      onChange={field.onChange}
                      className="h-11 rounded-xl border border-[#e2e8f0] px-3"
                    />
                    <span className="text-xs text-[#64748b]">
                      Recomandat: 1.8–2.2g/kg pentru A, 1.6g/kg pentru B, 1.4g/kg pentru E.
                    </span>
                  </label>
                )}
              />
              <Controller
                name="mealsPerDay"
                control={control}
                render={({ field }) => (
                  <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
                    Mese pe zi
                    <input
                      type="number"
                      min={3}
                      max={5}
                      value={field.value}
                      onChange={field.onChange}
                      className="h-11 rounded-xl border border-[#e2e8f0] px-3"
                    />
                    <span className="text-xs text-[#64748b]">
                      Limitează deciziile: 3 mese + 1 snack pentru majoritatea planurilor.
                    </span>
                  </label>
                )}
              />
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0f172a]">Preferințe alimentare</h2>
            <Controller
              name="dietMode"
              control={control}
              render={({ field }) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  {dietModes.map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => field.onChange(mode.id)}
                      className={`rounded-2xl border p-4 text-left ${
                        field.value === mode.id
                          ? "border-[#059669] bg-[#ecfdf5] text-[#047857]"
                          : "border-[#e2e8f0] text-[#0f172a]"
                      }`}
                    >
                      <span className="text-sm font-semibold">{mode.label}</span>
                    </button>
                  ))}
                </div>
              )}
            />
            <Controller
              name="allergies"
              control={control}
              render={({ field }) => (
                <label className="mt-4 flex flex-col gap-2 text-sm text-[#0f172a]">
                  Alergii / Intoleranțe (separate prin virgule)
                  <input
                    type="text"
                    placeholder="ex: lactate, gluten"
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    className="h-11 rounded-xl border border-[#e2e8f0] px-3"
                  />
                </label>
              )}
            />
          </section>
        )}

        {step === 4 && (
          <section className="rounded-3xl border border-[#e2e8f0] bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0f172a]">Lifestyle & constrângeri</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Controller
                name="maxPrepMinutes"
                control={control}
                render={({ field }) => (
                  <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
                    Timp maxim de gătit (min)
                    <input
                      type="number"
                      min={10}
                      max={90}
                      value={field.value}
                      onChange={field.onChange}
                      className="h-11 rounded-xl border border-[#e2e8f0] px-3"
                    />
                    <span className="text-xs text-[#64748b]">
                      Pentru flow rapid recomandăm sub 35 min.
                    </span>
                  </label>
                )}
              />
              <Controller
                name="budgetPerServingRON"
                control={control}
                render={({ field }) => (
                  <label className="flex flex-col gap-2 text-sm text-[#0f172a]">
                    Buget per porție (RON)
                    <input
                      type="number"
                      step="0.5"
                      min={5}
                      max={50}
                      value={field.value}
                      onChange={field.onChange}
                      className="h-11 rounded-xl border border-[#e2e8f0] px-3"
                    />
                    <span className="text-xs text-[#64748b]">
                      Planul curent are cost mediu ~18 lei/porție.
                    </span>
                  </label>
                )}
              />
            </div>
          </section>
        )}

        <footer className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-[#e2e8f0] bg-surface-base/95 px-3 py-4 backdrop-blur">
          <Button variant="ghost" size="sm" onClick={prevStep} disabled={step === 0}>
            Înapoi
          </Button>
          {step < steps.length - 1 ? (
            <Button size="sm" onClick={nextStep}>
              Continuă
            </Button>
          ) : (
            <Button size="sm" type="submit" isLoading={isSubmitting}>
              Generează planul
            </Button>
          )}
        </footer>
      </form>
      <Badge variant="info" className="self-center">
        5 pași • ~45 sec • CTA sticky jos pentru mobil
      </Badge>
    </div>
  );
}
