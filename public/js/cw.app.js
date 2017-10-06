define(function(require){
  var angular = require('angular');
  require('angular-material');
  require('angular-ui-router');
  require('controllers.core');
  require('directives/directives.core');
  var deferred = require('angular-deferred-bootstrap');
  require('data-table');
  require('angular-messages')
  var app = angular.module('cw.app', [ 'ui.router', 'md.data.table', 'ngMaterial',
  'cw.controllers','cw.directives', 'ngMessages']);

  app.config(function($locationProvider,$stateProvider, $urlRouterProvider){
    $stateProvider
    .state('home', {
      url: "/",
      templateUrl: 'js/partials/home/home.html'
    })
    .state('vizu', {
      url: '/vizu',
      templateUrl: 'js/partials/vizualisation/vizualisation.html',
      controller: 'VizualisationController'
    });

    // For invalid route
    $urlRouterProvider.otherwise('/');
    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  });

  app.config(function($mdDialogProvider){
    $mdDialogProvider.addPreset('addMoney', {
      options : function(){
        return {
          template : '<md-dialog aria-label="Add Money"><cw:add></cw:add></md-dialog>',
          // templateUrl: 'views/add.html',
          // controller: 'AddController',
          // preserveScope: true,
          // scope: angular.scopeAddController,
          // bindToController: true,
          clickOutsideToClose: true,
          escapeToClose: true
        };
      }
    });
  });
  app.init = function(){
    deferred.bootstrap({
      element: document.body,
      module: 'cw.app'
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
