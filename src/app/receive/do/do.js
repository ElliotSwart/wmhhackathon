angular.module( 'app.receive.do', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.do', {
        url: '/do',
        controller: 'ReceiveDoCtrl',
        templateUrl:'receive/do/do.tpl.html'
    });
})
.controller( 'ReceiveDoCtrl', ['$scope', function DoCtrl( $scope) {



}]);