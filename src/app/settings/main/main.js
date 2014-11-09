angular.module( 'app.settings.main', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'settings.main', {
        url: '/',
        controller: 'SettingsMainCtrl',
        templateUrl:'settings/main/main.tpl.html'
    });
})
.controller( 'SettingsMainCtrl', ['$scope', function SettingsMainCtrl( $scope) {

}]);