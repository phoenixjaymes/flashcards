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
      $scope.displayAddPhrase = false;
      $scope.displayAddVerb = false;
      $scope.displayAddWord = false;
      $scope.displayUpdateWord = false;
      $scope.displayAddCategory = false;
      $scope.displayRegister = false;
      
      
      $scope.showOptions = function() {
        // Check if user is logged in
        if ($scope.loggedIn === false) {
          
          $scope.displayLogin = true;
          
          
          // temp Success on login
          //$scope.loggedIn = true;
          
          
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
      
      
      // Display admin forms
      $scope.displayForm = function(form) {
        if(form === 'addcategory') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = true;
          $scope.displayOptions = false;
        } else if (form === 'addphrase') {
          $scope.displayAddPhrase = true;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        } else if (form === 'addword') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = true;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
          
        } else if (form === 'updateword') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = true;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        } else if (form === 'addverb') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = true;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        }
      };
      
      
      // Close modal windows
      $scope.$on('closeModal', function(evt) {
        $scope.displayLogin = false;
        $scope.displayAddPhrase = false;
        $scope.displayAddVerb = false;
        $scope.displayAddWord = false;
        $scope.displayUpdateWord = false;
        $scope.displayAddCategory = false;
        $scope.displayRegister = false;
      });
      
      
      // Login to options
      $scope.$on('loginClick', function(evt, args) {
        // Clear and close login form or close form and show registration
        if (args === true) {
          $scope.loggedIn = true;
          $scope.displayLogin = false;
          $scope.displayFormMessage = false;
        } else if (args === 'register') {
          $scope.displayLogin = false;
          $scope.displayRegister = true;
        }
      });
      
      // Register click
      $scope.$on('registerClick', function(evt, args) {
        // Clear and close form
        if (args === true) {
          $scope.loggedIn = true;
          $scope.displayRegister = false;
          $scope.displayFormMessage = false;
        }
      });
      
      
      // Add category
      $scope.$on('addCategoryClick', function(evt, args) {
//        if(args === true) {
//          console.log('Category added successfully.');
//        }
      });
      
      
      // Add word
      $scope.$on('addWordClick', function(evt, args) {
        
//        if(args === true) {
//          console.log('Word added successfully.');
//        }
      });
      
      
      // Add Phrase
      $scope.$on('addPhraseClick', function(evt, args) {
//        if(args === true) {
//          console.log('Phrase added successfully.');
//        }
      });
      
      
      // Update word
      $scope.$on('updateWordClick', function(evt) {
        // temp Success update word
        //$scope.displayUpdateWord = false;
      });
      
});