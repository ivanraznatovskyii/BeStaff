const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const registrationRoutes = require('./routes/registration');
const developersRoutes = require('./routes/developers');
const keys = require('./config/keys');
const app = express();

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());


app.use('/api/developers', developersRoutes);
app.use('/api/registration', registrationRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(client/dist/bestaff));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'bestaff', 'index.html'
      )
    )
  })
}


module.exports = app;
