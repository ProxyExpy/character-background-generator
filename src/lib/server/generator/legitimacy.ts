import { query } from '#lib/server/database.ts';
import type { Culture, LegitimacyResult, IllegitimacyReason } from '#lib/types/types.ts';
import { rollDie } from './dice.ts';

export const generateReasonForIllegitimacy105 = async (culture: Culture, matureToggle: boolean): Promise<IllegitimacyReason> => {
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

export const generateLegitimacy104 = async (culture: Culture, matureToggle: boolean ): Promise<LegitimacyResult> => {
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
