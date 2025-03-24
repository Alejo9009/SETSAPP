const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const { connection } = require('../config');

class AuthController {
    static async register(req, res) {
        try {
            if (req.body.Clave !== req.body.confirmPassword) {
                return res.status(400).json({ error: 'Las contraseñas no coinciden' });
            }

            const [existingEmail, existingUser] = await Promise.all([
                new Promise((resolve) => User.findByEmail(req.body.Correo, (err, user) => resolve(user))),
                new Promise((resolve) => User.findByUsername(req.body.Usuario, (err, user) => resolve(user)))
            ]);

            if (existingEmail) {
                return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
            }

            if (existingUser) {
                return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
            }

            User.create(req.body, async (err, userId) => {
                if (err) {
                    console.error('Error al crear usuario:', err);
                    return res.status(500).json({ error: 'Error al crear usuario' });
                }

                Token.generate(userId, (err, token) => {
                    if (err) {
                        console.error('Error generando token:', err);
                        return res.status(500).json({ error: 'Error al generar token' });
                    }

                    res.status(201).json({
                        success: true,
                        token,
                        userId,
                        message: 'Registro exitoso'
                    });
                });
            });
        } catch (error) {
            console.error('Error en registro:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async login(req, res) {
        try {
            const { Usuario, Clave } = req.body;

            if (!Usuario || !Clave) {
                return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
            }

            User.findByUsername(Usuario, async (err, user) => {
                if (err) {
                    console.error('Error buscando usuario:', err);
                    return res.status(500).json({ error: 'Error en el servidor' });
                }

                if (!user) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }

                const isMatch = await bcrypt.compare(Clave, user.Clave);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Credenciales inválidas' });
                }

                // Buscar ÚNICAMENTE el token existente
                connection.query(
                    'SELECT token FROM tokens WHERE id_Registro = ? AND fecha_expiracion > NOW() ORDER BY fecha_expiracion ',
                    [user.id_Registro], // Usar id_Registro en lugar de id
                    (err, results) => {
                        if (err) {
                            console.error('Error buscando token:', err);
                            return res.status(500).json({ error: 'Error en el servidor' });
                        }

                        if (results.length === 0) {
                            return res.status(401).json({ error: 'No hay token válido. Por favor registrese nuevamente.' });
                        }

                        // Usar el token existente
                        const token = results[0].token;
                        
                        // Eliminar información sensible
                        const userData = { ...user };
                        delete userData.Clave;
                        delete userData.confirmPassword;

                        res.json({
                            success: true,
                            token,
                            user: userData,
                            message: 'Inicio de sesión exitoso'
                        });
                    }
                );
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}

module.exports = AuthController;