angular.module( 'app.settings.main', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'settings.main', {
        url: '/',
        controller: 'MainCtrl',
        templateUrl:'settings/main/main.tpl.html'
    });
})
.controller( 'SettingsCtrl', ['$scope', function SettingsCtrl( $scope) {

}]);