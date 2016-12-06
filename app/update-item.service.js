/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .service('updateItemService', function($http, $httpParamSerializerJQLike) {
    
    // Get word
    this.findWord = function(item, callback) {
      var url = 'assets/inc/fc-update-item.php';
      var config = {params: item};
      $http.get(url, config).then(callback);
    };

    // Add items
    this.updateItem = function(item, callback) {
      var url = 'assets/inc/fc-update-item.php';
      var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

      $http.post(url, $httpParamSerializerJQLike(item), config).then(callback); 
    };
      
});