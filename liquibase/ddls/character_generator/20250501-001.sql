-- liquibase formatted sql

-- changeset you:20250501-001
-- description: add species and social status

drop table if exists character_generator.races;
CREATE TABLE character_generator.races (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    source TEXT,
    ability_modifiers JSONB,
    size TEXT,
    type TEXT,
    base_speed INTEGER,
    languages JSONB,
    racial_traits JSONB,
    favored_classes TEXT[],
    weight INTEGER DEFAULT 0
);

drop table if exists character_generator.social_statuses;
CREATE TABLE character_generator.social_statuses (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    social_mod INT,
    skill_bonuses jsonb,
    traits jsonb,
    events jsonb,
    items jsonb,
    special_instructions text,
    money_multiplier FLOAT,
    literacy_modifier FLOAT,
    literacy_override FLOAT,
    literacy_misc jsonb,
    upper_bound INT NOT NULL default 1
);
