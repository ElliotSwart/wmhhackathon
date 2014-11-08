angular.module( 'app.receive', [
    'ui.router',
    'app.receive.overview',
    'app.receive.talk',
    'app.receive.do',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive', {
        url: '/receive',
        controller: 'ReceiveCtrl',
        templateUrl:'receive/receive.tpl.html'
    });
})
.controller( 'ReceiveCtrl', ['$scope', '$state', function ReceiveCtrl( $scope, $state) {
    $scope.$state = $state;

     $scope.$on('$viewContentLoaded',
         function(){
         if ($state.current.name == 'receive') {
         $state.go('receive.overview');
         }
     });

}]);