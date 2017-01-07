/* 
 File     : list-words.js
 Date     : 23 Oct 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('ListWords', function($scope, cardsService, updateItemService) {
    $scope.posCategories;
    $scope.genderCategories;
    $scope.responseMessage;
    $scope.displayFormMessage = false;
    $scope.showUpperCase = false;
    
    // Get categories from service
    var getAllCategories = function() {
      cardsService.getCategories(function(response) {
        $scope.cardAllCategories = response.data;
        
        $scope.genderCategories = response.data.gender;
        
      });
    };
      
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
      
      if (wordPos === 'adjective') {
        $scope.posCategoriesUpdate = $scope.cardAllCategories[wordPos];
        $scope.showCategoryWords = true;
      } else if (wordPos === 'noun') {
        $scope.posCategoriesUpdate = $scope.cardAllCategories[wordPos];

        $scope.showCategoryWords = true;
      } else if (wordPos === 'phrase') {

        $scope.getWordsUpdate(wordPos, '');
        $scope.showCategoryWords = false;
      } else if (wordPos === 'verb') {

        $scope.getWordsUpdate(wordPos, '');
        $scope.showCategoryWords = false;
      } else {
        //$scope.posCategory = $scope.cardAllCategories[cardPos];
        //$scope.showCategoryWords = true;
      }
    };


    // Get list of words
    $scope.getWordsUpdate = function(pos, category) {
      cardsService.getWordsUpdate(pos, category, function(response) {
        $scope.listOfWords = response.data;

        $scope.totalWords = $scope.listOfWords.length;
      });
    };
    
    
    
    // Find single word and fill in form
    $scope.$on('findItem', function(evt, args) {
      $scope.word.id = args;
      
      updateItemService.findItem($scope.word, function(response) {
       
        $scope.updateItem = response.data;
        
        if($scope.word.pos === 'adjective') {

          $scope.formUpdateAdjective.id = $scope.updateItem.item.id;
          $scope.formUpdateAdjective.category = $scope.updateItem.item.category;
          $scope.formUpdateAdjective.english = $scope.updateItem.item.english;
          $scope.formUpdateAdjective.translation = $scope.updateItem.item.translation;
          $scope.formUpdateAdjective.image = $scope.updateItem.item.image;
          
          $scope.$emit('displayUpdateForms', 'displayUpdateAdjective');


        } else if($scope.word.pos === 'category') {
          
          $scope.formUpdateCategory.id = $scope.updateItem.item.id;
          $scope.formUpdateCategory.english = $scope.updateItem.item.english;
          $scope.formUpdateCategory.translation = $scope.updateItem.item.translation;
          
          $scope.$emit('displayUpdateForms', 'displayUpdateCategory');

        } else if ($scope.word.pos === 'noun') {

          $scope.formUpdateNoun.id = $scope.updateItem.item.id;
          $scope.formUpdateNoun.category = $scope.updateItem.item.category;
          $scope.formUpdateNoun.english = $scope.updateItem.item.english;
          $scope.formUpdateNoun.translation = $scope.updateItem.item.translation;
          $scope.formUpdateNoun.image = $scope.updateItem.item.image;
          $scope.formUpdateNoun.gender = $scope.updateItem.item.gender;
          
          $scope.$emit('displayUpdateForms', 'displayUpdateNoun');
          
        } else if ($scope.word.pos === 'phrase') {

          $scope.formUpdatePhrase.id = $scope.updateItem.item.id;
          $scope.formUpdatePhrase.english = $scope.updateItem.item.english;
          $scope.formUpdatePhrase.translation = $scope.updateItem.item.translation;
          
          $scope.$emit('displayUpdateForms', 'displayUpdatePhrase');

        } else if ($scope.word.pos === 'verb') {

          $scope.formUpdateVerb.id = $scope.updateItem.item.id;
          
          
          
          if ($scope.updateItem.item.separable === 'yes') {
            $scope.formUpdateVerb.separable = true;
          } else {
            $scope.formUpdateVerb.separable = false;
          }
          
          
          $scope.formUpdateVerb.english = $scope.updateItem.item.english;
          $scope.formUpdateVerb.infinitive = $scope.updateItem.item.infinitive;
          $scope.formUpdateVerb.translation = $scope.updateItem.item.translation;
          $scope.formUpdateVerb.ich = $scope.updateItem.item.ich;
          $scope.formUpdateVerb.du = $scope.updateItem.item.du;
          $scope.formUpdateVerb.er_sie_es = $scope.updateItem.item.er_sie_es;
          $scope.formUpdateVerb.wir = $scope.updateItem.item.wir;
          $scope.formUpdateVerb.ihr = $scope.updateItem.item.ihr;
          $scope.formUpdateVerb.sie_sie = $scope.updateItem.item.sie_Sie;
          $scope.formUpdateVerb.image = $scope.updateItem.item.img;
          
          $scope.$emit('displayUpdateForms', 'displayUpdateVerb');
        }
        
      });
    });
    
    
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
    
    
    
    // Get categories
    getAllCategories();
});