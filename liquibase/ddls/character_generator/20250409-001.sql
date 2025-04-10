CREATE TABLE character_generator.genders
(
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    subjective_pronoun varchar(255) NOT NULL,
    possesive_pronoun  varchar(255) NOT NULL,
    objective_pronoun varchar(255) NOT NULL,
    reflexive_pronoun varchar(255) NOT NULL
);

CREATE TABLE character_generator.cultures
(
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    culture_mod INT,
    skill_bonuses jsonb,
    native_literacy int,
    foreign_literacy jsonb,
    items jsonb,
    environment jsonb,
    hobby jsonb,
    weight INT
);

CREATE TABLE character_generator.social_statuses
(
    id SERIAL PRIMARY KEY,
    name varchar(255) NOT NULL,
    social_mod INT,
    native_literacy INT,
    wealth FLOAT,
    skill_bonuses jsonb,
    experiences jsonb,
    items jsonb,
    traits jsonb,
    relations jsonb,
    weight INT
);

CREATE TABLE character_generator.names
(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_male BOOLEAN default false,
    is_female BOOLEAN default false,
    is_surname BOOLEAN default false
);