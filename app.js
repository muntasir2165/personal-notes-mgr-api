const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { MONGODB } = require('./config');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');
const auth = require('./middleware/auth');

// Enable CORS
app.use(cors());

// Body parser to parse request body as JSON
app.use(bodyParser.json());

// NOTE: the order in which routes appear/are listed in a node.js app
// is important!

// for testing protected routes
// GET, POST, PUT, DELETE etc. - any kind of HTTP request is ok here
// app.use('/api/protected', auth, (req, res) => {
//   res.end(`Hi ${req.user.firstName}, you are authenticated!`);
// });

// requests coming to /api/notes will hit the auth
// middleware first and then the corresponding route
// handler in noteRoutes router
// this implies that all endpoints starting with
// /api/notes are protected and hence, only logged
// in users can access and manipulate notes data
app.use('/api/notes', auth, noteRoutes);
app.use('/api/users', userRoutes);

// the following handles undefined routes in our app
// this should COME AFTER/PLACED BELOW all the defined routes
// BUT COME BEFORE/PLACED ABOVE the error handler
app.use((req, res, next) => {
  const error = new Error('not found');
  error.status = 404;
  next(error);
});

// please note the 'err' object as the first parameter
// this is invoked when we call 'next(err)' from anywhere
// in our app
app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message } });
});

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
