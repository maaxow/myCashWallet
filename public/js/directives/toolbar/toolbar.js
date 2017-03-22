define(function(require){
  require('angular');
  require('services/money');
  var addCtrl = require('controllers/addController');

  angular.module('app.directives.toolbar', ['app.service.money', 'app.controller.add'])

  .directive('cwToolbar', function($mdDialog, $money, $controller, $counter){
    return {
      restrict : 'EA',
      templateUrl: 'js/directives/toolbar/toolbar.html',
      controller: function($scope){
        // var scopeAddController = $scope.$new();
        // var AddController = $controller('AddController', {
        //   $scope: scopeAddController
        // });
        // console.log("toolbar controller", AddController);
        // console.log($controller('AddController', {
        //   $scope : {
        //     typeOptions : ["A", "B"]
        //   }
        // }));
        $scope.addMoney = function(){
          // var scopeuh = $scope.$new(true);
          // console.log(scopeuh);
          // var ctrl = $controller('AddController', {
          //   $scope : scopeuh
          // })
          var money = $mdDialog.addMoney();
          $mdDialog.show(money).then(function(data){
            console.log("success, on ajoute les donnée recu :", data);
          }, function(data){
            console.log("error, on ajoute pas les donnée recu :", data);
          });
        };
      }
    }
  });
});
