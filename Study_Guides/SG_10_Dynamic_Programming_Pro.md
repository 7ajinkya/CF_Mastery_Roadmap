# 📘 Study Guide 10 — Dynamic Programming: Pro

> **Difficulty Range**: Beginner → Expert (CF 800 → 2300)
> **Core Idea**: Dynamic Programming solves complex problems by breaking them into overlapping subproblems, solving each subproblem only once, and storing the results for reuse.

---

## 🧠 Chapter 1 — What IS Dynamic Programming, Really?

### The Honest Explanation (Before Any Formulas)

Most explanations of DP start with definitions. That's the wrong approach. Let's start with the feeling.

You're at a crossroads in a maze. You ask: "What is the shortest path from here to the exit?" You have several choices of direction. For each choice, the question becomes "What is the shortest path from THAT cell to the exit?" — the **exact same question**, just on a smaller input. That recursive structure is the essence of DP.

Now here's the magic: many cells get revisited. If you already computed "shortest path from cell (3,5) to exit," why compute it again the next time you arrive at (3,5)? Just store the answer. This caching of repeated subproblem answers is what separates DP from naive recursion.

**DP = Recursion + Caching of Overlapping Subproblems**

### The Three Signs You Need DP

When you're reading a problem, three signals tell you DP might be the right tool. The first is the problem asks for a count, maximum, minimum, or "is it possible?" — optimization and counting problems over an exponential search space are DP's home turf. The second is a brute-force recursion would work but it's too slow because the same subproblems recur repeatedly. The third is the problem has an "optimal substructure" property — meaning the optimal solution to the whole problem can be built from optimal solutions to sub-problems.

### Top-Down vs Bottom-Up: Two Sides of the Same Coin

**Top-down (Memoization)**: Write the recursive solution naturally. Add a cache. Done.

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def solve(state):
    if base_case(state):
        return base_value(state)
    return best_over_transitions(solve(smaller_state) for smaller_state in transitions(state))
```

**Bottom-up (Tabulation)**: Figure out which subproblems need to be solved before which others. Fill a table in that order.

```python
dp = initialize_table()
for subproblem in order_from_smallest_to_largest:
    dp[subproblem] = combine(dp[smaller_subproblems])
return dp[original_problem]
```

Both compute the exact same answers. Top-down is easier to write correctly (just write the recursion). Bottom-up is often faster in practice (no recursion overhead, better cache performance). For competitive programming, start with top-down to verify correctness, then optimize with bottom-up if needed.

---

## 🧠 Chapter 2 — DP Foundations: Canonical Examples

### The Fibonacci Warmup

```python
# Naïve: O(2^n) — recomputes fib(3) millions of times for large n
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# With memoization: O(n) — each fib(k) computed exactly once
from functools import lru_cache
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# Bottom-up: O(n) time, O(1) space (keep only last 2 values)
def fib_bottom_up(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b
```

### Climbing Stairs (1D DP on a Sequence)

You can take 1 or 2 steps at a time. How many ways to climb N stairs?

```
ways(0) = 1   (base case: one way to be at the bottom — do nothing)
ways(1) = 1   (base case)
ways(n) = ways(n-1) + ways(n-2)   (came from one step back, or two steps back)
```

This is Fibonacci. The state is "which stair are we on," and the transition says "we got here from stair n-1 or stair n-2."

### Coin Change (The Archetype of Unbounded Knapsack)

**Problem**: Given coin denominations and a target amount, find the minimum number of coins to make that amount (coins can be reused).

**State definition**: `dp[i]` = minimum number of coins to make amount i.

**Transition**: For each coin c, if we last used coin c, then `dp[i] = dp[i - c] + 1`.

```python
def coin_change(coins, amount):
    INF = float('inf')
    dp = [INF] * (amount + 1)
    dp[0] = 0   # Base case: 0 coins to make amount 0
    
    for i in range(1, amount + 1):
        for c in coins:
            if c <= i and dp[i - c] != INF:
                # If we use coin c last, we need dp[i-c] coins for the rest
                dp[i] = min(dp[i], dp[i - c] + 1)
    
    return dp[amount] if dp[amount] != INF else -1
```

**Trace for coins=[1,2,5], amount=11**:
- dp[0]=0, dp[1]=1 (one 1-coin), dp[2]=1 (one 2-coin), dp[3]=2 (1+2), dp[4]=2 (2+2), dp[5]=1 (one 5-coin), ..., dp[11]=3 (5+5+1)

---

## 🧠 Chapter 3 — Classical DP Problems You Must Know Cold

### 3.1 — 0/1 Knapsack

**Problem**: N items, each with weight w[i] and value v[i]. Knapsack capacity W. Maximize total value without exceeding capacity. Each item used at most once.

**State**: `dp[i][j]` = maximum value using only items 0..i-1 with capacity j.

**Transition**: Either we skip item i, or we take it (if it fits):
```
dp[i][j] = max(dp[i-1][j], dp[i-1][j - w[i]] + v[i])   if w[i] <= j
dp[i][j] = dp[i-1][j]                                     if w[i] > j
```

```python
def knapsack_01(weights, values, W):
    n = len(weights)
    # 2D version — clearest to understand
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for j in range(W + 1):
            # Option 1: don't take item i
            dp[i][j] = dp[i-1][j]
            # Option 2: take item i (if it fits)
            if weights[i-1] <= j:
                dp[i][j] = max(dp[i][j], dp[i-1][j - weights[i-1]] + values[i-1])
    
    return dp[n][W]

def knapsack_01_optimized(weights, values, W):
    """Space-optimized: O(W) instead of O(NW)."""
    dp = [0] * (W + 1)
    
    for i in range(len(weights)):
        # CRITICAL: iterate RIGHT TO LEFT to prevent using item i twice
        # (If we went left to right, dp[j - w[i]] might have already been updated
        #  to include item i, causing us to "use it twice")
        for j in range(W, weights[i] - 1, -1):
            dp[j] = max(dp[j], dp[j - weights[i]] + values[i])
    
    return dp[W]
```

**The right-to-left trick for 0/1 knapsack is critically important.** If you iterate left to right, `dp[j - w[i]]` would already reflect the new value for item i, meaning you could use item i more than once. Iterating right to left ensures `dp[j - w[i]]` still holds the value WITHOUT item i.

### 3.2 — Unbounded Knapsack (Items Reusable)

Same as 0/1 knapsack, but each item can be used unlimited times. The only change: iterate the capacity dimension LEFT TO RIGHT (allowing the same item to be used multiple times).

```python
def knapsack_unbounded(weights, values, W):
    dp = [0] * (W + 1)
    for j in range(1, W + 1):           # left to right — allows reuse
        for i in range(len(weights)):
            if weights[i] <= j:
                dp[j] = max(dp[j], dp[j - weights[i]] + values[i])
    return dp[W]
```

### 3.3 — Longest Common Subsequence (LCS)

**Problem**: Given strings s and t, find the length of the longest subsequence common to both (subsequence = characters in order, not necessarily contiguous).

**State**: `dp[i][j]` = LCS of s[:i] and t[:j].

**Transition**:
- If s[i-1] == t[j-1]: `dp[i][j] = dp[i-1][j-1] + 1` (extend the LCS by matching this character).
- Otherwise: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (skip one character from either string).

```python
def lcs(s, t):
    n, m = len(s), len(t)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if s[i-1] == t[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[n][m]
```

### 3.4 — Longest Increasing Subsequence (LIS)

**Problem**: Find the length of the longest strictly increasing subsequence in array a.

**Naïve DP**: `dp[i]` = length of LIS ending at index i.

```python
def lis_n2(a):
    n = len(a)
    dp = [1] * n   # Every element is an LIS of length 1 by itself
    for i in range(1, n):
        for j in range(i):
            if a[j] < a[i]:   # a[j] can extend the LIS ending at j
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)
```

This is O(N²). For competitive programming, we need O(N log N) using patience sorting:

```python
import bisect

def lis_nlogn(a):
    """
    Maintain 'tails': tails[i] = smallest tail element of all LIS of length i+1 seen so far.
    tails is always sorted, so we can binary search.
    """
    tails = []
    for x in a:
        # Find the leftmost position in tails where tails[pos] >= x
        pos = bisect.bisect_left(tails, x)
        if pos == len(tails):
            tails.append(x)    # x extends the longest LIS found so far
        else:
            tails[pos] = x     # x is a better (smaller) tail for LIS of length pos+1
    return len(tails)
```

**Why does this work?** `tails` is always sorted and increasing. When we find the position where x would go (using binary search), if it's at the end, x extends the LIS. Otherwise, x replaces a tail with a better (smaller) option, maintaining the invariant that future extensions are more likely to succeed.

### 3.5 — Edit Distance

**Problem**: Minimum operations (insert, delete, replace a character) to transform string s into string t.

```python
def edit_distance(s, t):
    n, m = len(s), len(t)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    
    # Base cases: transforming empty string to t[:j] requires j insertions
    for j in range(m + 1): dp[0][j] = j
    # Base cases: transforming s[:i] to empty string requires i deletions
    for i in range(n + 1): dp[i][0] = i
    
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if s[i-1] == t[j-1]:
                dp[i][j] = dp[i-1][j-1]   # Characters match — no operation needed
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],     # Delete s[i-1]
                    dp[i][j-1],     # Insert t[j-1] into s
                    dp[i-1][j-1]    # Replace s[i-1] with t[j-1]
                )
    
    return dp[n][m]
```

---

## 🧠 Chapter 4 — DP on Intervals (Range DP)

### The Pattern

Interval DP solves problems where we choose a "split point" or a "last action" on an interval [l, r], and the answer depends on combining results from sub-intervals. The key is: we must solve all smaller intervals before larger ones.

```python
# Template for interval DP
n = len(items)
dp = [[INF] * n for _ in range(n)]

# Base case: single elements
for i in range(n):
    dp[i][i] = base_value(i)

# Fill in order of increasing length
for length in range(2, n + 1):
    for l in range(n - length + 1):
        r = l + length - 1
        for k in range(l, r):   # k is the "split point"
            dp[l][r] = min(dp[l][r], dp[l][k] + dp[k+1][r] + cost(l, k, r))
```

### Example: Matrix Chain Multiplication

Multiplying matrices: if A is p×q and B is q×r, the cost is p*q*r operations. Given a sequence of matrices, find the optimal parenthesization to minimize total cost.

```python
def matrix_chain(dims):
    """dims[i] = number of rows of matrix i; dims[i+1] = number of cols of matrix i."""
    n = len(dims) - 1   # n matrices
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n + 1):
        for l in range(n - length + 1):
            r = l + length - 1
            dp[l][r] = float('inf')
            for k in range(l, r):
                cost = dp[l][k] + dp[k+1][r] + dims[l] * dims[k+1] * dims[r+1]
                dp[l][r] = min(dp[l][r], cost)
    
    return dp[0][n-1]
```

### Example: Burst Balloons (Hard Interval DP)

**Problem**: N balloons with values. Bursting balloon i gives `left_neighbor * i * right_neighbor` coins. Maximize total coins. You can burst in any order.

The trick is to think **backwards**: instead of "which balloon do we burst first?", ask "which balloon in interval [l, r] do we burst LAST?" If balloon k is the last burst in [l, r], then when we burst it, its left neighbor is the balloon just outside l, and right neighbor is just outside r.

```python
def burst_balloons(nums):
    # Add sentinel balloons of value 1 at both ends
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n):           # Length of interval (excluding sentinels)
        for l in range(0, n - length):
            r = l + length
            for k in range(l + 1, r):   # k is the LAST balloon burst in (l, r)
                coins = nums[l] * nums[k] * nums[r]
                dp[l][r] = max(dp[l][r], dp[l][k] + dp[k][r] + coins)
    
    return dp[0][n - 1]
```

---

## 🧠 Chapter 5 — DP on Trees

We covered tree DP in SG_08, but let's consolidate the key patterns here.

### Pattern: Subtree DP

Define `dp[u]` = some value computed from u's subtree. Compute via post-order DFS (children before parents).

```python
def tree_dp(adj, weight, n, root=1):
    """
    Example: Maximum independent set on a tree.
    dp[u][0] = max weight if u is NOT selected
    dp[u][1] = max weight if u IS selected
    """
    dp = [[0, 0] for _ in range(n + 1)]
    
    def dfs(u, parent):
        dp[u][1] = weight[u]   # If we select u
        dp[u][0] = 0           # If we don't select u
        
        for v in adj[u]:
            if v == parent: continue
            dfs(v, u)
            # If u is selected, children cannot be selected
            dp[u][1] += dp[v][0]
            # If u is not selected, children can be either
            dp[u][0] += max(dp[v][0], dp[v][1])
    
    dfs(root, -1)
    return max(dp[root][0], dp[root][1])
```

---

## 🧠 Chapter 6 — DP on Strings

### String DP Patterns

**Palindrome DP**: `dp[i][j]` = longest palindromic subsequence in s[i..j].

```python
def longest_palindromic_subsequence(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    for i in range(n):
        dp[i][i] = 1   # Single character is a palindrome
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2   # Both endpoints match
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    
    return dp[0][n-1]
```

**Palindrome Partitioning**: Minimum cuts to partition string into palindromes.

```python
def min_palindrome_cuts(s):
    n = len(s)
    # is_pal[i][j] = True if s[i..j] is a palindrome
    is_pal = [[False] * n for _ in range(n)]
    for i in range(n):
        is_pal[i][i] = True
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                is_pal[i][j] = (length == 2) or is_pal[i+1][j-1]
    
    # dp[i] = min cuts for s[0..i]
    dp = [float('inf')] * n
    for i in range(n):
        if is_pal[0][i]:
            dp[i] = 0   # Whole prefix is a palindrome — no cuts needed
        else:
            for j in range(1, i + 1):
                if is_pal[j][i]:
                    dp[i] = min(dp[i], dp[j-1] + 1)
    
    return dp[n-1]
```

---

## 🧠 Chapter 7 — Bitmask DP

### Why Bitmasks in DP?

For problems with small N (up to 20) that require tracking which elements have been "used" or "visited," a bitmask integer is the perfect DP state. Each bit represents whether an element is in or out.

### The Travelling Salesman Problem (TSP)

**Problem**: Visit all N cities exactly once and return to start. Minimize total distance.

**State**: `dp[mask][i]` = minimum cost to visit exactly the cities in `mask`, ending at city i.

```python
def tsp(dist, n):
    """dist[i][j] = distance from city i to city j."""
    INF = float('inf')
    # dp[mask][i] = min cost to visit cities in mask, starting from 0, currently at i
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0   # Start at city 0, only city 0 visited (mask = 000...001)
    
    for mask in range(1 << n):
        for u in range(n):
            if dp[mask][u] == INF: continue
            if not (mask >> u & 1): continue   # u must be in mask
            
            for v in range(n):
                if mask >> v & 1: continue     # v already visited
                new_mask = mask | (1 << v)
                new_cost = dp[mask][u] + dist[u][v]
                if new_cost < dp[new_mask][v]:
                    dp[new_mask][v] = new_cost
    
    full_mask = (1 << n) - 1
    return min(dp[full_mask][i] + dist[i][0] for i in range(n))

# Time: O(2^N * N^2)   Works for N up to ~20
```

### Bitmask DP for Assignment Problems

**Problem**: N tasks, N workers. `cost[i][j]` = cost of assigning task j to worker i. Minimize total cost (each task assigned to exactly one worker).

```python
def min_assignment(cost, n):
    INF = float('inf')
    dp = [INF] * (1 << n)
    dp[0] = 0   # No tasks assigned yet
    
    for mask in range(1 << n):
        if dp[mask] == INF: continue
        # Which worker are we assigning next? (number of bits set in mask = next worker index)
        worker = bin(mask).count('1')
        if worker == n: continue
        
        for task in range(n):
            if not (mask >> task & 1):   # task not yet assigned
                new_mask = mask | (1 << task)
                dp[new_mask] = min(dp[new_mask], dp[mask] + cost[worker][task])
    
    return dp[(1 << n) - 1]

# Time: O(2^N * N)
```

---

## 🧠 Chapter 8 — DP Optimization Techniques

### 8.1 — Divide and Conquer Optimization

**When**: The transition has the form `dp[i][j] = min over k of (dp[i-1][k] + cost(k+1, j))` AND the optimal split point `opt[i][j]` (the best k for state (i,j)) satisfies the **monotonicity property**: `opt[i][j] <= opt[i][j+1]`. This is satisfied when the cost function is "concave" (satisfying the quadrangle inequality).

Without optimization: O(N³) transitions. With D&C optimization: O(N² log N).

```python
def dp_divide_conquer(n):
    prev = [base_cost(j) for j in range(n)]
    
    def solve(lo, hi, opt_lo, opt_hi, cur_dp):
        if lo > hi: return
        mid = (lo + hi) // 2
        best_cost = float('inf')
        best_k = opt_lo
        for k in range(opt_lo, min(opt_hi, mid) + 1):
            c = prev[k] + transition_cost(k + 1, mid)  # problem-specific
            if c < best_cost:
                best_cost = c
                best_k = k
        cur_dp[mid] = best_cost
        solve(lo, mid - 1, opt_lo, best_k, cur_dp)
        solve(mid + 1, hi, best_k, opt_hi, cur_dp)
    
    curr = [float('inf')] * n
    solve(0, n - 1, 0, n - 1, curr)
    return curr
```

### 8.2 — Convex Hull Trick (CHT)

**When**: The transition has the form `dp[i] = min over j < i of (dp[j] + b[j] * a[i])`, which is a minimum of linear functions in `a[i]`. If the slopes `b[j]` are monotone (and/or `a[i]` query values are monotone), you can maintain a convex hull of lines and answer each query in O(1) amortized with a two-pointer, or O(log N) with binary search.

```python
class ConvexHullTrick:
    """
    Maintains a set of lines y = m*x + b.
    Efficiently answers: for a given x, what is the minimum y?
    Assumes lines added in decreasing slope order, queries in increasing x order.
    """
    def __init__(self):
        self.lines = []   # (slope m, intercept b)
        self.ptr = 0
    
    def _bad(self, l1, l2, l3):
        """Is line l2 never the minimum between l1 and l3?"""
        m1, b1 = l1
        m2, b2 = l2
        m3, b3 = l3
        return (b3 - b1) * (m1 - m2) <= (b2 - b1) * (m1 - m3)
    
    def add_line(self, m, b):
        """Add line y = m*x + b. Slopes must be added in decreasing order."""
        new_line = (m, b)
        while len(self.lines) >= 2 and self._bad(self.lines[-2], self.lines[-1], new_line):
            self.lines.pop()
        self.lines.append(new_line)
    
    def query(self, x):
        """Get minimum y for given x. Queries must be in increasing x order."""
        while self.ptr < len(self.lines) - 1:
            m1, b1 = self.lines[self.ptr]
            m2, b2 = self.lines[self.ptr + 1]
            if m1 * x + b1 >= m2 * x + b2:
                self.ptr += 1
            else:
                break
        m, b = self.lines[self.ptr]
        return m * x + b
```

**Classic problem** where CHT applies: Given N tasks where task i requires time `t[i]` and has deadline `d[i]`, find minimum weighted tardiness. Or "aliens trick" / Lagrangian relaxation problems.

### 8.3 — Knuth's Optimization

**When**: Interval DP of the form `dp[i][j] = min over k in [i,j-1] of (dp[i][k] + dp[k+1][j] + cost(i,j))` where cost satisfies the **quadrangle inequality** (`cost(a,c) + cost(b,d) <= cost(a,d) + cost(b,c)` for a ≤ b ≤ c ≤ d). Then the optimal split point is monotone: `opt[i][j-1] <= opt[i][j] <= opt[i+1][j]`.

Reduces O(N³) interval DP to O(N²).

```python
def knuth_interval_dp(n, cost):
    dp = [[float('inf')] * n for _ in range(n)]
    opt = [[0] * n for _ in range(n)]
    
    for i in range(n):
        dp[i][i] = 0
        opt[i][i] = i
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(opt[i][j-1], opt[i+1][j] + 1):
                val = dp[i][k] + dp[k+1][j] + cost[i][j]
                if val < dp[i][j]:
                    dp[i][j] = val
                    opt[i][j] = k
    
    return dp[0][n-1]
```

### 8.4 — Aliens Trick (Lambda Optimization / WQS Binary Search)

**When**: You need to solve "select exactly K items to minimize/maximize cost" and the problem without the K constraint is easy to solve in O(f(N)). The trick adds a penalty λ per selected item and binary searches on λ to find the value that forces the optimal solution to use exactly K items.

```python
def aliens_trick(solve_without_k_constraint, k, lo, hi):
    """
    solve_without_k_constraint(lam): given penalty lam per item used,
    returns (optimal_cost, number_of_items_used).
    
    Binary search on lam to find the lambda that results in exactly k items.
    """
    while lo < hi:
        mid = (lo + hi) // 2
        cost, count = solve_without_k_constraint(mid)
        if count <= k:
            hi = mid
        else:
            lo = mid + 1
    
    cost, count = solve_without_k_constraint(lo)
    # Adjust: we paid lo penalty per item, but we wanted actual cost
    return cost + lo * k
```

---

## 🧠 Chapter 9 — DP on DAGs and Graphs

### DAG DP (Longest/Shortest Path)

For any DP where states can be arranged in a topological order (no state depends on itself), you can think of it as DP on a DAG. The "paths" in this DAG are the valid transitions.

```python
def dag_dp(adj, n, start):
    """Longest path from start in a DAG."""
    from collections import deque
    
    in_degree = [0] * n
    for u in range(n):
        for v in adj[u]:
            in_degree[v] += 1
    
    dp = [float('-inf')] * n
    dp[start] = 0
    
    # Topological order (Kahn's)
    queue = deque(u for u in range(n) if in_degree[u] == 0)
    while queue:
        u = queue.popleft()
        for v in adj[u]:
            dp[v] = max(dp[v], dp[u] + 1)
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)
    
    return max(dp)
```

### DP with Matrix Exponentiation

When a linear recurrence has fixed coefficients and you need the K-th term for very large K, matrix exponentiation reduces it from O(K) to O(M³ log K) where M is the number of states.

```python
def matrix_mult(A, B, mod):
    n = len(A)
    C = [[0] * n for _ in range(n)]
    for i in range(n):
        for k in range(n):
            if A[i][k] == 0: continue
            for j in range(n):
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % mod
    return C

def matrix_pow(M, p, mod):
    n = len(M)
    result = [[1 if i == j else 0 for j in range(n)] for i in range(n)]  # Identity matrix
    while p:
        if p & 1:
            result = matrix_mult(result, M, mod)
        M = matrix_mult(M, M, mod)
        p >>= 1
    return result

# Example: Fibonacci via matrix exponentiation
# [F(n+1)]   [1 1]^n   [1]
# [F(n)  ] = [1 0]   * [0]
def fib_matrix(n, mod=10**9+7):
    if n == 0: return 0
    M = [[1, 1], [1, 0]]
    Mn = matrix_pow(M, n - 1, mod)
    return Mn[0][0]
```

---

## 🧠 Chapter 10 — Digit DP

### What is Digit DP?

**Problem shape**: "How many integers in [1, N] satisfy some property?" — and the property depends on the digits of the number.

The key idea: iterate through digits from most significant to least significant, making choices at each step. Maintain a flag `tight` which is True if the number constructed so far equals the prefix of N (meaning the next digit is constrained to be ≤ N's next digit) and False if we've already gone below N (all future digits can be 0-9 freely).

```python
from functools import lru_cache

def count_with_property(N):
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, *extra_state):
        """
        pos: current digit position (0 = most significant)
        tight: True if digits chosen so far exactly match N's prefix
        leading_zero: True if no non-zero digit placed yet
        extra_state: problem-specific state (e.g., sum of digits, count of 1s, etc.)
        """
        if pos == n:
            # All digits placed — check if the formed number satisfies the property
            return is_valid(*extra_state)
        
        limit = digits[pos] if tight else 9
        result = 0
        
        for d in range(0, limit + 1):
            new_tight = tight and (d == limit)
            new_leading_zero = leading_zero and (d == 0)
            new_extra_state = update_state(extra_state, d, new_leading_zero)
            result += dp(pos + 1, new_tight, new_leading_zero, *new_extra_state)
        
        return result
    
    return dp(0, True, True, initial_extra_state)

# Concrete Example: Count numbers in [1,N] with digit sum divisible by K
def count_divisible_digit_sum(N, K):
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, digit_sum_mod):
        if pos == n:
            return 1 if digit_sum_mod == 0 else 0
        
        limit = digits[pos] if tight else 9
        total = 0
        for d in range(0, limit + 1):
            total += dp(pos + 1, tight and d == limit, (digit_sum_mod + d) % K)
        return total
    
    # dp(0, True, 0) counts from 0 to N; subtract 1 to exclude 0 if needed
    return dp(0, True, 0) - 1  # -1 to exclude 0 if we want [1, N]
```

---

## 🎯 Practice Problems (Sorted by Difficulty)

### DP Foundations (800–1200)
1. **[CF 1690C — Permutation Game](https://codeforces.com/problemset/problem/1690/C)** — basic DP
2. **[CF 1546D — AquaMoon and Chess](https://codeforces.com/problemset/problem/1546/D)** — counting DP
3. **[CF 455A — Boredom](https://codeforces.com/problemset/problem/455/A)** — DP similar to house robber
4. **[CF 837D — Round Subset](https://codeforces.com/problemset/problem/837/D)** — knapsack variant

### Classical DP (1200–1600)
5. **[CF 1417C — Fenwick Trees](https://codeforces.com/problemset/problem/1417/C)**
6. **[CF 1627D — Not Quite Lee](https://codeforces.com/problemset/problem/1627/D)**
7. **[CF 1209D — Distinct Characters](https://codeforces.com/problemset/problem/1209/D)**
8. **[CF 1380C — Binary String Reconstruction](https://codeforces.com/problemset/problem/1380/C)**
9. **[CF 1036E — Covered Points](https://codeforces.com/problemset/problem/1036/E)** — LIS variant

### Bitmask DP (1500–1900)
10. **[CF 1043F — Make It One](https://codeforces.com/problemset/problem/1043/F)** — bitmask + inclusion-exclusion
11. **[CF 1519E — Off by One](https://codeforces.com/problemset/problem/1519/E)**
12. **[CF 1286C — Madhouse Meets Maddicts](https://codeforces.com/problemset/problem/1286/C)**

### Interval DP (1500–1900)
13. **[CF 1527E — Partition into Segments](https://codeforces.com/problemset/problem/1527/E)**
14. **[CF 149D — Coloring Brackets](https://codeforces.com/problemset/problem/149/D)** — interval DP on brackets
15. **[CF 1550F — Gregor and the Odd Cows](https://codeforces.com/problemset/problem/1550/F)**

### DP Optimization (1800–2200)
16. **[CF 319C — Kalila and Dimna in the Jungle](https://codeforces.com/problemset/problem/319/C)** — convex hull trick
17. **[CF 660F — Bear and Bowling](https://codeforces.com/problemset/problem/660/F)** — CHT
18. **[CF 1603E — Erase Subsequences](https://codeforces.com/problemset/problem/1603/E)** — bitmask + LCS
19. **[CF 1086E — Beautiful Matrix](https://codeforces.com/problemset/problem/1086/E)** — divide and conquer DP

### Digit DP (1600–2000)
20. **[CF 1073E — Segment Sum](https://codeforces.com/problemset/problem/1073/E)** — digit DP with sum tracking
21. **[CF 1202E — You Need to Scatter Them](https://codeforces.com/problemset/problem/1202/E)**
22. **[CF 1271E — Portals](https://codeforces.com/problemset/problem/1271/E)**

---

## 📝 Summary: The DP Thought Process

When you see a problem and suspect DP, run this checklist in your head:

First, identify what you're optimizing (minimum cost, maximum profit, number of ways, existence). Second, define the DP state — what information about the "current position in the problem" is needed to make decisions going forward? The state should capture everything relevant, but nothing irrelevant. Third, write the transition — how does the answer to a larger state depend on smaller states? This is the core of the solution. Fourth, identify base cases — what are the trivially small problems with known answers? Fifth, determine the computation order — which states need to be computed before which others? (For sequences, usually left-to-right. For trees, post-order. For bitmasks, in order of popcount.)

The most common mistake in DP is defining the state incorrectly — either it's too vague (doesn't capture enough information) or too specific (creates too many states). Getting the state definition right is 80% of the problem.

For harder problems, look for structure in the transition: if the transition involves a minimum/maximum over a range, think about optimization tricks (CHT, D&C, Knuth). If the number of "items" or "subset members" is small (≤ 20), think bitmask DP. If the recurrence is linear and K is huge, think matrix exponentiation. If the problem asks "exactly K items" and relaxing to "any number" is easy, think Aliens trick.
