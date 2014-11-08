angular.module( 'app.dashboard', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl:'dashboard/dashboard.tpl.html'
    });
})
.controller( 'DashboardCtrl', ['$scope', '$rootScope', function DashboardCtrl( $scope, $rootScope) {

    $scope.loadUser = function(){
       var user = Parse.User.current();
       console.log(user);
       if(!user){
           $rootScope.logout();
       }

       $scope.name = user.get("name");

        FB.api(
                "/me/picture",
            function (response) {
                if (response && !response.error) {
                    /* handle the result */
                    console.log(response);
                    $scope.profileUrl = response.data.url;
                    console.log($scope.profileUrl);
                    $scope.$digest();
                }
            }
        );
    };

    $scope.$on('$viewContentLoaded',
        function(){
            $scope.loadUser();
        });


}]);