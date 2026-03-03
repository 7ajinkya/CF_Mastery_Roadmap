// ==========================================
// CF Mastery Tracker — Core Application
// ==========================================

// Study Material Reader System
const CF_API = 'https://codeforces.com/api';
const LEVELS = [
    { level: 1, title: 'Code Cadet', xp: 0 },
    { level: 2, title: 'Bug Squasher', xp: 200 },
    { level: 3, title: 'Loop Master', xp: 500 },
    { level: 4, title: 'Array Knight', xp: 1000 },
    { level: 5, title: 'Greedy Apprentice', xp: 1800 },
    { level: 6, title: 'Binary Seeker', xp: 2800 },
    { level: 7, title: 'Prefix Sage', xp: 4000 },
    { level: 8, title: 'DP Initiate', xp: 5500 },
    { level: 9, title: 'Graph Walker', xp: 7500 },
    { level: 10, title: 'Bitmask Wizard', xp: 10000 },
    { level: 11, title: 'Segment Sentinel', xp: 13000 },
    { level: 12, title: 'Tree Whisperer', xp: 16500 },
    { level: 13, title: 'Number Theorist', xp: 20500 },
    { level: 14, title: 'Combo Breaker', xp: 25000 },
    { level: 15, title: 'Algorithm Architect', xp: 30000 },
    { level: 16, title: 'Contest Warrior', xp: 36000 },
    { level: 17, title: 'Flow Master', xp: 43000 },
    { level: 18, title: 'String Slayer', xp: 51000 },
    { level: 19, title: 'Idea Machine', xp: 60000 },
    { level: 20, title: 'EXPERT', xp: 70000 }
];

const XP_TABLE = {
    800: 10, 900: 15, 1000: 25, 1100: 35, 1200: 50,
    1300: 70, 1400: 100, 1500: 140, 1600: 200,
    1700: 280, 1800: 380, 1900: 500, 2000: 500,
    2100: 500, 2200: 500, 2300: 500, 2400: 500, 2500: 500
};

const RATING_COLORS = {
    800: '#808080', 900: '#999', 1000: '#00c853', 1100: '#2ecc71',
    1200: '#03a9f4', 1300: '#2196f3', 1400: '#aa00ff', 1500: '#9c27b0',
    1600: '#ff8f00', 1700: '#f57c00', 1800: '#e65100', 1900: '#ff3d00',
    2000: '#ff3d00', 2100: '#ff0000', 2200: '#ff0000', 2300: '#ff0000'
};

const STUDY_GUIDES = [
    { id: 0, title: 'Prefix and Partial Sums', desc: 'Prefix sums, difference arrays, 2D variants', tag: 'Core', file: 'SG_01_Prefix and Partial Sums.md' },
    { id: 1, title: 'Math', desc: 'Sieve, GCD, modular arithmetic, exact math tricks', tag: 'Core', file: 'SG_02_Math.md' },
    { id: 2, title: 'Binary Search', desc: 'Binary search on answer, bisect module', tag: 'Core', file: 'SG_03_Binary Search.md' },
    { id: 3, title: 'Sliding Window Two Pointers', desc: 'Sliding window, two pointers, monotonic queue', tag: 'Core', file: 'SG_04_Sliding Window Two Pointers.md' },
    { id: 4, title: 'Bit Manipulation', desc: 'Bitwise tricks, XOR properties, subsets via bitmasks', tag: 'Core', file: 'SG_05_Bit Manipulation.md' },
    { id: 5, title: 'Recursion, Backtracking, Meet-in-the-Middle', desc: 'Recursion trees, state space, pruning, MITM', tag: 'Intermediate', file: 'SG_06_Recursion_Backtracking_Meet-in-the-Middle.md' },
    { id: 6, title: 'Graphs: Zero to Pro', desc: 'DFS, BFS, Shortest paths, Topological sort, MST, SCC', tag: 'Advanced', file: 'SG_07_Graphs_Zero_to_Pro.md' },
    { id: 7, title: 'Trees: Zero to Hero', desc: 'Tree properties, LCA, tree DP, centroid decomposition', tag: 'Advanced', file: 'SG_08_Trees_Zero_to_Hero.md' },
    { id: 8, title: 'DSU', desc: 'Path compression, union by rank, offline processing', tag: 'Advanced', file: 'SG_09_DSU.md' },
    { id: 9, title: 'Dynamic Programming Pro', desc: 'Advanced DP states, transitions, optimizations', tag: 'Advanced', file: 'SG_10_Dynamic_Programming_Pro.md' },
    { id: 10, title: 'Segment Trees With Application and Ideas', desc: 'Point/range queries, lazy propagation, coordinate compression', tag: 'Advanced', file: 'SG_11_Segment Trees With Application and Ideas.md' },
    { id: 11, title: 'String and Trie', desc: 'Hashing, KMP, Z-algorithm, Tries, Suffix Arrays', tag: 'Advanced', file: 'SG_12_String and Trie.md' },
    { id: 12, title: 'DP with Bitmasking', desc: 'Subset transitions, TSP variants, SOS DP', tag: 'Advanced', file: 'SG_13_DP with Bitmasking.md' },
    { id: 13, title: 'Digit DP Techniques', desc: 'Counting numbers with properties, states, transitions', tag: 'Advanced', file: 'SG_14_Digit DP Techniques.md' },
    { id: 14, title: 'Greedy and Sweep Line Techniques', desc: 'Events sorting, intervals, active sets', tag: 'Advanced', file: 'SG_15_Greedy and Sweep Line Techniques.md' },
    { id: 15, title: 'Square Root Decomposition', desc: 'Mo\'s algorithm, block updates, sqrt structures', tag: 'Advanced', file: 'SG_16_Square Root Decomposition.md' },
    { id: 16, title: 'Binary Tree Mastery', desc: 'BSTs, heaps, structural traits, reconstruction', tag: 'Advanced', file: 'SG_17_Binary Tree Mastery.md' },
    { id: 17, title: 'Linked List Atomic Techniques', desc: 'Pointer manipulation, Floyd cycle, LRU/LFU structures', tag: 'Advanced', file: 'SG_18_Linked List Atomic Techniques.md' }
];

const IDEAS_DATA = [
    { title: 'Brute Force First', difficulty: 'easy', body: 'Before optimizing, can you solve it with nested loops? For n ≤ 1000, O(n²) is fine. For n ≤ 20, O(2ⁿ) works.\nAlways start by checking if brute force fits within constraints.' },
    { title: 'Parity Argument (Odd/Even)', difficulty: 'easy', body: 'Check if answer depends on odd vs even. Many "is it possible?" problems reduce to parity.\n• Sum parity, count parity\n• XOR preserves parity of set bits\n• odd + odd = even, odd + even = odd' },
    { title: 'Pigeonhole Principle', difficulty: 'easy', body: 'n+1 items in n boxes → at least one box has 2+ items.\nUse to prove existence of duplicates or collisions.' },
    { title: 'Invariant Thinking', difficulty: 'easy', body: 'Find a quantity that NEVER changes across operations.\nIf start invariant ≠ goal invariant → IMPOSSIBLE.\n• Sum invariant, parity invariant, XOR invariant\n• Monovariant: always increases → must terminate' },
    { title: 'Sorting Unlocks Everything', difficulty: 'easy', body: 'If order doesn\'t matter, SORT.\nSorting enables: binary search, two pointers, greedy, adjacent comparisons.' },
    { title: 'Contribution Technique', difficulty: 'medium', body: 'Instead of computing total directly:\n"How much does element i contribute to the answer?"\nSum all contributions.\n• Subarray problems: element a[i] appears in (i+1)×(n-i) subarrays' },
    { title: 'Think Backwards', difficulty: 'medium', body: 'Work from desired end state. Reverse operations.\nOften what\'s hard forward becomes easy backward.' },
    { title: 'Fix One, Optimize the Other', difficulty: 'medium', body: 'Answer depends on two variables x,y?\nIterate over all x, find best y efficiently (binary search, formula, precomputation).' },
    { title: 'Exchange Argument', difficulty: 'medium', body: 'Prove greedy correctness: assume optimal has different order, show swapping adjacent out-of-order elements improves or maintains answer.' },
    { title: 'Prefix Sum', difficulty: 'easy', body: 'Precompute running sums → O(1) range sum queries.\npre[i] = a[0]+...+a[i-1], sum[l..r] = pre[r+1]-pre[l]\n2D: pre[i][j] = pre[i-1][j]+pre[i][j-1]-pre[i-1][j-1]+a[i][j]' },
    { title: 'Difference Array', difficulty: 'easy', body: 'Multiple range add operations: d[l]+=v, d[r+1]-=v\nPrefix sum of d gives actual values. O(1) per update.' },
    { title: 'Two Pointers', difficulty: 'medium', body: 'Two indices moving through array.\n1. Same direction: sliding window (variable size)\n2. Opposite: pair finding in sorted array\n3. Two arrays: merge-like traversal' },
    { title: 'Sliding Window', difficulty: 'medium', body: 'Fixed or variable size window moving across array.\nFixed: add right, remove left, maintain sum/count.\nVariable: expand right, shrink left when condition violated.' },
    { title: 'Monotonic Stack', difficulty: 'medium', body: 'Stack maintaining sorted order. Pop when new element violates.\nFinds "next greater/smaller element" in O(n).' },
    { title: 'MEX (Minimum Excludant)', difficulty: 'medium', body: 'MEX = smallest non-negative integer NOT in set.\nMEX ≤ n for set of size n.\nAdding values > MEX doesn\'t change it.' },
    { title: 'Binary Search on Answer', difficulty: 'medium', body: 'If "is answer ≤ X?" is monotonic, binary search for optimal X.\nPattern: minimize maximum, maximize minimum.' },
    { title: 'Coordinate Compression', difficulty: 'medium', body: 'Huge values but small count → map to {0,1,...,n-1}.\nPreserves order. Enables arrays instead of maps.' },
    { title: 'GCD Properties', difficulty: 'medium', body: 'gcd(a,b) = gcd(a, b%a). GCD of range can only decrease.\nAt most O(log V) distinct GCD values in any prefix.' },
    { title: 'Sieve of Eratosthenes', difficulty: 'medium', body: 'Find all primes ≤ n in O(n log log n).\nExtend to: SPF sieve (smallest prime factor), Euler totient sieve.' },
    { title: 'Modular Inverse', difficulty: 'medium', body: 'a⁻¹ mod p = a^(p-2) mod p (Fermat, p prime).\nFor nCr: precompute factorials and inverse factorials.' },
    { title: 'BFS = Shortest Path (Unweighted)', difficulty: 'medium', body: 'BFS finds shortest path in unweighted graphs.\nProcesses nodes in order of distance from source.' },
    { title: 'DFS for Components & Cycles', difficulty: 'medium', body: 'DFS explores deeply. Connected components. Cycle detection.\nBack edge in DFS tree = cycle. White→Gray→Black coloring.' },
    { title: 'DSU (Union-Find)', difficulty: 'medium', body: 'Merge sets and check connectivity in nearly O(1).\nPath compression + union by rank.\nUse for: grouping, connectivity, Kruskal\'s MST.' },
    { title: 'Bitmask as Set', difficulty: 'medium', body: 'Integer with n bits represents subset of {0,...,n-1}.\nUnion: a|b, Intersection: a&b.\nIterate subsets: for mask in range(1<<n)' },
    { title: 'XOR Properties', difficulty: 'medium', body: 'a^a=0, a^0=a. XOR is its own inverse.\nFind unique element: XOR all values.\nXOR prefix arrays for range XOR queries.' },
    { title: 'Bitmask DP', difficulty: 'hard', body: 'n≤20: dp[mask] = best answer for subset mask.\nTSP: dp[mask][i] = min cost visiting cities in mask, ending at i.\nIterate submasks: for sub=mask; sub>0; sub=(sub-1)&mask' },
    { title: 'Digit DP', difficulty: 'hard', body: 'Count numbers in [0,N] with property.\nProcess digits MSB→LSB. State: (pos, tight, property_state).\nUse memoization/recursion.' },
    { title: 'DP on Trees', difficulty: 'hard', body: 'Root the tree. dp[v] depends on dp[children].\nProcess via DFS post-order. Merge child results.' },
    { title: 'Rerooting DP', difficulty: 'hard', body: 'Compute dp[root], then "reroot" to every node in O(n).\nUse parent contribution to avoid recomputing.' },
    { title: 'SOS DP (Sum over Subsets)', difficulty: 'hard', body: 'For each bitmask, compute sum over all submasks. O(n·2ⁿ).\nIteratively process each bit dimension.' },
    { title: 'Segment Tree', difficulty: 'hard', body: 'O(log n) point update and range query.\nSupports: sum, min, max, GCD, and custom operations.\nLazy propagation for range updates.' },
    { title: 'BIT / Fenwick Tree', difficulty: 'hard', body: 'Point update + prefix query in O(log n).\nSimpler and faster than segment tree but less flexible.' },
    { title: 'KMP / Z-Function', difficulty: 'hard', body: 'String pattern matching in O(n+m).\nKMP: failure function (longest proper prefix = suffix).\nZ: z[i] = length of longest match with prefix.' },
    { title: 'Trie', difficulty: 'hard', body: 'Tree of characters for prefix operations.\nInsert/search in O(length).\nUse for: max XOR, autocomplete, prefix queries.' },
    { title: 'Meet in the Middle', difficulty: 'hard', body: 'Split input into two halves. Process each in O(2^(n/2)).\nCombine results. Turns O(2ⁿ) into O(2^(n/2)·log).' },
    { title: 'Euler Tour on Trees', difficulty: 'hard', body: 'Flatten tree into array. Subtree → contiguous range.\nEnables range queries on subtrees using segment tree/BIT.' },
    { title: 'LCA (Lowest Common Ancestor)', difficulty: 'hard', body: 'Binary lifting: precompute 2ⁱ-th ancestor.\nQuery LCA in O(log n). Also useful for distance queries on trees.' },
    { title: 'Dijkstra\'s Algorithm', difficulty: 'hard', body: 'Shortest path in weighted graph (non-negative weights).\nO((V+E) log V) with priority queue.' },
    { title: '0-1 BFS', difficulty: 'hard', body: 'Edge weights are 0 or 1 → deque BFS.\nPush 0-weight to front, 1-weight to back. O(V+E).' },
    { title: 'Sweep Line', difficulty: 'hard', body: 'Sort events by coordinate, process left-to-right.\nOften paired with segment tree for efficient queries.' },
    { title: 'Mo\'s Algorithm', difficulty: 'hard', body: 'Offline range queries: sort by (l/√n, r).\nAdd/remove elements. O((n+q)√n).' },
    { title: 'Matrix Exponentiation', difficulty: 'hard', body: 'Linear recurrence → matrix form → fast power O(k³ log n).\nFibonacci, linear recurrences with constant coefficients.' },
    { title: 'Inclusion-Exclusion', difficulty: 'hard', body: '|A∪B∪C| = |A|+|B|+|C| - |A∩B|-|A∩C|-|B∩C| + |A∩B∩C|\nCount elements satisfying "at least one of" conditions.' },
    { title: 'Convex Hull Trick', difficulty: 'hard', body: 'Optimize DP: dp[i] = min(m[j]·x[i]+b[j]).\nMaintain set of lines. O(n log n) instead of O(n²).' },
    { title: 'Centroid Decomposition', difficulty: 'hard', body: 'Find centroid (removal → subtrees ≤ n/2). Recursively decompose.\nTree height becomes O(log n). Path queries.' },
    { title: 'HLD (Heavy-Light Decomposition)', difficulty: 'hard', body: 'Decompose tree into chains. Any path crosses O(log n) chains.\nCombine with segment tree for path queries/updates.' },
    { title: 'String Hashing', difficulty: 'hard', body: 'Map string to integer. Compare in O(1) after O(n) precomputation.\nUse polynomial hash. Double hash to avoid collisions.' },
    { title: 'Sprague-Grundy Theorem', difficulty: 'hard', body: 'Every game position has a Grundy number.\nMultiple games: XOR their Grundy numbers.\nGrundy(pos) = MEX of Grundy(reachable positions).' },
    { title: 'Small-to-Large Merging', difficulty: 'hard', body: 'Merge child info into parent: always merge smaller into larger.\nTotal work: O(n log n). Also called DSU on tree.' },
    { title: 'Sqrt Decomposition', difficulty: 'hard', body: 'Divide array into √n blocks. Update block O(1), query O(√n).\nFor range queries where segment tree is overkill.' }
];

const ACHIEVEMENTS = [
    { id: 'first_blood', icon: '🗡️', name: 'First Blood', desc: 'Solve your first CF problem', check: d => d.totalSolved >= 1 },
    { id: 'warm_up', icon: '🏃', name: 'Warm Up', desc: 'Solve 10 problems', check: d => d.totalSolved >= 10 },
    { id: 'getting_serious', icon: '💪', name: 'Getting Serious', desc: 'Solve 50 problems', check: d => d.totalSolved >= 50 },
    { id: 'century', icon: '💯', name: 'Century', desc: 'Solve 100 problems', check: d => d.totalSolved >= 100 },
    { id: 'grinding', icon: '⚙️', name: 'Grinding Machine', desc: 'Solve 250 problems', check: d => d.totalSolved >= 250 },
    { id: 'destroyer', icon: '💥', name: 'Problem Destroyer', desc: 'Solve 500 problems', check: d => d.totalSolved >= 500 },
    { id: 'thousand', icon: '🏅', name: 'Thousand Club', desc: 'Solve 1000 problems', check: d => d.totalSolved >= 1000 },
    // Tag-based achievements
    { id: 'dp_novice', icon: '🧩', name: 'DP Novice', desc: 'Solve 10 DP problems', check: d => (d.tagCounts['dp'] || 0) >= 10 },
    { id: 'dp_warrior', icon: '⚔️', name: 'DP Warrior', desc: 'Solve 30 DP problems', check: d => (d.tagCounts['dp'] || 0) >= 30 },
    { id: 'dp_master', icon: '🏆', name: 'DP Master', desc: 'Solve 50 DP problems', check: d => (d.tagCounts['dp'] || 0) >= 50 },
    { id: 'graph_explorer', icon: '🗺️', name: 'Graph Explorer', desc: 'Solve 10 graph problems', check: d => (d.tagCounts['graphs'] || 0) >= 10 },
    { id: 'graph_master', icon: '🌐', name: 'Graph Master', desc: 'Solve 30 graph problems', check: d => (d.tagCounts['graphs'] || 0) >= 30 },
    { id: 'bit_twiddler', icon: '🔧', name: 'Bit Twiddler', desc: 'Solve 10 bitmask problems', check: d => (d.tagCounts['bitmasks'] || 0) >= 10 },
    { id: 'number_crunch', icon: '🔢', name: 'Number Cruncher', desc: 'Solve 15 number theory problems', check: d => (d.tagCounts['number theory'] || 0) >= 15 },
    { id: 'math_wizard', icon: '🧮', name: 'Math Wizard', desc: 'Solve 20 math problems', check: d => (d.tagCounts['math'] || 0) >= 20 },
    { id: 'greedy_master', icon: '💰', name: 'Greedy Master', desc: 'Solve 15 greedy problems', check: d => (d.tagCounts['greedy'] || 0) >= 15 },
    { id: 'implementation_king', icon: '👷', name: 'Implementation King', desc: 'Solve 25 implementation problems', check: d => (d.tagCounts['implementation'] || 0) >= 25 },
    { id: 'string_slayer', icon: '📝', name: 'String Slayer', desc: 'Solve 15 string problems', check: d => (d.tagCounts['strings'] || 0) >= 15 },
    { id: 'binary_searcher', icon: '🔍', name: 'Binary Searcher', desc: 'Solve 10 binary search problems', check: d => (d.tagCounts['binary search'] || 0) >= 10 },
    { id: 'two_pointer_pro', icon: '👆👆', name: 'Two Pointer Pro', desc: 'Solve 10 two pointers problems', check: d => (d.tagCounts['two pointers'] || 0) >= 10 },
    // Rating achievements
    { id: 'green', icon: '🟢', name: 'Green Machine', desc: 'Reach Pupil (1200+)', check: d => d.rating >= 1200 },
    { id: 'cyan', icon: '🔵', name: 'Cyan Sensation', desc: 'Reach Specialist (1400+)', check: d => d.rating >= 1400 },
    { id: 'blue', icon: '💎', name: 'Blue Beauty', desc: 'Reach Expert (1600+)', check: d => d.rating >= 1600 },
    { id: 'purple', icon: '👑', name: 'Purple Power', desc: 'Reach Expert (1900+)', check: d => d.rating >= 1900 },
    // Contest achievements
    { id: 'contestant', icon: '🎪', name: 'Contestant', desc: 'Participate in 1+ contests', check: d => d.contestCount >= 1 },
    { id: 'regular', icon: '📆', name: 'Regular', desc: 'Participate in 10+ contests', check: d => d.contestCount >= 10 },
    { id: 'veteran', icon: '🎖️', name: 'Veteran', desc: 'Participate in 25+ contests', check: d => d.contestCount >= 25 },
    { id: 'eureka', icon: '💡', name: 'Eureka!', desc: 'Solve a problem 200+ above your rating', check: d => d.hasEureka },
    // Streak achievements
    { id: 'streak3', icon: '✨', name: 'Sparky', desc: '3-day solve streak', check: d => d.maxStreak >= 3 },
    { id: 'streak7', icon: '🥉', name: 'Bronze Flame', desc: '7-day solve streak', check: d => d.maxStreak >= 7 },
    { id: 'streak14', icon: '🏅', name: 'Fortnight Flame', desc: '14-day solve streak', check: d => d.maxStreak >= 14 },
    { id: 'streak30', icon: '💎', name: 'Diamond Flame', desc: '30-day solve streak', check: d => d.maxStreak >= 30 },
    { id: 'streak60', icon: '🏆', name: 'Seasoned Flame', desc: '60-day solve streak', check: d => d.maxStreak >= 60 },
    { id: 'streak100', icon: '⚡', name: 'Lightning', desc: '100-day solve streak', check: d => d.maxStreak >= 100 },
    // Speed achievements
    { id: 'quick_draw', icon: '🎯', name: 'Quick Draw', desc: 'Solve 800-rated problem in <2 minutes', check: d => d.hasQuickDraw },
    { id: 'speed_demon', icon: '⚡', name: 'Speed Demon', desc: 'Solve 3 problems in <5 min each in one session', check: d => d.hasSpeedDemon },
    { id: 'lightning_reflexes', icon: '⚡️', name: 'Lightning Reflexes', desc: 'Solve any problem in <1 minute', check: d => d.hasLightning },
    // Boss fight achievements
    { id: 'boss_slayer', icon: '🐉', name: 'Boss Slayer', desc: 'Defeat 5 boss problems', check: d => d.bossesDefeated >= 5 },
    { id: 'dragon_hunter', icon: '🗡️', name: 'Dragon Hunter', desc: 'Defeat 10 boss problems', check: d => d.bossesDefeated >= 10 },
    // Teach-back achievements
    { id: 'teacher', icon: '🎓', name: 'Teacher', desc: 'Write 5 teach-back explanations', check: d => d.teachBackCount >= 5 },
    { id: 'professor', icon: '📚', name: 'Professor', desc: 'Write 20 teach-back explanations', check: d => d.teachBackCount >= 20 }
];

// ===== XP Bonus Tables (First-try and Speed bonuses) =====
const FIRST_TRY_BONUS = {
    800: 5, 900: 8, 1000: 12, 1100: 15, 1200: 25,
    1300: 35, 1400: 50, 1500: 70, 1600: 100,
    1700: 140, 1800: 190, 1900: 250, 2000: 250,
    2100: 250, 2200: 250, 2300: 250, 2400: 250, 2500: 250
};

const UNDER_10_MIN_BONUS = {
    800: 5, 900: 8, 1000: 10, 1100: 12, 1200: 15,
    1300: 20, 1400: 25, 1500: 30, 1600: 40,
    1700: 50, 1800: 60, 1900: 80, 2000: 80,
    2100: 80, 2200: 80, 2300: 80, 2400: 80, 2500: 80
};

// Streak milestone bonuses (one-time awards)
const STREAK_MILESTONES = [
    { days: 7, xp: 200 },
    { days: 30, xp: 1000 },
    { days: 60, xp: 500 },
    { days: 100, xp: 1500 }
];

// ===== State =====
let state = {
    handle: '',
    submissions: [],
    userInfo: null,
    ratingHistory: [],
    solvedProblems: new Map(),
    totalXP: 0,
    streak: 0,
    maxStreak: 0,
    tagCounts: {},
    contestHistory: [],
    practiceList: [],
    solutionLogs: {},
    blindMode: false,
    flashcardMode: false,
    streakBonuses: new Set(),
    // New state properties for enhanced gamification
    unlockedAchievements: new Set(),
    streakMilestones: new Set(),
    teachBackXpAwarded: new Set(),
    tagProficiency: {},
    bossFights: [],
    activeBoss: null,
    lastReviewDate: null
};

// ===== Toast Notification System =====
function showToast(message, type = 'info', duration = 3000) {
    // Create toast container if it doesn't exist
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span class="toast-icon">${type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ'}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('toast-show'), 10);

    // Auto-dismiss
    setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Helper: Get today's date key for streak bonus tracking
function getTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// ===== DOM Helpers =====
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
}

function setStyle(id, prop, val) {
    const el = document.getElementById(id);
    if (el) el.style[prop] = val;
}

// Normalize problem id formats to a canonical `contestId-index` string.
function normalizePid(item) {
    if (!item) return null;
    // If it's a string like '1234-A' or '1234A' or '1234 A' or '1234/A'
    if (typeof item === 'string') {
        const s = item.trim();
        const m = s.match(/(\d+)[-\/ ]?([A-Za-z0-9]+)/);
        if (m) return `${m[1]}-${m[2]}`;
        return s;
    }
    // If it's a CF problem object with explicit fields
    if (item.contestId && item.index) return `${item.contestId}-${item.index}`;
    // If schedule/problem object with id like '1234/A' or '1234A' or '1234-A'
    if (item.id) {
        const s = item.id.toString().trim();
        // normalize separators to '-'
        const norm = s.replace(/[\/\s]+/g, '-');
        const m = norm.match(/(\d+)-?([A-Za-z0-9]+)/);
        if (m) return `${m[1]}-${m[2]}`;
        // fallback: if it's purely digits, return as-is (may not match solved keys)
        if (/^\d+$/.test(s)) return s;
    }
    return null;
}

// ===== API Functions =====
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.status !== 'OK') throw new Error(data.comment || 'API error');
    return data.result;
}

async function fetchUserInfo(handle) {
    return (await fetchJSON(`${CF_API}/user.info?handles=${handle}`))[0];
}

async function fetchSubmissions(handle) {
    return await fetchJSON(`${CF_API}/user.status?handle=${handle}&from=1&count=10000`);
}

async function fetchRatingHistory(handle) {
    return await fetchJSON(`${CF_API}/user.rating?handle=${handle}`);
}

// ===== Core Logic =====
function processSubmissions(submissions) {
    const solved = new Map();
    const tagCounts = {};
    let totalXP = 0;

    // Process accepted submissions (unique problems only)
    for (const sub of submissions) {
        if (sub.verdict !== 'OK') continue;
        const key = `${sub.problem.contestId}-${sub.problem.index}`;
        if (solved.has(key)) continue;

        const rating = sub.problem.rating || 800;
        const tags = sub.problem.tags || [];

        solved.set(key, {
            name: sub.problem.name,
            contestId: sub.problem.contestId,
            index: sub.problem.index,
            rating: rating,
            tags: tags,
            time: sub.creationTimeSeconds,
            language: sub.programmingLanguage
        });

        // Calculate XP
        const bucket = Math.min(Math.floor(rating / 100) * 100, 2500);
        totalXP += XP_TABLE[bucket] || 10;

        // Count tags
        for (const tag of tags) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        }
    }

    return { solved, totalXP, tagCounts };
}

function calculateStreak(solvedMap) {
    // Get unique days with at least 1 solve
    const days = new Set();
    for (const [, prob] of solvedMap) {
        const d = new Date(prob.time * 1000);
        days.add(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`);
    }

    const sortedDays = [...days].sort().reverse();
    if (sortedDays.length === 0) return { streak: 0, maxStreak: 0 };

    // Current streak (from today backwards)
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayKey = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;

    let streak = 0;
    if (days.has(todayKey) || days.has(yesterdayKey)) {
        let check = days.has(todayKey) ? new Date(today) : new Date(yesterday);
        while (true) {
            const key = `${check.getFullYear()}-${check.getMonth()}-${check.getDate()}`;
            if (days.has(key)) {
                streak++;
                check.setDate(check.getDate() - 1);
            } else break;
        }
    }

    // Max streak (any consecutive days)
    let maxStreak = 1, cur = 1;
    const allDays = [...days].map(d => {
        const [y, m, dy] = d.split('-').map(Number);
        return new Date(y, m, dy).getTime();
    }).sort((a, b) => a - b);

    for (let i = 1; i < allDays.length; i++) {
        if (allDays[i] - allDays[i - 1] === 86400000) {
            cur++;
            maxStreak = Math.max(maxStreak, cur);
        } else cur = 1;
    }

    return { streak, maxStreak };
}

// Update state from a submissions array (silent, no loading overlay)
async function updateFromSubmissions(submissions) {
    // Remember previous progress/streak so we can bump the streak
    // the moment the user completes the target day.
    const prevProgressDay = calculateProgressDay();
    const prevStreak = state.streak || 0;

    const { solved, totalXP, tagCounts } = processSubmissions(submissions);
    state.solvedProblems = solved;
    state.totalXP = totalXP;
    state.tagCounts = tagCounts;

    // Recalculate streak from solved set (date-based) but prefer schedule-derived
    // consecutive-day progress so the streak increments immediately when the
    // day's allocated problems are completed.
    const streakData = calculateStreak(solved);
    const dateStreak = streakData.streak;

    // Derive schedule-based streak: number of consecutive completed days
    // (first incomplete day index - 1). This updates immediately when the
    // current day's problems are all solved.
    const scheduleProgress = calculateProgressDay();
    const scheduleStreak = Math.max(0, scheduleProgress - 1);

    // RELAXED: Don't reset schedule streak immediately if API lag is suspected.
    // If scheduleStreak looks valid (larger than dateStreak), we keep it but log it.
    const validScheduleStreak = scheduleStreak;
    state.streak = Math.max(dateStreak, validScheduleStreak);

    // Manual override
    const streakOverride = parseInt(localStorage.getItem('streakOverride') || '0');
    if (streakOverride > state.streak) {
        state.streak = streakOverride;
    }

    // FIX: Load persisted max streak to prevent loss of historic maximum
    const persistedMaxStreak = parseInt(localStorage.getItem('maxStreakPersisted') || '0');
    state.maxStreak = Math.max(persistedMaxStreak, state.streak, streakData.maxStreak || 0);
    // Persist immediately
    localStorage.setItem('maxStreakPersisted', state.maxStreak.toString());

    // Award streak XP for newly completed schedule days (only once per day)
    // FIX: Use date-based key to prevent double-counting on same day
    if (scheduleProgress > prevProgressDay) {
        const bonuses = state.streakBonuses || new Set();
        const todayKey = getTodayKey();
        let totalAward = 0;

        for (let d = prevProgressDay; d <= scheduleProgress - 1; d++) {
            // Include today's date in the key to prevent same-day re-awards
            const key = `day-${d}:${todayKey}`;
            const legacyKey = `day-${d}`; // Also check legacy format

            if (!bonuses.has(key) && !bonuses.has(legacyKey)) {
                // Award formula: base + small multiplier by current streak length
                const award = 10 + (state.streak || 0) * 2;
                totalAward += award;
                bonuses.add(key);
            }
        }

        if (totalAward > 0) {
            state.totalXP = (state.totalXP || 0) + totalAward;
            state.streakBonuses = bonuses;
            localStorage.setItem('streakBonuses', JSON.stringify(Array.from(bonuses)));
            // Use toast notification instead of blocking alert
            showToast(`Streak bonus: +${totalAward} XP for maintaining your streak!`, 'success');
        }
    }

    // Award streak milestone bonuses (one-time awards)
    const milestones = state.streakMilestones || new Set();
    for (const milestone of STREAK_MILESTONES) {
        if (state.streak >= milestone.days && !milestones.has(milestone.days)) {
            state.totalXP = (state.totalXP || 0) + milestone.xp;
            milestones.add(milestone.days);
            localStorage.setItem('streakMilestones', JSON.stringify([...milestones]));
            showToast(`${milestone.days}-day streak milestone! +${milestone.xp} XP bonus!`, 'success', 5000);
        }
    }
    state.streakMilestones = milestones;

    // Re-render dashboard and calendar so streak/counts update live
    renderDashboard();
    // If calendar tab is visible, refresh it too
    const calTab = document.getElementById('tab-calendar');
    if (calTab && calTab.classList.contains('active')) renderCalendar();
}

function getLevel(xp) {
    let lvl = LEVELS[0];
    for (const l of LEVELS) {
        if (xp >= l.xp) lvl = l;
        else break;
    }
    return lvl;
}

function getNextLevel(xp) {
    for (const l of LEVELS) {
        if (xp < l.xp) return l;
    }
    return LEVELS[LEVELS.length - 1];
}

function getRatingColor(rating) {
    const bucket = Math.min(Math.floor(rating / 100) * 100, 2300);
    return RATING_COLORS[bucket] || '#808080';
}

// ===== UI Functions =====
async function startTracking() {
    const handle = document.getElementById('handle-input').value.trim();
    if (!handle) {
        document.getElementById('login-error').textContent = 'Please enter your handle';
        return;
    }

    document.getElementById('login-error').textContent = '';
    showLoading(true);

    try {
        const [userInfo, submissions, ratingHistory] = await Promise.all([
            fetchUserInfo(handle),
            fetchSubmissions(handle),
            fetchRatingHistory(handle).catch(() => [])
        ]);

        state.handle = handle;
        state.userInfo = userInfo;
        state.submissions = submissions;
        state.ratingHistory = ratingHistory;

        // Centralized update so UI (streak/calendar) refreshes correctly
        await updateFromSubmissions(submissions);

        // Load History & Practice
        state.contestHistory = JSON.parse(localStorage.getItem('contestHistory') || '[]');
        state.practiceList = JSON.parse(localStorage.getItem('practiceList') || '[]');
        state.solutionLogs = JSON.parse(localStorage.getItem('solutionLogs') || '{}');
        state.blindMode = localStorage.getItem('blindMode') === 'true';
        state.flashcardMode = localStorage.getItem('flashcardMode') === 'true';
        // Streak bonuses already granted (persisted as array of day keys)
        try {
            const sb = JSON.parse(localStorage.getItem('streakBonuses') || '[]');
            state.streakBonuses = new Set(Array.isArray(sb) ? sb : []);
        } catch (e) {
            state.streakBonuses = new Set();
        }

        // Load persisted achievement unlocks
        try {
            const ua = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
            state.unlockedAchievements = new Set(Array.isArray(ua) ? ua : []);
        } catch (e) {
            state.unlockedAchievements = new Set();
        }

        // Load streak milestones
        try {
            const sm = JSON.parse(localStorage.getItem('streakMilestones') || '[]');
            state.streakMilestones = new Set(Array.isArray(sm) ? sm : []);
        } catch (e) {
            state.streakMilestones = new Set();
        }

        // Load teach-back XP awarded PIDs
        try {
            const tb = JSON.parse(localStorage.getItem('teachBackXpAwarded') || '[]');
            state.teachBackXpAwarded = new Set(Array.isArray(tb) ? tb : []);
        } catch (e) {
            state.teachBackXpAwarded = new Set();
        }

        // Load boss fights
        try {
            state.bossFights = JSON.parse(localStorage.getItem('bossFights') || '[]');
            state.activeBoss = JSON.parse(localStorage.getItem('activeBoss') || 'null');
        } catch (e) {
            state.bossFights = [];
            state.activeBoss = null;
        }

        // Load weekly review date
        state.lastReviewDate = parseInt(localStorage.getItem('lastReviewDate') || '0');

        localStorage.setItem('cf_handle', handle);

        showLoading(false);
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        renderDashboard();
        // Load local weekly contest ratings for graphing
        try {
            state.localContestRatings = JSON.parse(localStorage.getItem('localContestRatings') || '[]');
            if (!Array.isArray(state.localContestRatings)) state.localContestRatings = [];
        } catch (e) { state.localContestRatings = []; }
        renderWeeklyRatingGraph();

        // Check for revision reminders (only after successful login)
        checkRevisionNeeded();

        // Check if weekly review is needed
        checkWeeklyReview();
    } catch (e) {
        showLoading(false);
        document.getElementById('login-error').textContent = `Error: ${e.message}. Check your handle.`;
    }
}

function renderDashboard() {
    const u = state.userInfo;
    setText('user-handle', u.handle);
    setText('current-rating', u.rating || '—');
    setText('user-rating', u.rating || 'Unrated');
    setStyle('user-rating', 'background', getRatingColor(u.rating || 0));
    setText('user-rank', u.rank || '');

    // XP & Level
    const level = getLevel(state.totalXP);
    const next = getNextLevel(state.totalXP);
    setText('level-number', `Lv. ${level.level}`);
    setText('level-title', level.title);
    setText('current-xp', state.totalXP.toLocaleString());
    setText('next-level-xp', next.xp.toLocaleString());
    setText('total-xp', state.totalXP.toLocaleString());

    const progress = next.xp > level.xp ? ((state.totalXP - level.xp) / (next.xp - level.xp)) * 100 : 100;
    setTimeout(() => setStyle('xp-bar', 'width', `${Math.min(progress, 100)}%`), 100);

    // Stats
    setText('total-solved', state.solvedProblems.size);
    setText('streak-count', state.streak);
    setText('max-streak', state.maxStreak);
    setText('contests-count', state.ratingHistory.length);

    // Weekly rating: most recent local contest rating if available
    const latestLocal = (state.localContestRatings && state.localContestRatings.length > 0) ? state.localContestRatings[0] : null;
    setText('weekly-rating', latestLocal ? latestLocal.toString() : '—');

    // Avg rating
    let totalRating = 0, ratedCount = 0;
    for (const [, p] of state.solvedProblems) {
        if (p.rating) { totalRating += p.rating; ratedCount++; }
    }
    setText('avg-rating', ratedCount ? Math.round(totalRating / ratedCount) : '—');

    // Streak fire
    const fire = document.getElementById('streak-fire');
    if (fire) {
        if (state.streak >= 100) fire.textContent = '⚡';
        else if (state.streak >= 30) fire.textContent = '💎';
        else if (state.streak >= 7) fire.textContent = '🔥';
        else if (state.streak >= 1) fire.textContent = '🔥';
        else fire.textContent = '❄️'; // No active streak
    }

    renderRatingChart();
    renderRecentSubmissions();
    renderAchievements();
    renderStudyGuides();
    renderContests();
    renderIdeas();
    // populateTagFilter(); // Removed permanently as requested

    renderWeeklyRatingGraph();

    // Growth & motivation widgets
    renderConfidenceCard();
    renderComfortAndLadder();

    // Growth Features
    if (state.blindMode) document.body.classList.add('blind-mode-on');
    else document.body.classList.remove('blind-mode-on');

    const blindToggle = document.getElementById('blind-mode-toggle');
    if (blindToggle) blindToggle.checked = state.blindMode;

    const gymBtn = document.querySelector('.gym-btn');
    if (gymBtn) gymBtn.textContent = state.flashcardMode ? "🏋️ Exit Idea Gym" : "🏋️ Enter Idea Gym (Flashcard Mode)";
}

// ===== Growth & Motivation Helpers =====

// Build rating bucket counts from solved problems.
function getRatingBuckets() {
    const buckets = {};
    for (const [, p] of state.solvedProblems) {
        const r = p.rating || 800;
        const b = Math.floor(r / 100) * 100;
        buckets[b] = (buckets[b] || 0) + 1;
    }
    return buckets;
}

// Determine comfort zone (bucket with most solves, biased toward lower ratings).
function getComfortZone(buckets) {
    const entries = Object.entries(buckets);
    if (entries.length === 0) return null;
    // Sort by count desc, then rating asc
    entries.sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return parseInt(a[0], 10) - parseInt(b[0], 10);
    });
    const [bucketStr, count] = entries[0];
    const bucket = parseInt(bucketStr, 10);
    return { bucket, count };
}

function renderConfidenceCard() {
    const scoreEl = document.getElementById('confidence-score');
    const labelEl = document.getElementById('confidence-label');
    const descEl = document.getElementById('confidence-desc');
    const hintEl = document.getElementById('confidence-hint');
    if (!scoreEl || !labelEl || !descEl || !hintEl) return;

    const total = state.solvedProblems.size || 0;
    if (total === 0) {
        scoreEl.textContent = '—';
        labelEl.textContent = 'Just getting started';
        descEl.textContent = 'Solve a few problems so we can estimate your confidence.';
        hintEl.textContent = 'Start with 5–10 easy problems (800) to warm up your brain.';
        return;
    }

    const userRating = state.userInfo && state.userInfo.rating ? state.userInfo.rating : 800;
    const buckets = getRatingBuckets();

    // Fraction of problems in or above current rating - 100 (growth-ish problems)
    let growthCount = 0;
    for (const [, p] of state.solvedProblems) {
        const r = p.rating || 800;
        if (r >= userRating - 100) growthCount++;
    }
    const fracGrowth = total ? growthCount / total : 0;

    // Simple confidence heuristic: mix of volume, streak, and growth fraction
    const volumeScore = Math.min(1, total / 300);           // saturates at 300 solves
    const streakScore = Math.min(1, (state.streak || 0) / 30); // saturates at 30-day streak
    const growthScore = fracGrowth;                         // already in [0,1]

    let raw = 0.5 * volumeScore + 0.3 * growthScore + 0.2 * streakScore;
    raw = Math.max(0, Math.min(1, raw));
    const percent = Math.round(raw * 100);

    scoreEl.textContent = `${percent}`;

    let label = 'Calibrating';
    let desc = '';
    let hint = '';

    if (percent < 30) {
        label = 'Foundation Stage';
        desc = 'You are still building basics. That is exactly where you should be right now.';
        hint = 'Focus on finishing Phase 1 calendar days and reading the early study lessons before jumping to harder ratings.';
    } else if (percent < 60) {
        label = 'Building Momentum';
        desc = 'You have a solid base of solves. Time to mix growth problems just above your comfort zone.';
        hint = 'For each session, keep 1 easy warmup but add at least 1 problem that is 100–200 rating above your comfort zone.';
    } else if (percent < 85) {
        label = 'Confident Grinder';
        desc = 'You are consistently solving and pushing into higher ratings.';
        hint = 'Start using weekly contests more regularly and always upsolve at least one unsolved problem with a teach-back note.';
    } else {
        label = 'Contest Warrior in Training';
        desc = 'Your habits and difficulty mix already look like a future high-rated player.';
        hint = 'Keep your streak healthy, maintain a mix of comfort problems for speed and growth problems for ideas, and review your hardest solves weekly.';
    }

    labelEl.textContent = label;
    descEl.textContent = desc;
    hintEl.textContent = hint;
}

function renderComfortAndLadder() {
    const comfortTextEl = document.getElementById('comfort-zone-text');
    const growthTextEl = document.getElementById('growth-zone-text');
    const ladderListEl = document.getElementById('ladder-list');
    if (!comfortTextEl || !growthTextEl || !ladderListEl) return;

    const buckets = getRatingBuckets();
    const comfort = getComfortZone(buckets);

    if (!comfort) {
        comfortTextEl.textContent = 'Not enough data yet';
        growthTextEl.textContent = 'Solve a few problems to see your comfort and growth zones.';
        ladderListEl.innerHTML = '';
        return;
    }

    const comfortBucket = comfort.bucket;
    const comfortCount = comfort.count;

    comfortTextEl.textContent = `${comfortBucket} (${comfortCount} solved)`;

    const growthLow = comfortBucket + 100;
    const growthHigh = comfortBucket + 300;
    growthTextEl.textContent = `${growthLow}–${growthHigh}`;

    const ladderRatings = [800, 900, 1000, 1100, 1200];
    const targetPerRung = 10;

    const ladderHtml = ladderRatings.map(r => {
        const count = buckets[r] || 0;
        const progress = Math.min(1, count / targetPerRung);
        const pct = Math.round(progress * 100);

        let statusText;
        if (count >= targetPerRung) statusText = 'Complete';
        else if (count === 0) statusText = 'Not started';
        else statusText = `${count}/${targetPerRung} done`;

        return `
            <div class="ladder-row">
                <div class="ladder-info">
                    <span class="ladder-rating">${r}</span>
                    <span class="ladder-status">${statusText}</span>
                </div>
                <div class="ladder-bar">
                    <div class="ladder-bar-fill" style="width:${pct}%"></div>
                </div>
            </div>
        `;
    }).join('');

    ladderListEl.innerHTML = ladderHtml;
}

// Simple boss stats: count problems solved that are significantly above comfort zone.
// FIX: Use comfort zone instead of user rating per gamification spec
function getBossStats() {
    const buckets = getRatingBuckets();
    const comfort = getComfortZone(buckets);
    const comfortBucket = comfort ? comfort.bucket : 800;

    // Boss threshold: 200 above comfort zone (as per spec)
    const bossThreshold = comfortBucket + 200;
    let bossesDefeated = 0;
    for (const [, p] of state.solvedProblems) {
        if (p.rating && p.rating >= bossThreshold) bossesDefeated++;
    }
    return { bossesDefeated, bossThreshold };
}

function renderRatingChart() {
    const buckets = {};
    for (const [, p] of state.solvedProblems) {
        const r = p.rating || 800;
        const b = Math.floor(r / 100) * 100;
        buckets[b] = (buckets[b] || 0) + 1;
    }

    const ratings = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
    const maxCount = Math.max(...ratings.map(r => buckets[r] || 0), 1);

    const html = ratings.map(r => {
        const count = buckets[r] || 0;
        const height = (count / maxCount) * 150;
        const color = getRatingColor(r);
        return `<div class="rating-bar-wrapper">
            <div class="rating-bar" style="height:${height}px;background:${color}">
                <span class="bar-count">${count}</span>
            </div>
            <span class="rating-label">${r}</span>
        </div>`;
    }).join('');

    setHTML('rating-chart', html);
}

function renderRecentSubmissions() {
    const list = document.getElementById('recent-submissions');
    const sorted = [...state.solvedProblems.values()].sort((a, b) => b.time - a.time).slice(0, 20);

    list.innerHTML = sorted.map(p => {
        const color = getRatingColor(p.rating || 800);
        const time = new Date(p.time * 1000).toLocaleDateString();
        return `<div class="recent-item">
            <span class="problem-name"><a href="https://codeforces.com/problemset/problem/${p.contestId}/${p.index}" target="_blank">${p.contestId}${p.index} — ${p.name}</a></span>
            <span class="problem-rating" style="background:${color}22;color:${color}">${p.rating || '?'}</span>
            <span class="problem-time">${time}</span>
        </div>`;
    }).join('');
}

function renderAchievements() {
    // Get boss stats for achievements
    const bossStats = getBossStats();

    // Count teach-back explanations
    const teachBackCount = Object.keys(state.solutionLogs || {}).filter(k =>
        state.solutionLogs[k] && state.solutionLogs[k].trim().length > 0
    ).length;

    // Check for speed achievements (simplified - would need solve time tracking for full implementation)
    const hasQuickDraw = false; // Will be set when speed tracking is implemented
    const hasSpeedDemon = false;
    const hasLightning = false;

    const data = {
        totalSolved: state.solvedProblems.size,
        tagCounts: state.tagCounts,
        rating: state.userInfo.rating || 0,
        contestCount: state.ratingHistory.length,
        maxStreak: state.maxStreak,
        hasEureka: [...state.solvedProblems.values()].some(p => p.rating && p.rating >= (state.userInfo.rating || 0) + 200),
        bossesDefeated: bossStats.bossesDefeated,
        teachBackCount: teachBackCount,
        hasQuickDraw: hasQuickDraw,
        hasSpeedDemon: hasSpeedDemon,
        hasLightning: hasLightning
    };

    const html = ACHIEVEMENTS.map(a => {
        // Check if already unlocked (persisted) or newly unlocked
        const wasUnlocked = state.unlockedAchievements.has(a.id);
        const isUnlocked = a.check(data) || wasUnlocked;

        // If newly unlocked, persist and notify
        if (isUnlocked && !wasUnlocked) {
            state.unlockedAchievements.add(a.id);
            localStorage.setItem('unlockedAchievements', JSON.stringify([...state.unlockedAchievements]));
            // Show toast notification for new unlock (delayed slightly to avoid spam on initial load)
            setTimeout(() => {
                showToast(`Achievement Unlocked: ${a.name}!`, 'success', 4000);
            }, 100);
        }

        return `<div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
            <span class="achievement-icon">${a.icon}</span>
            <div class="achievement-info">
                <h4>${a.name} ${isUnlocked ? '✅' : '🔒'}</h4>
                <p>${a.desc}</p>
            </div>
        </div>`;
    }).join('');

    setHTML('achievements-grid', html);
}

function renderStudyGuides() {
    const grid = document.getElementById('study-grid');
    grid.innerHTML = STUDY_GUIDES.map(g => `
        <div class="study-card" onclick="openStudyGuide(${g.id})">
            <span class="lesson-num">${g.id}</span>
            <h4>Lesson ${g.id}: ${g.title}</h4>
            <p>${g.desc}</p>
            <span class="study-tag">${g.tag}</span>
        </div>
    `).join('');
}


function openStudyGuide(id) {
    const guide = STUDY_GUIDES.find(g => g.id === id);
    if (!guide) return;

    document.getElementById('study-grid').classList.add('hidden');
    document.getElementById('study-viewer').classList.remove('hidden');

    const content = document.getElementById('study-content');

    // Use bundled content from study_data.js
    const markdown = STUDY_CONTENT[id];

    if (markdown) {
        content.innerHTML = renderMarkdown(markdown);
    } else {
        content.innerHTML = `
            <h1>Lesson ${guide.id}: ${guide.title}</h1>
            <p>Content not found in the bundle.</p>
        `;
    }
}


function closeStudyViewer() {
    document.getElementById('study-grid').classList.remove('hidden');
    document.getElementById('study-viewer').classList.add('hidden');
}

function renderMarkdown(md) {
    if (!md) return '';

    // 1. Extract fenced code blocks FIRST to protect them from all other processing.
    //    Matches  ```lang\ncode```  or  ```\ncode```
    const codeBlocks = [];
    md = md.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        const langAttr = lang ? ` data-lang="${lang}"` : '';
        codeBlocks.push(`<pre${langAttr}><code>${escapedCode}</code></pre>`);
        return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
    });

    // 2. Extract inline code (single backticks) — must come after fenced blocks
    const inlineCode = [];
    md = md.replace(/`([^`\n]+)`/g, (match, code) => {
        const escapedCode = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        inlineCode.push(`<code>${escapedCode}</code>`);
        return `__INLINE_CODE_${inlineCode.length - 1}__`;
    });

    // 3. Process other formatting
    md = md
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
        .replace(/^---$/gm, '<hr>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        // Tables: skip separator rows (---)
        .replace(/^\|(.+)\|$/gm, (match) => {
            const cells = match.slice(1, -1).split('|');
            if (cells.every(c => /^[\s\-:]+$/.test(c))) return ''; // separator row
            return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
        })
        .replace(/(<tr>[\s\S]*?<\/tr>\n?)+/g, (rows) => {
            // Promote the first row to <th>
            return '<table>' + rows.replace('<tr>', '<tr class="header-row">') + '</table>';
        })
        // Lists — handle - and * bullet points
        .replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
        .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, '<ul>$&</ul>')
        // Paragraphs: blank lines become paragraph breaks
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');

    // 4. Restore placeholders
    md = md.replace(/__INLINE_CODE_(\d+)__/g, (_, id) => inlineCode[id]);
    md = md.replace(/__CODE_BLOCK_(\d+)__/g, (_, id) => codeBlocks[id]);

    return md;
}

function renderIdeas() {
    const list = document.getElementById('ideas-list');
    const isFlash = state.flashcardMode;

    list.innerHTML = IDEAS_DATA.map((idea, i) => `
        <div class="idea-card ${isFlash ? 'flashcard' : ''}" onclick="this.classList.toggle('expanded')">
            <div class="idea-header">
                <h4>${idea.title}</h4>
                <span class="idea-difficulty ${idea.difficulty}">${idea.difficulty === 'easy' ? '🟢 Beginner' : idea.difficulty === 'medium' ? '🟡 Intermediate' : '🔴 Advanced'}</span>
            </div>
            <div class="idea-body">${idea.body}</div>
            ${isFlash ? '<div class=\"click-reveal\">Click to reveal trick...</div>' : ''}
        </div>
    `).join('');
}

function toggleFlashcardMode() {
    state.flashcardMode = !state.flashcardMode;
    localStorage.setItem('flashcardMode', state.flashcardMode);
    renderIdeas();
}

function filterIdeas() {
    const query = document.getElementById('ideas-search').value.toLowerCase();
    const cards = document.querySelectorAll('.idea-card');
    cards.forEach((card, i) => {
        const match = IDEAS_DATA[i].title.toLowerCase().includes(query) || IDEAS_DATA[i].body.toLowerCase().includes(query);
        card.style.display = match ? '' : 'none';
    });
}

// function populateTagFilter() {
//     const select = document.getElementById('tag-filter');
//     const tags = Object.keys(state.tagCounts).sort();
//     select.innerHTML = '<option value="all">All Tags</option>' +
//         tags.map(t => `<option value="${t}">${t} (${state.tagCounts[t]})</option>`).join('');
//     // filterProblems(); // Removed
// }

function showTab(tabId, element) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));

    document.getElementById(`tab-${tabId}`).classList.add('active');
    if (element) {
        element.classList.add('active');
    } else {
        // Fallback
        const items = document.querySelectorAll('.nav-links li');
        if (tabId === 'overview' && items.length > 0) items[0].classList.add('active');
    }

    // Always clean up fullscreen when switching tabs — user may have navigated
    // away while the study reader was in fullscreen, leaving body.overflow locked.
    const readerContainer = document.querySelector('.reader-container');
    if (readerContainer && readerContainer.classList.contains('study-fullscreen')) {
        readerContainer.classList.remove('study-fullscreen');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) fullscreenBtn.innerHTML = '<span>⛶</span> Fullscreen';
    }
    document.body.style.overflow = '';

    if (tabId === 'practice') renderPracticeList();
    if (tabId === 'calendar') renderCalendar();
    if (tabId === 'contests') renderContestHistory();
    if (tabId === 'tag-analysis') renderTagAnalysis();
    if (tabId === 'study-material') initializeStudyMaterial();
    if (tabId === 'matrix') renderMasteryMatrix();
    if (tabId === 'insights' && typeof renderInsightsTab === 'function') renderInsightsTab();
}

function renderPracticeList() {
    const ratingFilter = document.getElementById('rating-filter').value;
    const table = document.getElementById('practice-table');

    // Filter solved problems out of practice list (just in case)
    state.practiceList = state.practiceList.filter(p => {
        const pid = normalizePid(p);
        return !(pid && state.solvedProblems.has(pid));
    });
    localStorage.setItem('practiceList', JSON.stringify(state.practiceList));

    let probs = [...state.practiceList];

    if (ratingFilter !== 'all') {
        const r = parseInt(ratingFilter);
        if (r === 1300) probs = probs.filter(p => (p.rating || 0) >= 1300);
        else probs = probs.filter(p => (p.rating || 0) === r);
    }

    if (probs.length === 0) {
        table.innerHTML = '<div style="padding:20px;text-align:center;color:var(--text-secondary)">No practice problems yet! Missed contest problems will appear here.</div>';
        return;
    }

    table.innerHTML = `<div class="problem-row problem-header"><span>ID</span><span>Name</span><span>Rating</span><span>Action</span></div>` +
        probs.map(p => {
            const color = getRatingColor(p.rating || 800);
            const pid = normalizePid(p) || '';
            const hasLog = pid && state.solutionLogs[pid];
            const isBlind = state.blindMode;
            const link = (p.contestId && p.index) ? `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}` : (p.link || '#');
            return `<div class="problem-row ${isBlind ? 'blind-active' : ''}">
                <span>${pid}</span>
                <span><a href="${link}" target="_blank">${p.name}</a></span>
                <span class="rating-cell" style="color:${color};font-weight:700">${p.rating || '?'}</span>
                <span>
                    <button onclick="openSolutionLog('${pid}')" title="Teach Back" style="background:transparent;border:none;cursor:pointer;margin-right:10px;">
                        ${hasLog ? '📜' : '🎓'}
                    </button>
                    <button onclick="removeFromPractice('${pid}')" style="background:transparent;border:none;cursor:pointer;color:var(--text-muted)">❌</button>
                </span>
            </div>`;
        }).join('');
}

function toggleBlindMode() {
    state.blindMode = !state.blindMode;
    localStorage.setItem('blindMode', state.blindMode);

    // Switch toggle UI if exists
    const toggle = document.getElementById('blind-mode-toggle');
    if (toggle) toggle.checked = state.blindMode;

    if (state.blindMode) document.body.classList.add('blind-mode-on');
    else document.body.classList.remove('blind-mode-on');

    renderPracticeList();
    if (JSON.parse(localStorage.getItem('activeContest'))) {
        restoreContest(JSON.parse(localStorage.getItem('activeContest')));
    }
}

function removeFromPractice(pid) {
    state.practiceList = state.practiceList.filter(p => normalizePid(p) !== pid);
    localStorage.setItem('practiceList', JSON.stringify(state.practiceList));
    renderPracticeList();
}

// ===== Calendar Logic =====
let currentPhase = 1;

function changePhase(delta) {
    const newPhase = currentPhase + delta;
    if (newPhase >= 1 && newPhase <= 6) {
        currentPhase = newPhase;
        renderCalendar();
    }
}

function renderCalendar() {
    const phaseData = SCHEDULE_DATA.find(p => p.phase === currentPhase);
    if (!phaseData) return;

    document.getElementById('calendar-phase-title').textContent = `Phase ${currentPhase}: ${phaseData.title}`;

    const grid = document.getElementById('calendar-grid');
    grid.innerHTML = '';

    const progressDay = calculateProgressDay();
    // Use state.streak directly — the old Math.min(state.streak, progressDay-1) cap
    // was preventing the calendar from showing more days as completed than the API
    // could verify, even when streakOverride was set higher.
    const displayedCompletedCount = state.streak;
    const displayedCurrentDay = displayedCompletedCount + 1;

    // Growth threshold for "growth problem done" indicator: any scheduled problem you solved
    // with rating significantly above your main comfort zone.
    const buckets = getRatingBuckets();
    const comfort = getComfortZone(buckets);
    const userRating = state.userInfo && state.userInfo.rating ? state.userInfo.rating : 800;
    const baseComfort = comfort ? comfort.bucket : 800;
    const growthThreshold = Math.max(900, Math.min(userRating + 200, baseComfort + 300));

    phaseData.ranges.forEach(range => {
        for (let d = range.start; d <= range.end; d++) {
            const dayDiv = document.createElement('div');

            // Consider a day completed if either our capped display marks it completed
            // or if all allocated problems for that day are solved (immediate green on completion).
            let isCompleted = d <= displayedCompletedCount || isDayCompleted(d, range);
            let isCurrent = (d === displayedCurrentDay);
            let isContestDay = (d % 7 === 0);

            // Check if the day includes at least one "growth" problem that you have already solved.
            // Important: show this even if the day isn't fully completed yet, otherwise it feels "not working".
            let hasGrowthSolved = false;
            const allocated = getAllocatedProblems(d, range);
            for (const p of allocated) {
                const pid = normalizePid(p);
                if (!pid) continue;
                const solvedProb = state.solvedProblems.get(pid);
                if (solvedProb && solvedProb.rating && solvedProb.rating >= growthThreshold) {
                    hasGrowthSolved = true;
                    break;
                }
            }

            dayDiv.className = `day-cell ${isCurrent ? 'current-day' : ''} ${isCompleted ? 'completed-day' : ''}`;
            dayDiv.onclick = (e) => openDay(d, range, e);

            dayDiv.innerHTML = `
                ${isCurrent ? '<div class="day-target">⬆ Target</div>' : ''}
                <span class="day-number">Day ${d}</span>
                <span class="day-topic">${range.title}</span>
                ${isCompleted ? '<span class="day-check">✓</span>' : ''}
                ${hasGrowthSolved ? '<span class="day-growth">⬆ Growth</span>' : ''}
                ${isContestDay ? '<span class="contest-icon" style="position:absolute;bottom:2px;right:2px;font-size:10px">🏆</span>' : ''}
            `;
            grid.appendChild(dayDiv);
        }
    });
}

function calculateProgressDay() {
    // Determine the first day that is NOT complete
    // We iterate through all phases/days in order
    for (const phase of SCHEDULE_DATA) {
        for (const range of phase.ranges) {
            for (let d = range.start; d <= range.end; d++) {
                if (!isDayCompleted(d, range)) {
                    return d;
                }
            }
        }
    }
    return 365; // Application complete!
}

function isDayCompleted(day, range) {
    const allocatedProbs = getAllocatedProblems(day, range);

    if (allocatedProbs.length === 0) return true; // No problems = done (theory only)

    // Check if ALL allocated problems are solved using strict PID matching only
    const allSolved = allocatedProbs.every(p => {
        const pid = normalizePid(p);
        return pid && state.solvedProblems.has(pid);
    });

    return allSolved;
}

// Helper: get the problems allocated to a specific day within a range
function getAllocatedProblems(day, range) {
    const totalDays = range.end - range.start + 1;
    const offset = day - range.start;
    const probsPerDay = Math.ceil(range.problems.length / totalDays);
    const startIdx = offset * probsPerDay;

    let allocated = [];
    for (let i = 0; i < probsPerDay; i++) {
        if (startIdx + i < range.problems.length) {
            allocated.push(range.problems[startIdx + i]);
        }
    }
    return allocated;
}

function checkRevisionNeeded() {
    const lastVisit = localStorage.getItem('cf_last_visit');
    const now = Date.now();

    if (lastVisit) {
        const daysSince = (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
        if (daysSince > 7) {
            // Show revision prompt
            showToast("Welcome back! It's been over a week. Review your last Phase theory!", 'info', 5000);
        }
    }

    localStorage.setItem('cf_last_visit', now.toString());
}

function openDay(day, range, event) {
    document.getElementById('day-panel').classList.remove('hidden');
    document.getElementById('day-title').textContent = `Day ${day} Target`;

    // Theory
    const theoryList = document.getElementById('day-theory-list');
    theoryList.innerHTML = range.theory.map(t => `<li>${t}</li>`).join('');

    // Problems — use the shared allocation helper
    const daysProblems = getAllocatedProblems(day, range);

    const probList = document.getElementById('day-problem-list');
    probList.innerHTML = daysProblems.map(p => {
        // Check if solved using strict PID matching
        const pid = normalizePid(p);
        const isSolved = pid && state.solvedProblems.has(pid);

        return `
        <div class="cal-prob-item">
            <a href="${p.link || '#'}" target="_blank">${p.name}</a>
            <span class="cal-status ${isSolved ? 'done' : 'pending'}">
                ${isSolved ? '✅ Solved' : '⭕ To Do'}
            </span>
        </div>`;
    }).join('');

    // === Matrix Practice bonus ===
    if (typeof getMatrixDailyProblems === 'function') {
        const matrixProbs = getMatrixDailyProblems();
        if (matrixProbs.length > 0) {
            const matrixHTML = `<div class="cal-matrix-section">
                <h5>🧩 Matrix Practice (optional)</h5>
                ${matrixProbs.map(mp => {
                const mpid = normalizePid(mp);
                const mpSolved = mpid && state.solvedProblems.has(mpid);
                return `<div class="cal-matrix-item">
                        <div>
                            <a href="${mp.link}" target="_blank">${mp.name}</a>
                            <span class="cal-tag">${mp.tag} · ${mp.concept}</span>
                        </div>
                        <span class="cal-status ${mpSolved ? 'done' : 'pending'}">
                            ${mpSolved ? '✅' : '⭕'}
                        </span>
                    </div>`;
            }).join('')}
            </div>`;
            probList.insertAdjacentHTML('beforeend', matrixHTML);
        }
    }

    // Highlight active day
    document.querySelectorAll('.day-cell').forEach(c => c.classList.remove('active-day'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active-day');
}

function closeDayPanel() {
    document.getElementById('day-panel').classList.add('hidden');
    document.querySelectorAll('.day-cell').forEach(c => c.classList.remove('active-day'));
}

function showLoading(show) {
    document.getElementById('loading-overlay').classList.toggle('hidden', !show);
}

async function refreshData() {
    showLoading(true);
    try {
        const [userInfo, submissions, ratingHistory] = await Promise.all([
            fetchUserInfo(state.handle),
            fetchSubmissions(state.handle),
            fetchRatingHistory(state.handle).catch(() => [])
        ]);
        state.userInfo = userInfo;
        state.submissions = submissions;
        state.ratingHistory = ratingHistory;

        // Reload ALL localStorage-persisted data (mirrors startTracking)
        state.contestHistory = JSON.parse(localStorage.getItem('contestHistory') || '[]');
        state.practiceList = JSON.parse(localStorage.getItem('practiceList') || '[]');
        state.solutionLogs = JSON.parse(localStorage.getItem('solutionLogs') || '{}');
        state.blindMode = localStorage.getItem('blindMode') === 'true';
        state.flashcardMode = localStorage.getItem('flashcardMode') === 'true';
        state.lastReviewDate = parseInt(localStorage.getItem('lastReviewDate') || '0');

        try {
            state.localContestRatings = JSON.parse(localStorage.getItem('localContestRatings') || '[]');
            if (!Array.isArray(state.localContestRatings)) state.localContestRatings = [];
        } catch (e) { state.localContestRatings = []; }

        try {
            const sb = JSON.parse(localStorage.getItem('streakBonuses') || '[]');
            state.streakBonuses = new Set(Array.isArray(sb) ? sb : []);
        } catch (e) { state.streakBonuses = new Set(); }

        try {
            const ua = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
            state.unlockedAchievements = new Set(Array.isArray(ua) ? ua : []);
        } catch (e) { state.unlockedAchievements = new Set(); }

        try {
            const sm = JSON.parse(localStorage.getItem('streakMilestones') || '[]');
            state.streakMilestones = new Set(Array.isArray(sm) ? sm : []);
        } catch (e) { state.streakMilestones = new Set(); }

        try {
            const tb = JSON.parse(localStorage.getItem('teachBackXpAwarded') || '[]');
            state.teachBackXpAwarded = new Set(Array.isArray(tb) ? tb : []);
        } catch (e) { state.teachBackXpAwarded = new Set(); }

        try {
            state.bossFights = JSON.parse(localStorage.getItem('bossFights') || '[]');
            state.activeBoss = JSON.parse(localStorage.getItem('activeBoss') || 'null');
        } catch (e) { state.bossFights = []; state.activeBoss = null; }

        // Sync blind-mode UI
        if (state.blindMode) document.body.classList.add('blind-mode-on');
        else document.body.classList.remove('blind-mode-on');
        const blindToggle = document.getElementById('blind-mode-toggle');
        if (blindToggle) blindToggle.checked = state.blindMode;

        // Rebuild solved set, streak, XP from fresh submissions
        await updateFromSubmissions(submissions);
        renderWeeklyRatingGraph();

        // Re-render whichever tab is currently visible
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab) {
            const tabId = activeTab.id.replace('tab-', '');
            if (tabId === 'calendar') renderCalendar();
            if (tabId === 'practice') renderPracticeList();
            if (tabId === 'tag-analysis') renderTagAnalysis();
            if (tabId === 'contests') renderContestHistory();
            if (tabId === 'insights' && typeof renderInsightsTab === 'function') renderInsightsTab();
        }

        showToast('Data refreshed successfully! ✅', 'success');
    } catch (e) {
        showToast('Refresh failed: ' + e.message, 'error');
    }
    showLoading(false);
}

function logout() {
    localStorage.removeItem('cf_handle');
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    document.getElementById('handle-input').value = '';
}

function exportData() {
    const keys = [
        'contestHistory', 'practiceList', 'solutionLogs', 'blindMode',
        'flashcardMode', 'streakBonuses', 'unlockedAchievements',
        'streakMilestones', 'teachBackXpAwarded', 'bossFights',
        'activeBoss', 'maxStreakPersisted', 'streakOverride'
    ];
    const data = {};
    keys.forEach(k => {
        data[k] = localStorage.getItem(k);
    });

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cf_tracker_data_${state.handle || 'backup'}.json`;
    a.click();
    showToast('Data exported! Keep this file safe.', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);
                Object.keys(data).forEach(k => {
                    if (data[k] !== null) localStorage.setItem(k, data[k]);
                });
                showToast('Data imported! Refreshing...', 'success');
                setTimeout(() => window.location.reload(), 1500);
            } catch (err) {
                showToast('Import failed: ' + err.message, 'error');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ===== Init =====
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('cf_handle');
    if (saved) {
        document.getElementById('handle-input').value = saved;
        // Auto-login on restart
        startTracking();
    }
    document.getElementById('handle-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') startTracking();
    });

    // Note: checkRevisionNeeded() is now called at the end of startTracking()
    // instead of here, so it only fires after a successful login.
});

// ==========================================
// Weekly Contest Feature
// ==========================================

let contestInterval;
let submissionCheckInterval;

function renderContests() {
    const activeContest = JSON.parse(localStorage.getItem('activeContest'));

    if (activeContest) {
        document.getElementById('contest-setup').classList.add('hidden');
        document.getElementById('active-contest').classList.remove('hidden');
        restoreContest(activeContest);
    } else {
        document.getElementById('active-contest').classList.add('hidden');
        updateContestSetupInfo();
    }
    renderContestHistory();
}

function updateContestSetupInfo() {
    const phaseData = SCHEDULE_DATA.find(p => p.phase === currentPhase);
    if (!phaseData) return;

    // Determine current "Week" or Range
    const currentDay = calculateProgressDay();
    // Populate week selector so user can pick past weeks. Preserve any
    // existing selection instead of recreating options on every call.
    const select = document.getElementById('contest-range-select');
    if (select) {
        const prev = select.value;
        if (phaseData.ranges && phaseData.ranges.length > 0) {
            const optionsHtml = phaseData.ranges.map((r, idx) => {
                const label = `${r.title} (Days ${r.start}-${r.end})`;
                return `<option value="${idx}">${label}</option>`;
            }).join('');
            select.innerHTML = optionsHtml;
            // Try to restore previous selection saved in localStorage first
            const saved = localStorage.getItem('selectedContestRange');
            if (saved && Array.from(select.options).some(o => o.value === saved)) {
                select.value = saved;
            } else if (prev && Array.from(select.options).some(o => o.value === prev)) {
                select.value = prev;
            } else {
                const defaultIdx = phaseData.ranges.findIndex(r => currentDay >= r.start && currentDay <= r.end);
                select.value = defaultIdx >= 0 ? defaultIdx : phaseData.ranges.length - 1;
            }
        } else {
            select.innerHTML = '<option value="0">No weeks available</option>';
            select.value = '0';
            // Ensure the select control is enabled and visually wide enough
            select.disabled = false;
            try { select.style.minWidth = '220px'; select.style.zIndex = '9999'; } catch (e) { }
        }
        // Persist selection whenever changed
        select.onchange = () => {
            localStorage.setItem('selectedContestRange', select.value);
            updateContestSetupInfo();
        };
    }

    // Selected range index (default: the one that contains currentDay or the last passed)
    let selectedIdx = 0;
    if (select) selectedIdx = parseInt(select.value || '0');

    let currentRange = phaseData.ranges.find(r => currentDay >= r.start && currentDay <= r.end);
    if (!currentRange) {
        if (currentDay > phaseData.ranges[phaseData.ranges.length - 1].end)
            currentRange = phaseData.ranges[phaseData.ranges.length - 1];
        else
            currentRange = phaseData.ranges[0];
    }

    // If the selector exists and has a user choice, use that range
    if (select && !Number.isNaN(selectedIdx) && phaseData.ranges[selectedIdx]) {
        currentRange = phaseData.ranges[selectedIdx];
    }

    const relevantProblems = currentRange.problems;
    const solvedInWeek = relevantProblems.filter(p => {
        const pid = normalizePid(p);
        return pid && state.solvedProblems.has(pid);
    }).length;

    const totalInWeek = relevantProblems.length;
    const progressPercent = totalInWeek > 0 ? Math.floor((solvedInWeek / totalInWeek) * 100) : 100;
    // Allow starting a contest if: user completed >=90% of that week's problems OR
    // the selected week is already past (user missed it and wants to give it later).
    const isPastWeek = currentDay > currentRange.end;
    const canStart = progressPercent >= 90 || isPastWeek;

    // Topics from this range only
    let topics = currentRange.title;
    if (topics.includes(':')) topics = topics.split(':')[1].trim();

    const infoDiv = document.querySelector('.contest-info');
    if (infoDiv) {
        infoDiv.innerHTML = `
            <h4>Ready for your ${currentRange.title.split(':')[0]} challenge?</h4>
            <p>Evaluating skills in: <strong>${topics}</strong></p>
            <ul class="contest-specs">
                <li>⏱️ Duration: 2 Hours</li>
                <li>📝 Problems: 4 (Based on this week's topics)</li>
                <li>🏷️ Focus: ${topics}</li>
                <li>📊 Weekly Progress: ${solvedInWeek}/${totalInWeek} (${progressPercent}%)</li>
            </ul>
            ${!canStart ? `<p class="error-text" style="color:var(--red);margin-top:10px;">🔒 Complete at least 90% of this week's problems to unlock!</p>` : ''}
        `;
    }

    const btn = document.querySelector('.start-contest-btn');
    if (btn) {
        btn.disabled = !canStart;
        btn.title = canStart ? "Start the contest" : "Complete your weekly tasks first!";
        btn.style.opacity = canStart ? "1" : "0.5";
        btn.style.cursor = canStart ? "pointer" : "not-allowed";
    }
}

async function startWeeklyContest() {
    const btn = document.querySelector('.start-contest-btn');
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Generating Contest...';
    }

    const duration = 2 * 60 * 60 * 1000; // 2 hours
    const endTime = Date.now() + duration;

    try {
        // Determine selected range (if provided)
        const phaseData = SCHEDULE_DATA.find(p => p.phase === currentPhase);
        let selectedRange = null;
        const select = document.getElementById('contest-range-select');
        if (select) {
            const idx = parseInt(select.value || '0');
            selectedRange = phaseData && phaseData.ranges && phaseData.ranges[idx] ? phaseData.ranges[idx] : null;
        }

        const problems = await fetchContestProblems(selectedRange);

        const contestState = {
            startTime: Date.now(),
            endTime: endTime,
            problems: problems,
            solved: [],
            isFinished: false
        };

        localStorage.setItem('activeContest', JSON.stringify(contestState));
        renderContests();

    } catch (e) {
        showToast('Failed to generate contest: ' + e.message, 'error');
        if (btn) {
            btn.disabled = false;
            updateContestSetupInfo();
            btn.textContent = 'Start Contest';
        }
    }
}

async function fetchContestProblems() {
    // Accept optional selectedRange parameter by checking arguments
    const phaseData = SCHEDULE_DATA.find(p => p.phase === currentPhase);
    let selectedRange = arguments.length > 0 ? arguments[0] : null;
    // Determine current range if none provided
    if (!selectedRange) {
        const currentDay = calculateProgressDay();
        selectedRange = phaseData.ranges.find(r => currentDay >= r.start && currentDay <= r.end);
        if (!selectedRange) {
            if (currentDay > phaseData.ranges[phaseData.ranges.length - 1].end)
                selectedRange = phaseData.ranges[phaseData.ranges.length - 1];
            else
                selectedRange = phaseData.ranges[0];
        }
    }

    const tagMap = {
        'Math': 'math',
        'Number': 'number theory',
        'Binary': 'binary search',
        'Two': 'two pointers',
        'Constructive': 'constructive algorithms',
        'Greedy': 'greedy',
        'Sorting': 'sortings',
        'DP': 'dp',
        'Graph': 'graphs',
        'Trees': 'trees',
        'Strings': 'strings',
        'Data': 'data structures',
        'Brute': 'brute force'
    };

    let tags = [];
    // Only use topics from THIS range
    for (const [key, tag] of Object.entries(tagMap)) {
        if (selectedRange.title.includes(key)) tags.push(tag);
    }

    // Fallback if title doesn't map well or no tags found
    if (tags.length === 0) tags = ['implementation', 'math'];
    tags = [...new Set(tags)];

    const response = await fetch('https://codeforces.com/api/problemset.problems?tags=' + tags.join(';'));
    const data = await response.json();

    if (data.status !== 'OK') throw new Error('CF API Error');

    let allProblems = data.result.problems.filter(p => !p.tags.includes('*special'));

    // Strict Filtering
    allProblems = allProblems.filter(p => p.tags.some(t => tags.includes(t)));

    // Use consistent PID format ("contestId-index") for solved filter
    const solvedIds = new Set([...state.solvedProblems.keys()]);
    allProblems = allProblems.filter(p => !solvedIds.has(normalizePid(p)));

    const userRating = state.userInfo.rating || 800;

    const p1 = getRandomProblem(allProblems, userRating);
    const p2 = getRandomProblem(allProblems, userRating + 100);
    const p3 = getRandomProblem(allProblems, userRating + 150);

    // Boss Problem: Force +200 to +300 (Out of Comfort Zone)
    let p4 = getRandomProblem(allProblems, userRating + 200);
    if (!p4) p4 = getRandomProblem(allProblems, userRating + 150);

    const finalProblems = [p1, p2, p3, p4].filter(p => p);

    // NOTE: We deliberately do NOT use schedule problems for contests.
    // Schedule problems are for daily practice; using them in contests
    // causes them to show as pre-solved since the user already completed them.

    while (finalProblems.length < 4) {
        // Fill gaps if strictly rated problems missing
        let p = getRandomProblem(allProblems, userRating + Math.floor(Math.random() * 300));
        if (!p) p = allProblems[Math.floor(Math.random() * allProblems.length)];

        if (p && !finalProblems.some(fp => fp.contestId === p.contestId && fp.index === p.index)) {
            finalProblems.push(p);
        } else if (!p) {
            break;
        }
    }

    return finalProblems;
}

function getRandomProblem(list, rating) {
    let candidates = list.filter(p => p.rating === rating);
    if (candidates.length === 0) {
        candidates = list.filter(p => p.rating >= rating - 100 && p.rating <= rating + 100);
    }
    if (candidates.length === 0) return null;
    return candidates[Math.floor(Math.random() * candidates.length)];
}

function restoreContest(contestState) {
    const problemsDiv = document.getElementById('contest-problems-list');

    problemsDiv.innerHTML = contestState.problems.map((p, i) => {
        const pid = normalizePid(p);
        const isSolved = pid && contestState.solved.includes(pid);
        const letter = String.fromCharCode(65 + i);
        const isBlind = state.blindMode;
        return `
            <div class=\"contest-problem-card ${isSolved ? 'solved' : ''} ${isBlind ? 'blind-active' : ''}\" id=\"cp-${pid}\"> 
                <span class=\"prob-letter\">${letter}</span>
                <h4><a href=\"https://codeforces.com/problemset/problem/${p.contestId}/${p.index}\" target=\"_blank\">${p.name}</a></h4>
                <div class=\"rating-badge rating-cell\" style=\"display:inline-block;background:var(--bg-primary);\">${p.rating || '?'}</div>
                <div class=\"cp-tags tag-cell\">
                    ${(p.tags || []).slice(0, 3).map(t => `<span class=\"cp-tag\">${t}</span>`).join('')}
                </div>
            </div>
        `;
    }).join('');

    const statusBadge = document.getElementById('contest-status');
    const timerEl = document.getElementById('contest-timer');
    const giveUpBtn = document.querySelector('.give-up-btn');

    // UPSOLVE MODE UI
    if (contestState.isFinished) {
        if (statusBadge) {
            statusBadge.textContent = 'UPSOLVE MODE';
            statusBadge.className = 'status-badge finished';
            statusBadge.style.background = 'rgba(99, 102, 241, 0.15)';
            statusBadge.style.color = 'var(--accent)';
            statusBadge.style.animation = 'none';
        }
        if (timerEl) timerEl.textContent = "00:00:00";
        if (giveUpBtn) {
            giveUpBtn.textContent = 'Exit Contest';
            giveUpBtn.onclick = () => {
                // Require teach-back for missed problems or confirm exit
                const unsolved = contestState.problems.filter(p => {
                    const pid = normalizePid(p);
                    return pid && !contestState.solved.includes(pid);
                });
                const missing = unsolved.filter(p => !state.solutionLogs[normalizePid(p)]).length;
                if (missing > 0) {
                    if (!confirm(`You have ${missing} missed problems without teach-back. Are you sure you want to exit?`)) return;
                }
                localStorage.removeItem('activeContest');
                renderContests();
            };
        }

        checkContestSubmissions();
        if (submissionCheckInterval) clearInterval(submissionCheckInterval);
        submissionCheckInterval = setInterval(checkContestSubmissions, 30000);
        return;
    }

    // Normal Mode
    if (giveUpBtn) {
        giveUpBtn.textContent = 'Finish Early';
        giveUpBtn.onclick = () => endContest();
    }

    if (contestInterval) clearInterval(contestInterval);
    contestInterval = setInterval(() => {
        const now = Date.now();
        const diff = contestState.endTime - now;

        if (diff <= 0) {
            endContest(true);
            return;
        }

        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        if (timerEl) timerEl.textContent =
            `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);

    if (statusBadge) {
        statusBadge.textContent = 'RUNNING';
        statusBadge.className = 'status-badge running';
    }

    checkContestSubmissions();
    if (submissionCheckInterval) clearInterval(submissionCheckInterval);
    submissionCheckInterval = setInterval(checkContestSubmissions, 30000);
}

async function checkContestSubmissions() {
    const activeContest = JSON.parse(localStorage.getItem('activeContest'));
    if (!activeContest) return;

    try {
        const handle = localStorage.getItem('cf_handle');
        const res = await fetch(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=20`);
        const data = await res.json();

        if (data.status === 'OK') {
            let newSolved = false;

            data.result.forEach(sub => {
                const pid = normalizePid(sub.problem);
                if (pid && activeContest.problems.some(p => normalizePid(p) === pid) &&
                    sub.verdict === 'OK' &&
                    !activeContest.solved.includes(pid)) {

                    activeContest.solved.push(pid);
                    newSolved = true;

                    const card = document.getElementById(`cp-${pid}`);
                    if (card) card.classList.add('solved');
                }
            });

            if (newSolved) {
                localStorage.setItem('activeContest', JSON.stringify(activeContest));
                // Refresh local solved state so dashboard/streak/calendar reflect new solves
                try {
                    const fullSubs = await fetchSubmissions(handle);
                    await updateFromSubmissions(fullSubs);
                } catch (e) {
                    console.warn('Failed to refresh submissions after new solves', e);
                }

                if (!activeContest.isFinished && activeContest.solved.length === activeContest.problems.length) {
                    endContest(false, true);
                }
            }
        }
    } catch (e) {
        console.error("Submission check failed", e);
    }
}

async function endContest(timeUp = false, allSolved = false) {
    if (contestInterval) clearInterval(contestInterval);
    if (submissionCheckInterval) clearInterval(submissionCheckInterval);

    if (!timeUp && !allSolved && !confirm("Finish contest and switch to Upsolve Mode?")) {
        const activeContest = JSON.parse(localStorage.getItem('activeContest'));
        if (activeContest) restoreContest(activeContest);
        return;
    }

    const activeContest = JSON.parse(localStorage.getItem('activeContest'));
    if (activeContest) {
        // SAVE TO HISTORY
        // Build a safe rating string: prefer numeric ratings, fallback to problem IDs or '—'
        const probRatings = (activeContest.problems || []).map(p => {
            const r = Number(p && p.rating);
            return Number.isFinite(r) ? r : null;
        }).filter(x => x !== null);

        let ratingStr = '—';
        if (probRatings.length > 0) {
            const mn = Math.min(...probRatings);
            const mx = Math.max(...probRatings);
            ratingStr = mn === mx ? `${mn}` : `${mn}-${mx}`;
        } else {
            // Fallback to problem identifiers (pid) or names
            const ids = (activeContest.problems || []).map(p => normalizePid(p) || (p && p.name) || '').filter(Boolean);
            ratingStr = ids.length > 0 ? ids.join(', ') : '—';
        }

        const historyItem = {
            date: activeContest.startTime,
            score: activeContest.solved.length,
            total: activeContest.problems.length,
            ratingStr,
            // Store problems so explainHistoryRating() can recompute later
            problems: activeContest.problems
        };

        // Compute contest rating and store a detailed breakdown for debugging/explainability
        try {
            const handle = localStorage.getItem('cf_handle') || state.handle;
            const allSubs = await fetchSubmissions(handle);
            const res = computeContestRating(activeContest, allSubs);
            // `res` now contains {rating, breakdown}
            historyItem.ratingVal = res && res.rating ? res.rating : null;
            historyItem.ratingBreakdown = res && res.breakdown ? res.breakdown : null;

            // Persist local contest ratings for the sparkline
            state.localContestRatings = state.localContestRatings || [];
            if (historyItem.ratingVal) state.localContestRatings.unshift(historyItem.ratingVal);
            // Keep last 50
            if (state.localContestRatings.length > 50) state.localContestRatings.length = 50;
            localStorage.setItem('localContestRatings', JSON.stringify(state.localContestRatings));
            // Update weekly rating UI immediately
            try { renderWeeklyRatingGraph(); setText('weekly-rating', state.localContestRatings[0] ? String(state.localContestRatings[0]) : '—'); } catch (e) { }
        } catch (e) {
            console.warn('Failed to compute contest rating', e);
        }

        state.contestHistory.unshift(historyItem);
        localStorage.setItem('contestHistory', JSON.stringify(state.contestHistory));

        // Refresh dashboard stats so weekly rating and contest count reflect immediately
        try { renderDashboard(); } catch (e) { }

        // SAVE TO PRACTICE LIST (normalize IDs, dedupe)
        const unsolved = activeContest.problems.filter(p => {
            const pid = normalizePid(p);
            return pid && !activeContest.solved.includes(pid);
        });
        let addedCount = 0;
        unsolved.forEach(p => {
            const pid = normalizePid(p);
            if (!pid) return;
            // Check if already in practice list or solved
            if (!state.practiceList.some(pp => normalizePid(pp) === pid) &&
                !state.solvedProblems.has(pid)) {
                state.practiceList.push(p);
                addedCount++;
            }
        });
        if (addedCount > 0) {
            localStorage.setItem('practiceList', JSON.stringify(state.practiceList));
            showToast(`Added ${addedCount} unsolved problems to your Practice List!`, 'info');
        }

        activeContest.isFinished = true;
        localStorage.setItem('activeContest', JSON.stringify(activeContest));
        restoreContest(activeContest);
        renderContestHistory();
    } else {
        document.getElementById('active-contest').classList.add('hidden');
        document.getElementById('contest-setup').classList.remove('hidden');
    }

    if (allSolved) {
        showToast('Perfect score! You can now exit or review your solutions.', 'success', 5000);
    } else if (timeUp) {
        showToast("Time's up! Contest is over. Switching to Upsolve Mode.", 'warning', 5000);
    }
}

function renderContestHistory() {
    const list = document.getElementById('contest-history-list');
    if (!list) return;

    // Boss summary at top: how many high-rated problems you've already defeated.
    const boss = getBossStats();
    const bossHtml = `
        <div class="boss-summary">
            <span class="boss-title">Boss Problems</span>
            <span class="boss-body">
                Defeated ${boss.bossesDefeated} problem${boss.bossesDefeated === 1 ? '' : 's'} rated
                ≥ ${boss.bossThreshold}.
            </span>
        </div>
    `;

    if (state.contestHistory.length === 0) {
        list.innerHTML = bossHtml + '<p class="section-desc">No past contests yet.</p>';
        return;
    }

    // Sanitize rating strings and migrate any legacy 'null-null' entries
    let migrated = false;
    const itemsHtml = state.contestHistory.map((c, idx) => {
        const date = new Date(c.date).toLocaleDateString();
        const percent = Math.round((c.score / c.total) * 100);
        let statusClass = 'pending';
        if (percent === 100) statusClass = 'done';

        // Determine displayable rating: prefer a clean ratingStr, else fallback to ratingVal
        let ratingDisplay = '—';
        if (c.ratingStr && !/null/i.test(String(c.ratingStr)) && String(c.ratingStr).trim() !== '—') {
            ratingDisplay = c.ratingStr;
        } else if (c.ratingVal) {
            ratingDisplay = String(c.ratingVal);
        }

        // If the stored ratingStr contained 'null' but we can recover from ratingVal, migrate it
        if (c.ratingStr && /null/i.test(String(c.ratingStr)) && c.ratingVal) {
            c.ratingStr = String(c.ratingVal);
            migrated = true;
        }

        const breakdownHtml = c.ratingBreakdown ? `
            <details style="margin-top:8px;color:var(--text-secondary);font-size:13px">
                <summary style="cursor:pointer;color:var(--text-primary);font-weight:600">Explain rating</summary>
                <div style="padding:8px 6px">
                    <div>Solved: <strong>${c.ratingBreakdown.solved}</strong> / ${c.ratingBreakdown.total}</div>
                    <div>Wrong attempts: <strong>${c.ratingBreakdown.wrongAttempts}</strong></div>
                    <div>Performance rating: <strong>${c.ratingBreakdown.performanceRating || c.ratingBreakdown.base || '—'}</strong></div>
                    <div>Fraction bonus: <strong>${c.ratingBreakdown.fractionBonus}</strong></div>
                    <div>Perfect bonus: <strong>${c.ratingBreakdown.perfectBonus}</strong></div>
                    <div>Wrong penalty: <strong>-${c.ratingBreakdown.wrongPenalty}</strong></div>
                    <div style="margin-top:6px">Raw rating: <strong>${c.ratingBreakdown.rawRating}</strong></div>
                    <div>Final (clamped): <strong>${c.ratingBreakdown.final}</strong></div>
                </div>
            </details>
        ` : '';

        return `
        <div class="cal-prob-item">
            <div style="display:flex;flex-direction:column;">
                <span style="font-weight:700">Mock Contest (${ratingDisplay})</span>
                <span style="font-size:12px;color:var(--text-muted)">${date}</span>
                ${breakdownHtml}
                <div style="margin-top:6px">
                    <button class="small-link" onclick="explainHistoryRating(${idx})">Explain rating</button>
                </div>
            </div>
            <div style="text-align:right;">
                <span class="cal-status ${statusClass}">${c.score}/${c.total} Solved</span>
            </div>
        </div>`;
    }).join('');

    // Persist any migrations back to localStorage so the UI stays clean
    if (migrated) {
        localStorage.setItem('contestHistory', JSON.stringify(state.contestHistory));
    }

    list.innerHTML = bossHtml + itemsHtml;
}

async function explainHistoryRating(index) {
    const history = state.contestHistory || [];
    if (!history[index]) return;
    const item = history[index];
    try {
        const handle = localStorage.getItem('cf_handle') || state.handle;
        const allSubs = await fetchSubmissions(handle);
        const res = computeContestRating({
            startTime: item.date,
            endTime: item.date + 2 * 60 * 60 * 1000,
            problems: item.problems || []
        }, allSubs);
        // If computeContestRating returns object-like result
        if (res && typeof res === 'object' && res.rating) {
            item.ratingVal = res.rating;
            item.ratingBreakdown = res.breakdown || null;
        } else if (typeof res === 'number') {
            item.ratingVal = res;
        }
        // Persist and re-render
        state.contestHistory[index] = item;
        localStorage.setItem('contestHistory', JSON.stringify(state.contestHistory));
        renderContestHistory();
    } catch (e) {
        console.warn('Explain rating failed', e);
        showToast('Failed to compute explanation. Check console for details.', 'error');
    }
}

// Compute contest rating from contest state and submissions.
// Uses difficulty-weighted scoring: each solved problem earns points
// proportional to its rating, with penalties for wrong attempts.
function computeContestRating(contestState, submissions) {
    // contestState.startTime/endTime are in ms
    const startS = Math.floor(contestState.startTime / 1000);
    const endS = Math.floor(contestState.endTime / 1000) || Math.floor((contestState.startTime + 2 * 60 * 60 * 1000) / 1000);

    const probs = (contestState.problems || []).map(p => normalizePid(p)).filter(Boolean);

    // FIX: Return default rating instead of null for empty contests
    if (probs.length === 0) {
        return {
            rating: 800,
            breakdown: {
                solved: 0,
                total: 0,
                solvedFraction: 0,
                wrongAttempts: 0,
                performanceRating: 800,
                fractionBonus: 0,
                perfectBonus: 0,
                wrongPenalty: 0,
                rawRating: 800,
                final: 800
            }
        };
    }

    // Build a map of problem pid -> rating for weighting
    const probRatingMap = {};
    for (const p of contestState.problems) {
        const pid = normalizePid(p);
        if (pid) probRatingMap[pid] = Number(p.rating) || 800;
    }

    // Filter submissions within contest window and for contest problems
    const probSet = new Set(probs);
    const relSubs = submissions.filter(s =>
        s.creationTimeSeconds >= startS &&
        s.creationTimeSeconds <= endS &&
        probSet.has(normalizePid(s.problem))
    );

    // Count solves and wrong attempts per problem
    const solvedSet = new Set();
    let wrongAttempts = 0;
    const byPid = {};
    for (const s of relSubs) {
        const pid = normalizePid(s.problem);
        if (!pid) continue;
        byPid[pid] = byPid[pid] || [];
        byPid[pid].push(s);
    }

    for (const pid of probs) {
        const list = (byPid[pid] || []).sort((a, b) => a.creationTimeSeconds - b.creationTimeSeconds);
        for (const sub of list) {
            if (sub.verdict === 'OK') { solvedSet.add(pid); break; }
            if (sub.verdict && sub.verdict !== 'TESTING') wrongAttempts++;
        }
    }

    const solved = solvedSet.size;
    const total = probs.length;

    // --- Difficulty-weighted rating ---
    // Collect ratings of contest problems
    const allRatings = probs.map(pid => probRatingMap[pid] || 800);
    const solvedRatings = [...solvedSet].map(pid => probRatingMap[pid] || 800);

    // Weighted average: what rating level did the user perform at?
    // If they solved nothing, their performance is well below the easiest problem.
    let performanceRating;
    if (solved === 0) {
        // FIX: Clamp to prevent negative values (minimum 400)
        performanceRating = Math.max(400, Math.min(...allRatings) - 200);
    } else if (solved === total) {
        // Solved everything — performance is above the hardest problem
        performanceRating = Math.max(...solvedRatings) + 100;
    } else {
        // Weighted average of solved problem ratings, with a small bonus
        // for solving harder ones
        const avgSolved = solvedRatings.reduce((a, b) => a + b, 0) / solvedRatings.length;
        const maxSolved = Math.max(...solvedRatings);
        performanceRating = Math.round(avgSolved * 0.7 + maxSolved * 0.3);
    }

    // FIX: Ensure performance rating is always clamped
    performanceRating = Math.max(400, Math.min(3500, performanceRating));

    // Penalty for wrong attempts (each wrong attempt lowers rating by 10)
    const wrongPenalty = wrongAttempts * 10;
    // Bonus for solving all problems
    const perfectBonus = solved === total ? 50 : 0;
    // Fraction bonus (partial credit)
    const solvedFraction = total ? (solved / total) : 0;
    const fractionBonus = Math.round(solvedFraction * 50);

    const rawRating = performanceRating + fractionBonus - wrongPenalty + perfectBonus;
    const clamped = Math.round(Math.max(400, Math.min(3500, rawRating)));

    return {
        rating: clamped,
        breakdown: {
            solved,
            total,
            solvedFraction: Number(solvedFraction.toFixed(3)),
            wrongAttempts,
            performanceRating,
            fractionBonus,
            perfectBonus,
            wrongPenalty,
            rawRating: Math.round(rawRating),
            final: clamped
        }
    };
}

function renderWeeklyRatingGraph() {
    const container = document.getElementById('weekly-rating-graph');
    if (!container) return;
    const arr = state.localContestRatings || [];
    if (arr.length === 0) { container.innerHTML = ''; return; }

    // Draw a simple inline SVG sparkline (width 180 x height 28)
    const w = 180, h = 28, padding = 4;
    const max = Math.max(...arr), min = Math.min(...arr);
    const range = Math.max(1, max - min);

    const points = arr.map((v, i) => {
        const x = padding + (i / Math.max(1, arr.length - 1)) * (w - padding * 2);
        const y = padding + (1 - (v - min) / range) * (h - padding * 2);
        return `${x},${y}`;
    }).reverse(); // reverse so most recent is on the left

    const svg = `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">
        <polyline fill="none" stroke="#6366f1" stroke-width="2" points="${points.join(' ')}" stroke-linejoin="round" stroke-linecap="round" />
    </svg>`;
    container.innerHTML = svg;
}

// ===== Teach Back System =====
let currentLogPid = null;

function openSolutionLog(pid) {
    currentLogPid = pid;
    const modal = document.getElementById('teach-back-modal');
    if (modal) modal.classList.remove('hidden');

    const saved = state.solutionLogs[pid] || '';
    const txt = document.getElementById('teach-back-text');
    if (txt) txt.value = saved;
    const lbl = document.getElementById('teach-back-pid');
    if (lbl) lbl.textContent = pid;
}

function saveSolutionLog() {
    if (!currentLogPid) return;

    const text = document.getElementById('teach-back-text').value.trim();
    state.solutionLogs[currentLogPid] = text;
    localStorage.setItem('solutionLogs', JSON.stringify(state.solutionLogs));

    // Award XP for teach-back explanation (only once per problem)
    if (text.length > 0 && !state.teachBackXpAwarded.has(currentLogPid)) {
        const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
        let xpBonus = 0;

        // 50+ words = mini-blog quality (+50 XP), else +10 XP
        if (wordCount >= 50) {
            xpBonus = 50;
        } else if (wordCount >= 10) {
            xpBonus = 10;
        }

        if (xpBonus > 0) {
            state.totalXP = (state.totalXP || 0) + xpBonus;
            state.teachBackXpAwarded.add(currentLogPid);
            localStorage.setItem('teachBackXpAwarded', JSON.stringify([...state.teachBackXpAwarded]));
            showToast(`Explanation saved! +${xpBonus} XP for teaching back!`, 'success');
            renderDashboard(); // Update XP display
        } else {
            showToast('Explanation saved! Add more detail (10+ words) to earn XP.', 'info');
        }
    } else if (state.teachBackXpAwarded.has(currentLogPid)) {
        showToast('Explanation updated! (XP already awarded)', 'info');
    } else {
        showToast('Explanation saved!', 'info');
    }

    closeSolutionLog();
    // Update UI if needed
    const btn = document.querySelector(`button[onclick="openSolutionLog('${currentLogPid}')"]`);
    if (btn) btn.innerHTML = '📜'; // Change icon to scroll
}

function closeSolutionLog() {
    const modal = document.getElementById('teach-back-modal');
    if (modal) modal.classList.add('hidden');
    currentLogPid = null;
}

// ==========================================
// Tag Analysis System
// ==========================================

// Target solve counts for proficiency calculation per tag
const TAG_TARGETS = {
    'implementation': 30,
    'math': 25,
    'greedy': 20,
    'dp': 20,
    'data structures': 15,
    'brute force': 20,
    'constructive algorithms': 15,
    'sortings': 15,
    'binary search': 12,
    'graphs': 15,
    'strings': 15,
    'number theory': 12,
    'two pointers': 10,
    'dfs and similar': 10,
    'bitmasks': 8,
    'trees': 10,
    'combinatorics': 10,
    'geometry': 8,
    'games': 6,
    'probabilities': 6
};

// Default target for tags not in the list
const DEFAULT_TAG_TARGET = 10;

function calculateTagProficiency() {
    const proficiency = {};
    const tagCounts = state.tagCounts || {};

    for (const [tag, count] of Object.entries(tagCounts)) {
        const target = TAG_TARGETS[tag] || DEFAULT_TAG_TARGET;
        const percentage = Math.min(100, Math.round((count / target) * 100));

        let level = 'weak';
        if (percentage >= 70) level = 'strong';
        else if (percentage >= 30) level = 'developing';

        proficiency[tag] = {
            solved: count,
            target: target,
            percentage: percentage,
            level: level
        };
    }

    return proficiency;
}

function renderTagAnalysis() {
    const proficiency = calculateTagProficiency();

    // Count tags by level
    let strongCount = 0, developingCount = 0, weakCount = 0;
    const sortedTags = Object.entries(proficiency).sort((a, b) => b[1].solved - a[1].solved);

    for (const [tag, data] of sortedTags) {
        if (data.level === 'strong') strongCount++;
        else if (data.level === 'developing') developingCount++;
        else weakCount++;
    }

    // Update summary cards
    setText('strong-tags-count', strongCount);
    setText('developing-tags-count', developingCount);
    setText('weak-tags-count', weakCount);

    // Render recommendations (top 3 weakest tags with problems to solve)
    const weakTags = sortedTags
        .filter(([, data]) => data.level === 'weak' || data.level === 'developing')
        .sort((a, b) => a[1].percentage - b[1].percentage)
        .slice(0, 3);

    const recList = document.getElementById('tag-recommendations-list');
    if (recList) {
        if (weakTags.length === 0) {
            recList.innerHTML = '<p style="color: var(--green); padding: 12px;">Great job! No weak tags identified. Keep practicing to maintain your skills.</p>';
        } else {
            recList.innerHTML = weakTags.map(([tag, data]) => {
                const needed = data.target - data.solved;
                return `
                    <div class="recommendation-item">
                        <div>
                            <span class="rec-tag">${tag}</span>
                            <span style="margin-left: 10px; color: var(--text-secondary); font-size: 13px;">
                                ${data.solved}/${data.target} solved (${data.percentage}%)
                            </span>
                        </div>
                        <span class="rec-difficulty ${data.level}">
                            Needs ${needed} more
                        </span>
                    </div>
                `;
            }).join('');
        }
    }

    // Render all tags grid
    const grid = document.getElementById('tag-details-grid');
    if (grid) {
        if (sortedTags.length === 0) {
            grid.innerHTML = '<p style="color: var(--text-secondary);">Solve some problems to see your tag breakdown.</p>';
        } else {
            grid.innerHTML = sortedTags.map(([tag, data]) => `
                <div class="tag-detail-card">
                    <div class="tag-name">
                        <span>${tag}</span>
                        <span class="tag-count">${data.solved}/${data.target}</span>
                    </div>
                    <div class="tag-progress-bar">
                        <div class="tag-progress-fill ${data.level}" style="width: ${data.percentage}%"></div>
                    </div>
                    <div style="margin-top: 8px; font-size: 12px; color: var(--text-secondary);">
                        ${data.percentage}% proficiency
                        ${data.level === 'strong' ? '✅' : data.level === 'developing' ? '🔄' : '⚠️'}
                    </div>
                </div>
            `).join('');
        }
    }

    // Store proficiency in state
    state.tagProficiency = proficiency;
}

// ==========================================
// Weekly Review System
// ==========================================

function checkWeeklyReview() {
    const lastReview = state.lastReviewDate || 0;
    const now = Date.now();
    const daysSince = (now - lastReview) / (1000 * 60 * 60 * 24);

    if (daysSince >= 7) {
        // Show weekly review prompt after a short delay
        setTimeout(() => {
            showWeeklyReviewModal();
        }, 2000);
    }
}

function getWeeklyStats() {
    const weekAgo = Date.now() / 1000 - 7 * 24 * 60 * 60;
    let solved = 0, xp = 0;

    for (const [, p] of state.solvedProblems) {
        if (p.time >= weekAgo) {
            solved++;
            const bucket = Math.min(Math.floor((p.rating || 800) / 100) * 100, 2500);
            xp += XP_TABLE[bucket] || 10;
        }
    }

    return { solved, xp, streak: state.streak || 0 };
}

function showWeeklyReviewModal() {
    const stats = getWeeklyStats();

    // Create modal dynamically
    const existingModal = document.getElementById('weekly-review-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'weekly-review-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content weekly-review-modal">
            <span class="close-modal" onclick="dismissWeeklyReview()">×</span>
            <h3>📊 Weekly Review Time!</h3>
            <p style="color: var(--text-secondary); margin-bottom: 16px;">It's been a week. Take 5 minutes to reflect on your progress.</p>
            
            <div class="review-stats">
                <div class="review-stat">
                    <div class="stat-value">${stats.solved}</div>
                    <div class="stat-label">Problems This Week</div>
                </div>
                <div class="review-stat">
                    <div class="stat-value">${stats.xp}</div>
                    <div class="stat-label">XP Earned</div>
                </div>
                <div class="review-stat">
                    <div class="stat-value">${stats.streak}</div>
                    <div class="stat-label">Current Streak</div>
                </div>
            </div>
            
            <div class="review-template">
                <h4 style="margin-bottom: 8px;">Reflection Questions</h4>
                <p style="font-size: 13px; color: var(--text-secondary);">What went well? What was hard? What's your focus for next week?</p>
                <textarea id="weekly-reflection" placeholder="Write your reflection here..."></textarea>
            </div>
            
            <div class="modal-actions">
                <button onclick="dismissWeeklyReview()" style="background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-primary); padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Remind Me Tomorrow
                </button>
                <button onclick="saveWeeklyReview()" style="background: var(--accent); color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                    Save Review
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function saveWeeklyReview() {
    const reflection = document.getElementById('weekly-reflection')?.value || '';
    const stats = getWeeklyStats();

    // Load existing reviews
    let reviews = [];
    try {
        reviews = JSON.parse(localStorage.getItem('weeklyReviews') || '[]');
    } catch (e) {
        reviews = [];
    }

    // Add new review
    reviews.unshift({
        date: Date.now(),
        reflection: reflection,
        stats: stats
    });

    // Keep last 12 reviews
    if (reviews.length > 12) reviews.length = 12;

    localStorage.setItem('weeklyReviews', JSON.stringify(reviews));
    localStorage.setItem('lastReviewDate', Date.now().toString());
    state.lastReviewDate = Date.now();

    // Close modal
    const modal = document.getElementById('weekly-review-modal');
    if (modal) modal.remove();

    showToast('Review saved! Keep up the consistency.', 'success');
}

function dismissWeeklyReview() {
    // Set last review to 6 days ago so it prompts again tomorrow
    const sixDaysAgo = Date.now() - 6 * 24 * 60 * 60 * 1000;
    localStorage.setItem('lastReviewDate', sixDaysAgo.toString());
    state.lastReviewDate = sixDaysAgo;

    const modal = document.getElementById('weekly-review-modal');
    if (modal) modal.remove();
}

// Study Material Reader Functions


// ==========================================
// Study Material Reader Functions
// ==========================================

let studyReaderState = {
    currentFileId: null,
    history: [],
    bookmarks: new Set(),
    currentView: 'browse'
};

// Initialize study material system
function initializeStudyMaterial() {
    console.log('Initializing study material reader...');
    loadStudyBookmarks();
    loadStudyHistory();
    renderStudyCategoryGrid();
    renderRecentFiles();
    setupStudySearch();
}

// Render category grid
function renderStudyCategoryGrid() {
    const container = document.getElementById('category-grid');
    if (!container) return;

    container.innerHTML = '';

    STUDY_MATERIAL_CATALOG.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';

        let filesHtml = '';
        category.files.forEach(file => {
            filesHtml += `
                <li>
                    <a href="#" class="quick-file-link" onclick="loadStudyFile('${file.id}'); return false;">
                        <span>${file.title}</span>
                    </a>
                    <span class="file-meta">${file.type}</span>
                </li>
            `;
        });

        card.innerHTML = `
            <div class="category-header">
                <h2>${category.icon} ${category.category}</h2>
            </div>
            <div class="category-content">
                <ul>${filesHtml}</ul>
            </div>
        `;

        container.appendChild(card);
    });
}

// Load and display a study file
async function loadStudyFile(fileId) {
    console.log('Loading file:', fileId);

    // Show reader view
    showStudyView('reader');

    // Find file info
    const fileEntry = findStudyFileById(fileId);
    if (!fileEntry) {
        showError('File not found');
        return;
    }

    // Show loading state
    const contentEl = document.getElementById('reader-content');
    if (contentEl) {
        contentEl.innerHTML = '<div class="loading-container"><div class="loading-spinner"></div><span>Loading content...</span></div>';
    }

    try {
        // Fetch file content directly (static file — no backend API needed)
        const url = encodeURI(`/${fileEntry.file}`);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const markdown = await response.text();
        const htmlContent = simpleMarkdownToHTML(markdown);

        // Update header
        const titleEl = document.getElementById('reader-file-title');
        const iconEl = document.getElementById('reader-icon');
        if (titleEl) titleEl.textContent = fileEntry.title;
        if (iconEl) iconEl.textContent = fileEntry.icon || '���';

        // Update bookmark button
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (bookmarkBtn) {
            const isBookmarked = studyReaderState.bookmarks.has(fileId);
            bookmarkBtn.className = `reader-btn btn-bookmark${isBookmarked ? ' active' : ''}`;
            bookmarkBtn.innerHTML = isBookmarked ?
                '<span>⭐</span> Bookmarked' :
                '<span>⭐</span> Bookmark';
        }

        // Display content
        if (contentEl) {
            contentEl.innerHTML = `<div class="markdown-content">${htmlContent}</div>`;
        }

        // Update state
        studyReaderState.currentFileId = fileId;
        addToStudyHistory(fileId);
        saveStudyHistory();

    } catch (error) {
        console.error('Failed to load file:', error);
        showError('Failed to load file: ' + error.message);
    }
}

// Find file by ID
function findStudyFileById(fileId) {
    for (const category of STUDY_MATERIAL_CATALOG) {
        const file = category.files.find(f => f.id === fileId);
        if (file) {
            return { ...file, icon: category.icon };
        }
    }
    return null;
}

// Simple markdown to HTML conversion
function simpleMarkdownToHTML(markdown) {
    if (!markdown) return '';

    let html = markdown;

    // 1. Extract fenced code blocks FIRST — before anything else touches the content.
    //    Without this, the paragraph/newline processing collapses multi-line code to one line.
    const codeBlocks = [];
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        const label = lang ? `<span class="code-lang">${lang}</span>` : '';
        codeBlocks.push(`<pre>${label}<code>${escaped}</code></pre>`);
        return `\n__CODE_${codeBlocks.length - 1}__\n`;
    });

    // 2. Inline code (single backtick) — after fenced blocks are safely extracted
    html = html.replace(/`([^`\n]+)`/g, (_, code) => {
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return `<code>${escaped}</code>`;
    });

    // 3. Headers
    html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');

    // 4. Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // 5. Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // 6. Lists (- and * bullets)
    html = html.replace(/^[\-\*] (.*$)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // 7. Horizontal rules
    html = html.replace(/^---$/gm, '<hr>');

    // 8. Tables — skip separator rows
    html = html.replace(/^\|(.+)\|$/gm, function (match, inner) {
        const cells = inner.split('|').map(c => c.trim()).filter(c => c !== '');
        if (cells.every(c => /^[\-:]+$/.test(c))) return ''; // separator row
        return `<tr>${cells.map(c => `<td>${c}</td>`).join('')}</tr>`;
    });
    html = html.replace(/(<tr>.*?<\/tr>\s*)+/g, (rows) => {
        const withHeader = rows.replace('<tr>', '<tr>').replace(/<td/g, (m, i) => i === 0 ? '<th' : m);
        // Promote first row's <td> to <th>
        const firstRow = rows.match(/<tr>(.*?)<\/tr>/);
        if (firstRow) {
            const headerRow = '<tr>' + firstRow[1].replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>') + '</tr>';
            const rest = rows.slice(firstRow[0].length);
            return `<table>${headerRow}${rest}</table>`;
        }
        return `<table>${rows}</table>`;
    });

    // 9. Paragraphs (blank lines → paragraph breaks)
    html = html.replace(/^\s*$/gm, '</p><p>');
    html = '<p>' + html + '</p>';
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>\s*<(h[1-6]|ul|ol|blockquote|hr|pre|table)/g, '<$1');
    html = html.replace(/<\/(h[1-6]|ul|ol|blockquote|hr|pre|table)>\s*<\/p>/g, '</$1>');

    // 10. Restore code blocks
    html = html.replace(/__CODE_(\d+)__/g, (_, id) => codeBlocks[id]);

    return html;
}

// Switch study view
function switchStudyView(view) {
    studyReaderState.currentView = view;

    // Update active tab buttons
    document.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');

    // Show selected view
    showStudyView(view);
}

// Show study view
function showStudyView(viewName) {
    document.querySelectorAll('.study-view').forEach(view => {
        view.style.display = 'none';
    });

    const view = document.getElementById(`${viewName}-view`);
    if (view) {
        view.style.display = 'block';
    }

    // Refresh dynamic content
    if (viewName === 'recent') {
        renderRecentFiles();
    } else if (viewName === 'bookmarks') {
        renderBookmarkedFiles();
    }
}

// Toggle fullscreen reading mode
function toggleStudyFullscreen() {
    const readerContainer = document.querySelector('.reader-container');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (readerContainer) {
        readerContainer.classList.toggle('study-fullscreen');

        if (readerContainer.classList.contains('study-fullscreen')) {
            fullscreenBtn.innerHTML = '<span>🗗</span> Exit Fullscreen';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            fullscreenBtn.innerHTML = '<span>⛶</span> Fullscreen';
            document.body.style.overflow = '';
        }
    }
}

// Render recent files
function renderRecentFiles() {
    const container = document.getElementById('recent-files-list');
    if (!container) return;

    if (studyReaderState.history.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">���</div>
                <h3 class="empty-title">No Recent Files</h3>
                <p class="empty-message">Start exploring the library to see your recently accessed materials here!</p>
            </div>
        `;
        return;
    }

    let html = '<ul>';
    const recentFiles = studyReaderState.history.slice(0, 10);
    recentFiles.forEach(fileId => {
        const file = findStudyFileById(fileId);
        if (file) {
            html += `
                <li>
                    <a href="#" class="quick-file-link" onclick="loadStudyFile('${fileId}'); return false;">
                        <span>${file.title}</span>
                    </a>
                    <span class="file-meta">${file.type}</span>
                </li>
            `;
        }
    });
    html += '</ul>';
    container.innerHTML = html;
}

// Render bookmarked files
function renderBookmarkedFiles() {
    const container = document.getElementById('bookmarked-files-list');
    if (!container) return;

    const bookmarkedFiles = Array.from(studyReaderState.bookmarks)
        .map(id => findStudyFileById(id))
        .filter(Boolean);

    if (bookmarkedFiles.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⭐</div>
                <h3 class="empty-title">No Bookmarks Yet</h3>
                <p class="empty-message">Start reading materials and bookmark your favorites to see them here!</p>
            </div>
        `;
        return;
    }

    let html = '<ul>';
    bookmarkedFiles.forEach(file => {
        html += `
            <li>
                <a href="#" class="quick-file-link" onclick="loadStudyFile('${file.id}'); return false;">
                    <span>${file.title}</span>
                </a>
                <span class="file-meta">${file.type}</span>
            </li>
        `;
    });
    html += '</ul>';
    container.innerHTML = html;
}

// Add to history
function addToStudyHistory(fileId) {
    // Remove if already in history
    studyReaderState.history = studyReaderState.history.filter(id => id !== fileId);
    // Add to beginning
    studyReaderState.history.unshift(fileId);
    // Keep only last 20
    if (studyReaderState.history.length > 20) {
        studyReaderState.history = studyReaderState.history.slice(0, 20);
    }
}

// Toggle bookmark
function toggleBookmark() {
    if (!studyReaderState.currentFileId) return;

    const fileId = studyReaderState.currentFileId;
    const isBookmarked = studyReaderState.bookmarks.has(fileId);

    if (isBookmarked) {
        studyReaderState.bookmarks.delete(fileId);
        showNotification('Removed from bookmarks', 'info');
    } else {
        studyReaderState.bookmarks.add(fileId);
        showNotification('Added to bookmarks!', 'success');
    }

    // Update button
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
        const nowBookmarked = !isBookmarked;
        bookmarkBtn.className = `reader-btn btn-bookmark${nowBookmarked ? ' active' : ''}`;
        bookmarkBtn.innerHTML = nowBookmarked ?
            '<span>⭐</span> Bookmarked' :
            '<span>⭐</span> Bookmark';
    }

    saveStudyBookmarks();

    // Refresh bookmarks view if needed
    if (studyReaderState.currentView === 'bookmarks') {
        renderBookmarkedFiles();
    }
}

// Close reader and return to library
function closeReader() {
    // Always clean up fullscreen state when leaving the reader.
    // If the user clicks "Back to Library" while in fullscreen, the body
    // overflow lock must be released or the entire page becomes unscrollable.
    const readerContainer = document.querySelector('.reader-container');
    if (readerContainer && readerContainer.classList.contains('study-fullscreen')) {
        readerContainer.classList.remove('study-fullscreen');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) fullscreenBtn.innerHTML = '<span>⛶</span> Fullscreen';
    }
    document.body.style.overflow = '';

    showStudyView(studyReaderState.currentView);
    studyReaderState.currentFileId = null;
}

// Setup search
function setupStudySearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// Perform search
function performSearch() {
    const query = document.getElementById('search-input')?.value.trim();
    if (!query) return;

    const results = searchStudyMaterials(query);
    const resultsContainer = document.getElementById('search-results');
    const resultsList = document.getElementById('search-results-list');

    if (!resultsContainer || !resultsList) return;

    if (results.length === 0) {
        resultsList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">���</div>
                <h3 class="empty-title">No Results Found</h3>
                <p class="empty-message">Try different keywords or browse the categories above.</p>
            </div>
        `;
    } else {
        let html = '<ul>';
        results.forEach(file => {
            html += `
                <li>
                    <a href="#" class="quick-file-link" onclick="loadStudyFile('${file.id}'); return false;">
                        <span>${file.icon} ${file.title}</span>
                    </a>
                    <span class="file-meta">${file.category}</span>
                </li>
            `;
        });
        html += '</ul>';
        resultsList.innerHTML = html;
    }

    resultsContainer.style.display = 'block';
}

// Search study materials
function searchStudyMaterials(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const category of STUDY_MATERIAL_CATALOG) {
        for (const file of category.files) {
            if (file.title.toLowerCase().includes(lowerQuery) ||
                file.file.toLowerCase().includes(lowerQuery)) {
                results.push({
                    ...file,
                    category: category.category,
                    icon: category.icon
                });
            }
        }
    }

    return results;
}

// Save/load bookmarks and history
function saveStudyBookmarks() {
    localStorage.setItem('studyBookmarks', JSON.stringify(Array.from(studyReaderState.bookmarks)));
}

function loadStudyBookmarks() {
    const saved = localStorage.getItem('studyBookmarks');
    if (saved) {
        try {
            const bookmarks = JSON.parse(saved);
            studyReaderState.bookmarks = new Set(bookmarks);
        } catch (e) {
            console.warn('Failed to load bookmarks:', e);
        }
    }
}

function saveStudyHistory() {
    localStorage.setItem('studyHistory', JSON.stringify(studyReaderState.history));
}

function loadStudyHistory() {
    const saved = localStorage.getItem('studyHistory');
    if (saved) {
        try {
            studyReaderState.history = JSON.parse(saved);
        } catch (e) {
            console.warn('Failed to load history:', e);
        }
    }
}

// Show error message
function showError(message) {
    const contentEl = document.getElementById('reader-content');
    if (contentEl) {
        contentEl.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">❌</div>
                <h3 class="empty-title">Error</h3>
                <p class="empty-message">${message}</p>
                <button class="search-btn" onclick="closeReader()" style="margin-top: 20px;">
                    <span>←</span> Back to Library
                </button>
            </div>
        `;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Simple alert for now - can be enhanced with better UI
    console.log(`[${type.toUpperCase()}] ${message}`);
    if (type === 'success') {
        alert('✅ ' + message);
    } else if (type === 'error') {
        alert('❌ ' + message);
    } else {
        alert('ℹ️ ' + message);
    }
}

// ==========================================
// Mastery Matrix Feature
// ==========================================

// Count solved problems for a given tag+rating bucket
function getMatrixCellData(tag, rating) {
    const problems = (MATRIX_PROBLEMS[tag] && MATRIX_PROBLEMS[tag][rating]) || [];
    let solved = 0;
    for (const prob of problems) {
        const nid = prob.id.replace(/\//g, '-');
        if (state.solvedProblems.has(nid)) solved++;
    }
    return { total: problems.length, solved, goal: Math.min(problems.length, MATRIX_CELL_GOAL) };
}

// Get heat class based on completion percentage
function getHeatClass(solved, goal, total) {
    if (total === 0) return 'heat-empty';
    if (solved === 0) return 'heat-none';
    const pct = goal > 0 ? solved / goal : 0;
    if (pct >= 1) return 'heat-complete';
    if (pct >= 0.7) return 'heat-high';
    if (pct >= 0.4) return 'heat-mid';
    return 'heat-low';
}

// Get overall matrix stats
function getMatrixStats() {
    let totalProblems = 0, totalSolved = 0, completedCells = 0, totalCells = 0;
    for (const tag of MATRIX_TAGS) {
        for (const rating of MATRIX_RATINGS) {
            const data = getMatrixCellData(tag, rating);
            if (data.total > 0) {
                totalCells++;
                totalProblems += data.total;
                totalSolved += data.solved;
                if (data.solved >= data.goal) completedCells++;
            }
        }
    }
    return { totalProblems, totalSolved, completedCells, totalCells };
}

// Render the full matrix table
function renderMasteryMatrix() {
    const table = document.getElementById('matrix-table');
    const statsRow = document.getElementById('matrix-stats-row');
    const detailPanel = document.getElementById('matrix-detail-panel');
    if (!table) return;

    // --- Stats ---
    const stats = getMatrixStats();
    if (statsRow) {
        const pct = stats.totalProblems > 0 ? Math.round((stats.totalSolved / stats.totalProblems) * 100) : 0;
        statsRow.innerHTML = `
            <div class="matrix-stat-card">
                <div class="matrix-stat-value">${stats.totalSolved}</div>
                <div class="matrix-stat-label">Problems Solved</div>
            </div>
            <div class="matrix-stat-card">
                <div class="matrix-stat-value">${stats.totalProblems}</div>
                <div class="matrix-stat-label">Total Problems</div>
            </div>
            <div class="matrix-stat-card">
                <div class="matrix-stat-value">${pct}%</div>
                <div class="matrix-stat-label">Overall Progress</div>
            </div>
            <div class="matrix-stat-card">
                <div class="matrix-stat-value">${stats.completedCells}/${stats.totalCells}</div>
                <div class="matrix-stat-label">Cells Mastered</div>
            </div>
        `;
    }

    // --- Table ---
    let html = '';

    // Group header row
    html += '<thead><tr class="matrix-group-header"><th></th>';
    for (const group of MATRIX_DIFFICULTY_GROUPS) {
        const cls = group.label.toLowerCase().replace('+', '').replace(' ', '');
        html += `<th colspan="${group.ratings.length}" class="group-${cls}">${group.icon} ${group.label}</th>`;
    }
    html += '</tr>';

    // Rating header row
    html += '<tr class="matrix-rating-header"><th>Tag \ Rating</th>';
    for (const rating of MATRIX_RATINGS) {
        html += `<th>${rating}</th>`;
    }
    html += '</tr></thead>';

    // Body rows (one per tag)
    html += '<tbody>';
    for (const tag of MATRIX_TAGS) {
        html += '<tr>';
        html += `<td class="matrix-tag-cell">${MATRIX_TAG_LABELS[tag] || tag}</td>`;
        for (const rating of MATRIX_RATINGS) {
            const data = getMatrixCellData(tag, rating);
            const heatClass = getHeatClass(data.solved, data.goal, data.total);
            const displayText = data.total > 0 ? `${data.solved}/${data.total}` : '—';
            const goalText = data.total > 0 ? `goal: ${data.goal}` : '';
            html += `<td class="matrix-cell ${heatClass}" onclick="openMatrixCell('${tag}', ${rating})">
                <div class="matrix-cell-inner">
                    <span class="cell-count">${displayText}</span>
                    <span class="cell-goal">${goalText}</span>
                </div>
            </td>`;
        }
        html += '</tr>';
    }
    html += '</tbody>';

    table.innerHTML = html;

    // Clear detail panel on re-render
    if (detailPanel) detailPanel.innerHTML = '';
}

// Open a specific cell's problem list
function openMatrixCell(tag, rating) {
    const panel = document.getElementById('matrix-detail-panel');
    if (!panel) return;

    const problems = (MATRIX_PROBLEMS[tag] && MATRIX_PROBLEMS[tag][rating]) || [];
    const tagLabel = MATRIX_TAG_LABELS[tag] || tag;

    if (problems.length === 0) {
        panel.innerHTML = `<div class="matrix-detail-panel">
            <div class="matrix-detail-header">
                <h4>${tagLabel} · ${rating}</h4>
                <button class="matrix-detail-close" onclick="closeMatrixDetail()">&times;</button>
            </div>
            <div class="matrix-detail-empty">
                <p>🌟 No curated problems yet for this cell.</p>
                <p style="font-size:12px;margin-top:8px">Try practicing on Codeforces with tag "${tag}" and rating ${rating}.</p>
            </div>
        </div>`;
        panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
    }

    const data = getMatrixCellData(tag, rating);
    const probsHTML = problems.map(p => {
        const nid = p.id.replace(/\//g, '-');
        const isSolved = state.solvedProblems.has(nid);
        return `<div class="matrix-prob-item">
            <div>
                <a href="${p.link}" target="_blank">${p.name}</a>
                <span class="matrix-prob-concept">${p.concept}</span>
            </div>
            <span class="matrix-prob-status ${isSolved ? 'solved' : 'unsolved'}">
                ${isSolved ? '✅ Solved' : '⭕ To Do'}
            </span>
        </div>`;
    }).join('');

    panel.innerHTML = `<div class="matrix-detail-panel">
        <div class="matrix-detail-header">
            <h4>${tagLabel} · Rating ${rating} — ${data.solved}/${data.goal} solved</h4>
            <button class="matrix-detail-close" onclick="closeMatrixDetail()">&times;</button>
        </div>
        <div class="matrix-detail-body">${probsHTML}</div>
    </div>`;
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeMatrixDetail() {
    const panel = document.getElementById('matrix-detail-panel');
    if (panel) panel.innerHTML = '';
}

// Get daily matrix practice suggestions (weakest cells first)
function getMatrixDailyProblems() {
    const suggestions = [];
    const cellScores = [];

    // Score each cell by how far behind it is
    for (const tag of MATRIX_TAGS) {
        for (const rating of MATRIX_RATINGS) {
            const problems = (MATRIX_PROBLEMS[tag] && MATRIX_PROBLEMS[tag][rating]) || [];
            if (problems.length === 0) continue;
            const data = getMatrixCellData(tag, rating);
            if (data.solved >= data.goal) continue; // already mastered
            const deficit = data.goal - data.solved;
            // Find unsolved problems in this cell
            const unsolved = problems.filter(p => {
                const nid = p.id.replace(/\//g, '-');
                return !state.solvedProblems.has(nid);
            });
            if (unsolved.length > 0) {
                cellScores.push({ tag, rating, deficit, unsolved });
            }
        }
    }

    // Sort by deficit descending (weakest cells first), then by lower rating first
    cellScores.sort((a, b) => {
        if (b.deficit !== a.deficit) return b.deficit - a.deficit;
        return a.rating - b.rating;
    });

    // Pick up to 2 problems from the top 2 weakest cells
    const seen = new Set();
    for (const cell of cellScores) {
        if (suggestions.length >= 2) break;
        for (const prob of cell.unsolved) {
            const nid = prob.id.replace(/\//g, '-');
            if (seen.has(nid)) continue;
            seen.add(nid);
            suggestions.push({
                ...prob,
                tag: cell.tag,
                rating: cell.rating,
                id: prob.id
            });
            break; // 1 per cell
        }
    }

    return suggestions;
}