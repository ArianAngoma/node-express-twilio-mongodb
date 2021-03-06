const path = require('path');
const express = require("express");
const exphbs = require('express-handlebars');
const morgan = require("morgan");
const cors = require("cors");
const {createServer} = require('http');

const {dbConnection} = require("../database/config");
const {socketController} = require("../sockets/controller");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = createServer(this.app);
        this.io = require('socket.io')(this.server);
        global.io = this.io;

        this.path = {
            main: ''
        }

        // Conección a la base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();

        // Sockets
        this.sockets();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Morgan
        this.app.use(morgan('dev'));

        // Habilitar body-parser para leer datos del formulario
        this.app.use(express.urlencoded({extended: true}));

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // Añadir carpetas de vistas
        this.app.set('views', path.join(__dirname, '../views'));

        // Habilitar vista
        this.app.engine('hbs', exphbs({
            layoutsDir: path.join(this.app.get('views'), 'layouts'),
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            extname: '.hbs',

            // Helper para ocultar número destino
            helpers: require('../helpers/hide-number')
        }))

        this.app.set('view engine', 'hbs');
    }

    routes() {
        this.app.use(this.path.main, require('../routes/main'));
    }

    sockets() {
        // Servidor iniciado con Sockets
        this.io.on("connection", (socket) => socketController(socket, this.io));
    }

    listen() {
        /*this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        });*/

        // socket
        this.server.listen(this.port, () => {
            console.log(`Servidor socket corriendo en http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;
