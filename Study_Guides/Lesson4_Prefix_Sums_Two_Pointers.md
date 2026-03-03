# 📘 Lesson 4: Prefix Sums & Two Pointers

> **These two techniques solve 50%+ of rating 1000-1200 problems. Learn them well.**

---

## 1. Prefix Sums

### The Core Idea
"I need the sum of a subarray [l, r] FAST" → Precompute prefix sums, answer in O(1).

```python
# Build prefix sum array
a = [3, 1, 4, 1, 5, 9]
n = len(a)

# Method 1: Manual
pre = [0] * (n + 1)  # pre[0] = 0, pre[i] = sum of a[0..i-1]
for i in range(n):
    pre[i + 1] = pre[i] + a[i]
# pre = [0, 3, 4, 8, 9, 14, 23]

# Method 2: Using itertools (cleaner)
from itertools import accumulate
pre = [0] + list(accumulate(a))

# Query: sum of a[l..r] (0-indexed)
def range_sum(l, r):
    return pre[r + 1] - pre[l]

range_sum(1, 3)  # a[1]+a[2]+a[3] = 1+4+1 = 6
```

### When to Use Prefix Sums
- "Sum/count in a range" → prefix sum
- "Is subarray sum = target?" → prefix sum + hash map
- Multiple range queries on static array
- "Add v to range [l,r]" → difference array

### Difference Array (Reverse of Prefix Sum)
For multiple "add v to range [l,r]" operations:
```python
# Add v to range [l, r] in O(1) per operation
d = [0] * (n + 1)
d[l] += v
d[r + 1] -= v

# After all operations, prefix sum of d = actual values
from itertools import accumulate
result = list(accumulate(d[:n]))
```

### Subarray Sum = K Pattern
```python
# Count subarrays with sum exactly k
from collections import defaultdict
def count_subarrays_with_sum_k(a, k):
    prefix_count = defaultdict(int)
    prefix_count[0] = 1  # empty prefix has sum 0
    current_sum = 0
    count = 0
    for x in a:
        current_sum += x
        # If current_sum - k existed as a prefix, we found a subarray
        count += prefix_count[current_sum - k]
        prefix_count[current_sum] += 1
    return count
```

---

## 2. Two Pointers

### Pattern 1: Opposite Direction (Sorted Array)
Two pointers start at opposite ends and move inward.
```python
# Find pair with sum = target in sorted array
a.sort()
left, right = 0, n - 1
while left < right:
    s = a[left] + a[right]
    if s == target:
        print("YES")
        break
    elif s < target:
        left += 1
    else:
        right -= 1
```

### Pattern 2: Same Direction (Sliding Window)
Both pointers move right. Left chases right.
```python
# Longest subarray with sum ≤ S
left = 0
window_sum = 0
best = 0
for right in range(n):
    window_sum += a[right]
    while window_sum > S:
        window_sum -= a[left]
        left += 1
    best = max(best, right - left + 1)
```

### Pattern 3: Fixed-Size Window
```python
# Maximum sum of any k consecutive elements
window = sum(a[:k])
best = window
for i in range(k, n):
    window += a[i] - a[i - k]
    best = max(best, window)
```

### When to Use Two Pointers
- Array is sorted (or can be sorted)
- Need to find pairs/subarrays with some sum property
- Window has a **monotonic** property: if window [l,r] is valid and we shrink it, it stays valid

---

## 🧪 Practice Problems

1. [Little Girl and Maximum Sum (276C)](https://codeforces.com/problemset/problem/276/C) — difference array
2. [Good Subarrays (1398C)](https://codeforces.com/problemset/problem/1398/C) — prefix sums + counting
3. [Number of Ways (466C)](https://codeforces.com/problemset/problem/466/C) — prefix sums
4. [Books (279B)](https://codeforces.com/problemset/problem/279/B) — two pointers
5. [Eating Candies (1700A)](https://codeforces.com/problemset/problem/1700/A) — opposite pointers
6. [Kefa and First Steps (580A)](https://codeforces.com/problemset/problem/580/A) — longest increasing subarray

### 📝 Teach-Back Checkpoint
Explain: What's the difference between prefix sums and difference arrays? When would you use each?
