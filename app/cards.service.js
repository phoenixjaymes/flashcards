/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('cardsService', function($http) {
            
      // Get words
      this.getWords = function(pos, category, callback) {
        
        if (pos === 'adjective') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'noun') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'verb') {
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
});
