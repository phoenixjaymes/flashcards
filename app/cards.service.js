/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('cardsService', function($http) {
            
      // Get words for cards
      this.getWords = function(pos, category, sort, callback) {
        
        if (pos === 'adjective') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'noun') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'verb') {
          var url = 'assets/inc/fc-german.php?pos=' + pos;
        } else if (pos === 'phrase') {
          var url = 'assets/inc/fc-german.php?pos=' + pos;
        } else if (pos === 'study') {
          var url = 'assets/inc/fc-german.php?pos=' + pos;
        } else {
          var url = 'assets/inc/fc-german.php?pos=noun&category=' + 1;
        }
        
        $http.get(url).then(callback); 
      };
      
      // Get words to update or delete
      this.getWordsUpdate = function(pos, category, callback) {
        
        if (pos === 'adjective') {
          var url = 'assets/inc/fc-get-update-words.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'noun') {
          var url = 'assets/inc/fc-get-update-words.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'verb') {
          var url = 'assets/inc/fc-get-update-words.php?pos=' + pos;
        } else if (pos === 'phrase') {
          var url = 'assets/inc/fc-get-update-words.php?pos=' + pos;
        } else if (pos === 'mixed') {
          var url = 'assets/inc/fc-get-update-words.php?pos=' + pos;
        } else {
          var url = 'assets/inc/fc-get-update-words.php?pos=noun&category=' + 1;
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
