import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, CartItem, DeliveryWindow, WeekPlan } from "@/lib/types";
import { calculateCartBreakdown } from "@/lib/pricing";

interface CartState {
  cart: Cart;
  deliveryWindow: DeliveryWindow | null;
  alwaysInCart: boolean;

  addWeekPlanToCart: (weekPlan: WeekPlan) => void;
  updateQuantity: (ingredientId: string, quantity: number) => void;
  removeItem: (ingredientId: string) => void;
  setDeliveryWindow: (window: DeliveryWindow | null) => void;
  setAlwaysInCart: (enabled: boolean) => void;
  clearCart: () => void;
  recalculateCart: () => void;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  serviceFee: 0,
  deliveryFee: 0,
  total: 0,
  alwaysInCart: false,
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: initialCart,
      deliveryWindow: null,
      alwaysInCart: false,

      addWeekPlanToCart: (weekPlan) => {
        // Agregă toate ingredientele din planul săptămânal
        const itemsMap = new Map<string, CartItem>();

        weekPlan.days.forEach((day) => {
          day.meals.forEach((meal) => {
            meal.recipe.ingredients.forEach((ingredient) => {
              const key = ingredient.name;
              const existing = itemsMap.get(key);

              if (existing) {
                existing.quantity += ingredient.quantity * meal.servings;
                existing.recipeIds.push(meal.recipe.id);
              } else {
                itemsMap.set(key, {
                  ingredient,
                  quantity: ingredient.quantity * meal.servings,
                  recipeIds: [meal.recipe.id],
                });
              }
            });
          });
        });

        const items = Array.from(itemsMap.values());
        const subtotal = items.reduce(
          (sum, item) => sum + item.ingredient.price * item.quantity,
          0
        );

        const breakdown = calculateCartBreakdown(subtotal);

        set({
          cart: {
            items,
            subtotal: breakdown.subtotal,
            serviceFee: breakdown.serviceFee,
            deliveryFee: breakdown.deliveryFee,
            total: breakdown.total,
            alwaysInCart: get().alwaysInCart,
          },
        });
      },

      updateQuantity: (ingredientId, quantity) => {
        set((state) => {
          const items = state.cart.items.map((item) =>
            item.ingredient.name === ingredientId ? { ...item, quantity } : item
          );
          const subtotal = items.reduce(
            (sum, item) => sum + item.ingredient.price * item.quantity,
            0
          );
          const breakdown = calculateCartBreakdown(subtotal);

          return {
            cart: {
              ...state.cart,
              items,
              subtotal: breakdown.subtotal,
              serviceFee: breakdown.serviceFee,
              deliveryFee: breakdown.deliveryFee,
              total: breakdown.total,
            },
          };
        });
      },

      removeItem: (ingredientId) => {
        set((state) => {
          const items = state.cart.items.filter(
            (item) => item.ingredient.name !== ingredientId
          );
          const subtotal = items.reduce(
            (sum, item) => sum + item.ingredient.price * item.quantity,
            0
          );
          const breakdown = calculateCartBreakdown(subtotal);

          return {
            cart: {
              ...state.cart,
              items,
              subtotal: breakdown.subtotal,
              serviceFee: breakdown.serviceFee,
              deliveryFee: breakdown.deliveryFee,
              total: breakdown.total,
            },
          };
        });
      },

      setDeliveryWindow: (window) => set({ deliveryWindow: window }),

      setAlwaysInCart: (enabled) => {
        set((state) => ({
          alwaysInCart: enabled,
          cart: { ...state.cart, alwaysInCart: enabled },
        }));
      },

      clearCart: () => set({ cart: initialCart, deliveryWindow: null }),

      recalculateCart: () => {
        set((state) => {
          const subtotal = state.cart.items.reduce(
            (sum, item) => sum + item.ingredient.price * item.quantity,
            0
          );
          const breakdown = calculateCartBreakdown(subtotal);

          return {
            cart: {
              ...state.cart,
              subtotal: breakdown.subtotal,
              serviceFee: breakdown.serviceFee,
              deliveryFee: breakdown.deliveryFee,
              total: breakdown.total,
            },
          };
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

