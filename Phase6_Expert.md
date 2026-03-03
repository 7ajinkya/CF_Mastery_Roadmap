# Phase 6: Expert (Days 261–365) — Rating Target: 1900–2100+

> **Goal**: Master competition-level techniques, speed optimization, and push to Expert rating

---

## Days 261–285: Flow / Matching / Advanced Graphs

### Theory
- Maximum bipartite matching (Kuhn's algorithm)
- Max flow / min cut (Dinic's algorithm)
- Strongly Connected Components (Tarjan, Kosaraju)
- 2-SAT
- Euler paths and circuits
- [CP Algorithms: Flows](https://cp-algorithms.com/graph/edmonds_karp.html)

### Problems — Advanced Graphs (Rating 1900–2100)
| # | Problem | Topic | Link |
|---|---------|-------|------|
| 1 | Doors and Keys | DP | [2188G](https://codeforces.com/problemset/problem/2188/G) |
| 2 | Median Permutation | Combinatorics | [2191G](https://codeforces.com/problemset/problem/2191/G) |
| 3 | Snake Instructions | Interactive | [2183G](https://codeforces.com/problemset/problem/2183/G) |
| 4 | Minimise Cost | DP/BS | [2183H](https://codeforces.com/problemset/problem/2183/H) |
| 5 | King's Inspection | SCC | [113D](https://codeforces.com/problemset/problem/113/D) |
| 6 | Learning Plan | 2-SAT | [228D](https://codeforces.com/problemset/problem/228/D) |
| 7 | Network | Flows | [165E](https://codeforces.com/problemset/problem/165/E) |
| 8 | Bipartiteness | Matching | [1387B1](https://codeforces.com/problemset/problem/1387/B1) |
| 9 | Compress Words | String/Hash | [1200E](https://codeforces.com/problemset/problem/1200/E) |
| 10 | Minimum Euler Circuit | Euler Path | [1361C](https://codeforces.com/problemset/problem/1361/C) |
| 11 | Path Queries 2 | Binary Lifting | [1763D](https://codeforces.com/problemset/problem/1763/D) |
| 12 | New Year Movie | SCC | [1534D](https://codeforces.com/problemset/problem/1534/D) |

---

## Days 286–310: Advanced Segment Trees & DS

### Theory
- Segment tree beats
- Persistent segment tree
- Merge sort tree
- Li Chao tree (convex hull trick on seg tree)
- Centroid decomposition + update queries
- [CP Algorithms: Persistent DS](https://cp-algorithms.com/data_structures/persistent_segment_tree.html)

### Problems — Advanced DS (Rating 1900–2200)
| # | Problem | Topic | Link |
|---|---------|-------|------|
| 1 | Double Bracket Sequence | DS/DP/Greedy | [2197F](https://codeforces.com/problemset/problem/2197/F) |
| 2 | IFS and Queries | BS/DS/Trees | [2195G](https://codeforces.com/problemset/problem/2195/G) |
| 3 | CF Heuristic Contest | Geometry/Impl | [2195H](https://codeforces.com/problemset/problem/2195/H) |
| 4 | Sereja and Brackets | Seg Tree | [380C](https://codeforces.com/problemset/problem/380/C) |
| 5 | Lucky Array | BIT/Seg Tree | [121E](https://codeforces.com/problemset/problem/121/E) |
| 6 | Distinct Characters | Merge Sort Tree | [1234D](https://codeforces.com/problemset/problem/1234/D) |
| 7 | Array Restoration | Seg Tree | [1178E](https://codeforces.com/problemset/problem/1178/E) |
| 8 | Earthquakes | Persistent | [840D](https://codeforces.com/problemset/problem/840/D) |
| 9 | Max GCD | DS/NT | [1370D](https://codeforces.com/problemset/problem/1370/D) |
| 10 | Beautiful Pair | Merge Sort Tree | [1601C](https://codeforces.com/problemset/problem/1601/C) |

---

## Days 311–340: Competitive Programming Patterns & Frameworks

### The "Framework Approach" for Contests
Master these meta-patterns that appear in 80%+ of contest problems:

#### Pattern 1: Greedy + Sorting + Binary Search (A–C problems)
- Sort → binary search on answer → greedy check
- Two pointer after sorting
- Exchange argument to prove greedy works

#### Pattern 2: DP State Design (C–E problems)
- **What to include in state**: index, remaining capacity, bitmask of used items
- **State reduction**: observe symmetry, ignore irrelevant info
- **Transition optimization**: prefix sums, segment trees, convex hull trick

#### Pattern 3: Graph Modeling (D–F problems)
- Model the problem as a graph, then apply standard algorithm
- Build implicit graphs, use BFS/DFS/Dijkstra
- Tree problems: think about rerooting, centroid decomposition, HLD

#### Pattern 4: Constructive (A–D problems)
- Find invariants (parity, sum, XOR)
- Work backwards from the answer
- Build solution incrementally

### Mixed Practice — Expert Level (Rating 1900–2100+)
| # | Problem | Topic | Link |
|---|---------|-------|------|
| 1 | Pairs Flipping Easy | Constructive | [2183I1](https://codeforces.com/problemset/problem/2183/I1) |
| 2 | Zhora the Vacuum | DS/Trees | [2189F](https://codeforces.com/problemset/problem/2189/F) |
| 3 | Cool Problem | Bitmask/DP | [2188F](https://codeforces.com/problemset/problem/2188/F) |
| 4 | Palindrome | DP/Strings | [1326D2](https://codeforces.com/problemset/problem/1326/D2) |
| 5 | XOR on Segment | Seg Tree | [242E](https://codeforces.com/problemset/problem/242/E) |
| 6 | Shortest Path | Dijkstra + LCA | [1051F](https://codeforces.com/problemset/problem/1051/F) |
| 7 | Interactive Graph | BS/Graphs | [2197E1](https://codeforces.com/problemset/problem/2197/E1) |
| 8 | Imbalanced Array | Stack/DS | [817D](https://codeforces.com/problemset/problem/817/D) |
| 9 | MEX Queries | Seg Tree | [817F](https://codeforces.com/problemset/problem/817/F) |
| 10 | Prefix Fun | Z-func/KMP | [432D](https://codeforces.com/problemset/problem/432/D) |

---

## Days 341–365: Contest Strategy & Upsolving Sprint

### Contest Strategy
1. **Read ALL problems** (2 min) — identify easy ones first
2. **A problem** in < 5 min — use templates, don't overthink
3. **B problem** in < 15 min — pattern match quickly
4. **C problem** in < 30 min — this is where rating is made/lost
5. **D problem** — if C is done early, invest remaining time here
6. **Hack phase** — read others' code, find edge cases

### Upsolving Sprint — Recent Contests
Upsolve ALL problems from these recent rounds at your level:

| Contest | Problems to Upsolve | Link |
|---------|---------------------|------|
| Round 1080 (Div.3) | E, F, G | [2195](https://codeforces.com/contest/2195) |
| Round 1079 (Div.2) | D, E, F | [2197](https://codeforces.com/contest/2197) |
| Round 1078 (Div.2) | D, E, F | [2194](https://codeforces.com/contest/2194) |
| Round 1077 (Div.2) | D, E, F | [2188](https://codeforces.com/contest/2188) |
| Round 1076 (Div.3) | F, G, H | [2193](https://codeforces.com/contest/2193) |
| Round 1075 (Div.2) | D, E, F | [2189](https://codeforces.com/contest/2189) |
| Round 1074 (Div.4) | F, G, H | [2185](https://codeforces.com/contest/2185) |
| Round 1073 (Div.2) | D2, E, F | [2191](https://codeforces.com/contest/2191) |
| Round 1072 (Div.3) | E, F, G | [2184](https://codeforces.com/contest/2184) |
| Hello 2026 | D2, E, F | [2183](https://codeforces.com/contest/2183) |

### 🏁 Phase 6 Goals
- Div.2 rounds: solve A-E regularly
- Div.1+2 rounds: solve A-D
- **Target**: Rating 1900+ (Expert title!)
- Participate in EVERY live round
- Upsolve every problem 1 level above your solve in contest

---

## 📚 Essential Resource Links

| Resource | Topics | Link |
|----------|--------|------|
| CP Algorithms | All algorithms/DS | [cp-algorithms.com](https://cp-algorithms.com/) |
| CSES Problem Set | Structured practice | [cses.fi/problemset](https://cses.fi/problemset/) |
| Codeforces Edu | Topic-wise courses | [codeforces.com/edu](https://codeforces.com/edu/courses) |
| A2OJ Ladders | Rating-wise problems | Filter by rating on CF |
| USACO Guide | Structured CP learning | [usaco.guide](https://usaco.guide/) |
| Competitive Programmer's Handbook | Theory | [PDF](https://cses.fi/book/book.pdf) |
| Algorithms for CP | Theory | By David Hartveld |
