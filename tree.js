export class Tree {
    constructor(array) {
        this.unsortedArray = array;
        this.root = null;
    }

    buildTree(unsortedArray) {
        let sortedArray = this.formatArray(unsortedArray);

        this.root = this.sortedArrayToBST(sortedArray, 0, sortedArray.length - 1)
        return this.root;
    }

    formatArray(unsortedArray) {
        let sortedArray = unsortedArray.sort((a, b) => a - b);

        //Eliminating duplicates
        for (let i = 0; i < sortedArray.length; i++) {
            if (sortedArray[i] === sortedArray[i - 1]) {
                sortedArray.splice(i, 1);
            }
        }

        return sortedArray;
    }

    sortedArrayToBST(array, start, end) {
        if (start > end) return null;

        let middle = start + Math.floor((end - start) / 2);
        let root = new Node(array[middle]);

        root.left = this.sortedArrayToBST(array, start, middle - 1);
        root.right = this.sortedArrayToBST(array, middle + 1, end);

        return root;
    }

    insert(root, data) {
        if (root === null) return new Node(data);

        //Handle duplicates
        if (root.data === data) return root;

        if (data < root.data) root.left = this.insert(root.left, data);
        else if (data > root.data) root.right = this.insert(root.right, data);

        this.root = root;
        return root;
    }

    getSuccessor(root) {
        root = root.right;
        while (root !== null && root.left !== null) root = root.left;

        return root;
    }

    deleteItem(root, data) {
        if (root === null) return root;

        //Traversing tree until we find the target node
        if (root.data > data) root.left = this.deleteItem(root.left, data);
        else if (root.data < data) root.right = this.deleteItem(root.right, data);
        else {
            //We found the targeted node

            //Right child only or 0 child
            if (root.left === null) return root.right;

            //Only left child
            if (root.right === null) return root.left;

            //Both childs
            let successor = this.getSuccessor(root);
            root.data = successor.data;
            root.right = this.deleteItem(root.right, successor.data);
        }

        this.root = root;
        return root;
    }

    find(root, data) {
        if (root === null) return 'value not found';

        if (root.data === data) return root;

        if (root.data > data) return this.find(root.left, data);
        else return this.find(root.right, data);
    }

    levelOrderFOrEach(callback, root = this.root) {
        if (!callback) throw new Error('You must provide a callback function');

        if (root === null) return;
        let queue = [];
        queue.push(root);

        while (queue.length > 0) {
            let current = queue[0];
            if (current.left !== null) queue.push(current.left);
            if (current.right !== null) queue.push(current.right);
            callback(queue[0]);
            queue.shift();
        }
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}