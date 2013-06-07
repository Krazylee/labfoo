(function() {
  var directives;

  directives = angular.module('labfoo.directives', []);

  directives.directive('resizable', function() {
    return {
      link: function(scope, element, attrs) {
        return $(element).resizable();
      }
    };
  });

  directives.directive('showonhover', function() {
    return {
      link: function(scope, element, attrs) {
        element.parent().bind('mouseenter', function() {
          return element.show();
        });
        return element.parent().bind('mouseleave', function() {
          return element.hide();
        });
      }
    };
  });

  directives.directive('knob', function() {
    return {
      restrict: 'E',
      scope: {
        name: '@'
      },
      link: function(scope, element, attrs) {
        scope.startDrag = function() {
          return $(".knob").draggable("enable");
        };
        return scope.showPosition = function() {
          return $(".knob").draggable("disable");
        };
      },
      replace: true,
      templateUrl: "../../views/components/knob.html"
    };
  });

  directives.directive('soundwave', function() {
    return {
      restrict: 'E',
      scope: {
        name: '@'
      },
      link: function(scope, element, attrs) {
        var ctx, data, gradient, i, waveform;
        data = [1, 0.2, 0.5];
        waveform = new Waveform({
          container: document.getElementById("waveform-directive"),
          width: 500,
          height: 150,
          interpolate: false
        });
        ctx = waveform.context;
        gradient = ctx.createLinearGradient(0, 0, 0, waveform.height);
        gradient.addColorStop(0.0, "#f60");
        gradient.addColorStop(1.0, "#ff1b00");
        waveform.innerColor = gradient;
        i = 0;
        return setInterval(function() {
          data.push(Math.cos(i++ / 25) - 0.2 + Math.random() * 0.3);
          return waveform.update({
            data: data
          });
        }, 50);
      },
      replace: true,
      templateUrl: "../../views/components/soundwave.html"
    };
  });

  directives.directive('wave', function() {
    return {
      restrict: 'E',
      scope: {
        name: '@'
      },
      link: function(scope, element, attrs) {
        var canvas, context, cosCheckBox, cosFrequency, cosInput, draw, drawCross, drawFrame, drawLine, drawWave, getFactor, period, periodInput, resize, setParameters, sinCheckBox, sinFrequency, sinInput, stopCheckBox, yPosInput, yPosition;
        sinCheckBox = document.getElementById("sin");
        cosCheckBox = document.getElementById("cos");
        sinInput = document.getElementById("sin-f");
        cosInput = document.getElementById("cos-f");
        periodInput = document.getElementById("period");
        yPosInput = document.getElementById("Y-pos");
        stopCheckBox = document.getElementById("stop");
        canvas = document.getElementById("canvas");
        context = canvas.getContext("2d");
        context.globalCompositeOperation = "lighter";
        sinFrequency = void 0;
        cosFrequency = void 0;
        period = void 0;
        yPosition = void 0;
        draw = function() {
          resize();
          setParameters();
          drawFrame();
          drawCross();
          drawWave();
          return requestAnimationFrame(draw);
        };
        drawCross = function() {
          context.strokeStyle = "rgba(125, 125, 125, 0.5)";
          context.beginPath();
          drawLine(0, canvas.height / 2, canvas.width, canvas.height / 2);
          drawLine(canvas.width / 2, 0, canvas.width / 2, canvas.height);
          return context.stroke();
        };
        drawFrame = function() {
          context.strokeStyle = "rgba(125, 125, 125, 0.5)";
          context.beginPath();
          drawLine(0, 0, canvas.width, 0);
          drawLine(canvas.width, 0, canvas.width, canvas.height);
          drawLine(canvas.width, canvas.height, 0, canvas.height);
          drawLine(0, canvas.height, 0, 0);
          return context.stroke();
        };
        drawLine = function(x1, y1, x2, y2) {
          context.moveTo(x1, y1);
          return context.lineTo(x2, y2);
        };
        drawWave = function() {
          var cos_pixel, drawPoints, getOmega, getPixel, getWavePoints, sin_pixel;
          getOmega = function(frequency) {
            return 2 * Math.PI * frequency;
          };
          getPixel = function(frequency) {
            return getOmega(frequency) * period / canvas.width;
          };
          getWavePoints = function(start, count, pixel, triangle_func) {
            var i, len, points;
            points = [];
            i = start;
            len = count;
            while (i < len) {
              points.push(triangle_func(pixel * i) * getFactor() + yPosition);
              i++;
            }
            return points;
          };
          drawPoints = function(start, pixel, triangle_func) {
            var i, len, path;
            path = getWavePoints(start, canvas.width + start, pixel, triangle_func);
            context.beginPath();
            context.moveTo(0, path[0]);
            i = 1;
            len = path.length;
            while (i < len) {
              context.lineTo(i, path[i]);
              i++;
            }
            return context.stroke();
          };
          drawWave.sin_x = drawWave.sin_x || 0;
          drawWave.cos_x = drawWave.cos_x || 0;
          context.strokeStyle = "rgba(25, 255, 50, 0.8)";
          sin_pixel = getPixel(sinFrequency);
          cos_pixel = getPixel(cosFrequency);
          if (sinCheckBox.checked) {
            drawPoints(drawWave.sin_x, sin_pixel, function(x) {
              return Math.sin(x);
            });
          }
          if (cosCheckBox.checked) {
            drawPoints(drawWave.cos_x, cos_pixel, function(x) {
              return Math.cos(x);
            });
          }
          if (!stopCheckBox.checked) {
            drawWave.sin_x += 1;
            drawWave.cos_x += 1;
          }
          if (drawWave.sin_x > canvas.width || drawWave.cos_x > canvas.width) {
            drawWave.sin_x = 0;
            return drawWave.cos_x = 0;
          }
        };
        getFactor = function() {
          return canvas.height / 4;
        };
        resize = function() {
          canvas.width = 650;
          return canvas.height = 300;
        };
        setParameters = function() {
          sinFrequency = parseFloat(sinInput.value);
          cosFrequency = parseFloat(cosInput.value);
          period = parseInt(periodInput.value, 10);
          return yPosition = parseInt(yPosInput.value, 10);
        };
        return draw();
      },
      replace: true,
      templateUrl: "../../views/components/wave.html"
    };
  });

}).call(this);
