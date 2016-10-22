/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('adminService', function($http, $httpParamSerializerJQLike) {
      
      
      // Get words
      this.login = function(learner, callback) {
        var url = 'assets/inc/fc-login.php';
        var config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        
        //console.log('logging in: ' + learner);
        
        //$http.post(url, "user=john", config).then(callback);
        $http.post(url, $httpParamSerializerJQLike(learner), config).then(callback); 
      };
      
      
      
      
      // fc_learners
});
