/* 
 File     : filters.js
 Date     : 06 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .filter('ucWords', function() {
    return function(str) {
      var arr = str.split(/\s/);
      for(var i=0,l=arr.length; i<l; i++) {
        arr[i] = arr[i].substr(0,1).toUpperCase() + (arr[i].length > 1 ? arr[i].substr(1).toLowerCase() : "");
      }
      return arr.join(" ");
    };
})
.filter('trustWord', ['$sce', function($sce) {
    return function(str) {
      return $sce.trustAsHtml(str);
    };
}]);