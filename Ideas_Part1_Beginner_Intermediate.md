# 🧠 The CP Ideas Encyclopedia — Part 1: Beginner → Intermediate

> **Every idea, trick, and mental model you need from Day 1 to Rating 1400**
> Difficulty: 🟢 Beginner | 🟡 Intermediate

---

## 1. Thinking & Observation Ideas

### 🟢 1.1 Brute Force First
**Idea**: Before optimizing, can you solve it with nested loops? For n ≤ 1000, O(n²) is fine. For n ≤ 20, even O(2ⁿ) works. Always ask "is brute force fast enough?" first.
**When to use**: Constraints are small, or problem seems hard — brute force to find patterns.
```cpp
// Check all pairs
for(int i = 0; i < n; i++)
    for(int j = i+1; j < n; j++)
        if(a[i] + a[j] == target) ans++;
```
**Practice**: [4A](https://codeforces.com/problemset/problem/4/A), [25A](https://codeforces.com/problemset/problem/25/A)

### 🟢 1.2 Parity Argument (Odd/Even)
**Idea**: Check if the answer depends on odd vs even. Many "is it possible?" problems reduce to a parity check.
- Sum of odd numbers: odd count → odd sum, even count → even sum
- XOR preserves parity of set bits
- "Difference between two values" and parity often matter

```cpp
if(total_sum % 2 != 0) cout << "NO"; // can't split into two equal halves
```
**Practice**: [1451A](https://codeforces.com/problemset/problem/1451/A), [2191A](https://codeforces.com/problemset/problem/2191/A)

### 🟢 1.3 Pigeonhole Principle
**Idea**: If you put n+1 items into n boxes, at least one box has 2+ items. Use to prove existence.
- n+1 numbers in range [1,n] → duplicate exists
- 27 people → at least 3 share a birth month

**Practice**: [1690C](https://codeforces.com/problemset/problem/1690/C)

### 🟢 1.4 Invariant Thinking
**Idea**: Find a quantity that NEVER changes across operations. Start ≠ Goal invariant → IMPOSSIBLE.
- **Sum invariant**: operations preserve total sum
- **Parity invariant**: each op flips/preserves parity
- **XOR invariant**: XOR of all elements stays same
- **Monovariant**: always increases → must terminate

```cpp
// If each operation swaps two elements, the sum never changes
// So if required_sum != current_sum, answer is -1
```
**Practice**: [1534A](https://codeforces.com/problemset/problem/1534/A), [1679A](https://codeforces.com/problemset/problem/1679/A)

### 🟡 1.5 Contribution Technique
**Idea**: Instead of computing total directly, ask "how much does element i contribute?" Sum contributions.
- "Sum of all subarray minimums" → for each element, count subarrays where it's the minimum
- "Count of pairs with property" → for each element, count how many valid partners

```cpp
// Each a[i] appears in (i+1)*(n-i) subarrays (as part of)
// so total sum of all subarrays = sum of a[i] * (i+1) * (n-i)
for(int i = 0; i < n; i++)
    total += (long long)a[i] * (i+1) * (n-i);
```
**Practice**: [1648B](https://codeforces.com/problemset/problem/1648/B), [817D](https://codeforces.com/problemset/problem/817/D)

### 🟡 1.6 Think Backwards
**Idea**: Work from the desired end state backwards. Reverse the operations. Often what's hard forward is easy backward.
**Practice**: [2195D](https://codeforces.com/problemset/problem/2195/D)

### 🟡 1.7 Fix One, Optimize the Other
**Idea**: When answer depends on two variables x and y, iterate over all possible x, and for each x find the best y efficiently (using binary search, formula, or precomputation).
**Practice**: [1551C](https://codeforces.com/problemset/problem/1551/C), [2197D](https://codeforces.com/problemset/problem/2197/D)

### 🟡 1.8 Exchange Argument
**Idea**: To prove greedy is correct: assume optimal solution has elements in a different order. Show that swapping two adjacent out-of-order elements doesn't make it worse → greedy ordering is optimal.
**Practice**: [1353E](https://codeforces.com/problemset/problem/1353/E)

---

## 2. Bit Manipulation Ideas

### 🟢 2.1 Basic Bit Operations
**Idea**: Every integer is a sequence of bits. Master these operations:
```cpp
x & (1 << i)    // check if bit i is set
x | (1 << i)    // set bit i
x & ~(1 << i)   // clear bit i
x ^ (1 << i)    // toggle bit i
x & (x-1)       // clear lowest set bit
x & (-x)        // isolate lowest set bit
__builtin_popcount(x)  // count set bits
__builtin_clz(x)       // leading zeros
```
**Practice**: [282A](https://codeforces.com/problemset/problem/282/A), [61A](https://codeforces.com/problemset/problem/61/A)

### 🟢 2.2 XOR Properties
**Idea**: XOR is its own inverse: a ^ a = 0, a ^ 0 = a. XOR is associative and commutative.
- Find the unique element: XOR all → pairs cancel out
- XOR prefix: useful for range XOR queries

```cpp
int xor_all = 0;
for(int i = 0; i < n; i++) xor_all ^= a[i]; // remaining = unique element
```
**Practice**: [1698C](https://codeforces.com/problemset/problem/1698/C), [2189C1](https://codeforces.com/problemset/problem/2189/C1)

### 🟡 2.3 Bitmask as Set Representation
**Idea**: An integer with n bits represents a subset of {0,1,...,n-1}. Bit i is set ↔ element i is in the set.
- Union: `a | b`, Intersection: `a & b`, Difference: `a & ~b`
- Iterate all subsets: `for(int mask = 0; mask < (1<<n); mask++)`
- Iterate all submasks of mask: `for(int sub = mask; sub > 0; sub = (sub-1) & mask)`

```cpp
// Enumerate all subsets of n elements
for(int mask = 0; mask < (1 << n); mask++) {
    int sum = 0;
    for(int i = 0; i < n; i++)
        if(mask & (1 << i)) sum += a[i];
}
```
**Practice**: [2188D](https://codeforces.com/problemset/problem/2188/D), [2194C](https://codeforces.com/problemset/problem/2194/C)

### 🟡 2.4 Bitwise AND/OR Properties
**Idea**: AND can only decrease or stay same as you add elements. OR can only increase or stay same. This means:
- AND of a range is monotonically non-increasing as range grows
- OR of a range is monotonically non-decreasing as range grows
- At most O(log V) distinct AND values for all prefixes

---

## 3. Array & Sequence Ideas

### 🟢 3.1 Frequency Counting
**Idea**: Count occurrences of each value. Use array for small values, map for large.
```cpp
int freq[100001] = {0};
for(int i = 0; i < n; i++) freq[a[i]]++;
// or for large values:
map<int, int> freq;
for(int i = 0; i < n; i++) freq[a[i]]++;
```
**Practice**: [236A](https://codeforces.com/problemset/problem/236/A), [520A](https://codeforces.com/problemset/problem/520/A)

### 🟢 3.2 Prefix Sum
**Idea**: Precompute running sums. Any range sum in O(1). The most fundamental CP trick.
```cpp
long long pre[n+1] = {0};
for(int i = 0; i < n; i++) pre[i+1] = pre[i] + a[i];
// sum of a[l..r] = pre[r+1] - pre[l]
```
**2D version**: `pre[i][j] = pre[i-1][j] + pre[i][j-1] - pre[i-1][j-1] + a[i][j]`

**Practice**: [276C](https://codeforces.com/problemset/problem/276/C), [466C](https://codeforces.com/problemset/problem/466/C), [816B](https://codeforces.com/problemset/problem/816/B)

### 🟢 3.3 Difference Array
**Idea**: For multiple range updates (add v to [l,r]), use difference array. `d[l] += v; d[r+1] -= v;` then prefix sum of d gives the actual array.
```cpp
int d[n+1] = {0};
// add v to range [l, r]:
d[l] += v; d[r+1] -= v;
// reconstruct:
for(int i = 1; i <= n; i++) d[i] += d[i-1];
```
**Practice**: [276C](https://codeforces.com/problemset/problem/276/C), [295B](https://codeforces.com/problemset/problem/295/B)

### 🟢 3.4 Sliding Window (Fixed Size)
**Idea**: Maintain a window of size k. When window slides right: add right element, remove left element. O(n) total.
```cpp
int window_sum = 0;
for(int i = 0; i < k; i++) window_sum += a[i]; // initial window
for(int i = k; i < n; i++) {
    window_sum += a[i] - a[i-k]; // slide
    ans = max(ans, window_sum);
}
```

### 🟡 3.5 Two Pointers
**Idea**: Two indices moving through the array. Three patterns:
1. **Same direction**: both move right, left chases right (variable window)
2. **Opposite direction**: one from start, one from end (pair finding)
3. **Two arrays**: merge-like traversal

```cpp
// Variable window: find shortest subarray with sum >= target
int left = 0, cur_sum = 0;
for(int right = 0; right < n; right++) {
    cur_sum += a[right];
    while(cur_sum >= target) {
        ans = min(ans, right - left + 1);
        cur_sum -= a[left++];
    }
}
```
**Practice**: [279B](https://codeforces.com/problemset/problem/279/B), [1700A](https://codeforces.com/problemset/problem/1700/A), [2193D](https://codeforces.com/problemset/problem/2193/D)

### 🟡 3.6 Monotonic Stack
**Idea**: Stack where elements are always sorted. Pop when a new element violates the order. Finds "next greater/smaller element" in O(n).
```cpp
stack<int> st;
vector<int> next_greater(n, -1);
for(int i = 0; i < n; i++) {
    while(!st.empty() && a[st.top()] < a[i]) {
        next_greater[st.top()] = i;
        st.pop();
    }
    st.push(i);
}
```
**Practice**: [1579C](https://codeforces.com/problemset/problem/1579/C), [817D](https://codeforces.com/problemset/problem/817/D)

### 🟡 3.7 MEX (Minimum Excludant)
**Idea**: MEX = smallest non-negative integer NOT in the set. MEX of {0,1,3} = 2.
- MEX ≤ n for set of size n
- Adding values > current MEX doesn't change MEX
- Removing value < current MEX decreases MEX

**Practice**: [2191B](https://codeforces.com/problemset/problem/2191/B), [2183B](https://codeforces.com/problemset/problem/2183/B)

### 🟡 3.8 Coordinate Compression
**Idea**: When values are huge (up to 10⁹) but count is small (up to 10⁵), map to {0,1,...,n-1} preserving order. Enables arrays instead of maps.
```cpp
vector<int> sorted_vals = a;
sort(sorted_vals.begin(), sorted_vals.end());
sorted_vals.erase(unique(sorted_vals.begin(), sorted_vals.end()), sorted_vals.end());
for(int i = 0; i < n; i++)
    a[i] = lower_bound(sorted_vals.begin(), sorted_vals.end(), a[i]) - sorted_vals.begin();
```
**Practice**: [459D](https://codeforces.com/problemset/problem/459/D)

---

## 4. Sorting & Greedy Ideas

### 🟢 4.1 Sorting Unlocks Everything
**Idea**: If order doesn't matter, SORT. Sorting reveals structure, enables binary search, simplifies greedy, and enables two pointers.
**Practice**: [160A](https://codeforces.com/problemset/problem/160/A), [2188C](https://codeforces.com/problemset/problem/2188/C)

### 🟢 4.2 Take the Best Available
**Idea**: Greedily pick the largest/smallest option at each step.
**Practice**: [381A](https://codeforces.com/problemset/problem/381/A), [2188B](https://codeforces.com/problemset/problem/2188/B)

### 🟡 4.3 Sort by Custom Criterion
**Idea**: Sort not by value, but by ratio, difference, or deadline. Often the key insight.
```cpp
// Sort jobs by deadline
sort(jobs.begin(), jobs.end(), [](auto& a, auto& b) {
    return a.deadline < b.deadline;
});
```
**Practice**: [1353E](https://codeforces.com/problemset/problem/1353/E), [2197B](https://codeforces.com/problemset/problem/2197/B)

### 🟡 4.4 Scheduling / Interval Greedy
**Idea**: For maximum non-overlapping intervals: sort by END time, greedily take earliest ending. For minimum intervals to cover: sort by START time, extend greedily.
**Practice**: [1526C2](https://codeforces.com/problemset/problem/1526/C2), [1475E](https://codeforces.com/problemset/problem/1475/E)

### 🟡 4.5 Process Extremes First
**Idea**: Handle max/min elements first — they have the most constraints.
**Practice**: [2195D](https://codeforces.com/problemset/problem/2195/D), [2194D](https://codeforces.com/problemset/problem/2194/D)

---

## 5. Binary Search Ideas

### 🟢 5.1 Binary Search on Sorted Array
**Idea**: If array is sorted, find element/position in O(log n). Use `lower_bound` and `upper_bound`.
```cpp
auto it = lower_bound(a.begin(), a.end(), x); // first element >= x
int pos = it - a.begin();
int count_less = pos; // number of elements < x
```
**Practice**: [706B](https://codeforces.com/problemset/problem/706/B), [474B](https://codeforces.com/problemset/problem/474/B)

### 🟡 5.2 Binary Search on Answer
**Idea**: If "can we achieve answer ≤ X?" is monotonic (yes for large X, no for small X), binary search to find the boundary.
```cpp
long long lo = 0, hi = 1e18;
while(lo < hi) {
    long long mid = lo + (hi - lo) / 2;
    if(canAchieve(mid)) hi = mid;
    else lo = mid + 1;
}
// lo is the answer
```
**Practice**: [371C](https://codeforces.com/problemset/problem/371/C), [1474B](https://codeforces.com/problemset/problem/1474/B), [2185E](https://codeforces.com/problemset/problem/2185/E)

### 🟡 5.3 Binary Search + Greedy Check
**Idea**: Binary search on the answer, then verify with a greedy check function. Very common pattern.
**Practice**: [1117C](https://codeforces.com/problemset/problem/1117/C), [1680C](https://codeforces.com/problemset/problem/1680/C)

---

## 6. Number Theory Ideas

### 🟢 6.1 GCD / LCM
**Idea**: GCD(a,b) via Euclidean algorithm. LCM(a,b) = a/GCD(a,b)*b. GCD of a range can only decrease.
```cpp
int gcd(int a, int b) { return b ? gcd(b, a%b) : a; }
long long lcm(int a, int b) { return (long long)a / gcd(a,b) * b; }
```
**Practice**: [1350A](https://codeforces.com/problemset/problem/1350/A), [1203C](https://codeforces.com/problemset/problem/1203/C)

### 🟢 6.2 Modular Arithmetic
**Idea**: (a+b) % m = ((a%m) + (b%m)) % m. Same for multiplication. NOT for division — need modular inverse.
```cpp
const int MOD = 1e9 + 7;
long long add(long long a, long long b) { return ((a%MOD) + (b%MOD)) % MOD; }
long long mul(long long a, long long b) { return ((a%MOD) * (b%MOD)) % MOD; }
```

### 🟡 6.3 Sieve of Eratosthenes
**Idea**: Find all primes up to n in O(n log log n). Extended: smallest prime factor sieve.
```cpp
vector<bool> is_prime(n+1, true);
is_prime[0] = is_prime[1] = false;
for(int i = 2; i*i <= n; i++)
    if(is_prime[i])
        for(int j = i*i; j <= n; j += i)
            is_prime[j] = false;
```
**Practice**: [230B](https://codeforces.com/problemset/problem/230/B), [17A](https://codeforces.com/problemset/problem/17/A)

### 🟡 6.4 Prime Factorization
**Idea**: Factorize n in O(√n). With SPF sieve, factorize in O(log n).
```cpp
map<int,int> factorize(int n) {
    map<int,int> f;
    for(int i = 2; i*i <= n; i++)
        while(n % i == 0) { f[i]++; n /= i; }
    if(n > 1) f[n]++;
    return f;
}
```

### 🟡 6.5 Modular Exponentiation & Inverse
**Idea**: Compute aᵇ mod m in O(log b). For division under mod: a/b mod p = a × b^(p-2) mod p (Fermat).
```cpp
long long power(long long base, long long exp, long long mod) {
    long long result = 1; base %= mod;
    while(exp > 0) {
        if(exp & 1) result = result * base % mod;
        base = base * base % mod; exp >>= 1;
    }
    return result;
}
long long mod_inv(long long a, long long mod) { return power(a, mod-2, mod); }
```

### 🟡 6.6 Combinatorics: nCr mod p
**Idea**: Precompute factorials and inverse factorials. Then nCr = fact[n] × inv_fact[r] × inv_fact[n-r] mod p.
```cpp
long long fact[MAXN], inv_fact[MAXN];
void precompute(int n) {
    fact[0] = 1;
    for(int i = 1; i <= n; i++) fact[i] = fact[i-1] * i % MOD;
    inv_fact[n] = power(fact[n], MOD-2, MOD);
    for(int i = n-1; i >= 0; i--) inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}
long long nCr(int n, int r) {
    if(r < 0 || r > n) return 0;
    return fact[n] % MOD * inv_fact[r] % MOD * inv_fact[n-r] % MOD;
}
```

---

## 7. Constructive Algorithm Ideas

### 🟢 7.1 Build Incrementally
**Idea**: Start from empty/trivial solution, add elements one by one maintaining validity.
**Practice**: [2191A](https://codeforces.com/problemset/problem/2191/A), [2188A](https://codeforces.com/problemset/problem/2188/A)

### 🟡 7.2 Work Backwards
**Idea**: Start from desired end, reverse operations. End state usually has more structure.
**Practice**: [2195D](https://codeforces.com/problemset/problem/2195/D)

### 🟡 7.3 Find a Pattern
**Idea**: Simulate small cases (n=1,2,3,4...), spot a formula or period. Use it for large n.
**Practice**: [2194D](https://codeforces.com/problemset/problem/2194/D)

### 🟡 7.4 Extremal Principle
**Idea**: The max or min element often must be handled specially. Start there.
**Practice**: [1735C](https://codeforces.com/problemset/problem/1735/C)

---

## 8. Game Theory Ideas

### 🟢 8.1 Nim & XOR
**Idea**: In standard Nim, first player wins iff XOR of piles ≠ 0.
**Practice**: [2183A](https://codeforces.com/problemset/problem/2183/A), [2191C](https://codeforces.com/problemset/problem/2191/C)

### 🟡 8.2 Win/Lose Position Analysis
**Idea**: Mark terminal states. Position is W if ANY move → L. Position is L if ALL moves → W.
**Practice**: [2197C](https://codeforces.com/problemset/problem/2197/C)

### 🟡 8.3 Sprague-Grundy
**Idea**: Every game position has a Grundy number. Multiple independent games: XOR their Grundy numbers.
**Practice**: [2191D2](https://codeforces.com/problemset/problem/2191/D2)

---

## 🎯 "I'm Stuck" Checklist (Beginner–Intermediate)

```
□ Read the constraints — what's the max complexity allowed?
□ Can brute force work? Try it first
□ Can I sort? Does order matter?
□ Is there a parity/invariant argument?
□ Can I use prefix sums?
□ Can I binary search on the answer?
□ Is it a greedy? Try exchange argument
□ Two pointers? 
□ Frequency count / hash map?
□ Small n? Bitmask enumerate
□ Think contribution: how much does each element add?
□ Work backwards from the answer
```
