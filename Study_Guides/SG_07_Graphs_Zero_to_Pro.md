# 📘 Study Guide 07 — Graphs: From Zero to Pro

> **Difficulty Range**: Beginner → Expert (CF 800 → 2200)
> **Core Idea**: A graph is just a set of objects (nodes) and relationships (edges) between them. Virtually every real-world network — social connections, road maps, dependency chains, game states — is a graph.

---

## 🧠 Chapter 1 — What is a Graph? Building Intuition

### The Simplest Possible Analogy

Imagine a group of 6 cities. Some cities have direct roads between them; others don't. Draw a dot for each city and a line between two cities if a road exists. Congratulations — you've drawn a graph.

- The **dots** are called **vertices** (or **nodes**).
- The **lines** are called **edges**.

That's it. Every graph problem is just about navigating, counting, or optimizing over this structure.

### Types of Graphs You Must Know

**Undirected vs Directed**: In an undirected graph, an edge between A and B means you can travel A→B *and* B→A. In a directed graph (digraph), an edge A→B only means travel from A to B; getting from B to A requires a separate edge B→A.

**Weighted vs Unweighted**: Edges can carry a numerical **weight** — a road's distance, a flight's cost, a pipe's capacity. Unweighted graphs treat all edges as equal (weight = 1).

**Cyclic vs Acyclic**: A cycle means you can start at a node and return to it without reusing any edge. An acyclic directed graph is called a **DAG** (Directed Acyclic Graph). Trees are a special case of DAGs.

**Dense vs Sparse**: A graph is dense if the number of edges E is close to V² (near the maximum possible). It's sparse if E is closer to V. This affects which algorithm you should pick.

### Graph Representation in Code

**Adjacency List** — the standard for competitive programming:
```python
# Build an undirected graph with V vertices and E edges
V = 6
adj = [[] for _ in range(V)]  # adj[u] = list of neighbors of u

def add_edge(u, v):
    adj[u].append(v)
    adj[v].append(u)   # omit this line for directed graphs

# For weighted graphs:
adj_weighted = [[] for _ in range(V)]
def add_weighted_edge(u, v, w):
    adj_weighted[u].append((v, w))
    adj_weighted[v].append((u, w))
```

Space: O(V + E). Iteration over neighbors: O(degree). This is almost always what you want.

**Adjacency Matrix** — only for dense graphs or when you need O(1) edge lookup:
```python
INF = float('inf')
matrix = [[INF] * V for _ in range(V)]
for i in range(V):
    matrix[i][i] = 0

def add_edge_matrix(u, v, w=1):
    matrix[u][v] = w
    matrix[v][u] = w   # omit for directed
```

Space: O(V²). Edge lookup: O(1). Neighbor iteration: O(V). Bad for sparse graphs.

**Reading a typical Codeforces graph input**:
```python
import sys
from collections import defaultdict
input = sys.stdin.readline

n, m = map(int, input().split())
adj = defaultdict(list)
for _ in range(m):
    u, v = map(int, input().split())
    u -= 1; v -= 1   # Convert to 0-indexed
    adj[u].append(v)
    adj[v].append(u)
```

---

## 🧠 Chapter 2 — BFS (Breadth-First Search)

### The Intuition: Water Spreading Outward

Imagine dropping a stone in a pond. Ripples spread outward in circles — all points at distance 1 get wet first, then all points at distance 2, and so on. BFS works exactly like this. It explores nodes **layer by layer**, guaranteeing that when you first visit a node, you've found the **shortest path** to it (in terms of number of edges).

### BFS Template

```python
from collections import deque

def bfs(start, adj, V):
    dist = [-1] * V         # -1 means "not visited"
    dist[start] = 0
    queue = deque([start])
    
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if dist[v] == -1:       # Not visited yet
                dist[v] = dist[u] + 1
                queue.append(v)
    
    return dist  # dist[i] = shortest path from start to i, or -1 if unreachable

# Time: O(V + E)   Space: O(V)
```

**Why a deque, not a list?** `list.pop(0)` is O(N) because it shifts all elements. `deque.popleft()` is O(1). Always use deque for BFS.

### BFS for Connected Components

A connected component is a maximal set of nodes where every pair has a path between them. To find all components, run BFS from every unvisited node:

```python
def find_components(adj, V):
    component_id = [-1] * V
    num_components = 0
    
    for start in range(V):
        if component_id[start] != -1:
            continue   # already visited
        # BFS from start
        queue = deque([start])
        component_id[start] = num_components
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if component_id[v] == -1:
                    component_id[v] = num_components
                    queue.append(v)
        num_components += 1
    
    return component_id, num_components
```

### BFS on a 2D Grid

Grids are just graphs where each cell is a node and adjacent cells are neighbors. This is one of the most common BFS problem shapes on Codeforces.

```python
def bfs_grid(grid, start_r, start_c):
    rows, cols = len(grid), len(grid[0])
    dist = [[-1] * cols for _ in range(rows)]
    dist[start_r][start_c] = 0
    queue = deque([(start_r, start_c)])
    directions = [(0,1),(0,-1),(1,0),(-1,0)]  # 4-directional movement
    
    while queue:
        r, c = queue.popleft()
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1 and grid[nr][nc] != '#':
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))
    
    return dist
```

### 0-1 BFS — The Clever Trick for Two-Weight Edges

Standard BFS finds shortest paths when all edges have weight 1. But what if edges have weight 0 OR 1? You could use Dijkstra, but there's a smarter O(V + E) trick: use a **deque** where weight-0 edges push to the front and weight-1 edges push to the back. This way, nodes are always processed in non-decreasing distance order.

```python
from collections import deque

def bfs_01(start, adj_01, V):
    """adj_01[u] = list of (v, w) where w is 0 or 1."""
    dist = [float('inf')] * V
    dist[start] = 0
    dq = deque([start])
    
    while dq:
        u = dq.popleft()
        for v, w in adj_01[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if w == 0:
                    dq.appendleft(v)   # High priority — already at same distance
                else:
                    dq.append(v)       # Normal priority
    
    return dist
```

---

## 🧠 Chapter 3 — DFS (Depth-First Search)

### The Intuition: Exploring a Maze with a Thread

Imagine you're exploring a maze. You always take the first available path, going as deep as possible until you hit a dead end. Then you backtrack to the last junction and take the next untried path. That's DFS.

DFS doesn't guarantee shortest paths, but it's excellent for detecting structure: cycles, connectivity, topological order, strongly connected components.

### DFS Template (Recursive)

```python
visited = [False] * V

def dfs(u):
    visited[u] = True
    for v in adj[u]:
        if not visited[v]:
            dfs(v)

# Call: dfs(start)
```

### DFS Template (Iterative — Avoids Stack Overflow)

```python
def dfs_iterative(start, adj, V):
    visited = [False] * V
    stack = [start]
    order = []
    
    while stack:
        u = stack.pop()
        if visited[u]:
            continue
        visited[u] = True
        order.append(u)
        for v in adj[u]:
            if not visited[v]:
                stack.append(v)
    
    return order
```

Note: iterative DFS does NOT produce the same traversal order as recursive DFS (due to stack reversal), but visits the same set of nodes.

### DFS Applications

**Cycle Detection (Undirected Graph)**:
An undirected graph has a cycle if DFS encounters a **back edge** — an edge to an already-visited node that isn't the immediate parent.

```python
def has_cycle_undirected(adj, V):
    visited = [False] * V
    
    def dfs(u, parent):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                if dfs(v, u):
                    return True
            elif v != parent:
                return True   # Back edge found — cycle!
        return False
    
    for start in range(V):
        if not visited[start]:
            if dfs(start, -1):
                return True
    return False
```

**Cycle Detection (Directed Graph)** — requires tracking nodes in the current DFS path (the "recursion stack"):

```python
def has_cycle_directed(adj, V):
    WHITE, GRAY, BLACK = 0, 1, 2  # unvisited, in-progress, done
    color = [WHITE] * V
    
    def dfs(u):
        color[u] = GRAY   # Mark as in-progress
        for v in adj[u]:
            if color[v] == GRAY:
                return True   # Back edge to in-progress node = cycle
            if color[v] == WHITE and dfs(v):
                return True
        color[u] = BLACK   # Mark as fully processed
        return False
    
    return any(dfs(u) for u in range(V) if color[u] == WHITE)
```

**Bipartite Check**: A graph is bipartite if nodes can be 2-colored such that no two adjacent nodes share a color. This is equivalent to having no odd-length cycles.

```python
def is_bipartite(adj, V):
    color = [-1] * V
    
    def bfs_color(start):
        queue = deque([start])
        color[start] = 0
        while queue:
            u = queue.popleft()
            for v in adj[u]:
                if color[v] == -1:
                    color[v] = 1 - color[u]   # Alternate color
                    queue.append(v)
                elif color[v] == color[u]:
                    return False   # Same color — not bipartite
        return True
    
    return all(color[u] != -1 or bfs_color(u) for u in range(V))
```

---

## 🧠 Chapter 4 — Topological Sort

### When Do You Need It?

Topological sort is only defined on **DAGs** (Directed Acyclic Graphs). It produces a linear ordering of nodes such that for every directed edge u → v, node u appears before v in the ordering. Think of it as: "What's the valid order to complete tasks, given their dependencies?"

For example, if task C requires tasks A and B to be done first, then A and B must appear before C in the topological order.

### Method 1: Kahn's Algorithm (BFS-based)

Maintain the **in-degree** of each node (number of incoming edges). Nodes with in-degree 0 have no prerequisites — they can be processed first. After processing a node, reduce the in-degree of its neighbors.

```python
from collections import deque

def topological_sort_kahn(adj, V):
    in_degree = [0] * V
    for u in range(V):
        for v in adj[u]:
            in_degree[v] += 1
    
    queue = deque(u for u in range(V) if in_degree[u] == 0)
    order = []
    
    while queue:
        u = queue.popleft()
        order.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    if len(order) != V:
        return None   # Graph has a cycle — topological sort impossible
    return order
```

**Cycle detection bonus**: If the topological order doesn't include all V nodes, the remaining nodes form a cycle.

### Method 2: DFS-based Topological Sort

Run DFS. After fully processing a node (all its descendants are done), prepend it to the result. The result is the topological order.

```python
def topological_sort_dfs(adj, V):
    visited = [False] * V
    order = []
    
    def dfs(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                dfs(v)
        order.append(u)   # Append AFTER processing all descendants
    
    for u in range(V):
        if not visited[u]:
            dfs(u)
    
    return order[::-1]   # Reverse gives topological order
```

### Longest Path in a DAG

Since DAGs have no cycles, we can compute longest paths efficiently using DP on the topological order. Process nodes in topological order; for each node, update its neighbors.

```python
def longest_path_dag(adj, V):
    order = topological_sort_kahn(adj, V)
    dp = [0] * V
    
    for u in order:
        for v in adj[u]:
            dp[v] = max(dp[v], dp[u] + 1)
    
    return max(dp)
```

---

## 🧠 Chapter 5 — Shortest Paths

### Dijkstra's Algorithm (Non-negative Weights)

Dijkstra is BFS's weighted cousin. It always processes the node with the **currently smallest known distance** first, using a min-heap (priority queue).

**Why greedy works**: Once we process a node u with distance d[u], no future path can improve on d[u] (because all edge weights are non-negative). So d[u] is finalized.

```python
import heapq

def dijkstra(start, adj_weighted, V):
    """adj_weighted[u] = list of (v, weight)"""
    dist = [float('inf')] * V
    dist[start] = 0
    heap = [(0, start)]  # (distance, node)
    
    while heap:
        d, u = heapq.heappop(heap)
        
        # Critical: skip if we've already found a better path to u
        if d > dist[u]:
            continue
        
        for v, w in adj_weighted[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    
    return dist

# Time: O((V + E) log V)
```

**Reconstructing the shortest path** (track the parent of each node when relaxing):

```python
def dijkstra_with_path(start, end, adj_weighted, V):
    dist = [float('inf')] * V
    parent = [-1] * V
    dist[start] = 0
    heap = [(0, start)]
    
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in adj_weighted[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                parent[v] = u
                heapq.heappush(heap, (dist[v], v))
    
    # Reconstruct path from end to start
    path = []
    cur = end
    while cur != -1:
        path.append(cur)
        cur = parent[cur]
    return dist[end], path[::-1]
```

### Bellman-Ford (Handles Negative Weights)

Dijkstra fails with negative edge weights. Bellman-Ford handles them by **relaxing all edges V-1 times**. After V-1 rounds, if any edge can still be relaxed, there's a negative cycle.

```python
def bellman_ford(start, edges, V):
    """edges = list of (u, v, weight)"""
    dist = [float('inf')] * V
    dist[start] = 0
    
    for _ in range(V - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    
    # Check for negative cycles
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None   # Negative cycle detected
    
    return dist

# Time: O(V * E)
```

### Floyd-Warshall (All-Pairs Shortest Paths)

Computes shortest paths between ALL pairs of nodes. Only feasible for small V (≤ 500 or so). Uses dynamic programming: `dp[k][i][j]` = shortest path from i to j using only nodes {0, 1, ..., k} as intermediates.

```python
def floyd_warshall(dist_matrix, V):
    """dist_matrix[i][j] = initial edge weight (or INF if no direct edge)."""
    dp = [row[:] for row in dist_matrix]  # Copy the matrix
    
    for k in range(V):         # Intermediate node
        for i in range(V):     # Source
            for j in range(V): # Destination
                if dp[i][k] + dp[k][j] < dp[i][j]:
                    dp[i][j] = dp[i][k] + dp[k][j]
    
    # Check for negative cycles: dp[i][i] < 0 means i is on a negative cycle
    return dp

# Time: O(V^3)  Space: O(V^2)
```

---

## 🧠 Chapter 6 — Strongly Connected Components (Kosaraju's Algorithm)

A **Strongly Connected Component (SCC)** of a directed graph is a maximal set of nodes where every node can reach every other node. SCCs are important for understanding the global structure of directed graphs.

**Kosaraju's Algorithm** (2 DFS passes):

1. Run DFS on the original graph. Record finish times (or push to a stack when a node finishes).
2. Transpose the graph (reverse all edge directions).
3. Process nodes in reverse finish order, running DFS on the transposed graph. Each DFS tree is one SCC.

```python
def kosaraju(adj, V):
    """adj: original directed graph."""
    visited = [False] * V
    finish_order = []
    
    def dfs1(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                dfs1(v)
        finish_order.append(u)   # Push after finishing
    
    for u in range(V):
        if not visited[u]:
            dfs1(u)
    
    # Build transposed graph
    trans = [[] for _ in range(V)]
    for u in range(V):
        for v in adj[u]:
            trans[v].append(u)
    
    visited = [False] * V
    scc_id = [-1] * V
    num_scc = 0
    
    def dfs2(u, comp):
        visited[u] = True
        scc_id[u] = comp
        for v in trans[u]:
            if not visited[v]:
                dfs2(v, comp)
    
    for u in reversed(finish_order):
        if not visited[u]:
            dfs2(u, num_scc)
            num_scc += 1
    
    return scc_id, num_scc
```

---

## 🧠 Chapter 7 — Bridges and Articulation Points

A **bridge** is an edge whose removal disconnects the graph. An **articulation point** (cut vertex) is a node whose removal disconnects the graph. These are critical infrastructure points.

**Tarjan's Algorithm** finds both in O(V + E) using one DFS pass. The key idea is tracking the `low` value: the earliest DFS discovery time reachable from a subtree.

```python
def find_bridges(adj, V):
    disc = [-1] * V     # DFS discovery time
    low = [0] * V       # Lowest disc reachable from subtree
    timer = [0]
    bridges = []
    
    def dfs(u, parent):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        
        for v in adj[u]:
            if disc[v] == -1:   # v not visited
                dfs(v, u)
                low[u] = min(low[u], low[v])
                # Bridge condition: no back edge from v's subtree to u or above
                if low[v] > disc[u]:
                    bridges.append((u, v))
            elif v != parent:   # Back edge
                low[u] = min(low[u], disc[v])
    
    for u in range(V):
        if disc[u] == -1:
            dfs(u, -1)
    
    return bridges

def find_articulation_points(adj, V):
    disc = [-1] * V
    low = [0] * V
    parent = [-1] * V
    is_ap = [False] * V
    timer = [0]
    
    def dfs(u):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        children = 0
        
        for v in adj[u]:
            if disc[v] == -1:
                children += 1
                parent[v] = u
                dfs(v)
                low[u] = min(low[u], low[v])
                # AP condition 1: u is root with 2+ DFS children
                if parent[u] == -1 and children > 1:
                    is_ap[u] = True
                # AP condition 2: u is not root, and low[v] >= disc[u]
                if parent[u] != -1 and low[v] >= disc[u]:
                    is_ap[u] = True
            elif v != parent[u]:
                low[u] = min(low[u], disc[v])
    
    for u in range(V):
        if disc[u] == -1:
            dfs(u)
    
    return [u for u in range(V) if is_ap[u]]
```

---

## 🧠 Chapter 8 — Minimum Spanning Tree (MST)

An MST of a connected weighted undirected graph is a spanning tree with minimum total edge weight. It connects all V nodes using exactly V-1 edges.

### Kruskal's Algorithm

Sort all edges by weight. Add edges greedily (smallest first), skipping any edge that would form a cycle. Use **DSU** (Disjoint Set Union, see SG_09) to detect cycles in O(α(V)).

```python
def kruskal(V, edges):
    """edges = list of (weight, u, v)"""
    edges.sort()   # Sort by weight
    parent = list(range(V))
    rank = [0] * V
    
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]   # Path compression
            x = parent[x]
        return x
    
    def union(x, y):
        px, py = find(x), find(y)
        if px == py: return False   # Same component — would create cycle
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True
    
    mst_weight = 0
    mst_edges = []
    for w, u, v in edges:
        if union(u, v):
            mst_weight += w
            mst_edges.append((u, v, w))
            if len(mst_edges) == V - 1:
                break
    
    return mst_weight, mst_edges

# Time: O(E log E)
```

### Prim's Algorithm

Grow the MST one node at a time. Start from any node. Always add the cheapest edge that connects the current MST to a new (unvisited) node.

```python
import heapq

def prim(start, adj_weighted, V):
    in_mst = [False] * V
    min_edge = [float('inf')] * V
    min_edge[start] = 0
    heap = [(0, start)]
    total_weight = 0
    
    while heap:
        w, u = heapq.heappop(heap)
        if in_mst[u]:
            continue
        in_mst[u] = True
        total_weight += w
        
        for v, edge_w in adj_weighted[u]:
            if not in_mst[v] and edge_w < min_edge[v]:
                min_edge[v] = edge_w
                heapq.heappush(heap, (edge_w, v))
    
    return total_weight

# Time: O((V + E) log V) — same as Dijkstra
```

**When to prefer Kruskal vs Prim**: Kruskal is simpler to code and performs better on sparse graphs. Prim is better on dense graphs (with adjacency matrix, it's O(V²)).

---

## 🧠 Chapter 9 — Advanced Graph Patterns

### Multisource BFS

When you need the shortest distance from ANY of several source nodes, initialize the BFS queue with ALL sources at distance 0. This is equivalent to adding a virtual "super-source" connected to all sources with weight 0.

```python
def multisource_bfs(sources, adj, V):
    dist = [-1] * V
    queue = deque()
    for s in sources:
        dist[s] = 0
        queue.append(s)
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                queue.append(v)
    return dist
```

### BFS on States (Implicit Graphs)

Many puzzle problems have no explicit graph — instead, states are nodes and valid moves are edges. BFS finds the shortest sequence of moves.

```python
from collections import deque

def solve_puzzle(initial_state, goal_state):
    """BFS over abstract states."""
    if initial_state == goal_state:
        return 0
    
    visited = {initial_state}
    queue = deque([(initial_state, 0)])
    
    while queue:
        state, steps = queue.popleft()
        for next_state in get_neighbors(state):   # Generate all valid next states
            if next_state == goal_state:
                return steps + 1
            if next_state not in visited:
                visited.add(next_state)
                queue.append((next_state, steps + 1))
    
    return -1   # No solution
```

### Graph Coloring and Scheduling

Coloring a graph (assigning colors so no two adjacent nodes share a color) is NP-hard in general but solvable for bipartite graphs (2-coloring) and trees (always 2-colorable unless there's a cycle). On Codeforces, problems often ask for 2-coloring, which is just the bipartite check.

---

## 🎯 Practice Problems (Sorted by Difficulty)

### BFS / DFS Fundamentals (800–1200)
1. **[CF 580C — Kefa and Park](https://codeforces.com/problemset/problem/580/C)** — BFS on tree with constraint
2. **[CF 1283B — Candies Division](https://codeforces.com/problemset/problem/1283/B)**
3. **[CF 1385E — Directing Edges](https://codeforces.com/problemset/problem/1385/E)** — topological sort check
4. **[CF 1512F — Education](https://codeforces.com/problemset/problem/1512/F)**

### Shortest Paths (1200–1700)
5. **[CF 20C — Dijkstra?](https://codeforces.com/problemset/problem/20/C)** — classic Dijkstra with path reconstruction
6. **[CF 449B — Jzzhu and Cities](https://codeforces.com/problemset/problem/449/B)** — Dijkstra + reasoning
7. **[CF 1033E — Hidden Bipartite Graph](https://codeforces.com/problemset/problem/1033/E)**
8. **[CF 653E — Bear and Forgotten Tree](https://codeforces.com/problemset/problem/653/E)**

### Topological Sort & DAG DP (1300–1700)
9. **[CF 510C — Fox and Names](https://codeforces.com/problemset/problem/510/C)** — topo sort on constructed graph
10. **[CF 919D — Substring](https://codeforces.com/problemset/problem/919/D)** — DP on DAG
11. **[CF 1063F — String Journey](https://codeforces.com/problemset/problem/1063/F)**

### SCC / Bridges / Articulation Points (1600–2000)
12. **[CF 193E — Blood Fiend](https://codeforces.com/problemset/problem/193/E)**
13. **[CF 1217E — Sum Queries?](https://codeforces.com/problemset/problem/1217/E)**
14. **[CF 732F — Tourist](https://codeforces.com/problemset/problem/732/F)** — SCC + Dijkstra

### MST (1400–1800)
15. **[CF 1095F — Make It Connected](https://codeforces.com/problemset/problem/1095/F)** — Kruskal with virtual nodes
16. **[CF 1208E — Let Them Slide](https://codeforces.com/problemset/problem/1208/E)**

---

## 📝 Summary — When to Use What

The most important skill in graph problems is choosing the right algorithm immediately after reading the problem.

If the problem asks for shortest paths in an **unweighted** graph, use BFS. If edges have **non-negative weights**, use Dijkstra. If there are **negative weights**, use Bellman-Ford. If you need **all-pairs** shortest paths, use Floyd-Warshall (only when V ≤ 500 or so).

If the problem mentions **dependencies** or **ordering**, think topological sort. If it mentions **connectivity** or **groups**, think DSU or BFS/DFS connected components. If it asks about **critical edges/nodes**, think bridges and articulation points. If it asks for a **minimum cost spanning structure**, think Kruskal or Prim.

The 0-1 BFS trick is worth memorizing: whenever edge weights are only 0 or 1, don't reach for Dijkstra — 0-1 BFS is faster and simpler.
