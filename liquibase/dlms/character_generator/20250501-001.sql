-- liquibase formatted sql

-- changeset you:20250501-001
-- description: dlm for races and social statuses

INSERT INTO character_generator.races (
    name, source, ability_modifiers, size, type, base_speed,
    languages, racial_traits, favored_classes, weight
) VALUES
('Human', 'Core Rulebook',
 '{"str":0,"dex":0,"con":0,"int":0,"wis":0,"cha":0, "any":2}',
 'Medium', 'Humanoid (Human)', 30,
 '{"automatic":["Common"],"bonus":["Any"]}',
 '["Bonus Feat", "Skilled"]',
 '{"any"}', 150),

('Elf', 'Core Rulebook',
 '{"dex":2,"int":2,"con":-2}',
 'Medium', 'Humanoid (Elf)', 30,
 '{"automatic":["Common","Elven"],"bonus":["Draconic","Gnoll","Gnome","Goblin","Orc","Sylvan"]}',
 '["Elven Magic", "Keen Senses", "Elven Immunities", "Weapon Familiarity", "Low-Light Vision"]',
 '{"wizard"}', 120),

('Dwarf', 'Core Rulebook',
 '{"con":2,"wis":2,"cha":-2}',
 'Medium', 'Humanoid (Dwarf)', 20,
 '{"automatic":["Common","Dwarven"],"bonus":["Giant","Gnome","Goblin","Orc","Terran","Undercommon"]}',
 '["Darkvision", "Defensive Training", "Greed", "Hardy", "Hatred", "Stability", "Stonecunning", "Weapon Familiarity"]',
 '{"fighter"}', 100),

('Halfling', 'Core Rulebook',
 '{"dex":2,"cha":2,"str":-2}',
 'Small', 'Humanoid (Halfling)', 20,
 '{"automatic":["Common","Halfling"],"bonus":["Dwarven","Elven","Gnome","Goblin"]}',
 '["Keen Senses", "Sure-Footed", "Fearless", "Halfling Luck", "Weapon Familiarity"]',
 '{"rogue"}', 90),

('Half-Orc', 'Core Rulebook',
 '{"any":2}',
 'Medium', 'Humanoid (Orc, Human)', 30,
 '{"automatic":["Common","Orc"],"bonus":["Abyssal","Draconic","Giant","Gnoll","Goblin"]}',
 '["Darkvision", "Orc Ferocity", "Weapon Familiarity", "Intimidating"]',
 '{"barbarian"}', 80),

('Half-Elf', 'Core Rulebook',
 '{"any":2}',
 'Medium', 'Humanoid (Elf, Human)', 30,
 '{"automatic":["Common","Elven"],"bonus":["Draconic","Gnoll","Gnome","Goblin","Orc","Sylvan"]}',
 '["Elven Immunities", "Adaptability", "Keen Senses", "Low-Light Vision", "Multitalented"]',
 '{"any"}', 80),

('Gnome', 'Core Rulebook',
 '{"con":2,"cha":2,"str":-2}',
 'Small', 'Humanoid (Gnome)', 20,
 '{"automatic":["Common","Gnome"],"bonus":["Draconic","Dwarven","Elven","Giant","Goblin","Orc"]}',
 '["Low-Light Vision", "Defensive Training", "Gnome Magic", "Hatred", "Illusion Resistance", "Obsessive", "Weapon Familiarity"]',
 '{"bard"}', 70),

('Goblin', 'Advanced Race Guide',
 '{"dex":4,"cha":-2,"wis":-2}',
 'Small', 'Humanoid (Goblin)', 30,
 '{"automatic":["Goblin"],"bonus":["Common","Draconic","Gnome","Orc"]}',
 '["Darkvision", "Fast Movement", "Skilled", "Weapon Familiarity"]',
 '{"alchemist"}', 50),

('Aasimar', 'Bestiary',
 '{"wis":2,"cha":2}',
 'Medium', 'Outsider (Native)', 30,
 '{"automatic":["Common","Celestial"],"bonus":["Draconic","Dwarven","Elven","Gnome","Halfling"]}',
 '["Darkvision", "Celestial Resistance", "Skilled", "Spell-Like Ability"]',
 '{"cleric"}', 40),

('Tiefling', 'Bestiary',
 '{"dex":2,"int":2,"cha":-2}',
 'Medium', 'Outsider (Native)', 30,
 '{"automatic":["Common","Infernal"],"bonus":["Draconic","Dwarven","Elven","Gnome","Halfling"]}',
 '["Darkvision", "Fiendish Resistance", "Skilled", "Spell-Like Ability"]',
 '{"rogue"}', 40),

('Orc', 'Bestiary',
 '{"str":4,"int":-2,"wis":-2,"cha":-2}',
 'Medium', 'Humanoid (Orc)', 30,
 '{"automatic":["Orc"],"bonus":["Common","Goblin","Giant"]}',
 '["Darkvision", "Ferocity", "Weapon Familiarity", "Light Sensitivity"]',
 '{"barbarian"}', 30);

INSERT INTO character_generator.social_statuses (
    name, social_mod, skill_bonuses, traits, events, items, special_instructions,
    money_multiplier, literacy_modifier, literacy_override, literacy_misc, upper_bound
) VALUES

-- Destitute
('Destitute', -3,
    '[
        { "skill": "Dagger", "rank": { "child": 3, "adolescent": 4 } },
        { "skill": "Brawling", "rank": { "child": 3, "adolescent": 4 } },
        { "skill": "Survival", "rank": { "dice": "1d2" } }
    ]'::jsonb,
    '[]'::jsonb,
    '[
        { "culture": "Civilized", "chance": 0.40, "event_table": "Table 534: Underworld Experience" },
        { "culture": "Decadent", "chance": 0.60, "event_table": "Table 534: Underworld Experience" }
    ]'::jsonb,
    '[]'::jsonb,
    NULL,
    0.25, 0.0, 0.05,
    '[]'::jsonb,
    12),

-- Poor
('Poor', -1,
    '[
        { "skill": "Survival", "rank": 1 }
    ]'::jsonb,
    '[]'::jsonb,
    '[
        {
            "chance": 0.50,
            "when": "adolescent",
            "grants": [
                { "skill": "Street Fighting", "rank": 3 }
            ]
        }
    ]'::jsonb,
    '[]'::jsonb,
    NULL,
    0.5, -0.15, 0.0,
    '[]'::jsonb,
    40),

-- Comfortable
('Comfortable', 0,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[
        { "item": "Heirloom Weapon" }
    ]'::jsonb,
    NULL,
    1.0, 0.05, 0.0,
    '[]'::jsonb,
    85),

-- Well-to-Do
('Well-to-Do', 2,
    '[
        { "skill": "Survival", "rank": -1 }
    ]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[
        { "item": "Riding Animal" },
        { "item": "Weapon" },
        { "item": "Weapon" }
    ]'::jsonb,
    NULL,
    1.5, 0.3, 0.0,
    '[]'::jsonb,
    94),

-- Wealthy
('Wealthy', 4,
    '[
        { "skill": "Survival", "rank": { "dice": "-1d2" } }
    ]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[
        { "item": "Finely Furnished Home" },
        { "item": "Riding Animal" },
        { "item": "Fine Clothing" },
        { "item": "Jewelry", "quantity": "1d3", "value_multiplier": 10 },
        { "item": "Dagger" },
        { "item": "Fine Hand Weapon (Cultural)" }
    ]'::jsonb,
    NULL,
    3.0, 0.0, 1.0,
    '[]'::jsonb,
    98),

-- Noble
('Noble', 5,
    '[
        { "skill": "Survival", "rank": -1 }
    ]'::jsonb,
    '[
        {
            "trait": "Exotic Personality Feature",
            "source": "Table 649: Exotic Personality Features",
            "chance": 0.5
        }
    ]'::jsonb,
    '[]'::jsonb,
    '[
        { "item": "Full Set of Non-Magical Weapons" },
        { "item": "Good Quality Armor (type depends on wealth)" }
    ]'::jsonb,
    'Go to Table 758: Nobles to determine the Noble title of the character''s parents and other items of importance to Nobles. Then go to Table 872: Royal Relations to find the Noble parent''s kinship to the ruler of the land. Finally, the character must reroll his Social Status on this table (to find out the family''s wealth and current situation), adding the TiMod from Table 758. Reroll results of 99 to 107.',
    1.0, 0.3, 0.0,
    '[]'::jsonb,
    107),

-- Extremely Wealthy
('Extremely Wealthy', 8,
    '[
        { "skill": "Survival", "rank": { "dice": "-1d2" } }
    ]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb,
    '[
        { "item": "Estate (Barony)" },
        { "item": "Carriage or Private Transport" },
        { "item": "Fine Clothing" },
        { "item": "Arms and Armor (Non-magical)" },
        { "item": "Minor Magical Item" },
        { "item": "Anything Reasonable" }
    ]'::jsonb,
    NULL,
    20.0, 0.0, 1.0,
    '[
        {
            "chance": 0.30,
            "effect": "Can speak 1d4 additional languages"
        }
    ]'::jsonb,
    0);
