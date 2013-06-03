labfoo = angular.module('labfoo')
labfoo.controller 'MainCtrl', ($scope) ->
    $scope.menus = [
      {name: "前面板", url: "/"},
      {name: "程序框图设计面板", url: "/backend"}
    ]

    $scope.showKnob = ->
      $(".knob").show().find(".dial").knob({"change": (v)->
        $("#cos-f, #sin-f").val(v)
      })

    $scope.showOsc = ->
      $(".wave").show()



labfoo.controller 'BackendCtrl', ($scope) ->
  $scope.menus = [
    {name: "前面板", url: "/"},
    {name: "程序框图设计面板", url: "/backend"}
  ]




