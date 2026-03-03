const SCHEDULE_DATA = [
    {
        phase: 1,
        title: "Foundation",
        ranges: [
            {
                start: 1, end: 7, title: "Week 1: Basic Math & Implementation", theory: ["Integer arithmetic", "Modular arithmetic", "Basic string manipulation", "Array traversal"], problems: [
                    { id: "4/A", name: "Watermelon", link: "https://codeforces.com/problemset/problem/4/A" },
                    { id: "71/A", name: "Way Too Long Words", link: "https://codeforces.com/problemset/problem/71/A" },
                    { id: "231/A", name: "Team", link: "https://codeforces.com/problemset/problem/231/A" },
                    { id: "158/A", name: "Next Round", link: "https://codeforces.com/problemset/problem/158/A" },
                    { id: "50/A", name: "Domino piling", link: "https://codeforces.com/problemset/problem/50/A" },
                    { id: "282/A", name: "Bit++", link: "https://codeforces.com/problemset/problem/282/A" },
                    { id: "263/A", name: "Beautiful Matrix", link: "https://codeforces.com/problemset/problem/263/A" },
                    { id: "112/A", name: "Petya and Strings", link: "https://codeforces.com/problemset/problem/112/A" },
                    { id: "118/A", name: "String Task", link: "https://codeforces.com/problemset/problem/118/A" },
                    { id: "110/A", name: "Nearly Lucky Number", link: "https://codeforces.com/problemset/problem/110/A" },
                    { id: "236/A", name: "Boy or Girl", link: "https://codeforces.com/problemset/problem/236/A" },
                    { id: "266/A", name: "Stones on the Table", link: "https://codeforces.com/problemset/problem/266/A" },
                    { id: "791/A", name: "Bear and Big Brother", link: "https://codeforces.com/problemset/problem/791/A" },
                    { id: "339/A", name: "Helpful Maths", link: "https://codeforces.com/problemset/problem/339/A" },
                    { id: "281/A", name: "Word Capitalization", link: "https://codeforces.com/problemset/problem/281/A" },
                    { id: "61/A", name: "Ultra-Fast Mathematician", link: "https://codeforces.com/problemset/problem/61/A" }
                ]
            },
            {
                start: 8, end: 14, title: "Week 2: Greedy & Simple Logic", theory: ["Greedy approach", "Sorting basics", "Min/Max tracking", "Simple counting"], problems: [
                    { id: "677/A", name: "Vanya and Fence", link: "https://codeforces.com/problemset/problem/677/A" },
                    { id: "734/A", name: "Anton and Danik", link: "https://codeforces.com/problemset/problem/734/A" },
                    { id: "318/A", name: "Even Odds", link: "https://codeforces.com/problemset/problem/318/A" },
                    { id: "160/A", name: "Twins", link: "https://codeforces.com/problemset/problem/160/A" },
                    { id: "148/A", name: "Insomnia Cure", link: "https://codeforces.com/problemset/problem/148/A" },
                    { id: "25/A", name: "IQ Test", link: "https://codeforces.com/problemset/problem/25/A" },
                    { id: "69/A", name: "Young Physicist", link: "https://codeforces.com/problemset/problem/69/A" },
                    { id: "617/A", name: "Elephant", link: "https://codeforces.com/problemset/problem/617/A" },
                    { id: "2188/A", name: "Divisible Permutation", link: "https://codeforces.com/problemset/problem/2188/A" },
                    { id: "2191/A", name: "Array Coloring", link: "https://codeforces.com/problemset/problem/2191/A" },
                    { id: "2185/A", name: "Perfect Root", link: "https://codeforces.com/problemset/problem/2185/A" },
                    { id: "2184/A", name: "Social Experiment", link: "https://codeforces.com/problemset/problem/2184/A" },
                    { id: "2183/A", name: "Binary Array Game", link: "https://codeforces.com/problemset/problem/2183/A" },
                    { id: "2193/A", name: "DBMB and the Array", link: "https://codeforces.com/problemset/problem/2193/A" },
                    { id: "2195/A", name: "Sieve of Erato67henes", link: "https://codeforces.com/problemset/problem/2195/A" },
                    { id: "496/A", name: "Minimum Difficulty", link: "https://codeforces.com/problemset/problem/496/A" },
                    { id: "546/A", name: "Soldier and Bananas", link: "https://codeforces.com/problemset/problem/546/A" },
                    { id: "427/A", name: "Police Recruits", link: "https://codeforces.com/problemset/problem/427/A" }
                ]
            },
            {
                start: 15, end: 21, title: "Week 3: Sorting, Counting & Frequency", theory: ["Sorting algorithms", "Frequency arrays", "Prefix sums intro", "Two-pointer (basic)"], problems: [
                    { id: "451/B", name: "Sort the Array", link: "https://codeforces.com/problemset/problem/451/B" },
                    { id: "144/A", name: "Arrival of the General", link: "https://codeforces.com/problemset/problem/144/A" },
                    { id: "266/B", name: "Queue at the School", link: "https://codeforces.com/problemset/problem/266/B" },
                    { id: "520/A", name: "Pangram", link: "https://codeforces.com/problemset/problem/520/A" },
                    { id: "1551/A", name: "Colorful Stones", link: "https://codeforces.com/problemset/problem/1551/A" },
                    { id: "1816/A", name: "Cards with Numbers", link: "https://codeforces.com/problemset/problem/1816/A" },
                    { id: "2185/B", name: "Prefix Max", link: "https://codeforces.com/problemset/problem/2185/B" },
                    { id: "2193/B", name: "Reverse a Permutation", link: "https://codeforces.com/problemset/problem/2193/B" },
                    { id: "2185/C", name: "Shifted MEX", link: "https://codeforces.com/problemset/problem/2185/C" },
                    { id: "381/A", name: "Sereja and Dima", link: "https://codeforces.com/problemset/problem/381/A" },
                    { id: "230/A", name: "Dragons", link: "https://codeforces.com/problemset/problem/230/A" },
                    { id: "580/A", name: "Kefa and First Steps", link: "https://codeforces.com/problemset/problem/580/A" },
                    { id: "731/A", name: "Night at the Museum", link: "https://codeforces.com/problemset/problem/731/A" },
                    { id: "41/A", name: "Translation", link: "https://codeforces.com/problemset/problem/41/A" },
                    { id: "9/A", name: "Die Roll", link: "https://codeforces.com/problemset/problem/9/A" }
                ]
            },
            {
                start: 22, end: 30, title: "Week 4: Simulation & Patterns", theory: ["Simulation techniques", "Pattern recognition", "Edge cases", "Time complexity"], problems: [
                    { id: "268/A", name: "Games", link: "https://codeforces.com/problemset/problem/268/A" },
                    { id: "75/A", name: "Life Without Zeros", link: "https://codeforces.com/problemset/problem/75/A" },
                    { id: "122/A", name: "Lucky Division", link: "https://codeforces.com/problemset/problem/122/A" },
                    { id: "405/A", name: "Gravity Flip", link: "https://codeforces.com/problemset/problem/405/A" },
                    { id: "1644/A", name: "Fence", link: "https://codeforces.com/problemset/problem/1644/A" },
                    { id: "1795/A", name: "Two Towers", link: "https://codeforces.com/problemset/problem/1795/A" },
                    { id: "1331/A", name: "Is it rated?", link: "https://codeforces.com/problemset/problem/1331/A" },
                    { id: "2188/B", name: "Seats", link: "https://codeforces.com/problemset/problem/2188/B" },
                    { id: "2191/B", name: "MEX Reordering", link: "https://codeforces.com/problemset/problem/2191/B" },
                    { id: "2195/B", name: "Heapify 1", link: "https://codeforces.com/problemset/problem/2195/B" },
                    { id: "2184/B", name: "Hourglass", link: "https://codeforces.com/problemset/problem/2184/B" },
                    { id: "2194/A", name: "Lawn Mower", link: "https://codeforces.com/problemset/problem/2194/A" },
                    { id: "2189/A", name: "Table with Numbers", link: "https://codeforces.com/problemset/problem/2189/A" },
                    { id: "2183/B", name: "Yet Another MEX Problem", link: "https://codeforces.com/problemset/problem/2183/B" },
                    { id: "2193/C", name: "Replace and Sum", link: "https://codeforces.com/problemset/problem/2193/C" }
                ]
            }
        ]
    },
    {
        phase: 2,
        title: "Intermediate",
        ranges: [
            {
                start: 31, end: 40, title: "Two Pointers & Binary Search", theory: ["Two-pointer technique", "Binary search on answer", "Sorting as preprocessing", "Lower/upper bound"], problems: [
                    { id: "279/B", name: "Books", link: "" }, { id: "706/B", name: "Interesting Drink", link: "" },
                    { id: "474/B", name: "Worms", link: "" }, { id: "1244/C", name: "Aggressive cows", link: "" },
                    { id: "6/A", name: "Two pointers basics", link: "" }, { id: "2193/D", name: "Monster Game", link: "" },
                    { id: "2185/E", name: "The Robotic Rush", link: "" }, { id: "371/C", name: "Hamburgers", link: "" },
                    { id: "1486/C2", name: "Max Median", link: "" }, { id: "808/D", name: "Array Division", link: "" },
                    { id: "1474/B", name: "Poisoned Dagger", link: "" }, { id: "863/B", name: "Kayaking", link: "" },
                    { id: "1514/A", name: "Perfectly Imperfect Array", link: "" }, { id: "2197/A", name: "Friendly Numbers", link: "" },
                    { id: "2194/B", name: "Offshores", link: "" }
                ]
            },
            {
                start: 41, end: 50, title: "Number Theory Basics", theory: ["Sieve of Eratosthenes", "Prime factorization", "GCD/LCM", "Modular arithmetic"], problems: [
                    { id: "26/A", name: "Almost Prime", link: "" }, { id: "230/B", name: "T-primes", link: "" },
                    { id: "456/A", name: "Fibonacci", link: "" }, { id: "1352/C", name: "k-th Not Divisible", link: "" },
                    { id: "1088/A", name: "Ehab and another construction", link: "" }, { id: "17/A", name: "Noldbach problem", link: "" },
                    { id: "582/A", name: "GCD Table", link: "" }, { id: "1036/A", name: "Div3", link: "" },
                    { id: "1512/A", name: "Power of Two", link: "" }, { id: "1203/C", name: "Common Divisors", link: "" },
                    { id: "2193/E", name: "Product Queries", link: "" }, { id: "2189/B", name: "The Curse of the Frog", link: "" },
                    { id: "988/B", name: "Divisibility by 25", link: "" }, { id: "1560/A", name: "Polycarp's Phone", link: "" },
                    { id: "1350/A", name: "Orac and GCD", link: "" }
                ]
            },
            {
                start: 51, end: 60, title: "Greedy Algorithms (Intermediate)", theory: ["Exchange argument proofs", "Sorting-based greedy", "Scheduling / interval problems"], problems: [
                    { id: "2188/C", name: "Restricted Sorting", link: "" }, { id: "2191/C", name: "Sorting Game", link: "" },
                    { id: "2197/B", name: "Array and Permutation", link: "" }, { id: "1593/C", name: "Minimize Cost", link: "" },
                    { id: "1560/B", name: "Maximize the Beauty", link: "" }, { id: "1700/A", name: "Eating Candies", link: "" },
                    { id: "1288/A", name: "Suffix Three", link: "" }, { id: "1696/A", name: "Frog Position", link: "" },
                    { id: "977/C", name: "Less or Equal", link: "" }, { id: "1853/A", name: "Desorting", link: "" },
                    { id: "242/C", name: "King's Path", link: "" }, { id: "510/A", name: "Fox and Snake", link: "" },
                    { id: "1873/B", name: "Good Kid", link: "" }, { id: "1660/A", name: "Vasya and Coins", link: "" },
                    { id: "271/A", name: "Beautiful Year", link: "" }
                ]
            },
            {
                start: 61, end: 70, title: "Prefix Sums & Hashing", theory: ["1D and 2D prefix sums", "Difference arrays", "Hash maps", "Subarray sum"], problems: [
                    { id: "276/C", name: "Little Girl and Maximum Sum", link: "" }, { id: "1398/C", name: "Good Subarrays", link: "" },
                    { id: "466/C", name: "Number of Ways", link: "" }, { id: "459/B", name: "Pashmak and Flowers", link: "" },
                    { id: "1284/A", name: "New Year and Naming", link: "" }, { id: "1236/A", name: "Alice, Bob, Oranges", link: "" },
                    { id: "1931/C", name: "Count Pairs", link: "" }, { id: "1873/C", name: "Make it Increasing", link: "" },
                    { id: "1612/C", name: "Special Permutation", link: "" }, { id: "1842/A", name: "Tenzing and Tsondu", link: "" },
                    { id: "2185/D", name: "OutOfMemoryError", link: "" }, { id: "2183/C", name: "War Strategy", link: "" },
                    { id: "295/B", name: "Greg and Array", link: "" }, { id: "816/B", name: "Karen and Coffee", link: "" },
                    { id: "1551/C", name: "Xenia and Colorful Gems", link: "" }
                ]
            }
        ]
    },
    {
        phase: 3,
        title: "Advanced Beginner",
        ranges: [
            {
                start: 71, end: 85, title: "DP Fundamentals", theory: ["Recursion/Memoization/Tabulation", "1D DP (LIS, Coin Change)", "2D DP (Grid, Knapsack)", "State design"], problems: [
                    { id: "455/A", name: "Boredom", link: "" }, { id: "698/A", name: "Vacations", link: "" },
                    { id: "10880", name: "Longest Increasing Subseq", link: "" }, { id: "189/A", name: "Cut Ribbon", link: "" },
                    { id: "10/A", name: "LCIS", link: "" }, { id: "474/D", name: "Flowers", link: "" },
                    { id: "2195/C", name: "Dice Roll Sequence", link: "" }, { id: "2193/F", name: "Pizza Delivery", link: "" },
                    { id: "1742/A", name: "Climbing Stairs", link: "" }, { id: "1472/D", name: "USACO Training Gate", link: "" },
                    { id: "1324/C", name: "Frog Jumps", link: "" }, { id: "466/C", name: "Number of Ways", link: "" },
                    { id: "1066/C", name: "Knapsack for All", link: "" }, { id: "1006/B", name: "Two Paths", link: "" },
                    { id: "1398/D", name: "Colored Rectangles", link: "" }, { id: "1133/E", name: "Team Training", link: "" },
                    { id: "2194/C", name: "Secret Message", link: "" }, { id: "2184/D", name: "Unfair Game", link: "" },
                    { id: "371/C", name: "Hamburgers (DP)", link: "" }, { id: "1644/C", name: "Maximum Sum", link: "" }
                ]
            },
            {
                start: 86, end: 95, title: "Graph Basics (BFS/DFS)", theory: ["Adj list/matrix", "BFS (Shortest Path)", "DFS (Connectivity)", "Topological Sort"], problems: [
                    { id: "1791/D", name: "Is it a tree?", link: "" }, { id: "977/E", name: "Connected Components", link: "" },
                    { id: "20/C", name: "Shortest Path BFS", link: "" }, { id: "540/C", name: "Ice Cave", link: "" },
                    { id: "687/A", name: "Bipartiteness", link: "" }, { id: "444/C", name: "DZY Loves Colors", link: "" },
                    { id: "580/C", name: "Kefa and Park", link: "" }, { id: "2195/E", name: "Idiot First Search", link: "" },
                    { id: "2193/G", name: "Paths in a Tree", link: "" }, { id: "620/E", name: "New Year Tree", link: "" },
                    { id: "1364/D", name: "Round Trip", link: "" }, { id: "2183/D1", name: "Tree Coloring Easy", link: "" }
                ]
            },
            {
                start: 96, end: 105, title: "Bitmasks & Constructive", theory: ["Bit manipulation", "Subset maps", "Constructive thinking", "Invariants"], problems: [
                    { id: "2189/C1", name: "XOR Convenience Easy", link: "" }, { id: "1721/C", name: "AND, OR and XOR", link: "" },
                    { id: "1490/C", name: "Sum of Cubes", link: "" }, { id: "1542/A", name: "Power of Two", link: "" },
                    { id: "1698/C", name: "XOR Mixup", link: "" }, { id: "2191/D1", name: "Sub-RBS Easy", link: "" },
                    { id: "1451/C", name: "AND Operation", link: "" }, { id: "1849/C", name: "Maximize XOR", link: "" },
                    { id: "2194/D", name: "Table Cut", link: "" }, { id: "1735/C", name: "Permutation Operations", link: "" },
                    { id: "1747/C", name: "Yet Another Problem", link: "" }, { id: "2195/D", name: "Absolute Cinema", link: "" },
                    { id: "1759/D", name: "Restore Permutation", link: "" }, { id: "1834/D", name: "Make it Beautiful", link: "" },
                    { id: "1471/C", name: "Strange Definition", link: "" }, { id: "1810/B", name: "Make it Permutation", link: "" }
                ]
            },
            {
                start: 106, end: 120, title: "Data Structures & Mixed", theory: ["Stack/Queue", "Deque/Sliding Window", "Sets/Maps/PQ", "Mixed Practice"], problems: [
                    { id: "1279/C", name: "Stack with Queue", link: "" }, { id: "1556/C", name: "Balanced Bracket Sequence", link: "" },
                    { id: "1611/D", name: "Longest Subarray", link: "" }, { id: "2185/F", name: "BattleCows", link: "" },
                    { id: "2184/E", name: "Exquisite Array", link: "" }, { id: "2185/G", name: "Mixing MEXes", link: "" },
                    { id: "798/B", name: "Mike and gcd problem", link: "" }, { id: "1542/B", name: "Odd Set", link: "" },
                    { id: "1644/D", name: "Maximum Subarray", link: "" }, { id: "1579/C", name: "String Sorting", link: "" }
                ]
            }
        ]
    },
    {
        phase: 4,
        title: "Specialist",
        ranges: [
            {
                start: 121, end: 135, title: "Intermediate DP Patterns", theory: ["Range DP, Interval DP", "Bitmask DP", "DP on Strings", "Digit DP Intro"], problems: [
                    { id: "2188/D", name: "Shortest Statement Ever", link: "" }, { id: "2189/C2", name: "XOR Convenience Hard", link: "" },
                    { id: "2191/D2", name: "Sub-RBS Hard", link: "" }, { id: "2189/D1", name: "Little String Easy", link: "" },
                    { id: "2195/F", name: "Parabola Independence", link: "" }, { id: "1535/C", name: "Yet Another Problem on Strings", link: "" },
                    { id: "1733/D1", name: "Zero-One", link: "" }, { id: "1462/D", name: "Bracket Sequences", link: "" },
                    { id: "1656/C", name: "K-Good", link: "" }, { id: "1353/E", name: "Optimal Selection", link: "" },
                    { id: "1374/D", name: "Book Reading", link: "" }, { id: "2183/E", name: "LCM is LCM", link: "" },
                    { id: "2184/F", name: "Cherry Tree", link: "" }, { id: "2194/F1", name: "Again Trees Easy", link: "" },
                    { id: "1722/E", name: "Counting Rectangles", link: "" }
                ]
            },
            {
                start: 136, end: 150, title: "Graph Algorithms", theory: ["Dijkstra (Weighted Shortest Path)", "DSU (Union-Find)", "MST (Kruskal/Prim)", "Topological Sort", "Bridges"], problems: [
                    { id: "20/C", name: "Dijkstra?", link: "" }, { id: "25/D", name: "Roads not only in Berland", link: "" },
                    { id: "277/A", name: "Learning Languages", link: "" }, { id: "746/D", name: "New Roads", link: "" },
                    { id: "2194/E", name: "The Turtle Strikes Back", link: "" }, { id: "2197/D", name: "Another Problem Beautiful Pairs", link: "" },
                    { id: "1064/D", name: "Labyrinth", link: "" }, { id: "1475/E", name: "Graph Ranking", link: "" },
                    { id: "2184/G", name: "Nastiness of Segments", link: "" }, { id: "118/E", name: "Bertown Roads", link: "" },
                    { id: "835/F", name: "Roads in the Kingdom", link: "" }, { id: "1167/C", name: "News Distribution", link: "" },
                    { id: "160/D", name: "Edges in MST", link: "" }, { id: "2193/H", name: "Remove the Grail Tree", link: "" }
                ]
            },
            {
                start: 151, end: 165, title: "Combinatorics & Math", theory: ["Combinations (nCr)", "Modular Inverse", "Pascal's Triangle", "Inclusion-Exclusion", "Stars and Bars"], problems: [
                    { id: "2197/C", name: "Game with a Fraction", link: "" }, { id: "2191/F", name: "Prufer Vertex", link: "" },
                    { id: "2184/C", name: "Huge Pile", link: "" }, { id: "1742/G", name: "Count Paths", link: "" },
                    { id: "1569/C", name: "Binomial Coefficients", link: "" }, { id: "1714/D", name: "String Formation", link: "" },
                    { id: "1553/E", name: "Pairwise Modulo", link: "" }, { id: "1334/D", name: "Divisor Paths", link: "" },
                    { id: "1764/C", name: "Doremy's IQ", link: "" }, { id: "2183/F", name: "Jumping Man", link: "" }
                ]
            },
            {
                start: 166, end: 180, title: "Segment Trees & Adv DS", theory: ["Segment Tree (Range Query)", "Lazy Propagation", "BIT / Fenwick Tree", "Sparse Table"], problems: [
                    { id: "CSES/1", name: "Range Min/Sum Queries", link: "https://cses.fi" }, { id: "459/D", name: "Inversions", link: "" },
                    { id: "1526/C2", name: "Potions", link: "" }, { id: "2185/H", name: "BattleCows 2", link: "" },
                    { id: "2195/G", name: "IFS and Queries", link: "" }, { id: "2197/F", name: "Double Bracket Seq", link: "" },
                    { id: "380/C", name: "Sereja and brackets", link: "" }, { id: "474/F", name: "Ant Colony", link: "" },
                    { id: "380/A", name: "Longest Regular Bracket", link: "" }, { id: "339/D", name: "Xenia and Bit", link: "" }
                ]
            }
        ]
    },
    {
        phase: 5,
        title: "Expert Foundation",
        ranges: [
            {
                start: 181, end: 200, title: "Advanced DP", theory: ["DP on Trees (Rerooting)", "Digit DP", "SOS DP", "Divide & Conquer Opt"], problems: [
                    { id: "2188/E", name: "Jerry and Tom", link: "" }, { id: "2189/D2", name: "Little String Hard", link: "" },
                    { id: "2183/D2", name: "Tree Coloring Hard", link: "" }, { id: "2191/E", name: "Comparable Permutations", link: "" },
                    { id: "2194/F2", name: "Again Trees Hard", link: "" }, { id: "1132/C", name: "Knapsack Queries", link: "" },
                    { id: "1473/D", name: "Minimum Path", link: "" }, { id: "1187/E", name: "Tree Painting", link: "" },
                    { id: "1381/A2", name: "Prefix Flip", link: "" }, { id: "1559/D2", name: "Mocha and Stars", link: "" },
                    { id: "1612/D", name: "Berland and Recruitment", link: "" }, { id: "1810/C", name: "Catch the Moles", link: "" },
                    { id: "2189/F", name: "Zhora the Vacuum", link: "" }, { id: "2194/E", name: "The Turtle Strikes Back", link: "" },
                    { id: "1525/D", name: "Robot Collisions", link: "" }
                ]
            },
            {
                start: 201, end: 220, title: "Tree Algorithms", theory: ["LCA (Binary Lifting)", "Heavy-Light Decomposition", "Euler Tour", "Centroid Decomposition"], problems: [
                    { id: "161/D", name: "Distance in Tree", link: "" }, { id: "461/B", name: "Appleman and Tree", link: "" },
                    { id: "600/E", name: "Lomsat gelral", link: "" }, { id: "570/D", name: "Tree Requests", link: "" },
                    { id: "708/C", name: "Centroids", link: "" }, { id: "2184/F", name: "Cherry Tree", link: "" },
                    { id: "2193/H", name: "Remove the Grail Tree", link: "" }, { id: "1324/F", name: "Vertical Paths", link: "" },
                    { id: "1092/F", name: "Tree with Maximum Cost", link: "" }, { id: "1702/F", name: "Paths on Tree", link: "" },
                    { id: "1707/C", name: "Snow Walking", link: "" }, { id: "1827/C", name: "Guard the Gallery", link: "" }
                ]
            },
            {
                start: 221, end: 240, title: "Adv. Number Theory", theory: ["CRT", "Euler Totient", "Mobius Inversion", "Burnside Lemma"], problems: [
                    { id: "2188/F", name: "Cool Problem", link: "" }, { id: "2189/E", name: "Majority Wins?", link: "" },
                    { id: "2183/E", name: "LCM is Legendary", link: "" }, { id: "1367/F1", name: "Necklace", link: "" },
                    { id: "1198/D", name: "GCD Groups 2", link: "" }, { id: "1174/D", name: "Ehab and Expected XOR", link: "" },
                    { id: "1288/D", name: "Minimax Problem", link: "" }, { id: "1312/D", name: "Count Arrays", link: "" },
                    { id: "1475/F", name: "Strange LCS", link: "" }, { id: "1515/D", name: "Phoenix and Towers", link: "" }
                ]
            },
            {
                start: 241, end: 260, title: "String Algos & Adv DS", theory: ["String Hashing", "KMP", "Trie", "Suffix Array Intro"], problems: [
                    { id: "126/B", name: "Password", link: "" }, { id: "471/D", name: "MUH and Cube Walls", link: "" },
                    { id: "346/B", name: "Lucky Common Subseq", link: "" }, { id: "1045/I", name: "Palindrome Pairs", link: "" },
                    { id: "1821/D", name: "Swap and Sort", link: "" }, { id: "2197/E1", name: "Interactive Graph E1", link: "" },
                    { id: "2197/E2", name: "Interactive Graph E2", link: "" }, { id: "1721/D", name: "Prefix Function", link: "" },
                    { id: "710/F", name: "Aho-Corasick Intro", link: "" }, { id: "1200/E", name: "Matching with String", link: "" }
                ]
            }
        ]
    },
    {
        phase: 6,
        title: "Expert",
        ranges: [
            {
                start: 261, end: 285, title: "Advanced Graphs", theory: ["Max Bipartite Matching", "Max Flow / Min Cut", "SCC (Tarjan)", "2-SAT", "Euler Paths"], problems: [
                    { id: "2188/G", name: "Doors and Keys", link: "" }, { id: "2191/G", name: "Median Permutation", link: "" },
                    { id: "2183/G", name: "Snake Instructions", link: "" }, { id: "2183/H", name: "Minimise Cost", link: "" },
                    { id: "113/D", name: "King's Inspection", link: "" }, { id: "228/D", name: "Learning Plan", link: "" },
                    { id: "165/E", name: "Network", link: "" }, { id: "1387/B1", name: "Bipartiteness", link: "" },
                    { id: "1200/E", name: "Compress Words", link: "" }, { id: "1361/C", name: "Minimum Euler Circuit", link: "" },
                    { id: "1763/D", name: "Path Queries 2", link: "" }, { id: "1534/D", name: "New Year Movie", link: "" }
                ]
            },
            {
                start: 286, end: 310, title: "Advanced SegTrees", theory: ["Persistent SegTree", "Merge Sort Tree", "Li-Chao Tree"], problems: [
                    { id: "2197/F", name: "Double Bracket Sequence", link: "" }, { id: "2195/G", name: "IFS and Queries", link: "" },
                    { id: "2195/H", name: "CF Heuristic Contest", link: "" }, { id: "380/C", name: "Sereja and Brackets", link: "" },
                    { id: "121/E", name: "Lucky Array", link: "" }, { id: "1234/D", name: "Distinct Characters", link: "" },
                    { id: "1178/E", name: "Array Restoration", link: "" }, { id: "840/D", name: "Earthquakes", link: "" },
                    { id: "1370/D", name: "Max GCD", link: "" }, { id: "1601/C", name: "Beautiful Pair", link: "" }
                ]
            },
            {
                start: 311, end: 365, title: "Expert Patterns & Strategy", theory: ["Pattern: Greedy+Sort+BS", "Pattern: DP State Design", "Pattern: Graph Modeling", "Contest Strategy"], problems: [
                    { id: "2183/I1", name: "Pairs Flipping Easy", link: "" }, { id: "2189/F", name: "Zhora the Vacuum", link: "" },
                    { id: "2188/F", name: "Cool Problem", link: "" }, { id: "1326/D2", name: "Palindrome", link: "" },
                    { id: "242/E", name: "XOR on Segment", link: "" }, { id: "1051/F", name: "Shortest Path", link: "" },
                    { id: "2197/E1", name: "Interactive Graph", link: "" }, { id: "817/D", name: "Imbalanced Array", link: "" },
                    { id: "817/F", name: "MEX Queries", link: "" }, { id: "432/D", name: "Prefix Fun", link: "" }
                ]
            }
        ]
    }
];
