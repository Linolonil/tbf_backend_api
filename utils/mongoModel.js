// mongoResults.js
const { connectToDatabase } = require("./mongoConnection");

const mongoResults = async () => {
 const db = await connectToDatabase();
 const collectionResults = db.collection(process.env.COLLECTIONNAME);

 console.info("Conectando ao banco de dados...");
 console.info("Banco de dados conectado com sucesso!");

 return { collection: collectionResults };
};

module.exports = mongoResults;
