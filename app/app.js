/* 
 File     : app.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */
'use strict';

angular.module('flashcards', []);
/* 
 File     : main.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Main', function($scope) {
      
});
/* 
 File     : cards.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Cards', function($scope, $timeout, cardsService) {
      // Default card
      $scope.cards = [{
        "translation" : "Ich",
        "english"     : "I",
        "img"         : "white.gif",
        "pos"         : "noun",
        "gender"      : "m"
      }];
      $scope.currentCard = 1;
      $scope.totalCards = $scope.cards.length;
      $scope.flip = false;
      
      // Options for flash cards
      $scope.cardOptions = [
        {name : 'All',      value : 'all'},
        {name : 'Colors',   value : 'colors'},
        {name : 'Clothes',  value : 'clothes'},
        {name : 'Other',    value : 'other'}
      ];
      
      
      // Set card
      var setCard = function(card) {
        // Reset card
        $scope.flip = false;
        // Wait for card to flip over
        $timeout(function() {
          $scope.english = $scope.cards[card].english;
          $scope.translation = $scope.cards[card].translation;
          $scope.image = $scope.cards[card].img;
          $scope.gender = $scope.cards[card].gender;
        }, 500);   
      };
      
      
      // Get cards
      $scope.getCards = function(type) {
        cardsService.getWords(type, function(response) {
          $scope.cards = response.data;
          $scope.totalCards = $scope.cards.length;
          // Reset current card
          $scope.currentCard = 1;
          setCard(0);
        });
      };
      
      
      // Go to next card
      $scope.nextCard = function() {
        // Check if number is out of bounds
        if ($scope.currentCard >= $scope.totalCards) {
          $scope.currentCard = 1;
        } else {
          $scope.currentCard++;
        }
        
        setCard($scope.currentCard - 1);
      };
      
      
      // Go to previous card
      $scope.prevCard = function() {
        // Check if number is out of bounds
        if ($scope.currentCard <= 1) {
          $scope.currentCard = $scope.totalCards;
        } else {
          $scope.currentCard--;
        }
        
        setCard($scope.currentCard - 1);
      };
      
      
      // Set initial card
      setCard(0);
});
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
  });
/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('cardsService', function($http) {
      // Get words
      this.getWords = function(type, callback) {
        
        if (type === 'colors') {
          $http.get('mock/german-colors.json').then(callback);
        } else if (type === 'clothes') {
          $http.get('mock/german-clothes.json').then(callback);
        } else if (type === 'other') {
          $http.get('mock/german-other.json').then(callback);
        } else {
          $http.get('mock/german-words.json').then(callback);
        } 
      }; 
});
//# sourceMappingURL=app.js.map
