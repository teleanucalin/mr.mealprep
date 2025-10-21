"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export function SuccessCelebration() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      {/* Animated Checkmark */}
      <div className="relative">
        {/* Ripple effect */}
        <div
          className={`absolute inset-0 rounded-full bg-success/20 ${
            show ? "animate-ping" : "opacity-0"
          }`}
        />
        
        {/* Main circle */}
        <div
          className={`relative bg-success rounded-full p-6 shadow-lg transition-all duration-500 ${
            show ? "scale-100 rotate-0" : "scale-0 rotate-180"
          }`}
        >
          <CheckCircle2 className="h-16 w-16 text-success-foreground" />
        </div>
      </div>

      {/* Confetti particles */}
      {show && (
        <>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * 100}px`,
                top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * 100}px`,
                backgroundColor: [
                  "#f97316",
                  "#10b981",
                  "#3b82f6",
                  "#f59e0b",
                ][i % 4],
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}

