"use client";

import * as Slider from "@radix-ui/react-slider";
import clsx from "clsx";

const marks = [
  { value: 0, label: "Scăzut" },
  { value: 50, label: "Echilibrat" },
  { value: 100, label: "Ridicat" },
];

type VarietySliderProps = {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export function VarietySlider({ value, onChange, disabled }: VarietySliderProps) {
  return (
    <div className="flex flex-col gap-3">
      <Slider.Root
        className={clsx(
          "relative flex h-8 w-full touch-pan-x items-center",
          disabled && "opacity-60",
        )}
        value={[value]}
        onValueChange={(vals) => onChange(vals[0] ?? 0)}
        min={0}
        max={100}
        step={1}
        disabled={disabled}
        aria-label="Nivel varietate"
      >
        <Slider.Track className="relative h-2 flex-1 rounded-full bg-[#e2e8f0]">
          <Slider.Range className="absolute h-full rounded-full bg-[#059669]" />
        </Slider.Track>
        <Slider.Thumb className="block h-6 w-6 rounded-full border-2 border-white bg-[#059669] shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#059669]/70" />
      </Slider.Root>
      <div className="flex justify-between text-xs text-[#64748b]">
        {marks.map((mark) => (
          <button
            key={mark.value}
            type="button"
            className={clsx(
              "rounded-full px-2 py-1",
              Math.abs(value - mark.value) < 5 && "bg-[#ecfdf5] text-[#047857]",
            )}
            onClick={() => onChange(mark.value)}
          >
            {mark.label}
          </button>
        ))}
      </div>
    </div>
  );
}
