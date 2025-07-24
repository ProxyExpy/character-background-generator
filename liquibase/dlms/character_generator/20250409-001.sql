INSERT INTO character_generator.genders(
	name, subjective_pronoun, possesive_pronoun, objective_pronoun, reflexive_pronoun, weight)
	VALUES 
    ('Non-Binary', 'they', 'them', 'their', 'themself', 10),
    ('Female', 'she', 'her', 'her', 'herself', 51),
    ('Male', 'he', 'him', 'his', 'himself', 50);


INSERT INTO character_generator.cultures(
	name, culture_mod, skill_bonuses, native_literacy, foreign_literacy, items, environment, hobby, weight)
	VALUES 
        ('Primative', -3, '[{"skill": "Weapon", "rank": 3, "chance": 100}, {"skill": "Wilderness Survival", "rank": 5, "chance": 100}, {"skill": "Hunter Gathering", "rank": 3, "chance": 100}, {"skill": "Urban Survival", "rank": 1, "chance": 100}]',
            5, '[]', '[{"item": "One-handed Weapon", "chance": 100}]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[]}]', 
            '[]', 1),
	    ('Nomad', 0, '[{"skill": "Wilderness Survival", "rank": 4, "chance": 100}, {"skill": "Urban Survival", "rank": 1, "chance": 100}]', 
            20, '[{"chance": 10}, {"chance": 10}]', '[{"item": "Riding Animal", "chance": 75}]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[]}]', 
            '[]', 2),
	    ('Barbarian', 2, '[{"skill": "Melee Weapon", "rank": 3, "chance": 100}, {"skill": "Missile Weapon", "rank": 3, "chance": 100}]', 
            10, '[]', '[{"item": "One handed melee weapon", "chance": 100}, {"item": "Missile weapon", "chance": 100}]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[{"skill": "Urban Survival", "rank": 1, "chance": 100}, {"skill": "Wilderness Survival", "rank": 5, "chance": 100}]}, 
              {"environment": "Urban", "weight": 1, "skills":[{"skill": "Urban Survival", "rank": 5, "chance": 100}, {"skill": "Wilderness Survival", "rank": 1, "chance": 100}]}]', 
            '[]', 3),
        ('Civilized', 4, '[]', 
            30, '[]', '[]', 
            '[{"environment": "Wilderness", "weight": 1, "skills":[{"skill": "Wilderness Survival", "rank": 2, "chance": 100}]}, 
              {"environment": "Urban", "weight": 1, "skills":[{"skill": "Urban Survival", "rank": 2, "chance": 100}]}]', 
            '[{"chance": 50}]', 3),
        ('Civilized-Decadent', 7, '[{"skill": "Urban Survival", "rank": 3, "chance": 100}]', 
            30, '[{"chance": 10}]', '[]', 
            '[{"environment": "Urban", "weight": 1, "skills":[]}]', 
            '[]', 1);