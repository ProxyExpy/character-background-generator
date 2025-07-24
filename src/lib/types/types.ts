interface AbilityModifiers {
  str?: number;
  dex?: number;
  con?: number;
  int?: number;
  wis?: number;
  cha?: number;
  any?: number;
}

interface SkillBonus {
  skill: string;
  rank: number | { dice?: string };
}

interface TraitEntry {
  trait: string;
  source?: string;
  chance?: number;
}

interface SocialEvent {
  culture?: string;
  chance: number;
  when?: "child" | "adolescent" | "adult";
  event_table?: string;
  grants?: { skill: string; rank: number }[];
}

interface ItemGrant {
  item: string;
  quantity?: string | number;
  chance?: number;
  value_multiplier?: number;
}

interface LiteracyMiscEntry {
  chance: number;
  effect: string;
}

interface EnvironmentSkillEntry {
  chance: number;
  urbanSurvivalRank?: number;
  wildernessSurvivalRank?: number;
}

export interface EnvironmentEntry {
  environment: "Urban" | "Wilderness" | string; // Add more types if needed
  weight: number; // Used for weighted random selection
  skills: EnvironmentSkillEntry[];
}

export interface Gender {
  id: number;
  name: string;
  subjective_pronoun: string;
  possessive_pronoun: string;
  objective_pronoun: string;
  reflexive_pronoun: string;
  weight: number;
}

export interface Culture {
  id: number;
  name: string;
  culture_mod: number;
  skill_bonuses: JSON;
  native_literacy: number;
  foreign_literacy: JSON;
  items: JSON;
  environment: EnvironmentEntry[] | EnvironmentEntry;
  hobby: JSON;
  weight: number;
}

export interface Race {
  id: number;
  name: string;
  source: string;
  ability_modifiers: AbilityModifiers;  
  size: "Fine" | "Diminutive" | "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan" | "Colossal";
  type: string;
  base_speed: number;
  languages: {
    automatic: string[];
    bonus: string[];
  };
  racial_traits: string[];
  favored_classes: string[];
  weight: number;
}

export interface SocialStatusModifiers {
  cultureMod: number;
  titleMod: number;
}

export interface SocialStatus {
  id: number;
  name: string;
  social_mod: number;
  skill_bonuses: SkillBonus[];
  traits: TraitEntry[]; 
  events: SocialEvent[]; 
  items: ItemGrant[];
  special_instructions: string | null;
  money_multiplier: number;
  literacy_modifier: number;
  literacy_override: number;
  literacy_misc: LiteracyMiscEntry[];
  upper_bound: number;
}
