# 📘 Lesson 1: Math for Competitive Programming

> **The foundation of 80% of CP problems. Master this and A/B problems become trivial.**

---

## 1. Integer Division & Modular Arithmetic

### Floor Division
In Python, `//` does floor division (rounds toward negative infinity):
```python
7 // 2    # = 3
-7 // 2   # = -4 (rounds DOWN, not toward zero!)
```

### Ceiling Division (Without Float!)
Never use `math.ceil(a/b)` — it loses precision for large numbers.
```python
# Correct way: ceil(a / b) = (a + b - 1) // b
def ceil_div(a, b):
    return (a + b - 1) // b

ceil_div(7, 2)   # = 4
ceil_div(6, 2)   # = 3
ceil_div(10, 3)  # = 4
```
**Why this works**: Adding (b-1) before floor dividing ensures we round up.

### Modular Arithmetic
The `%` operator gives the remainder. Key rules:
```python
(a + b) % m == ((a % m) + (b % m)) % m  # Addition
(a * b) % m == ((a % m) * (b % m)) % m  # Multiplication
# BUT NOT for division! Division needs modular inverse (Lesson 5)
```

The most common modulus: **10⁹ + 7 = 1000000007** (a prime).
```python
MOD = 10**9 + 7

# Always mod after every operation to prevent overflow (Python handles big ints, but it's slower)
result = (a * b) % MOD
result = (result + c) % MOD
```

---

## 2. Powers of 2 & Bit Basics

Powers of 2 appear EVERYWHERE in CP. Know them by heart:

| 2ⁿ | Value | Approx |
|----|-------|--------|
| 2¹⁰ | 1,024 | ~10³ |
| 2²⁰ | 1,048,576 | ~10⁶ |
| 2³⁰ | 1,073,741,824 | ~10⁹ |
| 2⁴⁰ | — | ~10¹² |

```python
# Check if n is a power of 2
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

# Highest bit position
n.bit_length()  # 8 → 4, 16 → 5, 1 → 1
```

---

## 3. GCD and LCM

**GCD** (Greatest Common Divisor): largest number that divides both a and b.
**LCM** (Least Common Multiple): smallest number divisible by both a and b.

```python
from math import gcd

# GCD
gcd(12, 8)  # = 4
gcd(15, 0)  # = 15 (gcd with 0 is the other number)

# LCM (not built-in before Python 3.9)
def lcm(a, b):
    return a // gcd(a, b) * b  # division first to avoid overflow in other languages

lcm(4, 6)  # = 12

# GCD of multiple numbers
from functools import reduce
gcd_all = reduce(gcd, [12, 8, 16])  # = 4

# Key property: GCD(a, b) = GCD(a, b - a) = GCD(a, b % a)
# Key property: a * b = GCD(a,b) * LCM(a,b)
```

---

## 4. Parity (Odd/Even)

Many problems reduce to checking parity:

```python
# Check parity
if x % 2 == 0:  # even
if x % 2 == 1:  # odd (use this, not x%2 != 0, for clarity)
# Faster with bitwise AND:
if x & 1 == 0:  # even
if x & 1:       # odd

# Key parity facts:
# odd + odd = even, even + even = even, odd + even = odd
# odd * anything_odd = odd, even * anything = even
# Sum of array is odd ↔ odd count of odd numbers
```

### Parity Problem Pattern
**"Can we split array into two groups with equal sum?"**
→ If total sum is odd, IMPOSSIBLE. If even, it might be possible.

---

## 5. Counting Divisors

```python
# Count all divisors of n in O(√n)
def count_divisors(n):
    count = 0
    i = 1
    while i * i <= n:
        if n % i == 0:
            count += 1
            if i != n // i:
                count += 1
        i += 1
    return count

# List all divisors
def get_divisors(n):
    divs = []
    i = 1
    while i * i <= n:
        if n % i == 0:
            divs.append(i)
            if i != n // i:
                divs.append(n // i)
        i += 1
    return sorted(divs)

get_divisors(12)  # [1, 2, 3, 4, 6, 12]
```

---

## 6. Arithmetic & Geometric Progressions

```python
# Sum of first n natural numbers
def sum_n(n):
    return n * (n + 1) // 2

# Sum of first n odd numbers = n²
# Sum of first n even numbers = n * (n + 1)

# Sum of arithmetic progression: a, a+d, a+2d, ..., a+(n-1)d
def ap_sum(a, d, n):
    return n * (2 * a + (n - 1) * d) // 2

# Sum of geometric progression: a, ar, ar², ..., ar^(n-1)
# = a * (r^n - 1) / (r - 1)  when r != 1
```

---

## 7. Min/Max Tricks

```python
# Track running min/max
cur_min = float('inf')
cur_max = float('-inf')
for x in arr:
    cur_min = min(cur_min, x)
    cur_max = max(cur_max, x)

# Clamp a value
x = max(lo, min(hi, x))  # ensures lo <= x <= hi

# Min of absolute differences: SORT first, then check adjacent pairs
arr.sort()
min_diff = min(arr[i+1] - arr[i] for i in range(len(arr)-1))
```

---

## 8. Common Math Formulas for CP

| Formula | Expression | When to Use |
|---------|-----------|-------------|
| Sum 1..n | n(n+1)/2 | Counting, optimization |
| Sum of squares | n(n+1)(2n+1)/6 | Distance/variance |
| Triangular check | n(n+1)/2 ≥ target | "Min operations" |
| Points on grid | (r₂-r₁+1) × (c₂-c₁+1) | Rectangle area |
| Manhattan distance | \|x₁-x₂\| + \|y₁-y₂\| | Grid problems |
| Euler's formula | V - E + F = 2 | Planar graphs |

---

## 🧪 Practice These Problems

After reading this lesson, solve these in order:
1. [Watermelon (4A)](https://codeforces.com/problemset/problem/4/A) — parity
2. [Domino Piling (50A)](https://codeforces.com/problemset/problem/50/A) — floor division
3. [Die Roll (9A)](https://codeforces.com/problemset/problem/9/A) — counting
4. [Bear and Big Brother (791A)](https://codeforces.com/problemset/problem/791/A) — multiplication
5. [Soldier and Bananas (546A)](https://codeforces.com/problemset/problem/546/A) — sum formula
6. [Even Odds (318A)](https://codeforces.com/problemset/problem/318/A) — parity + formula
7. [Young Physicist (69A)](https://codeforces.com/problemset/problem/69/A) — sum = 0 check
8. [Elephant (617A)](https://codeforces.com/problemset/problem/617/A) — ceil division

### 📝 Teach-Back Checkpoint
After solving 4+ problems above, write a 3-sentence explanation:
1. What math concept did I use most?
2. What's the #1 mistake I made?
3. One formula I want to memorize?
