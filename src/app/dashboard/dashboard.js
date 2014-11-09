angular.module( 'app.dashboard', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'dashboard', {
        url: '/dashboard',
        controller: 'DashboardCtrl',
        templateUrl:'dashboard/dashboard.tpl.html'
    });
})
.controller( 'DashboardCtrl', ['$scope', '$rootScope', function DashboardCtrl( $scope, $rootScope) {

        $scope.happiness = 3;

        $scope.$watch('happiness', function(){
            $rootScope.happiness = $scope.happiness;
        });
}]);