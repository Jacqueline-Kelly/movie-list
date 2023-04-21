const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const PORT = 3000 || process.env.PORT;

app.use(express.static('client/dist'));
app.use(cors());

app.get('/api/movies', async(req, res) => {
  try {
    console.log(req.query, 'req.query is')
    let queryArr = req.query["query"].match(/\b(\w+)\b/g);
    let queryString = '';

    queryArr.forEach((word) => {
      queryString += word;
      queryString += "+";
    })

    queryString = queryString.slice(0, - 1)
    console.log(queryString);

    let data
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=e014e19f6fda575b88ede7b232052a98&query=${queryString}`)
    .then(res => res.data.results)
    .then(data => {
      // console.log(data);
      data.map((movie) => {
        movie['watched'] = false;
        return movie
      });
      return data
    })
    .then(dataMapped => res.status(200).send(dataMapped))
  } catch (e) {
    throw new Error(e);
  }
})

app.use('*', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})


  // res.send([
  //   {title: 'Mean Girls',
  //   year: '22',
  //   runtime: '100',
  //   metascore: '45',
  //   imdbRating:'6',
  //   watched: true,
  //   viewDescription: false,
  //   },
  //   {title: 'Hackers',
  //   year: '2442',
  //   Runtime: '100d',
  //   Metascore: 'ad5',
  //   imdbRating:'6dasf',
  //   watched: false,
  //   viewDescription: false,
  //   },
  // ])