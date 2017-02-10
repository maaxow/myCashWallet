define(function(require){
	require('angular');
	var toto = require('services/money');
	return angular.module('app.controller.vizu', ['app.service.money'])

	.controller('VizualisationController', ['$scope','$http','$money', function($scope, $http, $money) {

		$scope.amountsOptions = [0.01,0.02,0.05,0.10,0.20,0.50,1.0,2.0];
		$scope.typeOptions = ["Coins","Bills"];
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
						$money.createMoney($scope.newMoney);
					}
					else {
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
			$scope.money = $money.get();
		}
		$scope.updateMoneyList();
		$scope.$on('updateMoneyList', function(event, argument){
			$scope.updateMoneyList();
		});

	}]);

});
