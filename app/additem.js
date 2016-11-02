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
      
    // Change category options
    $scope.getCategories = function(wordPos) {

      if ($scope.posCategories === undefined) {
        cardsService.getAllCategories(function(response) {
          
          $scope.posCategories = response.data.word;
          $scope.genderCategories = response.data.gender;

          
          // change gender for adjectives, to none

        });
      }
    };

    // Add word
    $scope.addItem = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.word, function(response) {
        // Check response message
        if(response.data.success === true) {
          displayMessage('true');
          $scope.$emit('addItemClick', true);
          
          // Clear form
          $scope.word.translation = '';
          $scope.word.english = '';
          $scope.word.img = '';
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addItemClick', 'duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addItemClick', 'incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addItemClick', false);
        }
      });
    }; 
    
    
    // Add verb
    $scope.addVerb = function() {
      $scope.displayFormMessage = false;
      
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
          
          
          displayMessage('true');
          $scope.$emit('addVerbClick', true);
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addVerbClick', 'duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addVerbClick', 'incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addVerbClick', false);
        }
      });
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
          $scope.$emit('addCategoryClick', true);
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addCategoryClick', 'duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addCategoryClick', 'incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addCategoryClick', false);
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
          $scope.$emit('addPhraseClick', true);
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addPhraseClick', 'incorrect');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addPhraseClick', 'duplicate');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addPhraseClick', false);
        }
      });
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