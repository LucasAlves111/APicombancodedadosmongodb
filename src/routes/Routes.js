import syncService from '../services/sync.js';

console.log('✅ syncService importado:', syncService);

export async function syncRoutes(app, options) {
  // Sincronizar marcas
  app.post('/sync/marcas', async (request, reply) => {
    try {
      const result = await syncService.syncMarcas();
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        message: error.message
      });
    }
  });

  // Sincronizar produtos
  app.post('/sync/produtos', async (request, reply) => {
    try {
      const result = await syncService.syncProdutos();
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        message: error.message
      });
    }
  });

  // Sincronizar pedidos
  app.post('/sync/pedidos', async (request, reply) => {
    try {
      const result = await syncService.syncPedidos();
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        message: error.message
      });
    }
  });

  // Sincronizar tudo
  app.post('/sync/all', async (request, reply) => {
    try {
      const result = await syncService.syncAll();
      return reply.status(200).send(result);
    } catch (error) {
      return reply.status(500).send({
        success: false,
        message: error.message
      });
    }
  });
}