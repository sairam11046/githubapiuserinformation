var request = require('request');
var Commons = require('../commons');
var async = require('async');
var GitHubApi = function (config, errorCallback) {
    var me = this;
    var common = new Commons();
    me.getUserBasicInfo = function (userName, callback) {
        var requireUrl = config.GITHUB_OPTIONS.GETUSER + "/" + userName;
        me.reqeustForGitHub(requireUrl, function (userBasicInfo) {
            // callback(userBasicInfo);
            me.getRequireInfo(userBasicInfo, function (requireData) {
                callback(requireData);
            });
        });
    };
    me.getRequireInfo = function (userBasicInfo, callback) {
        var USER_INFO = {};
        async.forEachOf(common.userBasicInfoConstant, function (value, key, callback) {
            if (userBasicInfo[value]) {
                USER_INFO[key] = userBasicInfo[value];
            }
            else {
                USER_INFO[key] = "NOT MENTIONED";
            }
            callback(null, USER_INFO);
        }, function (error, done) {
            if (error) {
                return crashed(error, "at getRequireInfo");
            }
            else {
                callback(USER_INFO);
            }
        });
    };
    me.getRepositoryOfUser = function (userName, callback) {
        var urlRepository = config.GITHUB_OPTIONS.GETUSER + "/" + userName + config.GITHUB_OPTIONS.GETRESPOSITORY;
        me.reqeustForGitHub(urlRepository, function (userRepositories) {
            // callback(userRepositories);
            me.getLanguageUsed(userRepositories, function (languageArrayObjects) {
                callback(me.getTopLanguages(languageArrayObjects));
            });
        });
    };
    me.getTopLanguages = function (languageArrayObject) {
        // console.log(languageArrayObject);
        var sort = common.mergeSort(languageArrayObject);
        // console.log(sort);
        var skills = [];
        for (var eachLang = 0; eachLang < common.userRepositoryLanguage.topRequiredSkills && eachLang < sort.length;
             eachLang++) {
            skills.push(Object.keys(sort[eachLang])[0]);
        }
        return skills;
    };
    me.getLanguageUsed = function (userRespositories, callback) {
        var USER_LANGUAGE = {};
        async.each(userRespositories, function (eachRepository, callback) {
            if (!eachRepository[common.userRepositoryLanguage.language]) {
                // console.log(eachRepository[common.userRepositoryLanguage.language]);
                return callback(null, USER_LANGUAGE);
            }
            if (!USER_LANGUAGE[eachRepository[common.userRepositoryLanguage.language]]) {
                // USER_LANGUAGE[eachRepository[common.userRepositoryLanguage.language]]={};
                USER_LANGUAGE[eachRepository[common.userRepositoryLanguage.language]] = 0;
            }
            USER_LANGUAGE[eachRepository[common.userRepositoryLanguage.language]] += 1;
            callback(null, USER_LANGUAGE);
        }, function (error, languageObject) {
            if (error) {
                return crashed(error, "at getLanguageUsed");
            }
            else {
                var languageArrayObjects = [];
                var languages = Object.keys(USER_LANGUAGE);
                for (var eachLanguage = 0; eachLanguage < languages.length; eachLanguage++) {
                    var langObject = {};
                    langObject[languages[eachLanguage]] = USER_LANGUAGE[languages[eachLanguage]];
                    languageArrayObjects.push(langObject);
                }
                callback(languageArrayObjects);
            }
        });
    };
    me.getContributionUser = function (userName, callback) {
        var urlContribute = config.GITHUB_OPTIONS.GETUSER + "/" + userName + config.GITHUB_OPTIONS.GETUSEREVENTS;
        me.reqeustForGitHub(urlContribute, function (contributeList) {
            // callback(contributeList);
            // console.log(contributeList.length);
            me.getCountOfContributions(contributeList, function (count) {
                callback(count);
            })
        });
    };
    me.getCountOfContributions = function (coutributeList, callback) {
        var count = 0;
        var aboveRequiredDate = new Date();
        aboveRequiredDate.setMonth(aboveRequiredDate.getMonth() - 3);
        async.each(coutributeList, function (countribute, callback) {
            if (countribute[common.userRepositoryLanguage.created_at]) {
                // console.log(countribute[common.userRepositoryLanguage.created_at]);
                var time = new Date(countribute[common.userRepositoryLanguage.created_at]).getTime();
                if (aboveRequiredDate.getTime() < time) {
                    // console.log(aboveRequiredDate,countribute[common.userRepositoryLanguage.created_at]);
                    count++;
                }
            }
            callback(null, count);
        }, function (err, countContribute) {
            if (err) {
                return crashed(err, "at count of Contributions");
            }
            else {
                callback(count);
            }
        });
    };
    me.reqeustForGitHub = function (requireUrl, callback) {
        var url = config.GITHUB_OPTIONS.URL + requireUrl;
        request.get({
            "url": url,
            "headers": {
                "User-Agent": "request"
            }
        }, function (error, response, body) {
            if (error) {
                return crashed(error, "error while request Api");
            }
            else if (response.statusCode === 200) {
                callback(JSON.parse(body));
            }
            else {
                return crashed("Unknown Resopnse code" + response.statusCode, body);
            }
        });
    };
    function crashed(error, details, logged) {
        if (!logged) {
            console.log(error, details);
        }
        errorCallback(error, details, true);
    }
};
module.exports = GitHubApi;