/* 
 File     : update-directives.js
 Date     : 21 Dec 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .directive('updateAdjective', function() {
    return {
      templateUrl : 'app/views/partials/update-adjective.html',
      controller: 'UpdateAdjective'
    };
  })
  .directive('updateCategory', function() {
    return {
      templateUrl : 'app/views/partials/update-category.html',
      controller: 'UpdateCategory'
    };
  })
  .directive('updateNoun', function() {
    return {
      templateUrl : 'app/views/partials/update-noun.html',
      controller: 'UpdateNoun'
    };
  })
  .directive('updatePhrase', function() {
    return {
      templateUrl : 'app/views/partials/update-phrase.html',
      controller: 'UpdatePhrase'
    };
  })
  .directive('updateSentence', function() {
    return {
      templateUrl : 'app/views/partials/update-sentence.html',
      controller: 'UpdateSentence'
    };
  })
  .directive('updateVerb', function() {
    return {
      templateUrl : 'app/views/partials/update-verb.html',
      controller: 'UpdateVerb'
    };
  });