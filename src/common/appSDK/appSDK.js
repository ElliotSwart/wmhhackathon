angular.module( 'appSDK',[])
    .factory('appSDK', ['$http', function($http) {
    var appSDK = {};

    return appSDK;
}])
.filter("actionFilter", function() {
    return function(activity) {
        var userProposition = "";
        if (activity.attributes.mode == "talk") {
            if (activity.attributes.type == "casual") {
                userProposition += "talk casually";
            }
            else {
                userProposition += "talk heart-to-heart";
            }
        }
        else if (activity.attributes.mode == "do") {
            if (activity.attributes.type == "in") {
                userProposition += "stay in";
            }
            else {
                userProposition += "hang out";
            }

           if (activity.attributes.hasOwnProperty('description')) {
                userProposition+= " " + activity.attributes.description.toLowerCase();
            }
        }
        return userProposition + ".";
    };
});