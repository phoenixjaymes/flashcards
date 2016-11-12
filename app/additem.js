/* 
 File     : addword.js
 Date     : Oct 23, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddItem', function($scope, cardsService, addItemService) {
    $scope.word = {};
    $scope.verb = {"pos": "verb"};
    $scope.category = {"pos": "category"};
    $scope.phrase = {"pos" : "phrase"};
    $scope.posCategories;
    $scope.genderCategories;
    $scope.responseMessage;
    $scope.displayFormMessage = false;
    $scope.showUpperCase = false;
      
    // Change category options
    $scope.getCategories = function(wordPos) {

      if ($scope.posCategories === undefined) {
        cardsService.getAllCategories(function(response) {
          
          $scope.posCategories = response.data.word;
          $scope.genderCategories = response.data.gender;
        });
      }
    };

    // Add word
    $scope.addItem = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.word, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.word.translation = '';
          $scope.word.english = '';
          $scope.word.img = '';
          
          displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });
    }; 
    
    
    // Add verb
    $scope.addVerb = function() {
      $scope.displayFormMessage = false;
      
      if(!$scope.verb.separable) {
        $scope.verb.separable = 'no';
      } else {
        $scope.verb.separable = 'yes';
      }
      
      addItemService.addItem($scope.verb, function(response) {
        // Check response message
        if(response.data.success === true) {
          // clear form
          $scope.verb.english = '';
          $scope.verb.translation = '';
          $scope.verb.ich = '';
          $scope.verb.du = '';
          $scope.verb.er_sie_es = '';
          $scope.verb.wir = '';
          $scope.verb.ihr = '';
          $scope.verb.sie_sie = '';
          $scope.verb.separable = undefined;
          
          displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });

      $scope.verb.separable = undefined;
    };
    
    
    // Add category
    $scope.addCategory = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.category, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.category.name = '';
          
          displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });
    };
    
    
    // Add Phrase
    $scope.addPhrase = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.phrase, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.phrase.english = '';
          $scope.phrase.translation = '';
          
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
    
    // Add Umlauts and special characters
    $scope.addCharacter = function(objName, propName, char) {
      if ($scope[objName][propName] === undefined) {
        $scope[objName][propName] = '';
      }
      
      $scope[objName][propName] = $scope[objName][propName] + char;
    };
    
    
    // Display message
    var displayMessage = function(message) {
      var objMessages = {
        'true' : 'Item added successfully.',
        'incorrect' : 'Please fill in all form fields.',
        'duplicate' : 'This item already exist.',
        'false' : 'Unable to add item at this time.'
      };
      
      $scope.responseMessage = objMessages[message];
      $scope.displayFormMessage = true;
    };
    
});