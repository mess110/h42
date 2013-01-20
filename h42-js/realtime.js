function init(io, h42) {
  io.sockets.on('connection', function (socket) {
    socket.on('slide', function (data) {
      handleSlide(h42, data);
    });
    socket.on('press', function (data) {
      handlePress(h42, data);
    });
  });
}

// TODO get rid of magic values
handleSlide = function (h42, data) {
  if (data['id'] === 'leftEngine') {
    h42.engine(9, 6, data['value']);
    h42.digital(13, 1);
  } else if (data['id'] === 'rightEngine') {
    h42.engine(3, 5, data['value']);
    h42.digital(13, 0);
  }
}

handlePress = function (h42, data) {
  h42.digital(data['id'], data['value']);
}

exports.init = init;
