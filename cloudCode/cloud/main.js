var client = require('twilio')('AC1f318d941a7ce05e4110be437d7c451b', '094108ccc739a7d24e673ef24f76a9c3');

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {

// Send an SMS message
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
                response.success("Hello world!");
            }
        }
    );
});

Parse.Cloud.define("sendActivityMessage", function(request, response) {

    var userQuery = new Parse.Query("User");
    var activityQuery = new Parse.Query("Activity");

    console.log(request.body);
    var requestBody = JSON.parse(request.body);
    console.log(requestBody);

    var activityId = requestBody.activity;
    var recieverId = requestBody.reciever;
    var giverId =  requestBody.giver;
    console.log("activities");
    console.log(activityId);
    console.log(recieverId);
    console.log(giverId);

    activityQuery.get(activityId, {
        success: function(activity) {
            console.log(activity);
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

                            var recieverString = giverUser.get("name") + 'wants to ' + activity.get("name") + ' with you';
                            var giverString = recieverUser.get("name") + 'wants to ' + activity.get("name") + ' with you';

                            client.sendSms({
                                    to: recieverUser.get("phone"),
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