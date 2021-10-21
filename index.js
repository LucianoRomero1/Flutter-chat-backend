const express = require('express');
const path = require('path');
require('dotenv').config(); //Va a leer el .env para leer las variables de entorno


//App de Express
const app = express();

//Db config
require('./database/config').dbConnection();

//Lectura y parseo del Body
app.use(express.json());

//Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');


//Path publico, dirname es para apuntar a donde este montado mi servidor
const publicPath = path.resolve( __dirname, 'public');
app.use(express.static(publicPath));

//Routes
app.use('/api/login', require('./routes/auth'));


//process.env.port para llamar al puerto del ENV
server.listen( process.env.PORT, (err) => {
    if(err){
        throw new Error(err);
    }

    console.log(`Servidor corriendo en puerto`, process.env.PORT);
})