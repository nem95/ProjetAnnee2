angular.module("HomeController", ["firebase"])

  .controller("tchatController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
      //CREATE A FIREBASE REFERENCE
      var ref = new Firebase("https://shining-heat-2587.firebaseio.com/user");

      // GET MESSAGES AS AN ARRAY
      $scope.messages = $firebaseArray(ref);

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
