angular.module( 'app.login', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'login', {
        url: '/login',
        controller: 'LoginCtrl',
        templateUrl:'login/login.tpl.html'
    });
})
.controller( 'LoginCtrl', ['$scope', '$rootScope', '$state', function LoginCtrl( $scope, $rootScope, $state) {
        $scope.login = function(){
            Parse.FacebookUtils.logIn('user_friends', {
                success: function(user) {
                    if (!user.existed()) {

                        FB.api(
                            "/me",
                            function (response) {
                                if (response && !response.error) {
                                    console.log(response);
                                    $scope.initializeUser(response);

                                    //Direct to manage circles if first time
                                    $scope.manageCircles();
                                }
                            }
                        );
                    } else {
                        $scope.loggedIn();
                    }

                },
                error: function(user, error) {
                    alert("User cancelled the Facebook login or did not fully authorize.");
                }
            });
        };

        $scope.initializeUser = function(response){
            user.set("name", response.firstName);
            user.set("facebookId", response.id);
        };

        $scope.loggedIn = function(){
            $rootScope.loggedIn = true;
            $state.go('dashboard');
        };

        $scope.manageCircles = function(){
            $rootScope.loggedIn = true;
            $state.go('settings');
        };


        if(Parse.User.current()){
            $scope.loggedIn();
        }
}]);