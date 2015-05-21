// TODO: comment properly

/**
 * @class Stack
 * @constructor
 * @param {Array} data
 * @param {?number} max
 */
var Stack = function(data, max) {
    if(data && data.constructor.toString().indexOf('Array') > -1) {
        this._create(data, max);;
    }
    return this;
}

Stack.prototype = {
    // Linking the Constructor Function
    constructor : Stack,
    
    /**
     * The top of the stack. The stack itself. It contains references to next nodes.
     * @property _top
     * @type {?Object}
     * @private
     */
    _top: null,

    /**
     * Determines if the stack is underflow or not.
     * @property _underflow
     * @type {boolean}
     * @default true
     * @private
     */
    _undeflow: true,

    /**
     * Determines if the stack is overflow or not.
     * @property _overflow
     * @type {boolean}
     * @default false
     * @private
     */
    _overflow: false,

    /**
     * Stores the length of the Stack.
     * @property _length
     * @type {number}
     * @default 0
     * @private
     */
    _length: 0,
    
    /**
     * Max number of items on the stack, set at construction time.
     * @property _underflow
     * @type {number}
     * @private
     */
    _max: null,

    // Private Methods
    /**
     * Creates an empty node.
     * @method _makeNode
     * @private
     */
    _makeNode: function (){
        return {
            data: null,
            next: null
        }
    },

    /**
     * Creates/Populates the list. 
     * @method _create
     * @param {Array} data
     * @param {?number} max
     * @private
     */
    _create: function(data,max) {
        var n = data.length;
        if(max) {
            this._max = max;
        }
        for (var i=0; i<n; i++) {
            this.push(data[i]);
        }
    },

    // PUBLIC

    /**
     * Pushes data into the stack
     * @method push
     * @param {?} data
     * @public
     */
    push: function(data) {
        var top = null;
        
        if(this._overflow === true) {
            console.log('WARNING: Stack Overflow');
            return;
        }
        if (this._top !== null) {
            top = this._makeNode();
            top.next = this._top;
            this._top = top;
        } else {
            this._top = this._makeNode();
            // Underflow State
            this._underflow = false;
        }
        
        // Insert item, increase count
        this._top.data = data;
        this._length++;
        
        // Overflow State 
        if(typeof this._max !== 'undefined' && this._length === this._max) {
            this._overflow = true;
        }
    },

    /**
     * Pops the top element from the stack
     * @method pop
     * @public
     */
    pop: function() {
        if(this._underflow === true) {
            console.log('WARNING: Stack Underflow');
            return;
        }
        
        this._top = this._top.next;
        this._length--;
        
        // Underflow State
        if (this._length === 0) {
            this._underflow = true;
        }
        
        // Overflow State 
        if(typeof this._max !== 'undefined' && this._length < this._max) {
            this._overflow = false;
        }
    },

    /**
     * Peeks at the top element and therefore the entire list by reference
     * @method peek
     * @return {?Object} top
     * @public
     */
    peek: function() {
        return this._top;
    },

    /**
     * Returns the length of the stack
     * @method getLength
     * @return {number} length
     * @public
     */
    getLength: function() {
        return this._length;
    }
}