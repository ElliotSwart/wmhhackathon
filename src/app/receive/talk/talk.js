angular.module( 'app.receive.talk', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.talk', {
        url: '/talk',
        controller: 'TalkCtrl',
        templateUrl:'receive/talk/talk.tpl.html'
    });
})
.controller( 'TalkCtrl', ['$scope', function TalkCtrl( $scope) {



}]);