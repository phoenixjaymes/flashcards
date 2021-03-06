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
    $scope.updateIds = {'pos':'sentence'};
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

    // Get ids to update
    $scope.getListOfIds = function(array) {
      var arrIds = [];
      
      for(var id in array) {
        if(arrIds.indexOf(array[id].id) === -1) {
          arrIds.push(array[id].id);
        }
      }
      return arrIds.join();
    };


    // Get list of sentenceWords
    $scope.getListOfSentences = function(pos) {
      cardsService.getSentences(pos, function(response) {
        $scope.listOfSentences = response.data;
        $scope.updateIds.ids = $scope.getListOfIds($scope.listOfSentences);
        $scope.getCurrentSentence(0);
      });
    };
    
    
    // Get current sentence
    $scope.getCurrentSentence = function(index) {
      $scope.crrntSentence.sentence = $scope.listOfSentences[index].sentence;
      $scope.crrntSentence.answer1 = $scope.listOfSentences[index].answer1;
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
        solution.push($scope.newSentence[i]); 
      }
      
      return solution.join(' ');
    };
    
    
    // Check answer
    $scope.checkSentence = function() {
      var newSolution = $scope.getNewSolution();
      
      if (!newSolution) {
        return;
      }
      
      if ($scope.crrntSentence.answer1 === newSolution) {
        $scope.showAnswerCorrect = true;
      } else {
        $scope.showAnswerIncorrect = true;
      }

     
      if ($scope.crrntSentenceNum === $scope.listOfSentences.length - 1) {
        $scope.showCheck = false;
        $scope.showContinue = false;
        $scope.showFinish = true;
        
        updateItemService.updateLastPracticed($scope.updateIds, function(response) {
          if (response.data.success === 'updated') {
            //$scope.message = 'Your words have been updated.';
          }
        });
        
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
      $scope.newSentence = [];
      $scope.getCurrentSentence($scope.crrntSentenceNum);
    };
    
    // Reset sentence variables
    $scope.resetSentences = function() {
      $scope.crrntSentenceNum = 0;
      $scope.showFinish = false;
      $scope.showAnswerCorrect = false;
      $scope.showAnswerIncorrect = false;
      
      $scope.showSentences = false;
      $scope.finalMessage = false;
      $scope.newSentence  = [];
      $scope.listOfSentences = undefined;
    };
});