import fastify from 'fastify'
import { routes } from './http/routes/index.js'
import { syncRoutes } from './routes/Routes.js' // Corrigir o caminho

const app = fastify()

app.register(routes)
app.register(syncRoutes, { prefix: '/api' }) // ← ADICIONAR prefix aqui

console.log('✅ syncRoutes registrado com prefix /api') 
export { app }