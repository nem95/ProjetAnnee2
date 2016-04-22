angular.module("HomeController", ['nemLogging',"ui-leaflet"])

  .controller('mainController', function($scope, $ionicModal, $timeout, $state, $ionicHistory) {


      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
  })

  .controller("singinController", function($scope, $location,$http, $state) {

    var BaseUrl = "http://localhost/projetannee2/ProjetAnnee2API/v1/";
    $scope.signUp = function() {
        //$scope.addtodo = {}
        var param = {
          firstname : document.getElementById("firstname").value,
          name      : document.getElementById("name").value,
          email     : document.getElementById("email").value,
          password  : document.getElementById("password").value,
          }
          console.log(param);
          //envoi du formulaire pour l'ajout de tache a faire
        $http.post(BaseUrl + "addUser", param)
          .success(function(data) { console.log();(data.message);
            //document.forms['addtodo'].reset();
          /*  $http.get(BaseUrl + "todoBur")
              .success(function(data) {
                $scope.todos = data;
                console.log($scope.todos);
                //$scope.modal.hide();
                //$window.location.reload();
            });*/
        });
     };
    })

  .controller("loginController",function($scope, $location, $state) {
    })

  .controller("profilController", function($scope, $location, $state){

  })

  .controller('mapCtrl',['$scope',function($scope){
    angular.extend($scope,{

      layers: {
        baselayers: {
          mapbox_light: {
            name: 'Mapbox Light',
            url: 'https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            layerOptions: {
              apikey: 'pk.eyJ1IjoidmFzYWNoIiwiYSI6ImNpbXhxNWZnajAwZWJ3OGx5ZW5oam5jc2UifQ.jxlQK5wu7ByHtTk_WD_KRg',
              mapid: 'vasach.plk1gn8n'
            }
          },
        }
      },

      center: {
        lat: 48.019324184801185,
        lng: 3.427734375,
        zoom: 8,
        autoDiscover: false
      },

    })
  }])
