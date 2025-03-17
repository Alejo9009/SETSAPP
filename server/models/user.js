const db = require('../config/config');
const User = {
    create: (user, result) => {
        const sql = `INSERT INTO registro (idRol, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido, apartamento , Correo, Id_tipoDocumento, numeroDocumento, tipo_propietario,telefonoUno, telefonoDos, Usuario, Clave) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)`;
        db.query(
            sql,
            [
                user.idRol,
                user.PrimerNombre,
                user.SegundoNombre,
                user.PrimerApellido,
                user.SegundoApellido,
                user.apartamento,
                user.Correo,
                user.Id_tipoDocumento,
                user.numeroDocumento,
                user.tipo_propietario,
                user.telefonoUno,
                user.telefonoDos,
                user.Usuario,
                user.Clave,
                new Date(),
                new Date()
            ],
            (err, res) => {
                if (err) {
                    console.log('error: ', err);
                    result(err, null);
                }
                else {
                    console.log('Id del nuevo Usuario: ', res.insertId);
                    result(null, res.insertId);
                }
            }
        )
    }
};
module.exports = User;