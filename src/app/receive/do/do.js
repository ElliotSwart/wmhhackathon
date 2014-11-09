angular.module( 'app.receive.do', [
    'ui.router',
    'appSDK',
    'geolocation'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'receive.do', {
        url: '/do',
        controller: 'ReceiveDoCtrl',
        templateUrl:'receive/do/do.tpl.html'
    });
})
.controller( 'ReceiveDoCtrl', ['$scope', 'geolocation', function DoCtrl( $scope, geolocation) {

    var hangoutExamples = ["In a bar", "On a hike", "At a party", "Other"];
    var stayInExamples = ["To watch a movie", "To play a game", "To make a meal", "Other"];

    $scope.actionExamples = stayInExamples;

    $scope.myAction = "Hanging Out";

    $scope.$watch('myAction', function() {
        if ($scope.myAction == "Staying In") {
            $scope.actionExamples = stayInExamples;
        }
        else {
            $scope.actionExamples = hangoutExamples;
        }
        $scope.actionExample = $scope.actionExamples[0];
    });

    $scope.actionExample = $scope.actionExamples[0];

    $scope.myCircle = "Friends";

    $scope.create = function() {
        createActivity($scope.myAction, "dfssdfs", 2);
    };


    var createActivity = function(activityName, activityCircle, duration) {
        geolocation.getLocation().then(function(data){
            console.log(data);
            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
            console.log($scope.coords);

            var point = new Parse.GeoPoint(data.coords.latitude, data.coords.longitude);
            activity.set("location", point);

            var Activity = Parse.Object.extend("Activity");
            var activity = new Activity();
            activity.set("name",activityName);
            activity.set("circle",activityCircle);
            activity.set("duration", duration);
            activity.set("creatingUser", Parse.User.current());


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
        });
    };
}]);