define(function(require){
  require('angular');
  require('services/money');
  require('services/counter');

  angular.module('cw.directives.line', ['cw.service.money','cw.service.counter'])

  .directive('cwLine', function($money, $counter){
    return {
      templateUrl: 'js/directives/line/line.html',
      scope: {
        money: '='
      },
      controller: function($scope){
        // console.log("line", $scope.money);
        $scope.money.date = new Date($scope.money.date);
        $scope.removeMoney = function(id) {
          $money.delete(id)
          .then(function(data) {
            $counter.updateCounters().then(function(){
              $counter.notify();
            });
          });
        };

      }
    }
  });
});
