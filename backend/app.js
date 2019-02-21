const express = require('express');
const bodyParser = require('body-parser');
const webRoutes = require('./routes/webRoutes');
const backendVersion = require('./routes/backendVersion');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Header',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,DELETE,OPTIONS, PUT'
  );
  next();
});


app.use(webRoutes);

app.use(backendVersion);

module.exports = app;
