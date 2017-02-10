define(function(require){
	require("angular");

	return angular.module('app.service.money', [])

	.factory('$money', ['$http','$q',function($http, $q) {
		return {
			get : function() {
				return $http.get('/api/money');
			},
			create : function(moneyData) {
				console.log("money Service : moneyData : ", moneyData);
				if(moneyData){
					return $http.post('/api/money', moneyData);
				}
				//TODO Change this. Check moneyData is valid before.
				return $http.post('/api/money', moneyData);
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
