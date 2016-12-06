/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .service('addItemService', function($http, $httpParamSerializerJQLike) {


    // Add items
    this.addItem = function(item, callback) {
      var url = 'assets/inc/fc-add-item.php';
      var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

      $http.post(url, $httpParamSerializerJQLike(item), config).then(callback); 
    };
      
});
