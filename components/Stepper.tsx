"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="w-full py-4 flex justify-center">
      <div className="flex items-center justify-center max-w-md w-full px-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="relative flex flex-col items-center min-w-[60px]">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 relative z-10",
                    isCompleted &&
                      "bg-primary text-primary-foreground scale-110 shadow-md",
                    isCurrent &&
                      "bg-primary text-primary-foreground scale-110 shadow-lg ring-4 ring-primary/20",
                    !isCompleted &&
                      !isCurrent &&
                      "bg-muted text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5 animate-in zoom-in duration-300" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={cn(
                    "absolute top-12 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap transition-colors duration-200",
                    isCurrent && "text-primary",
                    isCompleted && "text-foreground",
                    !isCompleted && !isCurrent && "text-muted-foreground"
                  )}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div className="h-0.5 w-12 sm:w-16 mx-1 sm:mx-2 bg-muted relative overflow-hidden flex-shrink-0">
                  <div
                    className={cn(
                      "h-full bg-primary transition-all duration-500 ease-out",
                      isCompleted ? "w-full" : "w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

