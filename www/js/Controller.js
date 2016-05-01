angular.module("HomeController", ['nemLogging',"ui-leaflet"])

  .controller('mainController', function($scope, $ionicModal, $timeout, $state, $ionicHistory) {


      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
  })

  .controller("singinController", function($scope, $location,$http, $state, $ionicHistory) {

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
          .success(function(data) { console.log(data.message);(data.message);
            $location.path("home")
            $ionicHistory.nextViewOptions({
             disableBack: true
           });
        });
     };
    })

  .controller("loginController",function($scope, $location, $state) {
    })

  .controller("profilController", function($scope, $location, $state){

  })

  .controller('mapCtrl',['$scope',function($scope){
    $scope.map = L.map('map').setView([48.77067246880509, 3.251953125], 7);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'vasach.plk1gn8n',
        accessToken: 'pk.eyJ1IjoidmFzYWNoIiwiYSI6ImNpbXhxNWZnajAwZWJ3OGx5ZW5oam5jc2UifQ.jxlQK5wu7ByHtTk_WD_KRg',
    }).addTo($scope.map);
    L.control.zoom({position: 'bottomleft'}).addTo($scope.map);

    $scope.map.locate({setView: true, maxZoom: 16});
      $scope.map.on('locationfound', onLocationFound);
      var markerLocation=0;
    function onLocationFound(e) {
        //console.log(e);
        // e.heading will contain the user's heading (in degrees) if it's available, and if not it will be NaN. This would allow you to point a marker in the same direction the user is pointed.

        if(markerLocation != 1){
            markerLocation=1;
            L.marker(e.latlng).addTo($scope.map);
        }


        else{
            console.log('salut');
            markerLocation=1;
        }
    }


      ///////////////////////
      var locationBtn= L.Control.extend({
          options: ({position: 'bottomleft'}),
          onAdd:function(map){
              var container= L.DomUtil.create('div','leaflet-bar leaflet-control leaflet-control-custom');
              container.style.backgroundColor = 'white';
              container.style.backgroundImage = "url(http://t1.gstatic.com/images?q=tbn:ANd9GcR6FCUMW5bPn8C4PbKak2BJQQsmC-K9-mbYBeFZm1ZM2w2GRy40Ew)";
              container.style.backgroundSize = "30px 30px";
              container.style.width = '30px';
              container.style.height = '30px';
              container.onclick= function(){
                  $scope.map.locate({setView: true, maxZoom: 16});
              }
              return container;
          }
      });
      $scope.map.addControl(new locationBtn());
  }])
