# 📘 Study Guide 12 — All About Strings & Trie

> **Difficulty Range**: Intermediate → Expert (CF 1100 → 2400)
> **Core Idea**: Strings are arrays with special structure. Tries, Z-algorithm, KMP, Suffix Arrays, and Hashing exploit that structure to answer pattern matching and substring queries far faster than brute force ever could.

---

## 🧠 Chapter 1 — Why Are Strings Hard?

### The Fundamental Challenge

A string of length N contains O(N²) distinct substrings. If a problem asks anything about "all substrings" and you enumerate them naively, you're already at O(N²) before doing any work. For N = 10^5, that's 10^10 operations — impossible.

String algorithms exist to answer questions about patterns and substrings in O(N) or O(N log N) by exploiting the repetitive structure of strings. Each algorithm in this guide is a different lens on that structure.

---

## 🧠 Chapter 2 — String Hashing

### The Concept: Fingerprinting

Hashing maps a string to a number. Two equal strings always hash to the same number. Two different strings hash to the same number with very low probability (a "collision"). This lets you compare strings in O(1) after O(N) preprocessing.

The standard approach is **polynomial rolling hash**:
```
hash(s) = s[0]*p^(n-1) + s[1]*p^(n-2) + ... + s[n-1]*p^0   (mod M)
```
where `p` is a prime base (typically 31 or 131 for lowercase letters) and `M` is a large prime modulus.

### Prefix Hash Array and Substring Hash

The key insight is that the hash of any substring `s[l..r]` can be computed in O(1) given the prefix hashes:

```python
MOD = (1 << 61) - 1   # A large Mersenne prime — very few collisions
BASE = 131

class StringHasher:
    def __init__(self, s):
        n = len(s)
        self.n = n
        self.h = [0] * (n + 1)   # h[i] = hash of s[0..i-1]
        self.pw = [1] * (n + 1)  # pw[i] = BASE^i mod MOD
        
        for i in range(n):
            self.h[i + 1] = (self.h[i] * BASE + ord(s[i])) % MOD
            self.pw[i + 1] = self.pw[i] * BASE % MOD
    
    def get(self, l, r):
        """Hash of s[l..r] (0-indexed, inclusive). O(1)."""
        # h[r+1] = hash of s[0..r]
        # We subtract the prefix s[0..l-1], scaled appropriately
        return (self.h[r + 1] - self.h[l] * self.pw[r - l + 1]) % MOD
```

### Double Hashing for Safety

A single hash can collide. To reduce collision probability to near zero, use **two independent hashes** (two different base-modulus pairs). Only declare strings equal if both hashes match.

```python
class DoubleHasher:
    def __init__(self, s):
        self.h1 = StringHasher(s)                                          # (BASE=131, MOD=10^9+7)
        self.h2 = StringHasher(s)                                          # (BASE=137, MOD=10^9+9)
        # In practice, initialize each with different (BASE, MOD) pairs
    
    def get(self, l, r):
        return (self.h1.get(l, r), self.h2.get(l, r))
```

### Applications of Hashing

The killer use case is **binary search + hashing** to find the longest common substring, longest palindrome, or checking if one string is a rotation of another.

```python
def longest_common_substring(s, t):
    """Binary search on length; hashing checks existence. O(N log N)."""
    hs = StringHasher(s)
    ht = StringHasher(t)
    
    # Check if any substring of s of length L also appears in t
    def has_common_length(L):
        hashes_s = set()
        for i in range(len(s) - L + 1):
            hashes_s.add(hs.get(i, i + L - 1))
        for i in range(len(t) - L + 1):
            if ht.get(i, i + L - 1) in hashes_s:
                return True
        return False
    
    lo, hi = 0, min(len(s), len(t))
    while lo < hi:
        mid = (lo + hi + 1) // 2
        if has_common_length(mid):
            lo = mid
        else:
            hi = mid - 1
    return lo
```

---

## 🧠 Chapter 3 — KMP Algorithm (Pattern Matching)

### The Brute Force Problem

To find all occurrences of pattern P (length M) in text T (length N), the naïve approach tries every starting position in T — O(NM) in the worst case. For N = M = 10^5, that's 10^10.

### The Key Insight: Don't Throw Away Work

When a mismatch occurs at position i in the pattern, we know which characters of T we've already matched. The KMP failure function tells us the longest proper prefix of P[0..i] that is also a suffix — meaning we can restart the comparison from that position instead of going all the way back to 0.

### The Failure Function (Pi Array)

`pi[i]` = length of the longest proper prefix of `P[0..i]` that is also a suffix of `P[0..i]`.

```python
def compute_pi(pattern):
    """Compute the KMP failure function (prefix function)."""
    m = len(pattern)
    pi = [0] * m
    pi[0] = 0   # By definition, proper prefix of a single character is empty
    j = 0       # Length of the current matching prefix
    
    for i in range(1, m):
        # If mismatch, follow failure links back until match or j=0
        while j > 0 and pattern[i] != pattern[j]:
            j = pi[j - 1]   # Jump back to the next candidate position
        if pattern[i] == pattern[j]:
            j += 1          # Extend the current prefix match
        pi[i] = j
    
    return pi
```

**Trace for pattern "abcabd"**:
```
i=0: pi[0]=0
i=1: 'b' != 'a', pi[1]=0
i=2: 'c' != 'a', pi[2]=0
i=3: 'a' == 'a', pi[3]=1
i=4: 'b' == 'b', pi[4]=2
i=5: 'd' != 'c', fallback: j=pi[1]=0, 'd'!='a', pi[5]=0
pi = [0, 0, 0, 1, 2, 0]
```

### KMP Search

```python
def kmp_search(text, pattern):
    """Find all starting indices where pattern occurs in text. O(N + M)."""
    if not pattern: return []
    pi = compute_pi(pattern)
    n, m = len(text), len(pattern)
    occurrences = []
    j = 0   # Number of characters matched so far
    
    for i in range(n):
        while j > 0 and text[i] != pattern[j]:
            j = pi[j - 1]   # Mismatch — follow failure link
        if text[i] == pattern[j]:
            j += 1
        if j == m:   # Complete match found
            occurrences.append(i - m + 1)
            j = pi[j - 1]   # Prepare for next potential match
    
    return occurrences

# Classic trick: search for pattern in (text + '#' + pattern)
# where '#' is a character not appearing in either string.
# The pi values of the combined string at positions > len(text) + 1
# directly give you the match lengths.
```

### KMP Applications Beyond Search

The prefix function has a beautiful structural interpretation: it encodes all the "self-similarities" of the string. It can answer "what is the shortest period of the string?" (answer: `n - pi[n-1]`), "how many distinct borders does the string have?" (trace the pi chain), and "does the string have a period that divides its length?" (check if `n % (n - pi[n-1]) == 0`).

---

## 🧠 Chapter 4 — Z-Algorithm

### What the Z-Array Stores

The Z-array is an alternative to the prefix function that's slightly easier to reason about for some problems. `Z[i]` = the length of the longest substring starting at position i that is also a prefix of the entire string.

In other words, `Z[i]` tells you: "How many characters starting at position i match the beginning of the string?"

```python
def z_function(s):
    """Compute Z-array in O(N)."""
    n = len(s)
    Z = [0] * n
    Z[0] = n    # The entire string is a prefix of itself
    l, r = 0, 0  # The window [l, r] is the rightmost Z-box seen so far
    
    for i in range(1, n):
        if i < r:
            # i is inside the current Z-box — use previously computed info
            Z[i] = min(r - i, Z[i - l])
        # Extend the Z-box naively as far as possible
        while i + Z[i] < n and s[Z[i]] == s[i + Z[i]]:
            Z[i] += 1
        # Update the rightmost Z-box if we extended it
        if i + Z[i] > r:
            l, r = i, i + Z[i]
    
    return Z
```

**Pattern matching with Z**: concatenate `pattern + '$' + text` where `'$'` doesn't appear in either. Then Z[i] == len(pattern) means pattern starts at position `i - len(pattern) - 1` in the original text.

```python
def z_search(text, pattern):
    s = pattern + '$' + text
    Z = z_function(s)
    m = len(pattern)
    return [i - m - 1 for i in range(m + 1, len(s)) if Z[i] == m]
```

---

## 🧠 Chapter 5 — Trie (Prefix Tree)

### What is a Trie?

A trie is a tree where each node represents a character, and the path from the root to a node spells out a string. All strings sharing a common prefix share the same path from the root. This makes prefix-related queries instantaneous.

Imagine storing the words ["apple", "app", "application", "apply", "banana"]. In a trie, "app" is a shared node, and the paths for "apple", "application", and "apply" all branch off from the node that represents "app". The moment you insert a word, all of its prefixes are implicitly stored.

```python
class TrieNode:
    def __init__(self):
        self.children = {}   # char -> TrieNode
        self.is_end = False  # True if a word ends here
        self.count = 0       # Number of words passing through this node (for prefix counts)
        self.word_count = 0  # Number of times the exact word at this node was inserted

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.count += 1   # One more word passes through here
        node.is_end = True
        node.word_count += 1
    
    def search(self, word):
        """Returns True if word was inserted."""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
    
    def starts_with(self, prefix):
        """Returns count of words with this prefix."""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]
        return node.count
    
    def delete(self, word):
        """Delete one occurrence of word from trie."""
        def _delete(node, word, depth):
            if depth == len(word):
                if node.is_end:
                    node.word_count -= 1
                    if node.word_count == 0:
                        node.is_end = False
                return not node.children and not node.is_end
            char = word[depth]
            if char not in node.children:
                return False
            child = node.children[char]
            child.count -= 1
            should_delete = _delete(child, word, depth + 1)
            if should_delete:
                del node.children[char]
            return not node.children and not node.is_end
        _delete(self.root, word, 0)
```

### Array-based Trie (Faster for Competitive Programming)

For competitive programming where speed matters and the alphabet is fixed (lowercase letters), an array-based trie is much faster than a dict-based one:

```python
MAXN = 200005  # Maximum total characters across all inserted strings
ALPHA = 26     # Alphabet size

children = [[-1] * ALPHA for _ in range(MAXN)]
is_end = [False] * MAXN
cnt = [0] * MAXN
node_count = 1   # Start with just the root (node 0)

def new_node():
    global node_count
    idx = node_count
    node_count += 1
    children[idx] = [-1] * ALPHA
    is_end[idx] = False
    cnt[idx] = 0
    return idx

root = 0

def insert(word):
    node = root
    for ch in word:
        c = ord(ch) - ord('a')
        if children[node][c] == -1:
            children[node][c] = new_node()
        node = children[node][c]
        cnt[node] += 1
    is_end[node] = True
```

---

## 🧠 Chapter 6 — XOR Trie (Binary Trie)

A XOR trie stores integers as their binary representations (from MSB to LSB). This enables powerful queries like "find the element in the set that maximizes XOR with a given value X."

```python
class XORTrie:
    """
    Binary trie for integers. Supports insert and max-XOR query.
    Numbers are stored as 30-bit binary strings (for 10^9 range).
    """
    BITS = 30
    
    def __init__(self):
        self.trie = [[−1, −1]]   # [left_child_index, right_child_index]
    
    def insert(self, num):
        node = 0
        for bit in range(self.BITS - 1, -1, -1):   # MSB first
            b = (num >> bit) & 1
            if self.trie[node][b] == -1:
                self.trie[node][b] = len(self.trie)
                self.trie.append([-1, -1])
            node = self.trie[node][b]
    
    def max_xor(self, num):
        """Find the element in the trie that maximizes XOR with num."""
        node = 0
        result = 0
        for bit in range(self.BITS - 1, -1, -1):
            b = (num >> bit) & 1
            # To maximize XOR, we want the opposite bit
            want = 1 - b
            if self.trie[node][want] != -1:
                result |= (1 << bit)   # We can take the bit we want
                node = self.trie[node][want]
            else:
                node = self.trie[node][b]   # Forced to take same bit
        return result
```

**Classic problem**: Given an array, find the maximum XOR of any two elements. Insert all elements into XOR trie, then for each element query the max XOR with existing elements. O(N × BITS).

---

## 🧠 Chapter 7 — Aho-Corasick (Multi-Pattern Matching)

### The Problem

KMP finds a single pattern in a text in O(N + M). What if you have K patterns and want to find ALL of them in a text simultaneously? Running KMP K times is O(K × N), which is too slow for K = N = 10^4.

Aho-Corasick builds a trie of all patterns, then adds **failure links** (like KMP's pi array) across the trie. A single pass through the text in O(N + total_pattern_length + number_of_matches) finds all patterns simultaneously.

```python
from collections import deque

class AhoCorasick:
    def __init__(self, patterns):
        # Build trie
        self.goto = [{}]        # goto[state][char] = next state
        self.fail = [0]         # fail[state] = KMP-like failure link
        self.output = [[]]      # output[state] = list of pattern indices ending here
        
        # Insert all patterns into trie
        for idx, pattern in enumerate(patterns):
            node = 0
            for ch in pattern:
                if ch not in self.goto[node]:
                    self.goto[node][ch] = len(self.goto)
                    self.goto.append({})
                    self.fail.append(0)
                    self.output.append([])
                node = self.goto[node][ch]
            self.output[node].append(idx)
        
        # Build failure links using BFS
        queue = deque()
        for ch, next_state in self.goto[0].items():
            self.fail[next_state] = 0
            queue.append(next_state)
        
        while queue:
            state = queue.popleft()
            for ch, next_state in self.goto[state].items():
                fail_state = self.fail[state]
                while fail_state and ch not in self.goto[fail_state]:
                    fail_state = self.fail[fail_state]
                self.fail[next_state] = self.goto[fail_state].get(ch, 0)
                if self.fail[next_state] == next_state:
                    self.fail[next_state] = 0
                # Inherit outputs from failure link
                self.output[next_state] += self.output[self.fail[next_state]]
                queue.append(next_state)
    
    def search(self, text):
        """Find all (pattern_index, end_position) matches in text."""
        state = 0
        results = []
        for i, ch in enumerate(text):
            while state and ch not in self.goto[state]:
                state = self.fail[state]
            state = self.goto[state].get(ch, 0)
            for pattern_idx in self.output[state]:
                results.append((pattern_idx, i))
        return results
```

---

## 🧠 Chapter 8 — Suffix Array

### What Is a Suffix Array?

The suffix array `SA` of a string S is an array of integers representing the starting positions of all suffixes of S, sorted in lexicographic order. Together with the LCP (Longest Common Prefix) array, it provides the most powerful general-purpose data structure for substring queries.

```
S = "banana$"    ($ is a sentinel, lexicographically smallest)
Suffixes sorted:
  $ 
  a$
  ana$
  anana$
  banana$
  na$
  nana$

SA = [6, 5, 3, 1, 0, 4, 2]   (starting indices of sorted suffixes)
```

### Building Suffix Array — O(N log N) (Prefix Doubling)

The idea is to sort suffixes by their first 1 character, then 2, then 4, then 8... Each step uses the previous step's ranks to sort, doubling the sorted length each time.

```python
def build_suffix_array(s):
    """O(N log^2 N) implementation using Python's sort. For O(N log N), use radix sort."""
    s += '$'   # Append sentinel (lexicographically smallest character)
    n = len(s)
    
    # Initial ranking based on first character
    suffixes = [(s[i:], i) for i in range(n)]
    suffixes.sort()
    SA = [suf[1] for suf in suffixes]
    return SA[1:]   # Exclude the sentinel itself if desired

def build_suffix_array_efficient(s):
    """O(N log^2 N) via sorting with key tuples (good enough for N ≤ 10^5)."""
    n = len(s)
    # rank[i] = rank of suffix starting at i in the current round
    rank = [ord(c) for c in s]
    SA = list(range(n))
    tmp = [0] * n
    
    k = 1
    while k < n:
        def sort_key(i):
            return (rank[i], rank[i + k] if i + k < n else -1)
        SA.sort(key=sort_key)
        tmp[SA[0]] = 0
        for i in range(1, n):
            tmp[SA[i]] = tmp[SA[i - 1]]
            if sort_key(SA[i]) != sort_key(SA[i - 1]):
                tmp[SA[i]] += 1
        rank = tmp[:]
        if rank[SA[n - 1]] == n - 1:
            break   # All ranks are distinct — we're done
        k <<= 1
    
    return SA
```

### LCP Array

The LCP array `lcp[i]` stores the length of the longest common prefix between `SA[i-1]` and `SA[i]` (consecutive suffixes in sorted order). Computing the LCP array from SA using Kasai's algorithm:

```python
def build_lcp_array(s, SA):
    """Kasai's algorithm. O(N)."""
    n = len(s)
    rank = [0] * n   # Inverse of SA: rank[SA[i]] = i
    for i, sa in enumerate(SA):
        rank[sa] = i
    
    lcp = [0] * n
    h = 0   # Current LCP length being extended
    
    for i in range(n):
        if rank[i] > 0:
            j = SA[rank[i] - 1]   # Previous suffix in sorted order
            # Extend the LCP by matching characters
            while i + h < n and j + h < n and s[i + h] == s[j + h]:
                h += 1
            lcp[rank[i]] = h
            if h > 0:
                h -= 1   # LCP can decrease by at most 1 between consecutive i values
    
    return lcp
```

### Applications of Suffix Array + LCP

With `SA` and `lcp`, you can answer a staggering number of string queries:

**Count of distinct substrings**: Each suffix starting at `SA[i]` contributes `(n - SA[i]) - lcp[i]` new substrings (total length of suffix minus the LCP with the previous suffix, which was already counted). Total = sum over all i of `(n - SA[i]) - lcp[i]`.

**Longest Repeated Substring**: The maximum value in the LCP array.

**Longest Common Substring of two strings**: Concatenate `s + '#' + t + '$'` (with unique separators), build suffix array and LCP, then find the maximum LCP value between a suffix from `s` and a suffix from `t`.

**String matching**: Binary search in the suffix array to find all occurrences of a pattern P in O(M log N).

---

## 🧠 Chapter 9 — Suffix Automaton (SAM)

The Suffix Automaton is the most compact structure that recognizes all substrings of a string. It has O(N) states and transitions (at most 2N states, 3N transitions) and can be built in O(N).

The SAM is the "atomic" structure for online substring problems — problems where you process characters one by one and need to maintain information about all substrings seen so far. It's more complex to implement than suffix arrays but more powerful for dynamic problems.

```python
class SuffixAutomaton:
    def __init__(self):
        self.size = 1
        self.last = 0
        # For each state: len, link (suffix link), transitions
        self.len = [0]
        self.link = [-1]
        self.trans = [{}]
    
    def _new_state(self, length):
        self.len.append(length)
        self.link.append(-1)
        self.trans.append({})
        self.size += 1
        return self.size - 1
    
    def extend(self, c):
        """Add character c to the automaton. O(1) amortized."""
        # Check if transition already exists (handles duplicate characters)
        if c in self.trans[self.last]:
            q = self.trans[self.last][c]
            if self.len[q] == self.len[self.last] + 1:
                self.last = q
                return
            # Clone q
            clone = self._new_state(self.len[self.last] + 1)
            self.link[clone] = self.link[q]
            self.trans[clone] = dict(self.trans[q])
            while self.last != -1 and self.trans[self.last].get(c) == q:
                self.trans[self.last][c] = clone
                self.last = self.link[self.last]
            self.link[q] = clone
            self.last = clone
            return
        
        cur = self._new_state(self.len[self.last] + 1)
        p = self.last
        while p != -1 and c not in self.trans[p]:
            self.trans[p][c] = cur
            p = self.link[p]
        if p == -1:
            self.link[cur] = 0
        else:
            q = self.trans[p][c]
            if self.len[q] == self.len[p] + 1:
                self.link[cur] = q
            else:
                clone = self._new_state(self.len[p] + 1)
                self.link[clone] = self.link[q]
                self.trans[clone] = dict(self.trans[q])
                while p != -1 and self.trans[p].get(c) == q:
                    self.trans[p][c] = clone
                    p = self.link[p]
                self.link[q] = clone
                self.link[cur] = clone
        self.last = cur
    
    def count_distinct_substrings(self):
        """Count of distinct non-empty substrings. Each state represents a set of substrings."""
        total = 0
        for i in range(1, self.size):   # Skip state 0 (initial state)
            total += self.len[i] - self.len[self.link[i]]
        return total
```

---

## 🧠 Chapter 10 — Manacher's Algorithm (All Palindromes in O(N))

Manacher's finds the longest palindrome centered at each position of a string in O(N) total. The insight is the same as Z-algorithm: when we know a palindrome covers a range, we can reuse earlier computations for positions inside that range.

```python
def manacher(s):
    """
    Returns p[] where p[i] = radius of the longest palindrome centered at i.
    Works on the transformed string '#a#b#a#' to handle even-length palindromes uniformly.
    """
    # Transform: insert '#' between every character and at ends
    t = '#' + '#'.join(s) + '#'
    n = len(t)
    p = [0] * n
    center, right = 0, 0   # Center and right boundary of rightmost palindrome
    
    for i in range(n):
        if i < right:
            mirror = 2 * center - i
            p[i] = min(right - i, p[mirror])
        # Attempt to expand palindrome centered at i
        while (i - p[i] - 1 >= 0 and i + p[i] + 1 < n and
               t[i - p[i] - 1] == t[i + p[i] + 1]):
            p[i] += 1
        # Update rightmost palindrome
        if i + p[i] > right:
            center, right = i, i + p[i]
    
    return p

def longest_palindrome(s):
    p = manacher(s)
    max_len = max(p)
    center = p.index(max_len)
    # Convert back to original string coordinates
    start = (center - max_len) // 2
    return s[start : start + max_len]
```

---

## 🎯 Practice Problems (Sorted by Difficulty)

For hashing and basic string manipulation, start with **CF 1200D — White Lines** (1800) which requires hashing plus a sliding-window-like argument. **CF 126E — Divisor String** teaches you to think about hash properties carefully.

For KMP, the canonical warmup is any "find all occurrences" problem. Then try **CF 1063F — String Journey** (2700) where the KMP failure function structure itself becomes the main tool.

For Trie problems, **CF 282E — Solitaire** (2100) and **CF 455B — A Lot of Games** (1800) both require trie-based reasoning about game trees.

For XOR trie, **CF 665E — Beautiful Subarrays** (2100) and **CF 1400G — Mercenaries** both reduce to max-XOR queries.

For Aho-Corasick, try **CF 691D — Swaps in Permutation** and the classic **CF 696D — Legen...**

For suffix arrays, the problems worth solving are **CF 1063F** and **CF 827F — Expected Arc Length** at the 2200+ tier.

---

## 📝 Summary

String algorithms form their own ecosystem, and knowing which tool to reach for is half the battle. Hashing gives you O(1) equality checks at the cost of a small collision risk — use double hashing for safety. KMP and Z-algorithm solve single-pattern matching in O(N + M) with O(M) preprocessing. Trie handles prefix queries and is the building block for Aho-Corasick (multi-pattern matching) and XOR optimization. Suffix Array + LCP is the all-purpose offline tool for substring problems. Suffix Automaton is the all-purpose online tool. Manacher's handles all palindrome queries in one linear pass.

The mental decision tree: if the problem asks about prefixes of a set of strings, reach for a trie. If it asks about pattern occurrence in a text, reach for KMP or Z. If it asks about substrings with some property globally, reach for suffix array or SAM. If it involves XOR of elements, think binary trie. If it asks about palindromes, think Manacher's.