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
        
        if (type === 'body') {
          var url = 'assets/inc/fc-german.php?category=body';
          $http.get(url).then(callback);
          
        } else if (type === 'colors') {
          var url = 'assets/inc/fc-german.php?category=colors';
          $http.get(url).then(callback);
          
        } else if (type === 'clothing') {
          var url = 'assets/inc/fc-german.php?category=clothing';
          $http.get(url).then(callback);
          
        } else if (type === 'nature') {
          var url = 'assets/inc/fc-german.php?category=nature';
          $http.get(url).then(callback);
          
        } else if (type === 'other') {
          var url = 'assets/inc/fc-german.php?category=other';
          $http.get(url).then(callback);
          
        } else {
          var url = 'assets/inc/fc-german.php?category=all';
          $http.get(url).then(callback);   
        } 
      }; 
});
