define(function(require){
  var angular = require('angular');
  require('angular-material');
  require('angular-ui-router');
  require('controllers/controllers.core');
  require('directives/directives.core');
  var deferred = require('angular-deferred-bootstrap');

  var app = angular.module('app', ['ui.router', 'app.controllers','ngMaterial','app.directives']);

  app.config(['$locationProvider','$stateProvider', '$urlRouterProvider', function($locationProvider,$stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'views/home.html',
      controller: 'mainController'
    })
    .state('vizu', {
      url: '/vizu',
      templateUrl: 'views/vizu.html',
      controller: 'VizualisationController'
    });

    // For invalid route
		$urlRouterProvider.otherwise('/');
		// use the HTML5 History API
		$locationProvider.html5Mode(true);
  }]);

  app.init = function(){
    deferred.bootstrap({
      element: document.body,
      module: 'app'
    });
  };

  app.filter('limitTo', function(){
		return function(input, limit){ //input c'est ton text avant le | et limit c'est ton parametre apres le ofLimitTo:
			var out = "";
			if(input.length > limit){
				for(var i = 0; i < limit; i++){
					out = out + input.charAt(i);
				}
				out = out + " ...";
			}
			else out = input;
			return out;
		}
	})
  return app;
});
