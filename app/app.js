/* 
 File     : app.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */
'use strict';

angular.module('flashcards', []);
/* 
 File     : config.js
 Date     : Oct 7, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */
'use strict';

angular.module('flashcards')
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        
  // We must whitelist the JSONP endpoint that we are using to show that we trust it
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    'http://phoenixjaymes.com/data/**'
  ]);
}]);

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
    .controller('Cards', function($scope, $timeout, $sce, cardsService) {
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
      
      // Get categories from service
      var getAllCategories = function() {
        cardsService.getCategories(function(response) {
          $scope.cardAllCategories = response.data;
        });
      };
      
      // Change category options
      // If pos is verb get verbs until verbs have categories
      $scope.changeCategory = function(cardPos) {
        if (cardPos === 'verb') {
          $scope.getCards(cardPos);
        } else {
          $scope.posCategory = $scope.cardAllCategories[cardPos];
        }
      };
      
      // Set card
      var setCard = function(card) {
        // Reset card
        $scope.flip = false;
        
        if ($scope.cardPos === 'verb') {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
            $scope.ich = $scope.cards[card].ich;
            $scope.du = $scope.cards[card].du;
            $scope.er_sie_es = $scope.cards[card].er_sie_es;
            $scope.wir = $scope.cards[card].wir;
            $scope.ihr = $scope.cards[card].ihr;
            $scope.sie_Sie = $scope.cards[card].sie_Sie;
            
            
            $scope.image = $scope.cards[card].img;
            
          }, 500);
        } else {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
            $scope.image = $scope.cards[card].img;
            $scope.gender = $scope.cards[card].gender;
          }, 500);
        }  
      };
      
      
      // Get cards
      $scope.getCards = function(pos, category) {
        cardsService.getWords(pos, category, function(response) {
          $scope.cards = response.data;

          $scope.totalCards = $scope.cards.length;
          
          // Reset current card and set card
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
      
      
      // Flip back of card to front
      $scope.$on('cardBackFlip', function(evt, args) {
        $scope.flip = args;
      });
      
      // Set initial card
      setCard(0);
      
      // Get categories
      getAllCategories();
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
      this.getWords = function(pos, category, callback) {
        
        if (pos === 'adjective') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'noun') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=' + category;
        } else if (pos === 'verb') {
          var url = 'assets/inc/fc-german.php?pos=' + pos;
        } else {
          var url = 'assets/inc/fc-german.php?pos=noun&category=' + 1;
        }
        
        $http.get(url).then(callback); 
      };
      
      this.getCategories = function(callback) {
        var url = 'assets/inc/fc-german-categories.php';
        $http.get(url).then(callback);
      };
});

//# sourceMappingURL=app.js.map
