# 📘 Lesson 12: Recursion, Backtracking & Divide and Conquer

> **These are the fundamental algorithmic patterns. Master them and DP, graphs, and sorting all become clearer.**

---

## 1. Recursion — The Foundation

Every recursive function needs:
1. **Base case** — when to stop
2. **Recursive case** — solve a smaller version of the same problem
3. **Progress** — must always get closer to the base case

```python
# Template
def solve(problem):
    # 1. Base case
    if problem is trivially small:
        return base_answer
    
    # 2. Make problem smaller
    subproblem = reduce(problem)
    
    # 3. Use sub-answer to build answer
    return combine(solve(subproblem))
```

### Common Mistakes
```python
# MISTAKE 1: Missing base case
def bad(n):
    return bad(n - 1) + 1   # never stops → RecursionError

# MISTAKE 2: Not making progress
def bad2(n):
    if n <= 0: return 0
    return bad2(n) + 1      # n never changes!

# MISTAKE 3: Wrong base case
def bad3(n):
    if n == 0: return 1
    return bad3(n - 2)      # fails for odd n (never hits 0)

# CORRECT
def good(n):
    if n <= 0: return 0     # handles all small cases
    return good(n - 1) + 1  # progress guaranteed
```

---

## 2. Backtracking — Try Everything, Undo Mistakes

Backtracking = recursion that **tries all options** and **undoes bad choices** (restores state).

```python
# TEMPLATE — memorize this pattern
def backtrack(state):
    if is_complete(state):
        record(state)
        return
    
    for choice in get_choices(state):
        if is_valid(state, choice):
            apply(state, choice)       # make choice
            backtrack(state)           # recurse
            undo(state, choice)        # UNDO ← critical!
```

### Example 1: Generate All Subsets

```python
def all_subsets(a):
    result = []
    
    def backtrack(index, current):
        result.append(current[:])     # record this subset
        for i in range(index, len(a)):
            current.append(a[i])      # choose a[i]
            backtrack(i + 1, current) # recurse
            current.pop()             # undo choice
    
    backtrack(0, [])
    return result

# all_subsets([1,2,3]) → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
```

### Example 2: Generate All Permutations

```python
def all_permutations(a):
    result = []
    used = [False] * len(a)
    
    def backtrack(current):
        if len(current) == len(a):
            result.append(current[:])
            return
        for i in range(len(a)):
            if not used[i]:
                used[i] = True
                current.append(a[i])
                backtrack(current)
                current.pop()
                used[i] = False  # undo
    
    backtrack([])
    return result
```

### Example 3: N-Queens

```python
def solve_n_queens(n):
    count = 0
    cols = set()
    diag1 = set()  # row - col  (NW-SE diagonals)
    diag2 = set()  # row + col  (NE-SW diagonals)
    
    def backtrack(row):
        nonlocal count
        if row == n:
            count += 1
            return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue
            # Place queen
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            backtrack(row + 1)
            # Remove queen
            cols.remove(col); diag1.remove(row-col); diag2.remove(row+col)
    
    backtrack(0)
    return count
```

---

## 3. Pruning — Make Backtracking Fast

Without pruning, backtracking = brute force. Pruning **cuts branches early**.

```python
def knapsack_backtrack(items, budget, idx=0, current_weight=0, current_value=0):
    global best
    best = max(best, current_value)
    
    if idx == len(items): return
    
    # PRUNE 1: Current weight already exceeds budget
    if current_weight > budget: return
    
    # PRUNE 2: Even taking all remaining items can't beat best
    max_possible = current_value + sum(v for _, v in items[idx:])
    if max_possible <= best: return
    
    w, v = items[idx]
    knapsack_backtrack(items, budget, idx+1, current_weight+w, current_value+v)  # take
    knapsack_backtrack(items, budget, idx+1, current_weight, current_value)       # skip
```

**Pruning strategies**:
- **Feasibility**: stop if current state is already invalid
- **Bound**: stop if even the best possible completion can't beat current best
- **Symmetry**: skip equivalent choices

---

## 4. Divide and Conquer

**Split** → **Solve recursively** → **Merge**.

```python
# Merge Sort: the canonical D&C example
def merge_sort(a):
    if len(a) <= 1: return a
    mid = len(a) // 2
    left  = merge_sort(a[:mid])
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

### Counting Inversions — D&C Classic

An inversion is a pair (i, j) where i < j but a[i] > a[j].

```python
def count_inversions(a):
    if len(a) <= 1:
        return a, 0
    mid = len(a) // 2
    left,  inv_l = count_inversions(a[:mid])
    right, inv_r = count_inversions(a[mid:])
    merged, inv_m = merge_count(left, right)
    return merged, inv_l + inv_r + inv_m

def merge_count(left, right):
    result = []
    inversions = 0
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            # All remaining left elements are > right[j] → all form inversions
            inversions += len(left) - i
            result.append(right[j]); j += 1
    result += left[i:] + right[j:]
    return result, inversions
```

---

## 5. Quick Select — Find k-th Smallest in O(n) Average

```python
import random

def quickselect(a, k):
    if len(a) == 1: return a[0]
    pivot = random.choice(a)
    lo = [x for x in a if x < pivot]
    hi = [x for x in a if x > pivot]
    eq = [x for x in a if x == pivot]
    
    if k < len(lo):
        return quickselect(lo, k)
    elif k < len(lo) + len(eq):
        return pivot
    else:
        return quickselect(hi, k - len(lo) - len(eq))

# Find median:
a = [3, 1, 4, 1, 5, 9, 2, 6]
median = quickselect(a, len(a) // 2)
```

---

## 6. When to Use What

| Situation | Technique |
|-----------|-----------|
| Small n (≤ 20), enumerate all | Backtracking |
| "Count/find valid arrangements" | Backtracking + pruning |
| "Try all subsets" (n ≤ 20) | Bitmask or backtracking |
| O(n log n) sort-based | Divide and Conquer |
| Recursion is natural but slow | Add memoization → DP |
| Count inversions | D&C merge sort |

---

## 7. Recursion → Iterative Conversion

For deep recursion, convert to iterative with an explicit stack:

```python
# Recursive DFS
def dfs_recursive(node, graph, visited):
    visited[node] = True
    for neighbor in graph[node]:
        if not visited[neighbor]:
            dfs_recursive(neighbor, graph, visited)

# Iterative equivalent
def dfs_iterative(start, graph, n):
    visited = [False] * (n + 1)
    stack = [start]
    while stack:
        node = stack.pop()
        if visited[node]: continue
        visited[node] = True
        for neighbor in graph[node]:
            if not visited[neighbor]:
                stack.append(neighbor)
```

---

## 🧪 Practice Problems

1. [Codeforces 384A](https://codeforces.com/problemset/problem/384/A) — recursion/simulation
2. [Vitaly and Strings (305C)](https://codeforces.com/problemset/problem/305/C) — backtracking logic  
3. [Sorting by Subsequences (723E)](https://codeforces.com/problemset/problem/723/E) — cycle finding (recursive)
4. [Codeforces 1097C](https://codeforces.com/problemset/problem/1097/C) — D&C
5. [Codeforces 1119E](https://codeforces.com/problemset/problem/1119/E) — D&C DP
6. [Inverse Permutation (1481D)](https://codeforces.com/problemset/problem/1481/D) — recursion pattern
7. [Rectangles (566C)](https://codeforces.com/problemset/problem/566/C) — backtracking logic
8. [Codeforces 786C](https://codeforces.com/problemset/problem/786/C) — D&C

### 📝 Teach-Back Checkpoint
1. What are the three requirements of a correct recursive function?
2. Why is the "undo" step critical in backtracking? What goes wrong without it?
3. How does merge sort use divide and conquer? What does the "merge" step do?
4. When should you convert recursion to iteration?
