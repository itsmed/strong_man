'use strict';
const express = require('express');
const path = require('path');
const publicPath = path.resolve(__dirname, 'public');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const mongoose = require('mongoose');


const app = express();

// app.use(cookieParser);
// app.use(session({secret: 'jflsajven5930u0t2jfnu-85885',
//   saveUninitialized: true,
//   resave: true}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());



const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 8500;
const config = require('./server/config');

// const proxy = httpProxy.createProxyServer({
//   changeOrigin: true
// });

app.use(express.static(publicPath));
// allows bower components to be used in dev
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

mongoose.connect(config.url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongodb!');
});


require('./server/routes')(app, publicPath);


if (!isProduction) {
  
  var server = app.listen(port, function() {
    console.log(`app listening on port ${port}`, isProduction);
  });

  module.exports = {
    server: server,
    db: db // TODO: Remove db, double check that it's not needed
  };

} else {
  app.listen(port, function() {
    console.log(`app listening on port ${port}`);
  });
  // module.exports = app;
}

