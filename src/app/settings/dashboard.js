angular.module( 'app.settings', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'settings', {
        url: '/settings',
        controller: 'SettingsCtrl',
        templateUrl:'settings/settings.tpl.html'
    });
})
.controller( 'SettingsCtrl', ['$scope', function SettingsCtrl( $scope) {



}]);