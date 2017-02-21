define(function(require){
  require('directives/line/line');
  require('directives/total/total');

  angular.module('app.directives', ['app.directives.line', 'app.directives.total']);

});
