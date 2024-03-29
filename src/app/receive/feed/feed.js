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
        url: '/feed/:mode/:type',
        controller: 'ReceiveFeedCtrl',
        templateUrl:'receive/feed/feed.tpl.html'
    });
})
.controller( 'ReceiveFeedCtrl', ['$scope', '$rootScope', '$state', '$stateParams','$window', 'geolocation', function GiveCtrl( $scope, $rootScope, $state, $stateParams, $window, geolocation) {

        $scope.getActivities = function(){

            //Get circles
            var Group = Parse.Object.extend("Group");
            var query = new Parse.Query(Group);
            query.equalTo("friends", Parse.User.current());
            query.find({
                success: function(groups) {
                    console.log(groups);
                    $scope.groups = groups;

                    var Activity = Parse.Object.extend("Activity");
                    var activityQuery = new Parse.Query(Activity);

                    activityQuery.containedIn("group",
                        groups);

                    activityQuery.equalTo("requested", false);
                    activityQuery.equalTo("completed", false);
                    activityQuery.equalTo("mode", $stateParams.mode);
                    activityQuery.equalTo("type", $stateParams.type);
                    var d = new Date();
                    activityQuery.greaterThan("expirationDate", d);
                    activityQuery.include("creatingUser");
                    activityQuery.find({success: function(activities) {
                        console.log('activities');
                        console.log(activities);
                        $scope.activities = activities;
                        console.log( $scope.activities);
                        $scope.$digest();
                    }});
                },
                error: function(error1, error2){
                   console.log(error1);
                   console.log(error2);
                }
            });
            /*

            var user = Parse.User.current();

            var circlesIn = user.get("circlesIn"); //grabs the user's circles

            var query = new Parse.Query(availActivities);

            // Figure out what the time is
            var currentTime; //= ?;
            query.lessThan("endTime", currentTime)*/
        };

        $scope.acceptActivity = function(activity){
            if ($window.confirm("Would you like to start this activity?") ) {
                activity.set("acceptingUser", Parse.User.current());
                activity.set("completed", true);
                activity.set("acceptorHappinessBefore", $rootScope.happiness);
                activity.save(null, {success: function () {
                    console.log(activity);
                    Parse.Cloud.run('sendActivityMessage', {activityId: activity.id}, {
                        success: function (result) {
                        },
                        error: function (error) {
                        }
                    });
                    $state.go('activities');
                }});
            }
        };

        $scope.request = function(){
            $state.go('receive.request', {mode: $stateParams.mode, type: $stateParams.type});
        };

        $scope.$on('$viewContentLoaded',
            function(){
                $scope.getActivities();
            });

        $scope.loadLocation = function(){
            geolocation.getLocation().then(function(data) {
                $scope.location = {lat: data.coords.latitude, long: data.coords.longitude};
            });
        };

        $scope.calculateDistance = function(location, reference){
            if(!location || !reference){
                return;
            }

            console.log(location);
            console.log(reference);
            var lat1 = location._latitude;
            var long1 = location._longitude;
            console.log(lat1);
            console.log(long1);
            return $rootScope.calcCrow(lat1, long1, reference.lat, reference.long);
        };

}]);