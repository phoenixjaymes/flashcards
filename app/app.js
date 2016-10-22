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
      $scope.loggedIn = false;
      $scope.displayLogin = false;
      $scope.displayOptions = false;
      $scope.displayAddWord = false;
      $scope.displayUpdateWord = false;
      $scope.displayAddCategory = false;
      
      
      $scope.showOptions = function() {
        // Check if logged user is logged in
        if ($scope.loggedIn === false) {
          
          $scope.displayLogin = true;
          
          
          // temp Success on login
          $scope.loggedIn = true;
          
          
        } else if ($scope.loggedIn === true) {
          //
          $scope.displayOptions = !$scope.displayOptions;
        }
      };
      
      
      // Logging in and logging out
      $scope.logOut = function() {
        // Looged out
        // create login service
        $scope.loggedIn = false;
        // Hide options
        $scope.displayOptions = false;
      };
      
      
      // Display add and update forms
      $scope.displayForm = function(form) {
        if(form === 'addcategory') {
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = true;
          $scope.displayOptions = false;
        } else if (form === 'addword') {
          $scope.displayAddWord = true;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
          
        } else if (form === 'updateword') {
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = true;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        }
      };
      
      
      // Close modal windows
      $scope.$on('closeModal', function(evt) {
        $scope.displayLogin = false;
        $scope.displayAddWord = false;
        $scope.displayUpdateWord = false;
        $scope.displayAddCategory = false;
      });
      
      
      // Login to options
      $scope.$on('loginClick', function(evt) {
        // temp Success on login
        $scope.loggedIn = true;
        $scope.displayLogin = false;
      });
      
      
      // Add category
      $scope.$on('addCategoryClick', function(evt, args) {
        // temp Success add category
        $scope.displayAddCategory = false;
        console.log('Add category ' + args);
      });
      
      
      // Add word
      $scope.$on('addWordClick', function(evt) {
        // temp Success add word
        $scope.displayAddWord = false;
      });
      
      
      // Update word
      $scope.$on('updateWordClick', function(evt) {
        // temp Success update word
        $scope.displayUpdateWord = false;
      });
      
      // Register
      $scope.$on('registerClick', function(evt) {
        // temp Success update word
        $scope.displayUpdateWord = false;
      });
      
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
            $scope.gender = $scope.cards[card].gender;
            
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
 File     : login.js
 Date     : Oct 22, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .controller('Login', function($scope, adminService) {
      $scope.learner = {};
      
      $scope.login = function() {
        adminService.login($scope.learner, function(response) {
          console.log(response.data);
          
          
          if(response.data.success === 'true') {
            console.log('login sucessful');
          } else {
            console.log('login failed');
          }
        });
        
        //console.log($scope.user);
      };
      
      
      
      
      
      //$emit('loginClick')
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
  })
  .directive('login', function() {
    return {
      templateUrl : 'app/views/partials/login.html',
      'controller' : 'Login'
    };
  })
  .directive('addword', function() {
    return {
      templateUrl : 'app/views/partials/add-word.html'
    };
  })
  .directive('updateword', function() {
    return {
      templateUrl : 'app/views/partials/update-word.html'
    };
  })
  .directive('addcategory', function() {
    return {
      templateUrl : 'app/views/partials/add-category.html'
    };
  })
  .directive('register', function() {
    return {
      templateUrl : 'app/views/partials/register.html'
    };
  })
  .directive('closebutton', function() {
    return {
      templateUrl : 'app/views/partials/btn-close.html'
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

/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
    .service('adminService', function($http, $httpParamSerializerJQLike) {
      
      
      // Get words
      this.login = function(learner, callback) {
        var url = 'assets/inc/fc-login.php';
        var config = {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        
        //console.log('logging in: ' + learner);
        
        //$http.post(url, "user=john", config).then(callback);
        $http.post(url, $httpParamSerializerJQLike(learner), config).then(callback); 
      };
      
      
      
      
      // fc_learners
});

//# sourceMappingURL=app.js.map
