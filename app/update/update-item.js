/* 
 File     : addword.js
 Date     : Oct 23, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('UpdateItem', function($scope, cardsService, updateItemService) {;
    $scope.word = {};
    $scope.verb = {"pos": "verb"};
    $scope.category = {"pos": "category"};
    $scope.phrase = {"pos" : "phrase"};
    $scope.posCategories;
    $scope.genderCategories;
    $scope.responseMessage;
    $scope.displayFormMessage = false;
    $scope.showUpperCase = false;
    $scope.inputType;
    $scope.inputField;
      
    // Change category options
    $scope.getCategories = function(wordPos) {

      if ($scope.posCategories === undefined) {
        cardsService.getAllCategories(function(response) {
          
          $scope.posCategories = response.data.word;
          $scope.genderCategories = response.data.gender;
        });
      }
    };
    
    
    // Change category options for word list
    $scope.posCategoryList;
    $scope.showCategoryWords = false;
    // If pos is verb get verbs until verbs have categories
    $scope.changeCategoryUpdate = function(wordPos) {
      console.log(wordPos);
      console.log($scope.cardAllCategories);
      if (wordPos === 'adjective') {
        $scope.posCategoriesUpdate = $scope.cardAllCategories[wordPos];
        //$scope.getWords(wordPos);


        $scope.showCategoryWords = true;
      } else if (wordPos === 'noun') {
        $scope.posCategoriesUpdate = $scope.cardAllCategories[wordPos];


        $scope.showCategoryWords = true;
      } else if (wordPos === 'phrase') {

        $scope.getWords(wordPos, '', true);
        $scope.showCategoryWords = false;
      } else if (wordPos === 'verb') {

        $scope.getWords(wordPos, '', true);
        $scope.showCategoryWords = false;
      } else {
        //$scope.posCategory = $scope.cardAllCategories[cardPos];
        //$scope.showCategoryWords = true;
      }
    };


    // Get list of words
    $scope.getWords = function(pos, category, sort) {
      cardsService.getWords(pos, category, sort, function(response) {
        $scope.listOfWords = response.data;

        $scope.totalWords = $scope.listOfWords.length;          
      });
    };
    
    
    
    // Find single word and fill in form
    $scope.$on('findWord', function(evt, args) {
      $scope.word.id = args;
      console.log('find word ' + args + ' ' + $scope.word.pos + ' ' + $scope.word.category);
      
      updateItemService.findWord($scope.word, function(response) {
        console.log(response.data);
        
        $scope.updateWord = response.data;
        console.log($scope.updateWord.item.english);
        console.log($scope.updateWord.item.translation);
        console.log($scope.updateWord.item.image);
        
        $scope.word.english = $scope.updateWord.item.english;
        $scope.word.translation = $scope.updateWord.item.translation;
        $scope.word.image = $scope.updateWord.item.image;
      });
      
    });
    
    
    
      
    
    
    
    
    
    

    // Update word
    $scope.addItem = function() {
      $scope.displayFormMessage = false;
      
      updateItemService.updateItem($scope.word, function(response) {
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
    
    
    // Update verb
    $scope.addVerb = function() {
      $scope.displayFormMessage = false;
      
      if(!$scope.verb.separable) {
        $scope.verb.separable = 'no';
      } else {
        $scope.verb.separable = 'yes';
      }
      
      updateItemService.updateItem($scope.verb, function(response) {
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
    
    
    // Uupdate category
    $scope.addCategory = function() {
      $scope.displayFormMessage = false;
      
      updateItemService.updateItem($scope.category, function(response) {
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
    
    
    // Update Phrase
    $scope.addPhrase = function() {
      $scope.displayFormMessage = false;
      
      updateItemService.updateItem($scope.phrase, function(response) {
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
    
    // Set which input umlaut should be added to
    $scope.umlautFocus = function(pos, propName) {
      $scope.inputType = pos;
      $scope.inputField = propName;
    };
    
    
    // Add Umlauts and special characters
    $scope.addCharacter = function(objName, propName, char) {
      if(!$scope.inputType || !$scope.inputField) {
        return;
      }
      
      if ($scope[$scope.inputType][$scope.inputField] === undefined) {
        $scope[$scope.inputType][$scope.inputField] = '';
      }
      
      $scope[$scope.inputType][$scope.inputField] = $scope[$scope.inputType][$scope.inputField] + char;
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