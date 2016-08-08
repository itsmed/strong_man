'use strict';
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');



const app = express();

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 8500;
const publicPath = path.resolve(__dirname, 'public');

// const proxy = httpProxy.createProxyServer({
//   changeOrigin: true
// });

app.use(express.static(publicPath));
// allows bower components to be used in dev
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

require('./server/routes')(app);

if (!isProduction) {
  
  var server = app.listen(port, function() {
    console.log(`app listening on port ${port}`);
  });

  module.exports = server;
} else {
  app.listen(port, function() {
    console.log(`app listening on port ${port}`);
  });
  // module.exports = app;
}

