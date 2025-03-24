const { connection } = require('../config');
const bcrypt = require('bcryptjs');

class User {
    static create(userData, callback) {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return callback(err);
            
            bcrypt.hash(userData.Clave, salt, (err, hash) => {
                if (err) return callback(err);
                
                userData.Clave = hash;
                
                const query = `
                    INSERT INTO registro (
                        idRol, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,
                        apartamento, Correo, Usuario, Clave, Id_tipoDocumento, numeroDocumento,
                        telefonoUno, telefonoDos, tipo_propietario
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                
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

    
    static findByUsername(username, callback) {
      // SOLUCIÓN: Cambiar la consulta para que funcione con MariaDB
      connection.query(
          'SELECT id_Registro, idRol, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, apartamento, Correo, Usuario, Clave, Id_tipoDocumento, numeroDocumento, telefonoUno, telefonoDos, tipo_propietario FROM registro WHERE Usuario = ? LIMIT 1', 
          [username], 
          (err, results) => {
              if (err) return callback(err);
              // Asegurar que el objeto user tenga id_Registro como id
              if (results[0]) {
                  results[0].id = results[0].id_Registro;
              }
              callback(null, results[0]);
          }
      );
  }
}

module.exports = User;