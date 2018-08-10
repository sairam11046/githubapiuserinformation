var request = require('request');
var body = {
    "userName": "sairam11046"
};
var headers = {'content-type': 'application/json'};
request.get({
    headers: headers,
    method: "GET",
    "url": "http://localhost:3000/users",
    "body": JSON.stringify(body)
}, function (error, response, body) {
    if (error) {
        console.log(error);
    }
    else {
        // console.log(response.statusCode, body);
        var data = JSON.parse(body);
        console.log("resp", body);
    }
});