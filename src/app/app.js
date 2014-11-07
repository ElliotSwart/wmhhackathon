angular.module( 'app', [
    'templates-app',
    'templates-common',
    'ui.router',
    'mm.foundation',
    'app.home',
    'appSDK',
    'oauth'
])
.config( function myAppConfig ($locationProvider, $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise( '/start' );
  //  $locationProvider.html5Mode(true);
})
.controller( 'AppCtrl', ['$scope', '$rootScope', '$state', function AppCtrl( $scope, $rootScope, $state) {
        $scope.$state = $state;

        $scope.isHome = function($state){
            return ($state.current.name == 'home');
        };
}]);