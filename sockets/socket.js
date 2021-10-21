const {io} = require('../index');

//Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    //tiene que coincidir este nombre con el del html
    //el payload te trae los argumentos
    // client.on('mensaje', (payload) => {
    //     console.log('Mensaje', payload);

    //     io.emit('mensaje', {admin: 'Nuevo Mensaje'});
    // });

});