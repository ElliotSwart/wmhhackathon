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
            appId      : '749996925050142', // Facebook App ID
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
.controller( 'AppCtrl', ['$scope', '$rootScope', '$state', function AppCtrl( $scope, $rootScope, $state) {
        $scope.$state = $state;

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
}]);