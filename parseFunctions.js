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

var viewActivities = function(userName) {
	var query = new ParseQuery(Activity);

	// Figure out what the time is
	var currentTime = //?;
	query.lessThan("endTime", currentTime)



	// get the list of circles the user belongs to
	// for each of those circles, check to see which activities are available


}