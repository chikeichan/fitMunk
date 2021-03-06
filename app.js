var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var routes = require('./server/router.js');
var session = require('express-session');

var app = express();

app.use(favicon(__dirname + '/client/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/progress',express.static(__dirname + '/./client'));
app.use('/achievements',express.static(__dirname + '/./client'));
app.use(express.static(__dirname + '/./client'));

app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/auth/fitbit/callback', routes);

module.exports = app;
console.log('Express listening on: ');
