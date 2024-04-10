const { MongoClient } = require("mongodb");

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

module.exports = {
 connectToDatabase,
};
