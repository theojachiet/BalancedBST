import { Tree } from "./tree.js";

let tree = new Tree();

let root = tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(root, 10);
// tree.insert(root, 11);
tree.prettyPrint(root);
let node = tree.find(root, 8);
// console.log(tree.height(node));
console.log(tree.isBalanced());