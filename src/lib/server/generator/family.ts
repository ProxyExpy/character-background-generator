import { query } from '#lib/server/database.ts';
import type { Culture, FamilyDynamic, Gender, SiblingRow, SiblingsResult, BirthOrder } from '#lib/types/types.ts';
import { getRandomWeightedEntry, rollDie, rollDice } from './dice.ts';

export const generateFamily106 = async (culture: Culture) => {
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

export const generateSiblings107 = async (genders: Gender[]): Promise<SiblingsResult> => {
  const siblingRows = await query<SiblingRow>(
    `SELECT upper_bound, description, sibling_dice, illegitimate_dice, roll_again
      FROM character_generator.siblings
      ORDER BY upper_bound ASC;`);

  const result: SiblingsResult = { rolls: [], descriptions: [], siblings: [], isOnlyChild: false };
  const addSiblings = (count: number, illegitimate: boolean) => {
    for (let i = 0; i < count; i++) {
      result.siblings.push({ gender: getRandomWeightedEntry(genders).name, illegitimate });
    }
  };

  // A 20 adds illegitimate siblings and rolls again, so keep going until a normal result
  let row: SiblingRow | undefined;
  do {
    const siblingRoll = rollDie(20);
    row = siblingRows.find(r => siblingRoll <= r.upper_bound);
    if (!row) {
      throw new Error(`No sibling entry found for roll of ${siblingRoll}`);
    }
    result.rolls.push(siblingRoll);
    result.descriptions.push(row.description);
    if (row.illegitimate_dice) addSiblings(rollDice(row.illegitimate_dice), true);
    if (row.sibling_dice) addSiblings(rollDice(row.sibling_dice), false);
  } while (row.roll_again);

  result.isOnlyChild = result.siblings.length === 0;
  return result;
};

export const generateBirthOrder108 = async (siblings: SiblingsResult): Promise<BirthOrder> => {
  const birthOrders = await query<BirthOrder>(
    `SELECT upper_bound, description, money_modifier
      FROM character_generator.birth_orders
      ORDER BY upper_bound ASC;`);

  // An only child is also the first born; no roll needed
  if (siblings.isOnlyChild) {
    return birthOrders[0];
  }

  const birthOrderRoll = rollDie(20);
  const birthOrder = birthOrders.find(order => birthOrderRoll <= order.upper_bound);
  if (!birthOrder) {
    throw new Error(`No birth order found for roll of ${birthOrderRoll}`);
  }
  return birthOrder;
};
