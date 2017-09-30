var path = require('path');
var Money = require('./models/money');

function getMoney(res){
  Money.find(function(err, money){
    if(err){
      res.send(err);
    }
    res.json(money);
  })
}

function getMoneySpecific(res, config){
  var nbTotal = 0;
  Money.count(function(arr, money){
    nbTotal = money;
  });
  Money.find(function(err, money){
    // console.log("money", money);
    if(err){
      res.send(err);
    }
    var send = {
      data: money,
      nbTotal : nbTotal
    }
    res.json(send);
  }).skip(config.from).limit(config.limit);
}

// Money.find().limit(5).skip(5);

module.exports = function (app) {

    // GET ALL
    app.get('/api/money', function (req, res) {
        getMoney(res);
    });

    // POST GET WITH QUERY PARAMS
    app.post('/api/money', function (req, res) {

      getMoneySpecific(res, req.body);
    });

    // POST CREATE
    app.post('/api/money/create', function (req, res) {

      console.log("body", req.body);
      return Money.create(req.body, function(err, money){
        //console.log("create money res", req.body, res);
        if(err){
          res.send(err);
        }
        getMoney(res);
      });
    });

    app.get('api/money/countAll/:money_type',function(req,res){

      const money_type = req.params.money_type;

      try{

        Money.find({

          type:money_type

        },function(err,res){

          if(err)
            return res.send(err);

          return res.json(res)

        });

      }catch(ex){

        console.log("Database Error");
        return res.send("Database Error");

      }

    });

    // UPDATE
    app.post('/api/money/:money_id', function(req, res){
      // Money.update(req.body)
    });

    // delete a to
    app.delete('/api/money/:money_id', function (req, res) {
        Money.remove({
            _id: req.params.money_id
        }, function (err, todo) {
            if (err){
              res.send(err);
            }
            getMoney(res);
        });
    });
    // Count money 
    app.get('/api/money/count/:type_money', function(req, res){
        let type = req.params.type_money;
        let agg = Money.aggregate();
        agg.match({type});
        agg.project({
          total: {
            $sum: {$multiply: ['$quantity', '$amount']}
          }
        });

        agg.exec((err, data)=>{
          if(err){
            res.json(error);
            
          } else {
            res.json(data[0].total)
          }
      });
        
    });
    // application -------------------------------------------------------------
    app.get('/*', function (req, res) {
      res.sendFile(path.resolve(__dirname + '/../public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
};
