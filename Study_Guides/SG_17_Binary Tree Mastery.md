# 📘 Study Guide 17 — Binary Tree Mastery

> **Difficulty Range**: Beginner → Expert (CF 800 → 2200)
> **Core Idea**: A binary tree is a tree where each node has at most two children. Their constrained structure enables a rich library of traversal, search, and balancing algorithms — and understanding them deeply unlocks intuition for all tree-based data structures in competitive programming.

---

## 🧠 Chapter 1 — What Is a Binary Tree, Really?

### Distinguishing Binary Trees from General Trees

In the trees we discussed in SG_08, a node could have any number of children. A binary tree specifically restricts this to at most two: a **left child** and a **right child**. The distinction matters because the left/right labeling gives binary trees an inherent order — left is "less than" and right is "greater than" in a BST, left is "earlier" in a heap, and so on.

This extra structure makes binary trees not just a restricted tree but a fundamentally richer object. The left-right ordering enables in-order traversal to produce sorted output, enables binary search, enables heapification, and enables a clean recursive decomposition where every tree is either empty or a root with a left subtree and a right subtree.

### Essential Terminology

A **full binary tree** has every node with 0 or 2 children — never exactly 1. A **complete binary tree** has all levels filled except possibly the last, which is filled left to right. A **perfect binary tree** is both full and complete — all leaves are at the same level and every internal node has exactly 2 children. A **balanced binary tree** keeps the height at O(log N).

The height of a perfect binary tree with N nodes is exactly `floor(log₂ N)`. This is why operations on balanced binary trees take O(log N) — the height is logarithmic, and most algorithms make one decision per level.

---

## 🧠 Chapter 2 — Binary Tree Representation

### Node-Based (Pointer) Representation

The natural way to represent a binary tree in Python is with node objects:

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left    # Left child (or None)
        self.right = right  # Right child (or None)
```

Building trees from arrays (common in Leetcode/interview problems):

```python
from collections import deque

def build_from_level_order(values):
    """Build binary tree from level-order list (None means empty node)."""
    if not values or values[0] is None:
        return None
    
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    
    while queue and i < len(values):
        node = queue.popleft()
        
        if i < len(values) and values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    
    return root
```

### Array-Based (Implicit) Representation

For **complete** binary trees (heaps), you don't need explicit pointers. Store nodes in a 1-indexed array where the root is at index 1, and for any node at index `i`: left child is `2i`, right child is `2i+1`, and parent is `i // 2`. This implicit structure is why heaps are so cache-friendly and efficient.

```python
# Heap stored as array (1-indexed)
heap = [None, 10, 8, 7, 5, 3, 6, 2, 1, 4]
#  Index:       1   2  3  4  5  6  7  8  9

# Node 2 has value 8, left child is heap[4]=5, right child is heap[5]=3
# Node 3 has value 7, left child is heap[6]=6, right child is heap[7]=2
```

---

## 🧠 Chapter 3 — Traversals: The Four Essential Orderings

Binary tree traversals are the foundation of nearly every algorithm on binary trees. Each traversal visits every node exactly once but in a different order. Understanding WHY each order is useful is as important as knowing how to implement them.

### Pre-order (Root → Left → Right)

Pre-order processes the root before its children. This gives you a "top-down" view — useful for copying a tree, serializing a tree, and prefix expressions.

```python
def preorder(node):
    if node is None:
        return []
    return [node.val] + preorder(node.left) + preorder(node.right)

def preorder_iterative(root):
    if not root: return []
    result, stack = [], [root]
    while stack:
        node = stack.pop()
        result.append(node.val)
        # Push right first so left is processed first (LIFO order)
        if node.right: stack.append(node.right)
        if node.left:  stack.append(node.left)
    return result
```

### In-order (Left → Root → Right)

In-order gives the "natural sorted order" for a BST. Processing left subtree first, then root, then right subtree visits nodes in non-decreasing order of their keys. This is the most commonly used traversal for BST-based problems.

```python
def inorder(node):
    if node is None:
        return []
    return inorder(node.left) + [node.val] + inorder(node.right)

def inorder_iterative(root):
    """Morris traversal alternative: O(1) extra space."""
    result, stack = [], []
    current = root
    while current or stack:
        # Go all the way to the leftmost node
        while current:
            stack.append(current)
            current = current.left
        # Process node
        current = stack.pop()
        result.append(current.val)
        # Move to right subtree
        current = current.right
    return result
```

### Post-order (Left → Right → Root)

Post-order processes children before the parent — essential for "bottom-up" computations like calculating subtree heights, sizes, or aggregate values. You can only compute the parent's value after knowing both children's values.

```python
def postorder(node):
    if node is None:
        return []
    return postorder(node.left) + postorder(node.right) + [node.val]

def postorder_iterative(root):
    """Two-stack approach."""
    if not root: return []
    result, stack = [], [root]
    while stack:
        node = stack.pop()
        result.append(node.val)
        if node.left:  stack.append(node.left)   # Right is processed before left
        if node.right: stack.append(node.right)
    return result[::-1]   # Reverse to get post-order
```

### Level-order (BFS / Breadth-First)

Level-order visits nodes level by level, from top to bottom. Essential for finding depth, checking completeness, and serializing trees.

```python
from collections import deque

def level_order(root):
    if not root: return []
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    
    return result   # List of lists, one per level

# Time: O(N)  Space: O(N) for the queue
```

### Morris Traversal (O(1) Space In-order)

The standard in-order traversal uses O(H) stack space. Morris traversal uses O(1) extra space by temporarily modifying the tree's right pointers to thread the traversal path. Before moving to the left subtree, find the in-order predecessor (rightmost node in left subtree) and point its right pointer back to the current node. After returning (when the right pointer points back to current), undo the threading.

```python
def morris_inorder(root):
    result = []
    current = root
    
    while current:
        if not current.left:
            # No left subtree — process current and go right
            result.append(current.val)
            current = current.right
        else:
            # Find in-order predecessor (rightmost node in left subtree)
            predecessor = current.left
            while predecessor.right and predecessor.right is not current:
                predecessor = predecessor.right
            
            if not predecessor.right:
                # Thread: link predecessor's right to current (will return here later)
                predecessor.right = current
                current = current.left
            else:
                # Un-thread: predecessor already points back — we're returning from left
                predecessor.right = None
                result.append(current.val)
                current = current.right
    
    return result
```

---

## 🧠 Chapter 4 — Binary Search Tree (BST)

### The BST Property

A BST is a binary tree where every node satisfies: all values in the left subtree are strictly less than the node's value, and all values in the right subtree are strictly greater. This ordering makes in-order traversal produce a sorted sequence, and allows O(H) search, insertion, and deletion where H is the height.

```python
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        self.root = self._insert(self.root, val)
    
    def _insert(self, node, val):
        if node is None:
            return TreeNode(val)
        if val < node.val:
            node.left = self._insert(node.left, val)
        elif val > node.val:
            node.right = self._insert(node.right, val)
        # If val == node.val: ignore duplicates (or handle as desired)
        return node
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if node is None or node.val == val:
            return node
        if val < node.val:
            return self._search(node.left, val)
        return self._search(node.right, val)
    
    def delete(self, val):
        self.root = self._delete(self.root, val)
    
    def _delete(self, node, val):
        if node is None:
            return None
        if val < node.val:
            node.left = self._delete(node.left, val)
        elif val > node.val:
            node.right = self._delete(node.right, val)
        else:
            # Node to delete found
            if not node.left:
                return node.right   # Replace with right child
            if not node.right:
                return node.left    # Replace with left child
            # Node has two children: replace value with in-order successor
            # (smallest value in right subtree)
            successor = node.right
            while successor.left:
                successor = successor.left
            node.val = successor.val
            node.right = self._delete(node.right, successor.val)
        return node
```

### The Problem with Unbalanced BSTs

A BST built by inserting elements in sorted order degenerates into a linked list (height N). This makes all operations O(N) instead of O(log N). The fix is a self-balancing BST that maintains O(log N) height through rotations.

**Key operations for balancing — rotations**:

```python
def rotate_right(y):
    """Right rotation around node y."""
    #       y                   x
    #      / \                 / \
    #     x   T3      →       T1  y
    #    / \                      / \
    #   T1  T2                   T2  T3
    x = y.left
    T2 = x.right
    x.right = y
    y.left = T2
    return x   # x is now the root of this subtree

def rotate_left(x):
    """Left rotation around node x."""
    y = x.right
    T2 = y.left
    y.left = x
    x.right = T2
    return y
```

---

## 🧠 Chapter 5 — AVL Tree (Self-Balancing BST)

An AVL tree maintains the invariant that for every node, the heights of its left and right subtrees differ by at most 1. After every insertion or deletion, you walk back up to the root, checking the balance at each ancestor. If a node becomes unbalanced, you restore balance with one or two rotations.

```python
class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.height = 1   # Height of this node's subtree

def get_height(node):
    return node.height if node else 0

def get_balance(node):
    return get_height(node.left) - get_height(node.right) if node else 0

def update_height(node):
    node.height = 1 + max(get_height(node.left), get_height(node.right))

def avl_insert(node, val):
    """Insert val into AVL subtree rooted at node. Returns new root."""
    # Standard BST insert
    if not node:
        return AVLNode(val)
    if val < node.val:
        node.left = avl_insert(node.left, val)
    elif val > node.val:
        node.right = avl_insert(node.right, val)
    else:
        return node   # Duplicates ignored
    
    update_height(node)
    balance = get_balance(node)
    
    # Left-Left case: right rotation
    if balance > 1 and val < node.left.val:
        return rotate_right(node)
    
    # Right-Right case: left rotation
    if balance < -1 and val > node.right.val:
        return rotate_left(node)
    
    # Left-Right case: left rotation on left child, then right rotation
    if balance > 1 and val > node.left.val:
        node.left = rotate_left(node.left)
        return rotate_right(node)
    
    # Right-Left case: right rotation on right child, then left rotation
    if balance < -1 and val < node.right.val:
        node.right = rotate_right(node.right)
        return rotate_left(node)
    
    return node   # Still balanced — no rotation needed
```

The four rotation cases are determined by whether the imbalance is in the left-left, left-right, right-left, or right-right subtree. The key insight is that in each case, exactly one or two rotations restore perfect balance at the locally unbalanced node — and since only ancestors of the inserted node can become unbalanced, the total number of rotations per insertion is O(1) amortized.

---

## 🧠 Chapter 6 — Binary Heap

### The Heap Property

A binary max-heap is a complete binary tree where every parent is greater than or equal to its children. The maximum element is always at the root. A min-heap has every parent less than or equal to its children.

Because heaps are complete binary trees, they're perfectly stored in arrays (1-indexed). The key operations are:

**Heapify-up (sift up)**: When you insert a new element at the end, it might violate the heap property with its parent. Repeatedly swap it with its parent until the property is restored. O(log N).

**Heapify-down (sift down)**: When you remove the root (max/min), replace it with the last element and repeatedly swap it with its larger/smaller child until restored. O(log N).

```python
class MaxHeap:
    def __init__(self):
        self.heap = []   # 0-indexed for simplicity
    
    def parent(self, i): return (i - 1) // 2
    def left(self, i): return 2 * i + 1
    def right(self, i): return 2 * i + 2
    
    def push(self, val):
        self.heap.append(val)
        self._sift_up(len(self.heap) - 1)
    
    def _sift_up(self, i):
        while i > 0:
            p = self.parent(i)
            if self.heap[i] > self.heap[p]:
                self.heap[i], self.heap[p] = self.heap[p], self.heap[i]
                i = p
            else:
                break
    
    def pop(self):
        if len(self.heap) == 1:
            return self.heap.pop()
        max_val = self.heap[0]
        self.heap[0] = self.heap.pop()   # Move last element to root
        self._sift_down(0)
        return max_val
    
    def _sift_down(self, i):
        n = len(self.heap)
        while True:
            largest = i
            l, r = self.left(i), self.right(i)
            if l < n and self.heap[l] > self.heap[largest]:
                largest = l
            if r < n and self.heap[r] > self.heap[largest]:
                largest = r
            if largest == i:
                break
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            i = largest
    
    def heapify(self, arr):
        """Build heap from array in O(N) — Floyd's algorithm."""
        self.heap = arr[:]
        # Start from last non-leaf node and sift down
        for i in range((len(self.heap) - 2) // 2, -1, -1):
            self._sift_down(i)
```

**Why Floyd's heapify is O(N)**: It might look like O(N log N) since we call sift_down N/2 times and each call is O(log N). But nodes near the bottom do very little work — a node at depth d from the bottom only sifts down at most d levels. Summing across all levels: Σ(d × N/2^(d+1)) over d from 0 to log N converges to O(N). This is a beautiful amortized analysis.

### The Two-Heap Pattern (Median Maintenance)

A classic technique: maintain a **max-heap of the lower half** and a **min-heap of the upper half** of a dynamic sequence. The median is always at the top of one of the heaps. After each insertion, rebalance so the heaps differ by at most 1 in size.

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.lower = []    # max-heap (negate values for Python's min-heap)
        self.upper = []    # min-heap
    
    def add_num(self, num):
        # Push to lower heap first
        heapq.heappush(self.lower, -num)
        
        # Balance: ensure all values in lower ≤ all values in upper
        if self.upper and -self.lower[0] > self.upper[0]:
            heapq.heappush(self.upper, -heapq.heappop(self.lower))
        
        # Keep sizes balanced (lower can have at most 1 more element)
        if len(self.lower) > len(self.upper) + 1:
            heapq.heappush(self.upper, -heapq.heappop(self.lower))
        elif len(self.upper) > len(self.lower):
            heapq.heappush(self.lower, -heapq.heappop(self.upper))
    
    def find_median(self):
        if len(self.lower) > len(self.upper):
            return -self.lower[0]
        return (-self.lower[0] + self.upper[0]) / 2.0
```

---

## 🧠 Chapter 7 — Reconstructing Binary Trees

A classic competitive programming problem type asks you to reconstruct a unique binary tree from two traversal sequences.

### Reconstruction from Pre-order and In-order

The first element of pre-order is always the root. Find that element in in-order — everything to its left is the left subtree, everything to its right is the right subtree. Recurse.

```python
def build_from_pre_in(preorder, inorder):
    if not preorder:
        return None
    
    root_val = preorder[0]
    root = TreeNode(root_val)
    
    mid = inorder.index(root_val)   # Find root in in-order
    
    root.left  = build_from_pre_in(preorder[1:mid+1], inorder[:mid])
    root.right = build_from_pre_in(preorder[mid+1:],  inorder[mid+1:])
    
    return root
```

Optimized version using index maps to avoid repeated linear search:

```python
def build_from_pre_in_fast(preorder, inorder):
    in_map = {val: i for i, val in enumerate(inorder)}
    pre_idx = [0]   # Use list for mutable closure in nested function
    
    def helper(left, right):
        if left > right:
            return None
        root_val = preorder[pre_idx[0]]
        pre_idx[0] += 1
        root = TreeNode(root_val)
        mid = in_map[root_val]
        root.left  = helper(left, mid - 1)
        root.right = helper(mid + 1, right)
        return root
    
    return helper(0, len(inorder) - 1)
```

### Reconstruction from Post-order and In-order

Same idea, but the root is the LAST element of post-order:

```python
def build_from_post_in(postorder, inorder):
    if not postorder:
        return None
    root_val = postorder[-1]
    root = TreeNode(root_val)
    mid = inorder.index(root_val)
    root.left  = build_from_post_in(postorder[:mid],    inorder[:mid])
    root.right = build_from_post_in(postorder[mid:-1],  inorder[mid+1:])
    return root
```

### Why Pre-order + Post-order Is Not Enough

Pre-order and post-order together cannot uniquely reconstruct a binary tree — they're insufficient because when a node has only one child, you can't tell whether it's a left child or a right child. Only when combined with in-order (which encodes the left/right structure) is reconstruction unique.

---

## 🧠 Chapter 8 — Key Binary Tree Algorithms

### Lowest Common Ancestor (LCA) in BST

In a BST, LCA is trivially O(H): the LCA of u and v is the first node where their paths diverge. If both u and v are less than the current node, LCA is in the left subtree; if both are greater, it's in the right subtree; otherwise, the current node IS the LCA.

```python
def lca_bst(root, u, v):
    if not root:
        return None
    if u < root.val and v < root.val:
        return lca_bst(root.left, u, v)
    if u > root.val and v > root.val:
        return lca_bst(root.right, u, v)
    return root   # root is the LCA (one value on each side, or one equals root)
```

### Serialization and Deserialization

Encode a binary tree to a string and decode it back. This is a fundamental operation for persistence, networking, or any context where you need to transmit a tree.

```python
def serialize(root):
    """Pre-order serialization with None markers."""
    if not root:
        return 'N'
    return f"{root.val},{serialize(root.left)},{serialize(root.right)}"

def deserialize(data):
    """Reconstruct from serialized string."""
    values = iter(data.split(','))
    
    def helper():
        val = next(values)
        if val == 'N':
            return None
        node = TreeNode(int(val))
        node.left = helper()
        node.right = helper()
        return node
    
    return helper()
```

### Counting Structurally Unique Binary Trees

The number of structurally unique binary trees with N nodes is the N-th **Catalan number**: `C(N) = C(2N, N) / (N + 1)`. For N = 5, there are 42 unique shapes. This arises because each k from 0 to N-1 can serve as the size of the left subtree, and the number of ways to split is the product of the subtree counts. This is a beautiful DP recurrence that directly mirrors the recursive structure of binary trees.

---

## 🧠 Chapter 9 — Segment Trees as Binary Trees

Segment trees (SG_11) are a special case of binary trees where each internal node stores aggregated information about a range. Understanding this connection deepens your intuition for both:

Every segment tree node represents a contiguous range of the array. The left child covers the left half, the right child covers the right half. The tree has height O(log N) because each level halves the range. The "build," "update," and "query" operations are all specialized binary tree traversals — build is post-order (children computed before parent), update is root-to-leaf (go to the affected leaf, fix ancestors on the way back), and query is a selective in-order traversal that prunes branches based on range overlap.

---

## 🎯 Practice Problems (Sorted by Difficulty)

For traversal fundamentals, work through the canonical problems on Leetcode before moving to Codeforces: "Binary Tree Level Order Traversal," "Construct Binary Tree from Preorder and Inorder," and "Binary Tree Maximum Path Sum" form a natural three-problem arc that tests all traversal knowledge.

For BST problems on Codeforces, **CF 1017E — The Supersonic Rocket** (1800) and **CF 843B — Interactive LowerBound** (1700) require careful BST reasoning. **CF 1080C — Masha and two friends** uses BST-like ordered queries.

For heap-based problems, the core skill is recognizing when "always process the best available item" requires a priority queue. **CF 855C — Helga Hufflepuff's Cat** (2100) and **CF 1051F — The Shortest Statement** use heaps as subroutines in larger algorithms.

---

## 📝 Summary

Binary trees are the backbone of nearly every efficient data structure in computer science. Understanding them deeply — not just as abstract objects but as concrete algorithmic tools — unlocks segment trees, heaps, AVL trees, and ultimately all balanced search trees.

The four traversals (pre-order, in-order, post-order, level-order) each expose a different structural property: pre-order gives the "ancestry" view, in-order gives the "sorted" view for BSTs, post-order enables bottom-up computation, and level-order exposes the depth structure. Every binary tree algorithm is essentially one of these traversals dressed up with a specific computation at each node.

The two self-balancing variants (AVL and heaps) solve different problems with the same underlying idea — maintaining a structural invariant through local transformations (rotations or sifts). AVL maintains height balance for search. Heaps maintain the parent-child ordering invariant for priority access. Both cost O(log N) per operation precisely because they keep the height at O(log N).