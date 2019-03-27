const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const backendVersion = require('./routes/backendVersion');
const teamRoutes = require('./routes/teamRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const styleRoutes = require('./routes/styleRoutes');
const distanceRoutes = require('./routes/distanceRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const recordRoutes = require('./routes/recordRoutes');
const typeRoutes = require('./routes/typeRoutes');
const emailRoutes = require('./routes/emailRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const lessonExerciseRoutes = require('./routes/lessonExerciseRoutes');
const testRoutes = require('./routes/testRoutes');

const autoController = require('./controllers/autoController');
// allow override of environment variables
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set header
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PATCH,DELETE,OPTIONS, PUT'
  );
  next();
});
autoController.monthlyReporter();

app.use(authRoutes);

app.use(backendVersion);

app.use(teamRoutes);

app.use(scheduleRoutes);

app.use(styleRoutes);

app.use(distanceRoutes);

app.use(exerciseRoutes);

app.use(recordRoutes);

app.use(typeRoutes);

app.use(emailRoutes);

app.use(lessonRoutes);

app.use(lessonExerciseRoutes);

app.use(testRoutes);


module.exports = app;
