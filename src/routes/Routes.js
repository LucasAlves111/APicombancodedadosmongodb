// syncRoutes.js
const express = require('express');
const router = express.Router();
const syncController = require('../controllers/syncController');

// Rota para sincronizar marcas
router.post('/sync/marcas', syncController.syncMarcas);

// Rota para sincronizar produtos
router.post('/sync/produtos', syncController.syncProdutos);

// Rota para sincronizar pedidos
router.post('/sync/pedidos', syncController.syncPedidos);

// Rota para sincronizar tudo de uma vez
router.post('/sync/all', syncController.syncAll);

module.exports = router;