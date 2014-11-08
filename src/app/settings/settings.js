angular.module( 'app.settings', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'settings', {
        url: '/settings',
        controller: 'SettingsCtrl',
        templateUrl:'settings/settings.tpl.html'
    });
})
.controller( 'SettingsCtrl', ['$scope', function SettingsCtrl( $scope) {

        $scope.getFriends = function(){
            FB.api(
                "/me/friends",
                function (response) {
                    if (response && !response.error) {
                        console.log(response);
                        $scope.friends = response.data;
                        $scope.$digest();
                    }
                }
            );
        };

        $scope.$on('$viewContentLoaded',
            function(){
                FB.getLoginStatus(function(response){
                    $scope.getFriends();
                });

            });
}]);