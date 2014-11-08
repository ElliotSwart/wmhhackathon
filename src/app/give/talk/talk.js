angular.module( 'app.give.talk', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.talk', {
        url: '/talk',
        controller: 'TalkCtrl',
        templateUrl:'give/talk/talk.tpl.html'
    });
})
.controller( 'TalkCtrl', ['$scope', function TalkCtrl( $scope) {



}]);