import express from 'express';
import dotenv from 'dotenv';
const helmet = require('helmet');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
dotenv.config();

const PORT = process.env.PORT


const rotaDeKdaGrupo = require("../router/routesGrupo"); 
const rotaDeKdaIndividual = require("../router/routesIndividual"); 
const rotaDadosMongo= require("../router/routesDadosMongo.js"); 

app.use("/grupo", rotaDeKdaGrupo);
app.use("/dados", rotaDadosMongo);
app.use("/individual", rotaDeKdaIndividual);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


