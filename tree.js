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