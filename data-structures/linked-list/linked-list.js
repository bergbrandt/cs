/**
 * Linked List (single)
 * --------------------
 */

/**
 * Linked List JS Implementation.
 * @class LinkedList
 * @constructor
 * @param {!Array} list
 */
var LinkedList = function(list){
    if(typeof list !== 'undefined' && list.constructor.toString().indexOf("Array") > -1) {
        this._create(list);
    }
    return this;
};

/**
 * Prototype
 */
LinkedList.prototype = {
    // constructor
    constructor: LinkedList,

    /**
     * Start. The list itself. Contains reference to the next node.
     * @property _start
     * @type {?Object}
     * @private
     */
    _start: null,

    /**
     * The end pointer.
     * @property _end
     * @type {?}
     * @private
     */
    _end: null,

    /**
     * The length of the list.
     * @property _length
     * @type {number}
     * @private
     */
    _length: 0,

    /**
     * Method to make the nodes.
     * @method _makeNode
     * @return {Object} New node
     * @private
     */
    _makeNode : function(){
        return {
            data: null,
            next: null
        }
    },

    /**
     * Creates/Populates the Linked List from an Array. Runs on construction.
     * @method create
     * @param {Array} list
     * @private
     */
    _create : function(list) {
        if(typeof list === 'undefined' || list.constructor.toString().indexOf("Array") < 0) {
            return;
        }
        var n = list.length;
        for(var i=0; i < n; i++){ 
            this.insert(list[i]);
        }
    },

    /**
     * Inserts a new element into the list
     * @method insert
     * @param {?} data
     * @param {?} where 
     * @public
     */
    insert : function(data, where){
        var where = where || 'end';
        var newNode = this._makeNode();

        // Increasing Length
        this._length++;

        // Setting data
        newNode.data = data;

        if(this._start === null) {
            this._start = newNode; 
            this._end = this._start;
        } else {
            if (where === 'start') {
                newNode.next = this._start;
                this._start = newNode;
            } else if (where === 'end') {
                this._end.next = newNode;
                this._end = newNode;
            }
        }

    },

    /**
     * Returns the list of items
     * @method create
     * @return {?Object} list
     * @public
     */
    getList : function() {
        return this._start;
    },

     /**
     * Returns the list
     * @method create
     * @return {number} list
     * @public
     */
    getLength : function() {
        return this._length;
    },
}

