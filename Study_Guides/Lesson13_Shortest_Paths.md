# 📘 Lesson 13: Shortest Paths — Dijkstra & Beyond

> **Weighted graphs need smarter algorithms than BFS. Dijkstra is one of the most-tested graph algorithms in competitive programming.**

---

## 1. Why BFS Fails on Weighted Graphs

BFS finds shortest path by **hop count**. With different weights, fewest hops ≠ minimum weight.

```
A --1--> B --100--> C
A --------5--------> C

BFS answer: A→B→C (2 hops = weight 101)
Correct answer: A→C    (1 hop  = weight 5)
```

We need algorithms that respect edge weights.

---

## 2. Dijkstra's Algorithm ⭐

Finds shortest paths from one source to all nodes. **Requires non-negative edge weights.**

```python
import heapq

def dijkstra(adj, n, source):
    dist = [float('inf')] * (n + 1)
    dist[source] = 0
    heap = [(0, source)]  # (distance, node)
    
    while heap:
        d, u = heapq.heappop(heap)
        
        # Skip outdated entries (lazy deletion)
        if d > dist[u]:
            continue
        
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    
    return dist

# Standard graph input setup:
n, m = map(int, input().split())
adj = [[] for _ in range(n + 1)]
for _ in range(m):
    u, v, w = map(int, input().split())
    adj[u].append((v, w))
    adj[v].append((u, w))  # undirected

dist = dijkstra(adj, n, 1)
print(dist[n] if dist[n] != float('inf') else -1)
```

**Time complexity**: O((V + E) log V)

### Path Reconstruction

```python
def dijkstra_with_path(adj, n, source):
    dist = [float('inf')] * (n + 1)
    prev = [-1] * (n + 1)
    dist[source] = 0
    heap = [(0, source)]
    
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev[v] = u
                heapq.heappush(heap, (dist[v], v))
    
    def reconstruct(t):
        path = []
        while t != -1:
            path.append(t)
            t = prev[t]
        return path[::-1]
    
    return dist, reconstruct

dist, get_path = dijkstra_with_path(adj, n, 1)
print(get_path(n))  # shortest path from 1 to n
```

---

## 3. Multi-Source Dijkstra

When there are multiple starting points, initialize all with distance 0.

```python
def multi_source_dijkstra(adj, n, sources):
    dist = [float('inf')] * (n + 1)
    heap = []
    
    for s in sources:
        dist[s] = 0
        heapq.heappush(heap, (0, s))
    
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(heap, (dist[v], v))
    
    return dist

# Example: nearest hospital to each city
# hospitals = [h1, h2, h3]
# dist[i] = distance from city i to nearest hospital
dist = multi_source_dijkstra(adj, n, hospitals)
```

---

## 4. Bellman-Ford Algorithm

Handles **negative edge weights**. Also detects **negative cycles**.

```python
def bellman_ford(edges, n, source):
    dist = [float('inf')] * (n + 1)
    dist[source] = 0
    
    # Relax all edges n-1 times
    for _ in range(n - 1):
        updated = False
        for u, v, w in edges:
            if dist[u] != float('inf') and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                updated = True
        if not updated: break  # early termination
    
    # Check for negative cycles (n-th relaxation still updates → cycle)
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # negative cycle reachable from source
    
    return dist

# Input format: edges = [(u, v, w), ...]
```

**Time**: O(VE) — much slower than Dijkstra.

---

## 5. 0-1 BFS (Weight 0 or 1 Only)

When edge weights are only 0 or 1, use a deque — it's O(V+E), faster than Dijkstra.

```python
from collections import deque

def bfs_01(adj, n, source):
    dist = [float('inf')] * (n + 1)
    dist[source] = 0
    dq = deque([source])
    
    while dq:
        u = dq.popleft()
        for v, w in adj[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                if w == 0:
                    dq.appendleft(v)  # free edge → push to front
                else:
                    dq.append(v)      # cost-1 edge → push to back
    
    return dist
```

**Why this works**: Deque maintains the invariant that all elements are within 1 of the minimum. 0-weight edges don't increase distance, so they go to the front.

---

## 6. Floyd-Warshall (All Pairs Shortest Path)

Finds shortest path between **every pair** of nodes. For dense graphs or small n (≤ 500).

```python
def floyd_warshall(n, edges):
    INF = float('inf')
    dist = [[INF] * (n + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        dist[i][i] = 0
    for u, v, w in edges:
        dist[u][v] = min(dist[u][v], w)
        dist[v][u] = min(dist[v][u], w)  # undirected
    
    for k in range(1, n + 1):       # intermediate node
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    
    return dist

# After: dist[i][j] = shortest path from i to j
# If dist[i][i] < 0: node i is on a negative cycle
```

**Time**: O(V³)

---

## 7. Choosing the Right Algorithm

| Situation | Algorithm | Time |
|-----------|-----------|------|
| Unweighted graph | BFS | O(V+E) |
| Non-negative weights, single source | Dijkstra | O((V+E) log V) |
| Edge weights are 0 or 1 | 0-1 BFS | O(V+E) |
| Negative weights, single source | Bellman-Ford | O(VE) |
| All pairs shortest path | Floyd-Warshall | O(V³) |

---

## 8. Common Shortest Path Problem Patterns

| Problem type | Approach |
|---|---|
| "Minimum cost from s to t" | Dijkstra |
| "Minimum operations to transform X to Y" | BFS/Dijkstra on state graph |
| "Each node has nearest facility" | Multi-source Dijkstra |
| "Avoid certain nodes/edges" | Set their cost to infinity |
| "Minimize maximum edge on path" | Binary search + BFS reachability |
| "Number of shortest paths" | Modified Dijkstra (count paths) |

### Count Shortest Paths
```python
def dijkstra_count(adj, n, source):
    dist = [float('inf')] * (n + 1)
    count = [0] * (n + 1)
    dist[source] = 0
    count[source] = 1
    heap = [(0, source)]
    
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]: continue
        for v, w in adj[u]:
            new_d = dist[u] + w
            if new_d < dist[v]:
                dist[v] = new_d
                count[v] = count[u]
                heapq.heappush(heap, (dist[v], v))
            elif new_d == dist[v]:
                count[v] += count[u]  # another shortest path found
    
    return dist, count
```

---

## 🧪 Practice Problems

1. [Dijkstra? (20C)](https://codeforces.com/problemset/problem/20/C) — classic Dijkstra + path
2. [Codeforces 1442C](https://codeforces.com/problemset/problem/1442/C) — shortest path model
3. [Market (1254D)](https://codeforces.com/problemset/problem/1254/D) — modified Dijkstra
4. [Codeforces 1547G](https://codeforces.com/problemset/problem/1547/G) — 0-1 BFS
5. [Codeforces 1555E](https://codeforces.com/problemset/problem/1555/E) — Dijkstra with states
6. [Visiting Friends (1033E)](https://codeforces.com/problemset/problem/1033/E) — multi-source Dijkstra
7. [Codeforces 505E](https://codeforces.com/problemset/problem/505/E) — negative paths / BF
8. [Codeforces 242C](https://codeforces.com/problemset/problem/242/C) — modified Dijkstra

### 📝 Teach-Back Checkpoint
1. Why can't Dijkstra handle negative weights? What goes wrong?
2. When would you use 0-1 BFS instead of Dijkstra?
3. What is multi-source Dijkstra and when is it useful?
4. When would you use Floyd-Warshall over Dijkstra?
