-- liquibase formatted sql

-- changeset you:20261015-001
-- description: add siblings (107), birth order (108) and time of birth (109) tables

drop table if exists character_generator.siblings;
CREATE TABLE character_generator.siblings (
    id                 SERIAL PRIMARY KEY,
    upper_bound        INTEGER NOT NULL,
    description        TEXT NOT NULL,
    sibling_dice       VARCHAR(20),
    illegitimate_dice  VARCHAR(20),
    roll_again         BOOLEAN NOT NULL DEFAULT FALSE
);

drop table if exists character_generator.birth_orders;
CREATE TABLE character_generator.birth_orders (
    id               SERIAL PRIMARY KEY,
    upper_bound      INTEGER NOT NULL,
    description      TEXT NOT NULL,
    money_modifier   FLOAT NOT NULL DEFAULT 0
);

drop table if exists character_generator.birth_time_periods;
CREATE TABLE character_generator.birth_time_periods (
    id         SERIAL PRIMARY KEY,
    calendar   TEXT NOT NULL,
    name       TEXT NOT NULL,
    sort_order INTEGER NOT NULL,
    weight     INTEGER NOT NULL DEFAULT 1,
    UNIQUE (calendar, name)
);
