angular.module( 'app.give.do', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.do', {
        url: '/do',
        controller: 'GiveDoCtrl',
        templateUrl:'give/do/do.tpl.html'
    });
})
.controller( 'GiveDoCtrl', ['$scope', function DoCtrl( $scope) {

     $scope.myAction = "Hang Out";

     $scope.myCircle = "Friends";

     console.log("hi");
     $scope.shouldBeShown = function(myAction) {
         console.log(myAction);
         return (myAction == "Other");
     };
}]);