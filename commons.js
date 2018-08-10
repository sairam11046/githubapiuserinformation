var Commons = function () {
    var me = this;
    me.userBasicInfoConstant = {
        "name": "name",
        "email": "email",
        "company": "company",
        "blog": "blog",
        "designation": "bio",
        "location": "location",
        "GitHubUrl": "url",
        "GitHubCreateAt": "created_at"
    };
    me.userRepositoryLanguage = {
        "language": "language",
        "contributionMonths": 3,
        "topRequiredSkills": 3,
        "created_at": "created_at"
    };
    me.mergeSort = function (array) {
        if (array.length > 1) {
            var mid = Math.floor(array.length / 2);
            var leftarray = [];
            var rightarray = [];
            for (var left = 0; left < mid; left++) {
                leftarray.push(array[left]);
            }
            for (var right = mid; right < array.length; right++) {
                rightarray.push(array[right]);
            }
            // console.log("leftArray", leftarray, "rightarray", rightarray);
            me.mergeSort(leftarray);
            me.mergeSort(rightarray);
            var i = 0, j = 0, k = 0;
            while (i < leftarray.length && j < rightarray.length) {
                var leftKey = Object.keys(leftarray[i])[0];
                var rightKey = Object.keys(rightarray[j])[0];
                // console.log("left", leftKey, "value",leftarray[i][leftKey],"right", rightKey,"value",rightarray[j][rightKey]);
                if (leftarray[i][leftKey] > rightarray[j][rightKey]) {
                    array[k] = leftarray[i];
                    i++;
                }
                else {
                    array[k] = rightarray[j];
                    j++;
                }
                k++;
            }
            while (i < leftarray.length) {
                array[k] = leftarray[i];
                i++;
                k++;
            }
            while (j < rightarray.length) {
                array[k] = rightarray[j];
                j++;
                k++;
            }

            // console.log("merge", array);

        }
        return array;
    }
};

module.exports = Commons;