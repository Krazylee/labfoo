(function() {
  var labfoo;

  labfoo = angular.module('labfoo');

  labfoo.controller('MainCtrl', function($scope) {
    $scope.menus = [
      {
        name: "前面板",
        url: "/"
      }, {
        name: "程序框图设计面板",
        url: "/backend"
      }
    ];
    $scope.showKnob = function() {
      return $(".knob").show().find(".dial").knob({
        "change": function(v) {
          return $("#cos-f, #sin-f").val(v);
        }
      });
    };
    return $scope.showOsc = function() {
      return $(".wave").show();
    };
  });

  labfoo.controller('BackendCtrl', function($scope) {
    return $scope.menus = [
      {
        name: "前面板",
        url: "/"
      }, {
        name: "程序框图设计面板",
        url: "/backend"
      }
    ];
  });

}).call(this);
