# 📘 Study Guide 06 — Recursion, Backtracking & Meet-in-the-Middle

> **Difficulty Range**: Beginner → Expert (CF 900 → 2100)
> **Core Idea**: Recursion breaks problems into identical sub-problems. Backtracking prunes the search space. Meet-in-the-Middle splits exponential problems in half.

---

## 🧠 Chapter 1 — Recursion from First Principles

### What IS Recursion?

Recursion is a function that calls itself. But more importantly, it's a *problem-solving mindset*: **reduce the problem to a smaller version of itself**.

**The Two Laws of Recursion**:
1. **Base case**: The smallest version of the problem you can solve directly (no recursion needed).
2. **Recursive case**: Express the solution to the current problem in terms of the solution to a smaller problem.

### The Staircase Analogy

You're climbing a staircase. You can either think about ALL the steps at once (overwhelming), or ask: "If I knew how many ways to reach step N-1, and step N-2, could I compute step N?" Yes! `ways(N) = ways(N-1) + ways(N-2)` (Fibonacci). That's recursion: trust that the smaller problem is already solved.

### Anatomy of a Recursive Function

```python
def solve(n):
    # 1. BASE CASE: stop recursion here
    if n <= 0:
        return 0
    
    # 2. RECURSIVE CASE: reduce to a smaller problem
    return n + solve(n - 1)    # sum of 1..n
```

**Call Stack Visualization** for `solve(4)`:
```
solve(4)
  └─ 4 + solve(3)
          └─ 3 + solve(2)
                  └─ 2 + solve(1)
                          └─ 1 + solve(0)
                                  └─ returns 0
                          returns 1
                  returns 3
          returns 6
  returns 10
```

Every recursive call is paused, waiting for its inner call to finish. Python maintains a **call stack** to track this. The default Python recursion limit is 1000 frames — for deeper recursion, either increase it or convert to iteration.

```python
import sys
sys.setrecursionlimit(300000)  # Increase if needed for deep recursion
```

For very deep recursions (tree sizes up to 10^5), prefer an **iterative DFS with an explicit stack** to avoid stack overflow entirely.

### The Recursion Tree — Understanding Exponential Cost

Consider naïve Fibonacci:
```python
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
```

The recursion tree for `fib(5)` branches into two subproblems, each of which branches again. `fib(3)` gets computed **twice**, `fib(2)` gets computed **three times**. This is exponential — O(2^n). The fix is memoization (Chapter 5).

---

## 🧠 Chapter 2 — Classic Recursive Patterns

### Pattern 1: Generate All Subsets

A subset either includes an element or it doesn't — that's a binary choice at each step. The recursion tree has depth N and 2^N leaves.

```python
def generate_subsets(nums):
    result = []
    
    def backtrack(index, current):
        # Record the current subset at every node of the tree
        result.append(current[:])
        
        for i in range(index, len(nums)):
            current.append(nums[i])       # include nums[i]
            backtrack(i + 1, current)     # recurse on remaining
            current.pop()                 # UNDO — this is the "backtrack" step
    
    backtrack(0, [])
    return result

# For [1,2,3]: [], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]
```

**Alternative using bitmasks** (cleaner for small N):
```python
def generate_subsets_bit(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):
        subset = [nums[i] for i in range(n) if mask & (1 << i)]
        result.append(subset)
    return result
```

### Pattern 2: Generate All Permutations

At each step, we choose one of the remaining elements. There are N! permutations total.

```python
def permute(nums):
    result = []
    
    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])  # Found a complete permutation
            return
        for i in range(start, len(nums)):
            # Swap nums[start] with nums[i] to "choose" nums[i] for position start
            nums[start], nums[i] = nums[i], nums[start]
            backtrack(start + 1)
            # Undo the swap (backtrack)
            nums[start], nums[i] = nums[i], nums[start]
    
    backtrack(0)
    return result
```

### Pattern 3: Divide and Conquer

Divide the problem into two halves, solve each recursively, then merge. The hallmark is that subproblems don't overlap (unlike DP).

**Merge Sort** — the canonical example:
```python
def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
```

**Count Inversions** — a clever use of merge sort. An inversion is a pair (i, j) where i < j but a[i] > a[j]. During the merge step, whenever a right-half element is placed before remaining left-half elements, all those left elements form inversions with it.

```python
def count_inversions(a):
    if len(a) <= 1:
        return a, 0
    mid = len(a) // 2
    left, left_inv = count_inversions(a[:mid])
    right, right_inv = count_inversions(a[mid:])
    merged = []
    inversions = left_inv + right_inv
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j])
            # All remaining left elements (from i to end) are greater than right[j]
            inversions += len(left) - i
            j += 1
    merged += left[i:] + right[j:]
    return merged, inversions
```

---

## 🧠 Chapter 3 — Backtracking

### What is Backtracking?

Backtracking = recursion + *undoing choices*. You explore a decision tree depth-first. When you reach a dead end (a constraint is violated), you **undo your last choice** and try a different one. Think of it like solving a maze: when you hit a wall, you retrace your steps to the last junction.

The three steps in every backtracking loop are:
1. **Choose**: Make a decision (place a queen, pick a number, take an element).
2. **Explore**: Recurse with the choice made.
3. **Unchoose**: Undo the choice (restore state).

### The N-Queens Problem

Place N queens on an N×N board so no two queens attack each other (same row, column, or diagonal).

```python
def solve_n_queens(n):
    solutions = []
    cols = set()        # occupied columns
    pos_diag = set()    # row + col is constant along one diagonal direction
    neg_diag = set()    # row - col is constant along the other diagonal direction
    board = ['.' * n for _ in range(n)]
    
    def backtrack(row):
        if row == n:
            solutions.append(board[:])
            return
        for col in range(n):
            # PRUNE: skip if this cell is under attack
            if col in cols or (row + col) in pos_diag or (row - col) in neg_diag:
                continue
            
            # CHOOSE
            cols.add(col)
            pos_diag.add(row + col)
            neg_diag.add(row - col)
            board[row] = '.' * col + 'Q' + '.' * (n - col - 1)
            
            # EXPLORE
            backtrack(row + 1)
            
            # UNCHOOSE (backtrack)
            cols.remove(col)
            pos_diag.remove(row + col)
            neg_diag.remove(row - col)
            board[row] = '.' * n
    
    backtrack(0)
    return solutions
```

### Pruning Strategies — The Key to Fast Backtracking

Backtracking without pruning is just brute force. The art is pruning as aggressively as possible:

**1. Constraint checking before recursing**: Before making a choice, verify it doesn't violate any constraint.

**2. Sort + early termination**: If candidates are sorted and the current one is already too large, break (all future ones will be too).

```python
def combination_sum(candidates, target):
    candidates.sort()   # Critical: sort enables early termination
    result = []
    
    def backtrack(start, remaining, current):
        if remaining == 0:
            result.append(current[:])
            return
        for i in range(start, len(candidates)):
            # PRUNE: since sorted, if candidates[i] > remaining, all further elements also fail
            if candidates[i] > remaining:
                break
            current.append(candidates[i])
            backtrack(i, remaining - candidates[i], current)  # i (not i+1) allows reuse
            current.pop()
    
    backtrack(0, target, [])
    return result
```

**3. Bounding for optimization**: In optimization problems (maximize/minimize), if the best possible completion of the current partial solution can't beat the current best answer, prune.

```python
def max_subset_sum_bounded(nums, limit):
    """Find maximum sum of a subset with sum <= limit."""
    nums.sort(reverse=True)
    best = [0]
    
    def backtrack(index, current_sum, current_max_possible):
        if current_sum > best[0]:
            best[0] = current_sum
        # BOUND: even adding all remaining can't improve on best
        if current_sum + sum(nums[index:]) <= best[0]:
            return
        for i in range(index, len(nums)):
            if current_sum + nums[i] <= limit:
                backtrack(i + 1, current_sum + nums[i], current_max_possible)
    
    backtrack(0, 0, sum(nums))
    return best[0]
```

### Sudoku Solver (Full Backtracking)

```python
def solve_sudoku(board):
    """board is a 9x9 list of strings; '.' is empty."""
    empty = [(r, c) for r in range(9) for c in range(9) if board[r][c] == '.']
    
    def is_valid(r, c, num):
        if num in board[r]: return False
        if num in [board[i][c] for i in range(9)]: return False
        br, bc = 3 * (r // 3), 3 * (c // 3)
        for i in range(br, br + 3):
            for j in range(bc, bc + 3):
                if board[i][j] == num: return False
        return True
    
    def backtrack(idx):
        if idx == len(empty):
            return True
        r, c = empty[idx]
        for num in '123456789':
            if is_valid(r, c, num):
                board[r][c] = num
                if backtrack(idx + 1):
                    return True
                board[r][c] = '.'   # undo
        return False
    
    backtrack(0)
```

### Word Search (Grid Backtracking)

A common pattern: search for a path in a 2D grid.

```python
def word_search(board, word):
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, index):
        if index == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[index]:
            return False
        
        # Mark as visited by temporarily modifying
        temp, board[r][c] = board[r][c], '#'
        
        found = (dfs(r+1, c, index+1) or dfs(r-1, c, index+1) or
                 dfs(r, c+1, index+1) or dfs(r, c-1, index+1))
        
        board[r][c] = temp  # restore (backtrack)
        return found
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False
```

---

## 🧠 Chapter 4 — Meet in the Middle

### The Problem with Brute Force

**Problem**: Given N = 40 numbers, does any subset sum to exactly S?

Brute force checks 2^40 ≈ 10^12 subsets — at 10^9 operations/second, that's 1000 seconds. Completely infeasible.

### The Core Idea

Split the N items into two halves of N/2 ≈ 20 items each. Enumerate ALL 2^20 ≈ 10^6 subset sums for EACH half separately. Then the question becomes: "Is there a left-sum L and right-sum R such that L + R = S?" This is just a lookup problem.

**The dramatic improvement**: O(2^N) → O(2^(N/2) × N/2). For N=40: from 10^12 down to ~2×10^7. That's 50,000 times faster.

### Step-by-Step: Subset Sum Exists?

```python
import bisect

def subset_sum_exists(nums, target):
    n = len(nums)
    mid = n // 2
    left, right = nums[:mid], nums[mid:]
    
    def all_subset_sums(arr):
        """Generate all 2^len(arr) possible subset sums."""
        sums = []
        for mask in range(1 << len(arr)):
            s = 0
            for i in range(len(arr)):
                if mask & (1 << i):
                    s += arr[i]
            sums.append(s)
        return sums
    
    left_sums = all_subset_sums(left)
    right_sums = sorted(all_subset_sums(right))   # Sort right for binary search
    
    for ls in left_sums:
        need = target - ls
        # Binary search for 'need' in right_sums
        idx = bisect.bisect_left(right_sums, need)
        if idx < len(right_sums) and right_sums[idx] == need:
            return True
    return False
```

### Count Subsets Summing to Target

When you need a count instead of just existence, use a frequency dictionary:

```python
from collections import Counter

def count_subset_sum(nums, target):
    n = len(nums)
    mid = n // 2
    
    def all_subset_sums(arr):
        sums = []
        for mask in range(1 << len(arr)):
            s = sum(arr[i] for i in range(len(arr)) if mask & (1 << i))
            sums.append(s)
        return sums
    
    left_sums = all_subset_sums(nums[:mid])
    right_freq = Counter(all_subset_sums(nums[mid:]))
    
    count = 0
    for ls in left_sums:
        need = target - ls
        count += right_freq[need]
    return count
```

### Closest Subset Sum to Target

A natural extension: find the subset sum closest to target. Sort right_sums, then for each left sum, binary search to find the closest match on the right.

```python
import bisect

def closest_subset_sum(nums, target):
    n = len(nums)
    mid = n // 2
    
    def all_subset_sums(arr):
        return [sum(arr[i] for i in range(len(arr)) if mask & (1 << i))
                for mask in range(1 << len(arr))]
    
    left_sums = all_subset_sums(nums[:mid])
    right_sums = sorted(all_subset_sums(nums[mid:]))
    
    best = float('inf')
    for ls in left_sums:
        need = target - ls
        # Check the closest values in right_sums to 'need'
        idx = bisect.bisect_left(right_sums, need)
        for delta in [0, -1]:   # Check the element at idx and the one just before
            j = idx + delta
            if 0 <= j < len(right_sums):
                total = ls + right_sums[j]
                if abs(total - target) < abs(best - target):
                    best = total
    return best
```

### 4-Sum Using Meet-in-the-Middle

Find all quadruples from a single array summing to target:

```python
from collections import defaultdict

def four_sum_count(nums, target):
    n = len(nums)
    # Pair up all (i,j) sums with i < j
    pair_sums = defaultdict(int)
    for i in range(n):
        for j in range(i + 1, n):
            pair_sums[nums[i] + nums[j]] += 1
    
    count = 0
    for s, freq in pair_sums.items():
        complement = target - s
        if complement in pair_sums:
            # Be careful about counting: if s != complement, multiply frequencies
            # This is the "4-sum equals target from two groups" variant
            count += freq * pair_sums[complement]
    # Divide by 2 to avoid counting each pair of pairs twice
    return count // 2
```

### When to Reach for Meet-in-the-Middle

The mental trigger is: N is around 35–45 and the problem involves subset enumeration. Common problem shapes include subset sum, minimum cost subset, or "find any combination achieving target." If N were 20, brute force works. If N were 100, even MITM fails. The sweet spot is 30–45.

---

## 🧠 Chapter 5 — Recursion with Memoization (Top-Down DP)

Recursion becomes exponentially slow when it recomputes the same subproblems repeatedly. Memoization caches answers to subproblems the first time they're computed and returns the cached result on subsequent calls. This converts overlapping recursion into polynomial time.

```python
from functools import lru_cache

# Before memoization: O(2^n)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

# After memoization: O(n) — each unique n computed exactly once
@lru_cache(maxsize=None)
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
```

`@lru_cache` is the cleanest Pythonic approach. For problems with multiple parameters, just list them all:

```python
@lru_cache(maxsize=None)
def dp(i, remaining_capacity, state_flag):
    # Solve subproblem parameterized by (i, remaining_capacity, state_flag)
    ...
```

**Manual memo** (useful when the state involves mutable structures or you need more control):
```python
memo = {}
def solve(state):
    if state in memo:
        return memo[state]
    # compute answer...
    memo[state] = answer
    return answer
```

The relationship between memoized recursion and bottom-up DP: they compute the same answers. Memoization is top-down (starts from the big problem, recursively solves what it needs). Bottom-up DP is iterative (fills a table from smallest to largest). For competitive programming, `@lru_cache` is usually fast enough and far easier to write correctly.

---

## 🧠 Chapter 6 — Structural Recursion on Trees and Graphs

Many tree problems are naturally recursive. The pattern is: solve for children, combine results to solve for parent.

```python
def tree_height(node):
    """Height of a binary tree rooted at node."""
    if node is None:
        return 0
    return 1 + max(tree_height(node.left), tree_height(node.right))

def tree_diameter(node):
    """Longest path between any two nodes."""
    best = [0]
    def dfs(n):
        if n is None: return 0
        left = dfs(n.left)
        right = dfs(n.right)
        # The diameter passing through n is left + right
        best[0] = max(best[0], left + right)
        return 1 + max(left, right)  # Height passing through n
    dfs(node)
    return best[0]
```

For graphs, DFS is recursive exploration — we visit a node, mark it visited, recurse on unvisited neighbors, and "return" when no more neighbors exist.

---

## 🎯 Practice Problems (Sorted by Difficulty)

### Recursion Basics (800–1200)
1. **[CF 1059A — Vasya and Book](https://codeforces.com/problemset/problem/1059/A)** — shortest path via recursion
2. **[CF 1175A — From Hero to Zero](https://codeforces.com/problemset/problem/1175/A)** — simulate recursively
3. **[CF 550A — Two Substrings](https://codeforces.com/problemset/problem/550/A)**

### Generating Combinations / Backtracking (1200–1600)
4. **[CF 1209D — Distinct Characters Queries](https://codeforces.com/problemset/problem/1209/D)** — precomputation with recursion
5. **[CF 1311D — Three Methods](https://codeforces.com/problemset/problem/1311/D)**
6. **[CF 1548C — The Three Little Pigs](https://codeforces.com/problemset/problem/1548/C)** — combinatorics + recursion
7. **[CF 1033C — Permutation Game](https://codeforces.com/problemset/problem/1033/C)**

### Divide and Conquer (1400–1800)
8. **[CF 1546C — AquaMoon and Strange Sort](https://codeforces.com/problemset/problem/1546/C)**
9. **[CF 1285D — Dr. Evil Underscores](https://codeforces.com/problemset/problem/1285/D)** — divide & conquer on XOR
10. **[CF 678D — Iterated Linear Function](https://codeforces.com/problemset/problem/678/D)** — matrix exponentiation (recursive)

### Meet in the Middle (1800–2100)
11. **[CF 888E — Maximum Subsequence](https://codeforces.com/problemset/problem/888/E)** — the canonical MITM problem
12. **[CF 1006F — Xor-Paths](https://codeforces.com/problemset/problem/1006/F)** — MITM on grid paths
13. **[CF 1526F — Median Queries](https://codeforces.com/problemset/problem/1526/F)**
14. **[CF 1704E — Count Paths](https://codeforces.com/problemset/problem/1704/E)**

---

## 📝 Summary

| Technique | When to Use | Complexity |
|-----------|-------------|------------|
| Pure Recursion | Problem naturally reduces to smaller version of itself | Varies |
| Backtracking | Constraint satisfaction, combinatorial generation | O(branching^depth) with pruning |
| Divide & Conquer | Subproblems are independent, merge is cheap | Typically O(N log N) |
| Memoized Recursion | Overlapping subproblems (same as bottom-up DP) | O(states × transition cost) |
| Meet in the Middle | N ≈ 40, subset enumeration needed | O(2^(N/2) × N) |

**The Golden Decision Tree**:
- Can you reduce the problem to smaller identical copies? → Recursion.
- Do you need to try all combinations under constraints? → Backtracking + prune hard.
- Are subproblems independent? → Divide & Conquer.
- Do subproblems overlap? → Add memoization → becomes DP.
- Is N around 35–45 and you need all subsets? → Meet in the Middle.
