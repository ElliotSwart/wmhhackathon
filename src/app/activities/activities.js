angular.module( 'app.activities', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'activities', {
        url: '/activities',
        controller: 'ActivitiesCtrl',
        templateUrl:'activities/activities.tpl.html'
    });
})
.controller( 'ActivitiesCtrl', ['$scope', '$rootScope', '$state', function LoginCtrl( $scope, $rootScope, $state) {

}]);