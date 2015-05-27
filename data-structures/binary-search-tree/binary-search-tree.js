/**
 * Implements a Binary Search Tree in JS
 * @class BinarySearchTree
 * @param {!Array} list
 * @constructor
 */
var BinarySearchTree = function(list) {
    if(typeof list !== 'undefined' && list.constructor.toString().indexOf("Array") > -1) {
        this._create(list);
    }
    return this;
};

/**
 * @prototype BinarySearchTree
 */
BinarySearchTree.prototype = {
    constructor: BinarySearchTree,
    /**
     * Represents the tree itself
     * @type {Object} 
     * @private
     */
    _root: null,  
    /**
     * Creates a node on the tree
     * @method _makeNode
     * @param {!(number|string)} key
     * @param {?} data
     * @private
     */
    _makeNode: function (key, data){
        return {
            key: key,
            data: data,
            left: null,
            right: null
        }
    },
    /**
     * Creates an empty node on the tree
     * @method _makeNode
     * @param {Array} list
     * @constructs
     * @private
     */
    _create : function(list) {
        var n = list.length;
        var item;
        for(var i=0; i < n; i++) {
            item = list[i];
            if (typeof item === 'object' && typeof item.key !== 'undefined' && typeof item.data !== 'undefined') { 
                this.insert(item.key, item.data);
            } else {
                this.insert(item);
            }
        }
    },
    /**
     * Inserts a node in the sorted position
     * @method insert
     * @param {!(number|string)} key
     * @param {?} data
     */
    insert: function(key, data) {
        var newNode = this._makeNode(key, data);
        var current; // internal pointer
        // Root is empty
        if(this._root === null) {
            this._root = newNode;
        } else {
            current = this._root;
            // Walk the tree to find node placement
            while(true) {
                if(key < current.key) {
                    if(current.left === null) {
                        current.left = newNode;
                        break;
                    } else {
                        current = current.left;
                    }
                } else if (key > current.key) {
                    if(current.right === null) {
                        current.right = newNode;
                        break;
                    } else {
                        current = current.right;
                    }
                } else {
                    break;
                }
            }
        }
        
    },
    /**
     * Finds a node by its key
     * @method find
     * @param {!(number|string)} key
     * @return {Object} found node
     */
    find: function(key) {
        var current = this._root;
        var found = false;
        // Walk the tree to find node placement
        while(!found && current) {
            if(key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            } else {
                found = true;
            }
        }
        return current;
    },
    /**
     * Traverses the binary tree and performs a process
     * @method traverse
     * @param {Object} process
     */
    traverse: function(process){
        
        //helper function
        function inOrder(node){
            if (node){
                
                //traverse the left subtree
                if (node.left !== null){
                    inOrder(node.left);
                }            
                
                //call the process method on this node
                process.call(this, node);
            
                //traverse the right subtree
                if (node.right !== null){
                    inOrder(node.right);
                }
            }        
        }
        
        //start with the _root
        inOrder(this._root);    
    },
    /**
     * Converts the binary tree into an array
     * @method toArray
     * @returns {Array} with 
     */
    toArray: function(){
        var arr = [];
        this.traverse(function(node){
            if (typeof node.data === 'undefined') {
                arr.push(node.key);
            } else {
                arr.push({'key': node.key, 'data': node.data});
            }
        });
        return arr;
    },
    /**
     * Prints the tree
     * @method print
     */
    print: function(){
        this.traverse(function(node){
             print('key:',node.key);
             print('data:',node.data);
        });
    }
};