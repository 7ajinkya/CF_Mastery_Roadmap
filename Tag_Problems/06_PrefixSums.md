#📊 Prefix Sums & Difference Arrays (30-50 Problems)

> **O(1) range queries and O(1) range updates. Master these and 50% of array problems become trivial. Essential for 1000+ rating problems.**

---

##📚 Study Material: Core Techniques

### 1. Prefix Sums
**Idea**: Precompute cumulative sums for fast range queries.

```python
# Build prefix sum array
a = [3, 1, 4, 1, 5, 9]
n = len(a)

# Method 1: Manual
prefix = [0] * (n + 1)
for i in range(n):
    prefix[i + 1] = prefix[i] + a[i]
# prefix = [0, 3, 4, 8, 9, 14, 23]

# Method 2: Using itertools
from itertools import accumulate
prefix = [0] + list(accumulate(a))

# Query: sum of range [l, r] (0-indexed)
def range_sum(l, r):
    return prefix[r + 1] - prefix[l]

range_sum(1, 3)  # a[1] + a[2] + a[3] = 1 + 4 + 1 = 6
```

### 2. Difference Arrays
**Idea**: Reverse of prefix sum. O(1) range updates, then prefix sum to get actual values.

```python
# Apply +v to range [l, r] (0-indexed)
diff = [0] * (n + 1)
diff[l] += v
diff[r + 1] -= v

# Get actual values (prefix sum of difference array)
from itertools import accumulate
actual = list(accumulate(diff[:n]))

# Example: Add 5 to range [1, 3]
diff = [0, 0, 5, 0, 0, -5, 0]  # after operations
actual = [0, 0, 5, 5, 5, 0, 0]  # after accumulate
```

### 3. 2D Prefix Sums
**For matrix range sum queries:**

```python
# Build 2D prefix sum
def build_2d_prefix(grid):
    rows, cols = len(grid), len(grid[0])
    prefix = [[0] * (cols + 1) for _ in range(rows + 1)]
    
    for i in range(rows):
        for j in range(cols):
            prefix[i + 1][j + 1] = (grid[i][j] + 
                                  prefix[i + 1][j] + 
                                  prefix[i][j + 1] - 
                                  prefix[i][j])
    return prefix

# Query rectangle sum: [r1,c1] to [r2,c2]
def range_sum_2d(prefix, r1, c1, r2, c2):
    return (prefix[r2 + 1][c2 + 1] - 
            prefix[r1][c2 + 1] - 
            prefix[r2 + 1][c1] + 
            prefix[r1][c1])
```

### 4. Key Use Cases

**Pattern 1: Range Sum Queries**
- Count subarrays with sum = k
- Number of equal prefix sums
- Subarray divisibility by K

**Pattern 2: Range Updates**
- Multiple add operations to ranges
- Lazy propagation concepts
- Sweep line algorithms

**Pattern 3: Contribution Counting**
- Each element contributes to multiple subarrays
- Count of valid intervals
- Expected values

### 5. Implementation Template
```python
from collections import defaultdict

# Subarrays with sum = k
def count_subarrays_sum_k(a, k):
    prefix_sum = 0
    count = 0
    seen = defaultdict(int)
    seen[0] = 1
    
    for x in a:
        prefix_sum += x
        # Check if (current_sum - k) existed
        count += seen[prefix_sum - k]
        seen[prefix_sum] += 1
    
    return count
```

---

##🎯 Problem Sets by Difficulty

### 800-1000 (Basic - Build Foundation)
> Target: Solve 12+ problems with 85%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | Maximum Sum Subarray | Basic prefix sums | [453A](https://codeforces.com/problemset/problem/453/A) |
| 2 | Find All Prefix Sum Integers | Constructive prefix | [9A](https://codeforces.com/problemset/problem/9/A) |
| 3 | Simplest Sum | Pattern recognition | [160A](https://codeforces.com/problemset/problem/160/A) |
| 4 | Array Subsequence | Prefix sum counting | [231A](https://codeforces.com/problemset/problem/231/A) |
| 5 | Sum of Subarray | Basic range sum | [263A](https://codeforces.com/problemset/problem/263/A) |
| 6 | Prefix Max | Running maximum | [276A](https://codeforces.com/problemset/problem/276/A) |
| 7 | Subsequence Count | Counting with prefix | [315A](https://codeforces.com/problemset/problem/315/A) |
| 8 | Array Division | Partition with prefix | [381A](https://codeforces.com/problemset/problem/381/A) |
| 9 | Good Subarrays | Prefix sum + counting | [446A](https://codeforces.com/problemset/problem/446/A) |
| 10 | Number of Ways | Prefix sum counting | [466C](https://codeforces.com/problemset/problem/466/C) |
| 11 | Little Girl and Maximum Sum | Difference array | [276C](https://codeforces.com/problemset/problem/276/C) |
| 12 | Kuriyama Mirai's Stones | Sort + prefix sum | [433B](https://codeforces.com/problemset/problem/433/B) |

###🟡 1000-1200 (Intermediate - Pattern Recognition)
> Target: Solve 15+ problems with 75%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | DZY Loves Sequences | LIS + prefix optimization | [446A](https://codeforces.com/problemset/problem/446/A) |
| 2 | DZY Loves Modification | 2D prefix + optimization | [446B](https://codeforces.com/problemset/problem/446/B) |
| 3 | DZY Loves Colors | Range updates + prefix | [444C](https://codeforces.com/problemset/problem/444/C) |
| 4 | DZY Loves Fibonacci Numbers | Matrix exponentiation | [446C](https://codeforces.com/problemset/problem/446/C) |
| 5 | Little Girl and Maximum XOR | Bit manipulation + prefix | [276D](https://codeforces.com/problemset/problem/276/D) |
| 6 | Caesar's Legions | DP + prefix counting | [118D](https://codeforces.com/problemset/problem/118/D) |
| 7 | Polo the Penguin and Matrix | Modular arithmetic | [289B](https://codeforces.com/problemset/problem/289/B) |
| 8 | Sereja and Suffixes | Set + reverse prefix | [368B](https://codeforces.com/problemset/problem/368/B) |
| 9 | Sereja and Bottles | Simulation + counting | [315A](https://codeforces.com/problemset/problem/315/A) |
| 10 | Sereja and Algorithm | String transformation | [367A](https://codeforces.com/problemset/problem/367/A) |
| 11 | Sereja and Swaps | Brute force + optimization | [425A](https://codeforces.com/problemset/problem/425/A) |
| 12 | Sereja and Prefixes | Data structure simulation | [380A](https://codeforces.com/problemset/problem/380/A) |
| 13 | Sereja and Brackets | Stack + counting | [380C](https://codeforces.com/problemset/problem/380/C) |
| 14 | Sereja and Periods | String period detection | [314B](https://codeforces.com/problemset/problem/314/B) |
| 15 | Sereja and Subsequences | Combinatorics | [314C](https://codeforces.com/problemset/problem/314/C) |

###🟠 1200-1400 (Advanced - Complex Applications)
> Target: Solve 8+ problems with 65%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | DZY Loves Colors | Segment tree + prefix | [444C](https://codeforces.com/problemset/problem/444/C) |
| 2 | DZY Loves Fibonacci Numbers | Matrix exponentiation | [446C](https://codeforces.com/problemset/problem/446/C) |
| 3 | Little Pony and Summer Sun Celebration | Graph + constructive | [453B](https://codeforces.com/problemset/problem/453/B) |
| 4 | Little Pony and Harmony Chest | Bitmask + DP | [453C](https://codeforces.com/problemset/problem/453/C) |
| 5 | Little Pony and Elements | Linear algebra + greedy | [453D](https://codeforces.com/problemset/problem/453/D) |
| 6 | Little Pony and Lord Tirek | Simulation + optimization | [453E](https://codeforces.com/problemset/problem/453/E) |
| 7 | Little Pony and Expected Maximum | Probability + linearity | [453A](https://codeforces.com/problemset/problem/453/A) |
| 8 | MUH and Important Things | Sorting with criteria | [471B](https://codeforces.com/problemset/problem/471/B) |

---

##📊 Progress Tracking

### Mastery Levels
- **🟢 Beginner**: Solve 10+ basic prefix sum problems
- **🟡 Competent**: Solve 15+ problems with 80%+ success
- **🟠 Proficient**: Solve 20+ problems across difficulties
- **🔴 Expert**: Apply to complex data structures

### Key Skills Checklist
□ Build prefix sum arrays
□ Answer range sum queries in O(1)
□ Apply difference arrays for range updates
□ Use hash maps with prefix sums
□ Handle 2D prefix sums
□ Apply to counting problems

### Weekly Goals
- **Week 1**: 8 basic problems (800-1000)
- **Week 2**: 10 intermediate problems (1000-1200)
- **Week 3**: 5 advanced problems (1200-1400)
- **Week 4**: Mixed practice (10 problems)

---

##🎯 Practice Strategy

### Prefix Sum Problem Framework:
1. **Identify**: Do I need range sum queries?
2. **Build**: Create prefix sum array
3. **Query**: Use prefix[r+1] - prefix[l]
4. **Optimize**: Use hash maps for counting
5. **Edge Cases**: Empty arrays, single elements

### Difference Array Framework:
1. **Identify**: Do I need to apply operations to ranges?
2. **Apply**: diff[l] += v, diff[r+1] -= v
3. **Recover**: prefix sum of difference array
4. **Query**: Use resulting values

### Common Patterns:
□ Subarray sum = k
□ Count equal prefix sums
□ Range updates with lazy propagation
□ 2D range queries
□ Contribution counting

---

##🏆 Achievement Badges

**📊 Sum Master** - Solve 10 basic prefix sum problems
**🔄 Range Expert** - Solve 15 difference array problems
**⚡ Query Pro** - Solve 5 range query problems in < 15 minutes
**🔍 Pattern Finder** - Identify 3 new prefix sum applications

Prefix sums and difference arrays are fundamental. Master these and you'll see immediate improvement in array problems!