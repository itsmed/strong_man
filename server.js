'use strict';
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const httpProxy = require('http-proxy');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 8500;

const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
const app = express();
app.use(express.static('public'));
const publicPath = path.resolve(__dirname, 'public');


app.get('/', function(req, res) {
  res.sendFile(`${publicPath}/index.html`);
});

var server = app.listen(port, function() {
  console.log(`app listening on port ${port}`);
});

module.exports = server;