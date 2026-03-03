# 📘 Lesson 8: Graph Theory — BFS & DFS

> **Graphs are the backbone of ~30% of Codeforces problems rated 1200–1800. This is not optional.**

---

## 1. What is a Graph?

A graph is a set of **nodes** (vertices) connected by **edges**. In CP, graphs model:
- Maps/grids (cells = nodes, adjacency = edges)
- Networks (computers, cities)
- Relationships (friendships, dependencies)
- Trees (special case: connected, no cycles)

```python
# Graph representation: Adjacency List (use this!)
n = 5  # nodes 0..4
adj = [[] for _ in range(n)]

# Add undirected edge between u and v
def add_edge(u, v):
    adj[u].append(v)
    adj[v].append(u)

# Read graph from input
n, m = map(int, input().split())
adj = [[] for _ in range(n + 1)]  # 1-indexed
for _ in range(m):
    u, v = map(int, input().split())
    adj[u].append(v)
    adj[v].append(u)
```

**Why adjacency list?** Space O(V + E), fast neighbor iteration.

---

## 2. BFS — Breadth-First Search

BFS explores level by level. **Use for: shortest path in unweighted graph, component detection.**

```python
from collections import deque

def bfs(start, adj, n):
    dist = [-1] * (n + 1)
    dist[start] = 0
    queue = deque([start])
    
    while queue:
        node = queue.popleft()
        for neighbor in adj[node]:
            if dist[neighbor] == -1:  # not visited
                dist[neighbor] = dist[node] + 1
                queue.append(neighbor)
    
    return dist  # dist[i] = shortest distance from start to i, -1 if unreachable

# Check if node t is reachable from s
d = bfs(s, adj, n)
if d[t] == -1:
    print("IMPOSSIBLE")
else:
    print(d[t])
```

### BFS on Grid

```python
from collections import deque

def bfs_grid(grid, start_r, start_c):
    rows, cols = len(grid), len(grid[0])
    dist = [[-1] * cols for _ in range(rows)]
    dist[start_r][start_c] = 0
    queue = deque([(start_r, start_c)])
    DIRS = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    while queue:
        r, c = queue.popleft()
        for dr, dc in DIRS:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                if dist[nr][nc] == -1 and grid[nr][nc] != '#':
                    dist[nr][nc] = dist[r][c] + 1
                    queue.append((nr, nc))
    
    return dist
```

---

## 3. DFS — Depth-First Search

DFS goes as deep as possible before backtracking. **Use for: cycle detection, connected components, topological sort.**

```python
# Iterative DFS (safe for large inputs — no recursion limit issues)
def dfs(start, adj, n):
    visited = [False] * (n + 1)
    stack = [start]
    visited[start] = True
    order = []
    
    while stack:
        node = stack.pop()
        order.append(node)
        for neighbor in adj[node]:
            if not visited[neighbor]:
                visited[neighbor] = True
                stack.append(neighbor)
    
    return order

# Recursive DFS (cleaner but add sys.setrecursionlimit)
import sys
sys.setrecursionlimit(300000)

def dfs_rec(node, parent, adj, visited):
    visited[node] = True
    for neighbor in adj[node]:
        if not visited[neighbor]:
            dfs_rec(neighbor, node, adj, visited)
```

---

## 4. Connected Components

```python
def find_components(adj, n):
    component = [-1] * (n + 1)
    num_components = 0
    
    for start in range(1, n + 1):
        if component[start] == -1:
            queue = deque([start])
            component[start] = num_components
            while queue:
                node = queue.popleft()
                for neighbor in adj[node]:
                    if component[neighbor] == -1:
                        component[neighbor] = num_components
                        queue.append(neighbor)
            num_components += 1
    
    return component, num_components
```

---

## 5. Bipartite Check (2-Coloring)

A graph is bipartite if nodes can be split into 2 groups with no edges within a group.

```python
def is_bipartite(adj, n):
    color = [-1] * (n + 1)
    
    for start in range(1, n + 1):
        if color[start] != -1:
            continue
        color[start] = 0
        queue = deque([start])
        while queue:
            node = queue.popleft()
            for neighbor in adj[node]:
                if color[neighbor] == -1:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False  # same color on both sides = not bipartite
    
    return True
```

---

## 6. Cycle Detection

```python
# Detect cycle in UNDIRECTED graph
def has_cycle_undirected(adj, n):
    visited = [False] * (n + 1)
    
    def dfs(node, parent):
        visited[node] = True
        for neighbor in adj[node]:
            if not visited[neighbor]:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:
                return True  # back edge = cycle!
        return False
    
    for i in range(1, n + 1):
        if not visited[i]:
            if dfs(i, -1):
                return True
    return False

# Detect cycle in DIRECTED graph
def has_cycle_directed(adj, n):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * (n + 1)
    
    def dfs(node):
        color[node] = GRAY
        for neighbor in adj[node]:
            if color[neighbor] == GRAY:
                return True  # back edge in directed graph = cycle
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False
    
    for i in range(1, n + 1):
        if color[i] == WHITE and dfs(i):
            return True
    return False
```

---

## 7. Common Graph Problem Patterns

| Problem says | Think |
|---|---|
| "Minimum steps/hops to reach" | BFS (unweighted) |
| "Can we go from A to B?" | BFS/DFS reachability |
| "How many groups/islands?" | Connected components |
| "Is there a cycle?" | DFS (check back edges) |
| "Can we 2-color / split into teams?" | Bipartite check |
| "Process nodes by dependencies" | Topological sort |

---

## 8. Topological Sort

For Directed Acyclic Graphs (DAGs). Process nodes in dependency order.

```python
from collections import deque

def topological_sort(adj, n):
    in_degree = [0] * (n + 1)
    for u in range(1, n + 1):
        for v in adj[u]:
            in_degree[v] += 1
    
    queue = deque(v for v in range(1, n + 1) if in_degree[v] == 0)
    order = []
    
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    if len(order) != n:
        return None  # cycle exists, no valid topological order
    return order
```

---

## 🧪 Practice Problems

1. [Ice Cave (540C)](https://codeforces.com/problemset/problem/540/C) — BFS grid
2. [Journey (839C)](https://codeforces.com/problemset/problem/839/C) — DFS on tree
3. [Police Stations (796D)](https://codeforces.com/problemset/problem/796/D) — multi-source BFS
4. [Anya and Cubes (710C)](https://codeforces.com/problemset/problem/710/C) — search
5. [Bear and Coloring (660F)](https://codeforces.com/problemset/problem/660/F) — graph coloring
6. [Valera and Graph (441C)](https://codeforces.com/problemset/problem/441/C) — graph properties
7. [A and B and Lecture Rooms (下 (343E)](https://codeforces.com/problemset/problem/343/E) — tree/BFS
8. [Learning Languages (277C)](https://codeforces.com/problemset/problem/277/C) — components

### 📝 Teach-Back Checkpoint
After solving 3+ problems, explain:
1. What is the difference between BFS and DFS? When do you pick each?
2. How do you detect if an undirected graph has a cycle?
3. How do you find the shortest path in an unweighted grid?
