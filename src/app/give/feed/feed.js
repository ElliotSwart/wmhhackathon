angular.module( 'app.give.feed', [
    'ui.router',
    'app.give.overview',
    'app.give.talk',
    'app.give.do',
    'geolocation',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.feed', {
        url: '/feed',
        controller: 'GiveFeedCtrl',
        templateUrl:'give/feed/feed.tpl.html'
    });
})
.controller( 'GiveFeedCtrl', ['$scope', 'geolocation', function GiveCtrl( $scope, geolocation) {

}]);