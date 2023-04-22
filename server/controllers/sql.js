// write data to sql database
const mysql = require('mysql2');
const db = require('../db/index.js');

const addMovie = async(req, res) => {
  try{
    let queryString;
    let params;

    for (let i = 0; i < res.locals.length; i++) {
      queryString = 'INSERT INTO searchedMovies(id, title, releaseDate, overview, rating) VALUES(?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=' + db.connection.escape(res.locals[i]['id']) + ';';
      params = [res.locals[i]['id'], res.locals[i]['title'], res.locals[i]['release_date'], res.locals[i]['overview'], res.locals[i]['vote_average']];
      db.connection.query(queryString, params);
      res.status(200);
    }
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

const getMovies = async(req, res) => {
  try {
    let queryString = 'SELECT * FROM searchedMovies'
    let data = db.connection.query(queryString, function (err, results) {
      res.status(200).send(results);
    });

  } catch(e) {
    console.log(e);
    throw new Error(e);
  }
}

const toggleWatch = async(req, res) => {
  try {
    console.log(req.body.id, 'in toggle')
    let queryString = 'UPDATE searchedMovies SET watched = !watched WHERE id =' + db.connection.escape(parseInt(req.body.id));
    db.connection.query(queryString, function(err, results) {
      res.status(200).send('success')
    })
  } catch(e) {
    console.log(e);
    throw new Error(e);
  }
}

module.exports = {
  addMovie,
  getMovies,
  toggleWatch
}