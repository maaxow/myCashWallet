define(function(require){
	require('angular');
	var toto = require('services/money');
	require('services/counter');
	return angular.module('cw.directives.add', ['cw.service.money','cw.service.counter'])

	.directive('cwAdd', function($money, $mdDialog, $counter) {

    return {
      templateUrl : 'js/directives/add/add.html',
      controller : function($scope){
        var coinsAmount = ["0.01","0.02","0.05","0.10","0.20","0.50","1.00","2.00"];
        var billsAmount = ["5","10","20","50","100","200","500"];
        var types = ["Coins","Bills"];
        $scope.amountsOptions = coinsAmount;
        $scope.typeOptions = types;
        $scope.header = "Adding Money"

        $scope.changeType = function(){
        	if($scope.newMoney.type === "Coins"){
        		$scope.amountsOptions = coinsAmount;
        	} else {
        		$scope.amountsOptions = billsAmount;
        	}
        };
        $scope.newMoney = {
        	type: '',
        	amount: '',
        	quantity: 0
        };
				console.log("instance of AddController", coinsAmount, $scope.amountsOptions);

        $scope.addMoney = function(){
        	if($scope.newMoney.type !== ''){
        		if($scope.newMoney.amount !== ''){
        			if($scope.newMoney.quantity > 0){
        				$scope.newMoney.date = new Date();
        				console.log("adding new money", $scope.newMoney);
        				$money.create($scope.newMoney).then(function(data){
        					$scope.money = data.data;
                  $counter.updateCounters().then(function(){
                    $counter.notify();
										$scope.$emit('cw.add.closeDialog');
                  });
        				});
        			}
        			else {
        				$mdDialog.show($mdDialog.alert()
        										.title('Warning Quantity')
        										.textContent('You are trying to add cash without quantity. And it\'s not possible. \n Please enter a quantity more than 0.')
            								.ariaLabel('Warning quantity')
                            .clickOutsideToClose(true)
            								.ok('Ok, I\'ll do that!'));
        			}
        		}
        		else {
              $mdDialog.show($mdDialog.alert()
                          .title('Warning Amount')
                          .textContent('You are trying to add cash without amount. And it\'s not possible. \n Please enter a valid amount.')
                          .ariaLabel('Warning amount')
                          .clickOutsideToClose(true)
                          .ok('Ok, I\'ll do that!'));
        		}
        	}
        	else {
            $mdDialog.show($mdDialog.alert()
                        .title('Warning Type')
                        .textContent('You have not choose a type of cash. And it\'s not possible. \n Please enter a valid type.')
                        .ariaLabel('Warning type')
                        .clickOutsideToClose(true)
                        .ok('Ok, I\'ll do that!'));
        	}

        };

    }
  }
	});
});
