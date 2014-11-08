angular.module( 'app.receive.talk', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.talk', {
        url: '/talk',
        controller: 'ReceiveTalkCtrl',
        templateUrl:'receive/talk/talk.tpl.html'
    });
})
.controller( 'ReceiveTalkCtrl', ['$scope', function TalkCtrl( $scope) {



}]);