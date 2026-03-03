# 🧠 The CP Ideas Encyclopedia

> **The #1 difference between a Newbie and an Expert is the number of "ideas" they can reach for.**
> This is your complete reference of every competitive programming idea, trick, and mental model you'll ever need.

---

## How to Use This File
- Each idea has a **difficulty tier** (🟢 Easy → 🟡 Medium → 🔴 Hard)
- Learn ideas **in order within each category** — they build on each other
- After reading an idea, **immediately solve 2-3 problems** using it
- Revisit this file before every contest as a refresher

---

## Category 1: Observation & Reduction Ideas

### 🟢 1.1 Parity Argument
**Idea**: Many problems become trivial once you check if the answer depends on whether something is odd/even.
- Sum parity, count parity, index parity
- XOR preserves parity of set bits
- "Can we reach state X?" → often a parity check

**Practice**: [1451A](https://codeforces.com/problemset/problem/1451/A), [1560A](https://codeforces.com/problemset/problem/1560/A), [2191A](https://codeforces.com/problemset/problem/2191/A)

### 🟢 1.2 Pigeonhole Principle
**Idea**: If n+1 items go into n boxes, at least one box has 2+ items. Use it to prove existence or force collisions.
- "Among n+1 numbers in range [1,n], two must be equal"
- "Among n+1 remainders mod n, two must be same"

**Practice**: [1690C](https://codeforces.com/problemset/problem/1690/C), [1527B1](https://codeforces.com/problemset/problem/1527/B1)

### 🟢 1.3 Invariant Thinking
**Idea**: Find a quantity that NEVER changes (or only changes in one direction) across operations. If the invariant of the start ≠ invariant of the goal → impossible.
- Sum invariant, XOR invariant, parity invariant
- Monovariant: always increases or always decreases → must terminate

**Practice**: [1534A](https://codeforces.com/problemset/problem/1534/A), [1753A](https://codeforces.com/problemset/problem/1753/A), [1679A](https://codeforces.com/problemset/problem/1679/A)

### 🟢 1.4 Sorting Unlocks Everything
**Idea**: If the problem doesn't depend on original order, SORT first. Sorting often reveals greedy structures, enables binary search, and simplifies two-pointer approaches.

**Practice**: [160A](https://codeforces.com/problemset/problem/160/A), [230A](https://codeforces.com/problemset/problem/230/A), [2188C](https://codeforces.com/problemset/problem/2188/C)

### 🟡 1.5 Contribution Technique
**Idea**: Instead of computing the total answer directly, ask "how much does each element contribute to the answer?" Sum up individual contributions.
- Count of pairs → each element's contribution to pair count
- Sum of all subarray sums → each element appears in how many subarrays?

**Practice**: [1648B](https://codeforces.com/problemset/problem/1648/B), [1511C](https://codeforces.com/problemset/problem/1511/C), [817D](https://codeforces.com/problemset/problem/817/D)

### 🟡 1.6 Think from the Answer Backwards
**Idea**: Instead of "how do I build the answer?", ask "if I know the answer is X, can I verify it?" This leads to binary search on answer.

**Practice**: [371C](https://codeforces.com/problemset/problem/371/C), [1474B](https://codeforces.com/problemset/problem/1474/B), [2183C](https://codeforces.com/problemset/problem/2183/C)

### 🟡 1.7 Reduce to a Known Problem
**Idea**: Transform the problem into one you already know how to solve. Common transformations:
- Difference array → prefix sum problem
- Graph coloring → bipartite check
- String matching → hashing
- Optimization → decision (binary search on answer)

### 🔴 1.8 Exchange Argument
**Idea**: To prove a greedy works, show that swapping any two adjacent elements in a non-optimal solution either improves it or keeps it the same. This proves the greedy ordering is optimal.

**Practice**: [2194D](https://codeforces.com/problemset/problem/2194/D), [1353E](https://codeforces.com/problemset/problem/1353/E)

---

## Category 2: Array & Sequence Ideas

### 🟢 2.1 Prefix Sum / Difference Array
**Idea**: Precompute prefix sums for O(1) range sum queries. Use difference arrays for O(1) range updates.
- `prefix[i] = a[0] + a[1] + ... + a[i-1]`
- Range sum [l,r] = prefix[r+1] - prefix[l]
- Range add [l,r] by v: diff[l] += v, diff[r+1] -= v

**Practice**: [276C](https://codeforces.com/problemset/problem/276/C), [466C](https://codeforces.com/problemset/problem/466/C), [816B](https://codeforces.com/problemset/problem/816/B)

### 🟢 2.2 Two Pointers
**Idea**: Maintain two indices that move in the same or opposite directions. Works when the "window" has a monotonic property.
- Sliding window: fixed/variable size subarray queries
- Opposite ends: sorted array pair problems
- Same direction: string matching, merging

**Practice**: [279B](https://codeforces.com/problemset/problem/279/B), [1700A](https://codeforces.com/problemset/problem/1700/A), [2193D](https://codeforces.com/problemset/problem/2193/D)

### 🟡 2.3 Monotonic Stack / Queue
**Idea**: Maintain a stack/deque where elements are always sorted. Used for "next greater element", "max in sliding window", and histogram problems.
- Next Greater Element: push, pop when current > top
- Sliding window max: deque of indices, pop from front when out of range

**Practice**: [1579C](https://codeforces.com/problemset/problem/1579/C), [817D](https://codeforces.com/problemset/problem/817/D), [1795C](https://codeforces.com/problemset/problem/1795/C)

### 🟡 2.4 MEX Tricks
**Idea**: MEX (Minimum Excludant) = smallest non-negative integer not in the set.
- MEX of [0,1,3,4] = 2
- Adding elements ≤ MEX increases MEX; adding elements > MEX doesn't change it
- MEX is at most n for an array of size n

**Practice**: [2191B](https://codeforces.com/problemset/problem/2191/B), [2183B](https://codeforces.com/problemset/problem/2183/B), [2185C](https://codeforces.com/problemset/problem/2185/C)

### 🟡 2.5 Coordinate Compression
**Idea**: When values are huge but count is small, map values to {0,1,2,...,n-1} preserving order. Enables using arrays instead of maps.

**Practice**: [459D](https://codeforces.com/problemset/problem/459/D), [1234D](https://codeforces.com/problemset/problem/1234/D)

### 🔴 2.6 Sweep Line
**Idea**: Sort events by position/time, then sweep left-to-right processing events. Combine with segment tree or BIT for efficient queries.

**Practice**: [2184G](https://codeforces.com/problemset/problem/2184/G), [1420D](https://codeforces.com/problemset/problem/1420/D)

---

## Category 3: Greedy Ideas

### 🟢 3.1 Take the Best Available
**Idea**: At each step, pick the largest/smallest available option. Works when locally optimal = globally optimal.

**Practice**: [381A](https://codeforces.com/problemset/problem/381/A), [2188B](https://codeforces.com/problemset/problem/2188/B)

### 🟡 3.2 Process Extremes First
**Idea**: Handle the largest/smallest elements first, as they have the most constraints. Sort descending and assign greedily.

**Practice**: [2197B](https://codeforces.com/problemset/problem/2197/B), [1353E](https://codeforces.com/problemset/problem/1353/E)

### 🟡 3.3 Deadline/Scheduling Greedy
**Idea**: Sort tasks by deadline, process in order. Use priority queue to drop least valuable if overloaded.
- Sort by end time for interval scheduling
- Sort by deadline for job scheduling

**Practice**: [1526C2](https://codeforces.com/problemset/problem/1526/C2), [1475E](https://codeforces.com/problemset/problem/1475/E)

### 🟡 3.4 "Fix One, Optimize the Other"
**Idea**: When the answer depends on two variables, fix one (iterate/binary search) and find the optimal value of the other efficiently.

**Practice**: [1551C](https://codeforces.com/problemset/problem/1551/C), [2197D](https://codeforces.com/problemset/problem/2197/D)

### 🔴 3.5 Regret-Based Greedy (Undo Greedy)
**Idea**: Make a greedy choice, but if you later find a better option, "undo" the previous choice. Implemented with priority queues.

**Practice**: [1526C2](https://codeforces.com/problemset/problem/1526/C2), [865D](https://codeforces.com/problemset/problem/865/D)

---

## Category 4: Binary Search Ideas

### 🟢 4.1 Binary Search on Answer
**Idea**: If you can check "is answer ≤ X?" in O(f(n)), and the answer is monotonic, binary search to find the optimal X.

**Practice**: [371C](https://codeforces.com/problemset/problem/371/C), [1474B](https://codeforces.com/problemset/problem/1474/B), [2185E](https://codeforces.com/problemset/problem/2185/E)

### 🟡 4.2 Binary Search on Sorted Structures
**Idea**: Use `lower_bound`/`upper_bound` on sorted arrays, sets, or maps for O(log n) lookups. Count elements in range, find nearest neighbor.

**Practice**: [706B](https://codeforces.com/problemset/problem/706/B), [474B](https://codeforces.com/problemset/problem/474/B)

### 🟡 4.3 Parallel Binary Search
**Idea**: Answer multiple binary search queries simultaneously by processing them together, reducing redundant work.

### 🔴 4.4 Fractional Binary Search / Epsilon Tricks
**Idea**: Binary search on real-valued answers. Use 100 iterations of halving instead of epsilon comparisons for stability.

---

## Category 5: DP Ideas

### 🟢 5.1 State = What Do I Need to Know?
**Idea**: The DP state should contain exactly the information needed to make future decisions. No more, no less.
- "Position + remaining budget" for knapsack
- "Index + last element" for LIS
- "Bitmask of visited" for TSP

### 🟡 5.2 DP Direction: Forward vs Backward
**Idea**: Sometimes building from base case forward is easier; sometimes working backward from the answer is cleaner. Try both!

### 🟡 5.3 DP on Subsets (Bitmask DP)
**Idea**: When n ≤ 20, represent subsets as bitmasks. Iterate over subsets: `for sub = mask; sub > 0; sub = (sub-1) & mask`

**Practice**: [2188D](https://codeforces.com/problemset/problem/2188/D), [2189C1](https://codeforces.com/problemset/problem/2189/C1), [2194C](https://codeforces.com/problemset/problem/2194/C)

### 🟡 5.4 Interval / Range DP
**Idea**: `dp[l][r]` = answer for the subarray [l,r]. Transition: try every split point k in [l,r-1].
- Matrix chain multiplication pattern
- Optimal BST pattern

### 🟡 5.5 DP on Trees (Subtree DP)
**Idea**: Root the tree. `dp[v]` depends on `dp[children of v]`. Process leaves first, then move up.

**Practice**: [2184F](https://codeforces.com/problemset/problem/2184/F), [2183D1](https://codeforces.com/problemset/problem/2183/D1), [461B](https://codeforces.com/problemset/problem/461/B)

### 🔴 5.6 Rerooting DP
**Idea**: Compute dp[root], then "reroot" to every other node in O(1) each. Total O(n) instead of O(n²).

**Practice**: [1092F](https://codeforces.com/problemset/problem/1092/F), [1187E](https://codeforces.com/problemset/problem/1187/E)

### 🔴 5.7 SOS DP (Sum over Subsets)
**Idea**: For each bitmask, compute the sum/count over all its submasks. Runs in O(n × 2^n).

**Practice**: [2188F](https://codeforces.com/problemset/problem/2188/F), [165E](https://codeforces.com/problemset/problem/165/E)

### 🔴 5.8 Digit DP
**Idea**: Count numbers in [0, N] with some property by processing digits from most significant to least. Track: position, tight constraint, other state.

### 🔴 5.9 Convex Hull Trick / Li Chao Tree
**Idea**: Optimize DP transitions of the form `dp[i] = min(a[j]*x[i] + b[j])` from O(n²) to O(n log n).

---

## Category 6: Graph Ideas

### 🟢 6.1 Model as Graph
**Idea**: If elements can "transition" to each other, build a graph. Dependencies → DAG → topo sort. Mutual exclusion → coloring.

### 🟡 6.2 0-1 BFS
**Idea**: When edge weights are 0 or 1, use deque BFS instead of Dijkstra. Push weight-0 edges to front, weight-1 edges to back. O(V+E).

**Practice**: [1064D](https://codeforces.com/problemset/problem/1064/D)

### 🟡 6.3 DSU (Union-Find) for Connectivity
**Idea**: Use DSU when you need to merge groups and check "are X and Y connected?" efficiently. Path compression + union by rank → nearly O(1).

**Practice**: [25D](https://codeforces.com/problemset/problem/25/D), [277A](https://codeforces.com/problemset/problem/277/A), [1167C](https://codeforces.com/problemset/problem/1167/C)

### 🟡 6.4 Functional Graph / Successor Graph
**Idea**: When each node has exactly one outgoing edge, the graph is a "functional graph" (union of ρ-shapes). Use fast doubling for k-th successor.

### 🔴 6.5 Virtual Tree
**Idea**: When a tree query only involves k key nodes, build a virtual tree of O(k) nodes (key nodes + their LCAs) instead of processing the full tree.

### 🔴 6.6 Euler Tour Flattening
**Idea**: Flatten a tree into an array using Euler tour. Subtree queries become range queries. LCA becomes RMQ.

**Practice**: [570D](https://codeforces.com/problemset/problem/570/D), [620E](https://codeforces.com/problemset/problem/620/E)

---

## Category 7: Number Theory Ideas

### 🟢 7.1 GCD Properties
**Idea**: gcd(a,b) = gcd(a, b-a). GCD of a range can only decrease or stay as you add elements. At most O(log V) distinct GCD values in any prefix.

### 🟡 7.2 Sieve Tricks
**Idea**: Sieve of Eratosthenes in O(n log log n). Extend to: smallest prime factor sieve, Mobius function sieve, Euler totient sieve.

### 🟡 7.3 Modular Inverse
**Idea**: a⁻¹ mod p = a^(p-2) mod p (Fermat's little theorem, p prime). For nCr mod p, precompute factorials and inverse factorials.

### 🔴 7.4 Chinese Remainder Theorem
**Idea**: System of congruences x ≡ a₁ (mod m₁), x ≡ a₂ (mod m₂)... has unique solution mod lcm(m₁,m₂,...) if compatible.

---

## Category 8: Constructive Algorithm Ideas

### 🟢 8.1 Build Incrementally
**Idea**: Start from an empty/trivial solution and add elements one by one, maintaining validity at each step.

**Practice**: [2191A](https://codeforces.com/problemset/problem/2191/A), [2188A](https://codeforces.com/problemset/problem/2188/A)

### 🟡 8.2 Work Backwards
**Idea**: Start from the desired end state and reverse operations to reach the initial state. Often simpler because the end state has more structure.

### 🟡 8.3 Find a Pattern / Period
**Idea**: Simulate small cases, spot a pattern. If the answer is periodic, compute for large n using modular arithmetic on the period.

### 🟡 8.4 Extremal Principle
**Idea**: Consider the maximum/minimum element. It often has special properties or must be handled in a specific way.

**Practice**: [2195D](https://codeforces.com/problemset/problem/2195/D), [2194D](https://codeforces.com/problemset/problem/2194/D)

### 🔴 8.5 Prove Impossible, Then Construct
**Idea**: First find necessary conditions for a solution. Then show these conditions are sufficient by constructing a solution when they hold.

---

## Category 9: Game Theory Ideas

### 🟢 9.1 Nim & XOR
**Idea**: In standard Nim, first player wins iff XOR of all pile sizes ≠ 0. Many games reduce to Nim.

**Practice**: [2183A](https://codeforces.com/problemset/problem/2183/A), [2191C](https://codeforces.com/problemset/problem/2191/C)

### 🟡 9.2 Sprague-Grundy Theorem
**Idea**: Every impartial game position has a Grundy number. Game of multiple independent sub-games: XOR the Grundy numbers.

### 🟡 9.3 Winning/Losing Position Analysis
**Idea**: Mark terminal positions. A position is Winning if ANY move leads to a Losing position. A position is Losing if ALL moves lead to Winning positions.

**Practice**: [2197C](https://codeforces.com/problemset/problem/2197/C), [2191D2](https://codeforces.com/problemset/problem/2191/D2)

---

## Category 10: Randomization & Heuristic Ideas

### 🟡 10.1 Random Pivot / Randomized Algorithms
**Idea**: Randomly choosing a pivot, order, or element often turns worst-case O(n²) into expected O(n log n). Examples: quickselect, random hashing.

### 🟡 10.2 Birthday Paradox Applications
**Idea**: Among n random values in [1,M], expect a collision after ~√M values. Use for probabilistic algorithms.

### 🔴 10.3 Randomized Hashing for Equality
**Idea**: Hash polynomial comparisons. Two strings equal iff hash equal (with high probability). Choose random mod to avoid anti-hack.

---

## 🎯 Quick Reference: "I'm Stuck" Decision Tree

```
Is the answer monotonic? → Binary Search on Answer
Can I sort without losing info? → Sort + Greedy/Two Pointers
Does order matter? → No: sort. Yes: DP or stack
Small n (≤20)? → Bitmask DP
Small n (≤10⁶) with range queries? → Segment Tree / BIT
Graph structure? → BFS/DFS/Dijkstra/DSU
Tree? → Root it, think subtree DP, or Euler tour
String matching? → KMP / Z-function / Hashing
Game? → Grundy numbers / Win-Lose analysis
Counting? → Combinatorics + inclusion-exclusion
Nothing works? → Contribution technique or find invariant
```
