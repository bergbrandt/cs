/**
 * Searches for an element in a array
 * @param {?} x item to be found
 * @param {Array} arr sorted array to be searched
 * @return {(number|boolean)} the index where the element was found or false
 */
var binarySearch = function(x, arr, iS, iE) {
    var n = arr.length;
    var iS = iS || 0;
    var iE = iE || n-1;
    var m = iS + Math.floor((iE - iS)/2);

    if (n === 0 || // if the array is empty
        x < arr[0] || x > arr[n-1] || // OR search number is out of range
        (iE === iS && x !== arr[m])) { // OR range is already unitary but a match hasn't been found
        return false;
    } else if (x === arr[m]) { // If a match is found
        return  m;
    } else if (x < arr[m]) { // If search element is less than the middle element, continue on the left half
        return  binarySearch(x, arr, iS, m);
    } else if(x > arr[m]) { // If search element is greater than the middle element, continue on the right half
        return binarySearch(x, arr, m + 1, iE);
    }
}
