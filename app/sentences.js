/* 
 File     : sentences.js
 Date     : 30 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Sentences', function($scope, cardsService, updateItemService) {
    $scope.sentenceOptions = [
        {'value' : 'verb', 'name' : 'Get Sentences'}     
      ];
    $scope.updateIds = {};
    $scope.finalMessage = false;
    $scope.showSentences = false;
    $scope.newSentence = [];
    $scope.crrntSentence = {};
    $scope.crrntSentenceNum = 0;
    $scope.showAnswerCorrect = false;
    $scope.showAnswerIncorrect = false;
    $scope.showContinue = false;
    $scope.showCheck = false;
    $scope.showFinished = false;
    
    $scope.wordsClicked = {
      
      listWrdClk   : function(index) {
        // Remove item from list of words
        var wordOne = $scope.crrntSentence.listOfWords.splice(index, 1);
        $scope.showCheck = true;
        
        // Add word to sentence
        $scope.newSentence.push(wordOne[0]); 
      },
      sentenceWrdClk : function(index) {
        // Remove item from list of words
        var wordOne = $scope.newSentence.splice(index, 1);

        // Add word to sentence
        $scope.crrntSentence.listOfWords.push(wordOne[0]); 
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

    // Get words
    /* Get list of sentenceWords */
    $scope.getListOfSentences = function(pos) {
      cardsService.getSentences(pos, function(response) {
        $scope.listOfSentences = response.data;
        $scope.updateIds.ids = $scope.getListOfIds($scope.listOfSentences);
        
      });
    };
    
    
    $scope.getSentence = function(index) {
      $scope.crrntSentence.sentence = $scope.listOfSentences[index].sentence;
      $scope.crrntSentence.translation = $scope.listOfSentences[index].answer1;
      $scope.crrntSentence.listOfWords = $scope.listOfSentences[index].words;
      $scope.crrntSentence.solution = $scope.listOfSentences[index].solution1;
      
      $scope.showSentences = true;
    };
    
    
    $scope.getNewSolution = function() {
      var solution = [];
      if ($scope.newSentence.length === 0) {
        return false;
      }
      
      for (var i = 0; i < $scope.newSentence.length; i++) {
        solution.push($scope.newSentence[i].pos); 
      }
      
      return solution.join();
    };
    
    
    // Check answer
    $scope.checkSentence = function() {
      var newSolution = $scope.getNewSolution();
      if (!newSolution) {
        return;
      }
     
      // Compare answer with solution
      if ($scope.crrntSentence.solution === newSolution) {
        $scope.showAnswerCorrect = true;
      } else {
        $scope.showAnswerIncorrect = true;
      }
     
      if ($scope.crrntSentenceNum === $scope.listOfSentences.length - 1) {
        console.log('finished');
        console.log($scope.crrntSentenceNum + ' === ' + $scope.listOfSentences.length);
        $scope.showCheck = false;
        $scope.showContinue = false;
        $scope.showFinish = true;
      } else {
        $scope.showCheck = false;
        $scope.showContinue = true;
      }
    };
    
    // Get next sentences
    $scope.getNextSentence = function() {
      // That not at the end of sentences
      $scope.crrntSentenceNum++;
      
      $scope.showAnswerCorrect = false;
      $scope.showAnswerIncorrect = false;
      $scope.showContinue = false;
      $scope.showAnswer = false;
      $scope.showCheck = true;
      $scope.newSentence = [];
      $scope.getSentence($scope.crrntSentenceNum);
    };
    
    // Sentences for DB
    $scope.getListOfSentences('something');
    
});