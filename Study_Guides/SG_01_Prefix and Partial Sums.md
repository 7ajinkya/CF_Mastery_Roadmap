# 📘 Study Guide 01 — Mastering Prefix & Partial Sums

> **Difficulty Range**: Beginner → Intermediate (CF 800 → 1700)
> **Core Idea**: Pre-compute cumulative information so that any future query is answered in O(1) instead of O(N).

---

## 🧠 Chapter 1 — Building the Intuition from Scratch

### The Painful Starting Point

Imagine a teacher gives you a list of 100,000 test scores. A student walks up and asks "What is the total score of students 5 through 80,000?" You add them up manually — that's 79,996 operations. Another student asks a different range. You add again. If there are Q = 100,000 such questions, you're doing 10^10 operations. Your computer would take hours.

**The problem**: You are re-doing work. When you compute the sum of [5..80000] and then [5..80001], you recomputed everything in [5..80000] again. That's wasteful.

**The insight**: What if you pre-computed "the sum of everything from the start up to position i" for every i? Then the sum of any range [l, r] is just: (sum from start to r) minus (sum from start to l-1). That's one subtraction. **One operation, regardless of range size.**

This pre-computation is called a **Prefix Sum Array**.

---

### Step-by-Step Construction

Suppose our array is: `a = [3, 1, 4, 1, 5, 9, 2, 6]` (8 elements, 0-indexed)

We build prefix array `P` where `P[i]` = sum of `a[0] + a[1] + ... + a[i-1]`:

```
i:    0   1   2   3   4   5   6   7   8
P[i]: 0   3   4   8   9  14  23  25  31
      ^   ^   ^   ^
      |   |   |   P[3] = a[0]+a[1]+a[2] = 3+1+4 = 8
      |   |   P[2] = a[0]+a[1] = 3+1 = 4
      |   P[1] = a[0] = 3
      P[0] = 0  (empty prefix, very important!)
```

Notice `P` has size `n+1`. `P[0] = 0` is a sentinel that makes the formula work uniformly.

**Recurrence**: `P[i] = P[i-1] + a[i-1]` for i from 1 to n.

**Query** sum of `a[l..r]` (0-indexed, inclusive):
```
sum(l, r) = P[r+1] - P[l]
```

Let's verify: sum of `a[2..5]` = 4+1+5+9 = 19
Using formula: `P[6] - P[2]` = 23 - 4 = **19** ✓

**Why does this work?**
- `P[6]` = a[0]+a[1]+a[2]+a[3]+a[4]+a[5]
- `P[2]` = a[0]+a[1]
- Subtraction cancels a[0] and a[1], leaving a[2]+a[3]+a[4]+a[5] ✓

```python
def build_prefix(a):
    n = len(a)
    P = [0] * (n + 1)
    for i in range(n):
        P[i+1] = P[i] + a[i]
    return P

def query(P, l, r):   # sum of a[l..r], 0-indexed inclusive
    return P[r+1] - P[l]

# Pythonic one-liner build:
from itertools import accumulate
a = [3, 1, 4, 1, 5, 9, 2, 6]
P = [0] + list(accumulate(a))
```

---

## 🧠 Chapter 2 — The Difference Array (Inverse Prefix Sum)

### The Problem Difference Arrays Solve

Now imagine you have an array of 0s, and you receive commands like:
- "Add 5 to every element from index 2 to 7"
- "Add 3 to every element from index 1 to 5"
- After all commands, give me the final array.

If you do each command naively (loop from l to r, add v), worst case is O(N) per command → O(N*Q) total, which is too slow.

**The Insight**: Instead of actually updating the array, *record the intent*. Mark "at position l, a +v effect begins" and "at position r+1, the +v effect ends".

This recording array is called the **Difference Array**.

### How It Works

```
Difference array D (initially all zeros), size n+1

To apply "add v to a[l..r]":
    D[l]   += v
    D[r+1] -= v

After all updates, compute prefix sum of D → that gives the actual final array.
```

**Why does this work?** The prefix sum of D at position i is the sum of all D[0..i]. Each "add v to [l,r]" contributes +v at D[l] and -v at D[r+1]. So for any i in [l,r], the prefix sum accumulates the +v but hasn't yet hit the -v at r+1. For i > r, the -v cancels the +v. Magic!

**Example**: n=8, array of zeros
- Command: add 5 to [2, 5]
- Command: add 3 to [1, 4]

```
D after commands:
index: 0   1   2   3   4   5   6   7   8
       0  +3  +5   0   0  -5  -3   0   0
       (from cmd2: D[1]+=3, D[5]-=3)
       (from cmd1: D[2]+=5, D[6]-=5)

D = [0, 3, 5, 0, 0, -5, -3, 0, 0]

Prefix sum of D = [0, 3, 8, 8, 8, 3, 0, 0]
                      ^  ^
                      index 1 gets 3 (only cmd2)
                      index 2 gets 3+5=8 (both cmds)
```

Final array: `[0, 3, 8, 8, 8, 3, 0, 0]` — the ranges are correctly applied!

```python
def range_update_query(n, commands):
    D = [0] * (n + 2)  # extra +1 for safety
    for l, r, v in commands:
        D[l]   += v
        D[r+1] -= v
    # Build result via prefix sum
    result = [0] * n
    running = 0
    for i in range(n):
        running += D[i]
        result[i] = running
    return result
```

---

## 🧠 Chapter 3 — 2D Prefix Sums

### The Problem

You have a grid (matrix) of numbers. Queries ask: "What is the sum of all elements in the rectangle from (r1,c1) to (r2,c2)?"

Naive: iterate every cell in the rectangle = O(N*M) per query.
Better: 2D Prefix Sum = O(1) per query after O(N*M) preprocessing.

### Building the 2D Prefix Sum

`P[i][j]` = sum of all elements in the rectangle from (0,0) to (i-1, j-1).

**Recurrence** (inclusion-exclusion):
```
P[i][j] = a[i-1][j-1] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]
```

Why subtract `P[i-1][j-1]`? Because `P[i-1][j]` and `P[i][j-1]` both include the rectangle (0,0) to (i-2, j-2), so we've added it twice. Subtract once.

**Query**: sum of rectangle (r1,c1) to (r2,c2) (0-indexed):
```
sum = P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]
```

Again inclusion-exclusion — drawing it on paper makes it immediately obvious.

```python
def build_2d_prefix(grid):
    n, m = len(grid), len(grid[0])
    P = [[0]*(m+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for j in range(1, m+1):
            P[i][j] = (grid[i-1][j-1]
                       + P[i-1][j] + P[i][j-1]
                       - P[i-1][j-1])
    return P

def query_2d(P, r1, c1, r2, c2):  # 0-indexed inclusive
    return (P[r2+1][c2+1]
            - P[r1][c2+1]
            - P[r2+1][c1]
            + P[r1][c1])
```

---

## 🧠 Chapter 4 — Prefix Sums + HashMap (Counting Subarrays)

### The "Subarray Sum = K" Pattern

**Problem**: Given array `a`, count subarrays where `sum == K`.

**Naive**: For each (l, r) pair, compute sum → O(N²).

**Key Insight**: 
- Let `pre[i]` = prefix sum up to index i (with `pre[0] = 0`).
- A subarray `a[l..r]` has sum = `pre[r+1] - pre[l]`.
- We want `pre[r+1] - pre[l] == K` → `pre[l] == pre[r+1] - K`.

So as we iterate r from 0 to n-1, computing `pre[r+1]`, we ask: "How many previous prefix sums equaled `pre[r+1] - K`?" That count is the number of valid subarrays ending at r.

We maintain a hashmap `count[x]` = number of times prefix sum x has appeared so far.

```python
from collections import defaultdict

def count_subarrays_sum_k(a, k):
    count = defaultdict(int)
    count[0] = 1   # The empty prefix has sum 0
    pre = 0
    ans = 0
    for x in a:
        pre += x
        # How many previous prefixes had sum (pre - k)?
        ans += count[pre - k]
        count[pre] += 1
    return ans
```

**Trace on `a = [1, 2, 3]`, k = 3`**:
```
x=1: pre=1, ans += count[1-3]=count[-2]=0, count={0:1,1:1}
x=2: pre=3, ans += count[3-3]=count[0]=1 → ans=1, count={0:1,1:1,3:1}
x=3: pre=6, ans += count[6-3]=count[3]=1 → ans=2, count={0:1,1:1,3:1,6:1}
```
Subarrays: [1,2,3] (sum=6? no)... wait let me recheck.
- [1,2] sum=3 ✓
- [3] sum=3 ✓
Answer = 2 ✓

### Variations of This Pattern

| Problem | What you track in hashmap |
|---------|--------------------------|
| Subarray sum = K | `count[prefix_sum]` |
| Subarray sum divisible by K | `count[prefix_sum % K]` |
| Subarray with equal 0s and 1s | Replace 0→-1, find subarray sum=0 |
| Longest subarray with equal 0s and 1s | Store first occurrence of prefix sum |
| Subarray XOR = K | `count[prefix_xor]` |

**Subarray XOR = K** (same logic, using XOR instead of sum):
```python
def count_subarrays_xor_k(a, k):
    count = defaultdict(int)
    count[0] = 1
    pre_xor = 0
    ans = 0
    for x in a:
        pre_xor ^= x
        ans += count[pre_xor ^ k]  # want pre_xor ^ pre_prev = k → pre_prev = pre_xor ^ k
        count[pre_xor] += 1
    return ans
```

---

## 🧠 Chapter 5 — Advanced Patterns

### Pattern: Prefix Min/Max

Sometimes you need the minimum or maximum of a prefix, not the sum.

```python
a = [3, 1, 4, 1, 5, 9]
prefix_min = [float('inf')] * (len(a) + 1)
prefix_max = [float('-inf')] * (len(a) + 1)
for i, x in enumerate(a):
    prefix_min[i+1] = min(prefix_min[i], x)
    prefix_max[i+1] = max(prefix_max[i], x)
```

Use case: "For each element a[i], find the minimum element to its left" → `prefix_min[i]`.

### Pattern: Suffix Sums

Just prefix sums computed from the right:
```python
suffix = [0] * (n + 1)
for i in range(n-1, -1, -1):
    suffix[i] = suffix[i+1] + a[i]
# suffix[i] = sum of a[i..n-1]
```

### Pattern: Circular Prefix Sum

For circular arrays (index wraps around), a common trick is to duplicate the array:
```python
a_doubled = a + a
P = build_prefix(a_doubled)
# Now query any circular range
```

### Pattern: Partial Sums for Coordinate Compression

When you have events at arbitrary coordinates but want range sums, first compress coordinates, then build prefix sums on the compressed domain.

---

## 🧠 Chapter 6 — The Equilibrium Point & Pivot

**Classic problem**: Find index i such that `sum(a[0..i-1]) == sum(a[i+1..n-1])`.

Using prefix sums:
- Total sum S = P[n]
- Left sum at i = P[i]
- Right sum at i = P[n] - P[i+1] = S - P[i] - a[i]
- We need: P[i] == S - P[i] - a[i] → 2*P[i] + a[i] == S

```python
def find_pivot(a):
    P = build_prefix(a)
    S = P[len(a)]
    for i in range(len(a)):
        if 2 * P[i] + a[i] == S:
            return i
    return -1
```

---

## 🎯 Practice Problems (Sorted by Difficulty)

### Warm-Up (800–1000)
1. **[CF 1398C — Good Subarrays](https://codeforces.com/problemset/problem/1398/C)** — prefix sum + counting pairs
2. **[CF 1700A — Eating Candies](https://codeforces.com/problemset/problem/1700/A)** — prefix sums from both sides
3. **[CF 466C — Number of Ways](https://codeforces.com/problemset/problem/466/C)** — prefix sum + counting valid splits

### Core (1100–1400)
4. **[CF 276C — Little Girl and Maximum Sum](https://codeforces.com/problemset/problem/276/C)** — difference array
5. **[CF 816C — Karen and Supermarket](https://codeforces.com/problemset/problem/816/C)** — (hard) 2D diff array
6. **[CF 295A — Greg and Array](https://codeforces.com/problemset/problem/295/A)** — difference array of difference array
7. **[CF 610C — Harmony Analysis](https://codeforces.com/problemset/problem/610/C)**

### Advanced (1500–1700)
8. **[CF 1332C — K-Complete Word](https://codeforces.com/problemset/problem/1332/C)**
9. **[CF 1474C — Array Destruction](https://codeforces.com/problemset/problem/1474/C)** — prefix sum + binary search
10. **[LC 560 — Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/)** — classic HashMap pattern

---

## 📝 Key Takeaways

| Technique | When to Use | Time |
|-----------|-------------|------|
| Prefix Sum | Range sum queries on static array | O(N) build, O(1) query |
| Difference Array | Range update, then point query | O(N) build, O(1) update, O(N) final |
| 2D Prefix Sum | Rectangle sum queries on static grid | O(NM) build, O(1) query |
| Prefix Sum + HashMap | Count subarrays with sum/xor property | O(N) total |
| Suffix Sum | Range sum from right, combined with prefix | O(N) build |

**The Golden Rule**: If you see "range query on static array" → think prefix sum first. If you see "range update then print array" → think difference array first.