/* 
 File     : admin.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Admin', function($scope) {
    $scope.formAddAdjective = {"pos": "adjective"};
    $scope.formAddCategory = {"pos": "category"};
    $scope.formAddNoun = {"pos": "noun", "translation":""};
    $scope.formAddPhrase = {"pos" : "phrase"};
    $scope.formAddVerb = {"pos": "verb", "translation":""};
    $scope.formUpdateAdjective = {"pos": "adjective"};
    $scope.formUpdateCategory = {"pos": "category"};
    $scope.formUpdateNoun = {"pos": "noun"};
    $scope.formUpdatePhrase = {"pos": "phrase"};
    $scope.formUpdateVerb = {"pos": "verb"};
    $scope.inputType;
    $scope.inputField;


    // Set which input umlaut should be added to
    $scope.umlautFocus = function(pos, propName) {
      $scope.inputType = pos;
      $scope.inputField = propName;
    };
    
    
    // Add Umlauts and special characters
    $scope.addCharacter = function(char) {
      if(!$scope.inputType || !$scope.inputField) {
        return;
      }
      
      if ($scope[$scope.inputType][$scope.inputField] === undefined) {
        $scope[$scope.inputType][$scope.inputField] = '';
      }
      
      $scope[$scope.inputType][$scope.inputField] = $scope[$scope.inputType][$scope.inputField] + char;
    };
    
    
    $scope.getArticle = function(form) {
      var rExpDer = /\bder\s/i;
      var rExpDie = /\bdie\s/i;
      var rExpDas = /\bdas\s/i;
      
      if(rExpDer.test($scope[form].translation)) {
        $scope[form].gender = '1'; 
      } else if (rExpDie.test($scope[form].translation)) {
        $scope[form].gender = '2';
      } else if(rExpDas.test($scope[form].translation)) {
        $scope[form].gender = '3';
      }
    };
    
    $scope.getBase = function(form) {
      $scope[form].base = $scope[form].translation.replace(/\bder\s|\bdie\s|\bdas\s/i, '');
    };
    
    $scope.getInfinitive = function(form) {
      $scope[form].infinitive = $scope[form].translation.replace(/·/g, '');
    };
    
    
    
    $scope.getStem = function(form) {
      var intLen = $scope[form].translation.length;
      var ending = $scope[form].translation.substring(intLen-2);
      
       if (ending === 'en') {
         return $scope[form].translation.substring(0, intLen-2);
       } else {
         return $scope[form].translation.substring(0, intLen-1);
       }
    };
    
    $scope.lstChrCheck = function(stem, person) {
      var strLastChr = stem.slice(-1);
      var regExp = /[dt]/; 
      
      if (regExp.test(strLastChr) && person === 'du') {
        return stem + 'est';
      } else if (person === 'du') {
        return stem + 'st';
      }
      
      if (regExp.test(strLastChr) && person === 'er') {
        return stem + 'et';
      } else if (person === 'er') {
        return stem + 't';
      }
      
      if (regExp.test(strLastChr) && person === 'ihr') {
        return stem + 'et';
      } else if (person === 'ihr') {
        return stem + 't';
      }
      
    };
    
    $scope.conjugateIch = function(form) {
      var stem = $scope.getStem(form);
      $scope[form].ich = stem + 'e';
    };
    
    
    $scope.conjugateDu = function(form) {
      var stem = $scope.getStem(form);
      $scope[form].du = $scope.lstChrCheck(stem, 'du');
    };
    
    
    $scope.conjugateEr = function(form) {
      var stem = $scope.getStem(form);
      $scope[form].er_sie_es = $scope.lstChrCheck(stem, 'er');
    };
    
    
    $scope.conjugateWir = function(form) {
      $scope[form].wir = $scope[form].translation;
    };
    
    
    $scope.conjugateIhr = function(form) {
      var stem = $scope.getStem(form);
      $scope[form].ihr = $scope.lstChrCheck(stem, 'ihr');
    };
    
    
    $scope.conjugateSie = function(form) {
      $scope[form].sie_sie = $scope[form].translation;
    };
    
    
    $scope.conjugateVerb = function(form) {
      $scope.conjugateIch(form);
      $scope.conjugateDu(form);
      $scope.conjugateEr(form);
      $scope.conjugateWir(form);
      $scope.conjugateIhr(form);
      $scope.conjugateSie(form);
    };
    
    
    // Display message
    $scope.displayMessage = function(message) {
      var objMessages = {
        'true'      : 'Item added successfully.',
        'updated'   : 'Item updated successfully.',
        'incorrect' : 'Please fill in all form fields.',
        'duplicate' : 'This item already exist.',
        'false'     : 'Unable to add item at this time.'
      };
      
      $scope.responseMessage = objMessages[message];
      $scope.displayFormMessage = true;
    };
});