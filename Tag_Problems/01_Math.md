#🧮: Math (50-100 Problems)

> **Master the foundation of competitive programming. Math problems appear in 80% of contests, especially in A/B positions.**

---

## 📚 Study Material: Essential Math Concepts

### 1. Integer Arithmetic & Modular Arithmetic
```python
# Floor Division (towards negative infinity)
7 // 2    # = 3
-7 // 2   # = -4

# Ceiling Division (without float precision loss)
def ceil_div(a, b):
    return (a + b - 1) // b

# Modular Arithmetic
(a + b) % MOD == ((a % MOD) + (b % MOD)) % MOD
(a * b) % MOD == ((a % MOD) * (b % MOD)) % MOD

# Common modulus
MOD = 10**9 + 7  # Prime number
```

### 2. GCD and LCM
```python
from math import gcd

def lcm(a, b):
    return a // gcd(a, b) * b  # Division first to avoid overflow

# GCD of multiple numbers
from functools import reduce
gcd_all = reduce(gcd, [a, b, c, d])
```

### 3. Parity (Odd/Even)
```python
# Check parity
if x % 2 == 0:  # even
if x % 2 == 1:  # odd

# Bitwise check (faster)
if x & 1 == 0:  # even
if x & 1:       # odd

# Key facts:
# odd + odd = even
# even + even = even  
# odd + even = odd
```

### 4. Powers of 2
```python
# Check if power of 2
def is_power_of_2(n):
    return n > 0 and (n & (n - 1)) == 0

# Bit length
n.bit_length()  # 8 → 4, 16 → 5
```

### 5. Common Math Patterns

**Pattern 1: Sum Formulas**
- Sum 1..n = n(n+1)/2
- Sum of first n odd numbers = n²
- Sum of first n even numbers = n(n+1)

**Pattern 2: Counting Divisors**
```python
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
```

**Pattern 3: Parity Arguments**
- Total sum odd → odd count of odd numbers
- Can't split odd sum into two equal parts
- XOR preserves bit parity

---

##🎯 Problem Sets by Difficulty

### 800-900 (Easy - Build Foundation)
> Target: Solve 20+ problems with 90%+ success rate

| # | Problem | Key Concept | Link |
|---|---------|-------------|------|
| 1 | Watermelon | Parity | [4A](https://codeforces.com/problemset/problem/4/A) |
| 2 | Domino piling | Floor division | [50A](https://codeforces.com/problemset/problem/50/A) |
| 3 | Bear and Big Brother | Multiplication loop | [791A](https://codeforces.com/problemset/problem/791/A) |
| 4 | Soldier and Bananas | Sum formula | [546A](https://codeforces.com/problemset/problem/546/A) |
| 5 | Elephant | Ceiling division | [617A](https://codeforces.com/problemset/problem/617/A) |
| 6 | Insomnia Cure | Inclusion-exclusion | [148A](https://codeforces.com/problemset/problem/148/A) |
| 7 | IQ Test | Parity detection | [25A](https://codeforces.com/problemset/problem/25/A) |
| 8 | Young Physicist | Vector sum = 0 | [69A](https://codeforces.com/problemset/problem/69/A) |
| 9 | Even Odds | Position formula | [318A](https://codeforces.com/problemset/problem/318/A) |
| 10 | Die Roll | Probability counting | [9A](https://codeforces.com/problemset/problem/9/A) |
| 11 | Presents | Permutation mapping | [136A](https://codeforces.com/problemset/problem/136/A) |
| 12 | Twins | Greedy + sum | [160A](https://codeforces.com/problemset/problem/160/A) |
| 13 | Tram | Maximum prefix sum | [116A](https://codeforces.com/problemset/problem/116/A) |
| 14 | Calculating Function | Pattern recognition | [486A](https://codeforces.com/problemset/problem/486/A) |
| 15 | Cakeminator | Grid counting | [330A](https://codeforces.com/problemset/problem/330/A) |
| 16 | Arrival of the General | Min/max positions | [144A](https://codeforces.com/problemset/problem/144/A) |
| 17 | Queue at the School | Simulation | [266B](https://codeforces.com/problemset/problem/266/B) |
| 18 | Lights Out | XOR properties | [275A](https://codeforces.com/problemset/problem/275/A) |
| 19 | Word | String case conversion | [59A](https://codeforces.com/problemset/problem/59/A) |
| 20 | Dubstep | String processing | [208A](https://codeforces.com/problemset/problem/208/A) |
| 21 | Helpful Maths | Sorting digits | [339A](https://codeforces.com/problemset/problem/339/A) |
| 22 | Xenia and Ringroad | Modular arithmetic | [339B](https://codeforces.com/problemset/problem/339/B) |
| 23 | Football | Consecutive characters | [96A](https://codeforces.com/problemset/problem/96/A) |
| 24 | Nearly Lucky Number | Digit counting | [110A](https://codeforces.com/problemset/problem/110/A) |
| 25 | Lucky Division | Divisibility check | [122A](https://codeforces.com/problemset/problem/122/A) |

###🟡 900-1100 (Medium - Build Speed)
> Target: Solve 25+ problems with 80%+ success rate

| # | Problem | Key Concept | Link |
|---|---------|-------------|------|
| 1 | Dragons | Sorting + simulation | [230A](https://codeforces.com/problemset/problem/230/A) |
| 2 | Vanya and Lanterns | Binary search on answer | [492B](https://codeforces.com/problemset/problem/492/B) |
| 3 | T-primes | Perfect squares | [230B](https://codeforces.com/problemset/problem/230/B) |
| 4 | k-th Not Divisible | Math formula | [1352C](https://codeforces.com/problemset/problem/1352/C) |
| 5 | Two Buttons | BFS/Reverse thinking | [520B](https://codeforces.com/problemset/problem/520/B) |
| 6 | Fedor and New Game | Bit counting | [467B](https://codeforces.com/problemset/problem/467/B) |
| 7 | DZY Loves Chessboard | Constructive | [445A](https://codeforces.com/problemset/problem/445/A) |
| 8 | Sereja and Dima | Two pointers | [381A](https://codeforces.com/problemset/problem/381/A) |
| 9 | Little Girl and Maximum Sum | Difference array | [276C](https://codeforces.com/problemset/problem/276/C) |
| 10 | Kuriyama Mirai's Stones | Prefix sums | [433B](https://codeforces.com/problemset/problem/433/B) |
| 11 | Caisa and Pylons | Energy conservation | [463B](https://codeforces.com/problemset/problem/463/B) |
| 12 | George and Accommodation | Interval counting | [467A](https://codeforces.com/problemset/problem/467/A) |
| 13 | Anton and Letters | Set operations | [443A](https://codeforces.com/problemset/problem/443/A) |
| 14 | Anton and Danik | Counting | [734A](https://codeforces.com/problemset/problem/734/A) |
| 15 | Anton and Polyhedrons | Lookup table | [785A](https://codeforces.com/problemset/problem/785/A) |
| 16 | Vanya and Fence | Counting with threshold | [677A](https://codeforces.com/problemset/problem/677/A) |
| 17 | Gravity Flip | Sorting effect | [405A](https://codeforces.com/problemset/problem/405/A) |
| 18 | Games | Nested loops counting | [268A](https://codeforces.com/problemset/problem/268/A) |
| 19 | Team Olympiad | Grouping | [490A](https://codeforces.com/problemset/problem/490/A) |
| 20 | Devu, the Singer and Churu, the Joker | Time calculation | [439A](https://codeforces.com/problemset/problem/439/A) |
| 21 | Ilya and Bank Account | Last digit manipulation | [313A](https://codeforces.com/problemset/problem/313/A) |
| 22 | Ilya and Queries | Prefix sums | [313B](https://codeforces.com/problemset/problem/313/B) |
| 23 | Roadside Trees | Simulation | [265B](https://codeforces.com/problemset/problem/265/B) |
| 24 | Fancy Fence | Geometry + math | [270A](https://codeforces.com/problemset/problem/270/A) |
| 25 | Ciel and Flowers | Case analysis | [322B](https://codeforces.com/problemset/problem/322/B) |

###🟠 1100-1300 (Hard - Contest Level)
> Target: Solve 15+ problems with 70%+ success rate

| # | Problem | Key Concept | Link |
|---|---------|-------------|------|
| 1 | Hamburgers | Binary search on answer | [371C](https://codeforces.com/problemset/problem/371/C) |
| 2 | DZY Loves Sequences | Longest increasing subsequence variation | [446A](https://codeforces.com/problemset/problem/446/A) |
| 3 | Good Sequences | DP + number theory | [264B](https://codeforces.com/problemset/problem/264/B) |
| 4 | Prime Matrix | Sieve + matrix manipulation | [271B](https://codeforces.com/problemset/problem/271/B) |
| 5 | Little Pony and Expected Maximum | Probability + linearity of expectation | [453A](https://codeforces.com/problemset/problem/453/A) |
| 6 | MUH and Important Things | Sorting with multiple criteria | [471B](https://codeforces.com/problemset/problem/471/B) |
| 7 | DZY Loves Modification | Prefix sums + optimization | [446B](https://codeforces.com/problemset/problem/446/B) |
| 8 | Counting Rectangles | Combinatorics + geometry | [277A](https://codeforces.com/problemset/problem/277/A) |
| 9 | Xenia and Weights | Bitmask + brute force | [339C](https://codeforces.com/problemset/problem/339/C) |
| 10 | Escape from Stones | Constructive + simulation | [264A](https://codeforces.com/problemset/problem/264/A) |
| 11 | Little Girl and Maximum XOR | Bit manipulation | [276D](https://codeforces.com/problemset/problem/276/D) |
| 12 | Caesar's Legions | DP + combinatorics | [118D](https://codeforces.com/problemset/problem/118/D) |
| 13 | Polo the Penguin and Matrix | Modular arithmetic + median | [289B](https://codeforces.com/problemset/problem/289/B) |
| 14 | Sereja and Suffixes | Set + suffix processing | [368B](https://codeforces.com/problemset/problem/368/B) |
| 15 | Sereja and Bottles | Simulation + counting | [315A](https://codeforces.com/problemset/problem/315/A) |

---

##📊 Progress Tracking

### Mastery Levels
- **🟢 Novice**: Solved 5-10 problems (800-900)
- **🟡 Apprentice**: Solved 15-20 problems (800-1100)  
- **🟠**: Solved 25+ problems (800-1300)
- **🔴 Advanced**: Solved 40+ problems with 85%+ success rate

### Weekly Goals
- **Week 1**: 8 problems (800-900 range)
- **Week 2**: 10 problems (900-1100 range)  
- **Week 3**: 7 problems (1100-1300 range)
- **Week 4**: Mixed review (15 problems)

### Confidence Checkpoints
After completing each level:
1. Can you solve any 800-rated math problem in < 10 minutes?
2. Do you recognize parity/gcd patterns immediately?
3. Can you derive formulas instead of memorizing them?
4. Do you feel confident in virtual contests A/B problems?

---

## 🎯 Practice Strategy

### For Each Problem:
1. **First Attempt**: Try without hints (15-20 min)
2. **If Stuck**: Read editorial first paragraph only
3. **Second Attempt**: Try again (10 min)
4. **If Still Stuck**: Read full solution, then implement from scratch
5. **Review**: Note the key insight for 30 seconds

### Spaced Repetition Schedule:
- **Day 1**: Solve new problem
- **Day 3**: Review same problem (2nd attempt)
- **Day 7**: Review again
- **Day 14**: Final review + similar problem

### Common Mistakes to Avoid:
- Using float for integer division
- Forgetting to mod results
- Off-by-one in loops
- Not handling edge cases (n=1, n=2)
- Overcomplicating simple formulas

---

##🏆 Achievement Badges

**🔢 Math Master** - Solve 10 problems rated 800-900
**🧮 Finder** - Solve 20 problems rated 900-1100  
**📊 Pattern Recognizer** - Solve 30 problems rated 1100-1300
**🎯 Precision Pro** - Maintain 90%+ success rate on 25+ problems
**⚡ Speed Demon** - Solve 5 math problems in < 30 minutes total

Start with the 800-900 section and work your way up. Math is the foundation - master this tag and you'll see immediate improvement in contest performance!