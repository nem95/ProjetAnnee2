angular.module("HomeController", ['ngStorage', 'nemLogging', 'ionic-datepicker'])

  .controller('mainController', function($scope, $ionicModal, $timeout, $state, $ionicHistory, $localStorage) {

    $scope.$storage = $localStorage.$default({
        liste:'',
        currentUser:'',
      });
      console.log($scope.$storage.currentUser);

      $scope.toggleLeft = function() {
        $ionicSideMenuDelegate.toggleLeft();
      };
  })

  .controller("singinController", function($scope, $location,$http, $state, $ionicHistory) {

      //MAMP
      //var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";
      //WAMP
      var BaseUrl = "http://localhost/projetannee2/ProjetAnnee2API/v1/";
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

      //MAMP
      //var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";
      //WAMP
      var BaseUrl = "http://localhost/projetannee2/ProjetAnnee2API/v1/";

    $scope.$storage = $localStorage.$default({
        liste:'',
        currentUser:'',
      });
      console.log($scope.$storage.currentUser)

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
      $scope.$storage = $localStorage.$default({
          liste:'',
          currentUser:'',
      });
      console.log($scope.$storage.currentUser)

    $scope.Deco = function() {
      console.log('ok');
      $localStorage.$reset();
      //$state.go("connexion");
      $state.transitionTo("login");
    };
  })

  .controller("profilController", function($scope, $location,$http, $state, $ionicHistory, $localStorage,$stateParams){
      //MAMP
      //var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";
      //WAMP
      var BaseUrl = "http://localhost/projetannee2/ProjetAnnee2API/v1/";
      $scope.$storage = $localStorage.$default({
          liste:'',
          currentUser:'',
      });
      //console.log($scope.$storage.currentUser)

      $scope.Deco = function() {
          console.log('ok');
          $localStorage.$reset();
          //$state.go("connexion");
          $state.transitionTo("login");
      };

      $scope.loadProfilCu = function(data){
          var param = {
              id : $scope.$storage.currentUser[0].id
          }
          //console.log(param);

          $http.post(BaseUrl + "getProfilCu", param).success(function (data) {
              $scope.pageProfil = data;
              //console.log($scope.pageProfil);
          });
      };
      $scope.loadProfil = function(data){
          console.log($stateParams.id);

          var param = {
              id : $stateParams.id
          }
          console.log(param);

          $http.post(BaseUrl + "getUser", param).success(function (data) {
              $scope.User = data;
              console.log($scope.User);
          });
      };



  })



    /*****TAB****/
    .controller('TabController', function(){
        this.tab = 1;

        this.setTab = function(newValue){
            this.tab = newValue;
        };

        this.isSet = function(tabName){
            return this.tab === tabName;
        };
    })






    /****MAP***/

  .controller('mapCtrl', function($scope, $localStorage, $ionicGesture, $http, $state, $window, $stateParams){



      //MAMP
      //var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";
      //WAMP
      var BaseUrl = "http://localhost/projetannee2/ProjetAnnee2API/v1/";

    $scope.reloadRoute = function() {
      $window.location.reload(true);
    }

    $scope.showEvent = function(){
      $http.get(BaseUrl + "Events")
        .success(function(data) {
          $scope.events = data;
          console.log($scope.events);
      });
    };


    $scope.loadEvent = function(data){
      console.log($stateParams.id);

        var param = {
                  id : $stateParams.id
                  }
        console.log(param);

        $http.post(BaseUrl + "getEvent", param).success(function (data) {
            $scope.pageEvent = data;
            console.log($scope.pageEvent[0].title);


        });
    };

    $scope.map = function() {
      /*if (navigator.geolocation){
        var watchId = navigator.geolocation.watchPosition(successCallback, null,{
          enableHighAccuracy:true
        });
      }
      else{
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
      }

      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();

      console.log('map init');
      geocoder = new google.maps.Geocoder();*/

      var myLatlng = new google.maps.LatLng(48.882549, 2.167654);

      var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log(myLatlng);
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      console.log(map);

      navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
         var myLocation = new google.maps.Marker({
             position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
             map: map,
             title: "My Location"
         });
      });

      /*function successCallback(position){
        map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map: map,
          title: "My Location"

        });
      }*/

/*  directionsDisplay.setMap(map);
  console.log("etape 3");*/



      /*$scope.map = map;
      console.log('etape 4');

      google.maps.event.trigger( map, 'resize' );
      console.log('etape 5');*/

/*
      $scope.setRoute = function() {
        var address = document.getElementById("depart").value;
        var addressB = document.getElementById("arrivee").value;
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {

            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

            geocoder.geocode( { 'address': addressB}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {

                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
              } else {
                alert("Geocode was not successful for the following reason: " + status);
              }
            });
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        });

          var request = {
            origin:address,
            destination:addressB,
            travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(result);
            }
          });

      }*/
    }


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

  .controller("eventController", function($scope, $location, $state, $ionicModal, $http, $localStorage, $ionicHistory, $window){
      //MAMP
      //var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";
      //WAMP
      var BaseUrl = "http://localhost/projetannee2/ProjetAnnee2API/v1/";
        $ionicHistory.nextViewOptions({
           disableBack: true
         });

          $scope.$storage = $localStorage.$default({
            liste:'',
            currentUser:'',
          });

          $scope.reloadRoute = function() {
            $window.location.reload(true);
          }

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
          //console.log($scope.$storage.currentUser[0].id);

                var param = {
                    id_orga : $scope.$storage.currentUser[0].id,
                    titre : document.getElementById("titre").value,
                    activity : document.getElementById("activity").value,
                    lieu : document.getElementById("lieu").value,
                    depart : document.getElementById("depart").value,
                    arrivee : document.getElementById("arrivee").value,
                    description : document.getElementById("description").value,
                    date : dateTime,
                  }

                  console.log(param);
                  //envoi du formulaire pour l'ajout de tache a faire
                $http.post(BaseUrl + "Event", param)
                  .success(function(response) {
                    console.log('ookook');
                    console.log(response);(response.message);
                    $state.transitionTo("home");

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

             $scope.mapEvent = function(){
               var myLatlng = new google.maps.LatLng(48.882549, 2.167654);

               var mapOptions = {
                 center: myLatlng,
                 zoom: 12,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
               };
               console.log(myLatlng);
               var mapEvent = new google.maps.Map(document.getElementById("mapEvent"), mapOptions);
               console.log(mapEvent);

               navigator.geolocation.getCurrentPosition(function(pos) {
                 mapEvent.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                  var myLocation = new google.maps.Marker({
                      position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                      map: mapEvent,
                      title: "My Location"
                  });
               });


               var directionsService = new google.maps.DirectionsService();
               directionsDisplay = new google.maps.DirectionsRenderer();
               geocoder = new google.maps.Geocoder();



               directionsDisplay.setMap(mapEvent);

               $scope.map = mapEvent;

               $scope.setRoute = function() {
                 var address = document.getElementById("depart").value;
                 var addressB = document.getElementById("arrivee").value;
                 geocoder.geocode( { 'address': address}, function(results, status) {
                   if (status == google.maps.GeocoderStatus.OK) {
                     geocoder.geocode( { 'address': addressB}, function(results, status) {
                       if (status == google.maps.GeocoderStatus.OK) {
                       } else {
                         alert("Geocode was not successful for the following reason: " + status);
                       }
                     });
                   } else {
                     alert("Geocode was not successful for the following reason: " + status);
                   }
                 });

                   var request = {
                     origin:address,
                     destination:addressB,
                     travelMode: google.maps.TravelMode.DRIVING
                   };
                   directionsService.route(request, function(result, status) {
                     if (status == google.maps.DirectionsStatus.OK) {
                       directionsDisplay.setDirections(result);
                     }
                   });
               }
             }
  })
