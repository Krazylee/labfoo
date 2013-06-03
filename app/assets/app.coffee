angular.module('labfoo', ['ngDragDrop', 'labfoo.directives', 'jui'])
  .config(($routeProvider) ->
    $routeProvider
      .when('/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      )
      .when('backend',
        templateUrl: 'views/backend.html',
        controller: 'BackendCtrl'
      )
      .otherwise(
        redirectTo: '/'
      )
  )


