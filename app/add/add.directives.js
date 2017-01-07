/* 
 File     : add.directives.js
 Date     : 21 Dec 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
.directive('addAdjective', function() {
    return {
      templateUrl : 'app/views/partials/add-adjective.html',
      controller : 'AddAdjective'
    };
  })
  .directive('addCategory', function() {
    return {
      templateUrl : 'app/views/partials/add-category.html',
      controller : 'AddCategory'
    };
  })
  .directive('addNoun', function() {
    return {
      templateUrl : 'app/views/partials/add-noun.html',
      controller : 'AddNoun'
    };
  })
  .directive('addPhrase', function() {
    return {
      templateUrl : 'app/views/partials/add-phrase.html',
      controller : 'AddPhrase'
    };
  })
  .directive('addVerb', function() {
    return {
      templateUrl : 'app/views/partials/add-verb.html',
      controller : 'AddVerb'
    };
  });
  
  
