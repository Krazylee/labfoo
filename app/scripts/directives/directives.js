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

}).call(this);
