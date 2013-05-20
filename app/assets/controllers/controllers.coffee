angular.module('labfoo')
  .controller 'MainCtrl', ($scope) ->
    $scope.menus = [
      '前面板',
      '后面板'
    ]

    $scope.showKnob = ->
      $(".knob").show().find(".dial").knob()

    $scope.startDrag = (event, ui) ->
      console.log(ui.offset)

    $scope.showPosition = (event, ui) ->
      console.log(ui.offset)
    
    



