/* 
 File     : directives.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .directive('home', function() {
    return {
      templateUrl : 'app/views/home.html'
    };
  })
  .directive('cards', function() {
    return {
      templateUrl : 'app/views/cards.html',
      controller  : 'Cards'
    };
  })
  .directive('words', function() {
    return {
      templateUrl : 'app/views/words.html',
      controller  : 'Words'
    };
  })
  .directive('dutch', function() {
    return {
      templateUrl : 'app/views/dutch.html'
    };
  })
  .directive('admin', function() {
    return {
      templateUrl : 'app/views/admin.html',
      controller  : 'Admin'
    };
  })
  .directive('login', function() {
    return {
      templateUrl : 'app/views/partials/login.html',
      controller : 'Login'
    };
  })
  .directive('register', function() {
    return {
      templateUrl : 'app/views/partials/register.html',
      controller : 'Login'
    };
  })
  .directive('formmessage', function() {
    return {
      templateUrl : 'app/views/partials/form-message.html'
    };
  })
  .directive('verbcard', function() {
    return {
      templateUrl : 'app/views/partials/verb-card.html'
    };
  })
  .directive('phrasecard', function() {
    return {
      templateUrl : 'app/views/partials/phrase-card.html'
    };
  })
  .directive('genericcard', function() {
    return {
      templateUrl : 'app/views/partials/generic-card.html'
    };
  })
  .directive('umlauts', function() {
    return {
      restrict : 'E',      
      templateUrl : 'app/views/partials/umlauts.html'
    };
  })
  .directive('listWords', function() {
    return {
      templateUrl : 'app/views/partials/list-words.html',
      controller: 'ListWords'
    };
  });
