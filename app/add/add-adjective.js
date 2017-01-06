/* 
 File     : add-adjective.js
 Date     : 05 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddAdjective', function($scope, addItemService) {
    
    $scope.responseMessage;
    $scope.displayFormMessage = false;
    $scope.showUpperCase = false;
    
    // Add word
    $scope.addAdjective = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.formAddAdjective, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.formAddAdjective.translation = '';
          $scope.formAddAdjective.english = '';
          $scope.formAddAdjective.img = '';
          
          $scope.displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          $scope.displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          $scope.displayMessage('incorrect');
        } else if (response.data.success === false) {
          $scope.displayMessage('false');
        }
      });
    }; 
});