# 📘 Study Guide 11 — Segment Trees: Detailed with Application Ideas

> **Difficulty Range**: Intermediate → Expert (CF 1200 → 2400)
> **Core Idea**: A segment tree is a binary tree where each node stores information about a contiguous segment of an array, enabling both range queries and point/range updates in O(log N) time.

---

## 🧠 Chapter 1 — Why Does the Segment Tree Exist?

### The Problem Prefix Sums Can't Solve

You already know prefix sums. They answer range sum queries in O(1) after O(N) preprocessing. Beautiful. But what if the underlying array **changes**? If element a[i] is updated, your entire prefix sum array becomes invalid. You'd need to recompute it from position i onwards — O(N) per update. With Q updates and Q queries, that's O(NQ), which can be 10^10 for N = Q = 10^5.

We need a data structure that handles **both updates and queries efficiently**. That's the segment tree's entire purpose.

### The Core Observation: Divide the Range

Here's the insight that makes everything click. If you want to answer "sum of a[3..11]", you don't have to look at all 9 elements. You could split that range into two halves — "sum of a[3..7]" and "sum of a[8..11]" — and combine those. And if you've precomputed sums for nicely-aligned half-ranges, you can keep splitting recursively until you reach individual elements.

The segment tree precomputes sums (or min, max, GCD, or any combinable quantity) for all ranges that are "half-powers-of-2" in size. There are O(N) such ranges, so the storage is O(N). Each query decomposes into O(log N) precomputed ranges. Each update only invalidates O(log N) precomputed values. That's your O(log N) for everything.

---

## 🧠 Chapter 2 — Building the Tree from Scratch

### Tree Structure and Indexing

A segment tree for an array of size N is a nearly complete binary tree with 4N nodes (we allocate 4N to be safe). We use a **1-indexed array** for the tree nodes. For node at index `i`:
- Left child is at index `2*i`
- Right child is at index `2*i + 1`
- Parent is at index `i // 2`
- Node `1` is the root (covers the entire array)

Each node `i` stores the answer (e.g., sum) for some contiguous segment `[l, r]` of the original array. The root stores the answer for `[0, N-1]`. Its left child stores `[0, N//2]`, its right child stores `[N//2 + 1, N-1]`, and so on recursively.

### Building the Tree

```python
class SegmentTree:
    def __init__(self, data):
        self.n = len(data)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self._build(data, 1, 0, self.n - 1)
    
    def _build(self, data, node, start, end):
        """
        node: current tree node index (1-indexed)
        start, end: the range of the original array this node covers
        """
        if start == end:
            # Leaf node: stores exactly one array element
            self.tree[node] = data[start]
        else:
            mid = (start + end) // 2
            # Build left subtree (covers [start, mid])
            self._build(data, 2 * node, start, mid)
            # Build right subtree (covers [mid+1, end])
            self._build(data, 2 * node + 1, mid + 1, end)
            # Internal node: combine children
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]
    
    # Time: O(N)   Space: O(N)
```

The `_build` function recurses down to individual elements, then combines back up. Each of the O(N) nodes is visited exactly once during construction.

### Point Update

When a single element `a[i]` changes, we update the leaf at position `i` and then update all ancestors of that leaf — exactly the O(log N) nodes on the root-to-leaf path.

```python
    def update(self, node, start, end, idx, val):
        """
        Update a[idx] to val.
        node, start, end: current tree node and its range.
        """
        if start == end:
            # Reached the leaf — apply the update
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                # idx is in the left half
                self.update(2 * node, start, mid, idx, val)
            else:
                # idx is in the right half
                self.update(2 * node + 1, mid + 1, end, idx, val)
            # After child is updated, recompute this node's value
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]
    
    def point_update(self, idx, val):
        """Public interface: update index idx to value val."""
        self.update(1, 0, self.n - 1, idx, val)
```

### Range Query

To query the sum (or min, max, etc.) over `[l, r]`, we traverse the tree. At each node:
- If the node's range is completely outside `[l, r]`, return the identity (0 for sum, ∞ for min).
- If the node's range is completely inside `[l, r]`, return the stored value directly.
- Otherwise, recurse into both children and combine.

```python
    def query(self, node, start, end, l, r):
        """
        Query sum over [l, r].
        node, start, end: current tree node and its range.
        """
        if r < start or end < l:
            # Completely outside — return identity element for the operation
            return 0   # 0 for sum; float('inf') for min; float('-inf') for max
        if l <= start and end <= r:
            # Completely inside — return stored value
            return self.tree[node]
        # Partial overlap — recurse into both children
        mid = (start + end) // 2
        left_result = self.query(2 * node, start, mid, l, r)
        right_result = self.query(2 * node + 1, mid + 1, end, l, r)
        return left_result + right_result   # Combine
    
    def range_query(self, l, r):
        """Public interface: query sum over [l, r] (0-indexed, inclusive)."""
        return self.query(1, 0, self.n - 1, l, r)
```

**How many nodes does a query visit?** At most O(4 log N) nodes, because at each level of the tree, at most 4 nodes can be "partially covered." This gives O(log N) per query.

### Full Usage Example

```python
a = [1, 3, 5, 7, 9, 11]
st = SegmentTree(a)
print(st.range_query(1, 4))   # Sum of a[1..4] = 3+5+7+9 = 24
st.point_update(2, 10)        # a[2] = 10 (was 5)
print(st.range_query(1, 4))   # Sum = 3+10+7+9 = 29
```

---

## 🧠 Chapter 3 — Lazy Propagation (Range Updates)

### The Problem

Point updates are fine, but what if you need to **add 5 to every element in a[2..8]**? With the basic segment tree, you'd call point_update 7 times — O(7 log N). For a range update on the entire array, that's O(N log N) per update, which is no better than brute force.

The fix is **lazy propagation** — we delay updates, storing a "pending update" tag at each node and only applying it when we need to go deeper.

### The Core Idea: Defer and Delegate

Instead of immediately updating all affected leaves, we store a lazy tag at the highest possible node that fully covers the update range. When we later query or update a child of this node, we first "push down" the lazy tag to both children before recursing. This way, each update and query still touches O(log N) nodes.

```python
class SegmentTreeLazy:
    def __init__(self, data):
        self.n = len(data)
        self.tree = [0] * (4 * self.n)   # Stores actual values
        self.lazy = [0] * (4 * self.n)   # Stores pending additive updates
        self._build(data, 1, 0, self.n - 1)
    
    def _build(self, data, node, start, end):
        if start == end:
            self.tree[node] = data[start]
        else:
            mid = (start + end) // 2
            self._build(data, 2 * node, start, mid)
            self._build(data, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]
    
    def _push_down(self, node, start, end):
        """
        Apply the pending lazy update to this node's children.
        Called before recursing into children.
        """
        if self.lazy[node] != 0:
            mid = (start + end) // 2
            left_size = mid - start + 1
            right_size = end - mid
            
            # Apply to left child
            self.tree[2 * node] += self.lazy[node] * left_size
            self.lazy[2 * node] += self.lazy[node]
            
            # Apply to right child
            self.tree[2 * node + 1] += self.lazy[node] * right_size
            self.lazy[2 * node + 1] += self.lazy[node]
            
            # Clear this node's lazy tag — it's been delegated
            self.lazy[node] = 0
    
    def range_update(self, node, start, end, l, r, val):
        """Add val to every element in [l, r]."""
        if r < start or end < l:
            return   # Completely outside
        if l <= start and end <= r:
            # Completely inside — update this node and mark lazy
            self.tree[node] += val * (end - start + 1)
            self.lazy[node] += val
            return
        # Partial overlap — push down first, then recurse
        self._push_down(node, start, end)
        mid = (start + end) // 2
        self.range_update(2 * node, start, mid, l, r, val)
        self.range_update(2 * node + 1, mid + 1, end, l, r, val)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]
    
    def range_query(self, node, start, end, l, r):
        """Query sum over [l, r]."""
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        # Must push down before going deeper, otherwise children have stale values
        self._push_down(node, start, end)
        mid = (start + end) // 2
        return (self.range_query(2 * node, start, mid, l, r) +
                self.range_query(2 * node + 1, mid + 1, end, l, r))
```

The push_down function is the heart of lazy propagation. Before we ever look at a node's children, we ask: "Is there a pending update sitting at this node that the children don't know about?" If yes, we apply it to both children and clear it. This ensures children always reflect the current true state when we query or update them.

---

## 🧠 Chapter 4 — The Merge Function: Making the Tree Generic

The segment tree isn't just for sums. It works for **any operation that is associative** — meaning you can combine any two adjacent answers and get the answer for the combined range. The merge function determines what the tree computes.

Here are the essential variants, each requiring only a change to the combine step:

```python
# Range Maximum Query (RMQ) — tree[node] = max of the range
def combine_max(a, b): return max(a, b)
# Identity element: float('-inf')

# Range Minimum Query — tree[node] = min of the range
def combine_min(a, b): return min(a, b)
# Identity element: float('inf')

# Range GCD — tree[node] = GCD of all elements in range
from math import gcd
def combine_gcd(a, b): return gcd(a, b)
# Identity element: 0 (since gcd(x, 0) = x)

# Range XOR — tree[node] = XOR of all elements in range
def combine_xor(a, b): return a ^ b
# Identity element: 0

# Range Product — tree[node] = product mod M
MOD = 10**9 + 7
def combine_prod(a, b): return (a * b) % MOD
# Identity element: 1

# Count of "special" elements — tree[node] = count satisfying property
# (requires storing count in each node, not just value)
```

For more complex operations (like finding the minimum AND its count, or tracking multiple pieces of information), you store a composite object in each node:

```python
# Example: minimum value AND the count of how many times it appears in the range
class MinCount:
    def __init__(self, val, count):
        self.val = val
        self.count = count
    
    @staticmethod
    def combine(a, b):
        if a.val < b.val:
            return MinCount(a.val, a.count)
        elif b.val < a.val:
            return MinCount(b.val, b.count)
        else:
            return MinCount(a.val, a.count + b.count)
    
    @staticmethod
    def identity():
        return MinCount(float('inf'), 0)
```

---

## 🧠 Chapter 5 — The Iterative Segment Tree

The recursive tree is clean and easy to understand, but has function call overhead. The **iterative (bottom-up) segment tree** is faster in practice and simpler to implement for pure point-update, range-query problems. It uses the same 1-indexed array trick but works from the leaves upward.

```python
class SegmentTreeIterative:
    """
    Iterative segment tree for range sum with point updates.
    Nodes are 1-indexed. Leaves are at positions [n, 2n-1].
    Internal nodes are at [1, n-1].
    """
    def __init__(self, data):
        self.n = len(data)
        self.tree = [0] * (2 * self.n)
        # Initialize leaves
        for i in range(self.n):
            self.tree[self.n + i] = data[i]
        # Build internal nodes bottom-up
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]
    
    def update(self, pos, val):
        """Point update: set a[pos] = val."""
        pos += self.n   # Move to leaf position
        self.tree[pos] = val
        # Walk up and recompute all ancestors
        pos >>= 1   # Move to parent
        while pos >= 1:
            self.tree[pos] = self.tree[2 * pos] + self.tree[2 * pos + 1]
            pos >>= 1
    
    def query(self, l, r):
        """Range sum query over [l, r] (0-indexed, inclusive)."""
        result = 0
        l += self.n
        r += self.n + 1   # Make r exclusive for cleaner loop logic
        while l < r:
            if l & 1:       # l is a right child — include it and move past
                result += self.tree[l]
                l += 1
            if r & 1:       # r-1 is a right child — include it
                r -= 1
                result += self.tree[r]
            l >>= 1         # Move both to parent level
            r >>= 1
        return result
```

This version is ~3x faster than the recursive version in Python, and the query loop is elegant once you understand it: `l` and `r` start at the leaves and march toward each other. Whenever either pointer is a "right child" (odd index), it can't be further combined with its sibling — include it directly and move past.

---

## 🧠 Chapter 6 — Application: Finding the K-th Element

Segment trees can answer "find the k-th smallest element" or "find the position of the k-th occurrence" queries if the tree stores counts. The idea is to navigate the tree like a decision tree: if the left child's count is ≥ k, the answer is in the left half; otherwise subtract the left count from k and look in the right half.

```python
def find_kth(self, node, start, end, k):
    """
    Find the index of the k-th '1' in a boolean array.
    tree[node] = count of 1s in [start, end].
    """
    if start == end:
        return start   # Found the position
    mid = (start + end) // 2
    left_count = self.tree[2 * node]
    if k <= left_count:
        return self.find_kth(2 * node, start, mid, k)
    else:
        return self.find_kth(2 * node + 1, mid + 1, end, k - left_count)
```

This is O(log N) per query and is the basis of the "order statistics" segment tree — a sorted multiset that supports insert, delete, and k-th element queries all in O(log N).

---

## 🧠 Chapter 7 — Segment Tree with Coordinate Compression

When values are huge (up to 10^9) but there are few distinct values (up to 10^5), you can compress coordinates and build a segment tree over the compressed domain. This is essential for problems like "count of elements in range [a, b]" with dynamic insertions.

```python
def coordinate_compression(values):
    """Map arbitrary values to consecutive integers 0, 1, 2, ..."""
    sorted_unique = sorted(set(values))
    compress = {v: i for i, v in enumerate(sorted_unique)}
    return compress, sorted_unique

# Example usage:
values = [100, 5, 1000000, 5, 42]
compress, decompress = coordinate_compression(values)
# compress = {5: 0, 42: 1, 100: 2, 1000000: 3}
# Build segment tree of size len(compress) and use compress[v] as the index
```

---

## 🧠 Chapter 8 — Persistent Segment Tree

A **persistent segment tree** stores all historical versions of the tree after each update. Since each update only modifies O(log N) nodes, we only create O(log N) new nodes per version and share all unchanged nodes with the previous version.

This structure enables queries like "what was the range sum at time T?" or "how many elements in [l, r] had values between A and B?" (the classic "merge sort tree" or offline 2D query).

```python
class PersistentSegTree:
    """
    Each node is stored as (left_child_index, right_child_index, value).
    Nodes are stored in a flat list; we grow it by appending.
    Roots of each version are stored in self.roots.
    """
    def __init__(self, n):
        self.n = n
        self.nodes = [(0, 0, 0)]   # Dummy node at index 0 (represents empty)
        self.roots = []
        # Build empty initial version
        root = self._build(1, n)
        self.roots.append(root)
    
    def _new_node(self, left, right, val):
        self.nodes.append((left, right, val))
        return len(self.nodes) - 1
    
    def _build(self, start, end):
        if start == end:
            return self._new_node(0, 0, 0)
        mid = (start + end) // 2
        left = self._build(start, mid)
        right = self._build(mid + 1, end)
        return self._new_node(left, right, 0)
    
    def update(self, prev_root, start, end, pos, val):
        """
        Create a new version by updating position pos to val.
        Returns the root of the new version.
        """
        if start == end:
            return self._new_node(0, 0, val)
        mid = (start + end) // 2
        l, r, v = self.nodes[prev_root]
        if pos <= mid:
            new_left = self.update(l, start, mid, pos, val)
            return self._new_node(new_left, r, v + val)  # Adjust combine as needed
        else:
            new_right = self.update(r, mid + 1, end, pos, val)
            return self._new_node(l, new_right, v + val)
    
    def query(self, node, start, end, l, r):
        if node == 0 or r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.nodes[node][2]
        mid = (start + end) // 2
        ln, rn, _ = self.nodes[node]
        return self.query(ln, start, mid, l, r) + self.query(rn, mid + 1, end, l, r)
```

The canonical application of persistent segment trees is **offline k-th smallest in range [l, r]**: build a version after inserting each element from left to right, then "subtract" version l-1 from version r to get a segment tree representing only elements in positions [l, r].

---

## 🧠 Chapter 9 — Segment Tree Beats (Ji Driver Segmentation)

This is a very advanced technique for operations like "for each element in [l, r], apply min(a[i], x)" — clamping all elements to be at most x. Standard lazy propagation can't handle this because the update depends on the current value of each element.

Segment Tree Beats maintains, per node, the maximum value, the second maximum value, and the count of maximums. It can process these "clamp" operations in amortized O(N log² N).

```python
# Each node stores:
# max1: maximum value in range
# max2: strict second maximum (largest value strictly less than max1)
# cnt_max: number of times max1 appears
# sum: sum of all elements

class SegTreeBeats:
    def __init__(self, data):
        n = len(data)
        self.max1 = [float('-inf')] * (4 * n)
        self.max2 = [float('-inf')] * (4 * n)
        self.cnt_max = [0] * (4 * n)
        self.sum = [0] * (4 * n)
        self._build(data, 1, 0, n - 1)
    
    def _push_up(self, node):
        l, r = 2 * node, 2 * node + 1
        self.sum[node] = self.sum[l] + self.sum[r]
        if self.max1[l] == self.max1[r]:
            self.max1[node] = self.max1[l]
            self.max2[node] = max(self.max2[l], self.max2[r])
            self.cnt_max[node] = self.cnt_max[l] + self.cnt_max[r]
        elif self.max1[l] > self.max1[r]:
            self.max1[node] = self.max1[l]
            self.max2[node] = max(self.max2[l], self.max1[r])
            self.cnt_max[node] = self.cnt_max[l]
        else:
            self.max1[node] = self.max1[r]
            self.max2[node] = max(self.max1[l], self.max2[r])
            self.cnt_max[node] = self.cnt_max[r]
    
    def _push_clamp_max(self, node, val):
        """Clamp: replace all occurrences of max1 in this node's range with val."""
        if val >= self.max1[node]: return
        self.sum[node] -= (self.max1[node] - val) * self.cnt_max[node]
        self.max1[node] = val
    
    # Full implementation continues with _push_down and range_chmin...
    # (See competitive programming references for the complete version)
```

---

## 🧠 Chapter 10 — Application Ideas Catalogue

The segment tree is a tool, and its power comes from knowing when to apply it. Here are the major problem archetypes where it appears:

**Range sum / range min / range max with point updates** — this is the simplest use case and where most people start. It directly replaces prefix sums when the array is mutable.

**Range updates with range queries using lazy propagation** — the full power of the segment tree. Common lazy operations include range add, range set (assign all elements in range to a value), range multiply, and combinations thereof.

**The "find first position satisfying condition" pattern** — instead of binary searching and then querying, you can descend directly down the segment tree in O(log N). For example: "find the leftmost position with value ≥ X." At each node, check if the left child contains a valid answer; if yes, recurse left; if no, recurse right.

**Counting inversions** — build a coordinate-compressed segment tree. Process elements left to right; for each element a[i], query how many previously inserted elements are greater than a[i]. Then insert a[i].

**The "online" or "dynamic" sliding window maximum** — when you need window maximums but queries arrive online and the window isn't sliding uniformly, a segment tree with range-max query is the go-to.

**Merge sort tree** — store a sorted list in each node (the merge of its children's lists). Answers "how many elements in [l, r] are ≤ x?" in O(log² N). Space is O(N log N).

**Segment tree on permutations** — classic use in problems involving counting and ordering elements.

**2D segment tree / segment tree of segment trees** — for 2D range queries. Build a segment tree over rows; each node of the outer tree contains its own segment tree over column values. O(N log² N) build, O(log² N) per query.

---

## 🎯 Practice Problems (Sorted by Difficulty)

The problems are listed from straightforward application to genuinely tricky ones that require recognizing the segment tree disguise.

For getting started, **CF 339D — Xenia and Bit Operations** (1400) is an excellent introduction because it asks you to alternate between OR and AND at different levels of the tree, forcing you to understand the node structure deeply. **CF 380C — Sereja and Brackets** (1900) requires storing a custom "bracket structure" in each node — a great exercise in designing the merge function.

For lazy propagation practice, **CF 558E — A Simple Task** (2300) asks you to sort arbitrary subarrays using O(26) segment trees (one per character), which is a beautiful application. **CF 1515G — Phoenix and Computers** uses lazy propagation with a non-trivial combine step.

For the k-th element pattern, try **CF 786C — Till I Collapse** and **CF 1093G — Multidimensional Answers**.

For persistent trees, **CF 786C** and the classic **Kth smallest in range** pattern appear frequently in rounds rated 2000+.

---

## 📝 Summary

The segment tree is your Swiss Army knife for range queries and updates. The basic structure handles sum, min, max, GCD, XOR in O(N) build and O(log N) per query/update. Lazy propagation extends this to range updates. The iterative version is faster in practice. Persistent trees give you version history. Segment Tree Beats handles non-standard range operations like clamping.

The single most important skill is **designing the node structure and merge function** for your specific problem. If you can define what each node stores and how to combine two adjacent nodes' data to get the parent's data — and if this combination is O(1) — then a segment tree will solve your problem.