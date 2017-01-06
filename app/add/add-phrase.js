/* 
 File     : add-phrase.js
 Date     : 05 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddPhrase', function($scope, cardsService, addItemService) {
    
    $scope.responseMessage;
    $scope.displayFormMessage = false;
    $scope.showUpperCase = false;
    
    // Add Phrase
    $scope.addPhrase = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.formAddPhrase, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.formAddPhrase.english = '';
          $scope.formAddPhrase.translation = '';
          
          displayMessage('true');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });
    };
});