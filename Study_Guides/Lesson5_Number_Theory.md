# 📘 Lesson 5: Basic Number Theory

> **Number theory explains WHY certain problems have elegant solutions. Essential from 1000+ rating.**

---

## 1. Prime Numbers

### Checking if N is Prime
```python
def is_prime(n):
    if n < 2: return False
    if n < 4: return True
    if n % 2 == 0 or n % 3 == 0: return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0: return False
        i += 6
    return True
```

### Sieve of Eratosthenes — Find ALL Primes up to N
```python
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return is_prime

# Usage
primes_mask = sieve(1000000)
primes_list = [i for i, v in enumerate(primes_mask) if v]
```

### Prime Factorization
```python
def factorize(n):
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

factorize(60)  # {2: 2, 3: 1, 5: 1} → 2² × 3 × 5
```

### SPF Sieve (Smallest Prime Factor) — Factorize in O(log n)
```python
def spf_sieve(n):
    spf = list(range(n + 1))  # spf[i] = i initially
    for i in range(2, int(n**0.5) + 1):
        if spf[i] == i:  # i is prime
            for j in range(i*i, n + 1, i):
                if spf[j] == j:
                    spf[j] = i
    return spf

# Fast factorize using SPF
def fast_factorize(n, spf):
    factors = {}
    while n > 1:
        p = spf[n]
        while n % p == 0:
            factors[p] = factors.get(p, 0) + 1
            n //= p
    return factors
```

---

## 2. GCD & LCM Mastery

```python
from math import gcd

# Key properties:
# gcd(a, 0) = a
# gcd(a, b) = gcd(b, a % b)
# gcd(a, b, c) = gcd(gcd(a, b), c)
# If gcd(a, b) = 1, they are "coprime"

# GCD of a range can only DECREASE as you add elements
# There are at most O(log V) distinct GCD values for all prefixes

# LCM
def lcm(a, b):
    return a // gcd(a, b) * b

# GCD of entire array
from functools import reduce
array_gcd = reduce(gcd, arr)
```

---

## 3. Modular Arithmetic

### Fast Exponentiation (mod)
```python
# Python has this built in!
pow(base, exp, mod)  # base^exp % mod in O(log exp)

# Example: 2^1000000 mod (10^9+7)
result = pow(2, 1000000, 10**9 + 7)
```

### Modular Inverse
```python
MOD = 10**9 + 7

# a^(-1) mod p = a^(p-2) mod p (Fermat's little theorem, p must be prime)
def mod_inv(a, mod=MOD):
    return pow(a, mod - 2, mod)

# Division under mod: (a / b) mod p = (a * b^(p-2)) mod p
result = a * mod_inv(b) % MOD
```

### Precompute nCr (Combinations mod p)
```python
MAXN = 200001
MOD = 10**9 + 7

fact = [1] * MAXN
for i in range(1, MAXN):
    fact[i] = fact[i-1] * i % MOD

inv_fact = [1] * MAXN
inv_fact[MAXN-1] = pow(fact[MAXN-1], MOD-2, MOD)
for i in range(MAXN-2, -1, -1):
    inv_fact[i] = inv_fact[i+1] * (i+1) % MOD

def nCr(n, r):
    if r < 0 or r > n: return 0
    return fact[n] * inv_fact[r] % MOD * inv_fact[n-r] % MOD
```

---

## 🧪 Practice Problems

1. [T-primes (230B)](https://codeforces.com/problemset/problem/230/B) — sieve + perfect square
2. [Almost Prime (26A)](https://codeforces.com/problemset/problem/26/A) — factorization
3. [Common Divisors (1203C)](https://codeforces.com/problemset/problem/1203/C) — GCD of array
4. [k-th Not Divisible (1352C)](https://codeforces.com/problemset/problem/1352/C) — math formula
5. [Orac and GCD (1350A)](https://codeforces.com/problemset/problem/1350/A) — GCD properties
6. [Noldbach Problem (17A)](https://codeforces.com/problemset/problem/17/A) — primes

### 📝 Teach-Back Checkpoint
Explain: What's the Sieve of Eratosthenes? Why is it faster than checking each number individually?
