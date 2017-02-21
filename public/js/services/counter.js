define(function(require){
	require("angular");

	return angular.module('app.service.counter', ['app.service.money'])

	.service('$counter', ['$http','$q', '$money', function($http, $q, $money) {

    function Counter(){
			this.allData = [];
      this.total = 0;
      this.nbCoins = 0;
      this.nbBills = 0;
      this.coinsCounter = {
        '0.01' : 0,
        '0.02' : 0,
        '0.05' : 0,
        '0.10' : 0,
        '0.20' : 0,
        '0.50' : 0,
        '1.00' : 0,
        '2.00' : 0
      };
      this.billsCounter = {
        '5' : 0,
        '10' : 0,
        '20' : 0,
        '50' : 0,
        '100' : 0,
        '200' : 0,
        '500' : 0
      };
    }

    var counters = new Counter(),
    _lastUpdate = new Date()
		proccessing = false;

    var notify = function(){
      _lastUpdate = new Date();
    };

    return {
      getLastUpdate : function(){
        return _lastUpdate;
      },
			get : function() {
				return counters;
        // return this.updateCounters().then(function(newCounter){
        //   return newCounter;
        // });
			},
      updateCounters : function(callback){
				proccessing = true;
        var defer = $q.defer();
        counters = new Counter();
				$money.get().then(function(data){
          var all = data.data;
					counters.allData = data.data;
          for(var i in all){
            var currentTotal = all[i].amount * all[i].quantity;
            counters.total = counters.total + currentTotal;

            if(all[i].type === "Coins"){
              counters.nbCoins += all[i].quantity;
              counters.coinsCounter[all[i].amount] += all[i].quantity;
            }
            else if(all[i].type === "Bills"){
              counters.nbBills += all[i].quantity;
              counters.billsCounter[all[i].amount] += all[i].quantity;
            }
          }
					proccessing = false;
          defer.resolve(counters);
        });
        return defer.promise;
      },
      notify : function(){
        notify();
      },
			isProccessing : function(){
				return proccessing;
			}
		}
	}]);
});
