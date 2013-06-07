(function() {
  var app;

  app = angular.module('labfoo', ['ngDragDrop', 'labfoo.directives', 'jui']);

  app.config([
    '$routeProvider', '$locationProvider', (function($routeProvider, $locationProvider) {
      $routeProvider.when('/', {
        templateUrl: 'http://krazylee.github.io/labfoo/views/main.html',
        controller: 'MainCtrl'
      }).when('/backend', {
        templateUrl: 'http://krazylee.github.io/labfoo/views/backend.html',
        controller: 'BackendCtrl'
      }).otherwise({
        redirectTo: '/'
      });
      return $locationProvider.html5Mode(true);
    })
  ]);

}).call(this);
