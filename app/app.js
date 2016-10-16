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
      
      // Options for flash cards
      $scope.cardOptions = [
        {name : 'All',      value : 'all'},
        {name : 'Body',   value : '1'},
        {name : 'Colors',   value : '6'},
        {name : 'Clothing',  value : '2'},
        {name : 'Descriptions',  value : '7'},
        {name : 'Geography',  value : '3'},
        {name : 'Weather',  value : '4'},
        {name : 'Other',    value : '5'},
        {name : 'Leisure Time', value : '8'},
        {name : 'Places', value: '9'}
      ];
      
      
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
          
          console.log($scope.cards);

          
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
      
      // Flip back of card to front
      $scope.$on('cardBackFlip', function(evt, args) {
        $scope.flip = args;
      });
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
        console.log('Part of speech: ' + pos + ' - Category: ' + category);
//        if (type === 'body') {
//          var url = 'assets/inc/fc-german.php?category=body';
//        } else if (type === 'colors') {
//          var url = 'assets/inc/fc-german.php?category=colors'; 
//        } else if (type === 'clothing') {
//          var url = 'assets/inc/fc-german.php?category=clothing'; 
//        } else if (type === 'descriptions') {
//          var url = 'assets/inc/fc-german.php?category=descriptions';     
//        } else if (type === 'geography') {
//          var url = 'assets/inc/fc-german.php?category=geography';  
//        } else if (type === 'nature') {
//          var url = 'assets/inc/fc-german.php?category=nature';
//        } else {
//          var url = 'assets/inc/fc-german.php?category=none';   
//        }
        
        
        
        if (pos === 'noun') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=all';
        } else if (pos === 'verb') {
          var url = 'assets/inc/fc-german.php?pos=' + pos + '&category=all';
        } else {
          var url = 'assets/inc/fc-german.php?category=' + category;
        }
        
        
        
//        if (category === 'all') {
//          var url = 'assets/inc/fc-german.php?category=all';
//        } else {
//          var url = 'assets/inc/fc-german.php?category=' + category;
//        }
        
        $http.get(url).then(callback); 
      }; 
});

//# sourceMappingURL=app.js.map
