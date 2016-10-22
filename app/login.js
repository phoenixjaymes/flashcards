/* 
 File     : login.js
 Date     : Oct 22, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Login', function($scope, adminService) {
      $scope.learner = {};
      
      $scope.login = function() {
        adminService.login($scope.learner, function(response) {
          console.log(response.data);
          
          
          if(response.data.success === 'true') {
            console.log('login sucessful');
          } else {
            console.log('login failed');
          }
        });
        
        //console.log($scope.user);
      };
      
      
      
      
      
      //$emit('loginClick')
});