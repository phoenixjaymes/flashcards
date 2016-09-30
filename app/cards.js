/* 
 File     : cards.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Cards', function($scope, $timeout, cardsService) {
      $scope.currentCard = 1;
      $scope.totalCards = 1; 
      $scope.translation = 'Ich';
      $scope.english = 'I';
      $scope.flip = false;
      $scope.test = 'unflip';
      
      // Set card
      var setCard = function(card) {
        // Reset card
        $scope.flip = false;
        
        $timeout(function() {
          $scope.english = $scope.cards[card].english;
          $scope.translation = $scope.cards[card].translation;
          $scope.image = $scope.cards[card].img;
        }, 500);
        
          
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