export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const sumBy = <T>(items: T[], selector: (item: T) => number) =>
  items.reduce((acc, item) => acc + selector(item), 0);

export const groupBy = <T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K,
) => {
  return items.reduce<Record<K, T[]>>((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) {
      acc[key] = [] as T[];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

export const unique = <T>(items: T[]) => Array.from(new Set(items));

export const average = (values: number[]) =>
  values.length ? sumBy(values, (v) => v) / values.length : 0;

export const seedRandom = (seed: number) => {
  let value = seed % 2147483647;
  if (value <= 0) {
    value += 2147483646;
  }
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
};

export const hashString = (input: string) => {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const isBrowser = () => typeof window !== "undefined";

