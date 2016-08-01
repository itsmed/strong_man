'use strict';
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const express = require('express');
const httpProxy = require('http-proxy');

const isProduction = process.env.NODE_ENV === 'production';


const proxy = httpProxy.createProxyServer({
  changeOrigin: true
});
const app = express();

app.set('port', (process.env.PORT || 8500));
app.use(express.static('public'));
const publicPath = path.resolve(__dirname, 'public');


app.get('/', function(req, res) {
  res.sendFile(`${publicPath}/index.html`);
});

var server = app.listen(app.get('port'), function() {
  console.log(`app listening on port ${app.get('port')}`);
});

module.exports = server;