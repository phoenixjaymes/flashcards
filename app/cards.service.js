/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('cardsService', function($http) {
      // Get words
      this.getWords = function(type, callback) {
        
        if (type === 'colors') {
          $http.get('mock/german-colors.json').then(callback);
        } else if (type === 'clothes') {
          $http.get('mock/german-clothes.json').then(callback);
        } else if (type === 'other') {
          $http.get('mock/german-other.json').then(callback);
        } else {
          $http.get('mock/german-words.json').then(callback);
        } 
      }; 
});