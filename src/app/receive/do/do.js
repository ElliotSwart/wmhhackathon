angular.module( 'app.receive.do', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.do', {
        url: '/do',
        controller: 'DoCtrl',
        templateUrl:'receive/do/do.tpl.html'
    });
})
.controller( 'DoCtrl', ['$scope', function DoCtrl( $scope) {



}]);