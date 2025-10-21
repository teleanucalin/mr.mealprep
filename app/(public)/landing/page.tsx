"use client";

import { useRouter } from "next/navigation";

import { Hero } from "../../../components/sections/Hero";
import { HowItWorks } from "../../../components/sections/HowItWorks";
import { PlanSelector } from "../../../components/sections/PlanSelector";
import { CTASticky } from "../../../components/CTASticky";
import { useUIStore } from "../../../lib/state/uiStore";

export default function LandingPage() {
  const router = useRouter();
  const { stickyCTAEnabled } = useUIStore();

  const handleStartTrial = () => {
    router.push("/onboarding");
  };

  return (
    <div className="relative flex flex-col gap-12 pb-24">
      <Hero onCTAClick={handleStartTrial} onLearnMore={() => document.getElementById("cum-functioneaza")?.scrollIntoView({ behavior: "smooth" })} />
      <HowItWorks id="cum-functioneaza" />
      <PlanSelector onStartTrial={handleStartTrial} />
      {stickyCTAEnabled && (
        <CTASticky
          label="Pregătit pentru planul Pro?"
          actionLabel="Începe trialul"
          onAction={handleStartTrial}
        />
      )}
    </div>
  );
}

