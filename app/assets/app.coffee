app = angular.module('labfoo', ['ngDragDrop', 'labfoo.directives', 'jui'])
app.config(['$routeProvider','$locationProvider', (($routeProvider, $locationProvider) ->
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller:'MainCtrl'
    })
    .when('/backend', {
      templateUrl:'views/backend.html',
      controller: 'BackendCtrl'
    })
    .otherwise({redirectTo:'/'})
  $locationProvider.html5Mode(true)
)])

