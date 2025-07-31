import { Tree } from "./tree.js";

let tree = new Tree();

let root = tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// root = tree.deleteItem(root, 88);
tree.prettyPrint(root);
console.log(tree.find(root, 8));