const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pathUser = '/user'
        this.pathAuth = '/auth'
        this.connectDB();
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }
    middlewares(){
        
        this.app.use(cors());

        // Parsear el cuerpo de la solicitud a json
        this.app.use( express.json());
        // Carpeta pública
        this.app.use( express.static('public',));
        this.app.use( (req, res, next)=>{
            // console.log('MIDDLEWARE')
            next();
        })
    }

    routes(){
        this.app.use(this.pathAuth, require('../routes/auth.route'));
        this.app.use(this.pathUser, require('../routes/user.routes'));
    }

    start(){
        this.app.listen(this.port, ()=>{
            console.log('Server listening on port ', this.port);
        })
    }
}
module.exports = Server;