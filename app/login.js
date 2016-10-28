/* 
 File     : login.js
 Date     : Oct 22, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Login', function($scope, adminService) {
    $scope.learner = {};
    $scope.responseMessage;
    $scope.displayFormMessage = false;

    // Login
    $scope.loginLearner = function() {
      $scope.displayFormMessage = false;
      adminService.loginLearner($scope.learner, function(response) {

        if(response.data.success === true) {
          $scope.responseMessage = 'You have been logged in.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', true);
        } else if (response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', 'incorrect');
        } else if (response.data.success === 'match') {
          $scope.responseMessage = 'Learner or password incorrect.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', 'match');
        } else if (response.data.success === 'register') {
          $scope.responseMessage = 'Please register';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', 'register');
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to log you in at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', false);
        }
      });
    };


    // Register user
    $scope.registerLearner = function() {
      $scope.displayFormMessage = false;
      adminService.registerLearner($scope.newLearner, function(response) {

        if (response.data.success === true) {
          $scope.responseMessage = 'You have been sucessfully registered.';
          $scope.displayFormMessage = true;
          $scope.$emit('registerClick', true);
        } else if(response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('registerClick', 'incorrect');
        } else if(response.data.success === 'password') {
          $scope.responseMessage = 'Passwords are not the same';
          $scope.displayFormMessage = true;
          $scope.$emit('registerClick', 'password');
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to register you at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('addWordClick', false);
          
        }
      });  
    };
});
