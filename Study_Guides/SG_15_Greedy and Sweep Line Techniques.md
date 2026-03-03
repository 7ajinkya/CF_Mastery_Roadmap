# 📘 Study Guide 15 — Greedy Algorithms & Sweep Line Techniques

> **Difficulty Range**: Beginner → Expert (CF 900 → 2300)
> **Core Idea**: Greedy algorithms make the locally optimal choice at each step, trusting it leads to a globally optimal solution. Sweep line processes geometric/event-based problems by scanning from left to right, maintaining an active set that changes at events.

---

## 🧠 Chapter 1 — What Makes a Greedy Algorithm Work?

### The Fundamental Question

The hardest part of greedy problems isn't writing the code — it's convincing yourself the greedy choice is correct. Many students make this mistake: they identify a "greedy intuition," code it up, submit, and get Wrong Answer — because the greedy was wrong. The right approach is to **prove** (or at least rigorously argue) that the greedy choice is safe before coding it.

There are two classical proof techniques you should have in your toolkit.

### Proof Technique 1: Exchange Argument

Suppose you have an optimal solution that doesn't make the greedy choice at some step. Show that you can "swap" the non-greedy choice for the greedy one without making the solution worse. If such a swap is always possible, then there's always an optimal solution that makes the greedy choice — meaning greedy is safe.

**Example**: Job Scheduling (minimize maximum lateness). You have N jobs, each with a processing time `p[i]` and a deadline `d[i]`. You can do them in any order. Greedy: sort by deadline (Earliest Deadline First, or EDF).

Proof via exchange argument: Suppose in some optimal schedule, job B appears before job A, but `d[A] < d[B]` (A's deadline is earlier). Swap A and B. Before the swap, A's lateness is `finish(B) - d[A]` and B's lateness is `finish(B) + finish(A before B) - d[B]`... Actually, after the swap, A finishes earlier so its lateness decreases, and B now finishes where A used to finish so its lateness might increase — but since `d[A] < d[B]`, the net maximum lateness doesn't increase. The exchange never makes things worse, so the EDF order is optimal.

### Proof Technique 2: Greedy Stays Ahead

At each step of the algorithm, show that the greedy solution is "at least as good" as any other algorithm at that point. If you can show the greedy solution is always at least as far ahead as any other solution after each step, then it must be at least as good at the end.

**Example**: Activity Selection (maximum number of non-overlapping activities). Greedy: always pick the activity that finishes earliest among all activities that start after the last selected activity.

Proof via "greedy stays ahead": After selecting the first `k` activities, greedy always finishes by time `t_k` which is ≤ any other selection's `k`-th activity finish time. By induction, this means greedy never "closes off" future opportunities more than any other solution.

---

## 🧠 Chapter 2 — The Classic Greedy Problems You Must Know Cold

### Activity Selection / Interval Scheduling

**Problem**: Given N intervals `[start[i], end[i]]`, find the maximum number of non-overlapping intervals.

**Greedy**: Sort by finish time. Greedily pick each interval that doesn't overlap with the last selected one.

```python
def max_non_overlapping(intervals):
    """Sort by finish time, greedily pick non-overlapping intervals."""
    intervals.sort(key=lambda x: x[1])   # Sort by end time
    count = 0
    last_end = float('-inf')
    
    for start, end in intervals:
        if start >= last_end:   # Doesn't overlap with last selected
            count += 1
            last_end = end
    
    return count
```

**Why finish-time sort?** Selecting the interval that finishes earliest leaves the most room for future intervals — it's the most "considerate" choice. Any interval that starts after it could have started after any later-finishing alternative too, so we lose nothing.

### Interval Covering (Minimum Number of Intervals to Cover a Range)

**Problem**: Cover the entire range `[L, R]` using the minimum number of given intervals `[a[i], b[i]]`.

**Greedy**: At each step, among all intervals that start at or before the current position, pick the one that extends the furthest to the right.

```python
def min_intervals_to_cover(target_L, target_R, intervals):
    """Minimum intervals needed to cover [target_L, target_R]."""
    intervals.sort()   # Sort by start time
    count = 0
    current_end = target_L   # We need to cover starting from here
    i = 0
    n = len(intervals)
    
    while current_end < target_R:
        # Among all intervals starting at or before current_end, pick the furthest reach
        best_reach = current_end
        while i < n and intervals[i][0] <= current_end:
            best_reach = max(best_reach, intervals[i][1])
            i += 1
        
        if best_reach == current_end:
            return -1   # Can't cover — no interval reaches past current_end
        
        count += 1
        current_end = best_reach
    
    return count
```

### Fractional Knapsack

**Problem**: Items with weights and values; you can take fractions. Maximize value.

**Greedy**: Sort by value-per-unit-weight (value/weight ratio). Take as much as possible of the highest-ratio item, then the next, and so on.

```python
def fractional_knapsack(weights, values, capacity):
    n = len(weights)
    items = sorted(zip(values, weights), key=lambda x: -x[0] / x[1])   # Sort by v/w descending
    
    total_value = 0.0
    for v, w in items:
        if capacity <= 0:
            break
        take = min(w, capacity)
        total_value += v * (take / w)
        capacity -= take
    
    return total_value
```

### Huffman Coding (Greedy on a Priority Queue)

**Problem**: Given frequencies for N symbols, build a prefix-free binary code that minimizes the total encoded length. This is the foundation of data compression.

**Greedy**: Repeatedly merge the two lowest-frequency symbols/trees, building up the Huffman tree bottom-up.

```python
import heapq

def huffman_cost(frequencies):
    """Minimum total encoding cost = sum of freq[i] * depth[i]."""
    heap = list(frequencies)
    heapq.heapify(heap)
    total_cost = 0
    
    while len(heap) > 1:
        a = heapq.heappop(heap)
        b = heapq.heappop(heap)
        merged = a + b
        total_cost += merged   # Each merge adds the combined frequency as a cost
        heapq.heappush(heap, merged)
    
    return total_cost
```

### Task Scheduling (Minimize Weighted Completion Time)

**Problem**: N jobs with processing times `p[i]` and weights `w[i]`. Schedule them to minimize sum of `w[i] * completion_time[i]`.

**Greedy**: Sort by `w[i] / p[i]` in decreasing order (higher weight-to-time ratio first). This is the "Smith's Rule."

```python
def min_weighted_completion_time(processing, weights):
    n = len(processing)
    jobs = sorted(range(n), key=lambda i: -weights[i] / processing[i])
    
    total = 0
    time = 0
    for i in jobs:
        time += processing[i]
        total += weights[i] * time
    return total
```

---

## 🧠 Chapter 3 — Greedy with Data Structures

### Greedy on Sorted Events with a Heap

Many greedy algorithms become efficient when combined with a priority queue (heap). The pattern is: process events in some sorted order; at each step, the greedy choice is the "best available option," which a heap tracks in O(log N).

**Classroom / Meeting Room Problem**: Given N meetings `[start, end]`, find the minimum number of rooms needed.

**Greedy insight**: At the moment a meeting starts, we need a room. If any room has finished its previous meeting (finish time ≤ current start time), reuse the one that finished latest (this leaves "more recently freed" rooms for future meetings that might start later — actually any reusable room works, but using the one with latest finish time is one valid approach; in this specific problem any free room suffices).

```python
import heapq

def min_meeting_rooms(meetings):
    meetings.sort()   # Sort by start time
    # Min-heap: stores finish times of ongoing meetings
    heap = []   # heap[0] = smallest finish time among ongoing meetings
    
    for start, end in meetings:
        if heap and heap[0] <= start:
            # A room has freed up — reuse it (pop the earliest finish, push new end)
            heapq.heapreplace(heap, end)
        else:
            # No room available — open a new one
            heapq.heappush(heap, end)
    
    return len(heap)   # Number of rooms = size of heap at the end
```

### Greedy with Sorting + Two Pointers

A common pattern for matching problems: you want to pair elements from two sorted arrays to satisfy a constraint with minimum "waste."

**Assign Cookies to Children**: Children need cookies of at least size `g[i]`. Cookies have sizes `s[j]`. Maximize number of satisfied children.

```python
def find_content_children(greed, sizes):
    greed.sort()
    sizes.sort()
    child = cookie = 0
    while child < len(greed) and cookie < len(sizes):
        if sizes[cookie] >= greed[child]:
            child += 1   # This cookie satisfies this child
        cookie += 1       # Use or skip this cookie
    return child
```

---

## 🧠 Chapter 4 — When Greedy Fails: Counterexamples to Build Intuition

The most important lesson in greedy problem-solving is recognizing when greedy does NOT work. Here are cases that look greedy but aren't.

**0/1 Knapsack**: Unlike fractional knapsack, you can't take fractions. Sorting by value/weight ratio and greedily filling doesn't work — taking a slightly lower-ratio item might free up space for a combination of other items that yields a higher total value. DP is necessary.

**Coin Change (arbitrary denominations)**: With standard denominations like [1, 5, 10, 25], greedy (take the largest coin that fits) works. But with denominations like [1, 3, 4] and target 6, greedy picks [4, 1, 1] (3 coins) while optimal is [3, 3] (2 coins). Always verify greedy on coin change problems.

**Longest Path in a Graph**: Greedy "always extend by the best immediate next step" doesn't work because a path that looks bad early on might lead to a very long path later.

**Coloring Problems**: Greedy coloring algorithms don't always achieve the minimum number of colors — they produce valid colorings but not necessarily optimal ones.

The takeaway: whenever you think "greedy," immediately try to find a counterexample. If you find one, you need DP or another approach. If you can't find one and the exchange argument works, you're likely safe.

---

## 🧠 Chapter 5 — Sweep Line: The Core Idea

### What Is a Sweep Line?

A sweep line is an algorithmic technique where you imagine a vertical line moving from left to right across a plane (or a timeline). As it sweeps, it encounters "events" — points where something changes. You process each event in order, maintaining a data structure that represents the "active state" at the current position of the sweep line.

The power of the sweep line is that it converts a 2D problem (geometry or intervals in a timeline) into a series of 1D problems solved sequentially. Instead of considering all pairs of objects, you only ever consider interactions between objects that are simultaneously "active."

### The General Template

```python
def sweep_line(events):
    """
    events: a list of (position, event_type, data) tuples.
    Sort events by position, then by a tiebreaking rule.
    """
    events.sort()   # Sort by position first
    active = SomeDataStructure()   # Tracks currently active objects
    result = initialize_result()
    
    for position, event_type, data in events:
        if event_type == START:
            active.add(data)
            # Update result based on the new active set
        elif event_type == END:
            active.remove(data)
            # Update result based on the reduced active set
        # Process queries that occur at this position
    
    return result
```

The critical design decisions are: what constitutes an event, what the active set tracks, and which data structure best supports the operations needed on the active set (usually insert, delete, and some query like "minimum," "count," or "nearest").

---

## 🧠 Chapter 6 — Classic Sweep Line Problems

### Counting Overlapping Intervals

**Problem**: Given N intervals, find the maximum number of intervals that overlap at any point (the "peak" of the timeline).

This is the simplest sweep line problem. Each interval generates two events: a "start" at its left endpoint and an "end" at its right endpoint. As we sweep, we count the active intervals, tracking the maximum.

```python
def max_overlap(intervals):
    events = []
    for start, end in intervals:
        events.append((start, 0))   # 0 = start (sort starts before ends at same position)
        events.append((end, 1))     # 1 = end (process ends AFTER starts at same time)
    
    events.sort()
    active = 0
    max_active = 0
    
    for _, event_type in events:
        if event_type == 0:
            active += 1
            max_active = max(max_active, active)
        else:
            active -= 1
    
    return max_active
```

The **tiebreaking rule** (sort starts before ends at the same position) matters here: if an interval ends exactly when another starts, they DON'T overlap, so we should not count them as simultaneously active. By processing "end" events (type 1) after "start" events (type 0) at the same position, we correctly avoid this.

### Area of Union of Rectangles

**Problem**: Given N axis-aligned rectangles, find the total area covered (counting overlapping regions only once).

The sweep line processes vertical events (left and right edges of rectangles). At each event, the "active set" is the set of y-intervals covered by rectangles whose left edge has passed but right edge has not. The area contribution between two consecutive x-events is `delta_x × total_covered_y_length`.

```python
def area_of_union(rectangles):
    """Sweep line + interval union length calculation."""
    events = []
    for x1, y1, x2, y2 in rectangles:
        events.append((x1, +1, y1, y2))   # Left edge: add y-interval
        events.append((x2, -1, y1, y2))   # Right edge: remove y-interval
    
    events.sort()
    
    # For each x-position, we need to compute total length of union of y-intervals
    # Here we use a naive O(N^2) approach; use segment tree for O(N log N)
    
    def covered_length(y_intervals):
        if not y_intervals: return 0
        sorted_ivs = sorted(y_intervals)
        total = 0
        cur_start, cur_end = sorted_ivs[0]
        for start, end in sorted_ivs[1:]:
            if start <= cur_end:
                cur_end = max(cur_end, end)
            else:
                total += cur_end - cur_start
                cur_start, cur_end = start, end
        total += cur_end - cur_start
        return total
    
    active_y = []   # List of (y1, y2) for active rectangles
    total_area = 0
    prev_x = None
    
    for x, delta, y1, y2 in events:
        if prev_x is not None and active_y:
            total_area += (x - prev_x) * covered_length(active_y)
        if delta == +1:
            active_y.append((y1, y2))
        else:
            active_y.remove((y1, y2))
        prev_x = x
    
    return total_area
```

For an O(N log N) implementation, replace the `covered_length` naive computation with a lazy-propagation segment tree that supports "add a y-interval" and "remove a y-interval" and "query total covered length."

### Closest Pair of Points

The classic sweep line application in computational geometry. Sorting points by x-coordinate and maintaining a "window" of points within distance `d` of the sweep line, using a sorted set ordered by y-coordinate.

```python
from sortedcontainers import SortedList
import math

def closest_pair(points):
    """O(N log N) closest pair using sweep line."""
    points.sort()   # Sort by x-coordinate
    min_dist = float('inf')
    active = SortedList(key=lambda p: p[1])   # Sort by y-coordinate
    left = 0   # Left pointer into points: everything with x < points[i].x - min_dist
    
    for i, (x, y) in enumerate(points):
        # Remove points too far to the left
        while points[left][0] < x - min_dist:
            active.remove(points[left])
            left += 1
        
        # Check all active points within y-distance min_dist
        # (only O(1) amortized due to packing argument)
        lo = active.bisect_left((x, y - min_dist))
        hi = active.bisect_right((x, y + min_dist))
        for j in range(lo, hi):
            px, py = active[j]
            dist = math.sqrt((x - px)**2 + (y - py)**2)
            if dist < min_dist:
                min_dist = dist
        
        active.add((x, y))
    
    return min_dist
```

### Event-Based Simulation

Many contest problems disguise a sweep line as a simulation: "process events in chronological order." The key is to identify what changes at each event and maintain a data structure that reflects the current state efficiently.

**Sample structure for timeline problems**:

```python
def process_timeline(events):
    """
    Events: (time, type, data). Process in time order, maintaining state.
    """
    events.sort()
    import heapq
    
    # Example: track N processes with priorities; at each event, process the highest-priority active one
    active_heap = []   # Min-heap of (priority, process_id)
    
    for time, etype, data in events:
        if etype == 'arrive':
            priority, pid = data
            heapq.heappush(active_heap, (priority, pid))
        elif etype == 'query':
            # Who's the highest priority active process right now?
            if active_heap:
                print(active_heap[0][1])
```

---

## 🧠 Chapter 7 — Sweep Line on Intervals: The Difference Array Connection

The difference array (from SG_01) is actually a degenerate form of sweep line! When you apply "add v to range [l, r]," you're placing two events: "+v at position l" and "-v at position r+1." The final prefix sum of these events gives the result — which is exactly the sweep line's "count active events" at each position.

This connection is powerful: any problem solvable with a difference array can also be seen as a sweep line, and vice versa. The difference array version is O(N + Q) when queries come after all updates; the sweep line version handles interleaved updates and queries.

---

## 🧠 Chapter 8 — Greedy + Sweep Line Combined

Many harder problems require both techniques working together. The sweep line determines the order of processing, and the greedy choice determines what action to take at each event.

**Sample Problem Pattern**: Given N jobs with arrival times, deadlines, and processing times, find the schedule that maximizes the number of completed jobs.

The sweep line processes time. At each arrival, a greedy decision determines whether to start this job, preempt the current job, or defer it. A priority queue maintains the "best available job to run."

```python
def max_completed_jobs(jobs):
    """
    jobs: list of (arrival, deadline, processing_time).
    Preemptive scheduling: maximize jobs completed before their deadline.
    """
    import heapq
    
    # Events: arrivals sorted by arrival time
    jobs.sort(key=lambda j: j[0])
    
    heap = []   # Min-heap: (deadline, remaining_time, job_id)
    time = 0
    completed = 0
    i = 0
    n = len(jobs)
    
    while i < n or heap:
        if not heap:
            time = jobs[i][0]   # Jump to next arrival
        
        # Add all jobs that have arrived by current time
        while i < n and jobs[i][0] <= time:
            arrival, deadline, proc_time = jobs[i]
            heapq.heappush(heap, (deadline, proc_time, i))
            i += 1
        
        if heap:
            deadline, remaining, jid = heapq.heappop(heap)
            # Determine how long to run this job before next event
            next_arrival = jobs[i][0] if i < n else float('inf')
            run_time = min(remaining, deadline - time, next_arrival - time)
            
            if run_time <= 0:
                continue   # Deadline passed or can't make progress
            
            time += run_time
            remaining -= run_time
            
            if remaining == 0:
                if time <= deadline:
                    completed += 1
            else:
                heapq.heappush(heap, (deadline, remaining, jid))
    
    return completed
```

---

## 🎯 Practice Problems (Sorted by Difficulty)

For greedy fundamentals, **CF 1203C — Common Divisors** (1400) and **CF 1369C — RationalLee** (1800) are excellent warm-ups that test whether you can identify the right greedy criterion and prove it. **CF 1458C — Greek Gift** teaches that the "exchange argument" sometimes rules out all choices except one.

For interval-based greedy, the classical progression is **CF 455B — A Lot of Games** → **CF 1249D — Too Many to Count** → **CF 1382C — Peaceful Rearrangement**. The activity selection pattern appears in disguised form across dozens of CF problems at the 1600–2000 range.

For sweep line problems, **CF 1283D — Christmas Trees** (1800) is a great first sweep line problem on a 1D line. **CF 1033D — Divisors** and **CF 919D — Substring** both reduce to clever event processing. For 2D sweep line, **CF 1083E — The Fair Nut** and problems tagged "geometry" at 2000+ are the right targets.

For greedy + heap combinations, **CF 1578G — Shifting Stacks** (2100) and **CF 1476G — Gregor and Two Painters** demonstrate how a priority queue turns an O(N²) greedy into an O(N log N) algorithm.

---

## 📝 Summary

Greedy algorithms make the locally optimal choice at each step. The critical skill is proving correctness — either via an exchange argument (showing swapping a non-greedy choice for the greedy one never helps) or via "greedy stays ahead" (showing greedy is always at least as good as any alternative at each step).

The most common greedy patterns are sorting by a key that reflects "value per unit cost" (fractional knapsack, Huffman), sorting by finish time (interval scheduling), and sorting by deadline (scheduling theory). When a greedy algorithm needs to maintain a dynamic "best available option," a heap provides O(log N) insertion and extraction.

Sweep line reduces a 2D problem to a sequence of 1D problems by processing events in order. The active set data structure depends on what queries you need: a simple counter for overlap problems, a sorted set for nearest-neighbor-style queries, or a segment tree for range-sum-on-intervals problems. The design principle is always the same: events mark positions where the active set changes, and between events the active set is static.