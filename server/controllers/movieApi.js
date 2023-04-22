const axios = require('axios');

const searchMovies = async(req, res, callback) => {
  try {

    let queryArr = req.query["query"].match(/\b(\w+)\b/g);
    let queryString = '';

    queryArr.forEach((word) => {
      queryString += word;
      queryString += "+";
    })

    queryString = queryString.slice(0, - 1)

    let data
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e014e19f6fda575b88ede7b232052a98&query=${queryString}`)
    .then(res => res.data.results)
    .then(data => {
      data.map((movie) => {
        movie['watched'] = false;
        return movie
      });
      return data
    })
    .then(data => {
      res.locals = data.slice(0, 3);
      callback();
      res.status(200).send(data.slice(0, 3));
    })

  } catch (e) {
    throw new Error(e);
  }
}

const toggleWatch = async(req, res, callback) => {
  try {
    callback(null, req.body.id)
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

module.exports = {
  searchMovies,
  toggleWatch
}