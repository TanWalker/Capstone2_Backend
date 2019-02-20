const express = require('express');
const bodyParser = require('body-parser');
const exampleRoutes = require('./routes/example');
const userRoutes = require('./routes/userRoutes');
const backendVersion = require('./routes/backendVersion');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin,X-Requested-With,Content-Type,Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,DELETE,OPTIONS, PUT'
  );
  next();
});

// use this url to call routes/example.js
app.use('/api/posts', exampleRoutes);

app.use(userRoutes);

app.use(backendVersion);

module.exports = app;
