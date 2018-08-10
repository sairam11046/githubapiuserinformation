var arrayOfobjects = [
    {Ruby: 9},
    {Elixir: 1},
    {HTML: 4},
    {JavaScript: 3},
    {Go: 9},
    {Shell: 1},
    {CSS: 2}];
function mergeSort(array) {
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
        mergeSort(leftarray);
        mergeSort(rightarray);
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
// console.log(mergeSort(arrayOfobjects));
var date=new Date();
date.setMonth(date.getMonth()-3);
console.log(date);
var check=new Date("2018-06-10T09:58:41.527Z").getTime();
if(date.getTime()<check){
    console.log("hi",date.getTime(),"check",check);
}