angular.module( 'app.settings.main', [
    'ui.router',
    'appSDK'
])
.config(function config( $stateProvider ) {
    $stateProvider.state( 'settings.main', {
        url: '/',
        controller: 'SettingsMainCtrl',
        templateUrl:'settings/main/main.tpl.html'
    });
})
.controller( 'SettingsMainCtrl', ['$scope', '$state','$rootScope', function SettingsMainCtrl( $scope, $state, $rootScope) {


        $scope.editGroup = function(group){
            $scope.$parent.group = group;
            $state.go('settings.group');
        };

        $scope.createGroup = function(){
            var Group = Parse.Object.extend("Group");
            var group = new Group();
            group.set("user",Parse.User.current());
            group.set("name",$scope.groupName);
            group.save(null, {
                success: function(group) {
                    //Execute things here
                    $scope.getGroups();
                },
                error: function(group, error) {
                    //Execute things here
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
                    $scope.$digest();
                    // comments now contains the comments for myPost
                }
            });
        };

        $scope.savePhone = function(){
            var user = Parse.User.current();
            user.set("phone", $scope.phoneNumber);
            user.save(null, {
                success: function() {
                    //Execute things here
                },
                error: function(error) {
                    //Execute things here
                }
            });
        };


        $scope.$on('$viewContentLoaded',
            function(){
                $scope.getGroups();
                $scope.phoneNumber = Parse.User.current().get("phone");
            });
}]);