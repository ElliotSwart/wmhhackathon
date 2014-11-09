angular.module( 'app.settings.group', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'settings.group', {
        url: '/group',
        controller: 'GroupCtrl',
        templateUrl:'settings/group/group.tpl.html'
    });
})
.controller( 'GroupCtrl', ['$scope', function GroupCtrl( $scope) {

        $scope.$on('$viewContentLoaded',
            function(){

            });
}]);