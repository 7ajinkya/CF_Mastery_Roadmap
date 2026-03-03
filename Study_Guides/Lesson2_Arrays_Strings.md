# 📘 Lesson 2: Arrays, Strings & Implementation

> **The bread and butter of A/B problems. Master these operations and you'll solve 800-rated problems in minutes.**

---

## 1. Arrays (Lists in Python)

### Creating Arrays
```python
# Empty
a = []

# With values
a = [1, 2, 3, 4, 5]

# N zeros
a = [0] * n

# N copies of a value
a = [float('inf')] * n

# 2D array (grid) — CAREFUL with this!
grid = [[0] * cols for _ in range(rows)]  # ✅ CORRECT
grid = [[0] * cols] * rows                 # ❌ WRONG — all rows share same reference!
```

### Essential Operations
```python
n = len(a)           # length
a.append(x)          # add to end — O(1)
a.pop()              # remove from end — O(1)
a.pop(0)             # remove from front — O(n) SLOW! Use deque
a[i]                 # access element — O(1)
a[-1]                # last element
a[-2]                # second to last
a[::-1]              # reversed copy
a[l:r]               # slice from index l to r-1

# Find min/max
min(a), max(a)       # O(n)
a.index(min(a))      # index of min — O(n)

# Sum
sum(a)               # O(n)

# Count occurrences
a.count(x)           # O(n) — uses loop internally

# Check membership
x in a               # O(n) — use set for O(1)
x in my_set          # O(1) ✅
```

### Iterating with Index
```python
# Method 1: range
for i in range(n):
    print(a[i])

# Method 2: enumerate (preferred!)
for i, val in enumerate(a):
    print(f"Index {i}: {val}")

# Iterate pairs
for i in range(n):
    for j in range(i + 1, n):
        # process pair (a[i], a[j])
        pass
```

---

## 2. Strings

### String Basics
```python
s = "hello"
n = len(s)
s[0]           # 'h' — first char
s[-1]          # 'o' — last char
s[1:4]         # 'ell' — slice

# Strings are IMMUTABLE in Python!
# s[0] = 'H'  # ❌ ERROR
s = 'H' + s[1:]  # ✅ Create new string

# For many modifications, convert to list:
chars = list(s)
chars[0] = 'H'
s = ''.join(chars)
```

### Common String Operations
```python
s.lower()          # "HELLO" → "hello"
s.upper()          # "hello" → "HELLO"
s.count('l')       # count occurrences: 2
s.find('ll')       # first index of substring: 2 (-1 if not found)
s.replace('l', 'r')  # "herro"
s.split()          # split by whitespace → list
s.strip()          # remove leading/trailing whitespace
''.join(list)      # join list of chars/strings

# Check properties
s.isdigit()        # all digits?
s.isalpha()        # all letters?
s.islower()        # all lowercase?

# Character ↔ ASCII
ord('a')           # 97
chr(97)            # 'a'
ord('A')           # 65
# Position in alphabet (0-indexed):
pos = ord(c) - ord('a')  # 'a'→0, 'b'→1, ..., 'z'→25
```

### Pattern: Character Frequency
```python
from collections import Counter

s = "aabbccc"
freq = Counter(s)  # Counter({'c': 3, 'a': 2, 'b': 2})
freq['c']          # 3
freq.most_common() # [('c', 3), ('a', 2), ('b', 2)]

# Manual frequency with array (faster for lowercase letters):
freq = [0] * 26
for c in s:
    freq[ord(c) - ord('a')] += 1
```

---

## 3. Implementation Patterns

### Pattern: Simulation
Many A/B problems just ask you to simulate what's described. Read carefully, implement step by step.

```python
# Example: Process n operations
for _ in range(n):
    op = input().strip()
    if "+" in op:
        counter += 1
    else:
        counter -= 1
```

### Pattern: Find Min/Max with Index
```python
# Find index of first maximum
max_val = max(a)
max_idx = a.index(max_val)

# Or in one pass:
max_val, max_idx = -float('inf'), -1
for i, x in enumerate(a):
    if x > max_val:
        max_val, max_idx = x, i
```

### Pattern: Count Things
```python
from collections import Counter

# Count elements satisfying condition
count = sum(1 for x in a if x > 0)

# Count pairs
count = 0
for i in range(n):
    for j in range(i + 1, n):
        if condition(a[i], a[j]):
            count += 1
```

### Pattern: Build Output String/Array
```python
result = []
for i in range(n):
    result.append(str(compute(i)))
print(' '.join(result))
```

---

## 4. Common Beginner Mistakes

| Mistake | Fix |
|---------|-----|
| `a = [[0]*m]*n` | `a = [[0]*m for _ in range(n)]` |
| Integer overflow | Python handles big ints natively ✅ |
| Off-by-one in range | `range(n)` = 0 to n-1, `range(1, n+1)` = 1 to n |
| Modifying list while iterating | Create a new list instead |
| Using `input()` not `sys.stdin.readline` | Add `input = sys.stdin.readline` |
| Forgetting `.strip()` for string input | Always `.strip()` when reading strings |

---

## 🧪 Practice Problems

1. [Way Too Long Words (71A)](https://codeforces.com/problemset/problem/71/A) — string length
2. [Team (231A)](https://codeforces.com/problemset/problem/231/A) — counting
3. [Bit++ (282A)](https://codeforces.com/problemset/problem/282/A) — simulation
4. [Petya and Strings (112A)](https://codeforces.com/problemset/problem/112/A) — string comparison
5. [String Task (118A)](https://codeforces.com/problemset/problem/118/A) — string processing
6. [Boy or Girl (236A)](https://codeforces.com/problemset/problem/236/A) — sets/frequency
7. [Ultra-Fast Mathematician (61A)](https://codeforces.com/problemset/problem/61/A) — XOR on strings
8. [Beautiful Matrix (263A)](https://codeforces.com/problemset/problem/263/A) — 2D simulation

### 📝 Teach-Back Checkpoint
After solving 4+: Write which string operation you used most, and one trick you learned.
