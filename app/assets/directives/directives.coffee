directives = angular.module('labfoo.directives', [])

directives.directive 'showonhover',->
  link: (scope, element, attrs) ->
    element.parent().bind 'mouseenter', ->
      element.show()

    element.parent().bind 'mouseleave', ->
      element.hide()


directives.directive 'knob', ->
  restrict: 'E'
  scope:
    name: '@'
  link: (scope, element, attrs) ->
    scope.startDrag = ->
    scope.showPosition = ->
  replace: true
  templateUrl: "../../views/components/knob.html"

