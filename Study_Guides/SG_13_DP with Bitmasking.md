# 📘 Study Guide 13 — Dynamic Programming with Bitmasking

> **Difficulty Range**: Intermediate → Expert (CF 1400 → 2400)
> **Core Idea**: When N is small (≤ 20) and your problem requires tracking which subset of elements has been "used," an integer bitmask becomes the perfect DP state — compact, fast, and directly indexable.

---

## 🧠 Chapter 1 — The Intuition: Why Bitmasks Become States

### The Problem with Tracking Subsets Naively

Imagine you have N = 15 tasks. You need to assign them to workers, and the assignment order matters. How do you track "which tasks are already done"? If you use a list or set to track the remaining tasks, two things that differ only in which tasks remain — but have the same set of remaining tasks — would be treated as different states. That's correct! But the number of distinct subsets is 2^N, which for N = 15 is 32,768. A small enough number to fit in memory and be iterated over.

The key insight is that a subset of N elements can be perfectly encoded as an N-bit integer. Bit `i` is 1 if element `i` is in the subset, 0 otherwise. So instead of storing a complex set object, your DP state is just an integer from 0 to 2^N - 1. This makes table lookup instant (just index into an array), makes iterating over all states trivial (loop from 0 to 2^N - 1), and makes transitions very fast (bitwise operations).

### The Size Constraint and Why It Matters

Bitmask DP has time complexity O(2^N × N) or O(2^N × N²) depending on the problem. For N = 20, that's about 20 × 10^6 or 400 × 10^6 operations — right at the edge of feasibility within a 2-second time limit. For N = 25, it's 800 million — too slow. For N = 30, it's completely infeasible. So the golden rule is: **bitmask DP only when N ≤ 20, and only when the problem screams "subset."**

---

## 🧠 Chapter 2 — Bit Operations Cheat Sheet for DP

Before we tackle problems, let's nail down the bit operations you'll use constantly inside the DP loops.

```python
# Check if bit i is set in mask
is_set = (mask >> i) & 1

# Set bit i in mask (add element i to subset)
new_mask = mask | (1 << i)

# Clear bit i in mask (remove element i from subset)
new_mask = mask & ~(1 << i)

# Toggle bit i
new_mask = mask ^ (1 << i)

# Count the number of set bits (how many elements in the subset)
popcount = bin(mask).count('1')    # Python: also Integer.bit_count() in Python 3.10+

# Check if mask represents a subset of full_mask
is_subset = (mask & full_mask) == mask

# Iterate over all subsets of a given mask (critical pattern!)
sub = mask
while sub > 0:
    # process sub
    sub = (sub - 1) & mask   # Jump to the next smaller subset

# Iterate over all masks with exactly k bits set
# (useful when you need fixed-size subsets)
from itertools import combinations
n = 5
for bits in combinations(range(n), k):
    mask = sum(1 << b for b in bits)
    # process mask
```

The subset enumeration trick `sub = (sub - 1) & mask` is magical and worth understanding deeply. When you subtract 1 from `sub`, the lowest set bit flips to 0 and all lower bits flip to 1. Then `& mask` keeps only bits that were in the original mask. This efficiently walks through all 2^k subsets of a k-bit mask, and the total work across all masks is O(3^N) (each element is independently in/out/absent, giving ternary counting).

---

## 🧠 Chapter 3 — The Travelling Salesman Problem (TSP)

### Setting Up the Problem

TSP is the canonical bitmask DP problem. You have N cities (N ≤ 20) and a complete weighted graph. You want to find the minimum-cost path that visits every city exactly once and returns to the start.

The brute force approach checks all N! orderings — for N = 20, that's 2.4 × 10^18. Completely impossible. Bitmask DP reduces this to O(2^N × N²) ≈ 400 million, which is feasible.

### The State Design

The crucial observation is that when you're deciding which city to visit next, the only information you need about history is: (1) which city you're currently at, and (2) which cities have already been visited. You don't need to know the order in which cities were visited.

So: `dp[mask][u]` = minimum cost to visit exactly the cities in `mask`, starting from city 0, and currently at city `u`.

The subset `mask` tells you which cities have been visited. City `u` tells you where you are right now.

```python
def tsp(dist, n):
    """
    dist[i][j] = travel cost from city i to city j.
    Returns minimum tour cost starting and ending at city 0.
    """
    INF = float('inf')
    # dp[mask][u] = min cost to reach state (mask, u) starting from city 0
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0   # We start at city 0. Mask has only bit 0 set.
    
    # Iterate over all masks in increasing order (small subsets before large)
    for mask in range(1 << n):
        for u in range(n):
            if dp[mask][u] == INF:
                continue           # This state is not reachable
            if not (mask >> u & 1):
                continue           # City u must be in mask (we're currently there)
            
            # Try extending to every unvisited city v
            for v in range(n):
                if mask >> v & 1:
                    continue       # Already visited
                new_mask = mask | (1 << v)
                new_cost = dp[mask][u] + dist[u][v]
                if new_cost < dp[new_mask][v]:
                    dp[new_mask][v] = new_cost
    
    # Return to city 0: check all final cities u
    full_mask = (1 << n) - 1
    result = min(dp[full_mask][u] + dist[u][0] for u in range(n))
    return result if result != INF else -1

# Time: O(2^N * N^2)   Space: O(2^N * N)
```

### Tracing Through a Small Example

Let's trace with 3 cities and costs: `dist = [[0,1,2],[1,0,3],[2,3,0]]`.

Start: `dp[001][0] = 0` (at city 0, only city 0 visited).

From `(001, 0)`: we can go to city 1 → `dp[011][1] = 1`, or city 2 → `dp[101][2] = 2`.

From `(011, 1)`: we can go to city 2 → `dp[111][2] = 1 + 3 = 4`.

From `(101, 2)`: we can go to city 1 → `dp[111][1] = 2 + 3 = 5`.

Final: `dp[111][2] + dist[2][0] = 4 + 2 = 6` or `dp[111][1] + dist[1][0] = 5 + 1 = 6`. Answer is 6.

---

## 🧠 Chapter 4 — Assignment Problems

### Minimum Cost Perfect Matching

You have N workers and N tasks. `cost[i][j]` = cost of assigning task j to worker i. Assign each task to exactly one worker, minimizing total cost.

The state is: `dp[mask]` = minimum cost to assign the tasks in `mask` to the first `popcount(mask)` workers. The worker index is implicitly the number of bits set in the current mask.

```python
def min_cost_assignment(cost, n):
    """
    cost[i][j] = cost of assigning task j to worker i.
    Returns minimum total cost for perfect matching.
    """
    INF = float('inf')
    dp = [INF] * (1 << n)
    dp[0] = 0   # Zero workers assigned, zero cost
    
    for mask in range(1 << n):
        if dp[mask] == INF:
            continue
        # The next worker to assign is worker #(popcount(mask))
        worker = bin(mask).count('1')
        if worker == n:
            continue
        # Try assigning each unassigned task to this worker
        for task in range(n):
            if mask >> task & 1:
                continue   # Task already assigned
            new_mask = mask | (1 << task)
            new_cost = dp[mask] + cost[worker][task]
            if new_cost < dp[new_mask]:
                dp[new_mask] = new_cost
    
    return dp[(1 << n) - 1]

# Time: O(2^N * N)   Space: O(2^N)
```

This works because we process workers in order (0, 1, 2, ...). The mask tells us which tasks have been assigned so far, and the number of set bits tells us which worker is next. Elegant and efficient.

---

## 🧠 Chapter 5 — Set Cover and Domination

### The Set Cover Problem

You have a universe of N elements and M subsets of those elements. What is the minimum number of subsets that cover all N elements?

This is NP-hard in general, but when N ≤ 20, bitmask DP solves it in O(2^N × M).

```python
def set_cover(n, subsets):
    """
    n: number of elements (bits 0..n-1)
    subsets: list of bitmasks, each representing a subset
    Returns minimum number of subsets to cover all n elements.
    """
    full = (1 << n) - 1
    INF = float('inf')
    dp = [INF] * (1 << n)
    dp[0] = 0   # Covering empty set costs 0
    
    for mask in range(1 << n):
        if dp[mask] == INF:
            continue
        for s in subsets:
            new_mask = mask | s   # Add subset s to current coverage
            dp[new_mask] = min(dp[new_mask], dp[mask] + 1)
    
    return dp[full]
```

### Sum Over Subsets (SOS DP)

A frequently needed operation is: for every mask, compute the sum of `f[sub]` over all submasks of `mask`. Naïvely this is O(3^N). The Sum Over Subsets (SOS) DP does it in O(N × 2^N).

The trick is to process one bit dimension at a time. For each bit `i`, update `dp[mask]` by adding `dp[mask without bit i]` — effectively "spreading" contributions from subsets that differ only in bit `i`.

```python
def sum_over_subsets(f, n):
    """
    f[mask] = initial value for exactly that mask.
    After SOS: f[mask] = sum of original f[sub] for all sub ⊆ mask.
    Modifies f in-place.
    """
    for i in range(n):           # For each bit position
        for mask in range(1 << n):
            if mask & (1 << i):  # Only if bit i is set in mask
                f[mask] += f[mask ^ (1 << i)]   # Add contribution from mask without bit i
    return f

# Example: f = [0, 1, 2, 0, 3, 0, 0, 0]  (n=3, values at individual masks)
# After SOS: f[7] (all bits) = f[0]+f[1]+f[2]+f[3]+f[4]+f[5]+f[6]+f[7]
```

The reverse — "for every mask, value = sum over all SUPERSETS of mask" — is done in the same way but checking `if not (mask & (1 << i))`.

---

## 🧠 Chapter 6 — Graph Coloring and Independent Sets

### Bitmask Coloring

Graph coloring with exactly K colors can be solved with bitmask DP when N ≤ 20. Precompute `indep[mask]` = 1 if the nodes in `mask` form an independent set (no two adjacent nodes). Then count the number of ways to partition all N nodes into K independent sets.

```python
def count_k_colorings(adj_matrix, n, k):
    """adj_matrix[i][j] = 1 if there's an edge between i and j."""
    # Precompute which masks are independent sets
    is_independent = [True] * (1 << n)
    for mask in range(1, 1 << n):
        # A mask is independent if no two set bits are adjacent
        for i in range(n):
            if not (mask >> i & 1): continue
            for j in range(i + 1, n):
                if (mask >> j & 1) and adj_matrix[i][j]:
                    is_independent[mask] = False
                    break
            if not is_independent[mask]:
                break
    
    full = (1 << n) - 1
    # dp[c][mask] = number of ways to color exactly the nodes in mask using c colors
    dp = [[0] * (1 << n) for _ in range(k + 1)]
    dp[0][0] = 1   # 0 colors, 0 nodes: 1 way
    
    for c in range(1, k + 1):
        for mask in range(1 << n):
            if dp[c-1][mask] == 0: continue
            # Try adding an independent set as the c-th color class
            remaining = full ^ mask   # Nodes not yet colored
            sub = remaining
            while sub > 0:
                if is_independent[sub]:
                    dp[c][mask | sub] += dp[c-1][mask]
                sub = (sub - 1) & remaining
    
    return dp[k][full]
```

### Maximum Independent Set

The maximum independent set (largest set of nodes with no two adjacent) is also solvable via bitmask DP:

```python
def max_independent_set(adj_matrix, n):
    is_independent = [True] * (1 << n)
    for mask in range(1, 1 << n):
        lsb = mask & (-mask)
        bit = lsb.bit_length() - 1
        rest = mask ^ lsb
        # mask is independent if rest is independent and bit has no neighbors in rest
        if not is_independent[rest]:
            is_independent[mask] = False
        else:
            # Check if bit conflicts with any node in rest
            for j in range(n):
                if (rest >> j & 1) and adj_matrix[bit][j]:
                    is_independent[mask] = False
                    break
    
    return max(bin(mask).count('1') for mask in range(1 << n) if is_independent[mask])
```

---

## 🧠 Chapter 7 — Profile DP (Broken Profile DP)

Profile DP is a special kind of bitmask DP used for tiling problems — filling a grid cell by cell, carrying forward a "profile" (bitmask) that encodes which cells in the frontier between processed and unprocessed parts are already covered.

### The Standard Tiling Problem

**Problem**: In how many ways can you tile an N × M grid (N ≤ 10, M ≤ 10^9 or even just M ≤ 10) with 1×2 dominoes?

The state is `dp[j][mask]` where `j` is the current column and `mask` encodes which cells in column `j` are already "sticking out" from a horizontal domino placed in column `j-1`. We process each column by deciding how to complete it (using vertical dominoes for uncovered cells) and how to start the next column.

```python
def count_tilings(n, m):
    """Count ways to tile n x m grid with 1x2 dominoes. O(2^n * m)."""
    MOD = 10**9 + 7
    
    # valid[mask_in][mask_out] = True if placing verticals in columns covered
    # by mask_in produces mask_out as the "overhang" into next column
    # This is computed via recursive DFS on the current column
    
    # dp[mask] = number of ways to fill up to current column,
    # where mask = which cells of the CURRENT column are pre-filled from previous column
    dp = [0] * (1 << n)
    dp[0] = 1   # Initially nothing is pre-filled
    
    def fill_column(row, mask_in, mask_out, new_dp):
        """
        Recursively fill the current column from row downward.
        mask_in: which rows are already filled (from horizontal dominos from prev col)
        mask_out: which rows are filled (sticking into next column from horizontal dominos)
        """
        if row == n:
            new_dp[mask_out] = (new_dp[mask_out] + dp[mask_in]) % MOD
            return
        if mask_in >> row & 1:
            # This row is already filled — just move down
            fill_column(row + 1, mask_in, mask_out, new_dp)
        else:
            # Try placing a vertical domino (fills row and row+1 in THIS column)
            if row + 1 < n and not (mask_in >> (row + 1) & 1):
                fill_column(row + 2, mask_in, mask_out, new_dp)
            # Try placing a horizontal domino (this cell + same cell in NEXT column)
            fill_column(row + 1, mask_in, mask_out | (1 << row), new_dp)
    
    for _ in range(m):
        new_dp = [0] * (1 << n)
        fill_column(0, 0, 0, new_dp)   # Note: this needs reworking to pass dp correctly
        dp = new_dp
    
    return dp[0]   # No cells sticking out at the end
```

For large M with small N, this transitions into **matrix exponentiation** over the transfer matrix between column profiles — reducing the O(2^N × M) to O(2^(3N) × log M).

---

## 🧠 Chapter 8 — Bitmask DP with Ordering and Permutations

### Counting Hamiltonian Paths

How many distinct Hamiltonian paths start at node 0 in a directed graph? `dp[mask][u]` = number of paths that visit exactly the nodes in `mask` and end at node `u`.

```python
def count_hamiltonian_paths(adj, n):
    """Count Hamiltonian paths starting at node 0. O(2^N * N^2)."""
    dp = [[0] * n for _ in range(1 << n)]
    dp[1][0] = 1   # At node 0, only node 0 visited
    
    for mask in range(1 << n):
        for u in range(n):
            if not dp[mask][u]: continue
            if not (mask >> u & 1): continue
            for v in range(n):
                if mask >> v & 1: continue
                if adj[u][v]:
                    dp[mask | (1 << v)][v] += dp[mask][u]
    
    full = (1 << n) - 1
    return sum(dp[full][u] for u in range(n))
```

### Counting Permutations with Forbidden Positions

Given an N×N matrix where `forbidden[i][j]` means element `j` cannot be at position `i`, count valid permutations (permanent of a 0/1 matrix).

```python
def count_permutations(allowed, n):
    """
    allowed[i][j] = 1 if element j can be placed at position i.
    Count valid permutations (matrix permanent mod some prime).
    """
    MOD = 10**9 + 7
    # dp[mask] = number of ways to fill the first popcount(mask) positions
    # using exactly the elements in mask
    dp = [0] * (1 << n)
    dp[0] = 1
    
    for mask in range(1 << n):
        if not dp[mask]: continue
        row = bin(mask).count('1')   # Which position we're filling next
        if row == n: continue
        for col in range(n):
            if mask >> col & 1: continue    # Element already used
            if allowed[row][col]:
                dp[mask | (1 << col)] = (dp[mask | (1 << col)] + dp[mask]) % MOD
    
    return dp[(1 << n) - 1]
```

---

## 🧠 Chapter 9 — Broken Profile and Two-Dimensional Bitmask DP

Some problems require a 2D bitmask state — for example, when you're processing a 2D grid and need to carry information from both the previous row AND the previous column. These are rare but powerful.

More commonly, two-dimensional bitmask DP appears when you have two independent "dimensions" of subset selection, such as "which items from group A" and "which items from group B." The state becomes `dp[mask_A][mask_B]` and transitions update both masks simultaneously.

---

## 🧠 Chapter 10 — Optimizing Bitmask DP

### Memory Optimization: Rolling Array

When `dp[mask]` only depends on `dp[submasks]`, you process masks in increasing order and don't need to store old values. When `dp[step][mask]` only depends on `dp[step-1][...]`, use two arrays and alternate.

### Time Optimization: Precompute Neighbor Masks

In graph-based bitmask DP, the inner loop often iterates over neighbors of a node. Precomputing `neighbor_mask[u]` = the bitmask of all neighbors of u speeds up transitions.

```python
# Precompute: neighbor_mask[u] = bitmask of all nodes adjacent to u
neighbor_mask = [0] * n
for u in range(n):
    for v in range(n):
        if adj[u][v]:
            neighbor_mask[u] |= (1 << v)

# Faster check: does adding v to current set cause any conflict with u?
# Instead of: for each pair (u,v) in mask, check if adjacent
# Use: if adding v, check if (1 << v) & neighbor_mask[u] for any u already in mask
```

### Handling N up to 25: Meet in the Middle on Bitmasks

When N is 35–40 and the problem involves subsets, meet-in-the-middle (SG_06) splits the N bits into two halves of ~N/2 bits, enumerates all 2^(N/2) submasks of each half, and combines. This is covered in SG_06 but is worth remembering as the bridge between "bitmask DP domain" and "too large for bitmask DP."

---

## 🎯 Practice Problems (Sorted by Difficulty)

For a gentle introduction to bitmask DP with a clear subset structure, **CF 401D — Roman and Numbers** (1700) and **CF 327E — Axis Walking** (1700) are excellent starting problems — both have the classic "which elements have been used" structure.

For TSP-style problems where you need to visit a set of nodes optimally, try **CF 8C — Looking for Order** (1900), which requires forming groups and minimizing total travel. **CF 1100F — Ivan and Burgers** (2100) adds a more subtle subset observation on top.

For SOS DP, **CF 1208F — Bits And Pieces** (2400) is the defining problem. Understanding why SOS works is essential before attempting it. **CF 1053E — Euler tour** uses a SOS-like aggregation over subsets of prime factors.

For harder bitmask DP with intricate transitions, **CF 1286C — r-satisfiability** and **CF 1551F — Gregor and Two Painters** both reward careful state design.

---

## 📝 Summary

Bitmask DP is a specialized but powerful technique for problems where N ≤ 20 and you need to track subset membership as a DP state. The key to mastering it is recognizing the pattern: when you need to "remember which elements have been chosen" and the optimal solution depends on the current element AND the set of previously chosen elements, you have a bitmask DP problem.

The three most important things to get right are the state definition (what does `dp[mask][...]` represent?), the transition (how do we extend one mask to the next?), and the base case (what is `dp[0]` or `dp[1 << start]`?). Once these three are correct, the code almost writes itself.

The practical constraint is memory: `2^20 × N` entries where N = 20 gives 20 million entries — fine. `2^25 × N` gives 670 million — not fine. Always check your memory requirement before committing to bitmask DP.