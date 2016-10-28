/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('adminService', function($http, $httpParamSerializerJQLike) {
      
      
      // Login learner
      this.loginLearner = function(learner, callback) {
        var url = 'assets/inc/fc-login.php';
        var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        
        $http.post(url, $httpParamSerializerJQLike(learner), config).then(callback); 
      };
      
      
      // Register new learner
      this.registerLearner = function(newLearner, callback) {
        var url = 'assets/inc/fc-register.php';
        var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        
        $http.post(url, $httpParamSerializerJQLike(newLearner), config).then(callback);
      };
      
});
