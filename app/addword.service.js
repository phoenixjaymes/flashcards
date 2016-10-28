/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .service('addwordService', function($http, $httpParamSerializerJQLike) {


    // Login learner
    this.addWord = function(word, callback) {
      var url = 'assets/inc/fc-add-word.php';
      var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

      $http.post(url, $httpParamSerializerJQLike(word), config).then(callback); 
    };
      
});
