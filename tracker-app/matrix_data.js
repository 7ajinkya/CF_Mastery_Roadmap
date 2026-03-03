// ==========================================
// Mastery Matrix — Problem Data (Expanded)
// ==========================================
const MATRIX_TAGS = ['implementation', 'brute force', 'math', 'greedy', 'sorting', 'strings', 'constructive', 'binary search', 'prefix sums', 'number theory', 'graphs', 'dp'];
const MATRIX_TAG_LABELS = {
    'math': '🧮 Math', 'implementation': '💻 Impl', 'greedy': '💰 Greedy', 'sorting': '🔄 Sorting', 'binary search': '🔍 Bin Search',
    'prefix sums': '📊 Prefix Sums', 'number theory': '🔢 Num Theory', 'dp': '🧩 DP', 'strings': '📝 Strings',
    'graphs': '🌐 Graphs', 'constructive': '🏗️ Constructive', 'brute force': '💪 Brute Force'
};
const MATRIX_RATINGS = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];
const MATRIX_DIFFICULTY_GROUPS = [
    { label: 'Newbie', icon: '🟢', ratings: [800, 900, 1000, 1100] },
    { label: 'Pupil', icon: '🔵', ratings: [1200, 1300] },
    { label: 'Specialist', icon: '🟣', ratings: [1400, 1500] },
    { label: 'Expert', icon: '🟠', ratings: [1600, 1700] },
    { label: 'CM+', icon: '🔴', ratings: [1800, 1900, 2000] }
];
const MATRIX_CELL_GOAL = 5;

// Helper to build problem object concisely
function mp(id, name, concept) {
    const parts = id.split('/');
    return { id, name, link: `https://codeforces.com/problemset/problem/${parts[0]}/${parts[1]}`, concept };
}

const MATRIX_PROBLEMS = {
    'math': {
        800: [mp('4/A', 'Watermelon', 'Parity'), mp('50/A', 'Domino Piling', 'Floor division'), mp('791/A', 'Bear and Big Brother', 'Multiplication loop'), mp('546/A', 'Soldier and Bananas', 'Sum formula'), mp('617/A', 'Elephant', 'Ceiling division'), mp('148/A', 'Insomnia Cure', 'Inclusion-exclusion'), mp('25/A', 'IQ Test', 'Parity detection'), mp('69/A', 'Young Physicist', 'Vector sum'), mp('318/A', 'Even Odds', 'Position formula'), mp('9/A', 'Die Roll', 'Probability')],
        900: [mp('136/A', 'Presents', 'Permutation'), mp('160/A', 'Twins', 'Greedy+sum'), mp('116/A', 'Tram', 'Max prefix sum'), mp('486/A', 'Calculating Function', 'Pattern'), mp('330/A', 'Cakeminator', 'Grid counting'), mp('144/A', 'Arrival of General', 'Min/max pos'), mp('275/A', 'Lights Out', 'XOR'), mp('59/A', 'Word', 'String case'), mp('339/A', 'Helpful Maths', 'Digit sort'), mp('122/A', 'Lucky Division', 'Divisibility')],
        1000: [mp('230/A', 'Dragons', 'Sorting+sim'), mp('492/B', 'Vanya and Lanterns', 'BS on answer'), mp('230/B', 'T-primes', 'Perfect squares'), mp('1352/C', 'k-th Not Divisible', 'Math formula'), mp('520/B', 'Two Buttons', 'BFS/Reverse'), mp('467/B', 'Fedor and New Game', 'Bit counting'), mp('433/B', 'Kuriyama Stones', 'Prefix sums')],
        1100: [mp('445/A', 'DZY Chessboard', 'Constructive'), mp('381/A', 'Sereja and Dima', 'Two pointers'), mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('313/A', 'Ilya Bank Account', 'Digit manip'), mp('270/A', 'Fancy Fence', 'Geometry+math'), mp('322/B', 'Ciel and Flowers', 'Case analysis')],
        1200: [mp('371/C', 'Hamburgers', 'BS on answer'), mp('446/A', 'DZY Sequences', 'LIS var'), mp('264/B', 'Good Sequences', 'DP+NT'), mp('271/B', 'Prime Matrix', 'Sieve+matrix'), mp('453/A', 'Little Pony Expected Max', 'Probability'), mp('339/C', 'Xenia and Weights', 'Bitmask+BF')],
        1300: [mp('276/D', 'Little Girl Max XOR', 'Bit manip'), mp('118/D', 'Caesars Legions', 'DP+combo'), mp('289/B', 'Polo Penguin Matrix', 'Mod arith'), mp('368/B', 'Sereja Suffixes', 'Set+suffix'), mp('315/A', 'Sereja Bottles', 'Sim+count')],
        1400: [mp('1114/C', 'Trailing Loves', 'Prime factorization'), mp('1295/C', 'Obtain the String', 'Greedy+precomp'), mp('1367/D', 'Task On The Board', 'Constructive+math'), mp('1350/B', 'Orac and Models', 'DP+divisors'), mp('1328/D', 'Carousel', 'Greedy+parity')],
        1500: [mp('1294/D', 'MEX maximizing', 'MEX+math'), mp('1359/C', 'Mixing Water', 'Binary search+math'), mp('1154/D', 'Walking Robot', 'Greedy+math'), mp('1249/D2', 'Too Many Segments', 'Greedy+sort'), mp('1355/C', 'Count Triangles', 'Two pointers+math')],
        1600: [mp('1195/D2', 'Submarine in Sea', 'Math+binary search'), mp('1201/C', 'Maximum Median', 'BS+greedy'), mp('1265/D', 'Beautiful Sequence', 'Constructive+greedy'), mp('1430/D', 'String Deletion', 'Greedy+impl'), mp('1462/E2', 'Close Subjects', 'Combinatorics')],
        1700: [mp('1288/C', 'Two Arrays', 'DP+combo'), mp('1324/E', 'Sleeping Schedule', 'DP+modular'), mp('1359/D', 'Yet Another Yet Another Task', 'Prefix max+DP'), mp('1398/D', 'Colored Rectangles', 'DP+greedy'), mp('1472/F', 'New Year Puzzle', 'Math+greedy')],
        1800: [mp('1237/D', 'Balanced Playlist', 'Two ptrs+binary'), mp('1268/C', 'K Rectangles', 'Greedy+math'), mp('1348/D', 'Phoenix and Science', 'Binary+constructive'), mp('1385/E', 'Directing Edges', 'Topo sort+math'), mp('1476/D', 'Journey', 'DP+math')],
        1900: [mp('1260/D', 'A Game with Traps', 'Binary search'), mp('1284/D', 'New Year and Conference', 'Sorting+sweep'), mp('1307/D', 'Cow and Fields', 'BFS+greedy'), mp('1363/E', 'Tree Shuffling', 'Tree DP'), mp('1437/D', 'Minimal Height Tree', 'BFS+greedy')],
        2000: [mp('1300/D', 'Aerodynamic', 'Geometry+math'), mp('1305/D', 'Kuroni and Impossible Calc', 'Pigeonhole'), mp('1336/C', 'Kaavi and Magic Spell', 'Interval DP'), mp('1375/E', 'Inversion SwapSort', 'Constructive'), mp('1450/D', 'Rating Compression', 'Binary search')]
    },
    'implementation': {
        800: [mp('71/A', 'Way Too Long Words', 'String abbrev'), mp('231/A', 'Team', 'Count+condition'), mp('282/A', 'Bit++', 'Simulation'), mp('263/A', 'Beautiful Matrix', '2D array'), mp('112/A', 'Petya and Strings', 'Compare'), mp('118/A', 'String Task', 'String proc'), mp('236/A', 'Boy or Girl', 'Unique chars'), mp('266/A', 'Stones on Table', 'Adj dupes'), mp('281/A', 'Word Capitalization', 'Transform'), mp('61/A', 'Ultra-Fast Math', 'XOR strings')],
        900: [mp('58/A', 'Chat Room', 'Subsequence'), mp('155/A', 'I_love_username', 'Min/max track'), mp('141/A', 'Amusing Joke', 'Char freq'), mp('133/A', 'HQ9+', 'Interpreter'), mp('520/A', 'Pangram', 'Alphabet'), mp('41/A', 'Translation', 'Reversal'), mp('443/A', 'Anton and Letters', 'Set ops'), mp('581/A', 'Vasya Hipster', 'Simple math'), mp('427/A', 'Police Recruits', 'Counter sim'), mp('384/A', 'Coder', 'Grid pattern')],
        1000: [mp('266/B', 'Queue at School', 'Simulation'), mp('342/A', 'Xenia Divisors', 'Grouping'), mp('118/B', 'Present from Lena', 'Pattern print'), mp('320/A', 'Magic Numbers', 'Digit valid'), mp('96/A', 'Football', 'Consecutive')],
        1100: [mp('75/A', 'Life Without Zeros', 'String num'), mp('257/B', 'Playing Cubes', 'Game sim'), mp('256/A', 'Eugeny Array', 'Construction'), mp('259/B', 'Magic Square', 'Construction'), mp('454/B', 'Sort by Shift', 'Array rotation')],
        1200: [mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('446/A', 'DZY Sequences', 'LIS var'), mp('446/B', 'DZY Modification', 'Prefix opt'), mp('380/C', 'Sereja Brackets', 'Stack+count'), mp('314/B', 'Sereja Periods', 'String period')],
        1300: [mp('444/C', 'DZY Colors', 'Segment tree'), mp('446/C', 'DZY Fibonacci', 'Matrix exp'), mp('367/D', 'Sereja Intervals', 'Combo+DP'), mp('380/B', 'Sereja Cinema', 'Sim+opt'), mp('380/D', 'Sereja Tree', 'Tree+impl')],
        1400: [mp('1352/E', 'Special Elements', 'Prefix sums'), mp('1367/C', 'Social Distance', 'Greedy+impl'), mp('1399/D', 'Binary String', 'Binary search+impl'), mp('1419/D1', 'Sage Birthday', 'Sorting+constructive'), mp('1462/C', 'Unique Number', 'Greedy+digits')],
        1500: [mp('1353/E', 'K-periodic Garland', 'DP+impl'), mp('1343/D', 'Constant Palindrome Sum', 'Sweep+impl'), mp('1324/D', 'Pair of Topics', 'Sorting+BS'), mp('1303/C', 'Perfect Keyboard', 'Graph+impl'), mp('1234/C', 'Pipes', 'DP+grid')],
        1600: [mp('1360/F', 'Spy String', 'Brute force+impl'), mp('1409/E', 'Two Platforms', 'Sort+prefix+BS'), mp('1370/D', 'Odd-Even Subsequence', 'BS+greedy'), mp('1433/E', 'Two Round Dances', 'Combinatorics'), mp('1454/D', 'Number into Primes', 'Factorization')],
        1700: [mp('1278/C', 'Berry Jam', 'Prefix+map'), mp('1364/D', 'Ehab Prefix MEXs', 'Constructive'), mp('1419/E', 'Decryption', 'Number theory'), mp('1454/E', 'Number of Simple Paths', 'Tree+DFS'), mp('1490/F', 'Equalize the Array', 'Sorting+BS')],
        1800: [mp('1257/E', 'The Contest', 'DP+prefix'), mp('1301/C', 'Ayoub Palindrome', 'DP+math'), mp('1368/D', 'AND, OR and NOT', 'DP+bitmask'), mp('1409/F', 'Subsequences of Length Two', 'DP+string'), mp('1437/E', 'Make It Connected', 'MST+greedy')],
        1900: [mp('1312/D', 'Count the Arrays', 'Combinatorics'), mp('1334/D', 'Minimum Euler Cycle', 'Pattern+impl'), mp('1373/E', 'Sum of Digits', 'Greedy+digit DP'), mp('1395/D', 'Bobonius and Jiggly', 'Convex hull'), mp('1451/E1', 'Bitwise Queries', 'Bit tricks')],
        2000: [mp('1320/D', 'Balanced Field', 'Two pointers'), mp('1365/F', 'Swaps Again', 'Greedy+pairs'), mp('1381/C', 'Mastermind', 'Constructive+greedy'), mp('1418/D', 'Trash Problem', 'Set+impl'), mp('1453/D', 'Checkpoints', 'Probability')]
    },
    'greedy': {
        800: [mp('160/A', 'Twins', 'Sort+greedy'), mp('230/A', 'Dragons', 'Sort by str'), mp('405/A', 'Gravity Flip', 'Sort effect'), mp('677/A', 'Vanya Fence', 'Threshold'), mp('144/A', 'Arrival General', 'Min/max'), mp('339/A', 'Helpful Maths', 'Sort'), mp('208/A', 'Dubstep', 'String proc'), mp('158/B', 'Taxi', 'Grouping')],
        900: [mp('381/A', 'Sereja Dima', 'Two ptr greedy'), mp('118/B', 'Present Lena', 'Pattern'), mp('339/B', 'Xenia Ringroad', 'Modular'), mp('96/A', 'Football', 'Consecutive'), mp('122/A', 'Lucky Division', 'Divisibility'), mp('266/B', 'Queue School', 'Simulation')],
        1000: [mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('447/B', 'DZY Strings', 'Weight'), mp('315/A', 'Sereja Bottles', 'Sim+count'), mp('368/B', 'Sereja Suffixes', 'Set+reverse'), mp('367/A', 'Sereja Algorithm', 'String trans')],
        1100: [mp('425/A', 'Sereja Swaps', 'BF+opt'), mp('380/A', 'Sereja Prefixes', 'DS sim'), mp('380/C', 'Sereja Brackets', 'Stack'), mp('314/B', 'Sereja Periods', 'String period'), mp('314/C', 'Sereja Subsequences', 'Combo')],
        1200: [mp('446/A', 'DZY Sequences', 'LIS'), mp('446/B', 'DZY Modification', 'Prefix opt'), mp('453/B', 'Little Pony Summer Sun', 'Graph'), mp('471/B', 'MUH Important Things', 'Sort criteria'), mp('463/C', 'Gargari Bishops', 'Chess opt')],
        1300: [mp('444/C', 'DZY Colors', 'Seg tree'), mp('446/C', 'DZY Fibonacci', 'Matrix exp'), mp('453/C', 'Little Pony Harmony', 'Bitmask+DP'), mp('471/C', 'MUH Cube Walls', 'KMP'), mp('471/D', 'MUH House Cards', 'Math opt')],
        1400: [mp('1326/D2', 'Prefix-Suffix Palindrome', 'Greedy+string'), mp('1385/C', 'Make It Good', 'Greedy+stack'), mp('1401/C', 'Mere Array', 'GCD+greedy'), mp('1428/C', 'ABBB', 'Stack greedy'), mp('1472/D', 'Even-Odd Game', 'Sort+greedy')],
        1500: [mp('1285/D', 'Dr Jekyll Mr Hyde', 'Greedy+math'), mp('1353/E', 'K-periodic Garland', 'DP+greedy'), mp('1399/D', 'Binary String Sorting', 'BS+greedy'), mp('1433/D', 'Districts Connection', 'Tree+greedy'), mp('1475/D', 'Cleaning', 'Stack+greedy')],
        1600: [mp('1354/D', 'Multiset', 'BS+BIT'), mp('1399/E1', 'Weights Division', 'Tree+greedy'), mp('1430/D', 'String Deletion', 'Greedy+impl'), mp('1462/E1', 'Close Subjects', 'Combinatorics'), mp('1494/C', '1D Sokoban', 'Greedy+sort')],
        1700: [mp('1296/E', 'Array Shuffling', 'Cycle+greedy'), mp('1363/D', 'Guess Value', 'Greedy+bit'), mp('1418/C', 'Mortal Kombat', 'DP+greedy'), mp('1474/C', 'Array Destruction', 'Greedy+set'), mp('1498/C', 'Planar Reflections', 'DP+greedy')],
        1800: [mp('1253/D', 'Harmonious Graph', 'DSU+greedy'), mp('1320/C', 'World of Darkraft', 'Sort+sweep'), mp('1373/E', 'Sum of Digits', 'Digit DP'), mp('1415/D', 'XOR Tax', 'Tree+greedy'), mp('1486/D', 'Max Median', 'BS+greedy')],
        1900: [mp('1276/C', 'Beautiful Rectangle', 'Greedy+math'), mp('1338/C', 'Perfect Triples', 'Bit+constructive'), mp('1392/D', 'Omkar and Bed Wars', 'Greedy+DP'), mp('1436/D', 'Bandit in City', 'BS+tree'), mp('1499/D', 'Red-Blue Graph', 'Flow+greedy')],
        2000: [mp('1300/D', 'Aerodynamic', 'Geometry'), mp('1344/C', 'Quantifier Logic', 'Graph+greedy'), mp('1396/C', 'Monster Invaders', 'DP+greedy'), mp('1442/B', 'Identify the Operations', 'Greedy+set'), mp('1485/D', 'Multiples and Power Differences', 'Constructive')]
    },
    'sorting': {
        800: [mp('160/A', 'Twins', 'Sort+greedy'), mp('230/A', 'Dragons', 'Sort str'), mp('405/A', 'Gravity Flip', 'Sort effect'), mp('381/A', 'Sereja Dima', 'Two ptrs'), mp('118/B', 'Present Lena', 'Pattern')],
        900: [mp('144/A', 'Arrival General', 'Min/max'), mp('266/B', 'Queue School', 'Sim sort'), mp('339/A', 'Helpful Maths', 'Digit sort'), mp('158/B', 'Taxi', 'Grouping'), mp('96/A', 'Football', 'Consecutive'), mp('677/A', 'Vanya Fence', 'Threshold')],
        1000: [mp('279/B', 'Books', 'Sliding window'), mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('447/B', 'DZY Strings', 'Weight'), mp('315/A', 'Sereja Bottles', 'Sim+count'), mp('368/B', 'Sereja Suffixes', 'Set+reverse')],
        1100: [mp('367/A', 'Sereja Algorithm', 'String trans'), mp('425/A', 'Sereja Swaps', 'BF+opt'), mp('380/A', 'Sereja Prefixes', 'DS sim'), mp('380/C', 'Sereja Brackets', 'Stack'), mp('466/C', 'Number of Ways', 'Prefix count')],
        1200: [mp('446/A', 'DZY Sequences', 'LIS'), mp('446/B', 'DZY Modification', 'Prefix opt'), mp('276/D', 'Little Girl Max XOR', 'Bit manip'), mp('118/D', 'Caesars Legions', 'DP+combo'), mp('289/B', 'Polo Matrix', 'Mod arith')],
        1300: [mp('444/C', 'DZY Colors', 'Seg tree'), mp('446/C', 'DZY Fibonacci', 'Matrix exp'), mp('368/B', 'Sereja Suffixes', 'Suffix'), mp('315/A', 'Sereja Bottles', 'Sim+count'), mp('380/C', 'Sereja Brackets', 'Stack')],
        1400: [mp('1353/D', 'Constructing Array', 'Sort+sim'), mp('1418/B', 'Negative Prefixes', 'Sort+greedy'), mp('1443/C', 'The Delivery Dilemma', 'BS+sort'), mp('1474/B', 'Different Divisors', 'NT+sort'), mp('1490/D', 'Permutation Transform', 'Tree+sort')],
        1500: [mp('1256/D', 'Binary String Minimizing', 'Greedy+sort'), mp('1354/C2', 'Not So Simple Poly', 'Geo+sort'), mp('1433/E', 'Two Round Dances', 'Combo+sort'), mp('1478/C', 'Nezzar and Symmetric Array', 'Sort+impl'), mp('1494/B', 'Berland Crossword', 'Brute+sort')],
        1600: [mp('1296/D', 'Fight with Monsters', 'Sort+math'), mp('1370/D', 'Odd-Even Subsequence', 'BS+greedy'), mp('1409/E', 'Two Platforms', 'Sort+prefix'), mp('1451/D', 'Circle Game', 'Game+math'), mp('1485/C', 'Floor and Ceil', 'Sort+BS')],
        1700: [mp('1288/C', 'Two Arrays', 'DP+combo'), mp('1324/E', 'Sleeping Schedule', 'DP+mod'), mp('1364/D', 'Ehab Prefix MEXs', 'Constructive'), mp('1398/D', 'Colored Rectangles', 'DP+greedy'), mp('1490/F', 'Equalize Array', 'Sort+BS')],
        1800: [mp('1237/D', 'Balanced Playlist', 'Two ptrs'), mp('1284/D', 'New Year Conference', 'Sort+sweep'), mp('1348/D', 'Phoenix Science', 'Binary+constr'), mp('1385/E', 'Directing Edges', 'Topo sort'), mp('1476/D', 'Journey', 'DP')],
        1900: [mp('1260/D', 'Game with Traps', 'BS+sort'), mp('1307/D', 'Cow and Fields', 'BFS+greedy'), mp('1363/E', 'Tree Shuffling', 'Tree DP'), mp('1437/D', 'Minimal Height Tree', 'BFS'), mp('1451/E1', 'Bitwise Queries', 'Bit tricks')],
        2000: [mp('1305/D', 'Kuroni Impossible', 'Pigeonhole'), mp('1336/C', 'Kaavi Magic Spell', 'Interval DP'), mp('1375/E', 'Inversion SwapSort', 'Constructive'), mp('1418/D', 'Trash Problem', 'Set+impl'), mp('1450/D', 'Rating Compression', 'BS')]
    },
    'binary search': {
        800: [mp('492/B', 'Vanya Lanterns', 'BS answer'), mp('371/C', 'Hamburgers', 'BS+feasibility'), mp('474/B', 'Worms', 'Prefix+BS'), mp('706/B', 'Interesting Drink', 'Count+BS'), mp('702/A', 'Maximum Increase', 'Increasing sub')],
        900: [mp('665/C', 'Simple Strings', 'Construction+BS'), mp('804/A', 'Find Amir', 'Math+BS'), mp('919/B', 'Perfect Number', 'Precomp+BS'), mp('431/C', 'k-Tree', 'DP+BS'), mp('622/C', 'Interview', 'Game+BS')],
        1000: [mp('279/B', 'Books', 'Sliding+BS'), mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('446/A', 'DZY Sequences', 'LIS+BS'), mp('520/B', 'Two Buttons', 'BFS/Reverse'), mp('230/B', 'T-primes', 'Perfect sq')],
        1100: [mp('118/D', 'Caesars Legions', 'DP+combo'), mp('289/B', 'Polo Matrix', 'Mod arith'), mp('368/B', 'Sereja Suffixes', 'Suffix'), mp('315/A', 'Sereja Bottles', 'Sim+count'), mp('367/A', 'Sereja Algorithm', 'String trans')],
        1200: [mp('444/C', 'DZY Colors', 'Seg tree+BS'), mp('446/C', 'DZY Fibonacci', 'Matrix exp'), mp('453/B', 'Little Pony Sun', 'Graph+constr'), mp('471/B', 'MUH Important', 'Sort criteria'), mp('471/C', 'MUH Cube Walls', 'KMP')],
        1300: [mp('453/C', 'Little Pony Harmony', 'Bitmask+DP'), mp('453/D', 'Little Pony Elements', 'Linalg'), mp('471/D', 'MUH House Cards', 'Math opt'), mp('453/A', 'Little Pony Expected', 'Probability'), mp('264/B', 'Good Sequences', 'DP+NT')],
        1400: [mp('1352/D', 'Alice Bob and Candies', 'BS+sim'), mp('1399/D', 'Binary String Sorting', 'BS+greedy'), mp('1443/C', 'Delivery Dilemma', 'BS+sort'), mp('1462/D', 'Add to Neighbor', 'Greedy+BS'), mp('1486/C2', 'Guessing the Greatest', 'Interactive BS')],
        1500: [mp('1201/C', 'Maximum Median', 'BS+greedy'), mp('1355/C', 'Count Triangles', 'Two ptrs+math'), mp('1359/C', 'Mixing Water', 'BS+math'), mp('1370/D', 'Odd-Even Subseq', 'BS+greedy'), mp('1409/E', 'Two Platforms', 'Sort+prefix+BS')],
        1600: [mp('1117/C', 'Magic Ship', 'BS on answer'), mp('1187/C', 'Vasya And Array', 'Greedy+constr'), mp('1251/D', 'Salary Changing', 'BS+greedy'), mp('1354/D', 'Multiset', 'BS+BIT'), mp('1486/D', 'Max Median', 'BS+prefix')],
        1700: [mp('1208/C', 'Magic Grid', 'Constructive+XOR'), mp('1278/C', 'Berry Jam', 'Prefix+map'), mp('1296/E', 'Array Shuffling', 'Cycle+greedy'), mp('1363/D', 'Guess Value', 'Greedy+bit'), mp('1498/D', 'Bananas in a Microwave', 'BFS+BS')],
        1800: [mp('1253/D', 'Harmonious Graph', 'DSU+greedy'), mp('1268/C', 'K Rectangles', 'Greedy+math'), mp('1301/C', 'Ayoub Palindrome', 'DP+math'), mp('1320/C', 'World Darkraft', 'Sort+sweep'), mp('1486/D', 'Max Median', 'BS+greedy')],
        1900: [mp('1276/C', 'Beautiful Rectangle', 'Greedy+math'), mp('1284/D', 'New Year Conference', 'Sort+sweep'), mp('1338/C', 'Perfect Triples', 'Bit+constr'), mp('1392/D', 'Omkar Bed Wars', 'Greedy+DP'), mp('1436/D', 'Bandit City', 'BS+tree')],
        2000: [mp('1300/D', 'Aerodynamic', 'Geometry'), mp('1336/C', 'Kaavi Magic Spell', 'Interval DP'), mp('1344/C', 'Quantifier Logic', 'Graph+greedy'), mp('1396/C', 'Monster Invaders', 'DP+greedy'), mp('1442/B', 'Identify Operations', 'Greedy+set')]
    },
    'prefix sums': {
        800: [mp('231/A', 'Team', 'Counting'), mp('263/A', 'Beautiful Matrix', 'Range sum'), mp('276/A', 'Wonderful Numbers', 'Prefix max'), mp('9/A', 'Die Roll', 'Constructive'), mp('160/A', 'Twins', 'Pattern')],
        900: [mp('315/A', 'Subsequence Count', 'Counting'), mp('381/A', 'Array Division', 'Partition'), mp('446/A', 'Good Subarrays', 'Prefix+count'), mp('466/C', 'Number of Ways', 'Prefix count'), mp('339/B', 'Xenia Ringroad', 'Modular')],
        1000: [mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('433/B', 'Kuriyama Stones', 'Sort+prefix'), mp('446/A', 'DZY Sequences', 'LIS+prefix'), mp('446/B', 'DZY Modification', '2D prefix'), mp('276/D', 'Little Girl Max XOR', 'Bit+prefix')],
        1100: [mp('118/D', 'Caesars Legions', 'DP+prefix'), mp('289/B', 'Polo Matrix', 'Mod arith'), mp('368/B', 'Sereja Suffixes', 'Reverse prefix'), mp('367/A', 'Sereja Algorithm', 'String trans'), mp('313/B', 'Ilya Queries', 'Prefix sums')],
        1200: [mp('444/C', 'DZY Colors', 'Seg tree+prefix'), mp('446/C', 'DZY Fibonacci', 'Matrix exp'), mp('453/B', 'Little Pony Sun', 'Graph+constr'), mp('453/C', 'Little Pony Harmony', 'Bitmask+DP'), mp('471/B', 'MUH Important', 'Sort criteria')],
        1300: [mp('453/D', 'Little Pony Elements', 'Linalg'), mp('453/E', 'Little Pony Tirek', 'Sim+opt'), mp('471/C', 'MUH Cube Walls', 'KMP'), mp('471/D', 'MUH House Cards', 'Math opt'), mp('453/A', 'Little Pony Expected', 'Probability')],
        1400: [mp('1352/E', 'Special Elements', 'Prefix sums'), mp('1399/D', 'Binary String Sorting', 'BS+prefix'), mp('1418/B', 'Negative Prefixes', 'Sort+prefix'), mp('1462/D', 'Add to Neighbor', 'Greedy+prefix'), mp('1478/C', 'Nezzar Symmetric', 'Sort+impl')],
        1500: [mp('1234/C', 'Pipes', 'DP+grid'), mp('1324/D', 'Pair of Topics', 'Sort+BS'), mp('1343/D', 'Constant Palindrome', 'Sweep'), mp('1353/E', 'K-periodic Garland', 'DP+prefix'), mp('1359/D', 'Yet Another Task', 'Prefix max+DP')],
        1600: [mp('1296/D', 'Fight Monsters', 'Sort+math'), mp('1360/F', 'Spy String', 'BF+impl'), mp('1409/E', 'Two Platforms', 'Sort+prefix+BS'), mp('1433/E', 'Two Round Dances', 'Combo'), mp('1454/D', 'Number Primes', 'Factorization')],
        1700: [mp('1278/C', 'Berry Jam', 'Prefix+map'), mp('1288/C', 'Two Arrays', 'DP+combo'), mp('1324/E', 'Sleeping Schedule', 'DP+mod'), mp('1359/D', 'Yet Another Task', 'Prefix max'), mp('1398/D', 'Colored Rectangles', 'DP+greedy')],
        1800: [mp('1257/E', 'The Contest', 'DP+prefix'), mp('1301/C', 'Ayoub Palindrome', 'DP+math'), mp('1348/D', 'Phoenix Science', 'Binary+constr'), mp('1385/E', 'Directing Edges', 'Topo sort'), mp('1476/D', 'Journey', 'DP')],
        1900: [mp('1260/D', 'Game with Traps', 'BS'), mp('1307/D', 'Cow and Fields', 'BFS+greedy'), mp('1312/D', 'Count Arrays', 'Combo'), mp('1363/E', 'Tree Shuffling', 'Tree DP'), mp('1437/D', 'Minimal Height Tree', 'BFS')],
        2000: [mp('1305/D', 'Kuroni Impossible', 'Pigeonhole'), mp('1336/C', 'Kaavi Magic Spell', 'Interval DP'), mp('1375/E', 'Inversion SwapSort', 'Constructive'), mp('1450/D', 'Rating Compression', 'BS'), mp('1453/D', 'Checkpoints', 'Probability')]
    },
    'number theory': {
        800: [mp('230/B', 'T-primes', 'Perfect sq'), mp('26/A', 'Almost Prime', 'Prime fact'), mp('1352/C', 'k-th Not Divisible', 'Formula'), mp('1203/C', 'Common Divisors', 'GCD array'), mp('1350/A', 'Orac and GCD', 'GCD props')],
        900: [mp('17/A', 'Noldbach Problem', 'Prime count'), mp('582/A', 'GCD Table', 'GCD constr'), mp('1036/A', 'Div3', 'Divisibility'), mp('988/B', 'Divisibility by 25', 'Last digits'), mp('1088/A', 'Ehab Construction', 'Math constr')],
        1000: [mp('1512/A', 'Power of Two', 'Bit manip'), mp('456/A', 'Fibonacci', 'Fib props'), mp('1244/C', 'Aggressive Cows', 'BS+math'), mp('271/B', 'Prime Matrix', 'Sieve+matrix'), mp('1560/A', 'Polycarp Phone', 'Digit manip')],
        1100: [mp('264/B', 'Good Sequences', 'DP+NT'), mp('453/A', 'Little Pony Expected', 'Probability'), mp('471/B', 'MUH Important', 'Sort criteria'), mp('471/C', 'MUH Cube Walls', 'KMP'), mp('463/C', 'Gargari Bishops', 'Chess opt')],
        1200: [mp('471/D', 'MUH House Cards', 'Math opt'), mp('446/C', 'DZY Fibonacci', 'Matrix exp'), mp('453/B', 'Little Pony Sun', 'Graph'), mp('453/C', 'Little Pony Harmony', 'Bitmask+DP'), mp('453/D', 'Little Pony Elements', 'Linalg')],
        1300: [mp('453/E', 'Little Pony Tirek', 'Sim+opt'), mp('471/E', 'MUH Sticks', 'Geo+greedy'), mp('471/F', 'MUH Segments', 'Sweep'), mp('463/D', 'Gargari Perms', 'LIS+graph'), mp('463/E', 'Gargari Bishops', 'Chess')],
        1400: [mp('1114/C', 'Trailing Loves', 'Prime fact'), mp('1350/B', 'Orac Models', 'DP+divisors'), mp('1401/C', 'Mere Array', 'GCD+greedy'), mp('1474/B', 'Different Divisors', 'NT+greedy'), mp('1490/C', 'Sum of Cubes', 'NT+brute')],
        1500: [mp('1294/D', 'MEX maximizing', 'MEX+math'), mp('1355/C', 'Count Triangles', 'Two ptrs+math'), mp('1419/D2', 'Sage Birthday Hard', 'Sort+NT'), mp('1433/D', 'Districts Connection', 'Tree'), mp('1475/D', 'Cleaning', 'Stack')],
        1600: [mp('1117/C', 'Magic Ship', 'BS on answer'), mp('1195/D2', 'Submarine Sea', 'Math+BS'), mp('1251/D', 'Salary Changing', 'BS+greedy'), mp('1296/D', 'Fight Monsters', 'Sort+math'), mp('1354/D', 'Multiset', 'BS+BIT')],
        1700: [mp('1208/C', 'Magic Grid', 'XOR+constr'), mp('1288/C', 'Two Arrays', 'DP+combo'), mp('1296/E', 'Array Shuffling', 'Cycle'), mp('1419/E', 'Decryption', 'NT'), mp('1472/F', 'New Year Puzzle', 'Math+greedy')],
        1800: [mp('1253/D', 'Harmonious Graph', 'DSU'), mp('1268/C', 'K Rectangles', 'Math'), mp('1301/C', 'Ayoub Palindrome', 'DP+math'), mp('1320/C', 'World Darkraft', 'Sort+sweep'), mp('1415/D', 'XOR Tax', 'Tree')],
        1900: [mp('1276/C', 'Beautiful Rectangle', 'Math'), mp('1305/D', 'Kuroni Impossible', 'Pigeonhole'), mp('1338/C', 'Perfect Triples', 'Bit+constr'), mp('1392/D', 'Omkar Bed Wars', 'Greedy+DP'), mp('1436/D', 'Bandit City', 'BS+tree')],
        2000: [mp('1300/D', 'Aerodynamic', 'Geometry'), mp('1336/C', 'Kaavi Magic Spell', 'Interval DP'), mp('1344/C', 'Quantifier Logic', 'Graph'), mp('1375/E', 'Inversion SwapSort', 'Constructive'), mp('1485/D', 'Multiples Power', 'Constructive')]
    },
    'dp': {
        800: [mp('4/A', 'Watermelon', 'Parity'), mp('546/A', 'Soldier Bananas', 'Sum formula'), mp('1352/A', 'Sum of Round Numbers', 'Decompose'), mp('617/A', 'Elephant', 'Ceil div'), mp('50/A', 'Domino Piling', 'Floor div')],
        900: [mp('486/A', 'Calculating Function', 'Pattern'), mp('266/B', 'Queue School', 'Simulation'), mp('330/A', 'Cakeminator', 'Grid count'), mp('275/A', 'Lights Out', 'XOR'), mp('208/A', 'Dubstep', 'String')],
        1000: [mp('455/A', 'Boredom', 'Classic DP'), mp('466/C', 'Number of Ways', 'Prefix+DP'), mp('431/C', 'k-Tree', 'Tree DP'), mp('520/B', 'Two Buttons', 'BFS/DP'), mp('230/A', 'Dragons', 'Sort+sim')],
        1100: [mp('313/B', 'Ilya Queries', 'Prefix DP'), mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('467/B', 'Fedor Game', 'Bit DP'), mp('445/A', 'DZY Chessboard', 'Constructive'), mp('433/B', 'Kuriyama Stones', 'Prefix')],
        1200: [mp('118/D', 'Caesars Legions', 'DP+combo'), mp('446/A', 'DZY Sequences', 'LIS var'), mp('264/B', 'Good Sequences', 'DP+NT'), mp('371/C', 'Hamburgers', 'BS'), mp('339/C', 'Xenia Weights', 'Bitmask+BF')],
        1300: [mp('276/D', 'Little Girl Max XOR', 'Bit manip'), mp('289/B', 'Polo Matrix', 'Median'), mp('453/A', 'Little Pony Expected', 'Probability'), mp('446/B', 'DZY Modification', 'Prefix opt'), mp('368/B', 'Sereja Suffixes', 'Suffix')],
        1400: [mp('1350/B', 'Orac Models', 'DP+divisors'), mp('1399/D', 'Binary String Sorting', 'BS+DP'), mp('1352/E', 'Special Elements', 'Prefix+DP'), mp('1353/E', 'K-periodic Garland', 'DP'), mp('1328/D', 'Carousel', 'Greedy+DP')],
        1500: [mp('1234/C', 'Pipes', 'DP+grid'), mp('1294/D', 'MEX maximizing', 'MEX+DP'), mp('1324/D', 'Pair of Topics', 'Sort+BS'), mp('1343/D', 'Constant Palindrome', 'Sweep+DP'), mp('1359/D', 'Yet Another Task', 'Prefix+DP')],
        1600: [mp('1370/D', 'Odd-Even Subseq', 'BS+DP'), mp('1409/E', 'Two Platforms', 'Sort+prefix'), mp('1430/D', 'String Deletion', 'Greedy'), mp('1462/E2', 'Close Subjects', 'Combo'), mp('1494/C', '1D Sokoban', 'Greedy')],
        1700: [mp('1288/C', 'Two Arrays', 'DP+combo'), mp('1324/E', 'Sleeping Schedule', 'DP+mod'), mp('1359/D', 'Yet Another Task', 'Prefix max+DP'), mp('1398/D', 'Colored Rectangles', 'DP+greedy'), mp('1418/C', 'Mortal Kombat', 'DP')],
        1800: [mp('1257/E', 'The Contest', 'DP+prefix'), mp('1301/C', 'Ayoub Palindrome', 'DP+math'), mp('1368/D', 'AND OR NOT', 'DP+bitmask'), mp('1409/F', 'Subseq Length Two', 'DP+string'), mp('1476/D', 'Journey', 'DP')],
        1900: [mp('1312/D', 'Count Arrays', 'Combo'), mp('1334/D', 'Min Euler Cycle', 'Pattern'), mp('1363/E', 'Tree Shuffling', 'Tree DP'), mp('1373/E', 'Sum of Digits', 'Digit DP'), mp('1392/D', 'Omkar Bed Wars', 'Greedy+DP')],
        2000: [mp('1336/C', 'Kaavi Magic Spell', 'Interval DP'), mp('1375/E', 'Inversion SwapSort', 'Constructive'), mp('1396/C', 'Monster Invaders', 'DP+greedy'), mp('1442/B', 'Identify Ops', 'Greedy+set'), mp('1450/D', 'Rating Compression', 'BS')]
    },
    'strings': {
        800: [mp('71/A', 'Way Too Long Words', 'Abbreviation'), mp('112/A', 'Petya Strings', 'Compare'), mp('118/A', 'String Task', 'Processing'), mp('236/A', 'Boy or Girl', 'Unique chars'), mp('266/A', 'Stones Table', 'Adj dupes')],
        900: [mp('58/A', 'Chat Room', 'Subsequence'), mp('133/A', 'HQ9+', 'Interpreter'), mp('520/A', 'Pangram', 'Alphabet'), mp('41/A', 'Translation', 'Reversal'), mp('281/A', 'Word Capital', 'Transform'), mp('59/A', 'Word', 'String case')],
        1000: [mp('320/A', 'Magic Numbers', 'Digit valid'), mp('96/A', 'Football', 'Consecutive'), mp('266/B', 'Queue School', 'Simulation'), mp('342/A', 'Xenia Divisors', 'Grouping'), mp('118/B', 'Present Lena', 'Pattern')],
        1100: [mp('75/A', 'Life Without Zeros', 'String num'), mp('257/B', 'Playing Cubes', 'Game sim'), mp('256/A', 'Eugeny Array', 'Construction'), mp('454/B', 'Sort by Shift', 'Array rot'), mp('136/B', 'Ternary Logic', 'Base conv')],
        1200: [mp('446/A', 'DZY Sequences', 'LIS'), mp('314/B', 'Sereja Periods', 'String period'), mp('447/B', 'DZY Strings', 'Weight assign'), mp('380/C', 'Sereja Brackets', 'Stack'), mp('264/B', 'Good Sequences', 'DP+NT')],
        1300: [mp('444/C', 'DZY Colors', 'Seg tree'), mp('446/C', 'DZY Fibonacci', 'Matrix exp'), mp('314/C', 'Sereja Subseqs', 'Combo'), mp('367/D', 'Sereja Intervals', 'Combo+DP'), mp('380/B', 'Sereja Cinema', 'Sim+opt')],
        1400: [mp('1295/C', 'Obtain the String', 'Greedy+precomp'), mp('1326/D2', 'Prefix-Suffix Palindrome', 'Greedy+string'), mp('1385/C', 'Make It Good', 'Stack'), mp('1428/C', 'ABBB', 'Stack greedy'), mp('1399/D', 'Binary String', 'BS+greedy')],
        1500: [mp('1303/C', 'Perfect Keyboard', 'Graph+string'), mp('1343/D', 'Constant Palindrome', 'Sweep'), mp('1353/E', 'K-periodic Garland', 'DP'), mp('1475/D', 'Cleaning', 'Stack'), mp('1478/C', 'Nezzar Symmetric', 'Impl')],
        1600: [mp('1360/F', 'Spy String', 'BF+impl'), mp('1430/D', 'String Deletion', 'Greedy'), mp('1451/D', 'Circle Game', 'Game'), mp('1462/E1', 'Close Subjects', 'Combo'), mp('1494/C', '1D Sokoban', 'Greedy')],
        1700: [mp('1278/C', 'Berry Jam', 'Prefix+map'), mp('1364/D', 'Ehab Prefix MEXs', 'Constructive'), mp('1409/F', 'Subseq Length Two', 'DP+string'), mp('1419/E', 'Decryption', 'NT'), mp('1490/F', 'Equalize Array', 'Sort+BS')],
        1800: [mp('1301/C', 'Ayoub Palindrome', 'DP+math'), mp('1368/D', 'AND OR NOT', 'DP+bitmask'), mp('1409/F', 'Subseq Length Two', 'DP+string'), mp('1437/E', 'Make Connected', 'MST'), mp('1257/E', 'The Contest', 'DP+prefix')],
        1900: [mp('1334/D', 'Min Euler Cycle', 'Pattern'), mp('1373/E', 'Sum of Digits', 'Digit DP'), mp('1392/D', 'Omkar Bed Wars', 'Greedy+DP'), mp('1395/D', 'Bobonius Jiggly', 'Convex hull'), mp('1451/E1', 'Bitwise Queries', 'Bit tricks')],
        2000: [mp('1336/C', 'Kaavi Magic Spell', 'Interval DP'), mp('1365/F', 'Swaps Again', 'Greedy+pairs'), mp('1381/C', 'Mastermind', 'Constructive'), mp('1396/C', 'Monster Invaders', 'DP'), mp('1453/D', 'Checkpoints', 'Probability')]
    },
    'graphs': {
        800: [mp('69/A', 'Young Physicist', 'Vector sum'), mp('25/A', 'IQ Test', 'Parity'), mp('4/A', 'Watermelon', 'Parity'), mp('263/A', 'Beautiful Matrix', '2D array'), mp('231/A', 'Team', 'Counting')],
        900: [mp('266/B', 'Queue School', 'Simulation'), mp('144/A', 'Arrival General', 'Min/max'), mp('208/A', 'Dubstep', 'String'), mp('116/A', 'Tram', 'Max prefix'), mp('339/B', 'Xenia Ringroad', 'Modular')],
        1000: [mp('520/B', 'Two Buttons', 'BFS'), mp('230/A', 'Dragons', 'Sort+sim'), mp('279/B', 'Books', 'Sliding window'), mp('492/B', 'Vanya Lanterns', 'BS'), mp('455/A', 'Boredom', 'DP')],
        1100: [mp('276/C', 'Little Girl Max Sum', 'Diff array'), mp('381/A', 'Sereja Dima', 'Two ptrs'), mp('433/B', 'Kuriyama Stones', 'Prefix'), mp('313/B', 'Ilya Queries', 'Prefix'), mp('466/C', 'Number of Ways', 'Prefix')],
        1200: [mp('264/B', 'Good Sequences', 'DP+NT'), mp('453/B', 'Little Pony Sun', 'Graph+constr'), mp('463/C', 'Gargari Bishops', 'Chess'), mp('371/C', 'Hamburgers', 'BS'), mp('271/B', 'Prime Matrix', 'Sieve')],
        1300: [mp('453/C', 'Little Pony Harmony', 'Bitmask+DP'), mp('463/D', 'Gargari Perms', 'LIS+graph'), mp('471/F', 'MUH Segments', 'Sweep'), mp('380/D', 'Sereja Tree', 'Tree'), mp('444/C', 'DZY Colors', 'Seg tree')],
        1400: [mp('1328/D', 'Carousel', 'Greedy+graph'), mp('1367/D', 'Task On Board', 'Constructive'), mp('1385/C', 'Make It Good', 'Stack'), mp('1401/C', 'Mere Array', 'GCD'), mp('1433/D', 'Districts Connection', 'Tree')],
        1500: [mp('1303/C', 'Perfect Keyboard', 'Graph+string'), mp('1294/D', 'MEX maximizing', 'MEX'), mp('1343/D', 'Constant Palindrome', 'Sweep'), mp('1433/E', 'Two Round Dances', 'Combo'), mp('1475/D', 'Cleaning', 'Stack')],
        1600: [mp('1265/D', 'Beautiful Sequence', 'Constructive'), mp('1354/D', 'Multiset', 'BS+BIT'), mp('1399/E1', 'Weights Division', 'Tree+greedy'), mp('1454/D', 'Number Primes', 'Factorization'), mp('1494/C', '1D Sokoban', 'Greedy')],
        1700: [mp('1296/E', 'Array Shuffling', 'Cycle+greedy'), mp('1418/C', 'Mortal Kombat', 'DP'), mp('1454/E', 'Simple Paths', 'Tree+DFS'), mp('1474/C', 'Array Destruction', 'Greedy+set'), mp('1498/C', 'Planar Reflections', 'DP')],
        1800: [mp('1253/D', 'Harmonious Graph', 'DSU'), mp('1385/E', 'Directing Edges', 'Topo sort'), mp('1437/E', 'Make Connected', 'MST'), mp('1348/D', 'Phoenix Science', 'Binary+constr'), mp('1415/D', 'XOR Tax', 'Tree')],
        1900: [mp('1307/D', 'Cow and Fields', 'BFS+greedy'), mp('1363/E', 'Tree Shuffling', 'Tree DP'), mp('1437/D', 'Minimal Height Tree', 'BFS'), mp('1436/D', 'Bandit City', 'BS+tree'), mp('1499/D', 'Red-Blue Graph', 'Flow')],
        2000: [mp('1344/C', 'Quantifier Logic', 'Graph+greedy'), mp('1300/D', 'Aerodynamic', 'Geometry'), mp('1305/D', 'Kuroni Impossible', 'Pigeonhole'), mp('1442/B', 'Identify Ops', 'Greedy+set'), mp('1485/D', 'Multiples Power', 'Constructive')]
    },
    'constructive': {
        800: [mp('4/A', 'Watermelon', 'Parity'), mp('263/A', 'Beautiful Matrix', '2D array'), mp('282/A', 'Bit++', 'Simulation'), mp('71/A', 'Way Too Long Words', 'Abbreviation'), mp('231/A', 'Team', 'Counting')],
        900: [mp('118/B', 'Present Lena', 'Pattern'), mp('339/A', 'Helpful Maths', 'Digit sort'), mp('266/B', 'Queue School', 'Simulation'), mp('384/A', 'Coder', 'Grid pattern'), mp('443/A', 'Anton Letters', 'Set ops')],
        1000: [mp('445/A', 'DZY Chessboard', 'Constructive'), mp('342/A', 'Xenia Divisors', 'Grouping'), mp('320/A', 'Magic Numbers', 'Digit valid'), mp('118/B', 'Present Lena', 'Pattern'), mp('256/A', 'Eugeny Array', 'Construction')],
        1100: [mp('259/B', 'Magic Square', 'Construction'), mp('454/B', 'Sort by Shift', 'Array rot'), mp('257/B', 'Playing Cubes', 'Game sim'), mp('75/A', 'Life Without Zeros', 'String num'), mp('256/A', 'Eugeny Array', 'Construction')],
        1200: [mp('453/B', 'Little Pony Sun', 'Graph+constr'), mp('446/A', 'DZY Sequences', 'LIS'), mp('271/B', 'Prime Matrix', 'Sieve'), mp('339/C', 'Xenia Weights', 'Bitmask+BF'), mp('264/B', 'Good Sequences', 'DP+NT')],
        1300: [mp('380/B', 'Sereja Cinema', 'Sim+opt'), mp('367/D', 'Sereja Intervals', 'Combo+DP'), mp('453/C', 'Little Pony Harmony', 'Bitmask+DP'), mp('471/D', 'MUH House Cards', 'Math opt'), mp('380/D', 'Sereja Tree', 'Tree')],
        1400: [mp('1367/D', 'Task On Board', 'Constructive'), mp('1328/D', 'Carousel', 'Greedy+parity'), mp('1385/C', 'Make It Good', 'Stack'), mp('1419/D1', 'Sage Birthday', 'Sort+constr'), mp('1462/C', 'Unique Number', 'Greedy+digits')],
        1500: [mp('1256/D', 'Binary String Min', 'Greedy+constr'), mp('1303/C', 'Perfect Keyboard', 'Graph+string'), mp('1324/D', 'Pair of Topics', 'Sort+BS'), mp('1433/D', 'Districts Connection', 'Tree'), mp('1478/C', 'Nezzar Symmetric', 'Sort+impl')],
        1600: [mp('1265/D', 'Beautiful Sequence', 'Constructive'), mp('1360/F', 'Spy String', 'BF'), mp('1370/D', 'Odd-Even Subseq', 'BS+greedy'), mp('1430/D', 'String Deletion', 'Greedy'), mp('1451/D', 'Circle Game', 'Game+math')],
        1700: [mp('1364/D', 'Ehab Prefix MEXs', 'Constructive'), mp('1208/C', 'Magic Grid', 'XOR+constr'), mp('1474/C', 'Array Destruction', 'Greedy+set'), mp('1490/F', 'Equalize Array', 'Sort'), mp('1498/C', 'Planar Reflections', 'DP')],
        1800: [mp('1348/D', 'Phoenix Science', 'Binary+constr'), mp('1268/C', 'K Rectangles', 'Greedy'), mp('1301/C', 'Ayoub Palindrome', 'DP'), mp('1437/E', 'Make Connected', 'MST'), mp('1476/D', 'Journey', 'DP')],
        1900: [mp('1338/C', 'Perfect Triples', 'Bit+constr'), mp('1312/D', 'Count Arrays', 'Combo'), mp('1334/D', 'Min Euler Cycle', 'Pattern'), mp('1395/D', 'Bobonius Jiggly', 'Convex hull'), mp('1451/E1', 'Bitwise Queries', 'Bit tricks')],
        2000: [mp('1375/E', 'Inversion SwapSort', 'Constructive'), mp('1381/C', 'Mastermind', 'Constructive'), mp('1485/D', 'Multiples Power', 'Constructive'), mp('1365/F', 'Swaps Again', 'Greedy+pairs'), mp('1418/D', 'Trash Problem', 'Set')]
    },
    'brute force': {
        800: [mp('4/A', 'Watermelon', 'Parity'), mp('263/A', 'Beautiful Matrix', '2D array'), mp('282/A', 'Bit++', 'Simulation'), mp('112/A', 'Petya Strings', 'Compare'), mp('231/A', 'Team', 'Counting')],
        900: [mp('58/A', 'Chat Room', 'Subsequence'), mp('155/A', 'I_love_username', 'Min/max'), mp('141/A', 'Amusing Joke', 'Char freq'), mp('520/A', 'Pangram', 'Alphabet'), mp('443/A', 'Anton Letters', 'Set ops')],
        1000: [mp('230/A', 'Dragons', 'Sort+sim'), mp('342/A', 'Xenia Divisors', 'Grouping'), mp('118/B', 'Present Lena', 'Pattern'), mp('279/B', 'Books', 'Sliding window'), mp('96/A', 'Football', 'Consecutive')],
        1100: [mp('425/A', 'Sereja Swaps', 'BF+opt'), mp('467/B', 'Fedor Game', 'Bit count'), mp('257/B', 'Playing Cubes', 'Game sim'), mp('313/A', 'Ilya Bank Account', 'Digit'), mp('270/A', 'Fancy Fence', 'Geometry')],
        1200: [mp('339/C', 'Xenia Weights', 'Bitmask+BF'), mp('371/C', 'Hamburgers', 'BS'), mp('446/A', 'DZY Sequences', 'LIS'), mp('271/B', 'Prime Matrix', 'Sieve'), mp('453/A', 'Little Pony Expected', 'Probability')],
        1300: [mp('276/D', 'Little Girl Max XOR', 'Bit'), mp('118/D', 'Caesars Legions', 'DP+combo'), mp('289/B', 'Polo Matrix', 'Median'), mp('315/A', 'Sereja Bottles', 'Sim+count'), mp('368/B', 'Sereja Suffixes', 'Suffix')],
        1400: [mp('1352/E', 'Special Elements', 'Prefix+BF'), mp('1399/D', 'Binary String', 'BS+BF'), mp('1462/C', 'Unique Number', 'Greedy+digits'), mp('1490/C', 'Sum of Cubes', 'NT+BF'), mp('1494/B', 'Berland Crossword', 'Bitmask+BF')],
        1500: [mp('1324/D', 'Pair of Topics', 'Sort+BS'), mp('1355/C', 'Count Triangles', 'Two ptrs'), mp('1433/E', 'Two Round Dances', 'Combo'), mp('1478/C', 'Nezzar Symmetric', 'Sort+impl'), mp('1475/D', 'Cleaning', 'Stack')],
        1600: [mp('1360/F', 'Spy String', 'BF+impl'), mp('1354/D', 'Multiset', 'BS+BIT'), mp('1409/E', 'Two Platforms', 'Sort+prefix'), mp('1451/D', 'Circle Game', 'Game+math'), mp('1462/E1', 'Close Subjects', 'Combo')],
        1700: [mp('1208/C', 'Magic Grid', 'XOR+constr'), mp('1278/C', 'Berry Jam', 'Prefix+map'), mp('1363/D', 'Guess Value', 'Greedy+bit'), mp('1474/C', 'Array Destruction', 'Greedy+set'), mp('1498/D', 'Bananas Microwave', 'BFS')],
        1800: [mp('1237/D', 'Balanced Playlist', 'Two ptrs'), mp('1253/D', 'Harmonious Graph', 'DSU'), mp('1320/C', 'World Darkraft', 'Sort+sweep'), mp('1368/D', 'AND OR NOT', 'DP+bitmask'), mp('1476/D', 'Journey', 'DP')],
        1900: [mp('1260/D', 'Game with Traps', 'BS'), mp('1284/D', 'New Year Conference', 'Sort+sweep'), mp('1307/D', 'Cow and Fields', 'BFS'), mp('1363/E', 'Tree Shuffling', 'Tree DP'), mp('1437/D', 'Minimal Height Tree', 'BFS')],
        2000: [mp('1300/D', 'Aerodynamic', 'Geometry'), mp('1305/D', 'Kuroni Impossible', 'Pigeonhole'), mp('1336/C', 'Kaavi Magic Spell', 'Interval DP'), mp('1344/C', 'Quantifier Logic', 'Graph'), mp('1442/B', 'Identify Ops', 'Greedy+set')]
    }
};

// Build quick lookup sets
const MATRIX_PROBLEM_IDS = {};
for (const tag of MATRIX_TAGS) {
    MATRIX_PROBLEM_IDS[tag] = new Set();
    const tagData = MATRIX_PROBLEMS[tag] || {};
    for (const rating in tagData) {
        for (const prob of tagData[rating]) {
            MATRIX_PROBLEM_IDS[tag].add(prob.id.replace(/\//g, '-'));
        }
    }
}

// ==========================================
// Theory Matrix Data
// ==========================================
const THEORY_LEVELS = ['beginner', 'intermediate', 'advanced'];
const THEORY_LEVEL_LABELS = { beginner: '🟢 Beginner', intermediate: '🔵 Intermediate', advanced: '🟣 Advanced' };
const THEORY_LEVEL_COLORS = { beginner: '#43a047', intermediate: '#03a9f4', advanced: '#aa00ff' };

const THEORY_TOPICS = [
    {
        topic: 'Python I/O & Setup', icon: '🐍', cells: {
            beginner: { title: 'Python I/O Setup', file: 'Lesson0_Python_IO_Setup.md', desc: 'Fast I/O, input parsing, output formatting' },
            intermediate: null, advanced: null
        }
    },
    {
        topic: 'Math for CP', icon: '🧮', cells: {
            beginner: { title: 'Math Basics', file: 'Lesson1_Math_for_CP.md', desc: 'Arithmetic, modular math, formulas' },
            intermediate: { title: 'Math Deep Dive', file: 'SG_02_Math.md', desc: 'Sieve, GCD, modular arithmetic tricks' },
            advanced: null
        }
    },
    {
        topic: 'Arrays & Strings', icon: '📝', cells: {
            beginner: { title: 'Arrays & Strings', file: 'Lesson2_Arrays_Strings.md', desc: 'Traversal, manipulation, common patterns' },
            intermediate: { title: 'String & Trie', file: 'SG_12_String and Trie.md', desc: 'Hashing, KMP, Z-algo, Tries, Suffix Arrays' },
            advanced: null
        }
    },
    {
        topic: 'Sorting & Greedy', icon: '🔄', cells: {
            beginner: { title: 'Sorting & Greedy', file: 'Lesson3_Sorting_Greedy.md', desc: 'Sorting algorithms, basic greedy strategies' },
            intermediate: { title: 'Greedy & Sweep Line', file: 'SG_15_Greedy and Sweep Line Techniques.md', desc: 'Events, intervals, exchange arguments' },
            advanced: null
        }
    },
    {
        topic: 'Prefix Sums & Two Ptrs', icon: '📊', cells: {
            beginner: { title: 'Prefix Sums & Two Pointers', file: 'Lesson4_Prefix_Sums_Two_Pointers.md', desc: 'Range queries, sliding window basics' },
            intermediate: { title: 'Prefix & Partial Sums', file: 'SG_01_Prefix and Partial Sums.md', desc: 'Difference arrays, 2D prefix sums' },
            advanced: { title: 'Sliding Window Pro', file: 'SG_04_Sliding Window Two Pointers.md', desc: 'Monotonic queue, advanced two pointers' }
        }
    },
    {
        topic: 'Number Theory', icon: '🔢', cells: {
            beginner: { title: 'Number Theory Basics', file: 'Lesson5_Number_Theory.md', desc: 'Primes, divisibility, GCD/LCM' },
            intermediate: null, advanced: null
        }
    },
    {
        topic: 'Binary Search', icon: '🔍', cells: {
            beginner: { title: 'Binary Search', file: 'Lesson6_Binary_Search.md', desc: 'Classic BS, BS on answer' },
            intermediate: { title: 'Binary Search Pro', file: 'SG_03_Binary Search.md', desc: 'Bisect module, advanced patterns' },
            advanced: null
        }
    },
    {
        topic: 'Data Structures', icon: '🏗️', cells: {
            beginner: { title: 'Data Structures', file: 'Lesson7_Data_Structures.md', desc: 'Stacks, queues, heaps, sets, maps' },
            intermediate: { title: 'Segment Trees', file: 'SG_11_Segment Trees With Application and Ideas.md', desc: 'Point/range queries, lazy propagation' },
            advanced: { title: 'Sqrt Decomposition', file: 'SG_16_Square Root Decomposition.md', desc: "Mo's algorithm, block updates" }
        }
    },
    {
        topic: 'Graphs', icon: '🌐', cells: {
            beginner: { title: 'Graphs: BFS & DFS', file: 'Lesson8_Graphs_BFS_DFS.md', desc: 'Traversal, components, cycle detection' },
            intermediate: { title: 'Graphs: Zero to Pro', file: 'SG_07_Graphs_Zero_to_Pro.md', desc: 'Shortest paths, topo sort, MST, SCC' },
            advanced: null
        }
    },
    {
        topic: 'Dynamic Programming', icon: '🧩', cells: {
            beginner: { title: 'DP Fundamentals', file: 'Lesson9_Dynamic_Programming.md', desc: 'States, transitions, classic patterns' },
            intermediate: { title: 'DP Pro', file: 'SG_10_Dynamic_Programming_Pro.md', desc: 'Advanced states, transitions, optimizations' },
            advanced: { title: 'DP with Bitmasking', file: 'SG_13_DP with Bitmasking.md', desc: 'Subset transitions, TSP, SOS DP' }
        }
    },
    {
        topic: 'Combinatorics', icon: '🎲', cells: {
            beginner: { title: 'Combinatorics', file: 'Lesson10_Combinatorics.md', desc: 'Counting, permutations, nCr' },
            intermediate: null,
            advanced: { title: 'Digit DP', file: 'SG_14_Digit DP Techniques.md', desc: 'Counting numbers with properties' }
        }
    },
    {
        topic: 'Trees', icon: '🌳', cells: {
            beginner: { title: 'Trees', file: 'Lesson11_Trees.md', desc: 'Tree properties, traversal, basics' },
            intermediate: { title: 'Trees: Zero to Hero', file: 'SG_08_Trees_Zero_to_Hero.md', desc: 'LCA, tree DP, centroid decomposition' },
            advanced: { title: 'Binary Tree Mastery', file: 'SG_17_Binary Tree Mastery.md', desc: 'BSTs, heaps, reconstruction' }
        }
    },
    {
        topic: 'Recursion & Backtracking', icon: '🔁', cells: {
            beginner: { title: 'Recursion & Backtracking', file: 'Lesson12_Recursion_Backtracking.md', desc: 'State space, pruning, base cases' },
            intermediate: { title: 'Recursion Pro + MITM', file: 'SG_06_Recursion_Backtracking_Meet-in-the-Middle.md', desc: 'Advanced recursion, Meet in the Middle' },
            advanced: null
        }
    },
    {
        topic: 'Shortest Paths', icon: '🛤️', cells: {
            beginner: null,
            intermediate: { title: 'Shortest Paths', file: 'Lesson13_Shortest_Paths.md', desc: 'Dijkstra, Bellman-Ford, Floyd-Warshall' },
            advanced: null
        }
    },
    {
        topic: 'Bit Manipulation', icon: '💡', cells: {
            beginner: null,
            intermediate: { title: 'Bit Manipulation', file: 'SG_05_Bit Manipulation.md', desc: 'Bitwise tricks, XOR, subsets via bitmasks' },
            advanced: null
        }
    },
    {
        topic: 'DSU (Union-Find)', icon: '🔗', cells: {
            beginner: null,
            intermediate: { title: 'DSU', file: 'SG_09_DSU.md', desc: 'Path compression, union by rank, offline' },
            advanced: null
        }
    },
    {
        topic: 'Linked Lists', icon: '🔗', cells: {
            beginner: null, intermediate: null,
            advanced: { title: 'Linked List Techniques', file: 'SG_18_Linked List Atomic Techniques.md', desc: 'Floyd cycle, LRU/LFU structures' }
        }
    }
];
