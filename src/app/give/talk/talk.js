angular.module( 'app.give.talk', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'give.talk', {
        url: '/talk',
        controller: 'GiveTalkCtrl',
        templateUrl:'give/talk/talk.tpl.html'
    });
})
.controller( 'GiveTalkCtrl', ['$scope','$rootScope', '$state', function TalkCtrl( $scope, $rootScope, $state) {

    $scope.myTalk = "Casual";
    $scope.myWindow = 60;


    $scope.create = function() {
        var Activity = Parse.Object.extend("Activity");
        var activity = new Activity();

        var type = "";
        if ($scope.myTalk == "Casual") {
            type="casual";
        }else{
            type="hearttoheart";
        }

        activity.set("requested",false);
        activity.set("type",type);
        activity.set("mode", "talk");

        activity.set("completed", false);
        activity.set("group",$scope.myGroup);

        var d = new Date();
        var time = (Number($scope.myWindow) * 60 * 1000);
        var expirationDate = new Date(d.getTime() + (time));
        activity.set("expirationDate", expirationDate);

        activity.set("creatingUser", Parse.User.current());

        activity.set("creatorHappinessBefore", $rootScope.happiness);

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