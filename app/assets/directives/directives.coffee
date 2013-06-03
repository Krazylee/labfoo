directives = angular.module('labfoo.directives', [])

directives.directive 'resizable', ->
  link: (scope, element, attrs) ->
    $(element).resizable()


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


directives.directive 'soundwave', ->
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
  templateUrl: "../../views/components/soundwave.html"


directives.directive 'wave', ->
  restrict: 'E'
  scope:
    name: '@'
  link: (scope, element, attrs) ->
      sinCheckBox = document.getElementById("sin")
      cosCheckBox = document.getElementById("cos")
      sinInput = document.getElementById("sin-f")
      cosInput = document.getElementById("cos-f")
      periodInput = document.getElementById("period")
      yPosInput = document.getElementById("Y-pos")
      stopCheckBox = document.getElementById("stop")
      canvas = document.getElementById("canvas")
      context = canvas.getContext("2d")
      context.globalCompositeOperation = "lighter"
      sinFrequency = undefined
      cosFrequency = undefined
      period = undefined
      yPosition = undefined
      draw = ->
        resize()
        setParameters()
        drawFrame()
        drawCross()
        drawWave()
        requestAnimationFrame draw
      drawCross = ->
        context.strokeStyle = "rgba(125, 125, 125, 0.5)"
        context.beginPath()
        drawLine 0, canvas.height / 2, canvas.width, canvas.height / 2
        drawLine canvas.width / 2, 0, canvas.width / 2, canvas.height
        context.stroke()
      drawFrame = ->
        context.strokeStyle = "rgba(125, 125, 125, 0.5)"
        context.beginPath()
        drawLine 0, 0, canvas.width, 0
        drawLine canvas.width, 0, canvas.width, canvas.height
        drawLine canvas.width, canvas.height, 0, canvas.height
        drawLine 0, canvas.height, 0, 0
        context.stroke()
      drawLine = (x1, y1, x2, y2) ->
        context.moveTo x1, y1
        context.lineTo x2, y2
      drawWave = ->
        # x position
        # omega = 2 * pi * f
        getOmega = (frequency) ->
          2 * Math.PI * frequency
        
        # pixel = 2 * Math.PI * frequency * period / canvas.width
        # http://junzo.sakura.ne.jp/dsp4/dsp4.htm
        getPixel = (frequency) ->
          getOmega(frequency) * period / canvas.width
        getWavePoints = (start, count, pixel, triangle_func) ->
          points = []
          i = start
          len = count
          while i < len
            points.push triangle_func(pixel * i) * getFactor() + yPosition
            i++
          points
        drawPoints = (start, pixel, triangle_func) ->
          path = getWavePoints(start, canvas.width + start, pixel, triangle_func)
          context.beginPath()
          context.moveTo 0, path[0]
          i = 1
          len = path.length

          while i < len
            context.lineTo i, path[i]
            i++
          context.stroke()
        drawWave.sin_x = drawWave.sin_x or 0
        drawWave.cos_x = drawWave.cos_x or 0
        context.strokeStyle = "rgba(25, 255, 50, 0.8)"
        sin_pixel = getPixel(sinFrequency)
        cos_pixel = getPixel(cosFrequency)
        if sinCheckBox.checked
          drawPoints drawWave.sin_x, sin_pixel, (x) ->
            Math.sin x

        if cosCheckBox.checked
          drawPoints drawWave.cos_x, cos_pixel, (x) ->
            Math.cos x

        unless stopCheckBox.checked
          drawWave.sin_x += 1
          drawWave.cos_x += 1
        if drawWave.sin_x > canvas.width or drawWave.cos_x > canvas.width
          drawWave.sin_x = 0
          drawWave.cos_x = 0
      getFactor = ->
        canvas.height / 4
      resize = ->
        canvas.width = 650  #window.innerWidth
        canvas.height = 300 #window.innerHeight
      setParameters = ->
        sinFrequency = parseFloat(sinInput.value)
        cosFrequency = parseFloat(cosInput.value)
        period = parseInt(periodInput.value, 10)
        yPosition = parseInt(yPosInput.value, 10)
      draw()
  replace: true
  templateUrl: "../../views/components/wave.html"
