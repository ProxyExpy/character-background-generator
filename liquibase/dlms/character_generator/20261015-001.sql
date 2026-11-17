-- liquibase formatted sql

-- changeset you:20261015-001-dlm
-- description: seed siblings (107), birth order (108) and time of birth (109)

-- Table 107: Siblings (d20, no modifier)
INSERT INTO character_generator.siblings
    (upper_bound, description, sibling_dice, illegitimate_dice, roll_again)
VALUES
    (2,  'None - only child',          NULL,    NULL,  FALSE),
    (9,  '1d3 siblings',               '1d3',   NULL,  FALSE),
    (15, '1d3+1 siblings',             '1d3+1', NULL,  FALSE),
    (17, '1d4+2 siblings',             '1d4+2', NULL,  FALSE),
    (19, '2d4 siblings',               '2d4',   NULL,  FALSE),
    (20, '+1d3 illegitimate siblings', NULL,    '1d3', TRUE);

-- Table 108: Birth Order (d20, only rolled when the character has siblings)
INSERT INTO character_generator.birth_orders
    (upper_bound, description, money_modifier)
VALUES
    (2,  'First born',                  0.20),
    (10, 'Second born',                 0.10),
    (16, 'A "middle" child',            0.00),
    (18, 'Second-to-the-last born',    -0.10),
    (20, 'Last born',                  -0.20);

-- Table 109: Time of Birth. The book says to build a table that fits the
-- campaign calendar; weights are proportional to period length.
INSERT INTO character_generator.birth_time_periods
    (calendar, name, sort_order, weight)
VALUES
    ('Gregorian', 'January',   1,  31),
    ('Gregorian', 'February',  2,  28),
    ('Gregorian', 'March',     3,  31),
    ('Gregorian', 'April',     4,  30),
    ('Gregorian', 'May',       5,  31),
    ('Gregorian', 'June',      6,  30),
    ('Gregorian', 'July',      7,  31),
    ('Gregorian', 'August',    8,  31),
    ('Gregorian', 'September', 9,  30),
    ('Gregorian', 'October',   10, 31),
    ('Gregorian', 'November',  11, 30),
    ('Gregorian', 'December',  12, 31);
