$(document).ready(function() {
  var socket = io.connect('/');

  initSlider = function (id) {
    $(id).change(function() {
      socket.emit('slide', { id: this.id, value: this.value });
    });
  }

  initSlider('#leftEngine');
  initSlider('#rightEngine');

  $('#bothEngines').change(function() {
    $('#leftEngine').attr('value', this.value).trigger('change');
    $('#rightEngine').attr('value', this.value).trigger('change');
  });

  $('#button13').click(function() {
    val = !$(this).data('value');
    socket.emit('press', { id: 13, value: val });
    $(this).data('value', val);
  });
});
