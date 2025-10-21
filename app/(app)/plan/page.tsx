"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useUIStore } from "../../../lib/state/uiStore";
import { usePlanStore } from "../../../lib/state/planStore";
import { PlanView } from "../../../components/PlanView";

export default function PlanPage() {
  const router = useRouter();
  const isOnboardingComplete = useUIStore((state) => state.isOnboardingComplete);
  const plan = usePlanStore((state) => state.plan);

  useEffect(() => {
    if (!isOnboardingComplete) {
      router.replace("/onboarding");
    }
  }, [isOnboardingComplete, router]);

  if (!plan) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-[#475569]">
        Încărcăm planul tău...
      </div>
    );
  }

  return <PlanView />;
}

