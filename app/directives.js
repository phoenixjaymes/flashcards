/* 
 File     : directives.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .directive('home', function() {
    return {
      templateUrl : 'app/views/home.html'
    };
  })
  .directive('cards', function() {
    return {
      templateUrl : 'app/views/cards.html',
      controller  : 'Cards'
    };
  });