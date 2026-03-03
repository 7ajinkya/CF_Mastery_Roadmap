# 📘 Study Guide 09 — Disjoint Set Union (DSU / Union-Find)

> **Difficulty Range**: Beginner → Expert (CF 900 → 2100)
> **Core Idea**: DSU maintains a collection of disjoint sets and answers two questions almost instantly: "Are u and v in the same set?" and "Merge the sets containing u and v."

---

## 🧠 Chapter 1 — The Problem DSU Solves

### The Friend Group Analogy

Imagine 10 people at a party. Initially, nobody knows each other — 10 separate groups of 1. Then Alice meets Bob (their groups merge into one of size 2). Then Bob meets Charlie (Alice's group now has 3 people). Then David meets Eve (a separate group of 2). At any moment, someone asks: "Are Alice and David in the same friend group?"

This is exactly the DSU problem. It manages a **dynamic partition** of N elements into groups, supporting:
1. **Find(x)**: Which group does x belong to? (represented by a group "leader")
2. **Union(x, y)**: Merge the groups containing x and y.

The question "Are u and v connected?" is answered by checking `Find(u) == Find(v)`.

### Why Not Just Use Arrays or Hash Maps?

You could maintain a `group_id[i]` array where all elements in the same group share the same ID. Union would then require scanning all N elements to update IDs — O(N) per operation. With M operations, that's O(NM), which is O(N²) in the worst case — far too slow for N = 10^5.

DSU achieves **near O(1)** per operation using two clever optimizations. This is the magic we'll build up to.

---

## 🧠 Chapter 2 — The Naive Implementation (Understanding Before Optimizing)

Think of each group as a **rooted tree**. Every node points to its parent. The root of the tree is the "representative" or "leader" of the group. Two elements are in the same group if and only if they have the same root.

```python
parent = list(range(n))   # Initially, every element is its own parent (its own root)

def find(x):
    """Walk up the tree to find the root (representative) of x's group."""
    while parent[x] != x:   # While x is not the root
        x = parent[x]
    return x

def union(x, y):
    """Merge the groups of x and y by making one root point to the other."""
    root_x = find(x)
    root_y = find(y)
    if root_x == root_y:
        return   # Already in the same group — nothing to do
    parent[root_x] = root_y   # Make root_x's tree a subtree of root_y
```

**The problem with this**: in the worst case, unions can create a chain — each node points to the next. Then `find` must walk the entire chain: O(N) per query. After M queries, that's O(NM).

```
Initial: 1→1, 2→2, 3→3, 4→4
union(1,2): parent[1]=2   → 1→2→2
union(2,3): parent[2]=3   → 1→2→3→3
union(3,4): parent[3]=4   → 1→2→3→4→4
find(1): 1→2→3→4  (3 hops)
```

We need two optimizations to fix this.

---

## 🧠 Chapter 3 — Optimization 1: Union by Rank (or Size)

**The insight**: When merging two trees, always attach the **smaller/shallower tree under the root of the larger/deeper tree**. This keeps trees balanced. By always attaching the smaller tree under the bigger one, the maximum depth of any tree is O(log N) — because each time a node's depth increases by 1, its group size at least doubles.

We track either the **rank** (approximate depth) or **size** (number of elements) of each tree.

### Union by Size (usually preferred in CP)

```python
parent = list(range(n))
size = [1] * n   # Every group initially has 1 element

def find(x):
    while parent[x] != x:
        x = parent[x]
    return x

def union(x, y):
    rx, ry = find(x), find(y)
    if rx == ry:
        return False   # Already same group
    # Attach smaller tree under the root of the larger tree
    if size[rx] < size[ry]:
        rx, ry = ry, rx   # Make rx the bigger one
    parent[ry] = rx      # ry's tree goes under rx
    size[rx] += size[ry] # Update size of merged group
    return True   # A merge actually happened
```

With union by size alone, `find` is O(log N) per operation.

---

## 🧠 Chapter 4 — Optimization 2: Path Compression

**The insight**: After we find the root of x's tree by walking up the chain, ALL the nodes we passed are also in the same group. So let's update their parent pointers to point **directly to the root**. Future queries on these nodes will be instant.

```python
def find(x):
    if parent[x] != x:
        parent[x] = find(parent[x])   # Recursively find root AND compress path
    return parent[x]
```

This is the recursive version (recursive path compression). Let's trace it:

Before compression: `1 → 2 → 3 → 4 → 4`

After `find(1)`:
- `find(1)` calls `find(2)` calls `find(3)` calls `find(4)` (returns 4)
- Sets `parent[3] = 4`, returns 4
- Sets `parent[2] = 4`, returns 4
- Sets `parent[1] = 4`, returns 4

After compression: `1 → 4, 2 → 4, 3 → 4, 4 → 4`

Every future query on 1, 2, or 3 takes exactly 1 hop.

**Iterative path compression** (two-pass, avoids recursion depth issues):

```python
def find(x):
    # First pass: walk up to find the root
    root = x
    while parent[root] != root:
        root = parent[root]
    # Second pass: make all visited nodes point directly to root
    while parent[x] != root:
        next_x = parent[x]
        parent[x] = root
        x = next_x
    return root
```

---

## 🧠 Chapter 5 — The Complete DSU (Path Compression + Union by Size)

Together, these two optimizations give **amortized O(α(N))** per operation, where α is the inverse Ackermann function — a function that grows so slowly it's effectively constant (α(N) ≤ 4 for all practical N). This is the best possible complexity for this problem.

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.num_components = n   # Track number of disjoint components
    
    def find(self, x):
        """Find root with path compression."""
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        """Merge groups of x and y. Returns True if they were in different groups."""
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        if self.size[rx] < self.size[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        self.size[rx] += self.size[ry]
        self.num_components -= 1
        return True
    
    def connected(self, x, y):
        """Are x and y in the same component?"""
        return self.find(x) == self.find(y)
    
    def component_size(self, x):
        """Size of x's component."""
        return self.size[self.find(x)]
```

This is the template you should memorize. It handles every standard DSU problem.

**Typical usage in Codeforces**:
```python
import sys
input = sys.stdin.readline

n, m = map(int, input().split())
dsu = DSU(n + 1)   # +1 for 1-indexed nodes

for _ in range(m):
    u, v = map(int, input().split())
    dsu.union(u, v)

# Check connectivity
q = int(input())
for _ in range(q):
    u, v = map(int, input().split())
    print("YES" if dsu.connected(u, v) else "NO")
```

---

## 🧠 Chapter 6 — DSU Applications

### Application 1: Kruskal's MST Algorithm

The core of Kruskal's algorithm (from the Graphs guide) is exactly DSU. Sort edges by weight. Add an edge (u, v) if and only if u and v are NOT already connected (i.e., `dsu.union(u, v)` returns True). Stop after adding N-1 edges.

```python
def kruskal(n, edges):
    edges.sort(key=lambda e: e[0])   # Sort by weight
    dsu = DSU(n + 1)
    mst_cost = 0
    edge_count = 0
    
    for weight, u, v in edges:
        if dsu.union(u, v):
            mst_cost += weight
            edge_count += 1
            if edge_count == n - 1:
                break   # MST complete
    
    return mst_cost if edge_count == n - 1 else -1  # -1 if graph disconnected
```

### Application 2: Counting Connected Components

Initially, `dsu.num_components = n`. Each successful union decreases it by 1. After processing all edges, `dsu.num_components` is the number of connected components.

### Application 3: Offline Edge Deletion via Reverse DSU

DSU naturally handles adding edges (unions). But sometimes problems give you edges that are **deleted** over time, and you need to answer connectivity queries. The trick: process queries in **reverse** (deletions become additions).

```python
def offline_dynamic_connectivity(n, initial_edges, deletions, queries):
    """
    Process in reverse: deletions become additions.
    queries[i] = (time, u, v) -> ask if u and v are connected at that time.
    """
    # Reverse time: start from the end state, add back deleted edges
    # ... implementation specific to problem structure
```

### Application 4: DSU with Rollback (Offline Undo)

For problems that require undoing unions (like divide-and-conquer on edges), we need to be able to roll back DSU operations. The trick: don't use path compression (use only union by rank), and maintain a stack of changes.

```python
class DSU_Rollback:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.history = []   # Stack of (node, old_parent, old_rank) changes
    
    def find(self, x):
        # NO path compression — we need to undo operations exactly
        while self.parent[x] != x:
            x = self.parent[x]
        return x
    
    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            self.history.append(None)   # No change — push sentinel
            return False
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        # Record state before change
        self.history.append((rx, ry, self.rank[rx]))
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True
    
    def rollback(self):
        """Undo the last union operation."""
        change = self.history.pop()
        if change is None: return   # Was a no-op
        rx, ry, old_rank = change
        self.parent[ry] = ry    # Restore ry as its own root
        self.rank[rx] = old_rank
```

### Application 5: Weighted DSU (DSU with Potential)

Sometimes you need to track a **weight/distance relative to the root** for each node. This is called DSU with potential (or "weighted DSU"). The weight of each node represents its relationship to its parent.

```python
class WeightedDSU:
    """
    Each node has a 'potential' relative to its group root.
    weight[x] = value(x) - value(find(x))
    (or whatever relationship the problem demands)
    """
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.weight = [0] * n   # weight[x] = difference from x to its parent
    
    def find(self, x):
        if self.parent[x] == x:
            return x, 0   # Root has potential 0
        root, w = self.find(self.parent[x])
        self.weight[x] += w   # Accumulate potential during path compression
        self.parent[x] = root
        return root, self.weight[x]
    
    def union(self, x, y, w):
        """
        Declare: value(y) - value(x) = w.
        Returns False if they're already connected (and checks consistency).
        """
        root_x, wx = self.find(x)
        root_y, wy = self.find(y)
        if root_x == root_y:
            # Check consistency: wy - wx should equal w
            return wy - wx == w
        if self.rank[root_x] < self.rank[root_y]:
            root_x, root_y = root_y, root_x
            wx, wy = wy, wx
            w = -w
        self.parent[root_y] = root_x
        # Set weight of root_y such that the relationship is maintained
        self.weight[root_y] = wx - wy + w
        if self.rank[root_x] == self.rank[root_y]:
            self.rank[root_x] += 1
        return True
```

**Example use**: CF problem "How many of each color are there?" where colors are relative relationships. This comes up in problems about parity, coloring, or constraints like "a[i] XOR a[j] = c."

---

## 🧠 Chapter 7 — DSU on Trees (Small-to-Large Merging)

This is a separate but related technique. In tree problems where you need to merge "data" from children into a parent, naively merging small into large keeps the total time O(N log N) because each element can only be merged O(log N) times before its group doubles in size past N.

```python
def dsu_on_tree(adj, n, root=1):
    """
    For each node, maintain a set of some property of its subtree.
    Merge children's sets into the parent, always merging smaller into larger.
    """
    sets = [{i} for i in range(n + 1)]   # Each node starts with its own set
    answers = [0] * (n + 1)
    
    def dfs(u, parent):
        for v in adj[u]:
            if v == parent: continue
            dfs(v, u)
            # Merge smaller into larger
            if len(sets[u]) < len(sets[v]):
                sets[u], sets[v] = sets[v], sets[u]   # Swap references
            for element in sets[v]:
                sets[u].add(element)
            # Compute answer for u using merged set
            answers[u] = len(sets[u])   # Example: count distinct elements
        
    dfs(root, -1)
    return answers
```

The amortized cost is O(N log N) because each element participates in O(log N) merges total (every time it's merged, its group at least doubles).

---

## 🧠 Chapter 8 — Bipartite Checking with DSU

A graph is bipartite if its nodes can be 2-colored with no two adjacent nodes sharing a color. You can check this with DSU by maintaining two "virtual nodes" per real node: one representing "side 0" and one "side 1". When you add an edge (u, v), you union (u_side0, v_side1) and (u_side1, v_side0). A contradiction (a node is on both sides) means a cycle of odd length.

```python
def is_bipartite_dsu(n, edges):
    dsu = DSU(2 * n)   # Node i has two copies: i (side 0) and i + n (side 1)
    
    for u, v in edges:
        # u and v must be on different sides
        dsu.union(u, v + n)   # u's side-0 = v's side-1
        dsu.union(u + n, v)   # u's side-1 = v's side-0
        
        # Contradiction: u is on the same side as itself (odd cycle)
        if dsu.connected(u, u + n):
            return False
    
    return True
```

---

## 🎯 Practice Problems (Sorted by Difficulty)

### Basic DSU (800–1200)
1. **[CF 1463B — Find the Difference](https://codeforces.com/problemset/problem/1463/B)**
2. **[CF 1249B — Books Exchange](https://codeforces.com/problemset/problem/1249/B)** — cycle detection with DSU
3. **[CF 722C — Destroying Array](https://codeforces.com/problemset/problem/722/C)** — offline deletion → reverse DSU
4. **[CF 1167C — News Distribution](https://codeforces.com/problemset/problem/1167/C)** — straightforward DSU

### DSU with Application (1200–1600)
5. **[CF 731C — Socks](https://codeforces.com/problemset/problem/731/C)** — DSU for grouping
6. **[CF 566D — Restructuring Company](https://codeforces.com/problemset/problem/566/D)** — DSU with constraints
7. **[CF 1012B — Chemical table](https://codeforces.com/problemset/problem/1012/B)** — bipartite DSU
8. **[CF 1559D — Domino](https://codeforces.com/problemset/problem/1559/D)**

### Kruskal / MST (1300–1700)
9. **[CF 1550C — Manhattan Subarrays](https://codeforces.com/problemset/problem/1550/C)**
10. **[CF 1246D — Books Pairs](https://codeforces.com/problemset/problem/1246/D)**
11. **[CF 1095F — Make It Connected](https://codeforces.com/problemset/problem/1095/F)** — MST with virtual nodes

### Weighted DSU / Rollback (1700–2100)
12. **[CF 1253E — Antenna Coverage](https://codeforces.com/problemset/problem/1253/E)**
13. **[CF 1550E — Gregor and the Two Painters](https://codeforces.com/problemset/problem/1550/E)**
14. **[CF 506D — Mr. Kitayama's Garden](https://codeforces.com/problemset/problem/506/D)** — weighted DSU
15. **[CF 1617E — Christmas Trees](https://codeforces.com/problemset/problem/1617/E)**

---

## 📝 Summary

DSU is conceptually simple but has surprising depth. At its core: `parent[]` array, path compression in `find()`, union by size in `union()`. These two optimizations together achieve near-constant amortized time.

The applications span an enormous range. Connectivity queries and Kruskal's MST are the most common. Weighted DSU handles problems where elements have relative values. DSU with rollback handles offline dynamic connectivity. DSU on trees (small-to-large merging) handles subtree aggregation problems efficiently.

The mental trigger for DSU is: any problem that groups elements together and asks about connectivity or group membership. If unions are additive (you never un-merge), vanilla DSU works. If you need offline deletion, reverse the timeline. If you need online undo, use rollback DSU.
