define(function(require){
	require('angular');
	var toto = require('services/money');
	require('services/counter');
	return angular.module('cw.directives.add', ['cw.service.money','cw.service.counter', 'ngMessages'])
	.directive('cwAdd', function($money, $mdDialog, $counter) {

    return {
      templateUrl : 'js/directives/add/add.html',
      controller : function($scope){
        var coinsAmount = ["0.01","0.02","0.05","0.10","0.20","0.50","1.00","2.00"];
        var billsAmount = ["5","10","20","50","100","200","500"];
        var types = ["Coin","Bill"];
        $scope.amountsOptions = coinsAmount;
        $scope.typeOptions = types;
        $scope.header = "Adding Money"

        $scope.changeType = function(){
        	if($scope.newEntry.type === "Coins"){
        		$scope.amountsOptions = coinsAmount;
        	} else {
        		$scope.amountsOptions = billsAmount;
        	}
        };

        $scope.newEntry = {};

				console.log("instance of AddController", coinsAmount, $scope.amountsOptions);

				$scope.addMoney = function(newEntryList){
					if($scope.newEntry.type !== ''){
						if($scope.newEntry.amount !== ''){
							if($scope.newEntry.quantity > 0){
								// $scope.newEntry.date = new Date();
								console.log("Adding new money", newEntryList);
								$money.create(newEntryList)
								.then(function(data){
									$scope.money = data.data;
									$counter.updateCounters()
									.then(function(){
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
								.ok('Ok, I\'ll do that!')
							);
						}
					}
					else {
						$mdDialog.show($mdDialog.alert()
						.title('Warning Amount')
						.textContent('You are trying to add cash without amount. And it\'s not possible. \n Please enter a valid amount.')
						.ariaLabel('Warning amount')
						.clickOutsideToClose(true)
						.ok('Ok, I\'ll do that!')
					);
				}
			}
			else {
				$mdDialog.show($mdDialog.alert()
				.title('Warning Type')
				.textContent('You have not choose a type of cash. And it\'s not possible. \n Please enter a valid type.')
				.ariaLabel('Warning type')
				.clickOutsideToClose(true)
				.ok('Ok, I\'ll do that!')
			);
		}
	}

				$scope.newEntryList = [];

				$scope.addEntry = function (newEntry) {
					// unshift the new entry to top of newEntryList
					$scope.newEntryList.unshift(angular.copy(newEntry));
					// reset the form values
					$scope.newEntry = {
						type: $scope.typeOptions[0],
						amount: $scope.amountsOptions[0],
						quantity: 1
					};
				};

				$scope.removeFromNewEntryList = function (index) {
					$scope.newEntryList.splice(index, 1);
				};
			}
  	}
	});
});
