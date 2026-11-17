import { findCharacterById } from '#lib/server/mongo.ts';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
  const { id } = params;

  const character = await findCharacterById(id)
    .then((character) => {
      if (!character) {
        throw json({ success: false, message: 'Character not found' }, { status: 404 });
      }
      return character;
    })
    .catch((error) => {
      console.error('Error retrieving character:', error);
      throw json({ success: false, message: 'Error retrieving character' }, { status: 500 });
    });

  return json({character,});
}