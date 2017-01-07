/* 
 File     : admin.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Admin', function($scope) {
    $scope.formAddAdjective = {"pos": "adjective"};
    $scope.formAddCategory = {"pos": "category"};
    $scope.formAddNoun = {"pos": "noun"};
    $scope.formAddPhrase = {"pos" : "phrase"};
    $scope.formAddVerb = {"pos": "verb"};
    $scope.inputType;
    $scope.inputField;


    // Set which input umlaut should be added to
    $scope.umlautFocus = function(pos, propName) {
      $scope.inputType = pos;
      $scope.inputField = propName;
    };
    
    
    // Add Umlauts and special characters
    $scope.addCharacter = function(char) {
      if(!$scope.inputType || !$scope.inputField) {
        return;
      }
      
      if ($scope[$scope.inputType][$scope.inputField] === undefined) {
        $scope[$scope.inputType][$scope.inputField] = '';
      }
      
      $scope[$scope.inputType][$scope.inputField] = $scope[$scope.inputType][$scope.inputField] + char;
    };
    
    // Display message
    $scope.displayMessage = function(message) {
      var objMessages = {
        'true'      : 'Item added successfully.',
        'updated'   : 'Item updated successfully.',
        'incorrect' : 'Please fill in all form fields.',
        'duplicate' : 'This item already exist.',
        'false'     : 'Unable to add item at this time.'
      };
      
      $scope.responseMessage = objMessages[message];
      $scope.displayFormMessage = true;
    };
    
});