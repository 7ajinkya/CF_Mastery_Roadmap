# 📘 Study Guide 16 — Square Root Decomposition

> **Difficulty Range**: Intermediate → Expert (CF 1400 → 2500)
> **Core Idea**: By dividing N elements into √N blocks of size √N, most operations on ranges or collections can be answered in O(√N) — sitting between the O(N) of brute force and the O(log N) of a segment tree, but often simpler to implement and more flexible.

---

## 🧠 Chapter 1 — The √N Intuition

### Why √N Is a Magic Number

Imagine you have N = 10,000 elements. You want to answer range queries (sum from index l to r) and also handle updates. A brute-force query is O(N) = 10,000. A segment tree query is O(log N) ≈ 14. Square root decomposition gives O(√N) ≈ 100. That middle ground exists because of a beautiful arithmetic identity:

**If you divide N items into blocks of size B, a range query touches at most N/B complete blocks plus 2B partial elements at the ends. Setting B = √N minimizes the maximum of these two quantities — both equal √N.**

The deeper intuition is this: with blocks of size B, you get to "skip" entire blocks (fast) while handling partial blocks element by element (slow). Too-small B means too many blocks to skip through. Too-large B means partial blocks take too long. B = √N is the sweet spot that balances these costs.

This argument appears everywhere in computer science — it's why many "middle ground" algorithms run in O(N^(2/3)) or O(N^(1/2)). Whenever you find yourself thinking "I want to batch some operations but still handle individual ones," you're thinking about square root decomposition.

---

## 🧠 Chapter 2 — Sqrt Decomposition for Range Queries

### Building the Block Structure

Divide the array into blocks of size `B = int(sqrt(N))`. The last block might be smaller. For each block, precompute a summary (sum, min, max, GCD — whatever the query needs).

```python
import math

class SqrtDecomposition:
    def __init__(self, data):
        self.n = len(data)
        self.B = max(1, int(math.isqrt(self.n)))   # Block size ≈ √N
        self.data = data[:]
        num_blocks = (self.n + self.B - 1) // self.B
        self.block_sum = [0] * num_blocks
        
        # Precompute block sums
        for i, val in enumerate(data):
            self.block_sum[i // self.B] += val
    
    def update(self, idx, val):
        """Point update: set data[idx] = val. O(1)."""
        self.block_sum[idx // self.B] += val - self.data[idx]
        self.data[idx] = val
    
    def query(self, l, r):
        """
        Range sum over [l, r] (0-indexed, inclusive). O(√N).
        
        Three parts:
        1. Partial left block (indices from l to end of its block)
        2. Complete middle blocks (add block_sum directly)
        3. Partial right block (indices from start of its block to r)
        """
        result = 0
        block_l = l // self.B
        block_r = r // self.B
        
        if block_l == block_r:
            # l and r are in the same block — just iterate
            for i in range(l, r + 1):
                result += self.data[i]
        else:
            # Left partial block
            for i in range(l, (block_l + 1) * self.B):
                result += self.data[i]
            # Complete middle blocks
            for b in range(block_l + 1, block_r):
                result += self.block_sum[b]
            # Right partial block
            for i in range(block_r * self.B, r + 1):
                result += self.data[i]
        
        return result
```

**Why this is O(√N)**: The left and right partial blocks together touch at most 2B = 2√N elements. The middle blocks total at most N/B = √N complete blocks. Each complete block takes O(1) to query. So the total work is O(√N).

### Range Update (Lazy Marking)

When you need to add a value to an entire range, you can use a "pending update" for complete blocks — exactly like lazy propagation but simpler. Store a `lazy[block]` value; when you query or do a point operation inside a block, apply the pending update first.

```python
class SqrtWithRangeUpdate:
    def __init__(self, data):
        self.n = len(data)
        self.B = max(1, int(math.isqrt(self.n)))
        self.data = data[:]
        num_blocks = (self.n + self.B - 1) // self.B
        self.block_sum = [sum(data[b*self.B : (b+1)*self.B]) for b in range(num_blocks)]
        self.lazy = [0] * num_blocks   # Pending additions for each complete block
    
    def range_add(self, l, r, val):
        """Add val to every element in [l, r]. O(√N)."""
        block_l = l // self.B
        block_r = r // self.B
        
        if block_l == block_r:
            # Same block — update elements individually
            for i in range(l, r + 1):
                self.data[i] += val
            self.block_sum[block_l] += val * (r - l + 1)
        else:
            # Left partial block
            for i in range(l, (block_l + 1) * self.B):
                self.data[i] += val
            self.block_sum[block_l] += val * ((block_l + 1) * self.B - l)
            # Complete middle blocks — just update lazy
            for b in range(block_l + 1, block_r):
                self.lazy[b] += val
                self.block_sum[b] += val * self.B
            # Right partial block
            for i in range(block_r * self.B, r + 1):
                self.data[i] += val
            self.block_sum[block_r] += val * (r - block_r * self.B + 1)
    
    def query(self, l, r):
        """Range sum over [l, r]. O(√N)."""
        result = 0
        block_l = l // self.B
        block_r = r // self.B
        
        if block_l == block_r:
            for i in range(l, r + 1):
                result += self.data[i] + self.lazy[block_l]
        else:
            for i in range(l, (block_l + 1) * self.B):
                result += self.data[i] + self.lazy[block_l]
            for b in range(block_l + 1, block_r):
                result += self.block_sum[b]   # Already includes lazy contribution
            for i in range(block_r * self.B, r + 1):
                result += self.data[i] + self.lazy[block_r]
        
        return result
```

The key observation about this lazy approach: **you don't need to propagate lazy values to individual elements unless you're working with a partial block**. For complete blocks, the block_sum already reflects the lazy additions. This is why sqrt decomposition is sometimes easier to reason about than segment trees with lazy propagation.

---

## 🧠 Chapter 3 — Mo's Algorithm (Offline Range Queries)

Mo's algorithm is the most elegant and powerful application of square root decomposition. It answers a batch of range queries by processing them in a clever order that minimizes the total number of "add element" and "remove element" operations.

### The Core Insight

Suppose you're answering Q queries of the form "count distinct elements in [l, r]." Moving from one query to the next, you add/remove elements from the current window. If queries are in random order, you might have to move your window endpoints by O(N) for each query — O(NQ) total, which is too slow.

Mo's key insight: **group queries by their left block**. Within each block, sort by right endpoint. As the right endpoint only moves forward within each block, the total movement of the right pointer is O(N × N/B) = O(N²/B). The left pointer moves at most O(B) within each block, with O(N/B) blocks and O(Q) queries, giving O(QB) total movement. Setting B = √N balances these to give O((N + Q) × √N) total pointer movement — each move adds or removes one element, so total work is O((N + Q) × √N).

```python
import math

def mo_algorithm(n, queries, add_element, remove_element, get_answer):
    """
    Answers a list of range queries [l, r] using Mo's algorithm.
    
    add_element(i): add element at index i to the current window.
    remove_element(i): remove element at index i from the current window.
    get_answer(): return the current answer for the window.
    
    Returns a list of answers in the original query order.
    """
    B = max(1, int(math.isqrt(n)))
    q = len(queries)
    
    # Sort queries: primary by left block, secondary by right (alternating for cache efficiency)
    indexed_queries = [(l, r, i) for i, (l, r) in enumerate(queries)]
    indexed_queries.sort(key=lambda x: (
        x[0] // B,
        x[1] if (x[0] // B) % 2 == 0 else -x[1]
    ))
    # The alternating sort trick (Hilbert curve order) reduces cache misses
    
    answers = [0] * q
    cur_l, cur_r = 0, -1   # Empty window initially
    
    for l, r, idx in indexed_queries:
        # Expand or shrink the window to [l, r]
        while cur_r < r:
            cur_r += 1
            add_element(cur_r)
        while cur_l > l:
            cur_l -= 1
            add_element(cur_l)
        while cur_r > r:
            remove_element(cur_r)
            cur_r -= 1
        while cur_l < l:
            remove_element(cur_l)
            cur_l += 1
        
        answers[idx] = get_answer()
    
    return answers
```

### Example: Count Distinct Elements in Range

```python
def count_distinct_in_ranges(arr, queries):
    n = len(arr)
    
    # State: frequency map and current distinct count
    freq = [0] * (max(arr) + 1)
    distinct = [0]
    
    def add(i):
        v = arr[i]
        freq[v] += 1
        if freq[v] == 1:
            distinct[0] += 1
    
    def remove(i):
        v = arr[i]
        freq[v] -= 1
        if freq[v] == 0:
            distinct[0] -= 1
    
    def get_ans():
        return distinct[0]
    
    return mo_algorithm(n, queries, add, remove, get_ans)
```

### Mo's Algorithm with Updates (Mo's 3D)

The standard Mo's algorithm handles only static arrays. For problems with point updates, there's a "3D" variant that adds a third dimension to the query — the time (update index). Queries are sorted by (left block, right block, time block). The time dimension adds another √N factor, giving O(N^(5/3)) total — better than O(NQ) but worse than pure Mo's.

```python
def mo_with_updates(n, arr, queries, updates):
    """
    queries: list of (l, r, t) — answer query on arr after applying updates 0..t-1.
    updates: list of (pos, new_val).
    """
    B = max(1, int(n ** (2/3)))   # Block size for 3D Mo's
    
    # Sort queries by (left_block, right_block, time_block)
    indexed_queries = [(l, r, t, i) for i, (l, r, t) in enumerate(queries)]
    indexed_queries.sort(key=lambda x: (x[0] // B, x[1] // B, x[2]))
    
    freq = {}
    distinct = [0]
    arr_copy = arr[:]
    
    def add(i):
        v = arr_copy[i]
        freq[v] = freq.get(v, 0) + 1
        if freq[v] == 1:
            distinct[0] += 1
    
    def remove(i):
        v = arr_copy[i]
        freq[v] -= 1
        if freq[v] == 0:
            distinct[0] -= 1
    
    def apply_update(t, cur_l, cur_r):
        """Apply update t and undo the element at its position if inside window."""
        pos, new_val = updates[t]
        old_val = arr_copy[pos]
        if cur_l <= pos <= cur_r:
            remove(pos)
        arr_copy[pos] = new_val
        if cur_l <= pos <= cur_r:
            add(pos)
        return pos, old_val   # Return info needed to roll back
    
    # (Full implementation omitted for brevity — the idea is the core concept)
```

---

## 🧠 Chapter 4 — Sqrt Decomposition on Queries (Batch Processing)

Beyond range queries on arrays, sqrt decomposition applies to "batch processing" problems where individual operations are expensive but you can batch them into groups of size √N and process each batch efficiently.

### Offline Query Batching

When you receive a stream of updates and queries, one approach is to "save up" √N updates and then reprocess: handle any pending updates and all queries together using a more expensive but batched method.

```python
def offline_batch_sqrt(n, initial_data, operations):
    """
    operations: list of ('update', i, v) or ('query', l, r).
    Process in batches of B = √N.
    """
    B = int(math.isqrt(n))
    data = initial_data[:]
    pending_updates = []   # Saved up updates not yet applied to data[]
    results = []
    
    for op in operations:
        if op[0] == 'update':
            _, i, v = op
            pending_updates.append((i, v))
            
            if len(pending_updates) >= B:
                # Flush: apply all pending updates to data[]
                for pos, val in pending_updates:
                    data[pos] = val
                pending_updates = []
        
        elif op[0] == 'query':
            _, l, r = op
            # Answer using data[] (which might be stale) + pending updates
            # Naive sum on data[] for [l, r]
            result = sum(data[l:r+1])
            # Adjust for pending updates that fall in [l, r]
            seen_positions = {}
            for pos, val in reversed(pending_updates):
                if l <= pos <= r and pos not in seen_positions:
                    result = result - data[pos] + val
                    seen_positions[pos] = True
            results.append(result)
    
    # Flush remaining
    for pos, val in pending_updates:
        data[pos] = val
    
    return results
```

This pattern trades off the cost of maintaining a real-time data structure for the simpler cost of periodically rebuilding or recomputing from scratch. When "rebuild from scratch" is O(N) and you do it √N times with √N queries between rebuilds, the total work is O(N × √N + Q × √N) = O((N + Q) √N).

---

## 🧠 Chapter 5 — Sqrt Decomposition on Values (Heavy-Light Split)

Some problems require different handling depending on whether an element is "heavy" (high frequency) or "light" (low frequency). The key observation is that there can be at most √N distinct values with frequency ≥ √N (since N total elements divided among them gives √N heavy ones). Light elements by definition each appear fewer than √N times.

This "heavy-light split on values" appears in problems involving sum of pairs, common divisors, or any problem where interacting pairs of elements have a naturally bounded count.

```python
def count_pairs_with_gcd_k(arr, K, queries):
    """
    For each query (v), count pairs (i, j) with i < j and gcd(arr[i], arr[j]) = v.
    
    Sqrt trick: elements with frequency >= sqrt(N) are "heavy."
    There are at most sqrt(N) distinct values that are heavy.
    Heavy-heavy pairs: O(sqrt(N)^2) = O(N) total.
    Heavy-light and light-light pairs: each light element contributes O(sqrt(N)) pairs.
    """
    from math import gcd, isqrt
    from collections import Counter
    
    n = len(arr)
    B = isqrt(n)
    freq = Counter(arr)
    
    heavy_vals = {v for v, cnt in freq.items() if cnt >= B}
    light_vals = {v for v, cnt in freq.items() if cnt < B}
    
    # For heavy values, precompute pair counts directly
    # For light values, use a different approach
    # (Exact implementation depends on problem specifics)
```

---

## 🧠 Chapter 6 — Sqrt on Blocks for Sorting and Maintenance

A lesser-known application is maintaining a sorted structure with √N-time insertions and deletions by dividing the structure into sorted blocks of size √N. Each block maintains its elements in sorted order. Insertion: find the right block (binary search over block minimums), insert into that block (O(√N) shift), and rebuild if the block gets too large. Query: binary search each block's sorted contents.

This is the basis of a "sorted list" data structure with O(√N) per operation — simpler to implement than a balanced BST and competitive for problems where N is up to 10^5 and a factor of √N is acceptable.

```python
class SqrtSortedList:
    """Sorted list with O(√N) insertions, deletions, and k-th element queries."""
    
    def __init__(self, data=None):
        self.B = 320   # Fixed block size; tune based on N
        self.blocks = []
        if data:
            sorted_data = sorted(data)
            for i in range(0, len(sorted_data), self.B):
                self.blocks.append(sorted_data[i:i + self.B])
    
    def _find_block(self, val):
        """Find the block where val should be inserted."""
        import bisect
        for i, block in enumerate(self.blocks):
            if not block or val <= block[-1]:
                return i
        return len(self.blocks) - 1
    
    def add(self, val):
        import bisect
        if not self.blocks:
            self.blocks.append([val])
            return
        
        i = self._find_block(val)
        block = self.blocks[i]
        bisect.insort(block, val)   # O(√N) insertion into sorted block
        
        # Rebalance: if block is too large, split it
        if len(block) > 2 * self.B:
            mid = len(block) // 2
            self.blocks[i] = block[:mid]
            self.blocks.insert(i + 1, block[mid:])
    
    def remove(self, val):
        import bisect
        for block in self.blocks:
            idx = bisect.bisect_left(block, val)
            if idx < len(block) and block[idx] == val:
                block.pop(idx)
                return
        raise ValueError(f"{val} not found")
    
    def kth(self, k):
        """Find the k-th smallest element (1-indexed)."""
        for block in self.blocks:
            if k <= len(block):
                return block[k - 1]
            k -= len(block)
        raise IndexError("k out of range")
    
    def count_less_than(self, val):
        """Count elements strictly less than val."""
        import bisect
        return sum(bisect.bisect_left(block, val) for block in self.blocks)
```

---

## 🧠 Chapter 7 — Choosing the Block Size

The "standard" block size of √N is optimal only when updates and queries have the same cost per element. When they don't, tuning the block size gives better performance.

Suppose updates cost O(U) per element and queries cost O(Q) per element. With block size B, an update touches O(B) elements within one block (O(B×U)), and a query touches O(N/B) complete blocks (O(N/B × 1)) plus two partial blocks (O(B×Q)). The optimal B minimizes `B×U + N/B + B×Q`. Taking the derivative and setting to zero: `B = √(N / (U + Q))`. For equal costs (U = Q = 1), this gives B = √N as expected.

In practice, for competitive programming, **B = 300 or 350** often works well for N up to 10^5, because it avoids issues with irrational square roots and tends to be cache-friendly. Some problems benefit from tuning B to be exactly √N, √(N log N), or N^(2/3) for Mo's with updates.

---

## 🧠 Chapter 8 — Practical Tips and Common Mistakes

### Off-by-One Errors in Block Boundaries

The most common bug in sqrt decomposition is getting block boundaries wrong. A clean and consistent way to define them:

```python
B = int(math.isqrt(n)) + 1   # or just 320 as a constant
block_of_i = i // B           # Which block index i belongs to
block_start = b * B           # First index in block b
block_end = min((b + 1) * B - 1, n - 1)   # Last index in block b (careful with last block!)
```

Always double-check: does `(b+1) * B - 1` exceed `n-1` for the last block? If so, use `min`.

### When Sqrt is Better Than a Segment Tree

Despite being slower by a log factor, sqrt decomposition is sometimes preferable because it handles complex operations that are difficult to express as a "merge" in a segment tree. If your query requires accessing individual elements within blocks and the "merge" step is non-trivial or doesn't exist, sqrt decomposition is often the easier path.

Examples where sqrt wins in practice: "sort the elements in a range," "find the median of a range," "count elements equal to X in a range" with frequent updates — these are all doable with sqrt in O(√N) but require complex segment tree augmentation otherwise.

---

## 🎯 Practice Problems (Sorted by Difficulty)

For a direct introduction to sqrt range queries, **CF 558C — Amr and The Large Array** (1800) and **CF 940F — Machine Learning** (2400, Mo's with updates) form a natural progression.

Mo's algorithm problems form their own category. Start with **CF 375D — Tree and Queries** (2000), which applies Mo's on trees using Euler tour flattening. Then try **CF 617E — XOR and Favorite Number** (2100), which uses prefix XOR with Mo's to count pairs with XOR equal to K. The definitive hard Mo's problem is **CF 940F — Machine Learning** (2400).

For sqrt decomposition on non-standard structures, **CF 342E — Xenia and Tree** (2400) and **CF 1093G — Multidimensional Answers** (2600) require creative application of the block idea in tree settings.

---

## 📝 Summary

Square root decomposition is not a single algorithm but a paradigm: split your problem into blocks of size √N, handle complete blocks efficiently (in O(1) or O(B)), and handle partial blocks element by element (in O(B)). The O(√N) complexity emerges naturally from this balance.

The two most important applications are the direct range query structure (split the array into blocks, maintain block summaries, handle queries in three parts) and Mo's algorithm (sort offline queries to minimize total pointer movement to O((N + Q) × √N)). Both are powerful, both are relatively simple to implement compared to their segment tree equivalents, and both appear repeatedly at the 2000+ difficulty tier on Codeforces.

The philosophical lesson from sqrt decomposition is broader than the technique itself: in algorithm design, when you have a trade-off between two costs that scale in opposite directions with some parameter B, the optimal B balances the two costs. This balancing principle appears in cache-oblivious algorithms, B-trees, and dozens of other advanced data structures.