const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'sets'
});

db.connect((err) => {
  if (err) {
    console.error('Error en la conexión a la base de datos:', err.message);
    return;
  }
  console.log('✅ Conexión exitosa a la base de datos');
});

module.exports = db;
