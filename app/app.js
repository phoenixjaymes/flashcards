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
      $scope.displayAddPhrase = false;
      $scope.displayAddVerb = false;
      $scope.displayAddWord = false;
      $scope.displayUpdateWord = false;
      $scope.displayAddCategory = false;
      $scope.displayRegister = false;
      
      
      $scope.showOptions = function() {
        // Check if user is logged in
        if ($scope.loggedIn === false) {
          
          $scope.displayLogin = true;
          
          
          // temp Success on login
          //$scope.loggedIn = true;
          
          
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
      
      
      // Display admin forms
      $scope.displayForm = function(form) {
        if(form === 'addcategory') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = true;
          $scope.displayOptions = false;
        } else if (form === 'addphrase') {
          $scope.displayAddPhrase = true;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        } else if (form === 'addword') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = true;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
          
        } else if (form === 'updateword') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = false;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = true;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        } else if (form === 'addverb') {
          $scope.displayAddPhrase = false;
          $scope.displayAddVerb = true;
          $scope.displayAddWord = false;
          $scope.displayUpdateWord = false;
          $scope.displayAddCategory = false;
          $scope.displayOptions = false;
        }
      };
      
      
      // Close modal windows
      $scope.$on('closeModal', function(evt) {
        $scope.displayLogin = false;
        $scope.displayAddPhrase = false;
        $scope.displayAddVerb = false;
        $scope.displayAddWord = false;
        $scope.displayUpdateWord = false;
        $scope.displayAddCategory = false;
        $scope.displayRegister = false;
      });
      
      
      // Login to options
      $scope.$on('loginClick', function(evt, args) {
        
        if (args === true) {
          $scope.loggedIn = true;
          $scope.displayLogin = false;
          $scope.displayFormMessage = false;
        } else if (args === 'incorrect') {
          
          console.log('Please fill in all form fields.');
          
        } else if (args === 'match') {
          
          console.log('Learner or password incorrect.');
          
        } else if (args === 'register') {
          
          $scope.displayLogin = false;
          $scope.displayRegister = true;
          
          console.log('Please register.');
        } else {
          console.log('Unable to log you in at this time.');
        }
      });
      
      // Register click
      $scope.$on('registerClick', function(evt, args) {
        if (args === true) {
          $scope.loggedIn = true;
          $scope.displayRegister = false;
          $scope.displayFormMessage = false;
        } else if (args === 'incorrect') {
          
          console.log('Please fill in all form fields.');
        } else if (args === 'password') {
          
          console.log('Passwords are not the same');
        } else if (args === false) {
          
          console.log('Unable to register you at this time.');
        }
      });
      
      
      // Add category
      $scope.$on('addCategoryClick', function(evt, args) {
//        if(args === true) {
//          console.log('Category added successfully.');
//        } else if (args ===  'incorrect') {
//          console.log('Please fill in all form fields.');
//        } else if (args === 'duplicate') {
//          console.log('This category already exist.');
//        } else if (args === false) {
//          console.log('Unable to add category at this time.');
//        }
      });
      
      
      // Add word
      $scope.$on('addWordClick', function(evt, args) {
        
        if(args === true) {
          console.log('Word added successfully.');
        } else if (args ===  'incorrect') {
          console.log('Please fill in all form fields.');
        } else if (args === false) {
          console.log('Unable to add word at this time.');
        }
      });
      
      
      // Add Phrase
      $scope.$on('addPhraseClick', function(evt, args) {
        if(args === true) {
          console.log('Phrase added successfully.');
        } else if (args ===  'incorrect') {
          console.log('Please fill in all form fields.');
        } else if (args === 'duplicate') {
          console.log('This phrase already exist.');
        } else if (args === false) {
          console.log('Unable to add phrase at this time.');
        }
      });
      
      
      // Update word
      $scope.$on('updateWordClick', function(evt) {
        // temp Success update word
        //$scope.displayUpdateWord = false;
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
        "translation" : "Germany",
        "english"     : "Deutschland",
        "img"         : "flashcard-germany.svg",
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
  .controller('AddItem', function($scope, cardsService, addItemService) {
    $scope.word = {};
    $scope.verb = {"pos": "verb"};
    $scope.category = {"pos": "category"};
    $scope.phrase = {"pos" : "phrase"};
    $scope.posCategories;
    $scope.genderCategories;
    $scope.responseMessage;
    $scope.displayFormMessage = false;
      
    // Change category options
    $scope.getCategories = function(wordPos) {

      if ($scope.posCategories === undefined) {
        cardsService.getAllCategories(function(response) {
          
          $scope.posCategories = response.data.word;
          $scope.genderCategories = response.data.gender;

          
          // change gender for adjectives, to none

        });
      }
    };

    // Add word
    $scope.addItem = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.word, function(response) {
        // Check response message
        if(response.data.success === true) {
          displayMessage('true');
          $scope.$emit('addItemClick', true);
          
          // Clear form
          $scope.word.translation = '';
          $scope.word.english = '';
          $scope.word.img = '';
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addItemClick', 'duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addItemClick', 'incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addItemClick', false);
        }
      });
    }; 
    
    
    // Add verb
    $scope.addVerb = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.verb, function(response) {
        // Check response message
        if(response.data.success === true) {
          displayMessage('true');
          $scope.$emit('addVerbClick', true);
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addVerbClick', 'duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addVerbClick', 'incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addVerbClick', false);
        }
      });
    };
    
    
    // Add category
    $scope.addCategory = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.category, function(response) {
        // Check response message
        if(response.data.success === true) {
          displayMessage('true');
          $scope.$emit('addCategoryClick', true);
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addCategoryClick', 'duplicate');
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addCategoryClick', 'incorrect');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addCategoryClick', false);
        }
      });
    };
    
    
    // Add Phrase
    $scope.addPhrase = function() {
      $scope.displayFormMessage = false;
      
      addItemService.addItem($scope.phrase, function(response) {
        // Check response message
        if(response.data.success === true) {
          displayMessage('true');
          $scope.$emit('addPhraseClick', true);
        } else if (response.data.success === 'incorrect') {
          displayMessage('incorrect');
          $scope.$emit('addPhraseClick', 'incorrect');
        } else if (response.data.success === 'duplicate') {
          displayMessage('duplicate');
          $scope.$emit('addPhraseClick', 'duplicate');
        } else if (response.data.success === false) {
          displayMessage('false');
          $scope.$emit('addPhraseClick', false);
        }
      });
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
