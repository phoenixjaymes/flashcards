/* 
 File     : add-category.js
 Date     : 05 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddCategory', function($scope, addItemService) {
    
    $scope.responseMessage;
    $scope.showUpperCase = false;
    
    // Add category
    $scope.addCategory = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.formAddCategory, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.formAddCategory.name = '';
          
          // Get categories
          $scope.getAllCategories();
          $scope.getAdminCategories();
          
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