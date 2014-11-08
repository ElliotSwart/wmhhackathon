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

     $scope.create = function(){
         createActivity($scope.myAction, "dfssdfs", 2);
     };


        var createActivity = function(activityName, activityCircle, duration) {
            var Activity = Parse.Object.extend("Activity");
            var activity = new Activity();
            activity.set("name",activityName);
            activity.set("circle",activityCircle);
            activity.set("duration", duration);
            activity.save(null, {
                success: function(activity) {
                    //Execute things here
                    alert("New object created with objectID: " + activity.id);
                },
                error: function(circle, error) {
                    //Execute things here
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        };
}]);