/**
 * STRING
 */

/**
 * Reverses a string. It should be O(n), assuming string lookups are O(1).
 * @method reverse
 * @return {string} reversed string
 */
String.prototype.reverse = function(){
    var newString = '';
    var length = this.length;
    for (var i = 0; i < length; i++) {
        newString += this[length-(i+1)];
    }
    return newString;
};

/**
 * Jumbles a String. It should be O(n) in a best case scenario, assuming string lookups are O(1).
 * @method jumble
 * @return {string} jumbled string
 */
String.prototype.jumble = function(){
    var newString = '';
    var rand;
    var hash = [];
    var length = this.length;
    while (newString.length < length){
        // Random
        rand = Math.floor((Math.random() * length));
        
        if(hash[rand] !== true) {
            newString += this[rand];
            hash[rand] = true;
        }
    }
    return newString;
};

/**
 * Checks if a string has a repeated character. It should be O(n) in the worst case scenario. Assuming hash lookups are O(1).
 * @method hasRepeated
 * @return {boolean} whether there is a repeated character or not.
 */
String.prototype.hasRepeated = function(){
    var hash = {};
    var n = this.length;
    var item;
    for (var i=0; i<n; i++) {
        item = this[i];
        if (hash[item] === true) {
            return true;
        } else {
            hash[item] = true;
        }
    }
    return false;
};

/**
 * Checks if a string has a repeated character. Case: You cannot use other data structures. It should also be O(n). Assuming indexOf lookups are O(1).
 * @method hasRepeated2
 * @return {boolean} whether there is a repeated character or not.
 */
String.prototype.hasRepeated2 = function(){
    var s = '';
    var n = this.length;
    var item;
    for (var i=0; i<n; i++) {
        item = this[i];
        if(s.indexOf(item) > -1) {
            return true;
        } else {
            s += item;
        }
    }
    return false;
};

