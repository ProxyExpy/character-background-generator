/* eslint-disable no-useless-assignment */
import { json } from '@sveltejs/kit';
import { query } from '$lib/server/database';
import { insertCharacter } from '$lib/server/mongo';
import type { Gender, Culture, Race, SocialStatus, SocialStatusModifiers, EnvironmentEntry, LegitimacyResult, IllegitimacyReason, FamilyDynamic } from '$lib/types/types';

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

const rollDie = (sides: number): number => {
  return Math.floor(Math.random() * sides) + 1;
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

const generateReasonForIllegitimacy105 = async (culture: Culture, matureToggle: boolean): Promise<IllegitimacyReason> => {
  const reasonRoll = rollDie(20);
  const reasonTotal = reasonRoll + culture.culture_mod;

  const reason = await query<IllegitimacyReason>(
    `SELECT reason, know_parent_one_chance, know_parent_two_chance FROM character_generator.illegitimate_reasons
      WHERE (upper_bound >= ${reasonTotal})
        AND (mature_toggle = false OR mature_toggle = ${matureToggle})
      ORDER BY upper_bound ASC NULLS LAST
      LIMIT 1;`);

  if (reason.length > 0 && reason[0].reason) {
    return reason[0];
  } else {
    return {
      reason: "{Name} is of unknown parentage, and {subjective_pronoun} was raised in an orphanage.",
      know_parent_one_chance: 0,
      know_parent_two_chance: 0,
    }
  }
}

const generateLegitimacy104 = async (culture: Culture, matureToggle: boolean ): Promise<LegitimacyResult> => {
  const legitimacyRoll = rollDie(20);
  const legitimacy = legitimacyRoll + culture.culture_mod;
  if(legitimacy >= 19 || (culture.name === "primitive" && legitimacyRoll === 20)){
    return {
      isLegitimate: false,
      checkSiblingsIfNoble: true,
      legitimacyMod: rollDie(4),
      reason: await generateReasonForIllegitimacy105(culture, matureToggle)
    }
  } else {
    return {
      isLegitimate: true,
      checkSiblingsIfNoble: false,
    }
  }
}

const generateFamily106 = async (culture: Culture) => {
  const familyRoll = rollDie(20);
  const familyTotal = familyRoll + culture.culture_mod;
  const familyDynamic = await query<FamilyDynamic>(
    `SELECT upper_bound, description, lineage_roll, grandparents_die_size, aunts_uncles_die_size, 
          cousins_die_size, check_guardian, check_978, set_social_status_id, skill_bonuses
      FROM character_generator.family_relations
      WHERE upper_bound >= ${familyTotal}
      ORDER BY upper_bound ASC
      LIMIT 1;`);

  if (familyDynamic.length === 0) {
    throw new Error(`No family dynamic found for total roll of ${familyTotal}`);
  }

  const familyStatus = familyDynamic[0]

  console.log("Family Dynamic Roll:", familyRoll, "Total with Culture Mod:", familyTotal);
  console.log(familyDynamic);
  if (familyStatus.grandparents_die_size !== null && familyStatus.grandparents_die_size > 0) {
    const grandparentsRoll = rollDie(familyStatus.grandparents_die_size);
    familyStatus.description += `, ${grandparentsRoll} grandparent(s).`;
    familyStatus.grandparents = grandparentsRoll;
  }
  if (familyStatus.aunts_uncles_die_size !== null && familyStatus.aunts_uncles_die_size > 0) {
    const auntsUnclesRoll = rollDie(familyStatus.aunts_uncles_die_size);
    familyStatus.description += `, ${auntsUnclesRoll} aunt(s)/uncle(s).`;
    familyStatus.aunts_uncles = auntsUnclesRoll;
  }
  if (familyStatus.cousins_die_size !== null && familyStatus.cousins_die_size > 0) {
    const cousinsRoll = rollDie(familyStatus.cousins_die_size);
    familyStatus.description += `, ${cousinsRoll} cousin(s).`;
    familyStatus.cousins = cousinsRoll;
  }

  if (familyStatus.check_guardian) {
    console.log("Checking for guardian...");
    console.log("Table 754: Guardians.");
  }

  if (familyStatus.check_978) {
    console.log("Checking for 978...");
    console.log("Table 978: Family Secrets.");
  }

  return familyDynamic[0];

}

export async function GET({ url }) {
  const surnameFirst = url.searchParams.get("surnameFirst") === "true";
  const matureThemes = url.searchParams.get("matureThemes") === "true";

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
  let socialMod = socialStatus.social_mod;
  if(socialStatus.name === "Noble") {
    //do noble stuff
    nobleStatus = socialStatus;
    titleMod = 10;
    socialStatus = getSocialStatus(socialStatuses, {titleMod, cultureMod: culture.culture_mod}, false);
  }

  const environment = getRandomWeightedEntry(culture.environment as EnvironmentEntry[]);  
  culture.environment = environment;

  const legitimacyStatus = await generateLegitimacy104(culture, matureThemes);
  if (!legitimacyStatus.isLegitimate) {
    socialMod -= legitimacyStatus.legitimacyMod ?? 0;
  }

  const familyDynamic = await generateFamily106(culture);

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
    nobleStatus,
    legitimacyStatus,
    familyDynamic
  });
}

export async function POST({ request }) {
  const body = await request.json();
  const characterData = { ...body.character };
  characterData.userId = 1; // Replace with actual user ID from authentication context once implemented
  const date = new Date().toISOString();
  characterData.createdAt = date
  characterData.updatedAt = date

  await insertCharacter(characterData)
    .then(() => {
      console.log('Character inserted successfully');
    })
    .catch((error) => {
      console.error('Error inserting character:', error);
      throw error;
    });
  
  return json({ success: true, message: 'Character saved successfully' });
}