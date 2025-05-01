import { json } from '@sveltejs/kit';
import { query } from '$lib/server/database';
import type { Gender, Culture } from '$lib/types/types';

const getRandomWeightedEntry = <T extends { weight: number }>(entries: T[]): T => {
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

export async function GET() {
  const genders = await query<Gender>(
    `SELECT * FROM character_generator.genders`
  );
  const cultures = await query<Culture>(
    `SELECT * FROM character_generator.cultures`
  );
  
  const gender = getRandomWeightedEntry(genders);
  const culture = getRandomWeightedEntry(cultures);

  const [first] = await query<{ name: string }>(
    `SELECT name FROM character_generator.names WHERE is_surname = FALSE AND ${gender.name === 'male' ? 'is_male' : gender.name === 'female' ? 'is_female' : 'is_male AND is_female'} = TRUE ORDER BY RANDOM() LIMIT 1`
  );

  const [last] = await query<{ name: string }>(
    `SELECT name FROM character_generator.names WHERE is_surname = TRUE ORDER BY RANDOM() LIMIT 1`
  );

  const fullName = `${first?.name ?? 'Nameless'} ${last?.name ?? 'Unknown'}`;

  return json({
    name: fullName,
    gender,
    culture
  });
}
