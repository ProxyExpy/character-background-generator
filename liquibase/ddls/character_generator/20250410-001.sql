-- liquibase formatted sql

-- changeset you:20250410-001
-- description: add traits table

CREATE TABLE character_generator.traits (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  description TEXT,
  weight INT NOT NULL default 1
);

CREATE TABLE character_generator.trait_exclusions (
  trait_id INT NOT NULL,
  excludes_trait_id INT NOT NULL,
  PRIMARY KEY (trait_id, excludes_trait_id),
  FOREIGN KEY (trait_id) REFERENCES traits(id),
  FOREIGN KEY (excludes_trait_id) REFERENCES traits(id)
);