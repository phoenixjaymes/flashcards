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
  .directive('login', function() {
    return {
      templateUrl : 'app/views/partials/login.html',
      controller : 'Login'
    };
  })
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
  .directive('updateword', function() {
    return {
      templateUrl : 'app/views/partials/update-word.html'
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
  })
  .directive('register', function() {
    return {
      templateUrl : 'app/views/partials/register.html',
      controller : 'Login'
    };
  })
  .directive('closebutton', function() {
    return {
      templateUrl : 'app/views/partials/btn-close.html'
    };
  })
  .directive('formmessage', function() {
    return {
      templateUrl : 'app/views/partials/form-message.html'
    };
  });
  
  
