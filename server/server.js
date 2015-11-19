var express     = require('express');
var app = express();
var mongoose    = require('mongoose');
var uriUtil = require('mongodb-uri');
var http = require('http').Server(app);

var port = process.env.PORT || 3333;

var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 20000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 20000 } } };

var mongodbUri = 'mongodb://heroku_rn1gdrjn:bi0llphoapelf34116pqrqsvpd@ds053764.mongolab.com:53764/heroku_rn1gdrjn';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

http.listen(process.env.PORT || 3333, function(){
  console.log('listening on', http.address().port);
});

module.exports = app;
