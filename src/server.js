var express = require("express");
var expressValidator = require('express-validator');
var bodyParser= require('body-parser');

var routes = require('./routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator());
app.use("/", routes);

module.exports = app;