angular.module( 'app.give.talk', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.talk', {
        url: '/talk',
        controller: 'GiveTalkCtrl',
        templateUrl:'give/talk/talk.tpl.html'
    });
})
.controller( 'GiveTalkCtrl', ['$scope', function TalkCtrl( $scope) {

    $scope.myTalk = "Casual";

    $scope.myCircle = "Friends";

    $scope.myWindow = "1 hour";
}]);