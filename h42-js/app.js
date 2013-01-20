var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
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

io.sockets.on('connection', function (socket) {
  socket.on('slide', function (data) {
    if (data['id'] === 'leftEngine') {
      h42.engine(9, 6, data['value']);
      h42.digital(13, 1);
    } else if (data['id'] === 'rightEngine') {
      h42.engine(3, 5, data['value']);
      h42.digital(13, 0);
    }
  });
});

server.listen(config.server.port);
