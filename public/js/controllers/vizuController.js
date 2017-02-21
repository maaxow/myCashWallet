define(function(require){
	require('angular');
	require('services/money');
	var Chart = require('chart');
	return angular.module('app.controller.vizu', ['app.service.money', 'app.service.counter'])

	.controller('VizualisationController', function($scope, $money, $counter, $timeout) {

		var allData = {
			labels : ["Coins", "Bills"],
			datasets : [{
				data : [0, 0],
				backgroundColor : [ 'red' , 'green'],
				// hoverBackgroundColor : ['yellow', 'blue']
			}]
		},
		allChart = new Chart("allDonut", {
			type : 'doughnut',
			data : allData,
			options : {
				responsive : false
			}
		});

		var coinsData = {
			labels : ["0.01", "0.02", "0.05","0.10","0.20","0.50","1.00","2.00"],
			datasets : [{
				data : [0, 0, 0, 0, 0, 0, 0, 0],
				backgroundColor : [
					'#FFFFF1',
					'#FFFFD7',
					'#FFFFBD',
					'#FFFFA4',
					'#FFFF8B',
					'#FFF571',
					'#E6DC58',
					'#CCC23E'
				],
				hoverBackgroundColor : ['yellow']
			}]
		},
		coinsChart = new Chart("coinsDonut", {
			type : 'doughnut',
			data : coinsData,
			options : {
				responsive : false
			}
		});

		var billsData = {
			labels : ["5","10","20","50","100","200","500"],
			datasets : [{
				data : [0, 0, 0, 0, 0, 0, 0],
				backgroundColor : [
					'#F8FFCB',
					'#DEFFB1',
					'#C4FF97',
					'#ABFF7E',
					'#92FC65',
					'#78E24B',
					'#5FC932'
				],
				hoverBackgroundColor : ['green']
			}]
		},
		billsChart = new Chart("billsDonut", {
			type : 'doughnut',
			data : billsData,
			options : {
				responsive : false
			}
		});

		$scope.query = {
			order : 'amount',
			limit : 5,
			page : 1
		}
		var success = function(money){
			$scope.money = money;
		}

		$scope.updateMoney = function(){
			$scope.promise = $counter.updateCounters(success).$promise;
		};

		$scope.$watch(function(){return $counter.getLastUpdate();}, function(){
			$timeout(function(){
				$counter.updateCounters("vizuController").then(function(data){
					// var data = $counter.get();
					console.log("coutner", data);
					$scope.money = data.allData;
					$scope.counter = data;
					allChart.data.datasets[0].data[0] = data.nbCoins;
					allChart.data.datasets[0].data[1] = data.nbBills;
					allChart.update();
					coinsChart.data.datasets[0].data[0] = data.coinsCounter["0.01"];
					coinsChart.data.datasets[0].data[1] = data.coinsCounter["0.02"];
					coinsChart.data.datasets[0].data[3] = data.coinsCounter["0.05"];
					coinsChart.data.datasets[0].data[2] = data.coinsCounter["0.10"];
					coinsChart.data.datasets[0].data[4] = data.coinsCounter["0.20"];
					coinsChart.data.datasets[0].data[5] = data.coinsCounter["0.50"];
					coinsChart.data.datasets[0].data[6] = data.coinsCounter["1.00"];
					coinsChart.data.datasets[0].data[7] = data.coinsCounter["2.00"];
					coinsChart.update();
					billsChart.data.datasets[0].data[0] = data.billsCounter["5"];
					billsChart.data.datasets[0].data[1] = data.billsCounter["10"];
					billsChart.data.datasets[0].data[2] = data.billsCounter["20"];
					billsChart.data.datasets[0].data[3] = data.billsCounter["50"];
					billsChart.data.datasets[0].data[4] = data.billsCounter["100"];
					billsChart.data.datasets[0].data[5] = data.billsCounter["200"];
					billsChart.data.datasets[0].data[6] = data.billsCounter["500"];
					billsChart.update();
				});
			}, 100);
		});

	});

});
