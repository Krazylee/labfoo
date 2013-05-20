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

}).call(this);
