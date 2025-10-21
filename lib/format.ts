export const currencyRON = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "RON",
  maximumFractionDigits: 1,
});

export const numberCompact = new Intl.NumberFormat("ro-RO", {
  notation: "compact",
});

export const formatMinutes = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins ? `${hrs}h ${mins}m` : `${hrs}h`;
};

export const formatMacro = (grams: number, precision = 0) =>
  `${grams.toFixed(precision)} g`;

export const formatKcal = (kcal: number) => `${Math.round(kcal)} kcal`;

