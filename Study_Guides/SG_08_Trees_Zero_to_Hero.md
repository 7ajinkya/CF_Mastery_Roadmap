# 📘 Study Guide 08 — Trees: Zero to Hero

> **Difficulty Range**: Beginner → Expert (CF 900 → 2200)
> **Core Idea**: A tree is a connected graph with no cycles. With N nodes, it always has exactly N-1 edges. Trees are the most structured non-trivial graph, enabling elegant recursive decomposition of almost every problem.

---

## 🧠 Chapter 1 — What is a Tree? Building the Intuition

### The Family Tree Analogy

Think of a family tree: you have a founding ancestor at the top (the **root**), their children below, grandchildren below that, and so on. Every person (except the founding ancestor) has exactly one parent. There are no loops — you can never follow parent links and end up back where you started.

That's a **rooted tree**. In competitive programming, trees are almost always given as unrooted (just a set of edges), and you choose which node to call the root.

The key vocabulary you need:

A **leaf** is any node with no children (degree 1 in the unrooted version). The **depth** of a node is its distance from the root. The **height** of the tree is the maximum depth of any leaf. The **parent** of a node u is the first node on u's path to the root. The **subtree** of node u contains u itself and all its descendants.

### Representing Trees in Code

Because trees are just special graphs, we use the same adjacency list, but we read the input slightly differently:

```python
import sys
from collections import defaultdict

def read_tree(n):
    """Read an unrooted tree with n nodes (1-indexed)."""
    adj = defaultdict(list)
    for _ in range(n - 1):
        u, v = map(int, input().split())
        adj[u].append(v)
        adj[v].append(u)
    return adj
```

When a problem says "rooted at node 1," we impose a direction by doing a DFS from node 1 and recording parent-child relationships.

---

## 🧠 Chapter 2 — Tree Traversal and Basic DFS

### The Fundamental Tree DFS Pattern

Tree DFS is simpler than graph DFS because there are no cycles — we only need to avoid going back to the parent, not avoid revisiting arbitrary nodes.

```python
def dfs(u, parent, adj, depth):
    """
    u: current node
    parent: the node we came from (so we don't go backwards)
    """
    # Process node u here (pre-order)
    
    for v in adj[u]:
        if v != parent:       # Don't go back to where we came from
            dfs(v, u, adj, depth + 1)
    
    # OR process node u here (post-order — after all children are done)
```

**Pre-order** processing (handling u before children): good for computing values that depend on the parent, like depth or path from root.

**Post-order** processing (handling u after children): good for computing values that aggregate from children, like subtree sizes, heights, diameters.

### Computing Subtree Sizes

```python
subtree_size = {}

def compute_subtree_size(u, parent, adj):
    subtree_size[u] = 1   # Count u itself
    for v in adj[u]:
        if v != parent:
            compute_subtree_size(v, u, adj)
            subtree_size[u] += subtree_size[v]
```

This is a cornerstone computation. Once you have subtree sizes, you can efficiently answer questions like "how many nodes are in the subtree below this node?"

### Computing Depths

```python
depth = {}

def compute_depth(u, parent, adj, d=0):
    depth[u] = d
    for v in adj[u]:
        if v != parent:
            compute_depth(v, u, adj, d + 1)
```

---

## 🧠 Chapter 3 — Tree Diameter

### What is the Diameter?

The diameter of a tree is the length of the longest path between any two nodes. This is one of the most frequently tested tree problems on Codeforces, and the algorithm is beautifully simple.

### Algorithm: Two BFS/DFS Passes

Here's the key insight: if you pick ANY node u and find the node farthest from it (call it A), then A is guaranteed to be an endpoint of the longest path. Then, if you find the node B farthest from A, the distance A→B is the diameter.

```python
from collections import deque

def bfs_farthest(start, adj, n):
    """Returns (farthest_node, distance, parent_array)."""
    dist = [-1] * (n + 1)
    parent = [-1] * (n + 1)
    dist[start] = 0
    queue = deque([start])
    farthest = start
    
    while queue:
        u = queue.popleft()
        if dist[u] > dist[farthest]:
            farthest = u
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                parent[v] = u
                queue.append(v)
    
    return farthest, dist[farthest], parent

def tree_diameter(adj, n):
    # Step 1: BFS from any node (say node 1) to find endpoint A
    A, _, _ = bfs_farthest(1, adj, n)
    # Step 2: BFS from A to find endpoint B and the diameter
    B, diameter, parent = bfs_farthest(A, adj, n)
    return diameter, A, B

def reconstruct_diameter_path(parent, A, B):
    """Reconstruct the actual path from A to B."""
    path = []
    cur = B
    while cur != -1:
        path.append(cur)
        cur = parent[cur]
    return path   # This path goes from B back to A
```

### Alternative: DFS-based Diameter in One Pass

Instead of two BFS passes, we can compute the diameter in a single DFS by tracking the two longest paths going downward from each node. The diameter through node u = (longest downward path from u) + (second longest downward path from u).

```python
def tree_diameter_dfs(adj, n):
    diameter = [0]
    
    def dfs(u, parent):
        # Returns the longest downward path from u (as edge count)
        best1, best2 = 0, 0   # Two longest child paths
        for v in adj[u]:
            if v != parent:
                child_depth = dfs(v, u) + 1
                if child_depth > best1:
                    best1, best2 = child_depth, best1
                elif child_depth > best2:
                    best2 = child_depth
        # The path passing through u has length best1 + best2
        diameter[0] = max(diameter[0], best1 + best2)
        return best1  # Return the longest path going down from u
    
    dfs(1, -1)
    return diameter[0]
```

---

## 🧠 Chapter 4 — Lowest Common Ancestor (LCA)

### What is LCA?

The Lowest Common Ancestor of two nodes u and v in a rooted tree is the deepest node that is an ancestor of both u and v. In other words, it's the node where the paths from the root to u and from the root to v diverge.

This matters because the distance between u and v in a tree equals `depth[u] + depth[v] - 2 × depth[LCA(u, v)]`.

### Method 1: Naïve LCA (O(N) per query)

Walk both nodes up to the root simultaneously, one step at a time:

```python
def lca_naive(u, v, parent, depth):
    # First, bring both nodes to the same depth
    while depth[u] > depth[v]:
        u = parent[u]
    while depth[v] > depth[u]:
        v = parent[v]
    # Then walk both up until they meet
    while u != v:
        u = parent[u]
        v = parent[v]
    return u
```

Fine for small trees or O(N) per query, but terrible for Q = 10^5 queries on a chain tree (degenerate case → O(N²) total).

### Method 2: Binary Lifting LCA (O(N log N) preprocessing, O(log N) per query)

The idea is to precompute `ancestor[u][k]` = the 2^k-th ancestor of u. Then to find LCA(u, v), we can jump in powers-of-two steps instead of one step at a time.

```python
import math

def build_lca(root, adj, n, LOG=18):
    """
    LOG = ceil(log2(n)). For n = 10^5, LOG = 17 is enough.
    ancestor[u][k] = 2^k-th ancestor of u (or -1 if doesn't exist).
    """
    depth = [-1] * (n + 1)
    ancestor = [[-1] * LOG for _ in range(n + 1)]
    
    # BFS to compute depths and immediate parents (ancestor[u][0])
    from collections import deque
    depth[root] = 0
    ancestor[root][0] = root   # Sentinel: root's parent is itself
    queue = deque([root])
    
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if depth[v] == -1:
                depth[v] = depth[u] + 1
                ancestor[v][0] = u
                queue.append(v)
    
    # Build sparse table: ancestor[u][k] = ancestor[ ancestor[u][k-1] ][ k-1 ]
    for k in range(1, LOG):
        for u in range(1, n + 1):
            if ancestor[u][k-1] != -1:
                ancestor[u][k] = ancestor[ancestor[u][k-1]][k-1]
    
    return depth, ancestor

def lca_query(u, v, depth, ancestor, LOG=18):
    # Ensure u is deeper
    if depth[u] < depth[v]:
        u, v = v, u
    
    # Step 1: Bring u up to the same depth as v
    diff = depth[u] - depth[v]
    for k in range(LOG):
        if (diff >> k) & 1:
            u = ancestor[u][k]
    
    if u == v:
        return u   # v was already an ancestor of u
    
    # Step 2: Jump both up together until they're about to meet
    for k in range(LOG - 1, -1, -1):
        if ancestor[u][k] != ancestor[v][k]:
            u = ancestor[u][k]
            v = ancestor[v][k]
    
    return ancestor[u][0]   # One step above is the LCA

def distance(u, v, depth, ancestor, LOG=18):
    l = lca_query(u, v, depth, ancestor, LOG)
    return depth[u] + depth[v] - 2 * depth[l]
```

### Method 3: Euler Tour + Range Minimum Query (O(N) preprocessing, O(1) per query)

The LCA of u and v is the shallowest node on the Euler tour between u's first and v's first occurrence. By building a sparse table for range minimum queries over the Euler tour, you get O(1) LCA queries. This is the most powerful method but also the most complex to implement.

```python
# Euler Tour: record each node every time you visit/leave it during DFS
# Length of Euler tour = 2N - 1

def euler_tour_lca(root, adj, n):
    tour = []          # Euler tour (node sequence)
    first = [-1] * (n + 1)   # First occurrence of each node in tour
    depth_arr = [0] * (n + 1)
    
    def dfs(u, parent, d):
        first[u] = len(tour)
        tour.append(u)
        for v in adj[u]:
            if v != parent:
                depth_arr[v] = d + 1
                dfs(v, u, d + 1)
                tour.append(u)   # Add u again when returning from v
    
    dfs(root, -1, 0)
    
    # Build sparse table for range minimum query on depth
    m = len(tour)
    LOG = m.bit_length()
    sparse = [[0] * m for _ in range(LOG)]
    sparse[0] = list(range(m))   # Store indices, compare by depth
    
    for k in range(1, LOG):
        for i in range(m - (1 << k) + 1):
            a, b = sparse[k-1][i], sparse[k-1][i + (1 << (k-1))]
            sparse[k][i] = a if depth_arr[tour[a]] <= depth_arr[tour[b]] else b
    
    def rmq(l, r):  # Range min index in tour[l..r]
        k = (r - l + 1).bit_length() - 1
        a, b = sparse[k][l], sparse[k][r - (1 << k) + 1]
        return a if depth_arr[tour[a]] <= depth_arr[tour[b]] else b
    
    def lca(u, v):
        lu, lv = first[u], first[v]
        if lu > lv: lu, lv = lv, lu
        idx = rmq(lu, lv)
        return tour[idx]
    
    return lca, depth_arr
```

---

## 🧠 Chapter 5 — Tree DP

Tree DP is one of the richest areas of competitive programming. The idea is always the same: define a DP state per node (usually involving the subtree below it), then combine children's answers at each node.

### Pattern 1: Rerooting (All-Roots DP)

Many problems ask: "For each node as the root, compute some value." The naïve approach runs a separate DFS for each root — O(N²) total. Rerooting does it in two DFS passes.

**Pass 1** (bottom-up): Compute dp_down[u] = the answer for u's subtree, rooted at the actual root.

**Pass 2** (top-down): Compute dp_full[u] = the answer when u is the root of the whole tree, using dp_down from children and a "contribution from above" passed down from u's parent.

```python
# Example: For each node, compute sum of distances to all other nodes

def sum_of_distances(adj, n):
    # Pass 1: subtree sizes and sum of distances within subtree
    subtree_size = [1] * (n + 1)
    dp_down = [0] * (n + 1)   # sum of distances within subtree
    
    def dfs1(u, parent):
        for v in adj[u]:
            if v != parent:
                dfs1(v, u)
                subtree_size[u] += subtree_size[v]
                # Each node in v's subtree is 1 step farther from u than from v
                dp_down[u] += dp_down[v] + subtree_size[v]
    
    dfs1(1, -1)
    
    # Pass 2: extend to full tree
    dp_full = [0] * (n + 1)
    dp_full[1] = dp_down[1]
    
    def dfs2(u, parent):
        for v in adj[u]:
            if v != parent:
                # When v becomes the root:
                # - dp_full[u] is the sum from u's perspective
                # - Nodes in v's subtree are 1 step closer to v than to u
                # - Nodes NOT in v's subtree are 1 step farther from v than from u
                nodes_above = n - subtree_size[v]
                dp_full[v] = dp_full[u] - subtree_size[v] + nodes_above
                dfs2(v, u)
    
    dfs2(1, -1)
    return dp_full
```

### Pattern 2: DP on Tree with Selection (Knapsack on Tree)

A common problem: select K nodes from the tree to maximize some value, subject to a constraint (like selected nodes must form a connected subtree, or each must be at least distance D from others).

```python
# Tree Knapsack: select at most K nodes, maximizing total value
# dp[u][k] = maximum value selecting k nodes from subtree of u (u is selected)

def tree_knapsack(adj, value, n, K, root=1):
    dp = [[0] * (K + 1) for _ in range(n + 1)]
    
    def dfs(u, parent):
        dp[u][1] = value[u]   # Select only u
        subtree_k = 1         # Current "capacity" of processed subtrees
        
        for v in adj[u]:
            if v == parent: continue
            dfs(v, u)
            child_k = subtree_size[v]   # (precomputed)
            
            # Merge v's dp into u's dp — process in reverse to avoid double-counting
            for j in range(min(K, subtree_k + child_k), 0, -1):
                for take_from_v in range(1, min(j, child_k) + 1):
                    if dp[u][j - take_from_v] > 0 and dp[v][take_from_v] > 0:
                        dp[u][j] = max(dp[u][j],
                                       dp[u][j - take_from_v] + dp[v][take_from_v])
            subtree_k += child_k
    
    dfs(root, -1)
    return max(dp[root][k] for k in range(1, K + 1))
```

### Pattern 3: Centroid Decomposition

The centroid of a tree is a node whose removal splits the tree into components each with at most N/2 nodes. Crucially, every tree has at least one centroid. Centroid decomposition recursively finds centroids of each resulting component.

This technique is the go-to for problems like: "For each pair of nodes (u, v), if the path u→v satisfies some condition, count/answer it."

The key property is that every path in the tree passes through the centroid of some decomposition level. Across all levels, each node appears in O(log N) centroids.

```python
def centroid_decomposition(adj, n):
    subtree_sz = [0] * (n + 1)
    removed = [False] * (n + 1)
    centroid_parent = [-1] * (n + 1)
    
    def compute_sizes(u, parent):
        subtree_sz[u] = 1
        for v in adj[u]:
            if v != parent and not removed[v]:
                compute_sizes(v, u)
                subtree_sz[u] += subtree_sz[v]
    
    def find_centroid(u, parent, tree_size):
        for v in adj[u]:
            if v != parent and not removed[v]:
                if subtree_sz[v] > tree_size // 2:
                    return find_centroid(v, u, tree_size)
        return u
    
    def decompose(u, cp):
        compute_sizes(u, -1)
        centroid = find_centroid(u, -1, subtree_sz[u])
        centroid_parent[centroid] = cp
        removed[centroid] = True
        
        # Process all paths through centroid here
        # ...
        
        for v in adj[centroid]:
            if not removed[v]:
                decompose(v, centroid)
    
    decompose(1, -1)
    return centroid_parent
```

---

## 🧠 Chapter 6 — Heavy-Light Decomposition (HLD)

### The Problem It Solves

You have a tree with values on nodes/edges. You receive two types of queries: update the value at a node/edge, and ask for the sum (or max, etc.) along the path between two nodes u and v.

Without HLD, each path query requires O(N) in the worst case (a chain tree). HLD reduces this to O(log² N) by decomposing the tree into "heavy chains" that can be represented on a linear array, then using a segment tree for range queries on that array.

### The Core Idea

For each node u, choose ONE child as the **heavy child** — the child with the largest subtree. The edge to the heavy child is a **heavy edge**; all other edges are **light edges**. A **heavy chain** is a maximal path of consecutive heavy edges.

The crucial fact: any root-to-leaf path contains at most O(log N) light edges. This is because each light edge you cross means you're entering a subtree at least half the size of the current one — so you can only do this O(log N) times.

```python
def heavy_light_decomposition(adj, n, root=1):
    parent = [-1] * (n + 1)
    depth = [0] * (n + 1)
    subtree_sz = [0] * (n + 1)
    heavy = [-1] * (n + 1)      # heavy child of each node
    
    # Pass 1: compute subtree sizes and find heavy children
    def dfs1(u, p):
        subtree_sz[u] = 1
        max_sz = 0
        for v in adj[u]:
            if v != p:
                parent[v] = u
                depth[v] = depth[u] + 1
                dfs1(v, u)
                subtree_sz[u] += subtree_sz[v]
                if subtree_sz[v] > max_sz:
                    max_sz = subtree_sz[v]
                    heavy[u] = v   # Mark v as heavy child of u
    
    dfs1(root, -1)
    
    # Pass 2: assign positions in the HLD array
    pos = [0] * (n + 1)     # Position of node u in the segment tree array
    head = [0] * (n + 1)    # Head of the chain containing u
    cur_pos = [0]
    
    def dfs2(u, h):
        head[u] = h
        pos[u] = cur_pos[0]
        cur_pos[0] += 1
        if heavy[u] != -1:
            dfs2(heavy[u], h)   # Continue the chain
        for v in adj[u]:
            if v != parent[u] and v != heavy[u]:
                dfs2(v, v)   # Start a new chain from v
    
    dfs2(root, root)
    return pos, head, depth, parent

def hld_path_query(u, v, pos, head, depth, parent, seg_query):
    """Query on path u to v using a segment tree (seg_query(l, r))."""
    result = 0   # Or identity for your operation (0 for sum, -inf for max)
    
    while head[u] != head[v]:
        if depth[head[u]] < depth[head[v]]:
            u, v = v, u   # Make sure u's chain head is deeper
        # Query from head[u] to u in the segment tree
        result += seg_query(pos[head[u]], pos[u])
        u = parent[head[u]]   # Move u to the parent of its chain head
    
    # Now u and v are on the same chain
    if depth[u] > depth[v]:
        u, v = v, u
    result += seg_query(pos[u], pos[v])
    return result
```

---

## 🧠 Chapter 7 — Euler Tour and Subtree Queries

An **Euler Tour** (or DFS in/out time) is a way to flatten a tree into a linear array such that each subtree corresponds to a contiguous segment. This allows you to answer subtree queries using prefix sums or segment trees on the flat array.

```python
def euler_tour(root, adj, n):
    tin = [0] * (n + 1)    # Entry time (DFS in-time)
    tout = [0] * (n + 1)   # Exit time (DFS out-time)
    order = []              # Nodes in DFS order
    timer = [0]
    
    def dfs(u, parent):
        tin[u] = timer[0]
        order.append(u)
        timer[0] += 1
        for v in adj[u]:
            if v != parent:
                dfs(v, u)
        tout[u] = timer[0] - 1   # Last index in u's subtree
    
    dfs(root, -1)
    return tin, tout, order

# Now: subtree of u corresponds to order[tin[u] : tout[u] + 1]
# "Is v in the subtree of u?" ↔ tin[u] <= tin[v] <= tout[u]
# Subtree queries → segment tree/BIT on the `order` array
```

**Key fact**: Node v is in the subtree of u if and only if `tin[u] <= tin[v] <= tout[u]`. This is the foundation for all subtree queries.

---

## 🎯 Practice Problems (Sorted by Difficulty)

### Basic Tree Traversal (800–1200)
1. **[CF 1037C — Packets](https://codeforces.com/problemset/problem/1037/C)** — simple DFS
2. **[CF 1294C — Product of Three Numbers](https://codeforces.com/problemset/problem/1294/C)**
3. **[CF 580C — Kefa and Park](https://codeforces.com/problemset/problem/580/C)** — BFS on tree with depth constraint
4. **[CF 1324F — Maximum White Subtree](https://codeforces.com/problemset/problem/1324/F)** — rerooting DP

### Tree Diameter / LCA (1200–1600)
5. **[CF 1006E — Military Problem](https://codeforces.com/problemset/problem/1006/E)** — Euler tour trick
6. **[CF 1017E — The Supersonic Rocket](https://codeforces.com/problemset/problem/1017/E)**
7. **[CF 191C — Fools and Roads](https://codeforces.com/problemset/problem/191/C)** — LCA + edge counting
8. **[CF 1239C — Queue in the Bank](https://codeforces.com/problemset/problem/1239/C)**

### Tree DP (1400–1800)
9. **[CF 1039D — You Are Given a Tree](https://codeforces.com/problemset/problem/1039/D)** — binary search + greedy tree DP
10. **[CF 1294D — Cip and the Trip](https://codeforces.com/problemset/problem/1294/D)**
11. **[CF 1093G — Multidimensional Answers](https://codeforces.com/problemset/problem/1093/G)**

### Centroid Decomposition (1700–2100)
12. **[CF 342E — Xenia and Tree](https://codeforces.com/problemset/problem/342/E)** — centroid decomposition classic
13. **[CF 600E — Lomsat gelral](https://codeforces.com/problemset/problem/600/E)** — small-to-large merging (DSU on tree)
14. **[CF 741D — Arpa's letter-marked tree](https://codeforces.com/problemset/problem/741/D)**

### HLD (1800–2200)
15. **[CF 375D — Tree and Queries](https://codeforces.com/problemset/problem/375/D)** — Euler tour + Mo's on tree
16. **[CF 1528E — Optimal Messaging](https://codeforces.com/problemset/problem/1528/E)**

---

## 📝 Summary

Trees are graphs with perfect structure — no cycles, exactly N-1 edges, unique path between every pair. This structure enables a cascade of elegant techniques.

For **basic tree queries** (depth, subtree size, parent), one DFS/BFS pass is enough. For **diameter**, two BFS passes or one DFS pass work. For **LCA queries** (especially in bulk), binary lifting gives O(N log N) preprocessing and O(log N) per query. For **subtree queries**, convert the tree to a linear array via Euler tour and use a segment tree or prefix sums. For **path queries** on trees, HLD is the standard tool. For **problems about paths between all pairs**, centroid decomposition is the key.

The universal advice: always start by asking "what does the subtree rooted at u contribute?" If you can define a DP on that question, you're usually 90% done.
