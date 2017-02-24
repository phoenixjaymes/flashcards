/* 
 File     : words.js
 Date     : 08 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Words', function($scope, cardsService, updateItemService) {
    $scope.wordOptions = [
        {'value' : 'adjective', 'name' : 'Adj &amp; Adverbs'},
        {'value' : 'noun', 'name' : 'Nouns'},
        {'value' : 'verb', 'name' : 'Verbs'}     
      ];
    $scope.updateIds = {};
    $scope.finalMessage = false;
    $scope.showWords = false;
    $scope.wordmatchPos = '';
    
    $scope.wordsClicked = {
      wordOneId : undefined,
      wordTwoId : undefined,
      wordOneIndex  : undefined,
      wordTwoIndex  : undefined,
      wordClick    : function(index, id) {
        if (this.wordOneId === undefined) {
          this.wordOneId = id;
          this.wordOneIndex = index;
          return;
        } else if (this.wordOneIndex === index && this.wordTwoId === undefined) {
          this.wordOneId = undefined;
          this.wordOneIndex = undefined;
        } else if (this.wordOneId !== undefined && this.wordTwoId === undefined) {
          this.wordTwoId = id;
          this.wordTwoIndex = index;
        }
        
        
        if((this.wordOneId === this.wordTwoId) && (this.wordOneIndex !== this.wordTwoIndex)) {

          // If last words then show final message
          if($scope.listOfWords.length === 2) {
            updateItemService.updateLastPracticed($scope.updateIds, function(response) {
              //console.log(response);
              if (response.data.success === 'updated') {
                $scope.message = 'Your words have been updated.';
              }
              
              $scope.finalMessage = true;
            });
          }

          // Remove items in correct order
          if (this.wordOneIndex > this.wordTwoIndex) {
            $scope.listOfWords.splice(this.wordOneIndex, 1);
            $scope.listOfWords.splice(this.wordTwoIndex, 1);
          } else {
            $scope.listOfWords.splice(this.wordTwoIndex, 1);
            $scope.listOfWords.splice(this.wordOneIndex, 1);
          }
          
          // Reset ids and indexes
          this.wordOneId = undefined;
          this.wordTwoId = undefined;
          this.wordOneIndex = undefined;
          this.wordTwoIndex = undefined;

        } else {
          // Reset word two id and index
          this.wordTwoId = undefined;
          this.wordTwoIndex = undefined;
        } 
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
    $scope.getListOfWords = function(pos) {
      cardsService.getListOfWords(pos, function(response) {
        $scope.listOfWords = response.data;
        $scope.updateIds.ids = $scope.getListOfIds($scope.listOfWords);
        $scope.updateIds.pos = pos;
        $scope.wordmatchPos = pos;
        
        $scope.showWords = true;
      });
    };
});