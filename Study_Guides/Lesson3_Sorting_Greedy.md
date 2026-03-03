# 📘 Lesson 3: Sorting & Greedy Algorithms

> **Sorting is the #1 preprocessing step in CP. Greedy is the #1 algorithm type for A-C problems.**

---

## 1. Sorting in Python

### Basic Sorting
```python
a = [3, 1, 4, 1, 5, 9]

# Sort in place (modifies original)
a.sort()        # [1, 1, 3, 4, 5, 9]

# Sort descending
a.sort(reverse=True)  # [9, 5, 4, 3, 1, 1]

# Create sorted copy (doesn't modify original)
b = sorted(a)

# Sort by custom key
words = ["banana", "pie", "apple"]
words.sort(key=len)          # sort by length: ['pie', 'apple', 'banana']
words.sort(key=lambda x: -len(x))  # longest first
```

### Sort by Multiple Keys
```python
# Sort students by grade (desc), then name (asc)
students = [("Alice", 90), ("Bob", 85), ("Charlie", 90)]
students.sort(key=lambda x: (-x[1], x[0]))
# [('Alice', 90), ('Charlie', 90), ('Bob', 85)]

# Sort pairs by second element
pairs = [(3, 2), (1, 4), (2, 1)]
pairs.sort(key=lambda x: x[1])  # [(2,1), (3,2), (1,4)]
```

### When to Sort?
**Sort when the problem doesn't depend on original order.** Sorting enables:
- Binary search (needs sorted data)
- Two pointers (needs sorted data)
- Greedy (process smallest/largest first)
- Adjacent comparisons (sorted → neighbors are closest)

---

## 2. Greedy Algorithms

### What is Greedy?
Make the **locally optimal choice** at each step, hoping it leads to the global optimum. Greedy works when:
- Optimal substructure: optimal solution contains optimal sub-solutions
- Greedy choice property: local best = global best

### Pattern 1: Take the Best Available
```python
# Problem: Maximum items you can buy with budget B
# Greedy: buy cheapest items first
prices.sort()
count = 0
for p in prices:
    if B >= p:
        B -= p
        count += 1
    else:
        break
```

### Pattern 2: Process Extremes First
```python
# Problem: Pair elements to minimize maximum pair sum
# Greedy: pair smallest with largest
a.sort()
max_sum = 0
for i in range(n // 2):
    max_sum = max(max_sum, a[i] + a[n - 1 - i])
```

### Pattern 3: Activity Selection / Scheduling
```python
# Problem: Maximum non-overlapping intervals
# Greedy: sort by END time, greedily select
intervals.sort(key=lambda x: x[1])  # sort by end time
count = 1
last_end = intervals[0][1]
for start, end in intervals[1:]:
    if start >= last_end:
        count += 1
        last_end = end
```

### Pattern 4: Exchange Argument
**How to PROVE a greedy works**: Assume the optimal solution has elements in a different order. Show swapping two adjacent out-of-order elements improves or maintains the answer.

Example: Sort jobs by `a[i]/b[i]` ratio. Prove: if job i should come before j, then `a[i]*b[j] > a[j]*b[i]`.

---

## 3. Common Greedy Problems

### Problem Type: "Minimum Operations"
```python
# Make all elements equal — minimum operations
# Each op: change one element by 1
# Answer: make everything equal to the MEDIAN
a.sort()
median = a[n // 2]
ops = sum(abs(x - median) for x in a)
```

### Problem Type: "Maximum/Minimum with Constraint"
```python
# Pick k elements to maximize sum
a.sort(reverse=True)
answer = sum(a[:k])

# Pick k elements to minimize max difference
a.sort()
answer = min(a[i + k - 1] - a[i] for i in range(n - k + 1))
```

### Problem Type: "Can We Distribute?"
```python
# Can we split array into groups of size k?
from collections import Counter
freq = Counter(a)
for count in freq.values():
    if count % k != 0:
        print("NO")
        break
else:
    print("YES")
```

---

## 4. Sorting Pitfalls

| Pitfall | Solution |
|---------|----------|
| Sorting when order matters | Don't sort! Use different approach |
| Sorting strings of numbers | `sorted(["10","2","1"])` → `['1','10','2']` (lexicographic!) Use `key=int` |
| Unstable sort assumption | Python's sort IS stable (preserves relative order of equal elements) ✅ |
| Sorting 10⁶ elements | O(n log n) is fine — `sort()` handles it easily |

---

## 🧪 Practice Problems

1. [Twins (160A)](https://codeforces.com/problemset/problem/160/A) — sort + greedy
2. [Dragons (230A)](https://codeforces.com/problemset/problem/230/A) — sort by strength
3. [Sereja and Dima (381A)](https://codeforces.com/problemset/problem/381/A) — greedy from both ends
4. [Helpful Maths (339A)](https://codeforces.com/problemset/problem/339/A) — sort characters
5. [Gravity Flip (405A)](https://codeforces.com/problemset/problem/405/A) — sort simulation
6. [Arrival of the General (144A)](https://codeforces.com/problemset/problem/144/A) — find min/max positions
7. [Minimum Difficulty (496A)](https://codeforces.com/problemset/problem/496/A) — adjacent differences
8. [Sort the Array (451B)](https://codeforces.com/problemset/problem/451/B) — find unsorted segment

### 📝 Teach-Back Checkpoint
Explain in 3 sentences: When should you sort? Why does sorting help with greedy? Give one example.
