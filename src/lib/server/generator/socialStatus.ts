/* eslint-disable no-useless-assignment */
import type { SocialStatus, SocialStatusModifiers } from '#lib/types/types.ts';
import { rollDie } from './dice.ts';

export const getSocialStatus = (
  statuses: SocialStatus[],
  { cultureMod, titleMod }: SocialStatusModifiers,
  allowNoble: boolean = true
): SocialStatus => {
  let result: SocialStatus | undefined;
  let roll: number;
  let finalRoll: number;

  do {
    roll = rollDie(100);
    finalRoll = roll + cultureMod + titleMod;

    result = statuses.find(status => {
      if (!allowNoble && status.name === "Noble") return false;
      return finalRoll <= status.upper_bound;
    });

    // Fallback to last entry if over bounds (e.g. roll > 107)
    if (!result) result = statuses[statuses.length - 1];
  } while (!allowNoble && result.name === "Noble"); // Reroll if Noble is not allowed

  // Handle Extremely Wealthy chance
  if (result.name === "Wealthy") {
    const extremeChance = 1 + titleMod;
    const extremeRoll = rollDie(100);
    if (extremeRoll <= extremeChance) {
      return statuses.find(status => status.name === "Extremely Wealthy")!;
    }
  }

  return result;
};
