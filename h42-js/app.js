var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , firmata = require('firmata');

var board = new firmata.Board('/dev/ttyUSB0', function() {
  board.digitalWrite(13, board.LOW);
});

app.configure(function() {
  app.use('/public', express.static(__dirname + '/public'));
  app.set('view engine', 'jade');
});

app.get('/', function (req, res) {
  res.render('index');
});

io.sockets.on('connection', function (socket) {
  socket.on('slide', function (data) {
    if (data['id'] === 'leftEngine') {
      if (data['value'] > 122) {
        board.digitalWrite(13, board.HIGH);
      } else {
        board.digitalWrite(13, board.LOW);
      }
    }
  });
});

server.listen(8080);
