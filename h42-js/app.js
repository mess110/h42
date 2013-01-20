var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , realtime = require('./realtime')
  , io = require('socket.io').listen(server)
  , config = require('./config')
  , h42 = require('./h42');

h42.init();

app.configure(function() {
  app.use('/public', express.static(__dirname + '/public'));
  app.set('view engine', 'jade');
});

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/ping', function(req, res) {
  res.end('pong');
});

realtime.init(io, h42);

server.listen(config.server.port);
