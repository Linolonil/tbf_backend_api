import { MongoClient } from "mongodb";

const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DBNAME;

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(mongoURL);

  const db = client.db(dbName);
  cachedDb = db;
  return db;
};

const mongoKdaResults = async () => {
  const db = await connectToDatabase();
  const collectionResults = db.collection(process.env.COLLECTIONKDA);

  console.info("Conectando ao banco de dados...");
  console.info("Banco de dados conectado com sucesso!");

  return { collection: collectionResults };
};

const mongoResults = async () => {
  const db = await connectToDatabase();
  const collectionResults = db.collection(process.env.COLLECTIONNAME);

  console.info("Conectando ao banco de dados...");
  console.info("Banco de dados conectado com sucesso!");

  return { collection: collectionResults };
};

export default {
  mongoKdaResults,
  mongoResults
};
