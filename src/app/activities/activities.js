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

    $scope.removeActivity = function(activity){
        $scope.pendingActivities.remove("activities",activity);

        $scope.pendingActivities.save(null, {
            success: function(pendingActivities) {
                $scope.pendingActivities = pendingActivities;
            },
            error: function(group, error) {
            }
        });
    };

    $scope.$on('$viewContentLoaded',
        function(){
            $scope.setPending();


        });

}]);