define(function(require){
	require("angular");

	return angular.module('app.service.money', [])

	.factory('$money', ['$http','$q',function($http, $q) {
		return {
			get : function(config) {
				return $http.get('/api/money').then(function(data){
					var list = data.data;
					for(var i in list){
						if(list[i].type === "Coins")
						list[i].amount = list[i].amount.toFixed(2);
					}
					data.data = list;
					return data;
				});
			},
			create : function(moneyData) {
				if(moneyData){
					return $http.post('/api/money', moneyData);
				}
				return $http.get('/api/money');
			},
			// update : function(id){
			// 	//TODO finish  this
			// 	if(id){
			// 		return $http.post('/api/money/' + id);
			// 	}
			// },
			delete : function(id) {
				if(id){
					return $http.delete('/api/money/' + id);
				} else {
					return $http.get('/api/money');
				}
			}
		}
	}]);
});
