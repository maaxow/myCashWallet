define(function(require){
  require('directives/line/line');
  require('directives/total/total');
  require('directives/toolbar/toolbar');
  require('directives/add/add');

  angular.module('cw.directives', [
    'cw.directives.line', 'cw.directives.total',
    'cw.directives.toolbar','cw.directives.add']);

});
