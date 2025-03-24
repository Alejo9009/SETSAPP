const User = require('../models/User');
const Token = require('../models/Token');

class AuthController {
  static register(req, res) {
    if (req.body.Clave !== req.body.confirmPassword) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    User.findByEmail(req.body.Correo, (err, existingEmail) => {
      if (err) {
        console.error('Error buscando email:', err);
        return res.status(500).json({ error: 'Error en el servidor' });
      }
      
      if (existingEmail) {
        return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
      }

      User.findByUsername(req.body.Usuario, (err, existingUser) => {
        if (err) {
          console.error('Error buscando usuario:', err);
          return res.status(500).json({ error: 'Error en el servidor' });
        }

        if (existingUser) {
          return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }

        User.create(req.body, (err, userId) => {
          if (err) {
            console.error('Error creando usuario:', err);
            return res.status(500).json({ error: 'Error al crear usuario' });
          }

          console.log('Usuario creado con ID:', userId);
          
          Token.generate(userId, (err, token) => {
            if (err) {
              console.error('Error generando token:', err);
              return res.status(500).json({ error: 'Error al generar token' });
            }

            console.log('Token generado para usuario ID:', userId);
            
            res.status(201).json({ 
              success: true,
              token,
              userId,
              message: 'Registro exitoso'
            });
          });
        });
      });
    });
  }
}

module.exports = AuthController;