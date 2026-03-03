# 📘 Study Guide 05 — Bit Manipulation

> **Difficulty Range**: Beginner → Expert (CF 800 → 2100)
> **Core Idea**: Integers are stored as binary. Bit operations execute in O(1) at hardware level — often 100x faster than arithmetic, and enable elegant combinatorial reasoning.

---

## 🧠 Chapter 1 — Binary Representation & Basics

### How Integers Are Stored

Every integer is stored in binary. For example:
```
13 = 1101 in binary
   = 1×2³ + 1×2² + 0×2¹ + 1×2⁰
   = 8 + 4 + 0 + 1 = 13
```

In Python, integers have arbitrary precision. In C++, `int` is 32 bits, `long long` is 64 bits.

**Quick conversions in Python**:
```python
bin(13)     # '0b1101'
int('1101', 2)   # 13
format(13, '08b')  # '00001101' (8-digit binary string)
```

### The Six Core Bit Operations

| Operation | Symbol | Example (a=5=101, b=3=011) | Result |
|-----------|--------|---------------------------|--------|
| AND | `a & b` | 101 & 011 | 001 = 1 |
| OR | `a \| b` | 101 \| 011 | 111 = 7 |
| XOR | `a ^ b` | 101 ^ 011 | 110 = 6 |
| NOT | `~a` | ~101 | ...11111010 (=-6 in 2's complement) |
| Left shift | `a << k` | 101 << 1 | 1010 = 10 |
| Right shift | `a >> k` | 101 >> 1 | 10 = 2 |

**Mental Models**:
- AND = "both must be 1" → masking (zeroing out bits)
- OR = "at least one is 1" → setting bits
- XOR = "exactly one is 1" → toggling bits, canceling pairs
- Left shift by k = multiply by 2^k
- Right shift by k = floor divide by 2^k

---

## 🧠 Chapter 2 — Essential Bit Tricks

### Trick 1: Check if bit k is set

```python
def is_bit_set(n, k):
    return (n >> k) & 1 == 1

# Alternative:
return bool(n & (1 << k))
```

**Why?** `1 << k` creates a mask with only bit k set. ANDing with n keeps only bit k — if it's 1, n has bit k set.

### Trick 2: Set bit k

```python
def set_bit(n, k):
    return n | (1 << k)
```

OR with mask: forces bit k to 1 regardless of its current value.

### Trick 3: Clear bit k

```python
def clear_bit(n, k):
    return n & ~(1 << k)
```

`~(1 << k)` = all bits set EXCEPT bit k. AND forces bit k to 0.

### Trick 4: Toggle bit k

```python
def toggle_bit(n, k):
    return n ^ (1 << k)
```

XOR with 1 flips the bit.

### Trick 5: Check if number is a power of 2

```python
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0
```

**Why?** Powers of 2 have exactly one bit set: `8 = 1000`. `8 - 1 = 0111`. AND = `0000`. If any other bit were set, subtracting 1 wouldn't clear the highest bit.

### Trick 6: Get lowest set bit (LSB)

```python
def lowest_set_bit(n):
    return n & (-n)

# 12 = 1100, -12 = ...0100 (2's complement)
# 12 & -12 = 0100 = 4 (the lowest set bit)
```

This is the cornerstone of Fenwick Trees.

### Trick 7: Remove lowest set bit

```python
def remove_lsb(n):
    return n & (n - 1)

# Used to iterate over set bits:
def count_set_bits(n):
    count = 0
    while n:
        n &= n - 1    # removes lowest set bit each iteration
        count += 1
    return count
```

### Trick 8: Count set bits (popcount)

```python
bin(n).count('1')   # Pythonic, O(log n)

# C++ equivalent:
# __builtin_popcount(n)
```

### Trick 9: Find highest set bit

```python
import math

def highest_set_bit_pos(n):
    return n.bit_length() - 1   # Python built-in

# 13 = 1101 → bit_length = 4, highest bit at position 3
```

### Trick 10: XOR cancels duplicates

`a ^ a = 0` and `a ^ 0 = a`. So XOR of all elements in a multiset cancels pairs:

```python
def find_single(nums):   # All numbers appear twice except one
    result = 0
    for x in nums:
        result ^= x
    return result
```

---

## 🧠 Chapter 3 — Subsets via Bitmasks

### Representing Sets as Integers

For a set of N elements (N ≤ 20), we can represent any subset as an integer from 0 to 2^N - 1. Bit k is 1 if element k is in the subset.

```python
# Set {0, 2, 3} = bit 0, bit 2, bit 3 set = binary 1101 = 13

n = 4   # 4 elements

# Iterate over ALL 2^n subsets:
for mask in range(1 << n):
    # mask is a subset
    elements = [i for i in range(n) if mask & (1 << i)]
    print(mask, elements)

# Iterate over all subsets of a given mask:
sub = mask
while sub:
    process(sub)
    sub = (sub - 1) & mask   # jump to next subset!
# Time: O(3^n) total across all masks (each element is in/out/absent from sub)
```

**Why `(sub - 1) & mask` gives next subset?** Subtracting 1 flips the lowest set bit of sub and sets all lower bits. ANDing with mask keeps only bits that were in mask. This efficiently enumerates all 2^k subsets of a k-bit mask.

### Subset Enumeration — Example

```python
# Print all subsets of {A, B, C, D}
elements = ['A', 'B', 'C', 'D']
n = 4
for mask in range(1 << n):
    subset = [elements[i] for i in range(n) if mask & (1 << i)]
    print(subset)
# Prints 2^4 = 16 subsets
```

---

## 🧠 Chapter 4 — XOR Properties and Tricks

### XOR is its own inverse

`a ^ b ^ b = a` — XOR-ing twice cancels out.

### XOR Sum Trick (Find Missing Number)

```python
# Array has numbers 1..n with one missing. Find it.
def find_missing(a, n):
    xor_all = 0
    for i in range(1, n+1):
        xor_all ^= i
    for x in a:
        xor_all ^= x
    return xor_all  # missing number
```

### XOR for Swap (No Temp Variable)

```python
a ^= b
b ^= a
a ^= b
# Swaps a and b without a temporary variable (but only for integers!)
```

### XOR Prefix Sum

`prefix_xor[i]` = XOR of `a[0..i-1]`. Then XOR of `a[l..r]` = `prefix_xor[r+1] ^ prefix_xor[l]`.

```python
def xor_range(a, l, r):
    prefix = [0]
    for x in a:
        prefix.append(prefix[-1] ^ x)
    return prefix[r+1] ^ prefix[l]
```

---

## 🧠 Chapter 5 — Bit DP Preview (Bitmask States)

One of the most powerful applications is using bitmasks as **DP states** to represent "which elements have been used". This is covered deeply in the Bitmask DP guide, but here's the core idea:

```python
# TSP (Travelling Salesman Problem) idea:
# dp[mask][i] = min cost to visit exactly the cities in `mask`, ending at city i

n = 5
INF = float('inf')
dp = [[INF]*n for _ in range(1 << n)]
dp[1 << 0][0] = 0   # Start at city 0, visited = {0}

for mask in range(1 << n):
    for u in range(n):
        if dp[mask][u] == INF: continue
        if not (mask >> u & 1): continue   # u not in mask, skip
        for v in range(n):
            if mask >> v & 1: continue     # v already visited
            new_mask = mask | (1 << v)
            dp[new_mask][v] = min(dp[new_mask][v], dp[mask][u] + dist[u][v])
```

---

## 🧠 Chapter 6 — Bitwise Tricks for Competitive Programming

### Fast Modulo by Powers of 2

`n % (2^k)` = `n & ((1 << k) - 1)`

```python
n % 16 == n & 15   # 16 = 2^4, 15 = 1111 in binary
n % 32 == n & 31
```

### Check if n is divisible by 2

`n % 2 == 0` ↔ `n & 1 == 0`

### Integer Log2 (floor)

```python
def floor_log2(n):
    return n.bit_length() - 1
# floor_log2(13) = 3 (since 2^3 = 8 ≤ 13 < 16 = 2^4)
```

### Next Power of 2 ≥ n

```python
def next_power_of_2(n):
    if n == 0: return 1
    return 1 << (n - 1).bit_length()
```

### Parity (even/odd number of set bits)

```python
def parity(n):
    n ^= n >> 16
    n ^= n >> 8
    n ^= n >> 4
    n ^= n >> 2
    n ^= n >> 1
    return n & 1
```

### GrayCode — Single Bit Change Sequences

```python
def gray_code(n):
    return n ^ (n >> 1)
# Gray codes differ by exactly 1 bit between consecutive values
# Used in digital circuits to avoid spurious transitions
```

---

## 🧠 Chapter 7 — Bit Manipulation for Subset DP

### Sum over Subsets (SOS DP)

**Problem**: For every mask, compute the sum (or OR, AND, count) over all submasks.

Naive: for each mask, enumerate all submasks → O(3^N).
Efficient: SOS DP → O(N × 2^N).

```python
def sum_over_subsets(f, n):
    # f[mask] = value for exactly that mask
    # After SOS: f[mask] = sum of original f[sub] for all sub ⊆ mask
    for i in range(n):
        for mask in range(1 << n):
            if mask & (1 << i):
                f[mask] += f[mask ^ (1 << i)]
    return f

# Example:
n = 3
f = [0] * (1 << n)
f[0b001] = 1   # element 0 has value 1
f[0b010] = 2   # element 1 has value 2
f[0b101] = 5   # elements 0,2 have value 5

result = sum_over_subsets(f[:], n)
# result[0b111] = sum of all, result[0b011] = sum of subsets of {0,1}, etc.
```

---

## 🎯 Practice Problems

### Basic Bit Operations (800–1100)
1. **[CF 1594C — Make It Equal](https://codeforces.com/problemset/problem/1594/C)** — bit counting
2. **[CF 1234A — Equalize Prices](https://codeforces.com/problemset/problem/1234/A)**
3. **[CF 1025B — Weakened Common Divisor](https://codeforces.com/problemset/problem/1025/B)**

### XOR Tricks (1100–1500)
4. **[CF 1316B — String Modification](https://codeforces.com/problemset/problem/1316/B)**
5. **[CF 1354D — Multi-layer Approach](https://codeforces.com/problemset/problem/1354/D)**
6. **[CF 1330B — Dreamoon Likes Permutations](https://codeforces.com/problemset/problem/1330/B)**
7. **[CF 1647D — Madoka and the Best Gift](https://codeforces.com/problemset/problem/1647/D)**

### Bitmask Subsets (1500–1900)
8. **[CF 1209G — Into Blocks](https://codeforces.com/problemset/problem/1209/G)**
9. **[CF 1208F — Bits And Pieces](https://codeforces.com/problemset/problem/1208/F)**
10. **[CF 1554B — Cobb and Fibonacci](https://codeforces.com/problemset/problem/1554/B)**

### Hard Bit Manipulation (1900–2100)
11. **[CF 1151F — Sonya and Bitwise OR](https://codeforces.com/problemset/problem/1151/F)**
12. **[CF 1733D — Zero-One (medium)](https://codeforces.com/problemset/problem/1733/D)**

---

## 📝 Cheat Sheet

```python
n & (n-1)         # remove lowest set bit
n & (-n)          # isolate lowest set bit
n | (1 << k)      # set bit k
n & ~(1 << k)     # clear bit k
n ^ (1 << k)      # toggle bit k
(n >> k) & 1      # check bit k
n.bit_length()    # floor(log2(n)) + 1
bin(n).count('1') # popcount
1 << k            # 2^k
(1 << k) - 1      # bitmask of k ones: 000...0111...1
```

**Golden Rule for Bitmasks**: If you have N items and need to represent all subsets, use N-bit integers. 2^20 ≈ 10^6, feasible. 2^25 ≈ 3×10^7, borderline. 2^30 ≈ 10^9, too large for time (for most DP approaches).