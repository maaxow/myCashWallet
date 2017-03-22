define(function(require){
  require('directives/line/line');
  require('directives/total/total');
  require('directives/toolbar/toolbar');
  require('directives/add/add');

  angular.module('app.directives', [
    'app.directives.line', 'app.directives.total',
    'app.directives.toolbar','app.directives.add']);

});
