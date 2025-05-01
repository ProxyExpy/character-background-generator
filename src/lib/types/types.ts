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
    environment: JSON;
    hobby: JSON;
    weight: number;
}