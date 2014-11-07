angular.module( 'app.home', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'home', {
        url: '/start',
        controller: 'HomeCtrl',
        templateUrl:'home/home.tpl.html'
    });
})
.controller( 'HomeCtrl', ['$scope', function HomeCtrl( $scope) {
        $scope.$on('oauth:login', function(event, token) {
            console.log(token);
            $scope.accessToken = token;
        });

        $scope.$on('oauth:logout', function(event) {
            $scope.accessToken = null;
        });
}]);