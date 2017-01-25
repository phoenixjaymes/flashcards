/* 
 File     : update-phrase.js
 Date     : Dec 21, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('UpdatePhrase', function($scope, updateItemService) {
    $scope.updatePhrase = function() {
      
      updateItemService.updateItem($scope.formUpdatePhrase, function(response) {
        
        // Check response message
        if(response.data.success === 'updated') {
          // Clear form and close it
          
          
          $scope.displayMessage('updated');
        } else if (response.data.success === 'incorrect') {
          $scope.displayMessage('incorrect');
        } else if (response.data.success === false) {
          $scope.displayMessage('false');
        }
        
        if(response.data.success === 'updated') {
          $scope.messageSuccess = true;
        } else {
          $scope.messageSuccess = false;
        }
      });
    };
  });