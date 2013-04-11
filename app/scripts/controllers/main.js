'use strict';

angular.module('modeApp')
  .controller('MainCtrl', function ($scope) {
    $scope.menus = [
      '前面板',
      '后面板'
    ];
	$(".dial").knob();
  });
