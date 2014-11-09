angular.module( 'app.give.feed', [
    'ui.router',
    'app.give.overview',
    'app.give.talk',
    'app.give.do',
    'geolocation',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.feed', {
        url: '/',
        controller: 'GiveFeedCtrl',
        templateUrl:'give/feed/feed.tpl.html'
    });
})
.controller( 'GiveFeedCtrl', ['$scope', '$state', '$window', 'geolocation', function GiveCtrl( $scope, $state, $window, geolocation) {

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

                    activityQuery.containedIn("group",groups);
                    activityQuery.equalTo("requested", true);
                    activityQuery.equalTo("completed", false);
                    var d = new Date();
                    activityQuery.greaterThan("expirationDate", d);

                    activityQuery.find({success: function(activities) {
                        console.log('activities');
                        console.log(activities);
                        $scope.activities = activities;
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
                activity.set("giverHappinessBefore", $rootScope.happiness);
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

        $scope.$on('$viewContentLoaded',
            function(){
                $scope.getActivities();
            });


    }]);