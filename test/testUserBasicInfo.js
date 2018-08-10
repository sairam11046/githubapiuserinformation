var Service = require('../service/service');
var config = require('../config/config.json');
var service = new Service(config, function (error, details, logged) {
    if (!logged) {
        console.log(error, details);
    }
});
service.getUserBasicInfo("sairam11046", function (userInfo) {
    console.log(userInfo);
});
service.getRepositoryOfUser("sairam", function (respository) {
    console.log(respository);
});
service.getContributionUser("sairam", function (contributionList) {
    console.log(contributionList);
});
