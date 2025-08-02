import { Tree } from "./tree.js";

let tree = new Tree();

// let root = tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// tree.insert(root, 11);
// tree.insert(root, 10);
// tree.prettyPrint(root);

// root = tree.rebalance();

// tree.prettyPrint(root);

function createArray() {
    let arr = [];
    for (let i = 0; i < 20; i++) {
        let number = Math.floor(Math.random() * 101);
        arr.push(number);
    }
    return arr;
}

function callback(elem) {
    console.log(elem.data);
}

let root = tree.buildTree(createArray());
tree.insert(root, 122);
tree.insert(root, 125);
tree.insert(root, 178);
tree.insert(root, 156);
tree.prettyPrint(root);
console.log(tree.isBalanced());
root = tree.rebalance();
tree.prettyPrint(root);
console.log(tree.isBalanced());
tree.inOrderForEach(callback);