#🔄 Sorting & Two Pointers (50-100 Problems)

> **Sorting unlocks 70% of competitive programming problems. Two pointers provide O(n) solutions to many array problems. Master these together and your problem-solving speed will double.**

---

##📚 Study Material: Core Concepts

### 1. Sorting in Python
```python
# Basic sorting
a = [3, 1, 4, 1, 5, 9]
a.sort()                    # In-place: [1, 1, 3, 4, 5, 9]
b = sorted(a)               # Returns new list
a.sort(reverse=True)        # Descending: [9, 5, 4, 3, 1, 1]

# Custom key sorting
words = ["banana", "pie", "apple"]
words.sort(key=len)         # By length: ['pie', 'apple', 'banana']
words.sort(key=lambda x: -len(x))  # Longest first

# Multiple criteria
students = [("Alice", 90), ("Bob", 85), ("Charlie", 90)]
students.sort(key=lambda x: (-x[1], x[0]))  # Grade desc, name asc

# Sorting pairs by second element
pairs = [(3, 2), (1, 4), (2, 1)]
pairs.sort(key=lambda x: x[1])  # [(2,1), (3,2), (1,4)]
```

### 2. Two Pointers Patterns

**Pattern 1: Opposite Direction (Sorted Array)**
```python
# Find pair with sum = target
a.sort()
left, right = 0, n - 1
while left < right:
    s = a[left] + a[right]
    if s == target:
        return True
    elif s < target:
        left += 1
    else:
        right -= 1
```

**Pattern 2: Same Direction (Sliding Window)**
```python
# Longest subarray with sum <= S
left = 0
window_sum = 0
max_length = 0
for right in range(n):
    window_sum += a[right]
    while window_sum > S:
        window_sum -= a[left]
        left += 1
    max_length = max(max_length, right - left + 1)
```

**Pattern 3: Fixed-Size Window**
```python
# Maximum sum of k consecutive elements
window_sum = sum(a[:k])
max_sum = window_sum
for i in range(k, n):
    window_sum += a[i] - a[i-k]
    max_sum = max(max_sum, window_sum)
```

### 3. When to Sort?
**Sort when:**
✅ Problem doesn't depend on original order
✅ You need binary search (requires sorted data)
✅ Two pointers approach applies
✅ Greedy strategy works better on sorted data
✅ Adjacent comparisons are needed

**Don't sort when:**
❌ Original order matters for the answer
❌ You need to preserve indices
❌ Problem is about permutations/positions

### 4. Key Insights

**Sorting Benefits:**
- Enables binary search (O(log n) lookups)
- Makes two pointers work (O(n) solutions)
- Reveals greedy structures
- Simplifies adjacent comparisons
- Groups similar elements together

**Two Pointers Benefits:**
- Linear time O(n) instead of O(n²)
- Space efficient O(1) extra space
- Elegant solutions for many problems
- Works with sorted arrays/sequences

---

##🎯 Problem Sets by Difficulty

### 800-900 (Easy - Basic Sorting)
> Target: Solve 15+ problems with 90%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | Twins | Sort + greedy sum | [160A](https://codeforces.com/problemset/problem/160/A) |
| 2 | Dragons | Sort by strength | [230A](https://codeforces.com/problemset/problem/230/A) |
| 3 | Gravity Flip | Sort effect | [405A](https://codeforces.com/problemset/problem/405/A) |
| 4 | Sereja and Dima | Two pointers from ends | [381A](https://codeforces.com/problemset/problem/381/A) |
| 5 | Present from Lena | Pattern construction | [118B](https://codeforces.com/problemset/problem/118/B) |
| 6 | Arrival of the General | Min/max positions | [144A](https://codeforces.com/problemset/problem/144/A) |
| 7 | Queue at the School | Simulation with sorting | [266B](https://codeforces.com/problemset/problem/266/B) |
| 8 | Helpful Maths | Digit sorting | [339A](https://codeforces.com/problemset/problem/339/A) |
| 9 | Taxi | Grouping optimization | [158B](https://codeforces.com/problemset/problem/158/B) |
| 10 | Football | Consecutive pattern | [96A](https://codeforces.com/problemset/problem/96/A) |
| 11 | Dubstep | String processing | [208A](https://codeforces.com/problemset/problem/208/A) |
| 12 | Xenia and Ringroad | Modular arithmetic | [339B](https://codeforces.com/problemset/problem/339/B) |
| 13 | Vanya and Fence | Count with threshold | [677A](https://codeforces.com/problemset/problem/677/A) |
| 14 | Lucky Division | Divisibility check | [122A](https://codeforces.com/problemset/problem/122/A) |
| 15 | Life Without Zeros | String number processing | [75A](https://codeforces.com/problemset/problem/75/A) |

###🟡 900-1100 (Medium - Two Pointers)
> Target: Solve 20+ problems with 80%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | Books | Sliding window | [279B](https://codeforces.com/problemset/problem/279/B) |
| 2 | Little Girl and Maximum Sum | Difference array | [276C](https://codeforces.com/problemset/problem/276/C) |
| 3 | DZY Loves Strings | Weight assignment | [447B](https://codeforces.com/problemset/problem/447/B) |
| 4 | Sereja and Bottles | Simulation + counting | [315A](https://codeforces.com/problemset/problem/315/A) |
| 5 | Sereja and Suffixes | Set + reverse processing | [368B](https://codeforces.com/problemset/problem/368/B) |
| 6 | Sereja and Algorithm | String transformation | [367A](https://codeforces.com/problemset/problem/367/A) |
| 7 | Sereja and Swaps | Brute force + optimization | [425A](https://codeforces.com/problemset/problem/425/A) |
| 8 | Sereja and Prefixes | Data structure simulation | [380A](https://codeforces.com/problemset/problem/380/A) |
| 9 | Sereja and Brackets | Stack + counting | [380C](https://codeforces.com/problemset/problem/380/C) |
| 10 | Sereja and Periods | String period detection | [314B](https://codeforces.com/problemset/problem/314/B) |
| 11 | Sereja and Subsequences | Combinatorics | [314C](https://codeforces.com/problemset/problem/314/C) |
| 12 | Sereja and Two Sequences | Greedy + simulation | [425B](https://codeforces.com/problemset/problem/425/B) |
| 13 | Sereja and Sets | Bitmask + brute force | [425C](https://codeforces.com/problemset/problem/425/C) |
| 14 | Sereja and the Arrangement of Numbers | Graph theory | [314D](https://codeforces.com/problemset/problem/314/D) |
| 15 | Sereja and Squares | Geometry + implementation | [425D](https://codeforces.com/problemset/problem/425/D) |
| 16 | Sereja and Intervals | Combinatorics + DP | [367D](https://codeforces.com/problemset/problem/367/D) |
| 17 | Sereja and Cinema | Simulation + optimization | [380B](https://codeforces.com/problemset/problem/380/B) |
| 18 | Sereja and Tree | Tree + implementation | [380D](https://codeforces.com/problemset/problem/380/D) |
| 19 | Sereja and GCD | Number theory + greedy | [425E](https://codeforces.com/problemset/problem/425/E) |
| 20 | Sereja and Two Permutations | Permutation + greedy | [425F](https://codeforces.com/problemset/problem/425/F) |

###🟠 1100-1300 (Hard - Advanced Applications)
> Target: Solve 15+ problems with 70%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | DZY Loves Sequences | Longest increasing subsequence | [446A](https://codeforces.com/problemset/problem/446/A) |
| 2 | DZY Loves Modification | Prefix sums + optimization | [446B](https://codeforces.com/problemset/problem/446/B) |
| 3 | DZY Loves Colors | Segment tree simulation | [444C](https://codeforces.com/problemset/problem/444/C) |
| 4 | DZY Loves Fibonacci Numbers | Matrix exponentiation | [446C](https://codeforces.com/problemset/problem/446/C) |
| 5 | Little Girl and Maximum XOR | Bit manipulation | [276D](https://codeforces.com/problemset/problem/276/D) |
| 6 | Caesar's Legions | DP + combinatorics | [118D](https://codeforces.com/problemset/problem/118/D) |
| 7 | Polo the Penguin and Matrix | Modular arithmetic | [289B](https://codeforces.com/problemset/problem/289/B) |
| 8 | Sereja and Suffixes | Set + suffix processing | [368B](https://codeforces.com/problemset/problem/368/B) |
| 9 | Sereja and Bottles | Simulation + counting | [315A](https://codeforces.com/problemset/problem/315/A) |
| 10 | Sereja and Algorithm | String transformation | [367A](https://codeforces.com/problemset/problem/367/A) |
| 11 | Sereja and Swaps | Brute force + optimization | [425A](https://codeforces.com/problemset/problem/425/A) |
| 12 | Sereja and Prefixes | Data structure simulation | [380A](https://codeforces.com/problemset/problem/380/A) |
| 13 | Sereja and Brackets | Stack + counting | [380C](https://codeforces.com/problemset/problem/380/C) |
| 14 | Sereja and Periods | String period detection | [314B](https://codeforces.com/problemset/problem/314/B) |
| 15 | Sereja and Subsequences | Combinatorics | [314C](https://codeforces.com/problemset/problem/314/C) |

---

##📊 Progress Tracking

### Mastery Levels
- **🟢 Beginner**: Solved 10+ basic sorting problems
- **🟡 Competent**: Solved 20+ two pointers problems with 80%+ success
- **🟠 Proficient**: Solved 30+ problems across all difficulties
- **🔴 Expert**: Can identify when to sort and apply two pointers for new problems

### Pattern Recognition Score
Rate yourself 1-5 on:
1. **When to Sort**: Recognize when sorting helps
2. **Pointer Movement**: Know how to move pointers
3. **Window Management**: Handle sliding window conditions
4. **Optimization**: Find most efficient approach
5. **Edge Cases**: Handle boundary conditions

### Weekly Goals
- **Week 1**: 10 basic sorting problems (800-900)
- **Week 2**: 12 two pointers problems (900-1100)
- **Week 3**: 8 advanced problems (1100-1300)
- **Week 4**: Mixed review (15 problems)

---

##🎯 Practice Strategy

### Sorting Problem Solving Framework:
1. **Identify**: Does original order matter?
2. **Sort Criteria**: What should I sort by?
3. **Pattern**: Which sorting pattern applies?
4. **Implementation**: Code the solution
5. **Optimize**: Can I avoid full sort?

### Two Pointers Framework:
1. **Check**: Is array sorted or can be sorted?
2. **Pattern**: Opposite/same direction/fixed window?
3. **Condition**: What's the window constraint?
4. **Movement**: How do pointers move?
5. **Result**: What am I tracking?

### Common Patterns to Master:
□ **Sort + Greedy**: Items with weights/values
□ **Sort + Two Pointers**: Pair problems
□ **Sort + Binary Search**: Range queries
□ **Sliding Window**: Subarray problems
□ **Two Pointers on Strings**: Palindrome, subsequence

### Red Flags:
❌ Don't sort when order matters
❌ Don't use two pointers on unsorted data (unless you sort first)
❌ Watch for off-by-one errors
❌ Handle duplicate elements carefully

---

##🏆 Achievement Badges

**🔄 Sort Master** - Solve 10 basic sorting problems
**🎯 Pointer Pro** - Solve 20 two pointers problems with 85%+ success
**⚡ Optimization Expert** - Solve 30+ problems efficiently
**🔍 Pattern Finder** - Identify sorting/two pointers patterns in new problems
**🏆 Speed Champion** - Solve 5 sorting problems in < 30 minutes

Mastering sorting and two pointers is essential for contest success. Start with basic patterns and build up to complex applications!