/* 
 File     : directives.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .directive('addword', function() {
    return {
      templateUrl : 'app/views/partials/add-word.html',
      controller : 'AddItem'
    };
  })
  .directive('addverb', function() {
    return {
      templateUrl : 'app/views/partials/add-verb.html',
      controller : 'AddItem'
    };
  })
  .directive('addcategory', function() {
    return {
      templateUrl : 'app/views/partials/add-category.html',
      controller : 'AddItem'
    };
  })
  .directive('addphrase', function() {
    return {
      templateUrl : 'app/views/partials/add-phrase.html',
      controller : 'AddItem'
    };
  });
  
  
