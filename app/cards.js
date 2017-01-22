/* 
 File     : cards.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Cards', function($scope, $timeout, $sce, cardsService) {
      // Default card
      $scope.cards = [{
        "translation" : "Germany",
        "english"     : "Deutschland",    
        "img"         : "flashcard-germany.svg",
        "pos"         : "noun",
        "gender"      : "m"
      }];
      $scope.currentCard = 1;
      $scope.totalCards = $scope.cards.length;
      $scope.flip = false;
      $scope.showCategory = false;
      $scope.showCards = false;
      
      
      
      // Change category options for cards
      // If pos is verb get verbs until verbs have categories
      $scope.changeCategory = function(cardPos) {
        if (cardPos === 'verb') {
          $scope.getCards(cardPos);
          $scope.showCategory = false;
          $scope.showCards = true;
        } else if (cardPos === 'phrase') {
          $scope.getCards(cardPos);
          $scope.showCategory = false;
          $scope.showCards = true;
        } else if (cardPos === 'study') {
          $scope.getCards(cardPos);
          $scope.showCategory = false;
          $scope.showCards = true;
        } else {
          $scope.posCategory = $scope.cardAllCategories[cardPos];
          $scope.showCategory = true;
        }
      };
      
      // Change category options for word list
      $scope.posCategoryList;
      $scope.showCategoryWords = false;
      // If pos is verb get verbs until verbs have categories
      $scope.changeCategoryLW = function(wordPos) {
        if (wordPos === 'adjective') {
          $scope.posCategoryList = $scope.cardAllCategories[wordPos];
          $scope.showCategoryWords = true;
        } else if (wordPos === 'noun') {
          $scope.posCategoryList = $scope.cardAllCategories[wordPos];
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
      
      
      // Get words
      $scope.getWords = function(pos, category, sort) {
        cardsService.getWords(pos, category, sort, function(response) {
          $scope.listOfWords = response.data;

          $scope.totalWords = $scope.listOfWords.length;          
        });
      };
      
      
      
      
      
      
      // Set card
      var setCard = function(card) {
        // Reset card
        $scope.flip = false;
        
        if ($scope.cardPos === 'verb') {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
            $scope.example = $sce.trustAsHtml($scope.cards[card].example);
            $scope.ich = $sce.trustAsHtml($scope.cards[card].ich);
            $scope.du = $sce.trustAsHtml($scope.cards[card].du);
            $scope.er_sie_es = $sce.trustAsHtml($scope.cards[card].er_sie_es);
            $scope.wir = $sce.trustAsHtml($scope.cards[card].wir);
            $scope.ihr = $sce.trustAsHtml($scope.cards[card].ihr);
            $scope.sie_Sie = $sce.trustAsHtml($scope.cards[card].sie_Sie);
            
            $scope.image = $scope.cards[card].img;
            $scope.gender = $scope.cards[card].gender;
            
          }, 500);
        } else if ($scope.cardPos === 'phrase') {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
            $scope.image = $scope.cards[card].img;
            $scope.gender = $scope.cards[card].gender;
          }, 500);
        } else {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
            $scope.example = $sce.trustAsHtml($scope.cards[card].example);
            $scope.image = $scope.cards[card].img;
            $scope.gender = $scope.cards[card].gender;
          }, 500);
        }  
      };
      
      
      // Get cards
      $scope.getCards = function(pos, category, sort) {
        cardsService.getWords(pos, category, sort, function(response) {
          $scope.cards = response.data;

          $scope.totalCards = $scope.cards.length;
          
          // Reset current card and set card
          $scope.currentCard = 1;
          setCard(0);
          
        });
      };
      
      
      // Go to next card
      $scope.nextCard = function() {
        // Check if number is out of bounds
        if ($scope.currentCard >= $scope.totalCards) {
          $scope.currentCard = 1;
        } else {
          $scope.currentCard++;
        }
        
        setCard($scope.currentCard - 1);
      };
      
      
      // Go to previous card
      $scope.prevCard = function() {
        // Check if number is out of bounds
        if ($scope.currentCard <= 1) {
          $scope.currentCard = $scope.totalCards;
        } else {
          $scope.currentCard--;
        }
        
        setCard($scope.currentCard - 1);
      };
      
      // Flip front of card to back
      $scope.$on('cardFrontFlip', function(evt, args) {
        $scope.flip = args;
      });
      
      
      // Flip back of card to front
      $scope.$on('cardBackFlip', function(evt, args) {
        $scope.flip = args;
      });
      
      // Set initial card
      setCard(0);
});