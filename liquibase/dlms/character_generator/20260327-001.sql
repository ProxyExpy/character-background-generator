INSERT INTO character_generator.illegitimate_reasons (reason, know_parent_one_chance, know_parent_two_chance, mature_toggle, upper_bound) VALUES
('{Name}''s parents were unmarried and {subjective_pronoun} was raised by a single parent.', 0.25, 0.90, FALSE, 8),
('{Name}''s birth was a result of coercion or assault.', 0.15, 0.90, TRUE, 9),
('One of {Name}''s parents was a sex worker and unmarried.', 0.10, 0.90, TRUE, 12),
('{Name}''s parents were unmarried.', 0.25, 0.90, FALSE, 16),
('{Name} was the result of an affair, and {subjective_pronoun} was raised in secret.', 0.50, 0.90, FALSE, 23),
('{Name}''s lineage is unknown, and {subjective_pronoun} was raised by a guardian.', 0.00, 0.90, FALSE, 27),
('{Name} is of unknown parentage, and {subjective_pronoun} was raised in an orphanage.', 0.00, 0.00, FALSE, NULL);