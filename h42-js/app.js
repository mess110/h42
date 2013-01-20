var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , firmata = require('firmata')
  , config = require('./config');

if (config.h42.enabled) {
  var board = new firmata.Board(config.h42.port, function() {});
}

function digitalHigh(pin) {
  board.digitalWrite(pin, board.HIGH);
}

function digitalLow(pin) {
  board.digitalWrite(pin, board.LOW);
}

function handleEngine(upPin, downPin, val) {
  if (val >= 50) {
    board.digitalWrite(upPin, 0);
    board.digitalWrite(downPin, val);
  } else if (val < -50) {
    board.digitalWrite(upPin, val);
    board.digitalWrite(DownPin, 0);
  } else {
    board.digitalWrite(upPin, 0);
    board.digitalWrite(downPin, 0);
  }
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
    console.log(data);
    if (config.h42.enabled) {
      console.log('sending to h42');
      if (data['id'] === 'leftEngine') {
        handleEngine(9, 6, data['value']);
      } else if (data['id'] === 'rightEngine') {
        handleEngine(3, 5, data['value']);
      }
    }
  });
});

server.listen(config.server.port);
