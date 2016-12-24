/* 
 File     : update-category.js
 Date     : Dec 21, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('UpdateCategory', function($scope, updateItemService) {
    $scope.updateCategory = function() {
      
      console.log('update category');
    };
  });