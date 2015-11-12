var express     = require('express');
var mongoose    = require('mongoose');
var http = require('http').Server(app);

var app = express();
var port = process.env.PORT || 3333;
console.log(port);

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/drone';

console.log(mongoURI);

mongoose.connect(mongoURI); // connect to mongo database named drone

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
http.listen(process.env.PORT || 3333, function(){
  console.log('listening on', http.address().port);
});


console.log("Listening on port: ", port);

module.exports = app;
