define(function(require){
  require('angular');
  require('services/counter');

  angular.module('app.directives.total', ['app.service.counter'])

  .directive('cwTotal', function($counter){
    return {
      restrict : 'EA',
      templateUrl: 'js/directives/total/total.html',
      controller: function($scope){

        $scope.total = 0;
        $scope.nbCoins = 0;
        $scope.nbBills = 0;

        $scope.$watch(function(){return $counter.getLastUpdate();}, function(){
          $counter.updateCounters("cw:total").then(function(){
            var count = $counter.get();
            // console.log('total =', count);
            $scope.total = count.total;
            $scope.nbCoins = count.nbCoins;
            $scope.nbBills = count.nbBills;
          });
        });
      }
    }
  });
});