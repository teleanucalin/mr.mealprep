import { NextResponse } from "next/server";
import { DeliveryWindow } from "@/lib/types";

const DELIVERY_WINDOWS: DeliveryWindow[] = [
  {
    id: "sat-morning",
    day: "saturday",
    timeSlot: "10:00-13:00",
    available: true,
    cutoffTime: new Date("2025-10-23T18:00:00"), // Joi 18:00
  },
  {
    id: "sat-afternoon",
    day: "saturday",
    timeSlot: "13:00-16:00",
    available: true,
    cutoffTime: new Date("2025-10-23T18:00:00"),
  },
  {
    id: "sat-evening",
    day: "saturday",
    timeSlot: "16:00-19:00",
    available: true,
    cutoffTime: new Date("2025-10-23T18:00:00"),
  },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return NextResponse.json({ windows: DELIVERY_WINDOWS });
}

export async function POST(request: Request) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const body = await request.json();
    const { windowId } = body;

    const selectedWindow = DELIVERY_WINDOWS.find((w) => w.id === windowId);

    if (!selectedWindow) {
      return NextResponse.json(
        { error: "Invalid delivery window" },
        { status: 400 }
      );
    }

    // Verifică cutoff
    const now = new Date();
    const isPastCutoff = now > selectedWindow.cutoffTime;

    if (isPastCutoff) {
      return NextResponse.json(
        {
          error: "Cutoff time has passed",
          message: "Cutoff-ul pentru această săptămână a trecut (Joi 18:00)",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      window: selectedWindow,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to select delivery window" },
      { status: 500 }
    );
  }
}

