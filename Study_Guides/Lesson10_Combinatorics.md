# 📘 Lesson 10: Combinatorics for Competitive Programming

> **Counting problems appear constantly. Master these formulas and you'll ace 1200–1700 rated problems.**

---

## 1. The Fundamental Counting Principle

**AND** (both things happen) → **Multiply**.
**OR** (either thing happens, mutually exclusive) → **Add**.

```python
# How many 2-digit even numbers are there?
# First digit: 1-9 (9 choices), Second digit: 0,2,4,6,8 (5 choices)
total = 9 * 5  # = 45

# How many strings of length 3 over {A,B,C}?
total = 3 * 3 * 3  # = 27 (each position independent)
```

---

## 2. Permutations — Order Matters

**P(n, k)** = ways to arrange k items from n distinct items = n × (n-1) × ... × (n-k+1)

```python
import math

# All n items (n!)
math.factorial(5)   # 120

# k from n: P(n,k) = n! / (n-k)!
math.perm(10, 3)    # 720 (Python 3.8+)

# Manual:
def perm(n, k):
    result = 1
    for i in range(n, n - k, -1):
        result *= i
    return result

perm(10, 3)  # 10 × 9 × 8 = 720
```

---

## 3. Combinations (nCr) — Order Doesn't Matter ⭐

**C(n, k)** = ways to choose k items from n distinct items = n! / (k! × (n-k)!)

```python
import math

math.comb(10, 3)   # 120 (Python 3.8+)

# Manual (no overflow issues):
def nCr(n, k):
    if k > n or k < 0: return 0
    k = min(k, n - k)  # use symmetry C(n,k) = C(n,n-k)
    result = 1
    for i in range(k):
        result = result * (n - i) // (i + 1)
    return result

nCr(10, 3)  # 120
```

### Key Properties You Must Know

```
C(n, 0) = C(n, n) = 1
C(n, 1) = n
C(n, k) = C(n, n-k)           ← symmetry
C(n, k) = C(n-1, k-1) + C(n-1, k)  ← Pascal's triangle
Sum of row n: C(n,0) + C(n,1) + ... + C(n,n) = 2^n
```

---

## 4. Modular Combinations (for Large n)

When n can be up to 10^6, precompute factorials mod p.

```python
MOD = 10**9 + 7
MAXN = 200001

fact = [1] * MAXN
for i in range(1, MAXN):
    fact[i] = fact[i-1] * i % MOD

inv_fact = [1] * MAXN
inv_fact[MAXN-1] = pow(fact[MAXN-1], MOD-2, MOD)
for i in range(MAXN-2, -1, -1):
    inv_fact[i] = inv_fact[i+1] * (i+1) % MOD

def nCr_mod(n, r):
    if r < 0 or r > n: return 0
    return fact[n] * inv_fact[r] % MOD * inv_fact[n-r] % MOD

# Usage:
print(nCr_mod(1000000, 500000))  # works instantly!
```

---

## 5. Inclusion-Exclusion Principle

**|A ∪ B| = |A| + |B| - |A ∩ B|**

For 3 sets:
**|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|**

```python
# Count integers from 1 to N divisible by 2 OR 3
def count_div_2_or_3(N):
    return N//2 + N//3 - N//6  # subtract double-counted multiples of 6

# Count integers from 1 to N NOT divisible by 2, 3, or 5
def count_coprime(N, primes=[2, 3, 5]):
    total = 0
    k = len(primes)
    for mask in range(1, 1 << k):
        product = 1
        bits = bin(mask).count('1')
        for i in range(k):
            if mask & (1 << i):
                product *= primes[i]
        if bits % 2 == 1:
            total += N // product
        else:
            total -= N // product
    return N - total
```

---

## 6. Stars and Bars

**How many ways to distribute n identical items into k distinct bins?**

If bins can be empty: **C(n + k - 1, k - 1)**
If each bin gets at least 1: **C(n - 1, k - 1)**

```python
# Example: x1 + x2 + x3 = 10, xi >= 0
# n=10, k=3 → C(12, 2) = 66
print(nCr(12, 2))

# Example: x1 + x2 + x3 = 10, xi >= 1
# Substitute yi = xi - 1: y1 + y2 + y3 = 7
# → C(9, 2) = 36
print(nCr(9, 2))
```

---

## 7. Pigeonhole Principle

**If n+1 items go into n bins, at least one bin has ≥ 2 items.**

Generalizes: if kn+1 items go into n bins, some bin has ≥ k+1 items.

This is used for **existence proofs** in CP:
- "Show that two people must share a birthday" → pigeonhole
- "In any 101 integers, two have same last 2 digits" → 100 possible remainders, 101 numbers
- "Maximum possible minimum" questions often use pigeonhole reasoning

---

## 8. Counting Paths and Arrangements

```python
# Paths in a grid (right or down only, from (0,0) to (n-1, m-1))
# Must take (n-1) down steps and (m-1) right steps in some order
# Total steps: n+m-2, choose n-1 for "down"
def grid_paths(n, m):
    return nCr_mod(n + m - 2, n - 1)

# Distinct anagrams of a string with repeated characters
# "MISSISSIPPI" has 11 letters: M×1, I×4, S×4, P×2
# Count = 11! / (1! × 4! × 4! × 2!)
from math import factorial
def distinct_anagrams(letter_counts):
    total = sum(letter_counts)
    result = factorial(total)
    for c in letter_counts:
        result //= factorial(c)
    return result

distinct_anagrams([1, 4, 4, 2])  # MISSISSIPPI → 34650
```

---

## 9. Derangements

A **derangement** is a permutation where no element appears in its original position.

```python
# D(n) = number of derangements of n elements
# D(0) = 1, D(1) = 0
# Recurrence: D(n) = (n-1) * (D(n-1) + D(n-2))

def derangements(n):
    if n == 0: return 1
    if n == 1: return 0
    a, b = 1, 0
    for i in range(2, n + 1):
        a, b = b, (i - 1) * (a + b)
    return b

# Also: D(n) = n! * sum((-1)^k / k! for k=0..n) ≈ n!/e
```

---

## 10. Catalan Numbers

Appear surprisingly often: valid bracket sequences, BST shapes, triangulations.

```python
# C(n) = (2n choose n) / (n+1)
# C(0)=1, C(1)=1, C(2)=2, C(3)=5, C(4)=14, ...

def catalan(n):
    return nCr(2*n, n) // (n + 1)

# Modular version:
def catalan_mod(n):
    return nCr_mod(2*n, n) * pow(n + 1, MOD - 2, MOD) % MOD
```

---

## 11. Common Combinatorics Patterns in CP

| Pattern | Formula | Use case |
|---------|---------|---------|
| Choose k from n | C(n, k) | Selecting teams, subsets |
| Arrange n distinct | n! | All orderings |
| Arrange with repeats | n! / (a! × b! × ...) | Anagrams |
| Distribute n into k bins | C(n+k-1, k-1) | Stars and bars |
| Count using complement | total - bad | When "bad" is easier |
| Either A or B (exclusive) | A + B | Disjoint cases |
| Both A and B (independent) | A × B | Independent choices |

---

## 🧪 Practice Problems

1. [Team (231A)](https://codeforces.com/problemset/problem/231/A) — basic counting
2. [Dreamoon and Sums (476C)](https://codeforces.com/problemset/problem/476/C) — math counting
3. [Colorful Graph (811E)](https://codeforces.com/problemset/problem/811/E) — counting
4. [Shawarma Tent (1662A)](https://codeforces.com/problemset/problem/1662/A) — combinatorics logic
5. [Coloring (1276B)](https://codeforces.com/problemset/problem/1276/B) — inclusion-exclusion
6. [Wet Shark and Bishops (621D)](https://codeforces.com/problemset/problem/621/D) — grid counting
7. [Bacteria (579C)](https://codeforces.com/problemset/problem/579/C) — modular counting
8. [Inna and Sequence (383C)](https://codeforces.com/problemset/problem/383/C) — combinatorics + tree

### 📝 Teach-Back Checkpoint
After solving problems, answer:
1. When do you multiply vs. add in counting?
2. What is the difference between permutations and combinations?
3. Describe a situation where you'd use inclusion-exclusion.
4. What does stars and bars solve? Give an example.
