define(function(require){
	require('angular');
	var toto = require('services/money');
	return angular.module('app.controller.vizu', ['app.service.money'])

	.controller('VizualisationController', ['$scope','$http','$money', function($scope, $http, $money, $mdDialog) {

		var coinsAmount = [0.01,0.02,0.05,0.10,0.20,0.50,1.0,2.0];
		var billsAmount = [5.0,10.0,20.0,50.0,100.0,200.0,500.0];

		$scope.amountsOptions = coinsAmount;
		$scope.typeOptions = ["Coins","Bills"];

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

		$scope.addMoney = function(){
			if($scope.newMoney.type !== ''){
				if($scope.newMoney.amount !== ''){
					if($scope.newMoney.quantity !== 0){
						$scope.newMoney.date = new Date();
						$money.create($scope.newMoney).then(function(data){
							$scope.money = data.data;
						});
					}
					else {
						// $mdDialog.show($mdDialog.alert()
						// 						.clickOutsideToClose(true)
						// 						.title('This is an alert title')
						// 						.textContent('You can specify some description text in here.')
        		// 						.ariaLabel('Alert Dialog Demo')
        		// 						.ok('Got it!'));
						alert('Quantity > 0');
					}
				}
				else {
					alert('Amount is empty');
				}
			}
			else {
				alert('Type is empty');
			}

		};

		$scope.updateMoneyList = function(){
			$money.get().then(function(data){
					$scope.money = data.data;
			});
		};
		$scope.updateMoneyList();
		$scope.$on('updateMoneyList', function(event, argument){
			$scope.updateMoneyList();
		});

	}]);

});
