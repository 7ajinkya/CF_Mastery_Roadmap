# 📘 Lesson 6: Binary Search

> **Binary search isn't just for finding elements. It's a FRAMEWORK for solving optimization problems.**

---

## 1. Binary Search on Arrays

### Classic Binary Search
```python
from bisect import bisect_left, bisect_right

a = [1, 3, 5, 7, 9, 11]

# Find index of x (or where it would be inserted)
idx = bisect_left(a, 7)   # 3 (first position where 7 can go)
idx = bisect_right(a, 7)  # 4 (past the last 7)

# Check if x exists
def binary_search(a, x):
    idx = bisect_left(a, x)
    return idx < len(a) and a[idx] == x

# Count elements < x
count_less = bisect_left(a, x)

# Count elements <= x
count_leq = bisect_right(a, x)

# Count elements in range [lo, hi]
count_range = bisect_right(a, hi) - bisect_left(a, lo)
```

### Manual Implementation (Know This!)
```python
def binary_search(a, target):
    lo, hi = 0, len(a) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if a[mid] == target:
            return mid
        elif a[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1  # not found

# Find FIRST element >= target (lower_bound)
def lower_bound(a, target):
    lo, hi = 0, len(a)
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

---

## 2. Binary Search on Answer ⭐

### The Big Idea
> If you can CHECK "is answer ≤ X?" efficiently, and the check is monotonic, you can BINARY SEARCH for X.

```python
def can_achieve(x):
    # Return True if answer x is achievable
    # This is problem-specific
    pass

lo, hi = 0, 10**18  # search range
while lo < hi:
    mid = (lo + hi) // 2
    if can_achieve(mid):
        hi = mid      # mid works, try smaller
    else:
        lo = mid + 1  # mid doesn't work, need bigger
# lo = answer
```

### Example: Hamburgers (371C)
"Can you make X hamburgers with your ingredients?"
- Binary search on X
- For each X, check: do you have enough money to buy missing ingredients?

```python
def can_make(x, recipe, have, store_price, budget):
    cost = 0
    for i in range(3):
        need = recipe[i] * x - have[i]
        if need > 0:
            cost += need * store_price[i]
    return cost <= budget

lo, hi = 0, 10**13
while lo < hi:
    mid = (lo + hi + 1) // 2  # +1 because we want upper bound
    if can_make(mid, recipe, have, price, budget):
        lo = mid
    else:
        hi = mid - 1
```

### When to Use Binary Search on Answer
- "Minimize the maximum" → binary search on maximum, check if achievable
- "Maximize the minimum" → binary search on minimum
- "What's the minimum X such that..." → binary search

---

## 3. Common Patterns

### Minimize Maximum / Maximize Minimum
```python
# "Maximize the minimum distance between cows"
# Binary search on minimum distance d
# Check: can we place all cows with min distance d?

def can_place(positions, cows, min_dist):
    count = 1
    last = positions[0]
    for p in positions[1:]:
        if p - last >= min_dist:
            count += 1
            last = p
    return count >= cows

positions.sort()
lo, hi = 1, positions[-1] - positions[0]
while lo < hi:
    mid = (lo + hi + 1) // 2
    if can_place(positions, cows, mid):
        lo = mid
    else:
        hi = mid - 1
```

---

## 🧪 Practice Problems

1. [Interesting Drink (706B)](https://codeforces.com/problemset/problem/706/B) — bisect
2. [Worms (474B)](https://codeforces.com/problemset/problem/474/B) — prefix sum + bisect
3. [Hamburgers (371C)](https://codeforces.com/problemset/problem/371/C) — BS on answer
4. [Poisoned Dagger (1474B)](https://codeforces.com/problemset/problem/1474/B) — BS on answer
5. [Magic Ship (1117C)](https://codeforces.com/problemset/problem/1117/C) — BS on time
6. [Binary String (1680C)](https://codeforces.com/problemset/problem/1680/C) — BS + two pointers

### 📝 Teach-Back Checkpoint
Explain: What does "binary search on answer" mean? Give an example scenario where you'd use it.
