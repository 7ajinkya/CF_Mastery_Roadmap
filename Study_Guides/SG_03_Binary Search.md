# 📘 Study Guide 03 — Binary Search

> **Difficulty Range**: Beginner → Expert (CF 800 → 2200)
> **Core Idea**: Any time you can define a YES/NO predicate that is monotone (all NO then all YES, or vice versa), you can binary search for the boundary in O(log N).

---

## 🧠 Chapter 1 — Classic Binary Search on a Sorted Array

### The Library Analogy

Imagine a library with 1 million books sorted alphabetically. You want to find "Moby Dick". 
- **Naive**: Check every book from the start → 1,000,000 checks worst case.
- **Smart**: Open the book in the middle. If it's before "Moby Dick" alphabetically, the answer is in the right half. Otherwise left half. Repeat.
- **Result**: After ~20 checks (log₂(1,000,000) ≈ 20), you find it.

This halving is the essence of binary search. Each step eliminates **half** the remaining candidates.

### The Standard Template

```python
# Search for target in sorted array a
# Returns index if found, else -1
def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            return mid
        elif a[mid] < target:
            lo = mid + 1   # target is in right half
        else:
            hi = mid - 1   # target is in left half
    return -1
```

**Critical**: Never write `mid = (lo + hi) // 2` in languages with integer overflow. In Python, integers are arbitrary precision, so this is fine. In C++, use `mid = lo + (hi - lo) / 2`.

### Finding the First/Last Occurrence

When there are duplicates, finding the *first* or *last* occurrence requires care:

```python
def first_occurrence(a, target):
    lo, hi = 0, len(a) - 1
    result = -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            result = mid     # record, but keep searching left
            hi = mid - 1
        elif a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result

def last_occurrence(a, target):
    lo, hi = 0, len(a) - 1
    result = -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            result = mid     # record, but keep searching right
            lo = mid + 1
        elif a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# Python built-in (uses same logic):
import bisect
bisect.bisect_left(a, target)   # first index where target could be inserted (= first occurrence if exists)
bisect.bisect_right(a, target)  # last index + 1 where target could be inserted
```

**Count of target in sorted array**:
```python
count = bisect.bisect_right(a, target) - bisect.bisect_left(a, target)
```

---

## 🧠 Chapter 2 — Binary Search on the Answer (The Real Power)

This is the most important pattern in competitive programming. Instead of searching in a given array, we **search over the space of possible answers**.

### The Key Insight

Many optimization problems have this structure:
- "Find the minimum X such that [some condition about X is true]"
- Or: "Find the maximum X such that [some condition is true]"

If the condition is **monotone** — meaning if X works, then X+1 also works (or vice versa) — then we can binary search on X!

**The Mental Test**: Ask yourself "If answer X is feasible, is X+1 also feasible?" (or X-1 also infeasible?). If yes → binary search on answer.

### Template for Binary Search on Answer

```python
def feasible(x):
    # Returns True if x is a valid/achievable value
    # This function should be O(N) or O(N log N) — we'll call it O(log(RANGE)) times
    ...

# Find MINIMUM x where feasible(x) is True
lo, hi = MINIMUM_POSSIBLE_ANSWER, MAXIMUM_POSSIBLE_ANSWER
while lo < hi:
    mid = (lo + hi) // 2
    if feasible(mid):
        hi = mid       # mid works, maybe smaller works too
    else:
        lo = mid + 1   # mid doesn't work, need bigger
# Answer is lo (= hi)

# Find MAXIMUM x where feasible(x) is True
lo, hi = MINIMUM_POSSIBLE_ANSWER, MAXIMUM_POSSIBLE_ANSWER
while lo < hi:
    mid = (lo + hi + 1) // 2   # +1 avoids infinite loop when lo = hi - 1
    if feasible(mid):
        lo = mid       # mid works, maybe bigger works too
    else:
        hi = mid - 1   # mid doesn't work, need smaller
# Answer is lo (= hi)
```

**Why `(lo + hi + 1) // 2` for max?**: When `lo = 3, hi = 4`, `mid` must be 4 (upper half) to avoid infinite loop. If mid were 3 and `feasible(3)` is true, we'd set `lo = 3` again — stuck forever. Adding 1 ensures mid rounds up.

### Example 1 — Koko Eating Bananas (Classic Intro)

**Problem**: N piles of bananas. Koko eats at rate K bananas/hour. She has H hours. What is the minimum K so she finishes all piles in time?

```python
import math

def can_finish(piles, K, H):
    # Total hours needed at rate K
    hours = sum(math.ceil(pile / K) for pile in piles)
    return hours <= H

def min_eating_speed(piles, H):
    lo, hi = 1, max(piles)   # minimum speed 1, maximum speed = largest pile
    while lo < hi:
        mid = (lo + hi) // 2
        if can_finish(piles, mid, H):
            hi = mid      # mid works, try smaller
        else:
            lo = mid + 1  # too slow, increase
    return lo
```

**Why does binary search work?** If K works, K+1 also works (eating faster always helps). So the answer space looks like: `[NO, NO, NO, YES, YES, YES, YES]`. We want the first YES.

### Example 2 — Capacity to Ship Packages

**Problem**: N packages with weights. Ship them in D days in order (can't reorder). Minimize the ship capacity (max weight per day allowed).

```python
def can_ship(weights, capacity, D):
    days = 1
    current_load = 0
    for w in weights:
        if current_load + w > capacity:
            days += 1
            current_load = 0
        current_load += w
    return days <= D

def min_capacity(weights, D):
    lo = max(weights)           # must fit the heaviest package
    hi = sum(weights)           # worst case: ship everything in 1 day
    while lo < hi:
        mid = (lo + hi) // 2
        if can_ship(weights, mid, D):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

### Example 3 — Aggressive Cows (CF 2B-style classic)

**Problem**: N positions on a number line. Place K cows. Maximize the minimum distance between any two cows.

```python
def feasible(positions, K, min_dist):
    # Can we place K cows with minimum gap = min_dist?
    positions.sort()
    count = 1
    last = positions[0]
    for i in range(1, len(positions)):
        if positions[i] - last >= min_dist:
            count += 1
            last = positions[i]
    return count >= K

def max_min_distance(positions, K):
    positions.sort()
    lo, hi = 1, positions[-1] - positions[0]
    while lo < hi:
        mid = (lo + hi + 1) // 2   # searching for maximum
        if feasible(positions, K, mid):
            lo = mid
        else:
            hi = mid - 1
    return lo
```

**Why maximize → `(lo+hi+1)//2`**: We want the *largest* min_dist that is feasible, so the pattern is FFFTTT... and we want last T.

---

## 🧠 Chapter 3 — Binary Search on Floating Point

When the answer is a real number (not integer), we use a fixed number of iterations instead of a convergence check:

```python
def binary_search_float(lo, hi, feasible, iterations=100):
    for _ in range(iterations):
        mid = (lo + hi) / 2
        if feasible(mid):
            hi = mid
        else:
            lo = mid
    return lo   # or (lo + hi) / 2 for midpoint
```

100 iterations gives precision of `(hi - lo) / 2^100` ≈ 10^{-30}, more than enough.

**Example**: Find the square root of N with precision 10^{-9}:
```python
def sqrt_float(N):
    lo, hi = 0, N
    for _ in range(100):
        mid = (lo + hi) / 2
        if mid * mid <= N:
            lo = mid
        else:
            hi = mid
    return lo
```

---

## 🧠 Chapter 4 — Binary Search + Greedy / DP

Binary search on the answer often pairs with a greedy or DP check function.

### Example: Minimize Max of Subarrays (Divide Array into K Parts)

```python
# Minimize the maximum subarray sum when dividing a[] into at most K parts
def can_divide(a, K, max_sum):
    parts = 1
    current = 0
    for x in a:
        if x > max_sum:
            return False   # single element exceeds limit
        if current + x > max_sum:
            parts += 1
            current = 0
        current += x
    return parts <= K

def minimize_max_subarray_sum(a, K):
    lo, hi = max(a), sum(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_divide(a, K, mid):
            hi = mid
        else:
            lo = mid + 1
    return lo
```

---

## 🧠 Chapter 5 — Binary Search on Data Structures

### Binary Search on a Sorted List with Insertions — `SortedList`

In Python, `sortedcontainers.SortedList` maintains sorted order on insertions and supports O(log N) search:

```python
from sortedcontainers import SortedList
sl = SortedList()
sl.add(5)
sl.add(3)
sl.add(7)
sl.bisect_left(4)   # = 1 (index where 4 would go)
sl.bisect_right(5)  # = 2
```

### Lower/Upper Bound Patterns

```python
import bisect

a = [1, 3, 3, 5, 7]

# Numbers strictly less than x:
bisect.bisect_left(a, x)

# Numbers ≤ x:
bisect.bisect_right(a, x)

# Numbers ≥ x (first index with value ≥ x):
bisect.bisect_left(a, x)

# Numbers > x (first index with value > x):
bisect.bisect_right(a, x)
```

---

## 🧠 Chapter 6 — Ternary Search (Unimodal Functions)

Binary search works on monotone functions. **Ternary search** works on **unimodal** functions — those that first increase then decrease (or vice versa). Used to find the maximum (or minimum) of such functions.

```python
def ternary_search(lo, hi, f, iterations=200):
    for _ in range(iterations):
        m1 = lo + (hi - lo) / 3
        m2 = hi - (hi - lo) / 3
        if f(m1) < f(m2):
            lo = m1
        else:
            hi = m2
    return (lo + hi) / 2
```

**When**: Problems involving "maximize/minimize a function that increases then decreases" — e.g., find the optimal point in a parabola.

---

## 🎯 Practice Problems

### Basic (800–1100)
1. **[CF 1282B — Modular Stability](https://codeforces.com/problemset/problem/1282/B)**
2. **[CF 460B — Little Dima and Equation](https://codeforces.com/problemset/problem/460/B)**

### Binary Search on Answer (1200–1600)
3. **[CF 1201C — Maximum Split](https://codeforces.com/problemset/problem/1201/C)**
4. **[CF 1538C — Number of Great Partitions](https://codeforces.com/problemset/problem/1538/C)**
5. **[CF 702C — Cellular Network](https://codeforces.com/problemset/problem/702/C)**
6. **[CF 846C — Tanya and Postcard](https://codeforces.com/problemset/problem/846/C)**
7. **[CF 1551C — Perform Easily](https://codeforces.com/problemset/problem/1551/C)**

### Classic "Minimize Max" / "Maximize Min" (1500–1900)
8. **[CF 1132E — Knapsack](https://codeforces.com/problemset/problem/1132/E)**
9. **[CF 1715D — 2+ doors](https://codeforces.com/problemset/problem/1715/D)**
10. **[CF 1648C — Tyler and Strings](https://codeforces.com/problemset/problem/1648/C)**
11. **[CF 1726D — Edge Split](https://codeforces.com/problemset/problem/1726/D)**

### Hard (1900–2200)
12. **[CF 1601C — Optimal Insertion](https://codeforces.com/problemset/problem/1601/C)** — binary search + divide & conquer
13. **[CF 1783D — Different Arrays](https://codeforces.com/problemset/problem/1783/D)**

---

## 📝 Summary: Choosing the Right Template

| Scenario | Template |
|----------|----------|
| Find target in sorted array | Classic with lo ≤ hi |
| Find MINIMUM x where condition is true | `hi = mid` when true |
| Find MAXIMUM x where condition is true | `lo = mid` + `mid = (lo+hi+1)//2` |
| Real-valued answer | Fixed 100 iterations |
| Unimodal function | Ternary search |

**The 3 Questions to Ask Before Binary Searching**:
1. What am I searching over? (the domain)
2. What is my predicate? (the YES/NO function)
3. Is the predicate monotone? (all NO then YES, or all YES then NO)

If all 3 are clear, the solution writes itself.