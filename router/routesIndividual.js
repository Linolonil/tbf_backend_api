const express = require("express");
const router = express.Router();

import buscarItens from '../middlewares/individual/dadosMongo'
import puuidIndividual from '../middlewares/individual/puuidIndividual'
import buscarPartida from '../middlewares/individual/matchIndividual.js'
import kdaindividual from '../middlewares/individual/kdaindividual.js'
import individualController from '../controllers/individualController'

router.get("/detalhes-partidas/buscar", buscarItens, puuidIndividual, buscarPartida, kdaindividual, individualController.getPartidas)

router.post("/detalhes-partidas/criar", individualController.postPartidas)

module.exports = router;