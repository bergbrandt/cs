/**
 * Searches for an element in a array
 * @param {?} x item to be found
 * @param {Array} arr sorted array to be searched
 * @return {(number|boolean)} the index where the element was found or false
 */
var binarySearch = function(x, arr) {
    var n = arr.length;
    var m = Math.floor(n/2);
    var r = false; // default is false

    // if the array is empty or search number is out of range
    if (n === 0 || x < arr[0] || x > arr[n-1]) {
        return false;
    }

    if (x < arr[m]) { // If search element is less than the middle element, continue on the left half
        r = binarySearch(x, arr.slice(0, m));
    } else if(x > arr[m]) { // If search element is greater than the middle element, continue on the right half
        r = binarySearch(x, arr.slice(m, n));
        r = r === false ? false : r + m; // If result if not false, at m to obtain the final index
    } else if (x === arr[m]) {
        r = m;
    } 

    return r;
}
