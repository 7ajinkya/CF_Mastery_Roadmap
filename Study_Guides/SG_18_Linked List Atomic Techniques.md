# 📘 Study Guide 18 — Linked List Atomic Techniques

> **Difficulty Range**: Beginner → Advanced (CF 800 → 1900)
> **Core Idea**: A linked list is a sequence of nodes where each node holds a value and a pointer to the next node. While Python lists often replace linked lists in practice, mastering linked list techniques builds the pointer manipulation skills essential for tree nodes, graph edges, and custom data structures in competitive programming.

---

## 🧠 Chapter 1 — Why Linked Lists? The Honest Answer

### What Python Lists Cannot Do in O(1)

Python's built-in list is implemented as a dynamic array. It supports O(1) random access (`a[i]`), O(1) append to the back, and O(1) pop from the back. But two operations are O(N): inserting or deleting an element at an arbitrary position, because everything after that position must be shifted.

A linked list solves exactly this: once you have a pointer to a node, inserting or deleting before or after it is O(1), because you only update a constant number of pointers. You lose random access (finding the k-th element requires walking the chain — O(k)), but you gain flexible insertion and deletion.

In competitive programming, linked lists rarely appear as the primary data structure (Python's collections.deque handles most queue/stack needs), but they appear as building blocks inside graphs (adjacency lists), trees (left-child/right-sibling representations), hash tables (chaining), and as the structural substrate of more complex problems.

### The Real Reason to Study Linked Lists

Linked list problems teach pointer manipulation — the skill of updating references without losing track of nodes or creating cycles. This skill directly transfers to tree rotations, graph edge modifications, and in-place algorithms. The famous "interview-style" linked list problems (reverse a list, detect a cycle, find the middle) each expose a fundamental pointer technique that reappears in disguise throughout competitive programming.

---

## 🧠 Chapter 2 — Building a Linked List from Scratch

### Singly Linked List

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next   # Pointer to the next node (None means end of list)

class LinkedList:
    def __init__(self):
        self.head = None   # First node (None means empty list)
        self.size = 0
    
    def push_front(self, val):
        """Insert at the beginning. O(1)."""
        new_node = ListNode(val, self.head)
        self.head = new_node
        self.size += 1
    
    def push_back(self, val):
        """Insert at the end. O(N) without a tail pointer."""
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
        else:
            cur = self.head
            while cur.next:   # Walk to the last node
                cur = cur.next
            cur.next = new_node
        self.size += 1
    
    def pop_front(self):
        """Remove and return the front element. O(1)."""
        if not self.head:
            raise IndexError("Pop from empty list")
        val = self.head.val
        self.head = self.head.next   # Move head forward
        self.size -= 1
        return val
    
    def __str__(self):
        values = []
        cur = self.head
        while cur:
            values.append(str(cur.val))
            cur = cur.next
        return " -> ".join(values) + " -> None"
```

### The Tail Pointer Optimization

Pushing to the back is O(N) without a tail pointer because you must walk the entire list. Adding a tail pointer makes it O(1) at the cost of maintaining one extra reference:

```python
class LinkedListWithTail:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def push_back(self, val):
        """O(1) with tail pointer."""
        new_node = ListNode(val)
        if not self.tail:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1
    
    def pop_front(self):
        if not self.head: raise IndexError("Empty")
        val = self.head.val
        self.head = self.head.next
        if not self.head:
            self.tail = None   # List became empty — must update tail too
        self.size -= 1
        return val
```

### Doubly Linked List

Adding a previous pointer enables O(1) insertion and deletion with just a reference to the node — no need to find the previous node by traversal.

```python
class DListNode:
    def __init__(self, val=0, prev=None, next=None):
        self.val = val
        self.prev = prev
        self.next = next

class DoublyLinkedList:
    def __init__(self):
        # Sentinel nodes at both ends simplify edge cases (no need to check for None)
        self.sentinel_head = DListNode(0)   # Dummy head
        self.sentinel_tail = DListNode(0)   # Dummy tail
        self.sentinel_head.next = self.sentinel_tail
        self.sentinel_tail.prev = self.sentinel_head
    
    def insert_after(self, node, val):
        """Insert val after node. O(1)."""
        new_node = DListNode(val, node, node.next)
        node.next.prev = new_node
        node.next = new_node
    
    def delete(self, node):
        """Delete node from list. O(1) — no traversal needed."""
        node.prev.next = node.next
        node.next.prev = node.prev
```

The **sentinel (dummy) node** pattern is a critical technique that eliminates special-casing for empty lists and head/tail insertions. By adding dummy nodes at both ends, every real node has both a prev and a next — you never need to check for None.

---

## 🧠 Chapter 3 — The Two-Pointer Techniques

### Finding the Middle Node

The "fast and slow pointer" (also called Floyd's runner) technique uses two pointers advancing at different speeds to find structural properties of a list without knowing its length.

For finding the middle: slow pointer advances 1 step, fast pointer advances 2 steps. When fast reaches the end, slow is at the middle.

```python
def find_middle(head):
    """Find the middle node. For even-length lists, returns the second middle."""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next         # Advance by 1
        fast = fast.next.next    # Advance by 2
    return slow

# Trace on [1, 2, 3, 4, 5]:
# Start: slow=1, fast=1
# Step 1: slow=2, fast=3
# Step 2: slow=3, fast=5
# fast.next is None → stop. slow=3 is the middle ✓

# For even length [1, 2, 3, 4]:
# Start: slow=1, fast=1
# Step 1: slow=2, fast=3
# Step 2: slow=3, fast=None → stop. slow=3 (second middle) ✓
```

### Detecting a Cycle (Floyd's Cycle Detection)

The same fast/slow pointer technique detects cycles: if there's a cycle, the fast pointer will eventually "lap" the slow pointer and they'll meet inside the cycle.

```python
def has_cycle(head):
    """Returns True if the linked list has a cycle."""
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:   # Same node — they've met inside the cycle
            return True
    return False

def find_cycle_start(head):
    """Find the node where the cycle begins."""
    slow = fast = head
    
    # Phase 1: Detect cycle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None   # No cycle
    
    # Phase 2: Find cycle start
    # Mathematical proof: once they meet, moving one pointer to head
    # and advancing both at speed 1 will meet exactly at the cycle start.
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next
    return slow   # Cycle start
```

The mathematical proof for the cycle start finding is elegant. If the cycle starts at distance F from the head, and the meeting point is distance C into the cycle (where the cycle length is L), then the slow pointer has traveled F + C steps and the fast pointer has traveled F + C + kL steps (for some integer k). Since fast = 2 × slow: `2(F + C) = F + C + kL`, giving `F + C = kL`, so `F = kL - C = (k-1)L + (L - C)`. Moving one pointer to the head and advancing both at speed 1, after F more steps the head-pointer reaches the cycle start and the other pointer (having been at C into the cycle) has moved F = (k-1)L + (L-C) more steps in the cycle, ending at `C + F mod L = C + (L - C) mod L = 0`, which is exactly the cycle start.

### Finding the N-th Node from the End

Use two pointers separated by exactly N positions. Advance both until the front pointer reaches the end. The back pointer is then N nodes from the end.

```python
def remove_nth_from_end(head, n):
    """Remove the n-th node from the end. One pass. O(L)."""
    dummy = ListNode(0)
    dummy.next = head
    fast = slow = dummy
    
    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next
    
    # Advance both until fast reaches the end
    while fast:
        slow = slow.next
        fast = fast.next
    
    # slow.next is the node to remove
    slow.next = slow.next.next
    return dummy.head   # dummy.next is the new head
```

---

## 🧠 Chapter 4 — Reversing a Linked List

### In-Place Reversal: The Three-Pointer Dance

Reversing a linked list in-place requires three pointers: `prev` (node before current), `curr` (current node being processed), and `next_node` (save the next pointer before overwriting it).

```python
def reverse_list(head):
    """Reverse entire linked list. O(N) time, O(1) space."""
    prev = None
    curr = head
    
    while curr:
        next_node = curr.next   # Save next before overwriting
        curr.next = prev        # Reverse the pointer
        prev = curr             # Advance prev
        curr = next_node        # Advance curr
    
    return prev   # prev is now the new head
```

**Trace on [1, 2, 3, 4]**:
```
Initial: prev=None, curr=1

Step 1: save next=2, set 1.next=None, prev=1, curr=2
Step 2: save next=3, set 2.next=1,    prev=2, curr=3
Step 3: save next=4, set 3.next=2,    prev=3, curr=4
Step 4: save next=None, set 4.next=3, prev=4, curr=None

Return prev=4. List is now 4→3→2→1→None ✓
```

### Reversing a Sublist (from position l to r)

```python
def reverse_between(head, l, r):
    """Reverse nodes from position l to r (1-indexed). O(N)."""
    dummy = ListNode(0)
    dummy.next = head
    
    # Find the node just before position l
    pre = dummy
    for _ in range(l - 1):
        pre = pre.next
    
    # Now reverse from l to r
    curr = pre.next
    for _ in range(r - l):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = pre.next
        pre.next = next_node
    
    return dummy.next
```

The "insert at front of sublist" trick used here works by repeatedly taking the node after `curr` and inserting it at the front of the reversed portion (right after `pre`). This is cleaner than using three separate passes.

### Reversing in Groups of K

```python
def reverse_k_group(head, k):
    """Reverse nodes in groups of k. If fewer than k remain, leave as-is."""
    # Check if there are k nodes remaining
    count = 0
    node = head
    while node and count < k:
        node = node.next
        count += 1
    
    if count < k:
        return head   # Fewer than k nodes — don't reverse
    
    # Reverse k nodes
    prev, curr = None, head
    for _ in range(k):
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    
    # head is now the tail of the reversed group
    # curr is the start of the remaining list
    head.next = reverse_k_group(curr, k)
    return prev   # prev is the new head of this group
```

---

## 🧠 Chapter 5 — Merging and Sorting

### Merging Two Sorted Lists

This is the core operation of merge sort on linked lists. The two-pointer merge is clean and O(N + M):

```python
def merge_sorted(l1, l2):
    """Merge two sorted linked lists. O(N + M)."""
    dummy = ListNode(0)
    curr = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            curr.next = l1
            l1 = l1.next
        else:
            curr.next = l2
            l2 = l2.next
        curr = curr.next
    
    curr.next = l1 if l1 else l2   # Attach remaining nodes
    return dummy.next
```

### Sorting a Linked List (Merge Sort)

Linked lists are perfectly suited for merge sort — unlike arrays, no extra space is needed for merging, and finding the middle in O(N) then recursing gives O(N log N) total.

```python
def sort_list(head):
    """Sort linked list via merge sort. O(N log N) time, O(log N) stack space."""
    # Base cases
    if not head or not head.next:
        return head
    
    # Split into two halves at the middle
    slow, fast = head, head.next   # Note: fast starts one step ahead
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # slow is now the last node of the first half
    second_half = slow.next
    slow.next = None   # Cut the list in two
    
    left = sort_list(head)
    right = sort_list(second_half)
    return merge_sorted(left, right)
```

---

## 🧠 Chapter 6 — Advanced Pointer Manipulation

### Copying a List with Random Pointers

A hard variant: each node has both `next` and `random` pointers (random can point to any node). Deep copy the entire list.

The clever O(1) space approach interleaves the copy nodes with the originals:

```python
class RandomNode:
    def __init__(self, val=0, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random   # Points to any node or None

def copy_random_list(head):
    """Deep copy list with random pointers. O(N) time, O(1) extra space."""
    if not head:
        return None
    
    # Step 1: Insert copy nodes between each node and its next
    # 1 → 2 → 3  becomes  1 → 1' → 2 → 2' → 3 → 3'
    curr = head
    while curr:
        copy = RandomNode(curr.val, curr.next)
        curr.next = copy
        curr = copy.next
    
    # Step 2: Assign random pointers for copy nodes
    curr = head
    while curr:
        if curr.random:
            curr.next.random = curr.random.next   # curr.random.next is the copy of curr.random
        curr = curr.next.next   # Skip the copy node
    
    # Step 3: Separate the interleaved lists
    dummy = RandomNode(0)
    copy_curr = dummy
    curr = head
    while curr:
        copy_curr.next = curr.next   # Extract copy node
        curr.next = curr.next.next   # Restore original list
        copy_curr = copy_curr.next
        curr = curr.next
    
    return dummy.next
```

The key insight in step 2 is that `curr.random.next` is exactly the copy of `curr.random`, because in the interleaved structure, every original node's copy is immediately after it.

### Reordering a List (L0 → Ln → L1 → Ln-1 → ...)

A problem that combines finding the middle, reversing the second half, and merging:

```python
def reorder_list(head):
    """Reorder: L0→Ln→L1→Ln-1→L2→... In-place."""
    if not head or not head.next:
        return
    
    # Step 1: Find the middle
    slow, fast = head, head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # Step 2: Reverse the second half
    second = slow.next
    slow.next = None   # Disconnect
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt
    second = prev   # Head of reversed second half
    
    # Step 3: Merge the two halves by interleaving
    first = head
    while second:
        tmp1 = first.next
        tmp2 = second.next
        first.next = second
        second.next = tmp1
        first = tmp1
        second = tmp2
```

### LRU Cache (Doubly Linked List + Hash Map)

The LRU (Least Recently Used) cache is the canonical advanced linked list problem — it demonstrates why doubly linked lists are practically important, not just academically interesting.

The design requires O(1) get and put operations. The hash map gives O(1) access to any node by key. The doubly linked list maintains the order of access: the most recently used node is at the front, and the least recently used is at the back. When the cache is full and we need to evict, we remove the tail (O(1) with a tail pointer). When we access or insert a node, we move it to the front (O(1) with prev/next pointers).

```python
class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}   # key → node
        
        # Sentinel nodes at both ends
        self.head = DListNode(0)   # Most recently used end
        self.tail = DListNode(0)   # Least recently used end
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _remove(self, node):
        """Detach node from its current position."""
        node.prev.next = node.next
        node.next.prev = node.prev
    
    def _add_to_front(self, node):
        """Insert node right after the head sentinel."""
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node
    
    def get(self, key):
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._add_to_front(node)   # Mark as most recently used
        return node.val
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        else:
            if len(self.cache) >= self.capacity:
                # Evict LRU: remove the node just before the tail sentinel
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]
        
        new_node = DListNode(value)
        new_node.key = key
        self._add_to_front(new_node)
        self.cache[key] = new_node
```

---

## 🧠 Chapter 7 — Linked Lists in Competitive Programming Contexts

### Implicit Linked Lists with Arrays

In competitive programming, full node objects with pointers are rarely used. Instead, linked lists are often implemented implicitly using arrays for the "next" and "prev" pointers. This is much faster due to cache locality and avoids Python's object overhead.

```python
class ArrayLinkedList:
    """
    Doubly linked list stored in arrays. 
    Used when you know the maximum number of nodes in advance.
    Nodes 0 and 1 are sentinels (head and tail).
    """
    MAXN = 100005
    
    def __init__(self):
        self.val  = [0] * self.MAXN
        self.nxt  = [0] * self.MAXN   # next pointer
        self.prv  = [0] * self.MAXN   # prev pointer
        self.cnt  = 2                  # Start from 2 (0 and 1 are sentinels)
        
        # Initialize sentinel nodes
        self.nxt[0] = 1   # Head sentinel points to tail sentinel
        self.prv[1] = 0   # Tail sentinel's prev is head sentinel
    
    def new_node(self, v):
        """Allocate a new node with value v."""
        self.val[self.cnt] = v
        node = self.cnt
        self.cnt += 1
        return node
    
    def insert_after(self, p, v):
        """Insert new node with value v after node p."""
        node = self.new_node(v)
        self.nxt[node] = self.nxt[p]
        self.prv[node] = p
        self.prv[self.nxt[p]] = node
        self.nxt[p] = node
    
    def delete(self, p):
        """Delete node p."""
        self.nxt[self.prv[p]] = self.nxt[p]
        self.prv[self.nxt[p]] = self.prv[p]
    
    def traverse(self):
        """Traverse all non-sentinel nodes."""
        cur = self.nxt[0]
        result = []
        while cur != 1:   # Until we hit the tail sentinel
            result.append(self.val[cur])
            cur = self.nxt[cur]
        return result
```

### The "Delete Neighbor" Pattern

A particularly elegant application of doubly linked lists in competitive programming: when processing an array where deleting an element means you need to quickly jump to the next valid element, an implicit doubly linked list lets you skip deleted elements in O(1) amortized.

```python
def process_with_deletions(a, operations):
    """
    operations: list of indices to delete, then query neighbors of other elements.
    Doubly linked list lets deletion and neighbor-finding both be O(1).
    """
    n = len(a)
    nxt = list(range(1, n + 1))   # nxt[i] = i+1 initially (n is sentinel)
    prv = list(range(-1, n - 1))  # prv[i] = i-1 initially (-1 is sentinel)
    active = [True] * n
    
    def delete(i):
        if not active[i]: return
        active[i] = False
        nxt[prv[i]] = nxt[i] if prv[i] >= 0 else None
        if nxt[i] < n: prv[nxt[i]] = prv[i]
    
    def next_active(i):
        return nxt[i] if nxt[i] < n else None
    
    def prev_active(i):
        return prv[i] if prv[i] >= 0 else None
    
    results = []
    for op, arg in operations:
        if op == 'delete':
            delete(arg)
        elif op == 'next':
            results.append(next_active(arg))
        elif op == 'prev':
            results.append(prev_active(arg))
    
    return results
```

---

## 🎯 Practice Problems (Sorted by Difficulty)

The linked list problem set on Leetcode is unusually well-curated for building technique. Work through "Reverse Linked List," "Merge Two Sorted Lists," "Linked List Cycle," "Remove Nth Node From End," and "Reorder List" in that order — these six problems teach all of the core pointer techniques.

On Codeforces, linked lists appear primarily as an internal data structure rather than the explicit subject. **CF 1209D — Distinct Characters Queries** (1600) and **CF 1020B — Badge** (1300) both reduce efficiently to list traversal problems. **CF 1000F — One Occurrence** (2100) uses a linked-list-like structure for efficient deletion. The LRU cache problem appears frequently in system design contexts and is worth implementing from scratch at least once.

---

## 📝 Summary

Linked lists are simultaneously simpler than arrays in one dimension (insertion/deletion anywhere is O(1) with a pointer) and harder in another (no random access, must traverse to find elements). This trade-off makes them the perfect data structure for situations where you process a sequence in order but need to insert or delete elements frequently during that traversal.

The techniques in this guide — sentinel nodes for clean edge cases, fast/slow pointers for structural queries, in-place reversal with three pointers, and the doubly linked list + hash map combination for LRU caches — are each atomic building blocks that appear inside larger algorithms. The pointer manipulation intuition you build here transfers directly to tree rotations, graph modifications, and in-place array algorithms.

The most important lesson from linked lists is conceptual: when an algorithm needs to frequently restructure a sequence (insert, delete, reorder), think about whether a data structure that stores explicit "next" pointers could outperform an array. Arrays are great when you need random access and rarely rearrange. Linked lists are great when you always process in order and frequently restructure. Understanding this trade-off deeply is what separates someone who knows algorithms from someone who designs them.