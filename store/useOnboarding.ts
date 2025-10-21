import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile, Allergen } from "@/lib/types";

interface OnboardingState {
  profile: Partial<UserProfile>;
  currentStep: number;
  isComplete: boolean;
  setProfile: (profile: Partial<UserProfile>) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  setStep: (step: number) => void;
  complete: () => void;
  reset: () => void;
}

const initialProfile: Partial<UserProfile> = {
  allergens: [],
  batchCooking: false,
  mealsPerDay: 3,
  cookingTime: 30,
  budgetPerServing: 20,
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set) => ({
      profile: initialProfile,
      currentStep: 0,
      isComplete: false,

      setProfile: (profile) => set({ profile }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),

      setStep: (step) => set({ currentStep: step }),

      complete: () => set({ isComplete: true }),

      reset: () =>
        set({
          profile: initialProfile,
          currentStep: 0,
          isComplete: false,
        }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);

