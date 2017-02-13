/* 
 File     : add-sentence.js
 Date     : 04 Feb 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddSentence', function($scope, addItemService) {
    
    $scope.responseMessage;
    $scope.showUpperCase = false;
    
    // Add word
    $scope.addSentence = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.formAddSentence, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.formAddSentence.english = '';
          $scope.formAddSentence.translation = '';
          $scope.formAddSentence.example = '';
          $scope.formAddSentence.img = '';
          
          $scope.displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          $scope.displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          $scope.displayMessage('incorrect');
        } else if (response.data.success === 'order') {
          $scope.displayMessage('order');
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