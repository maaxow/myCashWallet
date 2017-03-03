define(function(require){
  require('directives/line/line');
  require('directives/total/total');
  require('directives/toolbar/toolbar')

  angular.module('app.directives', ['app.directives.line', 'app.directives.total','app.directives.toolbar']);

});
