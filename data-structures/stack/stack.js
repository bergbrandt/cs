/**
 * @class Stack
 * @constructor
 * @param {Array} data
 * @param {?number} max
 */
var Stack = function(data, max) {
    if(data && data.constructor.toString().indexOf('Array') > -1) {
        if(!isNaN(max)) {
            this._max = max;
        }
        this._create(data);
    }
    return this;
};

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
    _makeNode: function () {
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
    _create: function(data) {
        var n = data.length;
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
        return this;
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
        return this;
    },

    /**
     * Peeks at the top element and returns its data
     * @method peek
     * @return {?Object}
     * @public
     */
    peek: function() {
        return this._top ? this._top.data : null;
    },

    /**
     * Returns the length of the stack
     * @method getLength
     * @return {number} length
     * @public
     */
    getLength: function() {
        return this._length;
    },

    /**
     * Returns if the stack is Underflow or not
     * @method isUnderflow
     * @return {boolean}
     * @public
     */
    isUnderflow: function() {
        return this._underflow;
    },

    /**
     * Returns if the stack is Overflow or not
     * @method isUnderflow
     * @return {boolean}
     * @public
     */
    isOverflow: function() {
        return this._overflow;
    },

    /**
     * Sets the stack max value
     * @method setMax
     * @public
     */
    setMax: function(max) {
        this._max = max;
    }
};

/**
 * @class StackSet
 * @constructor
 * @param {Array} data
 * @param {?number} max Number of items per stack
 */
var StackSet = function(data, max) {
    if(data && data.constructor.toString().indexOf('Array') > -1) {
        if(!isNaN(max)) {
            this._max = max;
        }
        this._create(data);
    }
    return this;
};

StackSet.prototype = {
    // Linking the Constructor Function
    constructor : StackSet,
    
    /**
     * Stacks in the stackset
     * @property _staks
     * @type {?Object}
     * @private
     */
    _stacks: null,
    
    /**
     * Current Stack
     * @property _stacks
     * @type {?Object}
     * @private
     */
    _stack: null,

    /**
     * Stores how many elements are there in the whole stack set
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
     * Pushes a new stack into the uber stack and sets the current stack
     * @method _pushStack
     * @param {Array} data
     * @param {?number} max
     * @private
     */
    _pushStack: function() {
        var newStack;
        
        // Create the uber stack, if null
        if(this._stacks === null) {
            this._stacks = new Stack(); // This is the Stack that contains all the other stacks
        }

       // Create an empty stack
        newStack = new Stack();
        newStack.setMax(this._max);
        
        this._stack = newStack;
        this._stacks.push(newStack);
    },

    /**
     * Pops a stack from the uber stack and sets the current stack
     * @method _popStack
     * @param {Array} data
     * @param {?number} max
     * @private
     */
    _popStack: function() {
        this._stacks.pop();
        this._stack = this._stacks.peek();
    },

    /**
     * Has logic to determine each stack we are on 
     * @method _getCurrentStack
     * @return {?Object} current stack
     * @private
     */
    _getCurrentStack: function() {
        if (this._stack === null || this._stack.isOverflow()) {
            this._pushStack();
        } else if (this._stack.isUnderflow()) {
            this._popStack();
        }

        return this._stack;
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
        this._getCurrentStack().push(data);
        this._length++;
        return this;
    },

    /**
     * Pops the top element from the stack
     * @method pop
     * @public
     */
    pop: function() {
        this._getCurrentStack().pop();
        this._length = Math.max(this._length-1, 0);
        return this;
    },

    /**
     * Peeks at the top element and therefore the entire list by reference
     * @method peek
     * @return {?Object} top
     * @public
     */
    peek: function() {
        this._stacks.peek();
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
};
