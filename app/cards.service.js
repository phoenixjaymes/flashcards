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
        console.log('Part of speech: ' + pos + ' - Category: ' + category);
//        if (type === 'body') {
//          var url = 'assets/inc/fc-german.php?category=body';
//        } else if (type === 'colors') {
//          var url = 'assets/inc/fc-german.php?category=colors'; 
//        } else if (type === 'clothing') {
//          var url = 'assets/inc/fc-german.php?category=clothing'; 
//        } else if (type === 'descriptions') {
//          var url = 'assets/inc/fc-german.php?category=descriptions';     
//        } else if (type === 'geography') {
//          var url = 'assets/inc/fc-german.php?category=geography';  
//        } else if (type === 'nature') {
//          var url = 'assets/inc/fc-german.php?category=nature';
//        } else {
//          var url = 'assets/inc/fc-german.php?category=none';   
//        }
        
        
        
        if (pos === 'noun') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=all';
        } else if (pos === 'verb') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=all';
        } else {
          var url = 'assets/inc/fc-german.php?category=' + category;
        }
        
        
        
//        if (category === 'all') {
//          var url = 'assets/inc/fc-german.php?category=all';
//        } else {
//          var url = 'assets/inc/fc-german.php?category=' + category;
//        }
        
        $http.get(url).then(callback); 
      }; 
});