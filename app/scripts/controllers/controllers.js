(function() {
  var labfoo;

  labfoo = angular.module('labfoo');

  labfoo.controller('MainCtrl', function($scope) {
    $scope.menus = ['前面板', '后面板'];
    return $scope.showKnob = function() {
      return $(".knob").show().find(".dial").knob();
    };
  });

  labfoo.controller('BackendCtrl', function($scope) {});

}).call(this);
