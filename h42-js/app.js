var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , firmata = require('firmata')
  , config = require('./config');

var board = new firmata.Board(config.h42.port, function() {});

function digitalHigh(pin) {
  board.digitalWrite(pin, board.HIGH);
}

function digitalLow(pin) {
  board.digitalWrite(pin, board.LOW);
}

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
      val = data['value'];
      if (val >= 50) {
        board.digitalWrite(9, 0);
        board.digitalWrite(6, data['value']);
      } else if (val < -50) {
        board.digitalWrite(9, data['value']);
        board.digitalWrite(6, 0);
      } else {
        board.digitalWrite(9, 0);
        board.digitalWrite(6, 0);
      }
    } else if (data['id'] === 'rightEngine') {
      val = data['value'];
      if (val >= 50) {
        board.digitalWrite(3, 0);
        board.digitalWrite(5, data['value']);
      } else if (val < -50) {
        board.digitalWrite(3, data['value']);
        board.digitalWrite(5, 0);
      } else {
        board.digitalWrite(3, 0);
        board.digitalWrite(5, 0);
      }
    }
  });
});

server.listen(config.server.port);
