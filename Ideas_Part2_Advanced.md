# 🧠 The CP Ideas Encyclopedia — Part 2: Advanced (1400–2100+)

> **Every advanced idea from Specialist to Expert level**
> Difficulty: 🟡 Intermediate | 🔴 Advanced | 🟣 Expert

---

## 9. Dynamic Programming Ideas

### 🟡 9.1 DP State Design
**Idea**: The DP state encodes "what info do I need to decide future?" No more, no less.
```
dp[i]         — answer for first i elements
dp[i][j]      — answer for first i elements using j resources
dp[mask]      — answer for subset represented by bitmask
dp[i][j][k]   — 3D state (position, value, flag)
```

### 🟡 9.2 Bitmask DP
**Idea**: When n ≤ 20, represent subsets as bitmasks. State = `dp[mask]` = best answer using the subset `mask`.
```cpp
// TSP: dp[mask][i] = min cost to visit cities in mask, ending at i
vector<vector<int>> dp(1 << n, vector<int>(n, INF));
dp[1 << 0][0] = 0;
for(int mask = 1; mask < (1 << n); mask++)
    for(int i = 0; i < n; i++) if(mask & (1 << i))
        for(int j = 0; j < n; j++) if(!(mask & (1 << j)))
            dp[mask | (1 << j)][j] = min(dp[mask | (1 << j)][j],
                                         dp[mask][i] + dist[i][j]);
```
**Practice**: [2188D](https://codeforces.com/problemset/problem/2188/D), [2189C2](https://codeforces.com/problemset/problem/2189/C2)

### 🟡 9.3 Interval / Range DP
**Idea**: `dp[l][r]` = answer for subarray [l,r]. Try every split point.
```cpp
for(int len = 2; len <= n; len++)
    for(int l = 0; l + len - 1 < n; l++) {
        int r = l + len - 1;
        for(int k = l; k < r; k++)
            dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r] + cost(l, r));
    }
```

### 🔴 9.4 Digit DP
**Idea**: Count numbers in [0, N] with a property. Process digits from MSB to LSB. Track: position, tight constraint, and problem-specific state.
```cpp
// Count numbers up to N with digit sum = S
long long solve(string& num, int pos, int sum, bool tight, vector<vector<vector<long long>>>& memo) {
    if(pos == num.size()) return sum == 0 ? 1 : 0;
    if(memo[pos][sum][tight] != -1) return memo[pos][sum][tight];
    int limit = tight ? num[pos] - '0' : 9;
    long long ans = 0;
    for(int d = 0; d <= limit; d++)
        if(d <= sum)
            ans += solve(num, pos+1, sum-d, tight && (d == limit), memo);
    return memo[pos][sum][tight] = ans;
}
```

### 🔴 9.5 DP on Trees
**Idea**: Root the tree. `dp[v]` uses `dp[children]`. Process via DFS post-order.
```cpp
void dfs(int v, int parent) {
    dp[v] = base_value;
    for(int u : adj[v]) if(u != parent) {
        dfs(u, v);
        dp[v] = combine(dp[v], dp[u]); // merge child results
    }
}
```
**Practice**: [461B](https://codeforces.com/problemset/problem/461/B), [2184F](https://codeforces.com/problemset/problem/2184/F)

### 🔴 9.6 Rerooting DP
**Idea**: Compute `dp[root]`, then "reroot" to every node in O(n) total using parent contribution.
```cpp
// After computing down[v] (subtree answer), compute up[v] (answer from rest)
void reroot(int v, int parent) {
    // full[v] = combine(down[v], up[v]) = answer when v is root
    for(int u : adj[v]) if(u != parent) {
        up[u] = combine(up[v], remove_child(down[v], down[u]));
        reroot(u, v);
    }
}
```
**Practice**: [1092F](https://codeforces.com/problemset/problem/1092/F), [1187E](https://codeforces.com/problemset/problem/1187/E)

### 🔴 9.7 SOS DP (Sum over Subsets)
**Idea**: For each bitmask, compute sum over all submasks. O(n × 2ⁿ).
```cpp
for(int i = 0; i < n; i++)
    for(int mask = 0; mask < (1 << n); mask++)
        if(mask & (1 << i))
            dp[mask] += dp[mask ^ (1 << i)];
```
**Practice**: [165E](https://codeforces.com/problemset/problem/165/E), [2188F](https://codeforces.com/problemset/problem/2188/F)

### 🟣 9.8 Convex Hull Trick
**Idea**: Optimize DP transitions `dp[i] = min(m[j]*x[i] + b[j])` from O(n²) to O(n log n). Maintain a set of lines.
**When**: Transition has form `dp[i] = min/max over j of (a[j]*f(i) + b[j])` where f(i) is monotonic.
**Practice**: [319C](https://codeforces.com/problemset/problem/319/C)

### 🟣 9.9 Divide & Conquer DP
**Idea**: If optimal split point is monotonic (`opt[i] ≤ opt[i+1]`), use divide and conquer: O(n²) → O(n log n).

---

## 10. Graph Ideas

### 🟡 10.1 BFS = Shortest Path (Unweighted)
**Idea**: BFS finds shortest path in unweighted graphs. Always processes nodes in order of distance.
```cpp
vector<int> dist(n, -1);
queue<int> q;
dist[src] = 0; q.push(src);
while(!q.empty()) {
    int v = q.front(); q.pop();
    for(int u : adj[v]) if(dist[u] == -1) {
        dist[u] = dist[v] + 1;
        q.push(u);
    }
}
```

### 🟡 10.2 DFS for Components & Cycles
**Idea**: DFS explores deeply. Used for connected components, cycle detection, topological sort.
```cpp
// Cycle detection in directed graph
enum {WHITE, GRAY, BLACK};
vector<int> color(n, WHITE);
bool has_cycle = false;
void dfs(int v) {
    color[v] = GRAY;
    for(int u : adj[v]) {
        if(color[u] == GRAY) has_cycle = true; // back edge = cycle
        if(color[u] == WHITE) dfs(u);
    }
    color[v] = BLACK;
}
```

### 🟡 10.3 DSU (Disjoint Set Union / Union-Find)
**Idea**: Merge sets and check connectivity in nearly O(1).
```cpp
int par[MAXN], rnk[MAXN];
void init(int n) { iota(par, par+n, 0); fill(rnk, rnk+n, 0); }
int find(int x) { return par[x] == x ? x : par[x] = find(par[x]); }
bool unite(int a, int b) {
    a = find(a); b = find(b);
    if(a == b) return false;
    if(rnk[a] < rnk[b]) swap(a, b);
    par[b] = a;
    if(rnk[a] == rnk[b]) rnk[a]++;
    return true;
}
```
**Practice**: [25D](https://codeforces.com/problemset/problem/25/D), [277A](https://codeforces.com/problemset/problem/277/A), [1167C](https://codeforces.com/problemset/problem/1167/C)

### 🟡 10.4 Topological Sort
**Idea**: Order nodes so all edges go left→right. Only for DAGs. Use Kahn's (BFS with in-degree) or DFS post-order.
```cpp
vector<int> topo;
vector<int> in_deg(n, 0);
for edges: in_deg[v]++;
queue<int> q;
for(int i = 0; i < n; i++) if(in_deg[i] == 0) q.push(i);
while(!q.empty()) {
    int v = q.front(); q.pop();
    topo.push_back(v);
    for(int u : adj[v]) if(--in_deg[u] == 0) q.push(u);
}
```

### 🔴 10.5 Dijkstra's Algorithm
**Idea**: Shortest path in weighted graph (non-negative weights). O((V+E) log V).
```cpp
vector<long long> dist(n, LLONG_MAX);
priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
dist[src] = 0; pq.push({0, src});
while(!pq.empty()) {
    auto [d, v] = pq.top(); pq.pop();
    if(d > dist[v]) continue;
    for(auto [u, w] : adj[v]) if(dist[v] + w < dist[u]) {
        dist[u] = dist[v] + w;
        pq.push({dist[u], u});
    }
}
```
**Practice**: [20C](https://codeforces.com/problemset/problem/20/C)

### 🔴 10.6 0-1 BFS
**Idea**: When edge weights are only 0 or 1, use deque. Push 0-weight to front, 1-weight to back. O(V+E).
**Practice**: [1064D](https://codeforces.com/problemset/problem/1064/D)

### 🔴 10.7 MST (Minimum Spanning Tree)
**Idea**: Kruskal's: sort edges, add smallest that doesn't create cycle (use DSU). O(E log E).
```cpp
sort(edges.begin(), edges.end()); // by weight
long long mst = 0; int count = 0;
for(auto [w, u, v] : edges)
    if(unite(u, v)) { mst += w; count++; }
```

### 🔴 10.8 Bridges & Articulation Points
**Idea**: Edge is bridge if removing it disconnects the graph. Found in O(V+E) using DFS with `low[]` array.

### 🟣 10.9 SCC (Strongly Connected Components)
**Idea**: Maximal subsets where every node reaches every other. Kosaraju's: DFS on original, then DFS on reversed graph in reverse finish order.

### 🟣 10.10 Functional Graph / Successor Graph
**Idea**: Each node has exactly one outgoing edge → union of "rho" shapes (cycle + tails). Use binary lifting for k-th successor in O(log k).

---

## 11. Tree Ideas

### 🟡 11.1 Tree = Connected Acyclic Graph
**Idea**: n nodes, n-1 edges. Unique path between any two nodes. Root it for easier processing.

### 🔴 11.2 Euler Tour Technique
**Idea**: Flatten tree into array. Subtree of v = contiguous range. Enables range queries on subtrees.
```cpp
int tin[MAXN], tout[MAXN], timer = 0;
void euler_tour(int v, int p) {
    tin[v] = timer++;
    for(int u : adj[v]) if(u != p) euler_tour(u, v);
    tout[v] = timer++;
}
// subtree of v = [tin[v], tout[v])
```
**Practice**: [570D](https://codeforces.com/problemset/problem/570/D), [620E](https://codeforces.com/problemset/problem/620/E)

### 🔴 11.3 LCA (Lowest Common Ancestor)
**Idea**: LCA(u,v) = deepest node that's ancestor of both. Binary lifting: precompute 2ⁱ-th ancestor.
```cpp
int up[MAXN][LOG];
void preprocess(int v, int p) {
    up[v][0] = p;
    for(int i = 1; i < LOG; i++) up[v][i] = up[up[v][i-1]][i-1];
    for(int u : adj[v]) if(u != p) { depth[u] = depth[v]+1; preprocess(u, v); }
}
```
**Practice**: [1702F](https://codeforces.com/problemset/problem/1702/F)

### 🔴 11.4 Tree Diameter
**Idea**: Longest path in tree. Find in 2 BFS: BFS from any node → farthest node u → BFS from u → farthest node v. Distance u→v = diameter.

### 🟣 11.5 Centroid Decomposition
**Idea**: Find centroid (node whose removal splits tree into subtrees each ≤ n/2). Recursively decompose. Tree height becomes O(log n).

### 🟣 11.6 Heavy-Light Decomposition (HLD)
**Idea**: Decompose tree into chains. Any root-to-leaf path crosses O(log n) chains. Combine with segment tree for path queries.

### 🟣 11.7 Small-to-Large Merging (DSU on Tree)
**Idea**: When merging child info into parent, always merge smaller into larger. Total work: O(n log n).
**Practice**: [600E](https://codeforces.com/problemset/problem/600/E)

---

## 12. Segment Tree & Advanced DS Ideas

### 🟡 12.1 Segment Tree (Point Update, Range Query)
**Idea**: O(log n) point update, O(log n) range query (sum, min, max, GCD, etc).
```cpp
int tree[4*MAXN];
void update(int node, int start, int end, int idx, int val) {
    if(start == end) { tree[node] = val; return; }
    int mid = (start + end) / 2;
    if(idx <= mid) update(2*node, start, mid, idx, val);
    else update(2*node+1, mid+1, end, idx, val);
    tree[node] = tree[2*node] + tree[2*node+1];
}
int query(int node, int start, int end, int l, int r) {
    if(r < start || end < l) return 0;
    if(l <= start && end <= r) return tree[node];
    int mid = (start + end) / 2;
    return query(2*node, start, mid, l, r) + query(2*node+1, mid+1, end, l, r);
}
```
**Practice**: [339D](https://codeforces.com/problemset/problem/339/D), [380C](https://codeforces.com/problemset/problem/380/C)

### 🔴 12.2 Segment Tree with Lazy Propagation
**Idea**: Support range updates AND range queries in O(log n) each. Lazy = "pending update" stored in internal nodes.
**Practice**: [242E](https://codeforces.com/problemset/problem/242/E), [474F](https://codeforces.com/problemset/problem/474/F)

### 🔴 12.3 BIT / Fenwick Tree
**Idea**: Point update + prefix query in O(log n). Simpler and faster than segment tree (but less flexible).
```cpp
int bit[MAXN];
void update(int i, int val) { for(; i <= n; i += i&(-i)) bit[i] += val; }
int query(int i) { int s = 0; for(; i > 0; i -= i&(-i)) s += bit[i]; return s; }
int range_query(int l, int r) { return query(r) - query(l-1); }
```
**Practice**: [459D](https://codeforces.com/problemset/problem/459/D)

### 🔴 12.4 Sparse Table (RMQ)
**Idea**: O(n log n) precomputation, O(1) range min/max queries. Immutable.

### 🟣 12.5 Merge Sort Tree
**Idea**: Segment tree where each node stores a sorted list. Supports "count elements in range [l,r] that are < x" in O(log²n).

### 🟣 12.6 Persistent Segment Tree
**Idea**: Create a new version of the tree for each update. Share unchanged subtrees. O(log n) per update, O(n log n) total.

### 🟣 12.7 Li Chao Tree
**Idea**: Segment tree variant for convex hull trick. Insert lines, query min/max at point x. O(log C) per operation.

---

## 13. String Algorithm Ideas

### 🟡 13.1 String Hashing
**Idea**: Map string to integer. Compare strings in O(1) after O(n) precomputation. Use polynomial hash.
```cpp
const long long BASE = 31, MOD = 1e9+9;
vector<long long> pw(n+1), h(n+1);
pw[0] = 1;
for(int i = 1; i <= n; i++) pw[i] = pw[i-1] * BASE % MOD;
for(int i = 0; i < n; i++) h[i+1] = (h[i] * BASE + s[i]-'a'+1) % MOD;
// hash of s[l..r]
long long get_hash(int l, int r) { return (h[r+1] - h[l]*pw[r-l+1] % MOD + MOD*MOD) % MOD; }
```

### 🔴 13.2 KMP (Knuth-Morris-Pratt)
**Idea**: Find all occurrences of pattern in text in O(n+m). Builds failure function (longest proper prefix that's also suffix).
```cpp
vector<int> kmp(string& s) {
    int n = s.size();
    vector<int> lps(n, 0);
    for(int i = 1; i < n; i++) {
        int j = lps[i-1];
        while(j > 0 && s[i] != s[j]) j = lps[j-1];
        if(s[i] == s[j]) j++;
        lps[i] = j;
    }
    return lps;
}
```
**Practice**: [126B](https://codeforces.com/problemset/problem/126/B), [471D](https://codeforces.com/problemset/problem/471/D)

### 🔴 13.3 Z-Function
**Idea**: z[i] = length of longest substring starting at i that matches prefix. O(n).
```cpp
vector<int> z_function(string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;
    for(int i = 1; i < n; i++) {
        if(i < r) z[i] = min(r - i, z[i - l]);
        while(i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if(i + z[i] > r) { l = i; r = i + z[i]; }
    }
    return z;
}
```

### 🔴 13.4 Trie
**Idea**: Tree of characters. Insert/search strings in O(length). Used for maximum XOR, string prefix queries.
```cpp
int trie[MAXN][26], cnt = 0;
void insert(string& s) {
    int node = 0;
    for(char c : s) {
        if(!trie[node][c-'a']) trie[node][c-'a'] = ++cnt;
        node = trie[node][c-'a'];
    }
}
```

### 🟣 13.5 Suffix Array
**Idea**: Sorted array of all suffixes. With LCP array, solves many string problems. O(n log n) construction.

### 🟣 13.6 Aho-Corasick
**Idea**: Multi-pattern string matching. Build trie + failure links. Process text once to find all occurrences of all patterns.

---

## 14. Advanced Techniques

### 🔴 14.1 Meet in the Middle
**Idea**: Split input into two halves. Process each in O(2^(n/2)). Combine results. Turns O(2ⁿ) into O(2^(n/2) · log).
```cpp
// Subset sum: split array in half
vector<int> left_sums, right_sums;
// enumerate all 2^(n/2) sums for each half
// sort right_sums, binary search for (target - left_sum)
```

### 🔴 14.2 Sqrt Decomposition
**Idea**: Divide array into blocks of √n. Update block in O(1), query block answer in O(√n).
**When**: Online range queries where segment tree is overkill or won't work.

### 🔴 14.3 Mo's Algorithm
**Idea**: Offline range query: sort queries by (l/√n, r). Add/remove single elements. O((n+q)√n).
**Practice**: [617E](https://codeforces.com/problemset/problem/617/E)

### 🔴 14.4 Matrix Exponentiation
**Idea**: Linear recurrence f(n) = a₁f(n-1) + ... + aₖf(n-k) → matrix form → fast power in O(k³ log n).
```cpp
// Fibonacci in O(log n)
typedef vector<vector<long long>> Matrix;
Matrix multiply(Matrix& A, Matrix& B) { /* standard */ }
Matrix power(Matrix A, long long p) {
    Matrix result = identity;
    while(p > 0) {
        if(p & 1) result = multiply(result, A);
        A = multiply(A, A); p >>= 1;
    }
    return result;
}
```

### 🔴 14.5 Inclusion-Exclusion Principle
**Idea**: |A∪B∪C| = |A|+|B|+|C| - |A∩B|-|A∩C|-|B∩C| + |A∩B∩C|. Generalizes to n sets.
**When**: Count elements satisfying "at least one of" conditions.

### 🔴 14.6 Sweep Line
**Idea**: Sort events by coordinate, sweep left-to-right processing events. Often paired with segment tree.
**Practice**: [2184G](https://codeforces.com/problemset/problem/2184/G)

### 🟣 14.7 Randomized Techniques
- **Random pivots**: avoid worst-case in quickselect
- **Random hashing**: polynomial hash with random modulus
- **Birthday paradox**: expect collision after √M values in range M

### 🟣 14.8 Interactive Problem Patterns
- **Binary search**: ask queries to narrow down the answer
- **20 questions**: log₂(N) queries to find a value in [1,N]
- **Adaptive strategies**: adjust queries based on responses
**Practice**: [2197E1](https://codeforces.com/problemset/problem/2197/E1)

### 🟣 14.9 Combinatorial Identities
- **Catalan numbers**: C(n) = C(2n,n)/(n+1). Balanced brackets, binary trees, polygon triangulations.
- **Stirling numbers**: partition n elements into k non-empty subsets.
- **Derangements**: permutations with no fixed point. D(n) = (n-1)(D(n-1)+D(n-2)).
- **Burnside's lemma**: count distinct objects under symmetry.

---

## 🎯 "I'm Stuck" Checklist (Advanced)

```
□ Can I model this as a graph? What are nodes & edges?
□ Is the optimal split monotonic? → D&C DP
□ n ≤ 20? → Bitmask DP or meet in the middle
□ Transition looks like ax+b? → Convex hull trick
□ Multiple queries offline? → Mo's algorithm
□ Range queries on tree? → Euler tour + segment tree
□ Path queries on tree? → HLD or binary lifting
□ String matching? → KMP / Z-func / hashing
□ Multi-pattern? → Aho-Corasick or trie
□ Linear recurrence? → Matrix exponentiation
□ Count satisfying "at least one"? → Inclusion-exclusion
□ Events with coordinates? → Sweep line
```
