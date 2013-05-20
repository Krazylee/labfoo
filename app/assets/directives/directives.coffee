directives = angular.module('labfoo.directives', [])

directives.directive('showonhover',->
  link: (scope, element, attrs) ->
    element.parent().bind 'mouseenter', ->
      element.show()

    element.parent().bind 'mouseleave', ->
      element.hide()
)

