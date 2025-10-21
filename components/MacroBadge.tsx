import { Badge } from "@/components/ui/badge";
import { formatMacro } from "@/lib/utils";

interface MacroBadgeProps {
  type: "calories" | "protein" | "carbs" | "fat";
  value: number;
  variant?: "default" | "outline";
}

const macroConfig = {
  calories: {
    label: "kcal",
    color: "bg-orange-100 text-orange-700 border-orange-200",
  },
  protein: {
    label: "P",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  carbs: {
    label: "C",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  fat: {
    label: "G",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
};

export function MacroBadge({ type, value, variant = "default" }: MacroBadgeProps) {
  const config = macroConfig[type];
  const displayValue = type === "calories" ? Math.round(value) : formatMacro(value);

  return (
    <Badge
      variant={variant}
      className={variant === "default" ? config.color : ""}
    >
      {displayValue} {config.label}
    </Badge>
  );
}

