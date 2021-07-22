const {Socket} = require("socket.io");

// Usuario conectado
const socketController = (socket = new Socket(), io) => {
    console.log('Conectado', socket.id)

    // Limpiar cuando alguien se desconecta
    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id);
    });
}

module.exports = {
    socketController
}
