drop table if exists character_generator.family_relations;
CREATE TABLE character_generator.family_relations (
    id                    SERIAL PRIMARY KEY,
    upper_bound           INTEGER NOT NULL,
    description           TEXT NOT NULL,
    lineage_roll          VARCHAR(10) CHECK (lineage_roll IN ('both', 'maternal', 'paternal', 'hi_lo')),
    grandparents_die_size INTEGER,
    aunts_uncles_die_size INTEGER,
    cousins_die_size      INTEGER,
    check_guardian        BOOLEAN NOT NULL DEFAULT FALSE,
    check_978             BOOLEAN NOT NULL DEFAULT FALSE,
    set_social_status_id  INTEGER REFERENCES character_generator.social_statuses(id),
    skill_bonuses         JSONB
);