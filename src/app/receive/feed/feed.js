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
                    $scope.$digest();
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

}]);