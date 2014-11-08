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
.controller( 'LoginCtrl', ['$scope', '$state', function LoginCtrl( $scope, $state) {
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
                                    $scope.loggedIn();
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
            $state.go('dashboard');
        };


        if(Parse.User.current()){
            $scope.loggedIn();
        }
}]);