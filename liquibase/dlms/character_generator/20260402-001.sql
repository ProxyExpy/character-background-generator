INSERT INTO character_generator.family_relations
    (upper_bound, description, lineage_roll, grandparents_die_size, aunts_uncles_die_size, cousins_die_size, check_guardian, check_978, set_social_status_id, skill_bonuses)
VALUES
    (8,  'Mother and Father only (not extended family)',
     'both', NULL, NULL, NULL, FALSE, FALSE, NULL, NULL),

    (12, 'Extended family, including mother and father, 1d4 grandparents and 1d4 aunts/uncles and cousins',
     'both', 4, 4, 4, FALSE, FALSE, NULL, NULL),

    (13, 'Grandparents only',
     'hi_lo', 4, NULL, NULL, FALSE, FALSE, NULL, NULL),

    (14, 'Single Grandparent',
     'hi_lo', NULL, NULL, NULL, FALSE, FALSE, NULL, NULL),

    (15, 'Aunt and Uncle',
     'hi_lo', NULL, NULL, NULL, FALSE, FALSE, NULL, NULL),

    (16, 'Aunt or Uncle',
     'hi_lo', NULL, NULL, NULL, FALSE, FALSE, NULL, NULL),

    (18, 'Mother only',
     'maternal', NULL, NULL, NULL, FALSE, FALSE, NULL, NULL),

    (19, 'Father only',
     'paternal', NULL, NULL, NULL, FALSE, FALSE, NULL, NULL),

    (20, 'Guardian',
     NULL, NULL, NULL, NULL, TRUE, FALSE, NULL, NULL),

    (24, 'None known - Left to fend for self',
     NULL, NULL, NULL, NULL, FALSE, FALSE, 1,
     '[{"skill": "Survival", "rank": {"dice": "1d3"}, "chance": 100}]'),

    (27, 'None known - Raised in an Orphanage. GM rolls siblings secretly.',
     NULL, NULL, NULL, NULL, FALSE, TRUE, 2, NULL);