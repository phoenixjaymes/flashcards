/* 
 File     : add-verb.js
 Date     : 05 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddVerb', function($scope, addItemService) {
    
    $scope.responseMessage;
    $scope.displayFormMessage = false;
    $scope.showUpperCase = false;
    
    // Add verb
    $scope.addVerb = function() {
      $scope.displayFormMessage = false;
      
      if(!$scope.formAddVerb.separable) {
        $scope.formAddVerb.separable = 'no';
      } else {
        $scope.formAddVerb.separable = 'yes';
      }
      
      addItemService.addItem($scope.formAddVerb, function(response) {
        
        if(response.data.success === true) {
          // Clear form
          $scope.formAddVerb.english = '';
          $scope.formAddVerb.translation = '';
          $scope.formAddVerb.ich = '';
          $scope.formAddVerb.du = '';
          $scope.formAddVerb.er_sie_es = '';
          $scope.formAddVerb.wir = '';
          $scope.formAddVerb.ihr = '';
          $scope.formAddVerb.sie_sie = '';
          $scope.formAddVerb.separable = undefined;
          
          displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });

      $scope.formAddVerb.separable = undefined;
    };
    
    $scope.getInfinitive = function() {
      $scope.formAddVerb.infinitive = $scope.formAddVerb.translation;
    };
});