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
          $scope.formAddSentence.sentence = '';
          $scope.formAddSentence.word1 = '';
          $scope.formAddSentence.word2 = '';
          $scope.formAddSentence.word3 = '';
          $scope.formAddSentence.word4 = '';
          $scope.formAddSentence.word5 = '';
          $scope.formAddSentence.word6 = '';
          $scope.formAddSentence.word7 = '';
          $scope.formAddSentence.word8 = '';
          $scope.formAddSentence.word9 = '';
          $scope.formAddSentence.word10 = '';
          $scope.formAddSentence.answer1 = '';
          $scope.formAddSentence.answer2 = '';
          $scope.formAddSentence.solution1 = '';
          $scope.formAddSentence.solution2 = '';
          
          
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