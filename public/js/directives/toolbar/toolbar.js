define(function(require){
  require('angular');
  require('services/money');

  angular.module('cw.directives.toolbar', ['cw.service.money'])

  .directive('cwToolbar', function($mdDialog, $money, $controller, $counter){
    return {
      restrict : 'EA',
      templateUrl: 'js/directives/toolbar/toolbar.html',
      controller: function($scope){
        var addingDialog = $mdDialog.addMoney();
        $scope.addMoney = function(){
          $mdDialog.show(addingDialog).then(function(){
            // console.log("success, on ajoute les donnée recu :");
          }, function(){
            // console.log("error, on ajoute pas les donnée recu :");
          });
        };
        $scope.$on('cw.add.closeDialog', function(event, argument){
          console.log("tout s'est bien passé, on va fermé le dialog :)");
          $mdDialog.hide(addingDialog);
        });
      }
    }
  });
});
