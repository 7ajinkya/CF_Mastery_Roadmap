#🔍 Binary Search (50-100 Problems)

> **Binary search isn't just for finding elements. It's a powerful framework for solving optimization problems. Master this and you'll solve 40% of 1200+ rated problems.**

---

##📚 Study Material: Binary Search Mastery

### 1. Basic Binary Search
```python
from bisect import bisect_left, bisect_right

# Find element
idx = bisect_left(a, x)     # First position where x can be inserted
idx = bisect_right(a, x)    # After last occurrence of x

# Check if exists
def binary_search(a, x):
    idx = bisect_left(a, x)
    return idx < len(a) and a[idx] == x

# Count elements in range
count = bisect_right(a, hi) - bisect_left(a, lo)
```

### 2. Manual Implementation (Essential)
```python
# Search for exact value
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Find first element >= target (lower_bound)
def lower_bound(arr, target):
    left, right = 0, len(arr)
    while left < right:
        mid = (left + right) // 2
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left
```

### 3. Binary Search on Answer (The Key Insight)
**Big Idea**: If you can check "is answer ≤ X?" efficiently, and the check is monotonic, you can binary search for X.

```python
def can_achieve(x):
    # Problem-specific: can we achieve answer x?
    # Return True if achievable, False otherwise
    pass

# Minimize maximum
left, right = 0, 10**18
while left < right:
    mid = (left + right) // 2
    if can_achieve(mid):
        right = mid    # Try smaller
    else:
        left = mid + 1 # Need larger
# left = answer

# Maximize minimum
left, right = 0, 10**18
while left < right:
    mid = (left + right + 1) // 2  # +1 for upper bound
    if can_achieve(mid):
        left = mid     # Try larger
    else:
        right = mid - 1 # Need smaller
# left = answer
```

### 4. Key Patterns

**Pattern 1: Minimize Maximum Value**
- "Distribute items to minimize maximum load"
- "Place routers to minimize maximum distance"
- Binary search on maximum value, check feasibility

**Pattern 2: Maximize Minimum Value**
- "Select k elements to maximize minimum distance"
- "Split array to maximize minimum subarray sum"
- Binary search on minimum value, check feasibility

**Pattern 3: Find First/Last Occurrence**
- Use `bisect_left` for first occurrence
- Use `bisect_right` for position after last occurrence

**Pattern 4: Continuous Domain**
- Binary search on real numbers
- Use fixed iterations (100) instead of epsilon
- More stable than floating-point comparisons

### 5. Common Applications

**Array Problems:**
- Find peak element
- Search in rotated sorted array
- Find kth element in two sorted arrays
- Capacity to ship packages

**Geometry/Physics:**
- Minimum radius for coverage
- Time to complete tasks
- Optimal meeting point

**Game Theory:**
- Nim-value calculation
- Strategy optimization

---

##🎯 Problem Sets by Difficulty

### 800-900 (Easy - Basic Search)
> Target: Solve 10+ problems with 90%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | Vanya and Lanterns | Binary search on answer | [492B](https://codeforces.com/problemset/problem/492/B) |
| 2 | Hamburgers | BS on answer + feasibility check | [371C](https://codeforces.com/problemset/problem/371/C) |
| 3 | Worms | Prefix sum + binary search | [474B](https://codeforces.com/problemset/problem/474/B) |
| 4 | Interesting Drink | Counting + binary search | [706B](https://codeforces.com/problemset/problem/706/B) |
| 5 | Simple Strings | Construction + binary search | [665C](https://codeforces.com/problemset/problem/665/C) |
| 6 | Find Amir | Mathematical + binary search | [804A](https://codeforces.com/problemset/problem/804/A) |
| 7 | Interview | Game theory + binary search | [622C](https://codeforces.com/problemset/problem/622/C) |
| 8 | Perfect Number | Precomputation + binary search | [919B](https://codeforces.com/problemset/problem/919/B) |
| 9 | Maximum Increase | Increasing subsequence | [702A](https://codeforces.com/problemset/problem/702/A) |
| 10 | k-Tree | DP + binary search | [431C](https://codeforces.com/problemset/problem/431/C) |

###🟡 900-1100 (Medium - Answer Search)
> Target: Solve 15+ problems with 80%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | Books | Sliding window + binary search | [279B](https://codeforces.com/problemset/problem/279/B) |
| 2 | Little Girl and Maximum Sum | Difference array + optimization | [276C](https://codeforces.com/problemset/problem/276/C) |
| 3 | DZY Loves Sequences | LIS variation + binary search | [446A](https://codeforces.com/problemset/problem/446/A) |
| 4 | DZY Loves Modification | Prefix sums + optimization | [446B](https://codeforces.com/problemset/problem/446/B) |
| 5 | DZY Loves Colors | Segment tree + binary search | [444C](https://codeforces.com/problemset/problem/444/C) |
| 6 | DZY Loves Fibonacci Numbers | Matrix exponentiation | [446C](https://codeforces.com/problemset/problem/446/C) |
| 7 | Little Girl and Maximum XOR | Bit manipulation | [276D](https://codeforces.com/problemset/problem/276/D) |
| 8 | Caesar's Legions | DP + combinatorics | [118D](https://codeforces.com/problemset/problem/118/D) |
| 9 | Polo the Penguin and Matrix | Modular arithmetic | [289B](https://codeforces.com/problemset/problem/289/B) |
| 10 | Sereja and Suffixes | Set + suffix processing | [368B](https://codeforces.com/problemset/problem/368/B) |
| 11 | Sereja and Bottles | Simulation + counting | [315A](https://codeforces.com/problemset/problem/315/A) |
| 12 | Sereja and Algorithm | String transformation | [367A](https://codeforces.com/problemset/problem/367/A) |
| 13 | Sereja and Swaps | Brute force + optimization | [425A](https://codeforces.com/problemset/problem/425/A) |
| 14 | Sereja and Prefixes | Data structure simulation | [380A](https://codeforces.com/problemset/problem/380/A) |
| 15 | Sereja and Brackets | Stack + counting | [380C](https://codeforces.com/problemset/problem/380/C) |

###🟠 1100-1300 (Hard - Advanced Applications)
> Target: Solve 10+ problems with 70%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | DZY Loves Colors | Segment tree + binary search | [444C](https://codeforces.com/problemset/problem/444/C) |
| 2 | DZY Loves Fibonacci Numbers | Matrix exponentiation | [446C](https://codeforces.com/problemset/problem/446/C) |
| 3 | Little Pony and Summer Sun Celebration | Graph + constructive | [453B](https://codeforces.com/problemset/problem/453/B) |
| 4 | Little Pony and Harmony Chest | Bitmask + DP | [453C](https://codeforces.com/problemset/problem/453/C) |
| 5 | Little Pony and Elements | Linear algebra + greedy | [453D](https://codeforces.com/problemset/problem/453/D) |
| 6 | Little Pony and Lord Tirek | Simulation + optimization | [453E](https://codeforces.com/problemset/problem/453/E) |
| 7 | Little Pony and Expected Maximum | Probability + linearity | [453A](https://codeforces.com/problemset/problem/453/A) |
| 8 | MUH and Important Things | Sorting with criteria | [471B](https://codeforces.com/problemset/problem/471/B) |
| 9 | MUH and Cube Walls | String matching + KMP | [471C](https://codeforces.com/problemset/problem/471/C) |
| 10 | MUH and House of Cards | Mathematical optimization | [471D](https://codeforces.com/problemset/problem/471/D) |

---

##📊 Progress Tracking

### Mastery Levels
- **🟢 Novice**: Solve 5+ basic binary search problems
- **🟡 Apprentice**: Solve 15+ problems with 80%+ success
- **🟠 Expert**: Solve 20+ problems across all difficulties
- **🔴 Master**: Identify and solve binary search on answer problems

### Key Skills Checklist
□ Find elements in sorted arrays
□ Count elements in range
□ Find first/last occurrence
□ Binary search on answer
□ Feasibility checking
□ Optimization problems
□ Continuous domain search

### Weekly Goals
- **Week 1**: 8 basic problems (800-900)
- **Week 2**: 10 answer search problems (900-1100)
- **Week 3**: 5 advanced problems (1100-1300)
- **Week 4**: Mixed review (10 problems)

---

##🎯 Practice Strategy

### Binary Search Problem Framework:
1. **Identify**: Is this a search problem or optimization?
2. **Search Space**: What's the range of possible answers?
3. **Monotonicity**: Does the check function increase/decrease?
4. **Check Function**: Can you verify if answer X is feasible?
5. **Boundary**: Be careful with left/right boundaries
6. **Edge Cases**: Handle empty arrays, single elements

### Common Pitfalls:
❌ Infinite loops with wrong mid calculation
❌ Wrong boundary updates
❌ Not handling equality cases
❌ Missing integer overflow checks
❌ Wrong comparison in check function

---

##🏆 Achievement Badges

**🔍 Search Novice** - Solve 5 basic binary search problems
**🎯 Optimization Expert** - Solve 15 answer search problems
**⚡ Speed Solver** - Solve 5 binary search problems in < 25 minutes
**🔍 Pattern Recognizer** - Identify 5 new binary search on answer problems

Binary search is a game-changing skill. Once you master "search on answer," many hard problems become approachable!