var express = require('express');
var router = express.Router();
var User = require('../service/service');
var config = require('../config/config.json');
/* GET users listing. */
router.get('/', function (req, res, next) {
    var data = req.body;
    console.log(data);
    var userName = data.userName;
    if (!userName) {
        return res.json({
            "status": 400,
            "error": "Invalid User Name Send",
            "result": null
        });
    }
    var user = new User(config, function (error, details, logged) {
        return res.json({
            "status": 400,
            "error": "User Not Found",
            "result": null
        });
    });
    user.getUserBasicInfo(userName, function (basicInfo) {
        user.getRepositoryOfUser(userName, function (topLanguages) {
            user.getContributionUser(userName, function (count) {
                return res.json({
                    "status": 200,
                    "error": null,
                    "result": {
                        "basicInfo": basicInfo,
                        "Top 3 Language": topLanguages,
                        "Contributions last 3 months": count
                    }
                });
            });
        });
    });
});

module.exports = router;
