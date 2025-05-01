INSERT INTO character_generator.genders(
	name, subjective_pronoun, possesive_pronoun, objective_pronoun, reflexive_pronoun, weight)
	VALUES 
    ('Non-Binary', 'they', 'them', 'their', 'themself', 10),
    ('Female', 'she', 'her', 'her', 'herself', 45),
    ('Male', 'he', 'him', 'his', 'himself', 45);

INSERT INTO character_generator.cultures(
	name, culture_mod, skill_bonuses, native_literacy, foreign_literacy, items, environment, hobby, weight)
	VALUES 
        ('Primative', -3, '[{"weaponRank": 3, "chance": 100}, {"wildernessSurvivalRank": 5, "chance": 100}, {"huntingGatheringRank": 3, "chance": 100}, {"urbanSurvivalRank": 1, "chance": 100}]',
            5, '[]', '[{"item": "One-handed Weapon", "chance": 100}]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[]}]', 
            '[]', 1),
	    ('Nomad', 0, '[{"wildernessSurvivalRank": 4, "chance": 100}, {"urbanSurvivalRank": 1, "chance": 100}]', 
            20, '[{"chance": 10}, {"chance": 10}]', '[{"item": "Riding Animal", "chance": 75}]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[]}]', 
            '[]', 2),
	    ('Barbarian', 2, '[{"meleeWeaponRank": 3, "chance": 100}, {"missileWeaponRank": 3, "chance": 100}]', 
            10, '[]', '[{"item": "One handed melee weapon", "chance": 100}, {"item": "Missile weapon", "chance": 100}]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[{"urbanSurvivalRank": 1, "chance": 100}, {"wildernessSurvivalRank": 5, "chance": 100}]}, {"environment": "Urban", "weight": 1, "skills":[{"urbanSurvivalRank": 5, "chance": 100}, {"wildernessSurvivalRank": 1, "chance": 100}]}]', 
            '[]', 3),
        ('Civilized', 4, '[]', 
            30, '[]', '[]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[{"wildernessSurvivalRank": 2, "chance": 100}]}, {"environment": "Urban", "weight": 1, "skills":[{"urbanSurvivalRank": 2, "chance": 100}]}]', 
            '[{"chance": 50}]', 3),
        ('Civilized-Decadent', 7, '[{"urbanSurvivalRank": 3, "chance": 100}]', 
            30, '[{"chance": 10}]', '[]', 
            '[{"environment": "Urban", "weight": 1, "skills":[]}]', 
            '[]', 1);