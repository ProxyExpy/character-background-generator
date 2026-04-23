drop table if exists character_generator.illegitimate_reasons;
CREATE TABLE character_generator.illegitimate_reasons (
    id SERIAL PRIMARY KEY,
    reason TEXT UNIQUE NOT NULL,
    know_parent_one_chance FLOAT NOT NULL,
    know_parent_two_chance FLOAT NOT NULL,
    mature_toggle BOOLEAN,
    upper_bound INT
);