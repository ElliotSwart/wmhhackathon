angular.module( 'app.receive.overview', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.overview', {
        url: '/',
        controller: 'OverviewCtrl',
        templateUrl:'receive/overview/overview.tpl.html'
    });
})
.controller( 'OverviewCtrl', ['$scope', function OverviewCtrl( $scope) {

}]);