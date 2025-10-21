import { Cart } from "./types";

export const PRICING_CONFIG = {
  SERVICE_FEE_PERCENTAGE: 0.035, // 3.5%
  SERVICE_FEE_CAP: 9.99, // RON
  FREE_DELIVERY_THRESHOLD: 250, // RON
  DELIVERY_FEE: 15, // RON
  MINIMUM_CART: 120, // RON
};

/**
 * Calculează taxa de serviciu (3.5%, max 9.99 RON)
 */
export function calculateServiceFee(subtotal: number): number {
  const fee = subtotal * PRICING_CONFIG.SERVICE_FEE_PERCENTAGE;
  return Math.min(fee, PRICING_CONFIG.SERVICE_FEE_CAP);
}

/**
 * Calculează taxa de livrare (0 dacă >250 RON, altfel 15 RON)
 */
export function calculateDeliveryFee(subtotal: number): number {
  return subtotal >= PRICING_CONFIG.FREE_DELIVERY_THRESHOLD ? 0 : PRICING_CONFIG.DELIVERY_FEE;
}

/**
 * Calculează breakdown-ul complet al coșului
 */
export function calculateCartBreakdown(subtotal: number): {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  total: number;
  freeDeliveryRemaining: number;
} {
  const serviceFee = calculateServiceFee(subtotal);
  const deliveryFee = calculateDeliveryFee(subtotal);
  const total = subtotal + serviceFee + deliveryFee;
  
  const freeDeliveryRemaining =
    subtotal < PRICING_CONFIG.FREE_DELIVERY_THRESHOLD
      ? PRICING_CONFIG.FREE_DELIVERY_THRESHOLD - subtotal
      : 0;

  return {
    subtotal,
    serviceFee,
    deliveryFee,
    total,
    freeDeliveryRemaining,
  };
}

/**
 * Verifică dacă coșul respectă minimul (120 RON)
 */
export function isCartValid(subtotal: number): {
  valid: boolean;
  message?: string;
  remaining?: number;
} {
  if (subtotal < PRICING_CONFIG.MINIMUM_CART) {
    return {
      valid: false,
      message: "Coș minim necesar",
      remaining: PRICING_CONFIG.MINIMUM_CART - subtotal,
    };
  }
  return { valid: true };
}

/**
 * Calculează economie estimată vs. alternativă (ex. restaurante/delivery)
 */
export function calculateSavings(weeklyTotal: number): {
  savings: number;
  alternativeCost: number;
  savingsPercentage: number;
} {
  // Estimare: restaurante/delivery = ~3x mai scump
  const alternativeCost = weeklyTotal * 3;
  const savings = alternativeCost - weeklyTotal;
  const savingsPercentage = (savings / alternativeCost) * 100;

  return {
    savings,
    alternativeCost,
    savingsPercentage,
  };
}

