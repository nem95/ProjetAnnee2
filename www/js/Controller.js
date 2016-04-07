angular.module("HomeController", ["firebase"])

  //chat controller pour les discussions en directe
  .controller("tchatController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray, $firebaseAuth) {
      //CREATE A FIREBASE REFERENCE
      var ref = new Firebase("https://shining-heat-2587.firebaseio.com/message");

      // GET MESSAGES AS AN ARRAY
      $scope.messages = $firebaseArray(ref);
      //getAuth verifie si l'user est connecter et renvoie son uid
      var authData = ref.getAuth();
      console.log(authData);
      
      //test authData
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        console.log("User is logged out");
      }

      //ADD MESSAGE METHOD
      $scope.addMessage = function(e) {

        //LISTEN FOR RETURN KEY
        if (e.keyCode === 13 && $scope.msg) {
          //ALLOW CUSTOM OR ANONYMOUS USER NAMES
          var name = $scope.name || "anonymous";

          //ADD TO FIREBASE
          $scope.messages.$add({
            from: name,
            body: $scope.msg
          });

          //RESET MESSAGE
          $scope.msg = "";
        }
      }
    }
  ])

  .controller("singinController", ["$scope", "$firebaseArray","$firebaseAuth", "$location",
    function($scope, $firebaseArray, $firebaseAuth, $location, $state) {
      var ref = new Firebase("https://shining-heat-2587.firebaseio.com/user");

      $scope.users = $firebaseArray(ref);

      $scope.signUp = function() {

        ref.createUser({
          email    : $scope.mail,
          password : $scope.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            var id = userData.uid;
            var firstname = $scope.firstname;
            var name = $scope.name;
            var mail = $scope.mail;
            if (firstname !="" && name !="" && mail !="") {

              //Ajout de l'utilisateur dans la branche User
              $scope.users.$add({
                id: id,
                firstname: firstname,
                name: name,
                mail: mail
              });

              $location.path('login');
              console.log("Successfully created user account with uid:", userData.uid);
            }
            
          }
        });
      };
    }      
    
  ])

  .controller("loginController", ["$scope", "$firebaseArray","$firebaseAuth", "$location",
    function($scope, $firebaseArray, $firebaseAuth, $location, $state) {
      var ref = new Firebase("https://shining-heat-2587.firebaseio.com/user");
      $scope.login = function() {
        ref.authWithPassword({
          email    : $scope.mail,
          password : $scope.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            $location.path('/');
            console.log("Authenticated successfully with payload:", authData);
          }
        });
      }

    }
  ])



  
