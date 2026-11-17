/* eslint-disable no-useless-assignment */
import { json } from '@sveltejs/kit';
import { query } from '#lib/server/database.ts';
import { insertCharacter } from '#lib/server/mongo.ts';
import { getRandomWeightedEntry } from '#lib/server/generator/dice.ts';
import { getSocialStatus } from '#lib/server/generator/socialStatus.ts';
import { generateLegitimacy104 } from '#lib/server/generator/legitimacy.ts';
import { generateFamily106, generateSiblings107, generateBirthOrder108 } from '#lib/server/generator/family.ts';
import { generateTimeOfBirth109 } from '#lib/server/generator/birth.ts';
import { generateName } from '#lib/server/generator/names.ts';
import type { Gender, Culture, Race, SocialStatus, EnvironmentEntry } from '#lib/types/types.ts';

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
  const siblings = await generateSiblings107(genders);
  // Orphanage results (Table 106) have the GM roll siblings secretly
  const siblingsHidden = familyDynamic.check_978;
  const birthOrder = await generateBirthOrder108(siblings);
  const timeOfBirth = await generateTimeOfBirth109();

  const fullName = await generateName(gender, surnameFirst);

  return json({
    name: fullName,
    gender,
    race,
    culture,
    socialStatus,
    nobleStatus,
    legitimacyStatus,
    familyDynamic,
    siblings: { ...siblings, hidden: siblingsHidden },
    birthOrder,
    timeOfBirth
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