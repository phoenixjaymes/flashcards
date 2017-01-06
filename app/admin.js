/* 
 File     : main.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Main', function($scope, $cookies) {
      $scope.loggedIn = false;
      $scope.displayOptions = false;
      
      $scope.formDisplay = {
        displayLogin        : false,
        displayOptions      : false,
        displayAddPhrase    : false,
        displayAddVerb      : false,
        displayAddWord      : false,
        displayAddCategory  : false,
        displayRegister     : false,
        displayListWords    : false,
        displayUpdateAdjective  : false,
        displayUpdateCategory   : false,
        displayUpdateNoun       : false,
        displayUpdatePhrase     : false,
        displayUpdateVerb       : false,
      };
      
      
      // Show login form or show admin options
      $scope.showOptions = function() {
        // Check if user is logged in
        if ($scope.loggedIn === false) {
          $scope.formDisplay.displayLogin = true;
        } else if ($scope.loggedIn === true) {
          $scope.displayOptions = !$scope.displayOptions;
        }
      };
      
      
      // Logging out
      $scope.logOut = function() {
        // Remove cookie
        $cookies.remove('loggedIn');
        // Set loggedIn 
        $scope.loggedIn = false;
        // Hide options
        $scope.displayOptions = false;
      };
      
      
      // Display admin forms
      $scope.displayForm = function(form) {
        // Close all modals
        for (var prop in $scope.formDisplay) {
          $scope.formDisplay[prop] = false;
        }
        
        // Open selected modal
        $scope.formDisplay[form] = true;
        
        // Close options
        $scope.displayOptions = false;
      
      };
      
      // Close modal windows
      $scope.$on('closeModal', function(evt, args) {
        $scope.formDisplay[args] = false;
        
        // Don't show message box
        $scope.displayFormMessage = false;
        
      });
      
      
      // Login to options
      $scope.$on('loginClick', function(evt, args) {
        // Clear and close login form or close form and show registration
        if (args === true) {
          // Set cookie
          $cookies.put('loggedIn', true);
          
          $scope.loggedIn = true;
          $scope.formDisplay.displayLogin = false;
          $scope.displayFormMessage = false;
        } else if (args === 'register') {
          $scope.formDisplay.displayLogin = false;
          $scope.displayRegister = true;
        }
      });
      
      
      // Register click
      $scope.$on('registerClick', function(evt, args) {
        // Clear and close form
        if (args === true) {
          $scope.loggedIn = true;
          $scope.formDisplay.displayRegister = false;
          $scope.displayFormMessage = false;
        }
      });
      
      
      // Display update forms
      $scope.$on('displayUpdateForms', function(evt, form) {
        
        // Open selected modal
        $scope.formDisplay[form] = true;
      });
      
      // Check value of loggdIn cookie
      var checkLogin = function() {
        
        var loggedIn = $cookies.get('loggedIn');
        
        if (loggedIn) {
          $scope.loggedIn = true;
        } 
        
      };
      
      // Display message
    $scope.displayMessage = function(message) {
      var objMessages = {
        'true' : 'Item added successfully.',
        'updated' : 'Item updated successfully.',
        'incorrect' : 'Please fill in all form fields.',
        'duplicate' : 'This item already exist.',
        'false' : 'Unable to add item at this time.'
      };
      
      $scope.responseMessage = objMessages[message];
      $scope.displayFormMessage = true;
    };
      
      
      
      // Check if luser is logged in
      checkLogin();
});