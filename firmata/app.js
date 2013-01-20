var firmata = require('firmata');

var ledPin = 13;

var board = new firmata.Board('/dev/ttyUSB0', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  var ledOn = true;
  board.pinMode(ledPin, board.MODES.OUTPUT);

  setInterval(function() {
    if (ledOn) {
      board.digitalWrite(ledPin, board.HIGH);
    } else {
      board.digitalWrite(ledPin, board.LOW);
    }
    ledOn = !ledOn;
  }, 500);
});
