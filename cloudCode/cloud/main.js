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
