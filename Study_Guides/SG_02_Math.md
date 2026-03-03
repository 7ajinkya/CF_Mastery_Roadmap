# 📘 Study Guide 02 — Math for Programming

> **Difficulty Range**: Beginner → Advanced (CF 800 → 2000)
> **Topics**: Modular Arithmetic, Number Theory, GCD/LCM, Primes, Combinatorics, Bit Math

---

## 🧠 Chapter 1 — Modular Arithmetic

### Why Do We Use Modular Arithmetic?

In competitive programming, answers can be astronomically large — like `2^(10^9)`. Storing such a number would require billions of digits. Computers can't handle that. So problems typically say **"print the answer modulo 10^9 + 7"**.

Think of modular arithmetic like a clock. A clock only shows 1–12. After 12, it goes back to 1. So `13 mod 12 = 1`, `25 mod 12 = 1`. You're always working within a bounded range.

`10^9 + 7 = 1000000007` is a **prime** number. This choice isn't random — prime moduli enable modular inverse to always exist (more on this later), which allows us to do division in modular arithmetic.

### Basic Rules

```
(a + b) mod M = ((a mod M) + (b mod M)) mod M
(a - b) mod M = ((a mod M) - (b mod M) + M) mod M    ← +M to prevent negative
(a * b) mod M = ((a mod M) * (b mod M)) mod M
(a / b) mod M = (a * modular_inverse(b, M)) mod M     ← division is special!
```

**Critical Rule**: Always take mod after every operation, not just at the end. Overflow can occur in intermediate steps.

```python
MOD = 10**9 + 7

def add(a, b): return (a + b) % MOD
def sub(a, b): return (a - b + MOD) % MOD
def mul(a, b): return (a * b) % MOD
```

### Modular Exponentiation (Fast Power)

**Problem**: Compute `a^b mod M` where b can be up to 10^18.

Naive: multiply a by itself b times → O(b) operations → too slow.

**Key Insight** — Binary Exponentiation:
- If b is even: `a^b = (a^(b/2))^2`
- If b is odd: `a^b = a * a^(b-1)`

This halves b each step → O(log b) multiplications.

```
2^13 = 2^8 * 2^4 * 2^1    (13 in binary = 1101)
     = 256 * 16 * 2 = 8192
```

```python
def power(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp % 2 == 1:       # if current bit is 1
            result = result * base % mod
        base = base * base % mod   # square the base
        exp //= 2              # move to next bit
    return result

# Python has this built-in:
pow(base, exp, mod)  # always use this in Python — it's fast and uses the same algorithm
```

### Modular Inverse

**Problem**: Compute `(a / b) mod M`.

Division in modular arithmetic requires the **modular inverse** of b: `b^(-1) mod M` such that `b * b^(-1) ≡ 1 (mod M)`.

**Fermat's Little Theorem** (when M is prime): `b^(M-1) ≡ 1 (mod M)` → so `b^(-1) ≡ b^(M-2) (mod M)`.

```python
def modinv(b, mod=10**9+7):
    return pow(b, mod-2, mod)   # Only works when mod is prime!

# Division: a / b mod M
def moddiv(a, b, mod=10**9+7):
    return mul(a, modinv(b, mod))
```

**Alternative** — Extended Euclidean Algorithm (works for any modulus, not just prime):
```python
def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x, y = extended_gcd(b, a % b)
    return g, y, x - (a // b) * y

def modinv_general(a, mod):
    g, x, _ = extended_gcd(a, mod)
    if g != 1:
        return None  # inverse doesn't exist
    return x % mod
```

---

## 🧠 Chapter 2 — GCD and LCM

### Greatest Common Divisor (GCD)

GCD(a, b) = largest number that divides both a and b.

**Euclidean Algorithm**: Based on the beautiful fact that GCD(a, b) = GCD(b, a mod b).

Why? Because any common divisor of a and b also divides (a - b), (a - 2b), ..., (a mod b). So the set of common divisors is preserved!

```
GCD(48, 18):
GCD(48, 18) = GCD(18, 48%18) = GCD(18, 12)
            = GCD(12, 18%12) = GCD(12, 6)
            = GCD(6, 12%6)  = GCD(6, 0)
            = 6
```

```python
from math import gcd    # Python built-in, very fast

# Manual implementation:
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a
```

**Time Complexity**: O(log(min(a, b))) — incredibly fast.

### Least Common Multiple (LCM)

`LCM(a, b) = (a * b) / GCD(a, b)`

**Important**: Compute as `(a // gcd(a, b)) * b` to avoid overflow before dividing!

```python
from math import gcd
def lcm(a, b):
    return (a // gcd(a, b)) * b
```

**Key Properties**:
- GCD(a, b) * LCM(a, b) = a * b
- GCD and LCM are associative: GCD(a, b, c) = GCD(GCD(a, b), c)

### GCD of an Array

```python
from math import gcd
from functools import reduce

arr = [12, 18, 24, 6]
result = reduce(gcd, arr)   # = 6
```

---

## 🧠 Chapter 3 — Prime Numbers and Sieve of Eratosthenes

### What is a Prime?

A number p > 1 is prime if its only divisors are 1 and p.

**Naïve primality test**: check all divisors from 2 to p-1 → O(p).

**Better**: check only up to √p. Why? If p = a*b and both a,b > √p, then a*b > p — contradiction. So at least one factor ≤ √p.

```python
def is_prime(n):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2
    return True
```

### Sieve of Eratosthenes

**Problem**: Find all primes up to N (say N = 10^6).

**Idea**: Start with all numbers marked as prime. For each prime p found, mark all multiples of p (p², p²+p, p²+2p, ...) as composite.

**Why start at p²?** Because smaller multiples of p (like 2p, 3p) would have already been marked by smaller primes.

```python
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    p = 2
    while p * p <= n:
        if is_prime[p]:
            for multiple in range(p*p, n+1, p):
                is_prime[multiple] = False
        p += 1
    return [i for i in range(n+1) if is_prime[i]]

# Time: O(N log log N) — nearly linear, very fast
# Space: O(N)
```

**Example trace for n=20**:
```
Start: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
p=2: mark 4,6,8,10,12,14,16,18,20 as composite
p=3: mark 9,15 as composite (12,18 already marked)
p=4: not prime, skip
p=5: 25 > 20, stop
Primes: [2,3,5,7,11,13,17,19]
```

### Smallest Prime Factor (SPF) Sieve — For Factorization

This variant stores the smallest prime factor of every number, enabling O(log N) factorization:

```python
def spf_sieve(n):
    spf = list(range(n+1))   # spf[i] = i initially (assuming i is prime)
    p = 2
    while p * p <= n:
        if spf[p] == p:   # p is prime (hasn't been updated)
            for multiple in range(p*p, n+1, p):
                if spf[multiple] == multiple:  # not yet assigned
                    spf[multiple] = p
        p += 1
    return spf

def factorize(n, spf):
    factors = []
    while n > 1:
        factors.append(spf[n])
        n //= spf[n]
    return factors   # returns prime factors with repetition
```

---

## 🧠 Chapter 4 — Prime Factorization Techniques

### Factorizing a Single Number

```python
def factorize_single(n):
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors

factorize_single(360) = {2:3, 3:2, 5:1}  # 360 = 2³ × 3² × 5
```

### Number of Divisors

If `n = p1^a1 * p2^a2 * ... * pk^ak`, then:
- **Number of divisors** = (a1+1) × (a2+1) × ... × (ak+1)
- **Sum of divisors** = (1+p1+...+p1^a1) × ... × (1+pk+...+pk^ak)

```python
def count_divisors(n):
    count = 1
    d = 2
    while d * d <= n:
        exp = 0
        while n % d == 0:
            exp += 1
            n //= d
        count *= (exp + 1)
        d += 1
    if n > 1:
        count *= 2  # the prime n itself has exponent 1, contributing ×(1+1)
    return count
```

---

## 🧠 Chapter 5 — Combinatorics

### Factorials and nCr

`nCr` = "n choose r" = number of ways to choose r items from n.

`nCr = n! / (r! * (n-r)!)`

In modular arithmetic, division = multiply by modular inverse:
```python
MOD = 10**9 + 7

def precompute_factorials(maxn):
    fact = [1] * (maxn + 1)
    for i in range(1, maxn + 1):
        fact[i] = fact[i-1] * i % MOD
    
    inv_fact = [1] * (maxn + 1)
    inv_fact[maxn] = pow(fact[maxn], MOD-2, MOD)
    for i in range(maxn - 1, -1, -1):
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD
    
    return fact, inv_fact

def nCr(n, r, fact, inv_fact):
    if r < 0 or r > n: return 0
    return fact[n] * inv_fact[r] % MOD * inv_fact[n-r] % MOD
```

**Usage pattern**: Always precompute factorials up to max needed N at the start of the program. Never recompute.

### Pascal's Triangle (Small nCr without mod)

For small n (up to ~60), use Pascal's triangle directly:
```python
C = [[0]*70 for _ in range(70)]
C[0][0] = 1
for i in range(1, 70):
    C[i][0] = 1
    for j in range(1, i+1):
        C[i][j] = C[i-1][j-1] + C[i-1][j]
```

### Stars and Bars

**Problem**: In how many ways can you distribute k identical balls into n distinct boxes?

Answer: `C(n+k-1, k)` = `C(n+k-1, n-1)`

This formula comes from placing k stars and (n-1) bars in a row — the bars separate the boxes.

**With at least 1 in each box**: First give 1 to each box (n balls used), then distribute k-n remaining → `C(k-1, n-1)`.

### Inclusion-Exclusion Principle

**Problem**: Count elements satisfying at least one of several conditions.

`|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|`

**Tip**: For CP, this usually appears as "count numbers up to N divisible by at least one of p1, p2, ..., pk" using multiples.

```python
# Count numbers in [1,N] divisible by at least one of the primes in list P
def count_divisible(N, P):
    from itertools import combinations
    total = 0
    for r in range(1, len(P)+1):
        for combo in combinations(P, r):
            lcm_val = 1
            for p in combo:
                lcm_val = lcm(lcm_val, p)
            if (-1)**(r+1) > 0:
                total += N // lcm_val
            else:
                total -= N // lcm_val
    return total
```

---

## 🧠 Chapter 6 — Important Number Theory Results

### Euler's Totient Function φ(n)

`φ(n)` = count of integers in [1, n] that are coprime to n.

`φ(n) = n × ∏(1 - 1/p)` for each prime p dividing n.

```python
def euler_totient(n):
    result = n
    temp = n
    d = 2
    while d * d <= temp:
        if temp % d == 0:
            while temp % d == 0:
                temp //= d
            result -= result // d
        d += 1
    if temp > 1:
        result -= result // temp
    return result
```

**Key properties**:
- For prime p: `φ(p) = p - 1`
- `φ(p^k) = p^k - p^(k-1)`
- Fermat's Little Theorem: `a^(p-1) ≡ 1 (mod p)` for prime p, when gcd(a,p)=1

### Chinese Remainder Theorem (CRT)

**Problem**: Find x such that:
- `x ≡ r1 (mod m1)`
- `x ≡ r2 (mod m2)`
- ...where m1, m2 are coprime

**Solution exists and is unique mod (m1 * m2 * ...)**.

```python
def crt(r1, m1, r2, m2):
    # Find x = r1 mod m1, x = r2 mod m2
    # Using extended GCD
    g, p, q = extended_gcd(m1, m2)
    if (r2 - r1) % g != 0:
        return None, None  # No solution
    lcm_ = m1 // g * m2
    x = (r1 + m1 * ((r2 - r1) // g * p % (m2 // g))) % lcm_
    return x, lcm_
```

---

## 🎯 Practice Problems

### Modular Arithmetic (800–1200)
1. **[CF 1278B — A and B](https://codeforces.com/problemset/problem/1278/B)** — basic mod
2. **[CF 1535C — Unstable String](https://codeforces.com/problemset/problem/1535/C)**

### Number Theory (1200–1600)
3. **[CF 1350B — Orac and Models](https://codeforces.com/problemset/problem/1350/B)** — GCD reasoning
4. **[CF 1657C — Bracket Sequence Deletion](https://codeforces.com/problemset/problem/1657/C)**
5. **[CF 1305C — Ayoub and Lost Array](https://codeforces.com/problemset/problem/1305/C)** — counting mod
6. **[CF 1166D — Helix](https://codeforces.com/problemset/problem/1166/D)**

### Combinatorics (1400–1800)
7. **[CF 1696C — Fishingprince Plays Fish Card Game](https://codeforces.com/problemset/problem/1696/C)**
8. **[CF 1536C — Jurema and Coconuts](https://codeforces.com/problemset/problem/1536/C)**
9. **[CF 1264D — Beautiful Bracket Sequence](https://codeforces.com/problemset/problem/1264/D)** — combinatorics
10. **[CF 1603C — Extreme Extension](https://codeforces.com/problemset/problem/1603/C)**

---

## 📝 Summary Cheat Sheet

| Tool | Formula | When |
|------|---------|------|
| Fast exponentiation | `pow(a, b, mod)` | `a^b mod M` |
| Modular inverse | `pow(b, MOD-2, MOD)` | Division mod prime |
| GCD | `math.gcd(a, b)` | Always |
| LCM | `(a // gcd) * b` | Always (no overflow) |
| nCr mod | precompute `fact[]`, `inv_fact[]` | Combinatorics |
| Count primes ≤ N | Sieve of Eratosthenes | N ≤ 10^7 |
| Factorize n | Trial division up to √n | Single number |
| Factorize many | SPF sieve + lookups | Batch factorization |