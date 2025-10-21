import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SubscriptionTier, SubscriptionPlan } from "@/lib/types";

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    tier: "free",
    name: "Free",
    price: 0,
    annualPrice: 0,
    features: [
      "4 rețete/săptămână",
      "1 profil",
      "Coș & checkout",
    ],
    limits: {
      recipesPerWeek: 4,
      profiles: 1,
      smartSubstitutions: false,
      lockMacros: false,
      alwaysInCart: false,
      exportGroceryList: false,
      brandPreferences: false,
      priorityDelivery: false,
    },
  },
  pro: {
    tier: "pro",
    name: "Pro",
    price: 39,
    annualPrice: 374, // -20%
    features: [
      "6-7 rețete/săptămână",
      "Substituții smart",
      "Lock macros",
      "Pin & repeat",
      "Always-in-cart",
      "2 profiluri",
      "Check-in auto",
      "Export listă",
    ],
    limits: {
      recipesPerWeek: 7,
      profiles: 2,
      smartSubstitutions: true,
      lockMacros: true,
      alwaysInCart: true,
      exportGroceryList: true,
      brandPreferences: false,
      priorityDelivery: false,
    },
  },
  gourmet: {
    tier: "gourmet",
    name: "Gourmet",
    price: 79,
    annualPrice: 758, // -20%
    features: [
      "10-12 rețete/săptămână",
      "Prioritate livrare",
      "Preferințe brand & health tags",
      "4+ profiluri",
      "Mod echipamente",
      "Suport prioritar",
    ],
    limits: {
      recipesPerWeek: 12,
      profiles: 4,
      smartSubstitutions: true,
      lockMacros: true,
      alwaysInCart: true,
      exportGroceryList: true,
      brandPreferences: true,
      priorityDelivery: true,
    },
  },
};

interface SubscriptionState {
  currentTier: SubscriptionTier;
  isAnnual: boolean;
  trialDaysRemaining: number | null;

  setTier: (tier: SubscriptionTier) => void;
  setIsAnnual: (annual: boolean) => void;
  startTrial: (days: number) => void;
  getCurrentPlan: () => SubscriptionPlan;
  canAccess: (feature: keyof SubscriptionPlan["limits"]) => boolean;
}

export const useSubscription = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      currentTier: "free",
      isAnnual: false,
      trialDaysRemaining: null,

      setTier: (tier) => set({ currentTier: tier }),

      setIsAnnual: (annual) => set({ isAnnual: annual }),

      startTrial: (days) => set({ trialDaysRemaining: days }),

      getCurrentPlan: () => SUBSCRIPTION_PLANS[get().currentTier],

      canAccess: (feature) => {
        const plan = get().getCurrentPlan();
        return plan.limits[feature] === true;
      },
    }),
    {
      name: "subscription-storage",
    }
  )
);

