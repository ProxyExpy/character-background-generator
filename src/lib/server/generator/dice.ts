export const getRandomWeightedEntry = <T extends { weight: number }>(entries: T[]): T => {
  const totalWeight = entries.reduce((sum, entry) => sum + entry.weight, 0);
  const random = Math.random() * totalWeight;
  let cumulativeWeight = 0;
  for (const entry of entries) {
    cumulativeWeight += entry.weight;
    if (random < cumulativeWeight) {
      return entry;
    }
  }
  return entries[entries.length - 1]; // fallback
};

export const rollDie = (sides: number): number => {
  return Math.floor(Math.random() * sides) + 1;
};

// Rolls dice expressions like "1d3", "2d4" or "1d4+2"
export const rollDice = (expression: string): number => {
  const match = expression.match(/^(\d+)d(\d+)([+-]\d+)?$/);
  if (!match) {
    throw new Error(`Invalid dice expression: ${expression}`);
  }
  const [, count, sides, modifier] = match;
  let total = Number(modifier ?? 0);
  for (let i = 0; i < Number(count); i++) {
    total += rollDie(Number(sides));
  }
  return total;
};
