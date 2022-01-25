const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const orderRoutes = require('./routes/order');
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');
const developersRoutes = require('./routes/developers');
const keys = require('./config/keys');
const app = express();

//mongoose.connect(keys.mongoURI) устарел
//необходимо использовать новый формат с настройками:
//mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })
.then(() => console.log('MondoDB connected'))
.catch(error => console.log(`error ${error}`));

app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));//make to have access to images directly
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

// app.use('/api/auth', authRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/order', orderRoutes);
// app.use('/api/category', categoryRoutes);
// app.use('/api/position', positionRoutes);

app.use('/api/developers', developersRoutes);


module.exports = app;
