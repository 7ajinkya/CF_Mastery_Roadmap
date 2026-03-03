# 📘 Lesson 0: Python Fast I/O & CP Setup for Codeforces

> **Read this FIRST. Your PyPy submissions will TLE without proper I/O.**

---

## The Problem with Default Python I/O

`input()` and `print()` are SLOW. On Codeforces, this alone can cause TLE on problems with 10⁵+ inputs.

## The Fix: sys.stdin for Fast Input

```python
import sys
input = sys.stdin.readline  # This ONE line makes input 10x faster

# Now use input() as normal, but strip the trailing newline for strings
n = int(input())
a = list(map(int, input().split()))
s = input().strip()  # .strip() removes the trailing \n
```

## Even Faster: Read ALL Input at Once

For very large inputs (10⁶+), read everything at once:

```python
import sys
data = sys.stdin.buffer.read().split()
idx = 0
def rd():
    global idx
    idx += 1
    return data[idx - 1]

n = int(rd())
a = [int(rd()) for _ in range(n)]
```

## Fast Output

`print()` is slow when called many times. Use `sys.stdout.write` or collect output:

```python
import sys
out = []
for i in range(n):
    out.append(str(result[i]))
sys.stdout.write('\n'.join(out) + '\n')

# Or even simpler:
print('\n'.join(map(str, results)))  # ONE print call instead of n
```

## Complete CP Template

```python
import sys
from collections import defaultdict, deque, Counter
from math import gcd, sqrt, ceil, floor, log2
from itertools import accumulate, permutations, combinations
from bisect import bisect_left, bisect_right
from functools import lru_cache

input = sys.stdin.readline

def solve():
    n = int(input())
    a = list(map(int, input().split()))
    
    # Your solution here
    
    print(answer)

t = int(input())
for _ in range(t):
    solve()
```

## Recursion Limit

Python's default recursion limit is 1000. For DFS/recursive DP, increase it:

```python
import sys
sys.setrecursionlimit(300000)  # Set high enough for your problem
```

> ⚠️ **Warning**: Deep recursion in Python can cause stack overflow even with high limits. For very deep recursion (n > 10⁵), convert to iterative using a stack.

## PyPy vs CPython

You're already using PyPy — good! PyPy is 3-10x faster. Tips:
- PyPy handles loops well (almost C++ speed)
- Avoid `lru_cache` in PyPy (slower than CPython) — use manual memoization with dicts
- PyPy's `sys.stdin.readline` is very fast
- Avoid heavy OOP in PyPy — plain functions are faster

## Common Time Limits on CF

| Language | Typical TL | Your Target |
|----------|-----------|-------------|
| C++ | 1-2 sec | — |
| PyPy | 2-3 sec | Use this |
| Python 3 | 3-5 sec | Backup only |

## Quick Reference: Reading Different Input Formats

```python
# Single integer
n = int(input())

# Two integers on same line
n, m = map(int, input().split())

# Array of integers
a = list(map(int, input().split()))

# String
s = input().strip()

# n lines of pairs
edges = [tuple(map(int, input().split())) for _ in range(n)]

# Grid/matrix
grid = [input().strip() for _ in range(n)]

# Multiple test cases
t = int(input())
for _ in range(t):
    solve()
```
