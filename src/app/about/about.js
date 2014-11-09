angular.module( 'app.about', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'about', {
        url: '/about',
        controller: 'AboutCtrl',
        templateUrl:'about/about.tpl.html'
    });
})
.controller( 'AboutCtrl', ['$scope', '$rootScope', '$state', function LoginCtrl( $scope, $rootScope, $state) {

}]);