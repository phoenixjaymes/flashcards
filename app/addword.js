/* 
 File     : addword.js
 Date     : Oct 23, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Addword', function($scope, cardsService, addwordService) {
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
    $scope.addWord = function() {
      $scope.displayFormMessage = false;
      
      addwordService.addWord($scope.word, function(response) {
        
        // Check response message
        if(response.data.success === true) {
          $scope.responseMessage = 'Word added successfully.';
          $scope.displayFormMessage = true;
          $scope.$emit('addWordClick', true);
          
        } else if (response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('addWordClick', 'incorrect');
          
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to add word at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('addWordClick', false);
          
        }
      });
    }; 
    
    
    // Add verb
    $scope.addVerb = function() {
      $scope.displayFormMessage = false;
      
      addwordService.addWord($scope.verb, function(response) {
        
        // Check response message
        if(response.data.success === true) {
          $scope.responseMessage = 'Word added successfully.';
          $scope.displayFormMessage = true;
          $scope.$emit('addVerbClick', true);
          
        } else if (response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('addVerbClick', 'incorrect');
          
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to add word at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('addVerbClick', false);
          
        }
      });
    };
    
    
    // Add category
    $scope.addCategory = function() {
      $scope.displayFormMessage = false;
      
      addwordService.addWord($scope.category, function(response) {
        
        // Check response message
        if(response.data.success === true) {
          $scope.responseMessage = 'Category added successfully.';
          $scope.displayFormMessage = true;
          $scope.$emit('addCategoryClick', true);
          
        } else if (response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('addCategoryClick', 'incorrect');
          
        } else if (response.data.success === 'duplicate') {
          $scope.responseMessage = 'This category already exist.';
          $scope.displayFormMessage = true;
          $scope.$emit('addCategoryClick', 'duplicate');
          
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to add category at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('addCategoryClick', false);
          
        }
      });
    };
    
    
    // Add Phrase
    $scope.addPhrase = function() {
      $scope.displayFormMessage = false;
      
      addwordService.addWord($scope.phrase, function(response) {
        
        // Check response message
        if(response.data.success === true) {
          $scope.responseMessage = 'Phrase added successfully.';
          $scope.displayFormMessage = true;
          $scope.$emit('addPhraseClick', true);
          
        } else if (response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('addPhraseClick', 'incorrect');
          
        } else if (response.data.success === 'duplicate') {
          $scope.responseMessage = 'This category already exist.';
          $scope.displayFormMessage = true;
          $scope.$emit('addPhraseClick', 'duplicate');
          
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to add Phrase at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('addPhraseClick', false);
          
        }
      });
    };
    
    
    
    
});