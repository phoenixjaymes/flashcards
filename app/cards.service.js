/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('cardsService', function($http) {
            
      // Get words
      this.getWords = function(pos, category, sort, callback) {
        
        if (pos === 'adjective') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category + '&sort=' + sort;
        } else if (pos === 'noun') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category + '&sort=' + sort;
        } else if (pos === 'verb') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&sort=' + sort;
        } else if (pos === 'phrase') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&sort=' + sort;
        } else if (pos === 'mixed') {
          var url = 'assets/inc/fc-german.php?pos=' + pos;
        } else {
          var url = 'assets/inc/fc-german.php?pos=noun&category=' + 1;
        }
        
        $http.get(url).then(callback); 
      };
      
      this.getCategories = function(callback) {
        var url = 'assets/inc/fc-german-categories.php';
        $http.get(url).then(callback);
      };
      
      this.getAllCategories = function(callback) {
        var url = 'assets/inc/fc-german-categories.php?type=all';
        $http.get(url).then(callback);
      };
});
