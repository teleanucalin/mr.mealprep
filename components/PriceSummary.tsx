import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { PRICING_CONFIG } from "@/lib/pricing";

interface PriceSummaryProps {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  total: number;
  freeDeliveryRemaining?: number;
}

export function PriceSummary({
  subtotal,
  serviceFee,
  deliveryFee,
  total,
  freeDeliveryRemaining,
}: PriceSummaryProps) {
  return (
    <Card className="sticky top-6 scale-in">
      <CardHeader>
        <CardTitle className="text-lg">Rezumat comandă</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Taxă serviciu (3.5%, max 9.99 RON)
          </span>
          <span className="font-medium">{formatPrice(serviceFee)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Livrare</span>
          <span className="font-medium">
            {deliveryFee === 0 ? (
              <Badge variant="success" className="text-xs">
                Gratuită
              </Badge>
            ) : (
              formatPrice(deliveryFee)
            )}
          </span>
        </div>

        {freeDeliveryRemaining && freeDeliveryRemaining > 0 && (
          <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
            Mai adaugă {formatPrice(freeDeliveryRemaining)} pentru livrare gratuită
          </div>
        )}

        {subtotal < PRICING_CONFIG.MINIMUM_CART && (
          <div className="text-xs text-destructive bg-destructive/10 p-2 rounded">
            Coș minim: {formatPrice(PRICING_CONFIG.MINIMUM_CART)}. Mai adaugă{" "}
            {formatPrice(PRICING_CONFIG.MINIMUM_CART - subtotal)}
          </div>
        )}

        <div className="border-t pt-3 flex justify-between text-base font-semibold">
          <span>Total</span>
          <span className="text-primary">{formatPrice(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

