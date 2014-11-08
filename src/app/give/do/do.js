angular.module( 'app.give.do', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.do', {
        url: '/do',
        controller: 'DoCtrl',
        templateUrl:'give/do/do.tpl.html'
    });
})
.controller( 'DoCtrl', ['$scope', function DoCtrl( $scope) {



}]);