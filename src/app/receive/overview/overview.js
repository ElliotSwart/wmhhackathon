angular.module( 'app.receive.overview', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.overview', {
        url: '/',
        controller: 'ReceiveOverviewCtrl',
        templateUrl:'receive/overview/overview.tpl.html'
    });
})
.controller( 'ReceiveOverviewCtrl', ['$scope', function OverviewCtrl( $scope) {

}]);