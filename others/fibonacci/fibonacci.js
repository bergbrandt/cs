/**
 * Recursive function to calculate the nth fibonacci number. Recursion is O(n^2) at least. Very inefficient.
 * @function fibonacciR
 * @param {number} n
 * @return {number}
 */
var fibonacciR = function(n) {
    var fib;
    if(n === 0) { // fibonacciR(0) = 0
        
        return 0;
    } else if (n === 1) { // fibonacciR(1) = 1;
        return 1;
    } else {
        fib = fibonacciR(n-1) + fibonacciR(n-2);
    }
    return fib;
};

/**
 * Iterative function to calculate the nth fibonacci number. Iteration is O(n).
 * @function fibonacciR
 * @param {number} n
 * @return {number}
 */
var fibonacciI = function(n) {
    var prev = 0;
    var curr = 0;
    var sum = 0;
    for (var i = 1; i <= n; i++) {
        if (i === 1) {
            cur = 1;
            prev = 0;
        } else {
            sum = prev + cur;
            prev = cur;
            cur = sum;
        }
    }
    return sum;
};
