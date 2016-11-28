/* 
 File     : app.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */
'use strict';

angular.module('flashcards', ['ngCookies']);
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
    .controller('Main', function($scope, $cookies) {
      $scope.loggedIn = false;
      $scope.displayOptions = false;
      
      $scope.formDisplay = {
        displayLogin        : false,
        displayOptions      : false,
        displayAddPhrase    : false,
        displayAddVerb      : false,
        displayAddWord      : false,
        displayUpdateWord   : false,
        displayAddCategory  : false,
        displayRegister     : false,
        displayListWords    : false
      };
      
      
      // Show login form or show admin options
      $scope.showOptions = function() {
        // Check if user is logged in
        if ($scope.loggedIn === false) {
          $scope.formDisplay.displayLogin = true;
        } else if ($scope.loggedIn === true) {
          $scope.displayOptions = !$scope.displayOptions;
        }
      };
      
      
      // Logging out
      $scope.logOut = function() {
        // Remove cookie
        $cookies.remove('loggedIn');
        // Set loggedIn 
        $scope.loggedIn = false;
        // Hide options
        $scope.displayOptions = false;
      };
      
      
      // Display admin forms
      $scope.displayForm = function(form) {  console.log(form);
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
      
      
      // Login to options
      $scope.$on('loginClick', function(evt, args) {
        // Clear and close login form or close form and show registration
        if (args === true) {
          // Set cookie
          $cookies.put('loggedIn', true);
          
          $scope.loggedIn = true;
          $scope.formDisplay.displayLogin = false;
          $scope.displayFormMessage = false;
        } else if (args === 'register') {
          $scope.formDisplay.displayLogin = false;
          $scope.displayRegister = true;
        }
      });
      
      
      // Register click
      $scope.$on('registerClick', function(evt, args) {
        // Clear and close form
        if (args === true) {
          $scope.loggedIn = true;
          $scope.formDisplay.displayRegister = false;
          $scope.displayFormMessage = false;
        }
      });
      
      // Check value of loggdIn cookie
      var checkLogin = function() {
        
        var loggedIn = $cookies.get('loggedIn');
        
        if (loggedIn) {
          $scope.loggedIn = true;
        } 
        
      };
      
      // Check if luser is logged in
      checkLogin();
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
        "translation" : "Germany",
        "english"     : "Deutschland",
        "img"         : "flashcard-germany.svg",
        "pos"         : "noun",
        "gender"      : "m"
      }];
      $scope.currentCard = 1;
      $scope.totalCards = $scope.cards.length;
      $scope.flip = false;
      $scope.showCategory = false;
      
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
          $scope.showCategory = false;
        } else if (cardPos === 'phrase') {
          $scope.getCards(cardPos);
          $scope.showCategory = false;
        } else if (cardPos === 'mixed') {
          $scope.getCards(cardPos);
          $scope.showCategory = false;
        } else {
          $scope.posCategory = $scope.cardAllCategories[cardPos];
          $scope.showCategory = true;
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
            $scope.ich = $sce.trustAsHtml($scope.cards[card].ich);
            $scope.du = $sce.trustAsHtml($scope.cards[card].du);
            $scope.er_sie_es = $sce.trustAsHtml($scope.cards[card].er_sie_es);
            $scope.wir = $sce.trustAsHtml($scope.cards[card].wir);
            $scope.ihr = $sce.trustAsHtml($scope.cards[card].ihr);
            $scope.sie_Sie = $sce.trustAsHtml($scope.cards[card].sie_Sie);
            
            $scope.image = $scope.cards[card].img;
            $scope.gender = $scope.cards[card].gender;
            
          }, 500);
        } else if ($scope.cardPos === 'phrase') {
          // Wait for card to flip over
          $timeout(function() {
            $scope.english = $scope.cards[card].english;
            $scope.translation = $sce.trustAsHtml($scope.cards[card].translation);
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
      
      // Flip front of card to back
      $scope.$on('cardFrontFlip', function(evt, args) {
        $scope.flip = args;
      });
      
      
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
    $scope.responseMessage;
    $scope.displayFormMessage = false;

    // Login
    $scope.loginLearner = function() {
      $scope.displayFormMessage = false;
      adminService.loginLearner($scope.learner, function(response) {

        if(response.data.success === true) {
          $scope.responseMessage = 'You have been logged in.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', true);
        } else if (response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', 'incorrect');
        } else if (response.data.success === 'match') {
          $scope.responseMessage = 'Learner or password incorrect.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', 'match');
        } else if (response.data.success === 'register') {
          $scope.responseMessage = 'Please register';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', 'register');
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to log you in at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('loginClick', false);
        }
      });
    };


    // Register user
    $scope.registerLearner = function() {
      $scope.displayFormMessage = false;
      adminService.registerLearner($scope.newLearner, function(response) {

        if (response.data.success === true) {
          $scope.responseMessage = 'You have been sucessfully registered.';
          $scope.displayFormMessage = true;
          $scope.$emit('registerClick', true);
        } else if(response.data.success === 'incorrect') {
          $scope.responseMessage = 'Please fill in all form fields.';
          $scope.displayFormMessage = true;
          $scope.$emit('registerClick', 'incorrect');
        } else if(response.data.success === 'password') {
          $scope.responseMessage = 'Passwords are not the same';
          $scope.displayFormMessage = true;
          $scope.$emit('registerClick', 'password');
        } else if (response.data.success === false) {
          $scope.responseMessage = 'Unable to register you at this time.';
          $scope.displayFormMessage = true;
          $scope.$emit('addWordClick', false);
          
        }
      });  
    };
});

/* 
 File     : addword.js
 Date     : Oct 23, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .controller('AddItem', function($scope, cardsService, addItemService) {;
    $scope.word = {};
    $scope.verb = {"pos": "verb"};
    $scope.category = {"pos": "category"};
    $scope.phrase = {"pos" : "phrase"};
    $scope.posCategories;
    $scope.genderCategories;
    $scope.responseMessage;
    $scope.displayFormMessage = false;
    $scope.showUpperCase = false;
    $scope.inputType;
    $scope.inputField;
      
    // Change category options
    $scope.getCategories = function(wordPos) {

      if ($scope.posCategories === undefined) {
        cardsService.getAllCategories(function(response) {
          
          $scope.posCategories = response.data.word;
          $scope.genderCategories = response.data.gender;
        });
      }
    };

    // Add word
    $scope.addItem = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.word, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.word.translation = '';
          $scope.word.english = '';
          $scope.word.img = '';
          
          displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });
    }; 
    
    
    // Add verb
    $scope.addVerb = function() {
      $scope.displayFormMessage = false;
      
      if(!$scope.verb.separable) {
        $scope.verb.separable = 'no';
      } else {
        $scope.verb.separable = 'yes';
      }
      
      addItemService.addItem($scope.verb, function(response) {
        // Check response message
        if(response.data.success === true) {
          // clear form
          $scope.verb.english = '';
          $scope.verb.translation = '';
          $scope.verb.ich = '';
          $scope.verb.du = '';
          $scope.verb.er_sie_es = '';
          $scope.verb.wir = '';
          $scope.verb.ihr = '';
          $scope.verb.sie_sie = '';
          $scope.verb.separable = undefined;
          
          displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });

      $scope.verb.separable = undefined;
    };
    
    
    // Add category
    $scope.addCategory = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.category, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.category.name = '';
          
          displayMessage('true');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });
    };
    
    
    // Add Phrase
    $scope.addPhrase = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.phrase, function(response) {
        // Check response message
        if(response.data.success === true) {
          // Clear form
          $scope.phrase.english = '';
          $scope.phrase.translation = '';
          
          displayMessage('true');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
        } else if (response.data.success === false) {
          displayMessage('false');
        }
      });
    };
    
    // Set which input umlaut should be added to
    $scope.umlautFocus = function(pos, propName) {
      $scope.inputType = pos;
      $scope.inputField = propName;
    };
    
    
    // Add Umlauts and special characters
    $scope.addCharacter = function(objName, propName, char) {
      if(!$scope.inputType || !$scope.inputField) {
        return;
      }
      
      if ($scope[$scope.inputType][$scope.inputField] === undefined) {
        $scope[$scope.inputType][$scope.inputField] = '';
      }
      
      $scope[$scope.inputType][$scope.inputField] = $scope[$scope.inputType][$scope.inputField] + char;
    };

    
    
    // Display message
    var displayMessage = function(message) {
      var objMessages = {
        'true' : 'Item added successfully.',
        'incorrect' : 'Please fill in all form fields.',
        'duplicate' : 'This item already exist.',
        'false' : 'Unable to add item at this time.'
      };
      
      $scope.responseMessage = objMessages[message];
      $scope.displayFormMessage = true;
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
  })
  .directive('dutch', function() {
    return {
      templateUrl : 'app/views/dutch.html'
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
  .directive('listWords', function() {
    return {
      templateUrl : 'app/views/partials/list-words.html'
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
        } else if (pos === 'phrase') {
          var url = 'assets/inc/fc-german.php?pos=' + pos;
        } else if (pos === 'mixed') {
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
      
      this.getAllCategories = function(callback) {
        var url = 'assets/inc/fc-german-categories.php?type=all';
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
      
      
      // Login learner
      this.loginLearner = function(learner, callback) {
        var url = 'assets/inc/fc-login.php';
        var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        
        $http.post(url, $httpParamSerializerJQLike(learner), config).then(callback); 
      };
      
      
      // Register new learner
      this.registerLearner = function(newLearner, callback) {
        var url = 'assets/inc/fc-register.php';
        var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        
        $http.post(url, $httpParamSerializerJQLike(newLearner), config).then(callback);
      };
      
});

/* 
 File     : words.service.js
 Date     : Sep 28, 2016
 Author   : Jaymes Young <jaymes@phoenixjaymes.com>
 */

'use strict';

angular.module('flashcards')
  .service('addItemService', function($http, $httpParamSerializerJQLike) {


    // Login learner
    this.addItem = function(item, callback) {
      var url = 'assets/inc/fc-add-item.php';
      var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};

      $http.post(url, $httpParamSerializerJQLike(item), config).then(callback); 
    };
      
});

//# sourceMappingURL=app.js.map
