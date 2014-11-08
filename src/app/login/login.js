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
.controller( 'LoginCtrl', ['$scope', function LoginCtrl( $scope) {



}]);