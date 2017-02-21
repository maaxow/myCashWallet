define(function(require){
  require('controllers/vizuController');
  require('controllers/addController')

  angular.module('app.controllers', ['app.controller.vizu', 'app.controller.add'])

  .controller('mainController', function($scope){
  });
});
