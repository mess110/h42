var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

app.configure(function() {
  app.use('/public', express.static(__dirname + '/public'));
  app.set('view engine', 'jade');
});

app.get('/', function (req, res) {
  res.render('index');
});

io.sockets.on('connection', function (socket) {
  socket.on('slide', function (data) {
    console.log(data);
  });
});

server.listen(8080);
