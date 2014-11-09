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

     $scope.myWindow = 60;

    $scope.create = function() {
        geolocation.getLocation().then(function(data){
            var Activity = Parse.Object.extend("Activity");
            var activity = new Activity();
            console.log(data);
            $scope.coords = {lat:data.coords.latitude, long:data.coords.longitude};
            console.log($scope.coords);

            var point = new Parse.GeoPoint(data.coords.latitude, data.coords.longitude);
            activity.set("location", point);

            var type = "";
            if ($scope.myAction == "Staying In") {
                type="in";
            }else{
                type="out";
            }

            activity.set("requested",false);
            activity.set("type",type);
            activity.set("description",$scope.actionExample);
            activity.set("group",$scope.myGroup);
            activity.set("duration", Number($scope.myWindow));
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