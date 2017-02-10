define(function(require){
  require('angular');
  require('services/money');

  angular.module('app.directives.line', ['app.service.money'])

  .directive('line', function($torrents){
    return {
      templateUrl: 'js/directives/line/line.html',
      scope: {
        money: '='
      },
      controller: function($scope){

        $scope.removeMoney = function(id) {
          $money.delete(id)
          .then(function(data) {
            $scope.$emit('updateMoneyList');
          });
        };

      }
    }
  });
});
