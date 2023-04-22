const express = require('express')
const router = express.Router()
const movieApi = require('../controllers/movieApi')
const sql = require('../controllers/sql')

router.post('/', movieApi.searchMovies, sql.addMovie);
router.get('/', sql.getMovies);
router.put('/', movieApi.toggleWatch, sql.toggleWatch);

module.exports = router;