# 📘 Lesson 11: Trees — Structure, Traversal & Classic Problems

> **Trees appear in 25% of CF problems 1200–1800. They're graphs with no cycles — simpler but with unique patterns.**

---

## 1. What Makes a Tree?

A tree with n nodes has exactly **n-1 edges**, is **connected**, and has **no cycles**.

Key facts:
- Exactly one path between any two nodes
- Removing any edge disconnects it
- A **rooted tree** has one node as "root" — all edges oriented away from root (parent → children)

```python
# Standard tree input (n nodes, n-1 edges, undirected)
import sys
from collections import deque
input = sys.stdin.readline

n = int(input())
adj = [[] for _ in range(n + 1)]
for _ in range(n - 1):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
```

---

## 2. Tree Traversal with DFS

```python
# Iterative DFS — always prefer this to avoid recursion limit
def dfs_tree(root, adj, n):
    parent = [-1] * (n + 1)
    depth = [0] * (n + 1)
    order = []  # BFS/DFS order
    visited = [False] * (n + 1)
    stack = [root]
    visited[root] = True
    
    while stack:
        node = stack.pop()
        order.append(node)
        for child in adj[node]:
            if not visited[child]:
                visited[child] = True
                parent[child] = node
                depth[child] = depth[node] + 1
                stack.append(child)
    
    return order, parent, depth

# BFS order is better for post-order processing (children before parents)
def bfs_order(root, adj, n):
    parent = [-1] * (n + 1)
    order = []
    visited = [False] * (n + 1)
    queue = deque([root])
    visited[root] = True
    
    while queue:
        node = queue.popleft()
        order.append(node)
        for child in adj[node]:
            if not visited[child]:
                visited[child] = True
                parent[child] = node
                queue.append(child)
    
    return order, parent
```

---

## 3. Subtree Sizes

```python
def compute_sizes(adj, n, root=1):
    order, parent = bfs_order(root, adj, n)
    size = [1] * (n + 1)
    
    # Process in reverse BFS order: children before parents
    for node in reversed(order):
        if parent[node] != -1:
            size[parent[node]] += size[node]
    
    return size
```

---

## 4. Tree Diameter ⭐

**Diameter** = longest path between any two nodes. Algorithm: BFS from any node → BFS from farthest → that distance is the diameter.

```python
def bfs_farthest(start, adj, n):
    dist = [-1] * (n + 1)
    dist[start] = 0
    queue = deque([start])
    farthest = start
    
    while queue:
        node = queue.popleft()
        if dist[node] > dist[farthest]:
            farthest = node
        for nb in adj[node]:
            if dist[nb] == -1:
                dist[nb] = dist[node] + 1
                queue.append(nb)
    
    return farthest, dist[farthest]

def tree_diameter(adj, n):
    a, _ = bfs_farthest(1, adj, n)    # find one endpoint
    b, diam = bfs_farthest(a, adj, n)  # find other endpoint and length
    return diam
```

**Why it works**: The farthest node from any node must be one endpoint of the diameter. This is a classic theorem.

---

## 5. Tree DP — Classic Patterns

### Pattern: Compute dp[node] from children

```python
def tree_dp(adj, n, root=1):
    order, parent = bfs_order(root, adj, n)
    dp = [0] * (n + 1)  # define what dp[node] means
    
    # Process children before parents
    for node in reversed(order):
        for child in adj[node]:
            if child != parent[node]:
                # Combine child's result into node's dp
                dp[node] += dp[child] + 1  # example: subtree sum of depths
    
    return dp

# Example: Maximum independent set on a tree
# dp[node][0] = max IS size in subtree where node is NOT selected
# dp[node][1] = max IS size in subtree where node IS selected

def max_independent_set(adj, n, root=1):
    order, parent = bfs_order(root, adj, n)
    dp = [[0, 1] for _ in range(n + 1)]  # [not taken, taken]
    
    for node in reversed(order):
        for child in adj[node]:
            if child != parent[node]:
                dp[node][0] += max(dp[child][0], dp[child][1])  # child can be either
                dp[node][1] += dp[child][0]  # if node taken, child must not be
    
    return max(dp[root])
```

---

## 6. Rerooting (Reroot DP)

**Problem**: Compute an answer for every node if it were the root. Naive: O(n²). Rerooting: O(n).

```python
# Example: For each node v, find the sum of distances to all other nodes.

def sum_of_distances(adj, n):
    # Phase 1: Root at node 1, compute subtree sizes and down-distances
    order, parent = bfs_order(1, adj, n)
    size = [1] * (n + 1)
    down = [0] * (n + 1)  # sum of distances to all nodes in subtree
    
    for node in reversed(order):
        for child in adj[node]:
            if child != parent[node]:
                size[node] += size[child]
                down[node] += down[child] + size[child]
    
    # Phase 2: Propagate upward (rerooting)
    ans = [0] * (n + 1)
    ans[1] = down[1]
    
    for node in order:
        for child in adj[node]:
            if child != parent[node]:
                # When rerooting to child:
                # - Nodes in child's subtree: size[child] nodes, each 1 closer
                # - Nodes outside child's subtree: n - size[child] nodes, each 1 farther
                ans[child] = ans[node] - size[child] + (n - size[child])
    
    return ans
```

---

## 7. Lowest Common Ancestor (LCA)

LCA(u, v) = deepest node that is an ancestor of both u and v.

```python
LOG = 18  # log2(2*10^5) ≈ 17.6

def build_lca(adj, n, root=1):
    depth = [0] * (n + 1)
    par = [[-1] * (n + 1) for _ in range(LOG)]
    
    # BFS to set depths and direct parents
    order, parent = bfs_order(root, adj, n)
    for node in order:
        par[0][node] = parent[node] if parent[node] != -1 else root
        if node != root:
            depth[node] = depth[parent[node]] + 1
    
    # Binary lifting table
    for k in range(1, LOG):
        for v in range(1, n + 1):
            if par[k-1][v] != -1:
                par[k][v] = par[k-1][par[k-1][v]]
    
    def lca(u, v):
        if depth[u] < depth[v]:
            u, v = v, u
        diff = depth[u] - depth[v]
        for k in range(LOG):
            if (diff >> k) & 1:
                u = par[k][u]
        if u == v:
            return u
        for k in range(LOG-1, -1, -1):
            if par[k][u] != par[k][v]:
                u = par[k][u]
                v = par[k][v]
        return par[0][u]
    
    return lca, depth

# Distance between u and v:
# dist(u, v) = depth[u] + depth[v] - 2 * depth[lca(u, v)]
```

---

## 8. Common Tree Patterns Reference

| Problem type | Technique |
|---|---|
| Longest path in tree | Diameter (2×BFS) |
| Path from u to v | LCA + depths |
| For each node as root | Rerooting DP |
| Properties of subtree | DFS post-order |
| Ancestors / parent queries | LCA / binary lifting |
| Count nodes in subtree | DFS in/out times (Euler tour) |

---

## 🧪 Practice Problems

1. [Journey (839C)](https://codeforces.com/problemset/problem/839/C) — tree path DFS
2. [Codeforces 600D](https://codeforces.com/problemset/problem/600/D) — tree + frequency counting
3. [Ants (327B)](https://codeforces.com/problemset/problem/327/B) — tree diameter
4. [Codeforces 161D](https://codeforces.com/problemset/problem/161/D) — tree DP
5. [Pashmak and Tree (459D)](https://codeforces.com/problemset/problem/459/D) — path queries
6. [Codeforces 1092F](https://codeforces.com/problemset/problem/1092/F) — rerooting
7. [Codeforces 1385E](https://codeforces.com/problemset/problem/1385/E) — tree DP
8. [New Year Transportation (500B)](https://codeforces.com/problemset/problem/500/B) — tree traversal

### 📝 Teach-Back Checkpoint
1. Why does the two-BFS method correctly find the tree diameter?
2. What is the rerooting technique, and when would you use it?
3. What is LCA useful for? How would you compute the distance between two nodes in a tree?
