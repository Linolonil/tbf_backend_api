import express from 'express'
const router = express.Router();

import buscaInfoController from '../controllers/buscarInfoController.js';

router.get("/buscarInfo", buscaInfoController.buscarInfoCriminosos)
router.get("/buscarInfoKda", buscaInfoController.buscarInfoKda)

export default router;