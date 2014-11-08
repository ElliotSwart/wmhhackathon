// DEFINE CLASSES
var Circle = Parse.Object.Extend("Circle");
var Activity = Parse.Object.Extend("Activities");


// CREATE THE OBJECTS DYNAMICALLY (ie: When the user submits the relevant info)
var createCircle = function(circleName) {
	var circle = new Circle();
	circle.set("name",circleName)
	circle.set("friends",null)
	cricle.set("activities",null)
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
}

var addFriends = function(circle, userName) {
    circle.addUnique("friends",userName);
	circle.save();
}

var removeFriends = function(circle, userName) {}
	circle.remove("friends",userName);
	circle.save();
}

var addActivity = function(circle, activity) {}
	circle.addUnique("activities",activity);
	circle.save();
}

var acceptActivity = function(circle, activity) {}
	circle.remove("activiies",activity);
	circle.save();
	// Potentially have activity not show up if it's old
}

var createActivity = function(activityName, activityCircle, startTime, endTime) {
	var activity = new Activity();
	activity.set("name",activityName);
	activity.set("circle",activityCircle);
	activity.set("startTime", startTime);
	activity.set("endTime", endTime);
	activity.set("do", true);
	activity.set("stayIn", true);
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

var viewActivities = function() {
	var currentUser = Parse.User.current();

	var circlesIn = currentUser.get("circlesIn"); //grabs the user's circles
	var activities = circlesIn.get("activities"); //grabs the activities in the circle

	var query = new Parse.Query(activities);

	// Figure out what the time is
	var currentTime; //= ?;
	query.lessThan("endTime", currentTime)

}


var viewDoActivities = function() {

	var activities = viewActivities();

	var query = new Parse.Query(activities);
	query.equalTo("do", true);

}

var viewTalkActivities = function() {

	var activities = viewActivities();

	var query = new Parse.Query(activities);
	query.equalTo("do", false);

}

var viewStayInActivities = function() {

	var activities = viewDoActivities();

	var query = new Parse.Query(activities);
	query.equalTo("stayIn", true);

}

var viewGoOutActivities = function() {

	var activities = viewDoActivities();

	var query = new Parse.Query(activities);
	query.equalTo("stayIn", false);

}