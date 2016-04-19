angular.module("HomeController", ["firebase"])

  .controller('mainController', function($scope, $ionicModal, $timeout, $state, $ionicHistory) {
      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
  })
  //chat controller pour les discussions en directe
  .controller("tchatController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray, $firebaseAuth) {
      //CREATE A FIREBASE REFERENCE
      var ref = new Firebase("https://shining-heat-2587.firebaseio.com/message");

      // GET MESSAGES AS AN ARRAY
      $scope.messages = $firebaseArray(ref);
     // console.log($scope.messages);
      //$scope.users = $firebaseArray(users);

      //getAuth verifie si l'user est connecter et renvoie son uid
      var authData = ref.getAuth();
      //console.log(authData);

        ref.once("value", function(snapshot) {
          var hasName = snapshot.hasChild("message");
          // hasName === true
            //console.log(hasName);

        });

      //test authData a supprimer a la fin
      if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        console.log("User is logged out");
      }

     /* ref.once("value", function(snapshot) {
        var data = snapshot.val();
        console.log(data.user.name);
      });*/

      if (authData) {
        $scope.names = authData.uid;
      }else{
        $scope.names = "";
      }

      //ADD MESSAGE METHOD
      $scope.addMessage = function(e) {
      var authData = ref.getAuth();
      console.log(authData.uid);




        //LISTEN FOR RETURN KEY
        if (e.keyCode === 13 && $scope.msg) {
          //ALLOW CUSTOM OR ANONYMOUS USER NAMES
         // if (authData.uid == ) {};
         ref.once("value", function(snapshot) {
          var data = snapshot.val();
          console.log(data);
        });

          var name = $scope.name || "anonymous";
          // CREATE A UNIQUE ID
          var id = new Date().valueOf();

          var usersRef = ref.child("/message");
                usersRef.set({
                    id: id,
                });
          var idRef =  ref.child(id);
            idRef.set({
                id: id,
                name: name,
                body: $scope.msg
            });

          $scope.msg = "";


        // CREATE A UNIQUE ID
        /*var id = $scope.messages.length++;

          $scope.messages.$add({
              id: id,
              name: name,
              body: $scope.msg
          });*/
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

              //Ajout de l'utilisateur dans la branche User

            if (firstname !="" && name !="" && mail !="") {
              var usersRef = ref.child("id");
                usersRef.set({
                    id: id,
                });
              var idRef =  ref.child(id);
                idRef.set({
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

  .controller("profilController", function($scope, $firebaseArray, $firebaseAuth, $location, $state){
    var ref = new Firebase("https://shining-heat-2587.firebaseio.com/user");
    $scope.users = $firebaseArray(ref);

  })

  .controller('mapCtrl', function ($scope) {
    $scope.map = L.map('map').setView([51.505, -0.09], 13)
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'vasach.plk1gn8n',
      accessToken: 'pk.eyJ1IjoidmFzYWNoIiwiYSI6ImNpbXhxNWZnajAwZWJ3OGx5ZW5oam5jc2UifQ.jxlQK5wu7ByHtTk_WD_KRg'
    }).addTo($scope.map);

    $scope.location=function(){
      $scope.map.locate({setView: true, maxZoom: 15});
    }
    function onLocationFound(e) {
      L.marker(e.latlng).addTo($scope.map)

    }

    $scope.map.on('locationfound', onLocationFound);
  })
