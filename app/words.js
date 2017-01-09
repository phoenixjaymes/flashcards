/* 
 File     : words.js
 Date     : 08 Jan 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Words', function($scope, cardsService, updateItemService) {
    $scope.updateIds = {};
    $scope.finalMessage = false;
    
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
        } else if (this.wordOneId !== undefined && this.wordTwoId === undefined) {
          this.wordTwoId = id;
          this.wordTwoIndex = index;
        }
        
        if((this.wordOneId === this.wordTwoId) && (this.wordOneIndex !== this.wordTwoIndex)) {

          if($scope.listOfWords.length === 2) {
            updateItemService.updateLastPracticed($scope.updateIds, function(response) {
              //console.log(response);
              if (response.data.success === 'updated') {
                $scope.message = 'Your words have been updated.';
              }
              
              $scope.finalMessage = true;
            });
          }

          if (this.wordOneIndex > this.wordTwoIndex) {
            $scope.listOfWords.splice(this.wordOneIndex, 1);
            $scope.listOfWords.splice(this.wordTwoIndex, 1);
          } else {
            $scope.listOfWords.splice(this.wordTwoIndex, 1);
            $scope.listOfWords.splice(this.wordOneIndex, 1);
          }

          this.wordOneId = undefined;
          this.wordTwoId = undefined;
          this.wordOneIndex = undefined;
          this.wordTwoIndex = undefined;

        } else {
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
      });
    };
});