angular.module( 'app.give.overview', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.overview', {
        url: '/',
        controller: 'GiveOverviewCtrl',
        templateUrl:'give/overview/overview.tpl.html'
    });
})
.controller( 'GiveOverviewCtrl', ['$scope', function OverviewCtrl( $scope) {

}]);