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

    $scope.map = function() {

      if (navigator.geolocation)
        var watchId = navigator.geolocation.watchPosition(successCallback, null,{
          enableHighAccuracy:true
        });
      else
        alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");

      var directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();

      console.log('map init');
      geocoder = new google.maps.Geocoder();

      var myLatlng = new google.maps.LatLng(48.882549, 2.167654);

      var mapOptions = {
        center: myLatlng,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      console.log(myLatlng);
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      function successCallback(position){
        map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map: map
        });
      }

  directionsDisplay.setMap(map);

      navigator.geolocation.getCurrentPosition(function(pos) {
        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        // var myLocation = new google.maps.Marker({
        //     position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        //     map: map,
        //     title: "My Location"
        // });
      });

      $scope.map = map;

      $scope.setRoute = function() {
        var address = document.getElementById("pointA").value;
        var addressB = document.getElementById("pointB").value;
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



      }

      $scope.getDistance = function() {
        var deferred = $q.defer();

        var origin1 = new google.maps.LatLng($scope.depart.geometry.location.lat(), $scope.depart.geometry.location.lng());
        var origin2 = $scope.depart.formatted_address;
        var destinationA = $scope.arrivee.formatted_address;
        var destinationB = new google.maps.LatLng($scope.arrivee.geometry.location.lat(), $scope.arrivee.geometry.location.lng());

        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [origin1, origin2],
            destinations: [destinationA, destinationB],
            travelMode: google.maps.TravelMode.DRIVING,
            drivingOptions: {
              departureTime: new Date($scope.departTime),
              trafficModel: "optimistic"
            }
          }, callback);

          function callback(response, status) {
            if (status == google.maps.DistanceMatrixStatus.OK) {
              var origins = response.originAddresses;
              var destinations = response.destinationAddresses;

              for (var i = 0; i < origins.length; i++) {
                var results = response.rows[i].elements;
                  for (var j = 0; j < results.length; j++) {
                    var element = results[j];
                    var routeData = [];
                    routeData[0] = element.distance.value;
                    routeData[1] = element.duration.text;
                    deferred.resolve(routeData);
                    var from = origins[i];
                    var to = destinations[j];
                  }
              }
            }
          }

          return deferred.promise;
        }

        $scope.getPrice = function() {
          var promise = $scope.getDistance();
          promise.then(function(routeData) {
            $scope.price = Math.floor(routeData[0] / 1000 * 2.5);
            // $scope.reservationClient($scope.price);
            $scope.isPrice = true;
            $scope.$storage.infosResa.prix = $scope.price;
            $scope.$storage.infosResa.temps = routeData[1];
            console.log($scope.$storage.infosResa);
          });
        }

        $scope.getResaDate = function() {
          var dd = new Date($scope.departDate).getDate();
          var mm = new Date($scope.departDate).getMonth()+1;
          var yy = new Date($scope.departDate).getFullYear();
          var hh = new Date($scope.departTime).getHours();
          var ms = new Date($scope.departTime).getMinutes();
          var x = yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms;
          $scope.resaDate = new Date(x);
        }
    }




    /*function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: {lat: -34.397, lng: 150.644}
      });
      var geocoder = new google.maps.Geocoder();

      document.getElementById('submit').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
      });
    }*/


    /*
    $scope.map = L.map('map').setView([48.77067246880509, 3.251953125], 7);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        //attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'vasach.plk1gn8n',
        accessToken: 'pk.eyJ1IjoidmFzYWNoIiwiYSI6ImNpbXhxNWZnajAwZWJ3OGx5ZW5oam5jc2UifQ.jxlQK5wu7ByHtTk_WD_KRg',
    }).addTo($scope.map);


  /*  new L.Control.GeoSearch({
      provider: new L.GeoSearch.Provider.Google(),

    }).addTo($scope.map);

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
      $scope.map.addControl(new locationBtn());*/

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

  .controller("eventController", function($scope, $location, $state, $ionicModal, $http, $localStorage, $ionicHistory){
    var BaseUrl = "http://localhost:8888/projetannee2/ProjetAnnee2API/v1/";
        $ionicHistory.nextViewOptions({
           disableBack: true
         });

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
                    depart : document.getElementById("depart").value,
                    arrivee : document.getElementById("arrivee").value,
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

             $scope.map = function() {

               if (navigator.geolocation)
                 var watchId = navigator.geolocation.watchPosition(successCallback, null,{
                   enableHighAccuracy:true
                 });
               else
                 alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");

               var directionsService = new google.maps.DirectionsService();
               directionsDisplay = new google.maps.DirectionsRenderer();

               console.log('map init');
               geocoder = new google.maps.Geocoder();

               var myLatlng = new google.maps.LatLng(48.882549, 2.167654);

               var mapOptions = {
                 center: myLatlng,
                 zoom: 12,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
               };
               console.log(myLatlng);
               var map = new google.maps.Map(document.getElementById("map"), mapOptions);
               function successCallback(position){
                 map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
                 var marker = new google.maps.Marker({
                   position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                   map: map
                 });
               }

             directionsDisplay.setMap(map);

               navigator.geolocation.getCurrentPosition(function(pos) {
                 map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                 // var myLocation = new google.maps.Marker({
                 //     position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                 //     map: map,
                 //     title: "My Location"
                 // });
               });

               $scope.map = map;

               $scope.setRoute = function() {
                 var address = document.getElementById("depart").value;
                 var addressB = document.getElementById("arrivee").value;
                 geocoder.geocode( { 'address': address}, function(results, status) {
                   if (status == google.maps.GeocoderStatus.OK) {

                     /*var marker = new google.maps.Marker({
                         map: map,
                         position: results[0].geometry.location
                     });*/

                     geocoder.geocode( { 'address': addressB}, function(results, status) {
                       if (status == google.maps.GeocoderStatus.OK) {

                         /*var marker = new google.maps.Marker({
                             map: map,
                             position: results[0].geometry.location
                         });*/
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

               $scope.getDistance = function() {
                 var deferred = $q.defer();

                 var origin1 = new google.maps.LatLng($scope.depart.geometry.location.lat(), $scope.depart.geometry.location.lng());
                 var origin2 = $scope.depart.formatted_address;
                 var destinationA = $scope.arrivee.formatted_address;
                 var destinationB = new google.maps.LatLng($scope.arrivee.geometry.location.lat(), $scope.arrivee.geometry.location.lng());

                 var service = new google.maps.DistanceMatrixService();
                 service.getDistanceMatrix(
                   {
                     origins: [origin1, origin2],
                     destinations: [destinationA, destinationB],
                     travelMode: google.maps.TravelMode.DRIVING,
                     drivingOptions: {
                       departureTime: new Date($scope.departTime),
                       trafficModel: "optimistic"
                     }
                   }, callback);

                   function callback(response, status) {
                     if (status == google.maps.DistanceMatrixStatus.OK) {
                       var origins = response.originAddresses;
                       var destinations = response.destinationAddresses;

                       for (var i = 0; i < origins.length; i++) {
                         var results = response.rows[i].elements;
                           for (var j = 0; j < results.length; j++) {
                             var element = results[j];
                             var routeData = [];
                             routeData[0] = element.distance.value;
                             routeData[1] = element.duration.text;
                             deferred.resolve(routeData);
                             var from = origins[i];
                             var to = destinations[j];
                           }
                       }
                     }
                   }

                   return deferred.promise;
                 }

                 $scope.getPrice = function() {
                   var promise = $scope.getDistance();
                   promise.then(function(routeData) {
                     $scope.price = Math.floor(routeData[0] / 1000 * 2.5);
                     // $scope.reservationClient($scope.price);
                     $scope.isPrice = true;
                     $scope.$storage.infosResa.prix = $scope.price;
                     $scope.$storage.infosResa.temps = routeData[1];
                     console.log($scope.$storage.infosResa);
                   });
                 }

                 $scope.getResaDate = function() {
                   var dd = new Date($scope.departDate).getDate();
                   var mm = new Date($scope.departDate).getMonth()+1;
                   var yy = new Date($scope.departDate).getFullYear();
                   var hh = new Date($scope.departTime).getHours();
                   var ms = new Date($scope.departTime).getMinutes();
                   var x = yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms;
                   $scope.resaDate = new Date(x);
                 }
             }




  })
