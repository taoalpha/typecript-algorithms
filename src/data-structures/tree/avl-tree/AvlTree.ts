import BinarySearchTree from '../binary-search-tree/BinarySearchTree';
import BinarySearchTreeNode from '../binary-search-tree/BinarySearchTreeNode';

export default class AvlTree<T> extends BinarySearchTree<T> {
    insert(value: T): BinarySearchTreeNode<T> {
        // Do the normal BST insert.
        let node = super.insert(value);

        // Let's move up to the root and check balance factors along the way.
        let currentNode = node;
        while (currentNode) {
            this.balance(currentNode);
            currentNode = currentNode.parent;
        }

        return node;
    }

    remove(value: T): boolean {
        throw new Error(`Can't remove ${value}. Remove method is not implemented yet`);
    }

    balance(node: BinarySearchTreeNode<T>): void {
        // If balance factor is not OK then try to balance the node.
        if (node.balanceFactor > 1) {
            // Left rotation.
            if (node.left.balanceFactor > 0) {
                // Left-Left rotation
                this.rotateLeftLeft(node);
            } else if (node.left.balanceFactor < 0) {
                // Left-Right rotation.
                this.rotateLeftRight(node);
            }
        } else if (node.balanceFactor < -1) {
            // Right rotation.
            if (node.right.balanceFactor < 0) {
                // Right-Right rotation
                this.rotateRightRight(node);
            } else if (node.right.balanceFactor > 0) {
                // Right-Left rotation.
                this.rotateRightLeft(node);
            }
        }
    }

    rotateLeftLeft(rootNode: BinarySearchTreeNode<T>): void {
        // Detach left node from root node.
        const leftNode = rootNode.left;
        rootNode.setLeft(null);

        // Make left node to be a child of rootNode's parent.
        if (rootNode.parent) {
            rootNode.parent.setLeft(leftNode);
        } else if (rootNode === this.root) {
            // If root node is root then make left node to be a new root.
            this.root = leftNode;
        }

        // If left node has a right child then detach it and
        // attach it as a left child for rootNode.
        if (leftNode.right) {
            rootNode.setLeft(leftNode.right);
        }

        // Attach rootNode to the right of leftNode.
        leftNode.setRight(rootNode);
    }

    rotateLeftRight(rootNode: BinarySearchTreeNode<T>): void {
        // Detach left node from rootNode since it is going to be replaced.
        const leftNode = rootNode.left;
        rootNode.setLeft(null);

        // Detach right node from leftNode.
        const leftRightNode = leftNode.right;
        leftNode.setRight(null);

        // Preserve leftRightNode's left subtree.
        if (leftRightNode.left) {
            leftNode.setRight(leftRightNode.left);
            leftRightNode.setLeft(null);
        }

        // Attach leftRightNode to the rootNode.
        rootNode.setLeft(leftRightNode);

        // Attach leftNode as left node for leftRight node.
        leftRightNode.setLeft(leftNode);

        // Do left-left rotation.
        this.rotateLeftLeft(rootNode);
    }

    rotateRightLeft(rootNode: BinarySearchTreeNode<T>): void {
        // Detach right node from rootNode since it is going to be replaced.
        const rightNode = rootNode.right;
        rootNode.setRight(null);

        // Detach left node from rightNode.
        const rightLeftNode = rightNode.left;
        rightNode.setLeft(null);

        if (rightLeftNode.right) {
            rightNode.setLeft(rightLeftNode.right);
            rightLeftNode.setRight(null);
        }

        // Attach rightLeftNode to the rootNode.
        rootNode.setRight(rightLeftNode);

        // Attach rightNode as right node for rightLeft node.
        rightLeftNode.setRight(rightNode);

        // Do right-right rotation.
        this.rotateRightRight(rootNode);
    }

    rotateRightRight(rootNode: BinarySearchTreeNode<T>): void {
        // Detach right node from root node.
        const rightNode = rootNode.right;
        rootNode.setRight(null);

        // Make right node to be a child of rootNode's parent.
        if (rootNode.parent) {
            rootNode.parent.setRight(rightNode);
        } else if (rootNode === this.root) {
            // If root node is root then make right node to be a new root.
            this.root = rightNode;
        }

        // If right node has a left child then detach it and
        // attach it as a right child for rootNode.
        if (rightNode.left) {
            rootNode.setRight(rightNode.left);
        }

        // Attach rootNode to the left of rightNode.
        rightNode.setLeft(rootNode);
    }
}
