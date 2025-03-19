const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 3000;

// Importar rutas
const users = require('./routes/userRoutes');

// Configuración del servidor
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.disable('x-powered-by');

// Rutas
users(app); // Aquí se configuran las rutas de usuarios

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Ruta raiz del Backend');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

// Iniciar servidor
server.listen(port, '192.168.1.105' || 'localhost', () => {
    console.log('Aplicación de NodeJS ' + process.pid + ' inicio en el puerto ' + port);
});