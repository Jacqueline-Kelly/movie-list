const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000 || process.env.PORT;
const connection = require('./db/index.js')
// const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.static('client/dist'));
app.use(cors());

app.use('/api/movies', require('./routes/movieApi'))

app.use('*', (req, res) => {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})


