const { connection } = require('../config');
const bcrypt = require('bcryptjs');

class User {
  static create(userData, callback) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return callback(err);
      
      bcrypt.hash(userData.Clave, salt, (err, hash) => {
        if (err) return callback(err);
        
        userData.Clave = hash;
        
        const query = `INSERT INTO registro (
          idRol, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,
          apartamento, Correo, Usuario, Clave, Id_tipoDocumento, numeroDocumento,
          telefonoUno, telefonoDos, tipo_propietario
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
        const values = [
          userData.idRol,
          userData.PrimerNombre,
          userData.SegundoNombre,
          userData.PrimerApellido,
          userData.SegundoApellido,
          userData.apartamento,
          userData.Correo,
          userData.Usuario,
          userData.Clave,
          userData.Id_tipoDocumento,
          userData.numeroDocumento,
          userData.telefonoUno,
          userData.telefonoDos || null,
          userData.tipo_propietario
        ];
        
        connection.query(query, values, (err, result) => {
          if (err) return callback(err);
          callback(null, result.insertId);
        });
      });
    });
  }

  static findByEmail(email, callback) {
    connection.query(
      'SELECT * FROM registro WHERE Correo = ?', 
      [email], 
      (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
      }
    );
  }

  static findByUsername(username, callback) {
    connection.query(
      'SELECT * FROM registro WHERE Usuario = ?', 
      [username], 
      (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
      }
    );
  }
}

module.exports = User;