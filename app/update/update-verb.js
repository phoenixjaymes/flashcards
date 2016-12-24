/* 
 File     : update-verb.js
 Date     : Dec 21, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('UpdateVerb', function($scope, updateItemService) {
    $scope.updateVerb = function() {
      
      $scope.displayFormMessage = false;
      
      updateItemService.updateItem($scope.formUpdateVerb, function(response) {
        
        // Check response message
        if(response.data.success === 'updated') {
          // Clear form and close it

          $scope.displayMessage('updated');
        } else if (response.data.success === 'incorrect') {
          $scope.displayMessage('incorrect');
        } else if (response.data.success === false) {
          $scope.displayMessage('false');
        }
      });
    };
  });