angular.module("HomeController", ['ngStorage', 'nemLogging',"ui-leaflet", 'ionic-datepicker'])

  .controller('mainController', function($scope, $ionicModal, $timeout, $state, $ionicHistory) {


      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
  })

  .controller("singinController", function($scope, $location,$http, $state, $ionicHistory) {

    var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";
    $ionicHistory.nextViewOptions({
       disableBack: true
     });
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

        });
     };
    })

  .controller("loginController",function($scope, $location, $state, $http, $ionicHistory, $localStorage) {

    var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";

    $scope.$storage = $localStorage.$default({
        liste:'',
        currentUser:'',
      });

    $ionicHistory.nextViewOptions({
       disableBack: true
     });

    $scope.login = function(){
      alert('etape1');

      var param = {
                  email : document.getElementById('email').value,
                  password : document.getElementById('password').value
                  }


      $http.post(BaseUrl + "login", param)
       .success(function(response) {
         console.log(response);
         if(response != ""){
           $scope.$storage.currentUser = response;
           console.log($scope.$storage.currentUser);

           console.log('super');

           $state.go('home');
           //$state.transitionTo("home");
           //console.log($localStorage.currentUser);
           }else {
             console.log("error" + response);
                  alert("Vos Identifiants de connexion sont invalides");
            }
       });
    };

    $scope.Deco = function() {
      console.log('ok');
      $localStorage.$reset();
      //$state.go("connexion");
      $state.transitionTo("connexion");
    };
  })

  .controller("profilController", function($scope, $location, $state){

  })

  .controller('mapCtrl', function($scope, $localStorage, $ionicGesture, $http, $state){
    var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";

    $scope.showEvent = function(){
      $http.get(BaseUrl + "Events")
        .success(function(data) {
          $scope.events = data;
          console.log($scope.events);
      });
    };

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
            var radius = e.accuracy / 2;
            L.marker(e.latlng,radius).addTo($scope.map);
            L.circle(e.latlng, radius).addTo($scope.map);
            console.log(e.accuracy);
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

      var $timeline = $('#timeline');
      $scope.swipeDown = function () {
        console.log('okok');

        $timeline.css('webkitTransform', 'translateY(' + 65 + 'vh)');
      };


      $scope.swipeUp = function () {
        console.log('okok');

        $timeline.css('webkitTransform', 'translateY(' + 0 + 'px)');
      };




  })

  .controller("eventController", function($scope, $location, $state, $ionicModal, $http, $localStorage){
    var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";

          $scope.$storage = $localStorage.$default({
            liste:'',
            currentUser:'',
          });

          $scope.currentDate = new Date();
          $scope.title = "Calendrier";
          var dateTime;
          $scope.datePickerCallback = function (val) {
          	if(typeof(val)==='undefined'){
          		console.log('Date not selected');
          	}else{
          		console.log('Selected date is : ', val);
              dateTime = val;
              console.log(val);
              console.log(dateTime);
          	}
          };


          var ipObj1 = {
            callback: function (val) {  //Mandatory
              console.log('Return value from the datepicker popup is : ' + val, new Date(val));
            },
            disabledDates: [            //Optional
              new Date(2016, 2, 16),
              new Date(2015, 3, 16),
              new Date(2015, 4, 16),
              new Date(2015, 5, 16),
              new Date('Wednesday, August 12, 2015'),
              new Date("08-16-2016"),
              new Date(1439676000000)
            ],
            from: new Date(2012, 1, 1), //Optional
            to: new Date(2016, 10, 30), //Optional
            inputDate: new Date(),      //Optional
            mondayFirst: true,          //Optional
            disableWeekdays: [0],       //Optional
            closeOnSelect: false,       //Optional
            templateType: 'popup'       //Optional
          };

          $scope.openDatePicker = function(){
          ionicDatePicker.openDatePicker(ipObj1);
        };

        $scope.Event = function() {
          console.log(dateTime);
          console.log($scope.$storage.currentUser[0].id);

                var param = {
                    id_orga : $scope.$storage.currentUser[0].id,
                    titre : document.getElementById("titre").value,
                    activity : document.getElementById("activity").value,
                    lieu : document.getElementById("lieu").value,
                    date : dateTime,
                  }
                  console.log(param);
                  //envoi du formulaire pour l'ajout de tache a faire
                $http.post(BaseUrl + "Event", param)
                  .success(function(response) {
                    console.log('ookook');
                    console.log(response);(response.message);
                    document.forms['addEvent'].reset();

                    $http.get(BaseUrl + "Events")
                      .success(function(data) {
                        $scope.events = data;
                        console.log($scope.events);
                    });
                });
             };

             $scope.showEvent = function(){
               $scope.listCanSwipe = true
               $http.get(BaseUrl + "Events")
                 .success(function(data) {
                   $scope.events = data;
                   console.log($scope.events);
               });
             }

             $scope.editEvent = function(){
               $scope.listCanSwipe = true
               $http.delete(BaseUrl + "Events")
                 .success(function(data) {
                   $scope.events = data;
                   console.log($scope.events);
               });
             }

             $scope.deleteEvent = function(event){
                var param = {
                              id : event.id ,
                            };
                $http.post(BaseUrl + "deleteEvent", param)
                   .success(function(data) {
                       $http.get(BaseUrl + "Events")
                         .success(function(data) {
                           $scope.events = data;
                           console.log($scope.events);
                       });
                   });
             };





  })
