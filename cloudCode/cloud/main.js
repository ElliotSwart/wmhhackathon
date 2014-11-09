var client = require('twilio')('AC1f318d941a7ce05e4110be437d7c451b', '094108ccc739a7d24e673ef24f76a9c3');



Parse.Cloud.define("sendActivityMessage", function(request, response) {

    var userQuery = new Parse.Query("User");
    var activityQuery = new Parse.Query("Activity");

    console.log(request.body);
    var requestBody = JSON.parse(request.body);
    console.log(requestBody);

    var activityId = requestBody.activityId;
    console.log("activities");
    console.log(activityId);
    activityQuery.include("creatingUser");
    activityQuery.include("acceptingUser");
    activityQuery.get(activityId, {
        success: function(activity) {
            console.log(activity);
            var giverUser;
            var receiverUser;

            if(activity.get("requested") == true){
                giverUser = activity.get("acceptingUser");
                receiverUser = activity.get("creatingUser");
            }else{
                giverUser = activity.get("creatingUser");
                receiverUser = activity.get("acceptingUser");
            }

            var activityName = "";

            if(activity.get("mode") == "talk"){
                if(activity.get("type") == "casual"){
                    activityName = "have a casual chat"
                }else{
                    activityName = "have a heart to heart"
                }
            }else{
                activityName = activity.get("description").toLowerCase();
            }

            console.log(activityName);

            var recieverString = giverUser.get("name") + ' wants to ' + activityName + ' with you';
            var giverString = receiverUser.get("name") + ' wants to ' + activityName + ' with you';

            client.sendSms({
                    to: receiverUser.get("phone"),
                    from: '+16697211980',
                    body: recieverString,
                }, function(err, responseData) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(responseData.from);
                        console.log(responseData.body);

                        client.sendSms({
                                to: giverUser.get("phone"),
                                from: '+16697211980',
                                body: giverString,
                            }, function(err, responseData) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log(responseData.from);
                                    console.log(responseData.body);
                                    response.success("Texts sent");
                                }
                            }
                        );

                    }
                }
            );

            /*
            userQuery.get(recieverId, {
                success: function(recieverUser) {
                    userQuery.get(giverId, {
                        success: function(giverUser) {
                            console.log(activity);
                            console.log(recieverUser);
                            console.log(giverUser);
                            console.log(giverUser.get("name"));
                            console.log(giverUser.get("phone"));





                            /*

                            client.sendSms({
                                    to:'+16176339582',
                                    from: '+16697211980',
                                    body: 'Elliot wants to bake you cookies!'
                                }, function(err, responseData) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log(responseData.from);
                                        console.log(responseData.body);

                                    }
                                }
                            );


                            // The object was retrieved successfully.
                        },
                        error: function(object, error) {
                            console.log(error);
                            // The object was not retrieved successfully.
                            // error is a Parse.Error with an error code and message.
                        }
                    });


                    // The object was retrieved successfully.
                },
                error: function(object, error) {
                    console.log(error);
                    // The object was not retrieved successfully.
                    // error is a Parse.Error with an error code and message.
                }
            });*/

            // The object was retrieved successfully.
        },
        error: function(object, error) {
            console.log(error);
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and message.
        }
    });

// Send an SMS message
});