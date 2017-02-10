var path = require('path');
var Money = require('./models/Money');

function getMoney(res){
  Money.find(function(err, money){
    if(err){
      res.send(err);
    }
    res.json(money);
  })
}

module.exports = function (app) {

    // GET ALL
    app.get('/api/money', function (req, res) {
        getMoney(res);
    });

    // POST CREATE
    app.post('/api/money', function (req, res) {
      //console.log("post money req body", req.body);

      return Money.create(req.body, function(err,res){
        if(err){
          res.send(err);
        }
        getMoney(res);
      });
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

    // application -------------------------------------------------------------
    app.get('/*', function (req, res) {
      res.sendFile(path.resolve(__dirname + '/../public/index.html')); // load the single view file (angular will handle the page changes on the front-end)
    });
};
