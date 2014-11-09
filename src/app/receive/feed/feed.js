angular.module( 'app.receive.feed', [
    'ui.router',
    'app.give.overview',
    'app.give.talk',
    'app.give.do',
    'geolocation',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.feed', {
        url: '/feed',
        controller: 'ReceiveFeedCtrl',
        templateUrl:'receive/feed/feed.tpl.html'
    });
})
.controller( 'ReceiveFeedCtrl', ['$scope', 'geolocation', function GiveCtrl( $scope, geolocation) {

}]);