angular.module( 'app.home', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'home', {
        url: '/start',
        controller: 'HomeCtrl',
        templateUrl:'home/home.tpl.html'
    });
})
.controller( 'HomeCtrl', ['$scope', function HomeCtrl( $scope) {

        $scope.login = function(){
            Parse.FacebookUtils.logIn(null, {
                success: function(user) {
                    if (!user.existed()) {
                        alert("User signed up and logged in through Facebook!");
                    } else {
                        alert("User logged in through Facebook!");
                    }
                },
                error: function(user, error) {
                    alert("User cancelled the Facebook login or did not fully authorize.");
                }
            });
        };

        $scope.createScore = function(){
            var GameScore = Parse.Object.extend("GameScore");
            var gameScore = new GameScore();
            $scope.status = "waiting";
            gameScore.set("score", 1337);
            gameScore.set("playerName", "Sean Plott");
            gameScore.set("cheatMode", false);
            gameScore.set("skills", ["pwnage", "flying"]);

            gameScore.save().then(function(gameScore) {
                $scope.status = "saved";
                console.log('saved');
                $scope.$digest();
            }, function(error){
                console.log('error');
                console.log(error);
            });
        };

        $scope.getScores = function(){

            Parse.Cloud.run('hello', {}, {
                success: function(result) {
                },
                error: function(error) {
                }
            });

            var GameScore = Parse.Object.extend("GameScore");
            var query = new Parse.Query(GameScore);
            query.equalTo("playerName", "Sean Plott");
            query.find({
                success: function(results) {
                    console.log(results);
                    $scope.results = results;
                    alert("Successfully retrieved " + results.length + " scores.");
                    $scope.$digest();
                },
                error: function(error) {
                    alert("Error: " + error.code + " " + error.message);
                }
            });
        };

}]);