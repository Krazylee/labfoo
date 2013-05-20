(function() {
  var directives;

  directives = angular.module('labfoo.directives', []);

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
        scope.startDrag = function() {};
        return scope.showPosition = function() {};
      },
      replace: true,
      templateUrl: "../../views/components/knob.html"
    };
  });

  directives.directive('waveform', function() {
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
      templateUrl: "../../views/components/waveform.html"
    };
  });

}).call(this);
