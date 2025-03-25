const User = require('../models/User');
const Token = require('../models/Token');
const bcrypt = require('bcryptjs');
const { connection } = require('../config');

class AuthController {
    static async register(req, res) {
        try {
            // Validación de contraseñas
            if (req.body.Clave !== req.body.confirmPassword) {
                return res.status(400).json({ error: 'Las contraseñas no coinciden' });
            }

            // Validar que el rol exista
            const roleExists = await new Promise((resolve) => {
                connection.query(
                    'SELECT id, Roldescripcion FROM rol WHERE id = ?',
                    [req.body.idRol],
                    (err, results) => {
                        if (err) return resolve(null);
                        resolve(results[0] || null);
                    }
                );
            });

            if (!roleExists) {
                return res.status(400).json({ error: 'El rol seleccionado no es válido' });
            }

            // Verificar email y usuario existentes
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

            // Crear el usuario con información del rol
            User.create(req.body, async (err, userId) => {
                if (err) {
                    console.error('Error al crear usuario:', err);
                    return res.status(500).json({ error: 'Error al crear usuario' });
                }

                // Generar token con información del rol
                Token.generate(userId, (err, token) => {
                    if (err) {
                        console.error('Error generando token:', err);
                        return res.status(500).json({ error: 'Error al generar token' });
                    }

                    res.status(201).json({
                        success: true,
                        token,
                        userId,
                        rol: {
                            id: roleExists.id,
                            nombre: roleExists.Roldescripcion
                        },
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
    
                // Asegurar la estructura del rol
                const roleInfo = {
                    id: user.idRol,
                    nombre: user.rolNombre || 'Desconocido'
                };
    
                // Buscar token existente
                connection.query(
                    'SELECT token FROM tokens WHERE id_Registro = ? AND fecha_expiracion > NOW() ORDER BY fecha_expiracion DESC LIMIT 1',
                    [user.id_Registro],
                    (err, tokenResults) => {
                        if (err) {
                            console.error('Error buscando token:', err);
                            return res.status(500).json({ error: 'Error en el servidor' });
                        }
    
                        if (tokenResults.length === 0) {
                            return res.status(401).json({ error: 'No hay token válido. Por favor registrese nuevamente.' });
                        }
    
                        const token = tokenResults[0].token;
                        
                        // Preparar respuesta
                        const responseData = {
                            success: true,
                            token,
                            user: {
                                ...user,
                                rol: roleInfo
                            },
                            message: 'Inicio de sesión exitoso'
                        };
    
                        // Eliminar información sensible
                        delete responseData.user.Clave;
                        delete responseData.user.rolNombre;
    
                        res.json(responseData);
                    }
                );
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }

    static async getRoles(req, res) {
        try {
            connection.query(
                'SELECT id, Roldescripcion FROM rol ORDER BY Roldescripcion',
                (err, results) => {
                    if (err) {
                        console.error('Error obteniendo roles:', err);
                        return res.status(500).json({
                            success: false,
                            error: 'Error al obtener roles de la base de datos'
                        });
                    }

                    res.json({
                        success: true,
                        roles: results
                    });
                }
            );
        } catch (error) {
            console.error('Error en getRoles:', error);
            res.status(500).json({
                success: false,
                error: 'Error interno del servidor al obtener roles'
            });
        }
    }
}

module.exports = AuthController;