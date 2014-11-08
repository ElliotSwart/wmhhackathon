angular.module( 'app.give.overview', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.overview', {
        url: '/',
        controller: 'OverviewCtrl',
        templateUrl:'give/overview/overview.tpl.html'
    });
})
.controller( 'OverviewCtrl', ['$scope', function OverviewCtrl( $scope) {

}]);