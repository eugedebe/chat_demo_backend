const { userConnected, userDisconnected, saveMessage } = require('../controllers/sockets');
const { checkJwt } = require('../helpers/jwt');
const { io } = require('../index');



// Mensajes de Sockets
io.on('connection', (client) => {
    const [tokenValid, uid] = checkJwt(client.handshake.headers['x-token']);
    if (!tokenValid) {
        return client.disconnect();
    }
    console.log('Cliente conectado');
    userConnected(uid);

    //asign to the user to a room.\

    client.join(uid);
    client.on('personal-message', async (payload) => {
        console.log(payload);
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload)

    })




    client.on('disconnect', () => {
        console.log('Cliente desconectado');
        userDisconnected(uid);

    });
    client.on('mensaje', (payload) => {
        console.log('Mensaje', payload);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
});
