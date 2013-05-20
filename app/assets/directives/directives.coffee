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

directives.directive 'waveform', ->
  restrict: 'E'
  scope:
    name: '@'
  link: (scope, element, attrs) ->
    data = [1, 0.2, 0.5]
    waveform = new Waveform(
      container: document.getElementById("waveform-directive")
      width: 500
      height: 150
      interpolate: false
    )
    ctx = waveform.context
    
    gradient = ctx.createLinearGradient(0, 0, 0, waveform.height)
    gradient.addColorStop(0.0, "#f60")
    gradient.addColorStop(1.0, "#ff1b00")
    waveform.innerColor = gradient

    i = 0
    setInterval(->
      data.push(Math.cos(i++/25) - 0.2 + Math.random()*0.3)
      waveform.update {data: data}
    , 50)
  replace: true
  templateUrl: "../../views/components/waveform.html"

