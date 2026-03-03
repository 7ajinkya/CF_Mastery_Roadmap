#🔢 Number Theory (30-50 Problems)

> **Prime numbers, GCD, modular arithmetic, and more. The mathematical foundation for 40% of 1000+ rated problems. Essential for contests.**

---

##📚 Study Material: Essential Concepts

### 1. Prime Numbers
```python
# Check if n is prime - O(√n)
def is_prime(n):
    if n < 2: return False
    if n < 4: return True
    if n % 2 == 0 or n % 3 == 0: return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Sieve of Eratosthenes - Find all primes up to n
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(2, n + 1) if is_prime[i]]

# Prime factorization
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
```

### 2. GCD and LCM
```python
from math import gcd

# GCD properties
# gcd(a, 0) = a
# gcd(a, b) = gcd(b, a % b)
# gcd(a, b, c) = gcd(gcd(a, b), c)

def lcm(a, b):
    return a // gcd(a, b) * b  # Division first to avoid overflow

# GCD of array
from functools import reduce
array_gcd = reduce(gcd, arr)
```

### 3. Modular Arithmetic
```python
# Fast exponentiation
def power(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1:
            result = (result * base) % mod
        base = (base * base) % mod
        exp >>= 1
    return result

# Modular inverse (when mod is prime)
def mod_inverse(a, mod):
    return power(a, mod - 2, mod)  # Fermat's little theorem

# Division under mod
def mod_divide(a, b, mod):
    return (a * mod_inverse(b, mod)) % mod
```

### 4. Key Number Theory Concepts

**Divisibility:**
- If a|b and a|c, then a|(b±c)
- If a|b, then a|bc for any integer c
- GCD(a,b) = smallest positive value of ax + by

**Modular Properties:**
- (a + b) mod m = ((a mod m) + (b mod m)) mod m
- (a × b) mod m = ((a mod m) × (b mod m)) mod m
- (a - b) mod m = ((a mod m) - (b mod m) + m) mod m

**Prime Counting:**
- π(n) ≈ n/ln(n) (Prime Number Theorem)
- For n ≤ 10⁶ there are about 78,498 primes

---

##🎯 Problem Sets by Difficulty

### 800-1000 (Basic - Build Foundation)
> Target: Solve 15+ problems with 85%+ success rate

| # | Problem | Key Concept | Link |
|---|---------|-------------|------|
| 1 | T-primes | Perfect squares | [230B](https://codeforces.com/problemset/problem/230/B) |
| 2 | Almost Prime | Prime factorization | [26A](https://codeforces.com/problemset/problem/26/A) |
| 3 | k-th Not Divisible | Mathematical formula | [1352C](https://codeforces.com/problemset/problem/1352/C) |
| 4 | Common Divisors | GCD of array | [1203C](https://codeforces.com/problemset/problem/1203/C) |
| 5 | Orac and GCD | GCD properties | [1350A](https://codeforces.com/problemset/problem/1350/A) |
| 6 | Noldbach Problem | Prime counting | [17A](https://codeforces.com/problemset/problem/17/A) |
| 7 | GCD Table | GCD construction | [582A](https://codeforces.com/problemset/problem/582/A) |
| 8 | Div3 | Divisibility check | [1036A](https://codeforces.com/problemset/problem/1036/A) |
| 9 | Power of Two | Bit manipulation | [1512/A](https://codeforces.com/problemset/problem/1512/A) |
| 10 | Divisibility by 25 | Last digits | [988B](https://codeforces.com/problemset/problem/988/B) |
| 11 | Polycarp's Phone | Digit manipulation | [1560/A](https://codeforces.com/problemset/problem/1560/A) |
| 12 | Ehab and another construction | Mathematical construction | [1088A](https://codeforces.com/problemset/problem/1088/A) |
| 13 | Fibonacci | Fibonacci properties | [456A](https://codeforces.com/problemset/problem/456/A) |
| 14 | Aggressive cows | Binary search + math | [1244C](https://codeforces.com/problemset/problem/1244/C) |
| 15 | Product Queries | Modular arithmetic | [2193/E](https://codeforces.com/problemset/problem/2193/E) |

###🟡 1000-1200 (Intermediate - Pattern Recognition)
> Target: Solve 12+ problems with 75%+ success rate

| # | Problem | Key Concept | Link |
|---|---------|-------------|------|
| 1 | Prime Matrix | Sieve + matrix | [271B](https://codeforces.com/problemset/problem/271/B) |
| 2 | Good Sequences | DP + number theory | [264B](https://codeforces.com/problemset/problem/264/B) |
| 3 | Little Pony and Expected Maximum | Probability + linearity | [453A](https://codeforces.com/problemset/problem/453/A) |
| 4 | MUH and Important Things | Sorting with criteria | [471B](https://codeforces.com/problemset/problem/471/B) |
| 5 | MUH and Cube Walls | String matching + KMP | [471C](https://codeforces.com/problemset/problem/471/C) |
| 6 | MUH and House of Cards | Mathematical optimization | [471D](https://codeforces.com/problemset/problem/471/D) |
| 7 | MUH and Sticks | Geometric + greedy | [471E](https://codeforces.com/problemset/problem/471/E) |
| 8 | MUH and Lots and Lots of Segments | Geometry + sweep line | [471F](https://codeforces.com/problemset/problem/471/F) |
| 9 | Gargari and Bishops | Chess + optimization | [463C](https://codeforces.com/problemset/problem/463/C) |
| 10 | Gargari and Permutations | LIS + graph | [463D](https://codeforces.com/problemset/problem/463/D) |
| 11 | Gargari and Bishops | Chess + optimization | [463E](https://codeforces.com/problemset/problem/463/E) |
| 12 | Gargari and Graph | Graph theory | [463F](https://codeforces.com/problemset/problem/463/F) |

###🟠 1200-1400 (Advanced - Complex Applications)
> Target: Solve 8+ problems with 65%+ success rate

| # | Problem | Key Concept | Link |
|---|---------|-------------|------|
| 1 | DZY Loves Fibonacci Numbers | Matrix exponentiation | [446C](https://codeforces.com/problemset/problem/446/C) |
| 2 | Little Pony and Summer Sun Celebration | Graph + constructive | [453B](https://codeforces.com/problemset/problem/453/B) |
| 3 | Little Pony and Harmony Chest | Bitmask + DP | [453C](https://codeforces.com/problemset/problem/453/C) |
| 4 | Little Pony and Elements | Linear algebra + greedy | [453D](https://codeforces.com/problemset/problem/453/D) |
| 5 | Little Pony and Lord Tirek | Simulation + optimization | [453E](https://codeforces.com/problemset/problem/453/E) |
| 6 | Little Pony and Expected Maximum | Probability + linearity | [453A](https://codeforces.com/problemset/problem/453/A) |
| 7 | MUH and Important Things | Sorting with criteria | [471B](https://codeforces.com/problemset/problem/471/B) |
| 8 | MUH and Cube Walls | String matching + KMP | [471C](https://codeforces.com/problemset/problem/471/C) |

---

##📊 Progress Tracking

### Mastery Levels
- **🟢 Beginner**: Solve 10+ basic number theory problems
- **🟡 Competent**: Solve 15+ problems with 80%+ success
- **🟠 Proficient**: Solve 20+ problems across difficulties
- **🔴 Expert**: Apply to complex algorithms

### Key Skills Checklist
□ Prime number generation
□ Prime factorization
□ GCD/LCM computation
□ Modular arithmetic
□ Fast exponentiation
□ Modular inverse
□ Number theory proofs

### Weekly Goals
- **Week 1**: 10 basic problems (800-1000)
- **Week 2**: 8 intermediate problems (1000-1200)
- **Week 3**: 5 advanced problems (1200-1400)
- **Week 4**: Mixed practice (10 problems)

---

##🎯 Practice Strategy

### Number Theory Problem Framework:
1. **Identify**: What number theory concept applies?
2. **Apply**: Use appropriate algorithm/theorem
3. **Optimize**: Consider time complexity
4. **Verify**: Check edge cases
5. **Prove**: Understand why it works

### Common Patterns:
□ Prime checking and generation
□ GCD/LCM properties
□ Modular arithmetic
□ Number theory constructions
□ Mathematical proofs

---

##🏆 Achievement Badges

**🔢 Number Theory Novice** - Solve 10 basic problems
**🧮 Math Master** - Solve 15 intermediate problems
**🔍 Theorem Prover** - Solve 5 advanced problems
**🎯 Pattern Recognizer** - Identify 3 new applications

Number theory is beautiful and powerful. Master these concepts and you'll solve many contest problems elegantly!