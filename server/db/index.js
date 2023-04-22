const mysql = require('mysql2')


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'movies'
})

connection.connect(function (err) {
  if (err) {
    console.log(err);
    throw new Error (err);
  }
  console.log('Connected')
})

exports.connection = connection;