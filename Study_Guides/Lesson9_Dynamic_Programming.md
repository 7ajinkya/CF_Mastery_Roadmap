# 📘 Lesson 9: Dynamic Programming — The Core

> **DP is the #1 most-tested topic in competitive programming. Every problem from 1400+ may need it.**

---

## 1. What is Dynamic Programming?

DP = **Recursion + Memoization**, or equivalently, **Smart Brute Force** that avoids redundant computation.

**DP works when**:
- Problem has **overlapping subproblems** (same sub-computation appears repeatedly)
- Problem has **optimal substructure** (optimal solution built from optimal sub-solutions)

**The 4-step DP process**:
1. **Define** what `dp[i]` represents — be precise!
2. **Find** the recurrence (how `dp[i]` depends on previous states)
3. **Identify** the base cases
4. **Determine** traversal order (which direction fills correctly)

---

## 2. Classic DP #1: Fibonacci (Warmup)

```python
# Naive recursion: O(2^n) — too slow for n > 40
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# DP with memoization (top-down) — O(n)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo(n):
    if n <= 1: return n
    return fib_memo(n-1) + fib_memo(n-2)

# DP with tabulation (bottom-up) — O(n), PREFERRED in CP
def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space-optimized: only need last 2 values
def fib_opt(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

---

## 3. Classic DP #2: Coin Change (Minimum Coins)

**Problem**: Given coin denominations, find minimum coins to make amount X.

```python
def coin_change(coins, amount):
    # dp[i] = minimum coins to make amount i
    INF = float('inf')
    dp = [INF] * (amount + 1)
    dp[0] = 0  # base case: 0 coins to make 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
    
    return dp[amount] if dp[amount] != INF else -1

# Trace: coins=[1,5,10], amount=12
# dp[0]=0, dp[1]=1, dp[2]=2, ..., dp[5]=1, dp[10]=1, dp[11]=2, dp[12]=3
```

**Key insight**: `dp[i] = min(dp[i - coin] + 1)` for each valid coin.

---

## 4. Classic DP #3: Coin Change (Count Ways)

**Problem**: Count the number of ways to make amount X.

```python
def count_ways(coins, amount):
    # dp[i] = number of ways to make amount i
    dp = [0] * (amount + 1)
    dp[0] = 1  # one way to make 0: use no coins
    
    for coin in coins:           # order: each coin considered once
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    
    return dp[amount]

# NOTE: outer loop = coins, inner = amounts → each combination counted once
# If outer = amounts, inner = coins → counts different orderings too (permutations)
```

---

## 5. Classic DP #4: Longest Increasing Subsequence (LIS)

**Problem**: Find the length of the longest strictly increasing subsequence.

```python
# O(n^2) DP — clean and easy to understand
def lis_n2(a):
    n = len(a)
    dp = [1] * n  # dp[i] = LIS length ending at index i
    
    for i in range(n):
        for j in range(i):
            if a[j] < a[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

# O(n log n) — handles n up to 10^6
from bisect import bisect_left

def lis_nlogn(a):
    tails = []  # tails[i] = smallest tail of LIS with length i+1
    for x in a:
        pos = bisect_left(tails, x)
        if pos == len(tails):
            tails.append(x)
        else:
            tails[pos] = x  # replace to keep values small
    return len(tails)
```

---

## 6. Classic DP #5: 0/1 Knapsack

**Problem**: Items with weight/value, bag capacity W. Maximize value.

```python
def knapsack(weights, values, W):
    n = len(weights)
    dp = [0] * (W + 1)  # dp[w] = max value with capacity w
    
    for i in range(n):
        # Traverse RIGHT to LEFT — prevents using item i twice!
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[W]

# Why right-to-left?
# dp[w - weights[i]] must be the value BEFORE adding item i.
# Going left-to-right would use the updated value (= using item twice).
```

---

## 7. Classic DP #6: Maximum Subarray (Kadane's)

```python
def max_subarray(a):
    # dp[i] = max sum of subarray ENDING at index i
    # Recurrence: dp[i] = max(a[i], dp[i-1] + a[i])
    best = cur = a[0]
    for x in a[1:]:
        cur = max(x, cur + x)  # start fresh or extend
        best = max(best, cur)
    return best
```

---

## 8. 2D DP: Grid Path Counting

**Problem**: Count paths from top-left to bottom-right, only right/down moves allowed.

```python
def count_paths(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [[0] * cols for _ in range(rows)]
    dp[0][0] = 1
    
    for r in range(rows):
        for c in range(cols):
            if r == 0 and c == 0: continue
            if grid[r][c] == '#': continue  # obstacle
            if r > 0: dp[r][c] += dp[r-1][c]  # from above
            if c > 0: dp[r][c] += dp[r][c-1]  # from left
    
    return dp[rows-1][cols-1]
```

---

## 9. DP on Strings: Longest Common Subsequence (LCS)

```python
def lcs(s, t):
    n, m = len(s), len(t)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    # dp[i][j] = LCS of s[:i] and t[:j]
    
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if s[i-1] == t[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[n][m]
```

---

## 10. Memoization (Top-Down) Template

```python
import sys
from functools import lru_cache
sys.setrecursionlimit(300000)

@lru_cache(maxsize=None)
def dp(i, j):  # define state parameters as function args
    # Base cases
    if i < 0 or j < 0: return 0
    if i == 0: return base_case(j)
    
    # Recurrence — try all transitions
    return min(
        dp(i - 1, j) + cost_a,
        dp(i, j - 1) + cost_b,
    )
```

---

## 11. How to Recognize a DP Problem

Ask: **"Can I solve this with recursion, but it's too slow?"**

| Signal | DP Type |
|--------|---------|
| "Count the number of ways" | Counting DP |
| "Minimum/maximum over all sequences" | Optimization DP |
| "Can we achieve X?" | Boolean DP |
| "String/subsequence matching" | 2D DP on strings |
| "Items with include/exclude" | Knapsack-style |
| "Walk on a grid" | 2D grid DP |

---

## 🧪 Practice Problems

**Starter:**
1. [Coins (1033B)](https://codeforces.com/problemset/problem/1033/B) — simple DP
2. [Vasya and Magic Matrix (1042E)](https://codeforces.com/problemset/problem/1042/E) — DP

**Core:**
3. [Maximum Subrectangle (364E)](https://codeforces.com/problemset/problem/364/E) — 2D DP
4. [K-Periodic Garland (1574D)](https://codeforces.com/problemset/problem/1574/D) — prefix DP
5. [Carousel (1328C)](https://codeforces.com/problemset/problem/1328/C) — DP with cases
6. [Codeforces 189A](https://codeforces.com/problemset/problem/189/A) — DP warmup
7. [1455C Codeforces](https://codeforces.com/problemset/problem/1455/C) — interval DP
8. [Palindromic Characteristics (906E)](https://codeforces.com/problemset/problem/906/E) — string DP

### 📝 Teach-Back Checkpoint
Explain in your own words:
1. What does `dp[i]` represent in the coin change (minimum) problem?
2. Why do we go right-to-left in 0/1 knapsack but left-to-right in unbounded coin ways?
3. What's the difference between top-down (memoization) and bottom-up (tabulation)? Which should you use by default in CP?
