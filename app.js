const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { MONGODB } = require('./config');
const userRoutes = require('./routes/user');

app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// for testing purposes:
// app.get('/', (req, res, next) => res.end('welcome!!!!'));

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to mongodb');
    return app.listen(3300);
  })
  .then(() => console.log('server running at 3300'))
  .catch((err) => console.log(err.message));
