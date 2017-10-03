define(function(require){
	require("angular");

	return angular.module('cw.service.money', [])

	.factory('$money', ['$http','$q',function($http, $q) {
		return {
			get : function(config) {
				return $http.post('/api/money', config).then(function(data){
					var list = data.data.data;
					for(var i in list){
						if(list[i].type === "Coins"){
							list[i].amount = list[i].amount.toFixed(2);
						}
					}
					data.data.data = list;
					console.log("data after request :", data.data.data[0]);
					return data;
				});
			},
			create : function(moneyData) {
				if(moneyData){
					return $http.post('/api/money/create', moneyData);
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
			},
			countByType : function(type){
				if(type){
					return $http.get('api/money/countAll/' + type);
				} else {
					return $http.get('/api/money');
				}
			},
			test : function(devise){
				if(devise){
					return $http.get('api/money/' + devise);
				} else {
					return $http.get('/api/money');
				}
			}
		}
	}]);
});
