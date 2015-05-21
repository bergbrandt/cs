// Print
var print = function () {
    var a = arguments;
    var al = a.length;
    var el = document.getElementById('print');
    var p;
    if (!el) {
        el = document.createElement('code');
        el.id = 'print';
        el.innerHTML = '';
        p = document.getElementsByTagName("BODY")[0];
        p.appendChild(el);
    }
    for (var i = 0; i < al; i++) {
        el.innerHTML += a[i] + ' ';
    }
    el.innerHTML += '<br/>';
}

// Swap Helper
Array.prototype.swap = function (i, j) {
    if (typeof i === 'undefined' || typeof j === 'undefined' || i === j ) return;
    var temp = this[i];
    this[i] = this[j];
    this[j] = temp;
    ////print('Swap:', this);
}

// Generate data
var generateRandomArray = function(n){
    var newArray = [];
    var rand;
    var hash = [];
    while (newArray.length < n){
        // Random
        rand = Math.floor((Math.random() * n)+1);
        if(hash[rand] !== true) {
            newArray.push(rand);
            hash[rand] = true;
        }
    }
    return newArray;
}

// Copy From Helper
var copyFrom = function(B,A) {
    n = B.length;
    for(var i = 0; i < n; i++)
        A[i] = B[i];
}