// syncController.js
const syncService = require('../services/syncService');

class SyncController {
  // Sincronizar marcas
  async syncMarcas(req, res) {
    try {
      const result = await syncService.syncMarcas();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Sincronizar produtos
  async syncProdutos(req, res) {
    try {
      const result = await syncService.syncProdutos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Sincronizar pedidos
  async syncPedidos(req, res) {
    try {
      const result = await syncService.syncPedidos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Sincronizar tudo
  async syncAll(req, res) {
    try {
      const result = await syncService.syncAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new SyncController();