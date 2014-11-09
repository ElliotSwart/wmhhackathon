angular.module( 'app.give', [
    'ui.router',
    'app.give.overview',
    'app.give.talk',
    'app.give.do',
    'app.give.feed',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give', {
        url: '/give',
        controller: 'GiveCtrl',
        templateUrl:'give/give.tpl.html'
    });
})
.controller( 'GiveCtrl', ['$scope', '$state', function GiveCtrl( $scope, $state) {
    $scope.$state = $state;

    $scope.$on('$viewContentLoaded',
        function(){
            if ($state.current.name == 'give') {
                $state.go('give.feed');
            }
        });
}]);