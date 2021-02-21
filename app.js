const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { MONGODB } = require('./config');

app.get('/', (req, res, next) => res.end('welcome!!!!'));

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb');
    return app.listen(3300);
  })
  .then(() => console.log('server running at 3300'))
  .catch((err) => console.log(err.message));
