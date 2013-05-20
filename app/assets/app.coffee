angular.module('labfoo', ['ngDragDrop', 'labfoo.directives'])
  .config(($routeProvider) ->
    $routeProvider
      .when('/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      )
      .otherwise(
        redirectTo: '/'
      )
  )


