angular.module( 'app.receive.request', [
    'ui.router',
    'appSDK',
    'geolocation'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.request', {
        url: '/request/:mode/:type',
        controller: 'RequestCtrl',
        templateUrl:'receive/request/request.tpl.html'
    });
})
.controller( 'RequestCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'geolocation', function DoCtrl( $scope, $rootScope, $state, $stateParams, geolocation) {

    $scope.myWindow = 60;

    $scope.create = function() {

        var Activity = Parse.Object.extend("Activity");
        var activity = new Activity();


        activity.set("requested",true);
        activity.set("type",$stateParams.type);
        var d = new Date();
        var time = (Number($scope.myWindow) * 60 * 1000);
        var expirationDate = new Date(d.getTime() + (time));
        activity.set("expirationDate", expirationDate);
        activity.set("mode", $stateParams.mode);
        activity.set("completed", false);
        activity.set("group",$scope.myGroup);
        activity.set("creatingUser", Parse.User.current());
        activity.set("creatorHappinessBefore", $rootScope.happiness);

        if($stateParams.mode == "do"){
            if($rootScope.coords){
                var point = new Parse.GeoPoint($rootScope.coords.lat, $rootScope.coords.long);
                activity.set("location", point);
                console.log($rootScope.coords);
            }
        }

        activity.save(null, {
            success: function(activity) {
                $state.go("activities");
            },
            error: function(circle, error) {
            }
        });

    };

    $scope.getGroups = function(){
        var Group = Parse.Object.extend("Group");
        var query = new Parse.Query(Group);
        query.include("friends");
        query.equalTo("user", Parse.User.current());
        query.find({
            success: function(groups) {
                console.log(groups);
                $scope.groups = groups;
                $scope.myGroup = groups[0];
                $scope.$digest();
                // comments now contains the comments for myPost
            }
        });
    };

    $scope.$on('$viewContentLoaded',
        function(){
            $scope.getGroups();
        });
}]);