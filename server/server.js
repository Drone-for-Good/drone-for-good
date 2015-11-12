var express     = require('express');
var mongoose    = require('mongoose');
var http = require('http').Server(app);

var app = express();
var port = process.env.PORT || 3333;

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/drone';

mongoose.connect(mongoURI); // connect to mongo database named drone

// configure our server with all the middleware and routing
require('./config/middleware.js')(app, express);

http.listen(process.env.PORT || 3333, function(){
  console.log('listening on', http.address().port);
});

module.exports = app;
