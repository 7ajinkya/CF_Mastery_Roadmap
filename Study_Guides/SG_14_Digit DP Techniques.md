# 📘 Study Guide 14 — Digit DP Techniques

> **Difficulty Range**: Intermediate → Expert (CF 1500 → 2300)
> **Core Idea**: Digit DP counts integers in a range [L, R] that satisfy a property defined by their decimal (or binary) digits, by building numbers digit-by-digit from the most significant to least significant while tracking a compact "state" that captures everything needed to evaluate the property.

---

## 🧠 Chapter 1 — The Problem Class Digit DP Solves

### The Setup

You'll encounter problems phrased like "count the integers in [1, N] whose digits sum to a multiple of K" or "how many numbers in [L, R] have no two consecutive identical digits?" or "find the count of integers in [1, N] where the number equals the product of its digits." These are all digit DP problems.

The defining characteristic is that the property depends on the **digits** of the number, not the number itself as a whole — and you need to count how many integers in a range have this property.

### Why Brute Force Fails

For ranges like [1, 10^18], you cannot iterate over all numbers. You need a way to count without enumerating. Digit DP builds each number from the most significant digit to the least significant digit, making a choice at each position, and cleverly avoids re-exploring situations you've already analyzed.

### The Fundamental Trick: Counting [1, N] Then Using Prefix Differences

Almost all digit DP problems are solved by defining a function `f(N)` = count of valid numbers in [1, N], and then answering [L, R] as `f(R) - f(L-1)`. This reduces every range problem to a single-bound problem.

---

## 🧠 Chapter 2 — The Architecture of a Digit DP Solution

### The Three Key Parameters

Every digit DP has this recursive structure:
```
solve(position, tight, leading_zero, extra_state)
```

**`position`** is which digit you're currently placing (0 = most significant). When `position == len(digits)`, you've placed all digits and should check if the number formed is valid.

**`tight`** is a boolean that tracks whether the digits placed so far exactly match the corresponding prefix of the upper bound N. If `tight` is True, then the next digit is limited to `[0, digits[position]]`. If `tight` is False, you've already placed a digit smaller than N's digit, so all remaining digits can freely be `[0, 9]`. This flag is what prevents you from going over N.

**`leading_zero`** tracks whether all digits placed so far have been 0. This is needed because the number "007" is really just "7" — leading zeros don't count as part of the number. When `leading_zero` is True, you haven't started the actual number yet, and conditions like "digit sum" or "no consecutive identical digits" don't yet apply.

**`extra_state`** is everything else your property needs. The digit sum so far, the last digit placed, a remainder modulo K, whether you've placed a specific digit yet — whatever is required. Crucially, this state must be **small** enough that the total number of (position, tight, leading_zero, extra_state) combinations is manageable.

### The Template in Python

```python
from functools import lru_cache

def count_valid_up_to(N, condition_params):
    """Count valid numbers in [0, N] satisfying the property."""
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, *state):
        # BASE CASE: all digits placed
        if pos == n:
            # Only count if it's not the "0" number (leading_zero True = we placed nothing real)
            # Adjust based on whether you want to count 0 or not
            return 0 if leading_zero else (1 if is_valid(*state) else 0)
        
        # Determine the maximum digit we can place here
        limit = digits[pos] if tight else 9
        total = 0
        
        for digit in range(0, limit + 1):
            new_tight = tight and (digit == limit)
            new_leading_zero = leading_zero and (digit == 0)
            
            # Update the extra state based on the digit placed
            if new_leading_zero:
                # We're still in leading zeros — don't update state yet
                new_state = state
            else:
                new_state = update_state(state, digit)
            
            total += dp(pos + 1, new_tight, new_leading_zero, *new_state)
        
        return total
    
    return dp(0, True, True, *initial_state)
```

The `@lru_cache` handles memoization automatically. Notice that `tight=True` states are NOT reused across different N values (because the `limit` depends on which digit of N we're comparing against). However, `tight=False` states are fully reusable — they don't depend on N at all. This is exactly why the DP is efficient: most states have `tight=False`, and those are shared.

---

## 🧠 Chapter 3 — Worked Example 1: Count Numbers with Digit Sum Divisible by K

This is the simplest digit DP example that captures all the essential ideas.

**Problem**: Count integers in [1, N] whose sum of digits is divisible by K.

The extra state is just one number: `digit_sum mod K`. Since we need it to equal 0 at the end, we track its remainder modulo K as we go.

```python
def count_digit_sum_divisible(N, K):
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, remainder):
        """
        pos: current digit position
        tight: are we still bounded by N?
        leading_zero: are we still in the leading zeros phase?
        remainder: current digit sum mod K
        """
        if pos == n:
            # Valid if not a leading-zero number AND digit sum ≡ 0 (mod K)
            return 0 if leading_zero else (1 if remainder == 0 else 0)
        
        limit = digits[pos] if tight else 9
        total = 0
        
        for d in range(0, limit + 1):
            new_tight = tight and (d == limit)
            new_leading_zero = leading_zero and (d == 0)
            
            # Only add to remainder if we're past leading zeros
            new_remainder = remainder if new_leading_zero else (remainder + d) % K
            
            total += dp(pos + 1, new_tight, new_leading_zero, new_remainder)
        
        return total
    
    result = dp(0, True, True, 0)
    dp.cache_clear()   # Important: clear cache between calls with different N
    return result

# For range [L, R]: f(R) - f(L-1)
def solve(L, R, K):
    return count_digit_sum_divisible(R, K) - count_digit_sum_divisible(L - 1, K)
```

**Trace on N=20, K=3**: Valid numbers are those with digit sum divisible by 3: 3, 6, 9, 12, 15, 18. Answer is 6. The DP explores all (position, tight, leading_zero, remainder) combinations — only O(digits × 2 × 2 × K) distinct states, which is tiny.

---

## 🧠 Chapter 4 — Worked Example 2: No Two Consecutive Same Digits

**Problem**: Count integers in [1, N] where no two adjacent digits are the same.

The extra state here is just the `last_digit` placed (or -1 if we're in leading zeros). At each position, we can't place the same digit as the last one.

```python
def count_no_consecutive_same(N):
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, last_digit):
        if pos == n:
            return 0 if leading_zero else 1   # All valid placements are counted
        
        limit = digits[pos] if tight else 9
        total = 0
        
        for d in range(0, limit + 1):
            if not leading_zero and d == last_digit:
                continue   # Forbidden: same as previous digit
            
            new_tight = tight and (d == limit)
            new_leading_zero = leading_zero and (d == 0)
            new_last = -1 if new_leading_zero else d
            
            total += dp(pos + 1, new_tight, new_leading_zero, new_last)
        
        return total
    
    result = dp(0, True, True, -1)
    dp.cache_clear()
    return result
```

Notice how the `last_digit` naturally handles the leading zero case: we use -1 as a sentinel meaning "no real digit placed yet," so no constraint applies until the first non-zero digit.

---

## 🧠 Chapter 5 — Worked Example 3: Counting Numbers with a Specific Digit Count

**Problem**: Count integers in [1, N] that contain at least one occurrence of digit d.

One approach: count all numbers MINUS those with NO occurrence of d. This "complementary counting" is very common in digit DP — it's often easier to count the complement.

```python
def count_containing_digit(N, target_digit):
    """Count numbers in [1, N] that contain digit target_digit at least once."""
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, seen):
        """seen = True if target_digit has appeared at least once."""
        if pos == n:
            return (1 if seen else 0) if not leading_zero else 0
        
        limit = digits[pos] if tight else 9
        total = 0
        
        for d in range(0, limit + 1):
            new_tight = tight and (d == limit)
            new_leading_zero = leading_zero and (d == 0)
            new_seen = seen or (not new_leading_zero and d == target_digit)
            
            total += dp(pos + 1, new_tight, new_leading_zero, new_seen)
        
        return total
    
    result = dp(0, True, True, False)
    dp.cache_clear()
    return result
```

Because `seen` is a boolean, the state space is tiny: O(n × 2 × 2 × 2) = O(n). This is why digit DP is so efficient — extra states that are booleans or small integers add almost nothing to the complexity.

---

## 🧠 Chapter 6 — Multi-Property States and Combining Conditions

### Tracking Multiple Properties Simultaneously

The real power of digit DP shows when you combine multiple properties. For example: "Count numbers in [L, R] whose digit sum is divisible by K AND no digit appears more than twice." You simply expand the state to include both constraints.

```python
def count_combined(N, K):
    """Count numbers in [1,N]: digit_sum % K == 0 AND no digit appears more than twice."""
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, remainder, digit_counts):
        """digit_counts: tuple of 10 values, digit_counts[d] = times d appeared."""
        if pos == n:
            if leading_zero: return 0
            return 1 if remainder == 0 else 0
        
        limit = digits[pos] if tight else 9
        total = 0
        
        for d in range(0, limit + 1):
            new_tight = tight and (d == limit)
            new_leading_zero = leading_zero and (d == 0)
            
            if new_leading_zero:
                new_counts = digit_counts
                new_rem = remainder
            else:
                # Reject if this digit has already appeared twice
                if digit_counts[d] >= 2:
                    continue
                new_counts = list(digit_counts)
                new_counts[d] += 1
                new_counts = tuple(new_counts)
                new_rem = (remainder + d) % K
            
            total += dp(pos + 1, new_tight, new_leading_zero, new_rem, new_counts)
        
        return total
    
    result = dp(0, True, True, 0, tuple([0] * 10))
    dp.cache_clear()
    return result
```

The state space here is O(n × 2 × 2 × K × 3^10) in the worst case — K × 3^10 can be large. In practice, many states are unreachable (you can't have 3 of every digit in a short number), so the actual number of visited states is much smaller.

### State Space Management

When designing digit DP, the critical question is always: "Is my state space manageable?" A rough rule: if total states (excluding the `tight` and `leading_zero` dimensions, since those only double the count) are under 10^7, you're fine. If they're larger, look for a way to reduce the state.

One common reduction: instead of tracking `digit_counts` exactly, track only what matters. If you only care about whether each digit appeared 0, 1, or ≥2 times, that's 3^10 ≈ 59,000 states — manageable. If you only care about the sum of counts (digit_sum), that's much smaller still.

---

## 🧠 Chapter 7 — Digit DP on Non-Decimal Systems

Digit DP isn't limited to base 10. The same framework works on binary representations, which is important because many problems ask about properties of the binary representation of numbers.

### Binary Digit DP

For binary digit DP, you work with the binary digits of N. The structure is identical, just with digits being 0 or 1 and `limit` being the corresponding bit of N.

```python
def count_binary_property(N, max_consecutive_ones):
    """Count numbers in [1, N] with no run of more than max_consecutive_ones consecutive 1s."""
    bits = []
    temp = N
    while temp:
        bits.append(temp & 1)
        temp >>= 1
    bits = bits[::-1]   # MSB first
    n = len(bits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, consecutive_ones):
        """consecutive_ones: current run of 1s at the end."""
        if pos == n:
            return 0 if leading_zero else 1
        
        limit = bits[pos] if tight else 1
        total = 0
        
        for b in range(0, limit + 1):
            new_tight = tight and (b == limit)
            new_leading_zero = leading_zero and (b == 0)
            
            if new_leading_zero:
                new_consec = 0
            elif b == 1:
                new_consec = consecutive_ones + 1
                if new_consec > max_consecutive_ones:
                    continue   # This placement violates the property — prune!
            else:
                new_consec = 0
            
            total += dp(pos + 1, new_tight, new_leading_zero, new_consec)
        
        return total
    
    result = dp(0, True, True, 0)
    dp.cache_clear()
    return result
```

The pruning (`continue` when a constraint is violated) is an important optimization: you immediately stop exploring branches that are already invalid, rather than waiting until all digits are placed.

---

## 🧠 Chapter 8 — Digit DP for Sum Queries (Not Just Counting)

Digit DP isn't limited to counting — you can compute the sum of all valid numbers, or the sum of a function of each valid number, by carrying not just a count but also accumulated totals.

### Sum of All Valid Numbers in [1, N]

The idea is to return a pair (count, sum) from the DP instead of just a count. This way, each call computes both "how many valid numbers are in this subtree" and "what is their total sum."

```python
def sum_of_valid_numbers(N, K):
    """Sum of all integers in [1, N] with digit sum divisible by K."""
    digits = list(map(int, str(N)))
    n = len(digits)
    
    @lru_cache(maxsize=None)
    def dp(pos, tight, leading_zero, remainder):
        """Returns (count, total_sum) of valid completions."""
        if pos == n:
            if leading_zero: return (0, 0)
            return (1, 0) if remainder == 0 else (0, 0)
        
        limit = digits[pos] if tight else 9
        total_count = 0
        total_sum = 0
        
        for d in range(0, limit + 1):
            new_tight = tight and (d == limit)
            new_leading_zero = leading_zero and (d == 0)
            new_rem = remainder if new_leading_zero else (remainder + d) % K
            
            sub_count, sub_sum = dp(pos + 1, new_tight, new_leading_zero, new_rem)
            
            # Each sub-completion appends its digits after position pos.
            # The contribution of digit d at position pos to the total sum is:
            # d * 10^(remaining_positions) * sub_count + sub_sum
            remaining = n - pos - 1
            total_sum += d * (10 ** remaining) * sub_count + sub_sum
            total_count += sub_count
        
        return (total_count, total_sum)
    
    _, result = dp(0, True, True, 0)
    dp.cache_clear()
    return result
```

The key insight for sum computation: when digit `d` is placed at position `pos` (which has `remaining = n - pos - 1` positions after it), it contributes `d × 10^remaining` to every valid number in the subtree. So the total contribution to the sum is `d × 10^remaining × sub_count`. The sub_sum captures the contributions from all later digits.

---

## 🧠 Chapter 9 — Advanced Patterns and Edge Cases

### Handling the Lower Bound

When answering "count in [L, R]," you compute `f(R) - f(L-1)`. But computing `L - 1` when `L` is a very large number (like 10^18 stored as a string) requires careful arithmetic. In Python, this is easy: just convert to integer, subtract 1, and convert back. In C++, you need to manually subtract 1 from the string.

### The "Strictly Less Than N" Variant

Some problems ask for numbers in [1, N) (strictly less than N). You can either compute `f(N) - 1` (subtract 1 because f(N) includes N itself if valid) or change your base case: at `pos == n` with `tight == True`, the number formed equals N exactly — handle this separately.

### Digit DP on Sequences (Not Just Numbers)

A generalization: digit DP can apply to any problem where you build a string character by character and need to count valid completions. For example, counting valid bracket sequences of length N, counting strings with at most K distinct characters, or counting strings that avoid a specific pattern. The framework is identical — just replace "digit" with "character" and "number bound" with "sequence bound."

### Resetting the Cache

This is a common source of bugs in Python. When you call `dp(...)` multiple times with different upper bounds (e.g., computing `f(R)` and then `f(L-1)`), you must clear the cache between calls. The `tight` parameter varies based on the digits of the upper bound, so cached values from the first call are wrong for the second call — EXCEPT for states where `tight=False`, which are independent of the bound.

The cleanest solution: either use manual memoization with a dictionary that you clear, or redefine the function inside `count_valid_up_to(N)` so the `digits` variable is captured fresh each time.

---

## 🧠 Chapter 10 — Bottom-Up Digit DP

While top-down (memoization) is the most natural way to write digit DP, bottom-up (tabulation) can be more efficient for some problems. The approach is to explicitly loop over all digit positions and track state distributions.

```python
def count_digit_sum_div_bottom_up(N, K):
    """Bottom-up digit DP. No recursion."""
    digits = list(map(int, str(N)))
    n = len(digits)
    
    # dp_tight[rem] = count of numbers with current prefix equal to N's prefix,
    #                 with current digit sum ≡ rem (mod K)
    # dp_free[rem]  = count of numbers with current prefix strictly less than N's prefix
    dp_tight = [0] * K
    dp_free = [0] * K
    dp_tight[0] = 1   # Empty prefix: sum = 0
    
    for pos in range(n):
        new_tight = [0] * K
        new_free = [0] * K
        limit = digits[pos]
        
        # Extend tight states: only digit = digits[pos] keeps tight=True
        for rem in range(K):
            if dp_tight[rem]:
                d = limit   # Must place exactly this digit to stay tight
                new_tight[(rem + d) % K] += dp_tight[rem]
        
        # Extend tight states with digit < limit: become free
        for rem in range(K):
            if dp_tight[rem]:
                for d in range(0, limit):
                    new_free[(rem + d) % K] += dp_tight[rem]
        
        # Extend free states: all digits 0-9
        for rem in range(K):
            if dp_free[rem]:
                for d in range(10):
                    new_free[(rem + d) % K] += dp_free[rem]
        
        dp_tight = new_tight
        dp_free = new_free
    
    # Count valid numbers: all states with remainder 0, excluding the all-zeros number
    result = dp_free[0] + dp_tight[0] - 1   # -1 to exclude 0 itself
    return max(0, result)
```

The bottom-up version makes the tight/free split explicit and iterates column by column, which can be more cache-friendly but harder to extend to complex states.

---

## 🎯 Practice Problems (Sorted by Difficulty)

The best way to develop intuition for digit DP is to solve a progression of problems where each one requires tracking one more piece of state than the last. Start with **CF 1036C — Classy Numbers** (2000), which asks you to track the number of non-zero digits and their contribution in a specific way — it's a perfect introduction because the state is small and the problem is clearly about digits.

For sum-type digit DP where you return totals rather than counts, **CF 1073E — Segment Sum** (2100) is the gold standard: you need to count the sum of all numbers in [L, R] that contain only specific digits. The "sum of values" extension makes it substantially harder than pure counting.

For binary digit DP, **CF 1245F — Gravitas** and **CF 1285F — Classical?** both require careful reasoning about binary representations of numbers in ranges.

For multi-property states that push the state space to its limits, **CF 1202E — You Need to Scatter Them** (2200) and **CF 1370E — Binary Subsequences** require combining digit constraints with subsequence-like tracking.

---

## 📝 Summary

Digit DP is the specialized technique for counting integers in [L, R] satisfying some digit-based property. The universal structure has three layers: the digit positions from most to least significant, the `tight` flag that enforces the upper bound, and the `leading_zero` flag that handles numbers shorter than N. Everything else — the property being checked — lives in the extra state.

The most important skill to develop is **state design**: figuring out exactly what information you need to carry from one digit position to the next, while keeping the state space small. A boolean costs nothing. A remainder mod K costs a factor of K. A full digit-count array costs 3^10 ≈ 60,000. Always ask: "Can I summarize the relevant history in a smaller state?"

Once the state is defined, the template is completely mechanical — `for digit in range(0, limit+1)`, update state, recurse, memoize. The code is short; the thinking is in the state design.