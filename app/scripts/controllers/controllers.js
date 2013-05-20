(function() {

  angular.module('labfoo').controller('MainCtrl', function($scope) {
    $scope.menus = ['前面板', '后面板'];
    $scope.showKnob = function() {
      return $(".knob").show().find(".dial").knob();
    };
    $scope.startDrag = function(event, ui) {
      return console.log(ui.offset);
    };
    return $scope.showPosition = function(event, ui) {
      return console.log(ui.offset);
    };
  });

}).call(this);
