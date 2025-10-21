import { NextResponse } from "next/server";
import { calculateCartBreakdown, isCartValid } from "@/lib/pricing";

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  try {
    const body = await request.json();
    const { cart, deliveryWindow, paymentMethod } = body;

    // Validare coș
    const validation = isCartValid(cart.subtotal);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: validation.message,
          remaining: validation.remaining,
        },
        { status: 400 }
      );
    }

    // Validare fereastră livrare
    if (!deliveryWindow) {
      return NextResponse.json(
        { error: "Selectează o fereastră de livrare" },
        { status: 400 }
      );
    }

    // Calculează breakdown final
    const breakdown = calculateCartBreakdown(cart.subtotal);

    // Mock order ID
    const orderId = `ORD-${Date.now()}`;

    return NextResponse.json({
      success: true,
      orderId,
      breakdown,
      deliveryWindow,
      paymentMethod,
      estimatedDelivery: deliveryWindow.timeSlot,
      message: "Comandă plasată cu succes! Vei primi confirmare pe email și SMS.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}

