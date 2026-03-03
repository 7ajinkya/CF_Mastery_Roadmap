# 📘 Lesson 7: Python Data Structures for CP

> **The right data structure makes the difference between TLE and AC.**

---

## 1. Lists (Array equivalent)
```python
a = [1, 2, 3]
a.append(4)       # O(1) — add to end
a.pop()           # O(1) — remove from end
a.pop(0)          # O(n) — SLOW! Don't use for queue
a.insert(0, x)    # O(n) — SLOW!
a[i]              # O(1) — random access
```
**Use for**: everything basic, when you need indexed access.

## 2. Deque (Double-ended Queue)
```python
from collections import deque
d = deque([1, 2, 3])
d.append(4)       # O(1) — add to right
d.appendleft(0)   # O(1) — add to left
d.pop()           # O(1) — remove from right
d.popleft()       # O(1) — remove from left
```
**Use for**: BFS queue, sliding window, when you need fast add/remove from both ends.

## 3. Set
```python
s = set()
s.add(5)          # O(1)
s.remove(5)       # O(1), raises error if not found
s.discard(5)      # O(1), no error if not found
5 in s            # O(1) — THIS is why sets are important
len(s)            # O(1)
```
**Use for**: fast membership check, removing duplicates, distinct elements.

## 4. Dictionary (Hash Map)
```python
from collections import defaultdict, Counter

# Regular dict
d = {}
d[key] = value
d.get(key, default)  # returns default if key missing

# defaultdict — never raises KeyError
freq = defaultdict(int)  # default value = 0
for x in a:
    freq[x] += 1

# Counter — instant frequency count
freq = Counter(a)
freq.most_common(3)  # top 3 most common

# OrderedDict — preserves insertion order (Python 3.7+ dicts do this anyway)
```
**Use for**: frequency counting, two-sum type problems, grouping.

## 5. Sorted Containers (for CF!)
Python's standard library lacks a sorted set/map like C++'s `std::set`. Install `sortedcontainers`:
```python
from sortedcontainers import SortedList
sl = SortedList([3, 1, 4, 1, 5])
sl.add(2)                    # O(log n)
sl.remove(1)                 # O(log n), removes one occurrence
sl.bisect_left(3)            # O(log n), index of first >= 3
sl[0], sl[-1]                # min, max in O(log n)
```
> **Note**: `sortedcontainers` is available on Codeforces for Python/PyPy.

**Use for**: when you need sorted order + fast insert/delete (like C++ set/multiset).

## 6. Heap (Priority Queue)
```python
import heapq
h = []
heapq.heappush(h, 5)         # O(log n)
heapq.heappush(h, 3)
smallest = heapq.heappop(h)  # O(log n), returns 3

# Python only has MIN heap. For MAX heap, negate values:
heapq.heappush(h, -val)
max_val = -heapq.heappop(h)

# Heapify existing list
a = [5, 3, 8, 1]
heapq.heapify(a)  # O(n), converts to min-heap
```
**Use for**: get min/max efficiently, Dijkstra, scheduling problems, merge k sorted lists.

## 7. Stack
```python
stack = []
stack.append(x)   # push — O(1)
stack.pop()        # pop — O(1)
stack[-1]          # peek — O(1)
len(stack) == 0    # empty check
```
**Use for**: balanced brackets, monotonic stack, undo operations, DFS.

---

## Quick Reference: Which Data Structure?

| Need | Data Structure | Operation |
|------|---------------|-----------|
| Fast lookup "is x present?" | `set` | O(1) |
| Count occurrences | `Counter` / `defaultdict(int)` | O(1) |
| Sorted order + insert/delete | `SortedList` | O(log n) |
| Min/max element | `heapq` | O(log n) |
| FIFO queue (BFS) | `deque` | O(1) |
| LIFO stack (DFS) | `list` (append/pop) | O(1) |
| Range sum queries | Prefix sum array | O(1) query |
| Key-value mapping | `dict` | O(1) |

---

## 🧪 Practice Problems

1. [Two Buttons (520B)](https://codeforces.com/problemset/problem/520/B) — BFS with deque
2. [Boy or Girl (236A)](https://codeforces.com/problemset/problem/236/A) — set
3. [Pangram (520A)](https://codeforces.com/problemset/problem/520/A) — set
4. [Cards with Numbers (1816A)](https://codeforces.com/problemset/problem/1816/A) — Counter
5. [Sereja and Dima (381A)](https://codeforces.com/problemset/problem/381/A) — deque

### 📝 Teach-Back Checkpoint
Explain: When would you use a set vs a dictionary? When would you use a heap vs a sorted list?
