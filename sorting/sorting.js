
/**
 * Sorts an array using the Bubble Sort algorithm.
 * @function bubbleSort
 * @param {Array} array to be sorted.
 * @return {Array} sorted array.
 */
var bubbleSort = function (arr) {
    var hasSwapped;
    var n = arr.length;
    while (hasSwapped !== false) {
        hasSwapped = false;
        for (var i = 0; i < n-1; i++) {
            if (arr[i] > arr[i + 1]) {
                arr.swap(i, i + 1);
                hasSwapped = true;
            }
        }
    }
    return arr;
};

/**
 * Sorts an array using the Insert Sort algorithm.
 * @function insertSort
 * @param {Array} array to be sorted.
 * @return {Array} sorted array.
 */
var insertSort = function (arr) {
    var n = arr.length;
    var j = 0;
    for (var i = 0; i < n-1; i++) {
        j = i+1;
        while (j < n) {
            if (arr[i] > arr[j]) {
                arr.swap(i,j);
            }
            j++;
        }
    } 
    return arr;
};


/**
 * Sorts an array using the Merge Sort algorithm.
 * @function mergeSort
 * @param {Array} arr input array
 * @return {Array} sorted array
 */
var mergeSort = function(arr) {
    var n = arr.length;
    var oArr = [];
    var runOriginal = false;

    /**
     * MergeSort run helper.
     * @function mergeSortRun
     * @param {Array} arr input array
     * @param {number} iLeft starting pointer for the left run
     * @param {number} iRight starting pointer for the right run
     * @param {number} iEnd the index for the end of the run on the right
     * @param {Array} oArr is the output array
     * @return {Array} sorted array
     * @private
     */
    var mergeSortRun = function(arr, iLeft, iRight, iEnd, oArr) {
        var i0 = iLeft; 
        var i1 = iRight;
        var j;
        // While there are elements in the left or right runs
        for (j = iLeft; j < iEnd; j++) {
           if ((arr[i0] <= arr[i1] // If item on the left pointer is smaller OR
           || i1 >= iEnd) && // If left pointer is greater or equal the iEnd
           i0 < iRight) // Both cases above are conditional to the left pointer being smaller than the index of the right run
           {  
              // Sorted: Send element in the left to the output array
              oArr[j] = arr[i0];
              i0 = i0 + 1;
           } else {
              // Unsorted: Send element in the right to the output array 
              oArr[j] = arr[i1];
              i1 = i1 + 1;
           }
        }
        return oArr;
    }
    
    // Merge Sort logic
    // Arrays of length 1 are sorted
    // Make longer sorted runs of length 2, 4, 8, 16...
    for (width = 1; width < n; width = 2 * width) {
        runOriginal = !runOriginal; // flip runOriginal
        for (i = 0; i < n; i = i + 2 * width) {
            // Swapping the array on each avoids a oArr operation
            if(runOriginal === true) {
                oArr = mergeSortRun(arr, i, Math.min(i+width, n), Math.min(i+2*width, n), oArr);
            } else {
                arr = mergeSortRun(oArr, i, Math.min(i+width, n), Math.min(i+2*width, n), arr);
            }
        }
    }
    return (runOriginal === true) ? oArr : arr;
};


/**
 * Sorts an array using the Quick Sort algorithm.
 * @function quickSort
 * @param {Array} arr input array
 * @return {Array} sorted array
 */
var quickSort = function(arr) {
    var n = arr.length;
    
    // Helpers

    /**
     * Chooses the pivot.
     * @function choosePivot
     * @param {number} lo is the index of the leftmost element of the subarray
     * @param {number} is the index of the rightmost element of the subarray
     * @return {number} pivot index
     */
    var choosePivot = function(arr, lo, hi) {
        return Math.ceil((lo+hi)/2);
    }
    
    /**
     * Runs the sorting in a partition.
     * @function partitionRun
     * @param {Array}  arr is the array or sub-array to be run
     * @param {number} lo is the index of the leftmost element of the subarray
     * @param {number} is the index of the rightmost element of the subarray (inclusive)
     * @return {number} index for the next partitions
     */
    var partitionRun = function(arr, lo, hi) {
         var pivotIndex = choosePivot(arr, lo, hi);
         var pivotValue = arr[pivotIndex];
         var storeIndex = lo;

         // put the chosen pivot at the end (arr[hi])
         arr.swap(pivotIndex,hi);

         // Compare remaining array elements against pivotValue = arr[hi]
         for (var i = lo; i < hi; i++) {
             if (arr[i] <= pivotValue) {
                 if(i !== storeIndex) { // Only swap if indices are different
                     arr.swap(i, storeIndex);
                 }
                 storeIndex++;
              }
         }

         // Move pivot to its final place
         arr.swap(storeIndex,hi);

         // Return split index for the next partitions
         return storeIndex;
    }

    /**
     * Recursive Quick Sort
     * @function quickSortR
     * @param {Array}  arr is the array or sub-array to be run
     * @param {number} lo is the index of the leftmost element of the subarray
     * @param {number} is the index of the rightmost element of the subarray (inclusive)
     */
    var quickSortR = function(arr, lo, hi) {
        var p;
        if (lo < hi) {
           p = partitionRun(arr, lo, hi);
           quickSortR(arr, lo, p - 1);
           quickSortR(arr, p + 1, hi);
        }
    }

    // Start the recursion with the full array
    quickSortR(arr, 0, n-1);

    return arr;
}

/**
 * Decides when to use one algorithm or the other based on the number of items
 * @function smartSort
 * @param {Array} arr
 */
var smartSort = function(arr){
    var n = arr.length;
    if (n >= 10000) {
        quickSort(arr); 
    } else if (n >= 1000){
        mergeSort(arr);
    } else {
        insertSort(arr);
    }
    return arr;
}
