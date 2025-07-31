export class Tree {
    constructor(array) {
        this.unsortedArray = array;
        this.root = null;
    }

    buildTree(unsortedArray) {
        let sortedArray = this.formatArray(unsortedArray);

        return this.sortedArrayToBST(sortedArray, 0, sortedArray.length - 1);
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

        return root;
    }

    getSuccessor(root) {
        root = root.right;
        while(root !== null && root.left !== null) root = root.left;

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
        return root;
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