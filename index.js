const express = require('express');
const path = require('path');
require('dotenv').config();

//db config

const { deConnection, dbConnection } = require('./database/config');
dbConnection();

// App de Express
const app = express();


//for reding and parsing json
app.use(express.json());


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//Routes Definition
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/user'));
app.use('/api/messages', require('./routes/messages'));



server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


