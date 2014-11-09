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
.controller( 'ReceiveFeedCtrl', ['$scope', '$state', '$stateParams', 'geolocation', function GiveCtrl( $scope, $state, $stateParams, geolocation) {

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

        $scope.$on('$viewContentLoaded',
            function(){
                $scope.getActivities();
            });

}]);