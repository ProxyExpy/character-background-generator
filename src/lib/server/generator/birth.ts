import { query } from '#lib/server/database.ts';
import type { BirthTimePeriod } from '#lib/types/types.ts';
import { getRandomWeightedEntry } from './dice.ts';

export const generateTimeOfBirth109 = async (calendar: string = 'Gregorian'): Promise<BirthTimePeriod> => {
  const periods = await query<BirthTimePeriod>(
    `SELECT calendar, name, sort_order, weight
      FROM character_generator.birth_time_periods
      WHERE calendar = $1
      ORDER BY sort_order ASC;`, [calendar]);

  if (periods.length === 0) {
    throw new Error(`No birth time periods found for calendar ${calendar}`);
  }
  return getRandomWeightedEntry(periods);
};
