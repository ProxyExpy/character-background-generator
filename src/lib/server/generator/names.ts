import { query } from '#lib/server/database.ts';
import type { Gender } from '#lib/types/types.ts';

export const generateName = async (gender: Gender, surnameFirst: boolean): Promise<string> => {
  const [givenName] = await query<{ name: string }>(
    `SELECT name FROM character_generator.names WHERE is_surname = FALSE AND ${gender.name === 'male' ? 'is_male' : gender.name === 'female' ? 'is_female' : 'is_male AND is_female'} = TRUE ORDER BY RANDOM() LIMIT 1`
  );

  const [surname] = await query<{ name: string }>(
    `SELECT name FROM character_generator.names WHERE is_surname = TRUE ORDER BY RANDOM() LIMIT 1`
  );

  return surnameFirst
    ? `${surname?.name ?? 'No Name'} ${givenName?.name ?? ''}`
    : `${givenName?.name ?? 'No Name'} ${surname?.name ?? ''}`;
};
