labfoo = angular.module('labfoo')
labfoo.controller 'MainCtrl', ($scope) ->
    $scope.menus = [
      '前面板',
      '后面板'
    ]

    $scope.showKnob = ->
      $(".knob").show().find(".dial").knob()

labfoo.controller 'BackendCtrl', ($scope) ->


        



