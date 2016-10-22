/* 
 File     : main.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Main', function($scope) {
      $scope.loggedIn = false;
      $scope.displayLogin = false;
      $scope.displayOptions = false;
      $scope.displayAddWord = false;
      $scope.displayUpdateWord = false;
      $scope.displayAddCategory = false;
      
      
      $scope.showOptions = function() {
        // Check if logged user is logged in
        if ($scope.loggedIn === false) {
          
          $scope.displayLogin = true;
          
          
          // temp Success on login
          $scope.loggedIn = true;
          
          
        } else if ($scope.loggedIn === true) {
          //
          $scope.displayOptions = !$scope.displayOptions;
        }
      };
      
      
      // Logging in and logging out
      $scope.logOut = function() {
        // Looged out
        // create login service
        $scope.loggedIn = false;
        // Hide options
        $scope.displayOptions = false;
      };
      
      
      // Display add and update forms
      $scope.displayForm = function(form) {
        if(form === 'addcategory') {
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = true;
          $scope.displayOptions = false;
        } else if (form === 'addword') {
          $scope.displayAddWord = true;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
          
        } else if (form === 'updateword') {
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = true;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        }
      };
      
      
      // Close modal windows
      $scope.$on('closeModal', function(evt) {
        $scope.displayLogin = false;
        $scope.displayAddWord = false;
        $scope.displayUpdateWord = false;
        $scope.displayAddCategory = false;
      });
      
      
      // Login to options
      $scope.$on('loginClick', function(evt) {
        // temp Success on login
        $scope.loggedIn = true;
        $scope.displayLogin = false;
      });
      
      
      // Add category
      $scope.$on('addCategoryClick', function(evt) {
        // temp Success add category
        $scope.displayAddCategory = false;
      });
      
      
      // Add word
      $scope.$on('addWordClick', function(evt) {
        // temp Success add word
        $scope.displayAddWord = false;
      });
      
      
      // Update word
      $scope.$on('updateWordClick', function(evt) {
        // temp Success update word
        $scope.displayUpdateWord = false;
      });
      
});