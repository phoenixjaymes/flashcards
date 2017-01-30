/* 
 File     : cards.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Cards', function($scope, $timeout, $sce, cardsService, preloader) {
      $scope.cardOptions = [
        {'value' : 'adjective', 'name' : 'Adj &amp; Adverbs'},
        {'value' : 'noun', 'name' : 'Nouns'},
        {'value' : 'verb', 'name' : 'Verbs'},
        {'value' : 'phrase', 'name' : 'Phrases'},
        {'value' : 'study', 'name' : 'Study'}      
      ];
      $scope.cardOptionsPos;
      $scope.updateIds = {};
      
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
      $scope.flipped = false;
      $scope.showCategory = false;
      $scope.showCards = false;
      
      
      
      // Change category options for cards
      // If pos is verb get verbs until verbs have categories
      $scope.changeCategory = function(cardPos) {
        if (cardPos === 'verb') {
          $scope.cardOptionsPos = cardPos;
          $scope.getCards(cardPos);
          $scope.showCategory = false;
          $scope.showCards = true;
        } else if (cardPos === 'phrase') {
          $scope.cardOptionsPos = cardPos;
          $scope.getCards(cardPos);
          $scope.showCategory = false;
          $scope.showCards = true;
        } else if (cardPos === 'study') {
          $scope.cardOptionsPos = cardPos;
          $scope.getCards(cardPos);
          $scope.showCategory = false;
          $scope.showCards = true;
        } else {
          $scope.cardOptionsPos = cardPos;
          $scope.posCategory = $scope.cardAllCategories[cardPos];
          $scope.showCategory = true;
        }
      };
      
      
      
      $scope.getListOfIds = function(array) {
        var arrIds = [];

        for(var id in array) {
          if(arrIds.indexOf(array[id].id) === -1) {
            arrIds.push(array[id].id);
          }
        }
        
        return arrIds.join();
      };
      
      $scope.getListOfImages = function(array) {
        var arrImages = [];

        for(var item in array) {
          if(arrImages.indexOf(array[item].img) === -1 && array[item].img !== 'none') {
            arrImages.push('assets/img/' + array[item].img);
          }
        }
        
        return arrImages;
      };
    
      
      // Get words
//      $scope.getWords = function(pos, category, sort) {
//        cardsService.getWords(pos, category, sort, function(response) {
//          $scope.listOfWords = response.data;
//          
////          console.log('GetWords ' + $scope.cards);
////          $scope.updateIds.ids = $scope.getListOfIds(response.data);
////          $scope.updateIds.pos = pos;
//          
//          $scope.showCards = true;
//          $scope.totalWords = $scope.listOfWords.length;
//          
//        });
//      };
      
      
      // Set card
      var setCard = function(card) {
        // Reset card
        $scope.flipped = false;
        $scope.changeCard = true;
        
        if ($scope.cardOptionsPos === 'verb') {
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
            
          }, 250);
          
          $timeout(function() {$scope.changeCard = false;}, 500);
        } else if ($scope.cardOptionsPos === 'phrase') {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
            $scope.image = $scope.cards[card].img;
            $scope.gender = $scope.cards[card].gender;
          }, 250);
          
          $timeout(function() {$scope.changeCard = false;}, 500);
        } else {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
            $scope.example = $sce.trustAsHtml($scope.cards[card].example);
            $scope.image = $scope.cards[card].img;
            $scope.gender = $scope.cards[card].gender;
          }, 250);
          
          $timeout(function() {$scope.changeCard = false;}, 500);
        }  
      };
      
      
      // Get cards
      $scope.getCards = function(pos, category, sort) {
        $scope.imagesArray = [];
        $scope.updateIds.pos = pos;
        
        if (pos === 'phrase') {
          $scope.showLoadingImg = false;
        } else {
          $scope.showLoadingImg = true;
        }
        
        
        cardsService.getWords(pos, category, sort, function(response) {
          $scope.cards = response.data;
          
          // Get Ids for updating
          if (pos !== 'phrase' && pos !== 'study') {
            $scope.updateIds.ids = $scope.getListOfIds(response.data);
          }
          
          // Get images for preloading
          if (pos !== 'phrase') {            
            $scope.imagesArray = $scope.getListOfImages(response.data);
          }
            
          
          // Get number of cards and set current card to 1
          $scope.totalCards = $scope.cards.length;
          $scope.currentCard = 1;
          
          // Preload images
          if ($scope.imagesArray.length !== 0) {
              preloader.preloadImages( $scope.imagesArray ).then(function() {
              console.log('succeeded loading images');
              setCard(0);
              $timeout(function() {
                $scope.showLoadingImg = false;
              }, 600);
              
            }, function() {
              console.log('failed loading images');
              setCard(0);
              $scope.showLoadingImg = false;
            });
          } else {
            setCard(0);
            $scope.showLoadingImg = false;
          }
           
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
        $scope.flipped = args;
      });
      
      
      // Flip back of card to front
      $scope.$on('cardBackFlip', function(evt, args) {
        $scope.flipped = args;
      });
      
      // Set initial card
      setCard(0);
});