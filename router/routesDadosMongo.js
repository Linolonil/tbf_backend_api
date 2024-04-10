const express = require("express");
const router = express.Router();

import buscaInfoController from '../controllers/buscarInfoController.js';

router.get("/buscarInfo", buscaInfoController.buscarInfoCriminosos)
router.get("/buscarInfoKda", buscaInfoController.buscarInfoKda)

module.exports = router;