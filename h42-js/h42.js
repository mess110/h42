var firmata = require('firmata')
  , config = require('./config');

var h42 = {
  board: null,
  init: function() {
    this.board = new firmata.Board(config.h42.port, function(err) {
      if (err) {
        console.log(err);
        return;
      }
    });
  },
  digital: function(pin, val) {
    if (config.h42.enabled === false) {
      return;
    }

    this.board.digitalWrite(pin, val);
  },
  engine: function(upPin, downPin, val) {
    if (val >= 50) {
      this.digital(upPin, 0);
      this.digital(downPin, val);
    } else if (val < -50) {
      this.digital(upPin, val);
      this.digital(downPin, 0);
    } else {
      this.digital(upPin, 0);
      this.digital(downPin, 0);
    }
  }
};

module.exports = h42;
