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

}]);