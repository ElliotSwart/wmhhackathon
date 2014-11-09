angular.module( 'app.activities', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'activities', {
        url: '/activities',
        controller: 'ActivitiesCtrl',
        templateUrl:'activities/activities.tpl.html'
    });
})
.controller( 'ActivitiesCtrl', ['$scope', '$rootScope', '$state', function LoginCtrl( $scope, $rootScope, $state) {

    $scope.setPending = function() {
        var Activity = Parse.Object.extend("Activity");
        var activityQuery = new Parse.Query(Activity);
        activityQuery.equalTo("creatingUser", Parse.User.current());
        activityQuery.equalTo("completed", false);
        activityQuery.find({
            success: function(pendingActivities) {
                console.log(pendingActivities);
                $scope.pendingActivities = pendingActivities;
                $scope.$digest();
            },
            error: function(error1, error2){
                console.log(error1);
                console.log(error2);
            }
        });
    };

    $scope.getHistory = function() {
        var Activity = Parse.Object.extend("Activity");
        var activityQuery1 = new Parse.Query(Activity);
        activityQuery1.equalTo("creatingUser", Parse.User.current());
        activityQuery1.equalTo("completed", true);


        var activityQuery2 = new Parse.Query(Activity);
        activityQuery2.equalTo("acceptingUser", Parse.User.current());
        activityQuery2.equalTo("completed", true);

        var mainQuery = Parse.Query.or(activityQuery1, activityQuery2);
        mainQuery.include("creatingUser");
        mainQuery.include("acceptingUser");

        mainQuery.find({
            success: function(activities) {
                console.log(activities);
                $scope.activityHistory = activities;
                $scope.$digest();
            },
            error: function(error1, error2){
                console.log(error1);
                console.log(error2);
            }
        });
    };

    $scope.removeActivity = function(activity){
        activity.destroy({
            success: function(myObject) {
                $scope.setPending();
                // The object was deleted from the Parse Cloud.
            },
            error: function(myObject, error) {
                // The delete failed.
                // error is a Parse.Error with an error code and message.
            }
        });
    };

    $scope.findName = function(activity){
        if(activity.get("creatingUser").get("id") == Parse.User.current().get("id")){
            return activity.get("acceptingUser").get("name");
        }else{
            return activity.get("creatingUser").get("name");
        }
    };

    $scope.calibrateMoods = function(activity){
        if(activity.get("creatingUser").get("id") == Parse.User.current().get("id")){
            activity.beforeMood = activity.get("creatorHappinessBefore");
            activity.afterMood = activity.get("creatorHappinessAfter");
            console.log("creating user");
            console.log(activity.get("creatorHappinessBefore"));
            console.log(activity.get("creatorHappinessAfter"));
            console.log(activity.beforeMood);
            console.log(activity.afterMood);
        }else{
            activity.beforeMood = activity.get("acceptorHappinessBefore");
            activity.afterMood = activity.get("acceptorHappinessAfter");
            console.log("accepting user");
        }

        if(activity.afterMood){
            return true;
        }else{
            return false;
        }
    };

    $scope.setRating = function(activity){
        if(activity.afterMood === 0){
            console.log(returning);
            return;
        }

        console.log(activity.afterMood);

        if(activity.get("creatingUser").get("id") == Parse.User.current().get("id")){
            activity.set("creatorHappinessAfter", activity.afterMood);
        }else{
            activity.set("acceptorHappinessAfter", activity.afterMood);
        }

        activity.save(null, {
            success:function(){
                $scope.$digest();
            }
        });
    };

    $scope.$on('$viewContentLoaded',
        function(){
            $scope.setPending();
            $scope.getHistory();
        });

}]);