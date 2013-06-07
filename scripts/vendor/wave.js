// forked from sasaplus1's "Canvas Oscilloscope" http://jsdo.it/sasaplus1/Ra2B
var canvasId = function(cid){
  // support canvas element ?
  if (!window.HTMLCanvasElement) {
    return;
  }

  // http://d.hatena.ne.jp/calpo/20110523/p1
  window.requestAnimationFrame = (function(){
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback, element) {
        window.setTimeout(callback, 1000 / 60);
      };
  }());

  // html elements
  var sinCheckBox = document.getElementById('sin');
  var cosCheckBox = document.getElementById('cos');
  var sinInput = document.getElementById('sin-f');
  var cosInput = document.getElementById('cos-f');
  var periodInput = document.getElementById('period');
  var yPosInput = document.getElementById('Y-pos');
  var stopCheckBox = document.getElementById('stop');

  // canvas element and context
  var canvas = document.getElementById(cid);
  var context = canvas.getContext('2d');

  context.globalCompositeOperation = 'lighter';

  var sinFrequency;
  var cosFrequency;
  var period;
  var yPosition;



  draw();



  function draw() {
    resize();
    setParameters();
    drawFrame();
    drawCross();
    drawWave();
    window.requestAnimationFrame(draw);
  }

  function drawCross() {
    context.strokeStyle = 'rgba(125, 125, 125, 0.5)';
    context.beginPath();
    drawLine(0, canvas.height / 2, canvas.width, canvas.height / 2);
    drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);
    context.stroke();
  }

  function drawFrame() {
    context.strokeStyle = 'rgba(125, 125, 125, 0.5)';
    context.beginPath();
    drawLine(0, 0, canvas.width, 0);
    drawLine(canvas.width, 0, canvas.width, canvas.height);
    drawLine(canvas.width, canvas.height, 0, canvas.height);
    drawLine(0, canvas.height, 0, 0);
    context.stroke();
  }

  function drawLine(x1, y1, x2, y2) {
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  }

  function drawWave() {

    // x position
    drawWave.sin_x = drawWave.sin_x || 0;
    drawWave.cos_x = drawWave.cos_x || 0;

    context.strokeStyle = 'rgba(25, 255, 50, 0.8)';

    // omega = 2 * pi * f
    function getOmega(frequency) {
      return 2 * Math.PI * frequency;
    }

    // pixel = 2 * Math.PI * frequency * period / canvas.width
    // http://junzo.sakura.ne.jp/dsp4/dsp4.htm
    function getPixel(frequency) {
      return getOmega(frequency) * period / canvas.width;
    }

    var sin_pixel = getPixel(sinFrequency);
    var cos_pixel = getPixel(cosFrequency);

    function getWavePoints(start, count, pixel, triangle_func) {
      var points = [];

      for (var i = start, len = count; i < len; i++) {
        points.push(triangle_func(pixel * i) * getFactor() + yPosition);
      }

      return points;
    }

    function drawPoints(start, pixel, triangle_func) {
      var path = getWavePoints(start, canvas.width + start, pixel, triangle_func);

      context.beginPath();
      context.moveTo(0, path[0]);

      for (var i = 1, len = path.length; i < len; i++) {
        context.lineTo(i, path[i]);
      }

      context.stroke();
    }

    if (sinCheckBox.checked) {
      drawPoints(drawWave.sin_x, sin_pixel, function(x){return Math.sin(x);});
    }

    if (cosCheckBox.checked) {
      drawPoints(drawWave.cos_x, cos_pixel, function(x){return Math.cos(x);});
    }

    if (!stopCheckBox.checked) {
      drawWave.sin_x += 1;
      drawWave.cos_x += 1;
    }

    if (drawWave.sin_x > canvas.width || drawWave.cos_x > canvas.width) {
      drawWave.sin_x = 0;
      drawWave.cos_x = 0;
    }
  }

  function getFactor() {
    return canvas.height / 4;
  }

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function setParameters() {
    sinFrequency = parseFloat(sinInput.value);
    cosFrequency = parseFloat(cosInput.value);
    period = parseInt(periodInput.value, 10);
    yPosition = parseInt(yPosInput.value, 10);
  }

};
