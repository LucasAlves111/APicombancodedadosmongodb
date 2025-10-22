import 'dotenv/config'
import { app } from "./app.js"
import cors from '@fastify/cors'
import { conexaoMongo } from './services/mongodb/conexao.js'
import { syncRoutes } from './routes/Routes.js' 

async function server() {
    await conexaoMongo() 
    
    await app.register(cors, {
        origin: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })

    await app.ready()
    
    app.listen({
        host: '0.0.0.0',
        port: process.env.PORT
    }).then(() => {
        console.log('HTTP Server is running on PORT:' + process.env.PORT)
       
    })
}

    // const query = await database('marcas').select();
    // console.log('Query :', query)
    // database.raw('SELECT * FROM marcas WHERE id = 1;')
    //     .then(result => console.log(result[0]))


server();