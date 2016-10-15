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
        // Wait for card to flip over
        $timeout(function() {
          $scope.english = $scope.cards[card].english;
          $scope.translation = $sce.trustAsHtml($scope.cards[card].translation) ;
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
        console.log(type);
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
        
        if (type === 'all') {
          var url = 'assets/inc/fc-german.php?category=all';
        } else {
          var url = 'assets/inc/fc-german.php?category=' + type;
        }
        
        $http.get(url).then(callback); 
      }; 
});

//# sourceMappingURL=app.js.map
