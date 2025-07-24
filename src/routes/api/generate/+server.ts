import { json } from '@sveltejs/kit';
import { query } from '$lib/server/database';
import type { Gender, Culture, Race, SocialStatus, SocialStatusModifiers, EnvironmentEntry } from '$lib/types/types';

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

const getSocialStatus = (
  statuses: SocialStatus[],
  { cultureMod, titleMod }: SocialStatusModifiers,
  allowNoble: boolean = true
): SocialStatus => {
  let result: SocialStatus | undefined;
  let roll: number;
  let finalRoll: number;

  do {
    roll = Math.floor(Math.random() * 100) + 1;
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
    const extremeRoll = Math.floor(Math.random() * 100) + 1;
    if (extremeRoll <= extremeChance) {
      return statuses.find(status => status.name === "Extremely Wealthy")!;
    }
  }

  return result;
};

export async function GET({ url }) {
  const surnameFirst = url.searchParams.get("surnameFirst") === "true";

  const genders = await query<Gender>(
    `SELECT * FROM character_generator.genders;`
  );
  const cultures = await query<Culture>(
    `SELECT * FROM character_generator.cultures;`
  );
  const races = await query<Race>(
    `SELECT * FROM character_generator.races;`
  );
  const socialStatuses = await query<SocialStatus>(
    `SELECT * FROM character_generator.social_statuses;`
  );

  const gender = getRandomWeightedEntry(genders);
  const culture = getRandomWeightedEntry(cultures);
  const race = getRandomWeightedEntry(races);
  let titleMod = 0;
  let nobleStatus: SocialStatus | undefined;
  let socialStatus = getSocialStatus(socialStatuses, {titleMod, cultureMod: culture.culture_mod});
  if(socialStatus.name === "Noble") {
    //do noble stuff
    nobleStatus = socialStatus;
    titleMod = 10;
    socialStatus = getSocialStatus(socialStatuses, {titleMod, cultureMod: culture.culture_mod}, false);
  }

  const environment = getRandomWeightedEntry(culture.environment as EnvironmentEntry[]);  
  culture.environment = environment;

  const [givenName] = await query<{ name: string }>(
    `SELECT name FROM character_generator.names WHERE is_surname = FALSE AND ${gender.name === 'male' ? 'is_male' : gender.name === 'female' ? 'is_female' : 'is_male AND is_female'} = TRUE ORDER BY RANDOM() LIMIT 1`
  );

  const [surname] = await query<{ name: string }>(
    `SELECT name FROM character_generator.names WHERE is_surname = TRUE ORDER BY RANDOM() LIMIT 1`
  );

  const fullName = surnameFirst
    ? `${surname?.name ?? 'No Name'} ${givenName?.name ?? ''}`
    : `${givenName?.name ?? 'No Name'} ${surname?.name ?? ''}`;

  return json({
    name: fullName,
    gender,
    race,
    culture,
    socialStatus,
    nobleStatus
  });
}
