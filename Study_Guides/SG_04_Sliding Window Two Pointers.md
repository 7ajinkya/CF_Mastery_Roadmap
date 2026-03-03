# 📘 Study Guide 04 — Sliding Window & Two Pointers

> **Difficulty Range**: Beginner → Advanced (CF 900 → 1900)
> **Core Idea**: Instead of examining all O(N²) pairs of indices, maintain a "window" of elements and slide it efficiently, doing O(1) work per step.

---

## 🧠 Chapter 1 — The Core Intuition

### Why Not Just Check Everything?

Given an array of N elements, if you want to examine every subarray, there are O(N²) subarrays. For N = 10^5, that's 10^10 operations — way too slow.

**The Key Insight**: Many subarray problems have a **monotonicity property**. For example:
- "If subarray [l, r] has sum > S, then [l, r+1] also has sum > S" (sums only grow as we extend right)
- "If subarray [l, r] has at most K distinct elements, then [l, r-1] also has at most K distinct elements"

When this monotonicity holds, we don't need to re-examine every pair. We can maintain a window and move it forward. As we extend the right end, we only advance the left end — we *never move left backwards*. This gives O(N) total moves.

### The Sliding Window Guarantee

**Total moves of left pointer + Total moves of right pointer = O(N) + O(N) = O(N).**

Each pointer traverses the array at most once. This is the fundamental efficiency argument.

---

## 🧠 Chapter 2 — Fixed-Size Window

When the window size K is given, both pointers move in lockstep (right advances, left always = right - K).

### Template

```python
def fixed_window(a, k):
    n = len(a)
    # Initialize: build first window [0, k-1]
    window_val = sum(a[:k])   # or some initial computation
    best = window_val
    
    for right in range(k, n):
        # Slide: include a[right], exclude a[right - k]
        window_val += a[right]
        window_val -= a[right - k]
        best = max(best, window_val)   # or min, or whatever
    
    return best
```

### Example 1 — Maximum Sum of K Consecutive Elements

```python
def max_sum_k(a, k):
    n = len(a)
    window = sum(a[:k])
    best = window
    for i in range(k, n):
        window += a[i] - a[i-k]
        best = max(best, window)
    return best
```

### Example 2 — First Negative in Every Window of Size K

```python
from collections import deque

def first_negatives_in_windows(a, k):
    dq = deque()   # stores indices of negative numbers
    result = []
    
    for i in range(len(a)):
        # Remove elements outside current window
        if dq and dq[0] <= i - k:
            dq.popleft()
        # Add current element if negative
        if a[i] < 0:
            dq.append(i)
        # Report for windows [0..k-1], [1..k], ...
        if i >= k - 1:
            result.append(a[dq[0]] if dq else 0)
    return result
```

---

## 🧠 Chapter 3 — Variable-Size Window (Shrinkable Window)

This is the most powerful pattern. The window grows by extending right, and shrinks by advancing left when a condition is violated.

### Template

```python
def variable_window(a, condition_fn):
    left = 0
    state = initial_state   # e.g., window_sum = 0, freq = {}
    best = 0
    
    for right in range(len(a)):
        # EXPAND: add a[right] to window
        state = update_add(state, a[right])
        
        # SHRINK: while window violates condition, remove a[left]
        while not condition_fn(state):
            state = update_remove(state, a[left])
            left += 1
        
        # Now window [left, right] satisfies condition
        best = max(best, right - left + 1)   # or min, or accumulate count
    
    return best
```

### Example 1 — Longest Subarray with Sum ≤ S

```python
def longest_subarray_sum_at_most(a, S):
    left = 0
    window_sum = 0
    best = 0
    for right in range(len(a)):
        window_sum += a[right]
        while window_sum > S:
            window_sum -= a[left]
            left += 1
        best = max(best, right - left + 1)
    return best
```

**Condition**: sum ≤ S. Violating condition: sum > S → shrink.

### Example 2 — Longest Substring with At Most K Distinct Characters

```python
from collections import defaultdict

def longest_at_most_k_distinct(s, k):
    freq = defaultdict(int)
    left = 0
    best = 0
    for right in range(len(s)):
        freq[s[right]] += 1
        # Shrink while more than k distinct chars
        while len(freq) > k:
            freq[s[left]] -= 1
            if freq[s[left]] == 0:
                del freq[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best
```

### Example 3 — Minimum Window Containing All Characters (Hard)

**Problem**: Find the smallest substring of s that contains all characters of t.

```python
from collections import Counter

def min_window(s, t):
    need = Counter(t)
    have = {}
    formed = 0       # characters in window that satisfy requirement
    required = len(need)
    left = 0
    best = (float('inf'), 0, 0)
    
    for right in range(len(s)):
        c = s[right]
        have[c] = have.get(c, 0) + 1
        if c in need and have[c] == need[c]:
            formed += 1
        
        # Try to shrink window while all required chars are present
        while formed == required:
            # Record this window
            if right - left + 1 < best[0]:
                best = (right - left + 1, left, right)
            # Shrink from left
            lc = s[left]
            have[lc] -= 1
            if lc in need and have[lc] < need[lc]:
                formed -= 1
            left += 1
    
    return s[best[1]:best[2]+1] if best[0] != float('inf') else ""
```

---

## 🧠 Chapter 4 — Two Pointers (Opposite Direction)

When the array is sorted and you need to find pairs satisfying a condition, two pointers from both ends can solve it in O(N).

### Template

```python
def two_sum_sorted(a, target):
    a.sort()
    lo, hi = 0, len(a) - 1
    while lo < hi:
        s = a[lo] + a[hi]
        if s == target:
            return (a[lo], a[hi])   # found
        elif s < target:
            lo += 1    # too small, increase left
        else:
            hi -= 1    # too big, decrease right
    return None
```

**Why this works**: For each left pointer position lo, there is at most one valid hi (since array is sorted). As lo increases, the needed `target - a[lo]` decreases, so hi can only move left. Total moves = O(N).

### Example — Count Pairs with Sum < K (Sorted Array)

```python
def count_pairs_sum_less(a, k):
    a.sort()
    lo, hi = 0, len(a) - 1
    count = 0
    while lo < hi:
        if a[lo] + a[hi] < k:
            # All pairs (lo, lo+1), (lo, lo+2), ..., (lo, hi) are valid
            count += hi - lo
            lo += 1
        else:
            hi -= 1
    return count
```

### Example — 3Sum (Find All Triplets Summing to Target)

```python
def three_sum(a, target):
    a.sort()
    result = []
    for i in range(len(a) - 2):
        if i > 0 and a[i] == a[i-1]:
            continue   # skip duplicates
        lo, hi = i+1, len(a)-1
        while lo < hi:
            s = a[i] + a[lo] + a[hi]
            if s == target:
                result.append((a[i], a[lo], a[hi]))
                while lo < hi and a[lo] == a[lo+1]: lo += 1
                while lo < hi and a[hi] == a[hi-1]: hi -= 1
                lo += 1; hi -= 1
            elif s < target:
                lo += 1
            else:
                hi -= 1
    return result
```

---

## 🧠 Chapter 5 — Monotonic Deque for Window Maximum/Minimum

**Problem**: Find the maximum element in every sliding window of size K.

Naive: For each window, find max → O(NK) total.
Better: Maintain a **deque** that stores indices in decreasing order of their values. The front of the deque always holds the index of the current window's maximum.

**Invariant**: The deque only contains indices in the current window `[i-k+1, i]`, and their values are in decreasing order.

```python
from collections import deque

def sliding_window_maximum(a, k):
    dq = deque()   # stores indices, front = max of current window
    result = []
    
    for i in range(len(a)):
        # Remove indices outside the window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove indices from back that are smaller than a[i]
        # (they can never be the max of any future window)
        while dq and a[dq[-1]] <= a[i]:
            dq.pop()
        
        dq.append(i)
        
        # Window is fully formed after first k elements
        if i >= k - 1:
            result.append(a[dq[0]])
    
    return result

# Example: a = [1,3,-1,-3,5,3,6,7], k = 3
# Output:     [3, 3, 5, 5, 6, 7]
```

**Why remove smaller elements from the back?** If `a[j] ≤ a[i]` and `j < i`, then `a[j]` will *never* be the maximum of any future window (because a[i] is in the window longer and is at least as large). So j is useless — remove it.

### Sliding Window Minimum

Same idea, but maintain indices in **increasing** order:
```python
def sliding_window_minimum(a, k):
    dq = deque()
    result = []
    for i in range(len(a)):
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        while dq and a[dq[-1]] >= a[i]:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(a[dq[0]])
    return result
```

---

## 🧠 Chapter 6 — Counting Subarrays via Sliding Window

### "At Most K" → "Exactly K" Trick

**Problem**: Count subarrays with exactly K distinct elements.

Direct approach is hard. But:
`exactly(K) = at_most(K) - at_most(K-1)`

```python
def count_at_most_k_distinct(a, k):
    from collections import defaultdict
    freq = defaultdict(int)
    left = 0
    count = 0
    for right in range(len(a)):
        freq[a[right]] += 1
        while len(freq) > k:
            freq[a[left]] -= 1
            if freq[a[left]] == 0:
                del freq[a[left]]
            left += 1
        count += right - left + 1   # all subarrays ending at right with ≤ k distinct
    return count

def count_exactly_k_distinct(a, k):
    return count_at_most_k_distinct(a, k) - count_at_most_k_distinct(a, k-1)
```

**Why does `right - left + 1` count subarrays?** For a valid window [left, right], all subarrays [left, right], [left+1, right], ..., [right, right] are valid (shrinking a valid window keeps it valid when condition is monotone). There are `right - left + 1` such subarrays.

---

## 🧠 Chapter 7 — Two Pointers for Merging

Merging two sorted arrays is a classic two-pointer application:

```python
def merge_sorted(a, b):
    i, j = 0, 0
    result = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result
```

This is the foundation of Merge Sort.

---

## 🎯 Practice Problems

### Fixed Window (800–1200)
1. **[CF 701C — They Are Everywhere](https://codeforces.com/problemset/problem/701/C)** — minimum window
2. **[CF 602C — Two Factors](https://codeforces.com/problemset/problem/602/C)**

### Variable Window (1200–1600)
3. **[CF 279B — Books](https://codeforces.com/problemset/problem/279/B)** — max books in time
4. **[CF 1208C — Magic Grid](https://codeforces.com/problemset/problem/1208/C)**
5. **[CF 1358D — The Best Vacation](https://codeforces.com/problemset/problem/1358/D)** — sliding window on circular array
6. **[CF 1426C — Increase and Copy](https://codeforces.com/problemset/problem/1426/C)**

### Monotonic Deque (1500–1800)
7. **[CF 1439C — Engineer Artem](https://codeforces.com/problemset/problem/1439/C)**
8. **[CF 1660E — Matrix and Shifts](https://codeforces.com/problemset/problem/1660/E)**
9. **[CF 940E — Cashback](https://codeforces.com/problemset/problem/940/E)** — deque DP

### Hard Two-Pointer (1600–1900)
10. **[CF 1551E — Fixed Points](https://codeforces.com/problemset/problem/1551/E)**
11. **[CF 1706D — Chopping Carrot](https://codeforces.com/problemset/problem/1706/D)**

---

## 📝 Summary

| Pattern | Key Insight | Complexity |
|---------|-------------|------------|
| Fixed window | Both pointers in lockstep | O(N) |
| Variable window (max window) | Shrink from left when violated | O(N) |
| Variable window (count) | `right - left + 1` subarrays per right | O(N) |
| Opposite pointers | Sorted array, eliminate half per step | O(N) |
| Monotonic deque | Track window max/min, pop stale entries | O(N) |
| at_most trick | `exactly(k) = at_most(k) - at_most(k-1)` | O(N) |

**Warning Signals** that sliding window might work:
- "Subarray/substring with sum/count/distinct ≤ K"
- "Longest/shortest window satisfying property"
- "Count subarrays satisfying property"
- Array has **non-negative values** (makes sum monotone as window grows)