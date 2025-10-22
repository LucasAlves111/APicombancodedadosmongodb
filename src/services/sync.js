// syncService.js
const Marca = require('../models/Marca'); // modelo MongoDB
const Produto = require('../models/Produto'); // modelo MongoDB
const Pedido = require('../models/Pedido'); // modelo MongoDB
const mysql = require('../config/mysql'); // sua conexão MySQL

class SyncService {
  // Sincronizar Marcas
  async syncMarcas() {
    try {
      // Buscar todas as marcas do MongoDB
      const marcas = await Marca.find();
      
      const results = [];
      
      for (const marca of marcas) {
        const query = `
          INSERT INTO marcas (id, nome, descricao, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            nome = VALUES(nome),
            descricao = VALUES(descricao),
            updated_at = VALUES(updated_at)
        `;
        
        const values = [
          marca._id.toString(),
          marca.nome,
          marca.descricao || null,
          marca.createdAt || new Date(),
          marca.updatedAt || new Date()
        ];
        
        await mysql.query(query, values);
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
        const query = `
          INSERT INTO produtos (id, nome, descricao, preco, marca_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            nome = VALUES(nome),
            descricao = VALUES(descricao),
            preco = VALUES(preco),
            marca_id = VALUES(marca_id),
            updated_at = VALUES(updated_at)
        `;
        
        const values = [
          produto._id.toString(),
          produto.nome,
          produto.descricao || null,
          produto.preco,
          produto.marcaId ? produto.marcaId.toString() : null,
          produto.createdAt || new Date(),
          produto.updatedAt || new Date()
        ];
        
        await mysql.query(query, values);
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
        const query = `
          INSERT INTO pedidos (id, cliente, total, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            cliente = VALUES(cliente),
            total = VALUES(total),
            status = VALUES(status),
            updated_at = VALUES(updated_at)
        `;
        
        const values = [
          pedido._id.toString(),
          pedido.cliente,
          pedido.total,
          pedido.status || 'pendente',
          pedido.createdAt || new Date(),
          pedido.updatedAt || new Date()
        ];
        
        await mysql.query(query, values);
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

module.exports = new SyncService();