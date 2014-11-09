angular.module( 'app', [
    'templates-app',
    'templates-common',
    'ui.router',
    'mm.foundation',
    'app.login',
    'app.dashboard',
    'app.give',
    'app.receive',
    'app.settings',
    'app.about',
    'app.activities',
    'appSDK'
])
.config( function myAppConfig ($locationProvider, $stateProvider, $urlRouterProvider ) {

    Parse.initialize("hSLPuKFB7TRIVRy8PceJfPTCFr5UYEhRJVZWtja5", "OAQx5ACN7JSbpdDDCu2OtNYluRgbJlJ5AvkE5nqY");

    window.fbAsyncInit = function() {
        Parse.FacebookUtils.init({ // this line replaces FB.init({
           // appId      : '749996925050142', // Testing Facebook App ID
            appId      : '1489047721383895', //Production
            cookie     : true, // enable cookies to allow Parse to access the session
            xfbml      : true,
            version    : 'v1.0'
        });
        // Run code after the Facebook SDK is loaded.
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $urlRouterProvider.otherwise( '/login' );
  //  $locationProvider.html5Mode(true);
})
.controller( 'AppCtrl', ['$scope', '$rootScope', '$state', 'geolocation', function AppCtrl( $scope, $rootScope, $state, geolocation) {
        $scope.$state = $state;
        $rootScope.happiness = 3;

        $scope.isHome = function($state){
            return ($state.current.name == 'login');
        };

        $scope.logout = function(logout){
            if(logout){
                Parse.User.logOut();
            }
            $state.go('login');
        };

        $scope.isLogin = function(state){
           console.log(state);
           return (state.current.name == 'login');
        };

        if(!$rootScope.loggedIn){
            $scope.logout();
        }


        // Converts numeric degrees to radians
        function toRad(Value)
        {
            return Value * Math.PI / 180;
        }

        //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in miles)
        $rootScope.calcCrow = function(lat1, lon1, lat2, lon2)
        {
            var R = 6371; // km
            var dLat = toRad(lat2-lat1);
            var dLon = toRad(lon2-lon1);

            lat1 = toRad(lat1);
            lat2 = toRad(lat2);

            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            return Math.round( 0.621371*d * 10 ) / 10;
        };

        geolocation.getLocation().then(function(data){
            $rootScope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
        });
}]);