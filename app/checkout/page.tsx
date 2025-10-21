"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/store/useCart";
import { useSubscription } from "@/store/useSubscription";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PriceSummary } from "@/components/PriceSummary";
import { EmptyState } from "@/components/EmptyState";
import { ShoppingCart, AlertCircle, CreditCard, Apple } from "lucide-react";
import { COPY } from "@/lib/copy";
import { useToast } from "@/components/ui/use-toast";
import { DeliveryWindow } from "@/lib/types";
import { isCartValid, calculateCartBreakdown } from "@/lib/pricing";

export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { cart, deliveryWindow, alwaysInCart, setDeliveryWindow, setAlwaysInCart, clearCart } = useCart();
  const { getCurrentPlan } = useSubscription();
  const [deliveryWindows, setDeliveryWindows] = useState<DeliveryWindow[]>([]);
  const [selectedWindowId, setSelectedWindowId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "apple" | "google">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Fetch delivery windows
    fetch("/api/mock/delivery")
      .then((res) => res.json())
      .then((data) => {
        setDeliveryWindows(data.windows);
        if (data.windows.length > 0) {
          setSelectedWindowId(data.windows[0].id);
          setDeliveryWindow(data.windows[0]);
        }
      });
  }, [setDeliveryWindow]);

  const handleWindowChange = (windowId: string) => {
    setSelectedWindowId(windowId);
    const window = deliveryWindows.find((w) => w.id === windowId);
    if (window) {
      setDeliveryWindow(window);
    }
  };

  const handleCheckout = async () => {
    // Validate cart minimum
    const validation = isCartValid(cart.subtotal);
    if (!validation.valid) {
      toast({
        title: "Coș incomplet",
        description: `${validation.message}: ${validation.remaining?.toFixed(2)} RON`,
        variant: "destructive",
      });
      return;
    }

    // Validate delivery window
    if (!deliveryWindow) {
      toast({
        title: "Selectează livrarea",
        description: "Alege o fereastră de livrare",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch("/api/mock/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart,
          deliveryWindow,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.orderId);
        setShowSuccess(true);
      } else {
        toast({
          title: "Eroare",
          description: data.error || "Nu am putut procesa comanda",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Ceva nu a mers bine. Încearcă din nou.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    clearCart();
    router.push("/");
  };

  if (cart.items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingCart className="h-12 w-12" />}
        title="Coșul este gol"
        description="Adaugă un plan săptămânal pentru a continua"
        action={{
          label: "Creează plan",
          onClick: () => router.push("/plan"),
        }}
      />
    );
  }

  const breakdown = calculateCartBreakdown(cart.subtotal);
  const canCheckout = isCartValid(cart.subtotal).valid && !!deliveryWindow;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{COPY.checkout.title}</h1>
        <p className="text-muted-foreground">{COPY.checkout.subtitle}</p>
      </div>

      {/* Cutoff Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenție la termenul limită</AlertTitle>
        <AlertDescription>{COPY.checkout.deliveryWindow.cutoff}</AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle>Ingrediente ({cart.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {cart.items.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.ingredient.name}</p>
                      <p className="text-muted-foreground">
                        {item.quantity.toFixed(1)} {item.ingredient.unit}
                      </p>
                    </div>
                    <p className="font-medium">
                      {(item.ingredient.price * item.quantity).toFixed(2)} RON
                    </p>
                  </div>
                ))}
                {cart.items.length > 5 && (
                  <p className="text-sm text-muted-foreground">
                    ... și încă {cart.items.length - 5} ingrediente
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Window */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.checkout.deliveryWindow.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Zi & Interval orar</Label>
                <Select value={selectedWindowId} onValueChange={handleWindowChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryWindows.map((window) => (
                      <SelectItem key={window.id} value={window.id}>
                        {COPY.checkout.deliveryWindow.defaultDay} • {window.timeSlot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Always in Cart */}
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-1">
                  <Label htmlFor="always-in-cart">
                    {COPY.checkout.alwaysInCart.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    {COPY.checkout.alwaysInCart.help}
                  </p>
                </div>
                <Switch
                  id="always-in-cart"
                  checked={alwaysInCart}
                  onCheckedChange={setAlwaysInCart}
                  disabled={!getCurrentPlan().limits.alwaysInCart}
                />
              </div>

              {!getCurrentPlan().limits.alwaysInCart && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Always-in-cart disponibil doar în Pro și Gourmet
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>{COPY.checkout.payment.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("card")}
                  className="gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Card
                </Button>
                <Button
                  variant={paymentMethod === "apple" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("apple")}
                  className="gap-2"
                >
                  <Apple className="h-4 w-4" />
                  Apple Pay
                </Button>
                <Button
                  variant={paymentMethod === "google" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("google")}
                  className="gap-2"
                >
                  G Pay
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <PriceSummary
            subtotal={breakdown.subtotal}
            serviceFee={breakdown.serviceFee}
            deliveryFee={breakdown.deliveryFee}
            total={breakdown.total}
            freeDeliveryRemaining={breakdown.freeDeliveryRemaining}
          />

          <Button
            size="lg"
            className="w-full"
            onClick={handleCheckout}
            disabled={!canCheckout || isProcessing}
          >
            {isProcessing ? "Procesăm comanda..." : COPY.checkout.placeOrder}
          </Button>

          {!canCheckout && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {!isCartValid(cart.subtotal).valid
                  ? `Coș minim: 120 RON (lipsesc ${(120 - cart.subtotal).toFixed(2)} RON)`
                  : "Selectează o fereastră de livrare"}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={handleSuccessClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{COPY.checkout.orderPlaced.title}</DialogTitle>
            <DialogDescription>
              {COPY.checkout.orderPlaced.message}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Număr comandă</p>
              <p className="text-2xl font-bold">{orderId}</p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSuccessClose} className="w-full">
              Înapoi la pagina principală
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

