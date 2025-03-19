const db = require('../config/config');

class User {
    static async create(user) {
        const sql = `
            INSERT INTO registro (
                idRol, PrimerNombre, SegundoNombre, PrimerApellido, SegundoApellido,
                apartamento, Correo, Id_tipoDocumento, numeroDocumento, tipo_propietario,
                telefonoUno, telefonoDos, Usuario, Clave
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
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
            user.Clave
        ];

        console.log('SQL:', sql); // Depuración
        console.log('Valores:', values); // Depuración

        try {
            const [result] = await db.query(sql, values);
            console.log('Id del nuevo Usuario: ', result.insertId);
            return result.insertId; // Retorna el ID del usuario creado
        } catch (err) {
            console.error('Error al crear el usuario: ', err);
            throw new Error('Error al crear el usuario en la base de datos');
        }
    }
}

module.exports = User;