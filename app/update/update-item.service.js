/* 
 File     : update-item.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .service('updateItemService', function($http, $httpParamSerializerJQLike) {
    
    // Find word to update
    this.findItem = function(item, callback) {
      var url = 'assets/inc/fc-get-update-item.php';
      var config = {params: item};
      $http.get(url, config).then(callback);
    };

    // Update item
    this.updateItem = function(item, callback) {
      var url = 'assets/inc/fc-update-item.php';
      var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

      $http.post(url, $httpParamSerializerJQLike(item), config).then(callback); 
    };
    
    
    // Update last practiced
    this.updateLastPracticed = function(item, callback) {
      var url = 'assets/inc/fc-update-last-practiced.php';
      var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

      $http.post(url, $httpParamSerializerJQLike(item), config).then(callback); 
    };
});