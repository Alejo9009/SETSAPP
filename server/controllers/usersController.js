const User = require('../models/user');

module.exports = {
    register(req, res) {
        const user = req.body; // Datos del cliente

        console.log('Datos recibidos:', user); // Depuración

        User.create(user)
            .then((userId) => {
                return res.status(201).json({
                    success: true,
                    message: 'Usuario creado exitosamente',
                    data: userId // Id del usuario creado
                });
            })
            .catch((err) => {
                console.error('Error en el controlador:', err); // Depuración
                return res.status(501).json({
                    success: false,
                    message: 'Error al crear el usuario',
                    error: err.message
                });
            });
    }
};