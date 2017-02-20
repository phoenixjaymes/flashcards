/* 
 File     : admin.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('Admin', function($scope, cardsService) {
    $scope.formDisplay = {
      displayAddAdjective : false,
      displayAddCategory  : false,
      displayAddNoun      : false,
      displayAddPhrase    : false,
      displayAddSentence  : false,
      displayAddVerb      : false,
      displayListWords    : false,
      displayUpdateAdjective  : false,
      displayUpdateCategory   : false,
      displayUpdateNoun       : false,
      displayUpdatePhrase     : false,
      displayUpdateSentence   : false,
      displayUpdateVerb       : false
    };
    
    $scope.formAddAdjective = {"pos": "adjective"};
    $scope.formAddCategory = {"pos": "category"};
    $scope.formAddNoun = {"pos": "noun", "translation":""};
    $scope.formAddPhrase = {"pos" : "phrase"};
    $scope.formAddSentence = {"pos": "sentence"};
    $scope.formAddVerb = {"pos": "verb", "translation":""};
    
    $scope.formUpdateAdjective = {"pos": "adjective"};
    $scope.formUpdateCategory = {"pos": "category"};
    $scope.formUpdateNoun = {"pos": "noun"};
    $scope.formUpdatePhrase = {"pos": "phrase"};
    $scope.formUpdateSentence = {"pos": "sentence"};
    $scope.formUpdateVerb = {"pos": "verb"};
    $scope.inputType;
    $scope.inputField;
    $scope.inputId;
    
    // Get all admin categories from service
    $scope.getAdminCategories = function() {
      cardsService.getCategoriesAdmin(function(response) {
        $scope.cardAllCategories = response.data;
        $scope.catGeneric = response.data.generic;
        $scope.catSentences = response.data.sentence;
      });
    };


    // Set which input umlaut should be added to
    $scope.umlautFocus = function(pos, propName, id) {
      $scope.inputType = pos;
      $scope.inputField = propName;
      $scope.inputId = id;
    };
    
    
    // Add Umlauts and special characters
    $scope.addCharacter = function(char) {
      if(!$scope.inputType || !$scope.inputField) {
        return;
      }
        
      var ele = document.querySelector('#' + $scope.inputId);
      var eleStart = ele.selectionStart;
      var eleEnd = ele.selectionEnd;
      
      if ($scope[$scope.inputType][$scope.inputField] === undefined) {
        $scope[$scope.inputType][$scope.inputField] = '';
      }
      
      var word = $scope[$scope.inputType][$scope.inputField].split('');
      
      word.splice(eleStart, 0, char);
      $scope[$scope.inputType][$scope.inputField] = word.join('');
      
      ele.focus();
      ele.setSelectionRange(eleStart, eleEnd);
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
      // Remove information in parenthesis 
      $scope[form].base = $scope[form].base.replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, '');
    };
    
    $scope.removeParenthesis = function(word) {
      // Remove information in parenthesis and extra spaces 
      return word.replace(/\([\wÄÖÜäöü¨ß·-]*\)/i, '').trim();
    };
    
    $scope.getInfinitive = function(form) {
      // Remove middot
      $scope[form].infinitive = $scope[form].translation.replace(/·/g, '');
      // Remove information in parenthesis 
      $scope[form].infinitive = $scope.removeParenthesis($scope[form].infinitive);
    };
    
    
    $scope.getStem = function(form) {
      var word =  $scope.removeParenthesis($scope[form].translation); 
      var intLen = word.length;
      var ending = word.substring(intLen-2);
      
       if (ending === 'en') {
         return word.substring(0, intLen-2);
       } else {
         return word.substring(0, intLen-1);
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
      $scope[form].wir = $scope.removeParenthesis($scope[form].translation);
    };
    
    
    $scope.conjugateIhr = function(form) {
      var stem = $scope.getStem(form);
      $scope[form].ihr = $scope.lstChrCheck(stem, 'ihr');
    };
    
    
    $scope.conjugateSie = function(form) {
      $scope[form].sie_sie = $scope.removeParenthesis($scope[form].translation);
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
        'order'     : 'The word order is incorrect.',
        'false'     : 'Unable to add item at this time.'
      };
      
      console.log(message);
      
      $scope.responseMessage = objMessages[message];
      $scope.displayFormMessage = true;
    };
    
    
    // Display admin forms
    $scope.displayForm = function(form) {
      // Close all modals
      for (var prop in $scope.formDisplay) {
        $scope.formDisplay[prop] = false;
      }
      
      // Open selected modal
      $scope.formDisplay[form] = true;

      // Close options
      $scope.displayOptions = false;
    };
    
    
    // Close modal windows
    $scope.$on('closeModal', function(evt, args) {
      $scope.formDisplay[args] = false;

      // Don't show message box
      $scope.displayFormMessage = false;
    });
    
    
    // Display update forms
    $scope.$on('displayUpdateForms', function(evt, form) {

      // Open selected modal
      $scope.formDisplay[form] = true;
    });
    
    // Get Admin categories
    $scope.getAdminCategories();
    
});