/* 
 File     : cards.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Cards', function($scope, cardsService) {
      $scope.currentCard = 1;
      $scope.totalCards = 1;
      
      $scope.word = "Ich";
      $scope.definition = "I";
      
      // Set card
      var setCard = function(card) {
        $scope.word = $scope.cards[card].word;
        $scope.definition = $scope.cards[card].definition;
      };
      
      // Get cards
      cardsService.getWords(function(response) {
        $scope.cards = response.data;
        $scope.totalCards = $scope.cards.length;
        
        setCard(0);
      });
      
      
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
});