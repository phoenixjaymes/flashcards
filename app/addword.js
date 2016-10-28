/* 
 File     : login.js
 Date     : Oct 22, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Login', function($scope, adminService) {
      $scope.learner = {};
      
      // Login
      $scope.loginLearner = function() {
        adminService.loginLearner($scope.learner, function(response) {
          
          //console.log(response.data);
          
          if(response.data.success === true) {
            $scope.$emit('loginClick', true);
            //console.log('login sucessful');
          } else if (response.data.success === 'incorrect') {
            $scope.$emit('loginClick', 'incorrect');
            //console.log('login incorrec');
          } else if (response.data.success === 'register') {
            $scope.$emit('loginClick', 'register');
          }
        });
      };
      
      
      // Register user
      $scope.registerLearner = function() {
        adminService.registerLearner($scope.newLearner, function(response) {
          
          console.log(response.data);
          
          if (response.data.success === true) {
            $scope.$emit('registerClick', true);
            //console.log('success');
          } else if(response.data.success === 'incorrect') {
            $scope.$emit('registerClick', 'incorrect');
            //console.log('fail');
          }
          
        });
        
        
      };
      
      

});