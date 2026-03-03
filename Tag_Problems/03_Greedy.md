#🧠 Greedy Algorithms (50-100 Problems)

> **Make the locally optimal choice at each step. When it works, greedy algorithms are elegant and fast. Master the patterns and you'll solve 60% of 1000-1400 rated problems.**

---

##📚 Study Material: Greedy Algorithm Patterns

### What Makes a Problem Greedy?
A problem has a **greedy solution** when:
1. **Optimal substructure**: Optimal solution contains optimal sub-solutions
2. **Greedy choice property**: Local optimum leads to global optimum
3. **No reconsideration needed**: Once you make a choice, it's final

### Key Greedy Patterns

**Pattern 1: Take the Best Available**
```python
# Problem: Maximum items with budget constraint
prices.sort()  # Sort by cost (ascending)
count = 0
for price in prices:
    if budget >= price:
        budget -= price
        count += 1
    else:
        break
```

**Pattern 2: Process Extremes First**
```python
# Problem: Pair elements to minimize maximum sum
a.sort()
max_sum = 0
for i in range(n // 2):
    max_sum = max(max_sum, a[i] + a[n-1-i])
```

**Pattern 3: Activity Selection**
```python
# Problem: Maximum non-overlapping intervals
intervals.sort(key=lambda x: x[1])  # Sort by end time
count = 1
last_end = intervals[0][1]
for start, end in intervals[1:]:
    if start >= last_end:
        count += 1
        last_end = end
```

**Pattern 4: Exchange Argument**
To prove a greedy works:
1. Assume optimal solution exists with different ordering
2. Show that swapping adjacent elements maintains or improves solution
3. Therefore, greedy ordering is optimal

**Pattern 5: Scheduling with Deadlines**
```python
# Sort by deadline, use priority queue to manage capacity
tasks.sort(key=lambda x: x.deadline)
pq = []  # min heap of durations
for task in tasks:
    heapq.heappush(pq, task.duration)
    if sum(pq) > task.deadline:
        heapq.heappop(pq)  # Remove longest task
```

### When NOT to Use Greedy
❌ Problems requiring global optimization (use DP instead)
❌ Problems where local choice affects future options
❌ Problems with complex constraints that interact
❌ When you can't prove the greedy choice property

---

##🎯 Problem Sets by Difficulty

### 800-900 (Easy - Basic Greedy)
> Target: Solve 15+ problems with 90%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | Twins | Sort + greedy sum | [160A](https://codeforces.com/problemset/problem/160/A) |
| 2 | Dragons | Sort by strength + simulation | [230A](https://codeforces.com/problemset/problem/230/A) |
| 3 | Vanya and Lanterns | Binary search on answer | [492B](https://codeforces.com/problemset/problem/492/B) |
| 4 | Sereja and Dima | Two pointers greedy | [381A](https://codeforces.com/problemset/problem/381/A) |
| 5 | Gravity Flip | Sort effect simulation | [405A](https://codeforces.com/problemset/problem/405/A) |
| 6 | Vanya and Fence | Count with threshold | [677A](https://codeforces.com/problemset/problem/677/A) |
| 7 | Arrival of the General | Min/max positions | [144A](https://codeforces.com/problemset/problem/144/A) |
| 8 | Present from Lena | Pattern construction | [118B](https://codeforces.com/problemset/problem/118/B) |
| 9 | Xenia and Ringroad | Modular arithmetic + greedy | [339B](https://codeforces.com/problemset/problem/339/B) |
| 10 | Football | Consecutive pattern | [96A](https://codeforces.com/problemset/problem/96/A) |
| 11 | Lucky Division | Divisibility check | [122A](https://codeforces.com/problemset/problem/122/A) |
| 12 | Queue at the School | Simulation | [266B](https://codeforces.com/problemset/problem/266/B) |
| 13 | Taxi | Grouping optimization | [158B](https://codeforces.com/problemset/problem/158/B) |
| 14 | Helpful Maths | Digit sorting | [339A](https://codeforces.com/problemset/problem/339/A) |
| 15 | Dubstep | String processing | [208A](https://codeforces.com/problemset/problem/208/A) |

###🟡 900-1100 (Medium - Pattern Recognition)
> Target: Solve 20+ problems with 80%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | Little Girl and Maximum Sum | Difference array + greedy | [276C](https://codeforces.com/problemset/problem/276/C) |
| 2 | DZY Loves Strings | Weight assignment | [447B](https://codeforces.com/problemset/problem/447/B) |
| 3 | Sereja and Bottles | Simulation + counting | [315A](https://codeforces.com/problemset/problem/315/A) |
| 4 | Sereja and Suffixes | Set + reverse processing | [368B](https://codeforces.com/problemset/problem/368/B) |
| 5 | Sereja and Algorithm | String transformation | [367A](https://codeforces.com/problemset/problem/367/A) |
| 6 | Sereja and Swaps | Brute force + optimization | [425A](https://codeforces.com/problemset/problem/425/A) |
| 7 | Sereja and Prefixes | Data structure simulation | [380A](https://codeforces.com/problemset/problem/380/A) |
| 8 | Sereja and Brackets | Stack + counting | [380C](https://codeforces.com/problemset/problem/380/C) |
| 9 | Sereja and Periods | String period detection | [314B](https://codeforces.com/problemset/problem/314/B) |
| 10 | Sereja and Subsequences | Combinatorics | [314C](https://codeforces.com/problemset/problem/314/C) |
| 11 | Sereja and Two Sequences | Greedy + simulation | [425B](https://codeforces.com/problemset/problem/425/B) |
| 12 | Sereja and Sets | Bitmask + brute force | [425C](https://codeforces.com/problemset/problem/425/C) |
| 13 | Sereja and the Arrangement of Numbers | Graph theory | [314D](https://codeforces.com/problemset/problem/314/D) |
| 14 | Sereja and Squares | Geometry + implementation | [425D](https://codeforces.com/problemset/problem/425/D) |
| 15 | Sereja and Intervals | Combinatorics + DP | [367D](https://codeforces.com/problemset/problem/367/D) |
| 16 | Sereja and Cinema | Simulation + optimization | [380B](https://codeforces.com/problemset/problem/380/B) |
| 17 | Sereja and Tree | Tree + implementation | [380D](https://codeforces.com/problemset/problem/380/D) |
| 18 | Sereja and GCD | Number theory + greedy | [425E](https://codeforces.com/problemset/problem/425/E) |
| 19 | Sereja and Two Permutations | Permutation + greedy | [425F](https://codeforces.com/problemset/problem/425/F) |
| 20 | Sereja and Tree 2 | Tree + greedy | [425G](https://codeforces.com/problemset/problem/425/G) |

###🟠 1100-1300 (Hard - Advanced Greedy)
> Target: Solve 15+ problems with 70%+ success rate

| # | Problem | Key Pattern | Link |
|---|---------|-------------|------|
| 1 | DZY Loves Sequences | Longest increasing subsequence variation | [446A](https://codeforces.com/problemset/problem/446/A) |
| 2 | DZY Loves Modification | Prefix sums + optimization | [446B](https://codeforces.com/problemset/problem/446/B) |
| 3 | DZY Loves Colors | Segment tree simulation | [444C](https://codeforces.com/problemset/problem/444/C) |
| 4 | DZY Loves Fibonacci Numbers | Matrix exponentiation | [446C](https://codeforces.com/problemset/problem/446/C) |
| 5 | Little Pony and Summer Sun Celebration | Graph + constructive | [453B](https://codeforces.com/problemset/problem/453/B) |
| 6 | Little Pony and Harmony Chest | Bitmask + DP | [453C](https://codeforces.com/problemset/problem/453/C) |
| 7 | Little Pony and Elements | Linear algebra + greedy | [453D](https://codeforces.com/problemset/problem/453/D) |
| 8 | Little Pony and Lord Tirek | Simulation + optimization | [453E](https://codeforces.com/problemset/problem/453/E) |
| 9 | Little Pony and Expected Maximum | Probability + linearity | [453A](https://codeforces.com/problemset/problem/453/A) |
| 10 | MUH and Important Things | Sorting with criteria | [471B](https://codeforces.com/problemset/problem/471/B) |
| 11 | MUH and Cube Walls | String matching + KMP | [471C](https://codeforces.com/problemset/problem/471/C) |
| 12 | MUH and House of Cards | Mathematical optimization | [471D](https://codeforces.com/problemset/problem/471/D) |
| 13 | MUH and Sticks | Geometric + greedy | [471E](https://codeforces.com/problemset/problem/471/E) |
| 14 | MUH and Lots and Lots of Segments | Geometry + sweep line | [471F](https://codeforces.com/problemset/problem/471/F) |
| 15 | Gargari and Bishops | Chess + optimization | [463C](https://codeforces.com/problemset/problem/463/C) |

---

##📊 Progress Tracking

### Mastery Levels
- **🟢 Novice**: Solved 10+ basic greedy problems
- **🟡 Apprentice**: Solved 20+ medium problems with 80%+ success
- **🟠 Expert**: Solved 30+ problems across all difficulties
- **🔴 Master**: Can identify and prove greedy solutions for new problems

### Pattern Recognition Score
For each problem, rate yourself 1-5 on:
1. **Pattern Identification**: Recognize the greedy pattern
2. **Implementation**: Code the solution correctly
3. **Proof**: Explain why the greedy works
4. **Optimization**: Find the most efficient approach

### Weekly Goals
- **Week 1**: 8 basic problems (800-900)
- **Week 2**: 10 medium problems (900-1100)
- **Week 3**: 7 hard problems (1100-1300)
- **Week 4**: Mixed review (12 problems)

---

##🎯 Practice Strategy

### Greedy Problem Solving Framework:
1. **Identify**: Is this a greedy problem? (Look for optimization with local choices)
2. **Pattern**: Which greedy pattern applies?
3. **Sort**: Do I need to sort the input? By what criteria?
4. **Greedy Choice**: What's my locally optimal choice?
5. **Proof**: Why does this choice lead to global optimum?
6. **Implement**: Code the solution
7. **Verify**: Test with edge cases

### Common Greedy Patterns Checklist:
□ **Sorting required** - items, deadlines, weights
□ **Process extremes first** - min/max, earliest/latest
□ **Accumulation** - sum, count, collect
□ **Scheduling** - intervals, deadlines, resources
□ **Exchange argument** - can I prove it's optimal?

### Red Flags (When NOT to use greedy):
❌ Complex constraints that interact
❌ When choice affects future options
❌ When local optimum ≠ global optimum
❌ When you can't prove the greedy property

---

##🏆 Achievement Badges

**🧠 Greedy Thinker** - Solve 10 basic greedy problems
**🎯 Optimal Selector** - Solve 20 medium problems with 85%+ success
**⚡ Efficient Allocator** - Solve 30+ problems across difficulties
**🔍 Pattern Master** - Identify greedy patterns in 5 new problems
**🏆 Strategy Pro** - Prove why greedy solutions work

Mastering greedy algorithms will dramatically improve your contest performance. Start with basic patterns and work up to complex proofs!