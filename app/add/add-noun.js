/* 
 File     : add-noun.js
 Date     : 05 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddNoun', function($scope, addItemService) {
    
    $scope.responseMessage;
    $scope.showUpperCase = false;
    
    // Add word
    $scope.addNoun = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.formAddNoun, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.formAddNoun.english = '';
          $scope.formAddNoun.base = '';
          $scope.formAddNoun.translation = '';
          $scope.formAddNoun.example = '';
          $scope.formAddNoun.img = '';
          
          $scope.displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          $scope.displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          $scope.displayMessage('incorrect');
        } else if (response.data.success === false) {
          $scope.displayMessage('false');
        }
        
        if(response.data.success === true) {
          $scope.messageSuccess = true;
        } else {
          $scope.messageSuccess = false;
        }
      });
    };
});