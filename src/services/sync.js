// syncService.js - Versão para Knex
import Marca from '../models/Marca.js'; // ajuste o caminho
import Produto from '../models/Produto.js'; // ajuste o caminho
import Pedido from '../models/Pedido.js'; // ajuste o caminho
import { database } from '../database/index.js';

class SyncService {
  // Sincronizar Marcas
  async syncMarcas() {
    try {
      // Buscar todas as marcas do MongoDB
      const marcas = await Marca.find();
      
      const results = [];
      
      for (const marca of marcas) {
        // Usando Knex para insert com conflito
        await database('marcas')
          .insert({
            id: marca._id.toString(),
            nome: marca.nome,
            descricao: marca.descricao || null,
            created_at: marca.createdAt || new Date(),
            updated_at: marca.updatedAt || new Date()
          })
          .onConflict('id') // Se o ID já existe
          .merge(['nome', 'descricao', 'updated_at']); // Atualiza esses campos
        
        results.push(marca._id);
      }
      
      return {
        success: true,
        count: results.length,
        message: `${results.length} marcas sincronizadas com sucesso`
      };
    } catch (error) {
      throw new Error(`Erro ao sincronizar marcas: ${error.message}`);
    }
  }

  // Sincronizar Produtos
  async syncProdutos() {
    try {
      const produtos = await Produto.find();
      
      const results = [];
      
      for (const produto of produtos) {
        await database('produtos')
          .insert({
            id: produto._id.toString(),
            nome: produto.nome,
            descricao: produto.descricao || null,
            preco: produto.preco,
            marca_id: produto.marcaId ? produto.marcaId.toString() : null,
            created_at: produto.createdAt || new Date(),
            updated_at: produto.updatedAt || new Date()
          })
          .onConflict('id')
          .merge(['nome', 'descricao', 'preco', 'marca_id', 'updated_at']);
        
        results.push(produto._id);
      }
      
      return {
        success: true,
        count: results.length,
        message: `${results.length} produtos sincronizados com sucesso`
      };
    } catch (error) {
      throw new Error(`Erro ao sincronizar produtos: ${error.message}`);
    }
  }

  // Sincronizar Pedidos
  async syncPedidos() {
    try {
      const pedidos = await Pedido.find();
      
      const results = [];
      
      for (const pedido of pedidos) {
        await database('pedidos')
          .insert({
            id: pedido._id.toString(),
            cliente: pedido.cliente,
            total: pedido.total,
            status: pedido.status || 'pendente',
            created_at: pedido.createdAt || new Date(),
            updated_at: pedido.updatedAt || new Date()
          })
          .onConflict('id')
          .merge(['cliente', 'total', 'status', 'updated_at']);
        
        results.push(pedido._id);
      }
      
      return {
        success: true,
        count: results.length,
        message: `${results.length} pedidos sincronizados com sucesso`
      };
    } catch (error) {
      throw new Error(`Erro ao sincronizar pedidos: ${error.message}`);
    }
  }

  // Sincronizar tudo de uma vez
  async syncAll() {
    try {
      const marcasResult = await this.syncMarcas();
      const produtosResult = await this.syncProdutos();
      const pedidosResult = await this.syncPedidos();
      
      return {
        success: true,
        results: {
          marcas: marcasResult,
          produtos: produtosResult,
          pedidos: pedidosResult
        },
        message: 'Sincronização completa realizada com sucesso'
      };
    } catch (error) {
      throw new Error(`Erro na sincronização completa: ${error.message}`);
    }
  }
}

export default new SyncService();