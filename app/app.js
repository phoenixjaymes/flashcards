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
    .controller('Cards', function($scope, cardsService) {
      $scope.currentCard = 1;
      $scope.totalCards = 1;
      
      $scope.word = "Ich";
      $scope.definition = "I";
      
      // Set card
      var setCard = function(card) {
        $scope.word = $scope.cards[card].word;
        $scope.definition = $scope.cards[card].definition;
      };
      
      // Get cards
      cardsService.getWords(function(response) {
        $scope.cards = response.data;
        $scope.totalCards = $scope.cards.length;
        
        setCard(0);
      });
      
      
      
      $scope.nextCard = function() {
        // Check if number is out of bounds
        if ($scope.currentCard >= $scope.totalCards) {
          $scope.currentCard = 1;
        } else {
          $scope.currentCard++;
        }
        
        setCard($scope.currentCard - 1);
      };
      
      $scope.prevCard = function() {
        // Check if number is out of bounds
        if ($scope.currentCard <= 1) {
          $scope.currentCard = $scope.totalCards;
        } else {
          $scope.currentCard--;
        }
        
        setCard($scope.currentCard - 1);
      }; 
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
      this.getWords = function(callback) {
        $http.get('mock/german-words.json').then(callback);
      };
      
});
//# sourceMappingURL=app.js.map
