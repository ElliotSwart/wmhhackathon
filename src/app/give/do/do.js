angular.module( 'app.give.do', [
    'ui.router',
    'appSDK',
    'geolocation'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.do', {
        url: '/do',
        controller: 'GiveDoCtrl',
        templateUrl:'give/do/do.tpl.html'
    });
})
.controller( 'GiveDoCtrl', ['$scope', 'geolocation', function DoCtrl( $scope, geolocation) {

     $scope.myAction = "Hang Out";

     $scope.myCircle = "Friends";

     console.log("hi");
     $scope.shouldBeShown = function(myAction) {
         console.log(myAction);
         return (myAction == "Other");
     };

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