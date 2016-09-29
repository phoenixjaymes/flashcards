/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('cardsService', function($http) {
      // Get words
      this.getWords = function(callback) {
        $http.get('mock/german-words.json').then(callback);
      };
      
});