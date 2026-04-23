import { MongoClient, ServerApiVersion, ObjectId  } from 'mongodb';
const uri = process.env.MONGO_URL || '';
const databaseName = process.env.MONGO_DB_NAME || '';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function insertCharacter(characterData: any) {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const characters = database.collection('characters');
    const result = await characters.insertOne(characterData);
    console.log(`New character created with the following id: ${result.insertedId}`);
  } catch (error) {
    console.error('Error inserting character:', error);
    throw error;
  } finally {
    await client.close();
  }
}

async function findCharacterById(id: string) {
  try {
    await client.connect();
    const database = client.db(databaseName);
    const characters = database.collection('characters');
    const character = await characters.findOne({ _id: new ObjectId(id) });
    return character;
  } catch (error) {
    console.error('Error finding character:', error);
    throw error;
  } finally {
    await client.close();
  }
}

export { insertCharacter, findCharacterById };