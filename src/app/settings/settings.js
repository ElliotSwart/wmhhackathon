angular.module( 'app.settings', [
    'ui.router',
    'appSDK',
    'app.settings.main',
    'app.settings.group'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'settings', {
        url: '/settings',
        controller: 'SettingsCtrl',
        templateUrl:'settings/settings.tpl.html'
    });
})
.controller( 'SettingsCtrl', ['$scope', '$state', function SettingsCtrl( $scope, $state) {

        $scope.getFriends = function(){
            FB.api(
                "/me/friends",
                function (response) {
                    if (response && !response.error) {
                        console.log(response);
                        $scope.friends = response.data;
                        $scope.$digest();
                    }
                }
            );
        };

        $scope.createCircle = function(){
            var Circle = Parse.Object.extend("Circle");
            var circle = new Circle();
            circle.set("user",Parse.User.current());
            circle.set("name","circleName");
            // circle.set("owner",?)
            circle.save(null, {
                success: function(circle) {
                    //Execute things here
                    alert("New object created with objectID: " + circle.id);
                },
                error: function(circle, error) {
                    //Execute things here
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        };

        $scope.addFriendToCircle = function(circle){

            circle.remove("friends",Parse.User.current());

            circle.save(null, {
                success: function(circle) {
                    //Execute things here
                    alert("New object created with objectID: " + circle.id);
                },
                error: function(circle, error) {
                    //Execute things here
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });

            circle.addUnique('friends', Parse.User.current());
            circle.save(null, {
                success: function(circle) {
                    //Execute things here
                    alert("New object created with objectID: " + circle.id);
                },
                error: function(circle, error) {
                    //Execute things here
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        };

        $scope.getCircleFriends = function(circle){
            var Circle = Parse.Object.extend("Circle");
            var query = new Parse.Query(Circle);
            query.equalTo("user", Parse.User.current());
            query.find({
                success: function(circles) {
                    console.log(circles);
                    $scope.circles = circles;
                    $scope.$digest();
                    // comments now contains the comments for myPost
                }
            });
        };

        $scope.getCircles = function(){
            var Circle = Parse.Object.extend("Circle");
            var query = new Parse.Query(Circle);
            query.include("friends");
            query.equalTo("user", Parse.User.current());
            query.find({
                success: function(circles) {
                    console.log(circles);
                    $scope.circles = circles;
                    $scope.$digest();
                    // comments now contains the comments for myPost
                }
            });
        };

        $scope.$on('$viewContentLoaded',
            function(){
                if($state.current.name == "settings"){
                    $state.go('settings.main');
                }

            });
}]);