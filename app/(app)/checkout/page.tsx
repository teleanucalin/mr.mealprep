"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { CartList } from "../../../components/checkout/CartList";
import { CheckoutForm } from "../../../components/checkout/CheckoutForm";
import { ConfirmDialog } from "../../../components/checkout/ConfirmDialog";
import { CartSummary } from "../../../components/checkout/CartSummary";
import { useUIStore } from "../../../lib/state/uiStore";

export default function CheckoutPage() {
  const router = useRouter();
  const addToast = useUIStore((state) => state.addToast);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirm = () => {
    addToast({
      id: `checkout-success-${Date.now()}`,
      title: "Comandă simulată",
      description: "Vezi pagina de success pentru finalul demo",
    });
    setConfirmOpen(false);
    router.push("/success");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-6">
        <CartList />
        <CheckoutForm onConfirm={() => setConfirmOpen(true)} />
      </div>
      <CartSummary onGenerateCart={() => addToast({ id: `regen-${Date.now()}`, title: "Coș regenerat", description: "Aceasta este o simulare" })} />
      <ConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
