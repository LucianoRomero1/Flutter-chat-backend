
const {io} = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { userOn, userOff, saveMessage, } = require('../controllers/socket');

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
    
    if(!valid){
        return client.disconnect();
    }

    userOn(uid);


    client.join( uid );

    // Escuchar del cliente el mensaje-personal
    client.on('personal-message', async( payload ) => {
        await saveMessage( payload );
        io.to( payload.to ).emit('personal-message', payload );
    })

    console.log('Cliente autenticado');

    client.on('disconnect', () => {
        userOff(uid);
    });

    //tiene que coincidir este nombre con el del html
    //el payload te trae los argumentos
    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);

    //     io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    // });

});