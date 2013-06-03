(function() {
  var app;

  app = angular.module('labfoo', ['ngDragDrop', 'labfoo.directives', 'jui']);

  app.config([
    '$routeProvider', '$locationProvider', (function($routeProvider, $locationProvider) {
      $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/backend', {
        templateUrl: 'views/backend.html',
        controller: 'BackendCtrl'
      }).otherwise({
        redirectTo: '/'
      });
      return $locationProvider.html5Mode(true);
    })
  ]);

}).call(this);
