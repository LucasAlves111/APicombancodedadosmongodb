
const syncService = require('../services/syncService');

class SyncController {

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