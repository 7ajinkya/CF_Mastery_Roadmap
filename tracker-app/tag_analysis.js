// ==========================================
// Tag Analysis System for CF Mastery Tracker
// ==========================================

// Tag definitions and problem mappings
const TAG_DEFINITIONS = {
    'math': {
        name: 'Math',
        color: '#FF6B6B',
        icon: '🧮',
        description: 'Number theory, combinatorics, probability, game theory',
        difficultyRange: [800, 1300],
        keyConcepts: ['GCD/LCM', 'Modular arithmetic', 'Prime numbers', 'Combinatorics']
    },
    'implementation': {
        name: 'Implementation',
        color: '#4ECDC4',
        icon: '💻',
        description: 'Direct coding, simulation, parsing, construction',
        difficultyRange: [800, 1200],
        keyConcepts: ['Array manipulation', 'String processing', 'Simulation', 'Construction']
    },
    'greedy': {
        name: 'Greedy',
        color: '#45B7D1',
        icon: '💰',
        description: 'Local optimization, exchange arguments, scheduling',
        difficultyRange: [900, 1400],
        keyConcepts: ['Sorting + greedy', 'Exchange argument', 'Activity selection', 'Scheduling']
    },
    'sorting': {
        name: 'Sorting',
        color: '#96CEB4',
        icon: '🔄',
        description: 'Sorting algorithms, custom comparators, applications',
        difficultyRange: [800, 1200],
        keyConcepts: ['Custom sorting', 'Comparator functions', 'Stable sort', 'Applications']
    },
    'two pointers': {
        name: 'Two Pointers',
        color: '#FFEAA7',
        icon: '👆👆',
        description: 'Sliding window, two pointer techniques, optimization',
        difficultyRange: [900, 1300],
        keyConcepts: ['Sliding window', 'Opposite pointers', 'Same direction', 'Optimization']
    },
    'binary search': {
        name: 'Binary Search',
        color: '#DDA0DD',
        icon: '🔍',
        description: 'Search on arrays, search on answer, optimization',
        difficultyRange: [1000, 1600],
        keyConcepts: ['Binary search on arrays', 'Search on answer', 'Monotonic functions', 'Optimization']
    },
    'prefix sums': {
        name: 'Prefix Sums',
        color: '#98D8C8',
        icon: '📊',
        description: 'Range queries, difference arrays, cumulative operations',
        difficultyRange: [1000, 1400],
        keyConcepts: ['1D prefix sums', '2D prefix sums', 'Difference arrays', 'Range queries']
    },
    'number theory': {
        name: 'Number Theory',
        color: '#F7DC6F',
        icon: '🔢',
        description: 'Primes, modular arithmetic, GCD, number properties',
        difficultyRange: [1000, 1500],
        keyConcepts: ['Prime numbers', 'Sieve of Eratosthenes', 'Modular inverse', 'GCD/LCM']
    },
    'dp': {
        name: 'Dynamic Programming',
        color: '#BB8FCE',
        icon: '🧩',
        description: 'State optimization, memoization, tabulation',
        difficultyRange: [1100, 2000],
        keyConcepts: ['1D DP', '2D DP', 'State design', 'Transitions', 'Memoization']
    },
    'graphs': {
        name: 'Graphs',
        color: '#85C1E9',
        icon: '🕸️',
        description: 'Graph traversal, shortest paths, connectivity',
        difficultyRange: [1200, 1800],
        keyConcepts: ['BFS/DFS', 'Shortest paths', 'Connected components', 'Topological sort']
    },
    'trees': {
        name: 'Trees',
        color: '#82E0AA',
        icon: '🌲',
        description: 'Tree algorithms, DFS, LCA, tree DP',
        difficultyRange: [1300, 1900],
        keyConcepts: ['Tree traversal', 'LCA', 'Tree DP', 'Centroid decomposition']
    },
    'strings': {
        name: 'Strings',
        color: '#F8C471',
        icon: '📝',
        description: 'String algorithms, pattern matching, hashing',
        difficultyRange: [1000, 1700],
        keyConcepts: ['String matching', 'KMP/Z-function', 'Hashing', 'Trie']
    },
    'data structures': {
        name: 'Data Structures',
        color: '#F1948A',
        icon: '🏗️',
        description: 'Advanced data structures, segment trees, BIT',
        difficultyRange: [1400, 2000],
        keyConcepts: ['Segment tree', 'BIT/Fenwick', 'Sparse table', 'Advanced structures']
    },
    'bitmasks': {
        name: 'Bitmasks',
        color: '#85C1E9',
        icon: '🔧',
        description: 'Bit manipulation, subset enumeration, bitmask DP',
        difficultyRange: [1200, 1800],
        keyConcepts: ['Bit operations', 'Subset enumeration', 'Bitmask DP', 'Bit tricks']
    },
    'constructive': {
        name: 'Constructive',
        color: '#D7BDE2',
        icon: '🔨',
        description: 'Construct solutions, existence proofs, algorithms',
        difficultyRange: [1000, 1600],
        keyConcepts: ['Construction algorithms', 'Existence proofs', 'Greedy construction']
    }
};

// Problem to tag mapping (simplified - would be expanded in full implementation)
const PROBLEM_TAGS = {
    // Math problems
    '4A': ['math'],
    '50A': ['math'],
    '791A': ['math'],
    '546A': ['math'],
    '617A': ['math'],
    '148A': ['math'],
    '25A': ['math'],
    '69A': ['math'],
    '318A': ['math', 'math'],
    '9A': ['math', 'probability'],
    '160A': ['math', 'greedy'],
    '230A': ['math', 'greedy', 'sorting'],
    '492B': ['math', 'binary search'],
    
    // Implementation problems
    '71A': ['implementation'],
    '231A': ['implementation'],
    '282A': ['implementation'],
    '263A': ['implementation'],
    '112A': ['implementation', 'strings'],
    '118A': ['implementation', 'strings'],
    '236A': ['implementation', 'strings'],
    '266A': ['implementation'],
    '281A': ['implementation', 'strings'],
    '61A': ['implementation', 'strings'],
    
    // Greedy problems
    '160A': ['greedy', 'math'],
    '230A': ['greedy', 'sorting', 'math'],
    '381A': ['greedy', 'two pointers'],
    '276C': ['greedy', 'sorting', 'prefix sums'],
    '446A': ['greedy', 'dp'],
    
    // Sorting problems
    '405A': ['sorting'],
    '144A': ['sorting'],
    '266B': ['sorting', 'implementation'],
    '339A': ['sorting'],
    
    // Two pointers problems
    '279B': ['two pointers', 'binary search'],
    '1700A': ['two pointers'],
    '381A': ['two pointers', 'greedy'],
    
    // Binary search problems
    '492B': ['binary search', 'math'],
    '371C': ['binary search'],
    '474B': ['binary search', 'prefix sums'],
    '706B': ['binary search'],
    
    // Prefix sums problems
    '276C': ['prefix sums', 'greedy', 'sorting'],
    '1398C': ['prefix sums'],
    '466C': ['prefix sums'],
    '279B': ['prefix sums', 'two pointers', 'binary search'],
    
    // Number theory problems
    '230B': ['number theory'],
    '26A': ['number theory'],
    '1352C': ['number theory', 'math'],
    '1203C': ['number theory'],
    '271B': ['number theory', 'sieve'],
    
    // Additional mappings would continue...
};

// Tag mastery tracking system
class TagMasteryTracker {
    constructor() {
        this.tagProgress = {};
        this.initializeTagProgress();
    }
    
    initializeTagProgress() {
        Object.keys(TAG_DEFINITIONS).forEach(tag => {
            this.tagProgress[tag] = {
                solvedCount: 0,
                totalProblems: 0,
                masteryLevel: 'Novice', // Novice, Apprentice, Competent, Proficient, Expert
                confidence: 0, // 0-100
                lastPracticed: null,
                streak: 0,
                avgDifficulty: 0
            };
        });
    }
    
    // Update tag progress based on solved problems
    updateTagProgress(problemId, rating, tags) {
        tags.forEach(tag => {
            if (this.tagProgress[tag]) {
                this.tagProgress[tag].solvedCount++;
                this.tagProgress[tag].lastPracticed = new Date();
                this.tagProgress[tag].streak++;
                
                // Update average difficulty
                const currentAvg = this.tagProgress[tag].avgDifficulty;
                const count = this.tagProgress[tag].solvedCount;
                this.tagProgress[tag].avgDifficulty = 
                    (currentAvg * (count - 1) + rating) / count;
                
                // Update mastery level
                this.updateMasteryLevel(tag);
            }
        });
    }
    
    updateMasteryLevel(tag) {
        const progress = this.tagProgress[tag];
        const solved = progress.solvedCount;
        const avgDiff = progress.avgDifficulty;
        
        if (solved >= 25 && avgDiff >= TAG_DEFINITIONS[tag].difficultyRange[1] - 100) {
            progress.masteryLevel = 'Expert';
            progress.confidence = 95;
        } else if (solved >= 15 && avgDiff >= TAG_DEFINITIONS[tag].difficultyRange[0] + 200) {
            progress.masteryLevel = 'Proficient';
            progress.confidence = 85;
        } else if (solved >= 8 && avgDiff >= TAG_DEFINITIONS[tag].difficultyRange[0] + 100) {
            progress.masteryLevel = 'Competent';
            progress.confidence = 70;
        } else if (solved >= 3) {
            progress.masteryLevel = 'Apprentice';
            progress.confidence = 50;
        } else {
            progress.masteryLevel = 'Novice';
            progress.confidence = 20;
        }
    }
    
    // Get tag statistics
    getTagStats(tag) {
        return this.tagProgress[tag] || null;
    }
    
    // Get all tags sorted by mastery/confidence
    getSortedTags(sortBy = 'confidence') {
        return Object.entries(this.tagProgress)
            .sort(([,a], [,b]) => b[sortBy] - a[sortBy])
            .map(([tag, data]) => ({
                tag,
                ...data,
                ...TAG_DEFINITIONS[tag]
            }));
    }
    
    // Get weak tags (confidence < 50)
    getWeakTags() {
        return Object.entries(this.tagProgress)
            .filter(([,data]) => data.confidence < 50)
            .map(([tag, data]) => ({
                tag,
                ...data,
                ...TAG_DEFINITIONS[tag]
            }))
            .sort((a, b) => a.confidence - b.confidence);
    }
    
    // Get recommended problems for a tag
    getRecommendedProblems(tag, count = 5) {
        // This would integrate with problem databases
        // For now, return placeholder
        const tagDef = TAG_DEFINITIONS[tag];
        if (!tagDef) return [];
        
        const [minRating, maxRating] = tagDef.difficultyRange;
        return [
            { id: 'RECOMMEND_1', rating: minRating, title: `Practice ${tag} - Easy` },
            { id: 'RECOMMEND_2', rating: minRating + 100, title: `Practice ${tag} - Medium` },
            { id: 'RECOMMEND_3', rating: minRating + 200, title: `Practice ${tag} - Hard` }
        ].slice(0, count);
    }
    
    // Export progress data
    exportProgress() {
        return {
            timestamp: new Date().toISOString(),
            tagProgress: this.tagProgress,
            definitions: TAG_DEFINITIONS
        };
    }
    
    // Import progress data
    importProgress(data) {
        if (data.tagProgress) {
            this.tagProgress = { ...this.tagProgress, ...data.tagProgress };
        }
    }
}

// Confidence tracking system
class ConfidenceTracker {
    constructor() {
        this.confidenceHistory = [];
        this.currentConfidence = 50; // Baseline 50/100
        this.confidenceFactors = {
            solvedProblems: 0,
            streak: 0,
            contestPerformance: 0,
            studyTime: 0,
            reviewFrequency: 0
        };
    }
    
    // Update confidence based on activity
    updateConfidence(activity, value) {
        const factors = {
            'problem_solved': 2,
            'contest_participated': 3,
            'study_session': 1,
            'review_completed': 2,
            'streak_day': 1,
            'upsolved': 3
        };
        
        const change = (factors[activity] || 0) * value;
        this.currentConfidence = Math.max(0, Math.min(100, this.currentConfidence + change));
        
        // Log history
        this.confidenceHistory.push({
            timestamp: new Date().toISOString(),
            activity,
            value,
            confidence: this.currentConfidence
        });
        
        // Keep only last 100 entries
        if (this.confidenceHistory.length > 100) {
            this.confidenceHistory = this.confidenceHistory.slice(-100);
        }
        
        return this.currentConfidence;
    }
    
    // Get confidence trend
    getConfidenceTrend() {
        if (this.confidenceHistory.length < 2) return 0;
        
        const recent = this.confidenceHistory.slice(-10);
        if (recent.length < 2) return 0;
        
        const first = recent[0].confidence;
        const last = recent[recent.length - 1].confidence;
        return last - first;
    }
    
    // Get confidence breakdown
    getConfidenceBreakdown() {
        return {
            current: this.currentConfidence,
            trend: this.getConfidenceTrend(),
            factors: this.confidenceFactors,
            history: this.confidenceHistory.slice(-20)
        };
    }
}

// Spaced repetition system for concepts
class SpacedRepetitionSystem {
    constructor() {
        this.conceptSchedule = new Map();
        this.reviewIntervals = [1, 3, 7, 14, 30, 60, 120]; // days
    }
    
    // Schedule a concept for review
    scheduleConcept(conceptId, difficulty = 'medium') {
        const interval = this.getIntervalForDifficulty(difficulty);
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + interval);
        
        this.conceptSchedule.set(conceptId, {
            conceptId,
            dueDate: dueDate.toISOString(),
            interval,
            difficulty,
            reviewCount: 0,
            lastReviewed: new Date().toISOString()
        });
    }
    
    getIntervalForDifficulty(difficulty) {
        const intervals = {
            'easy': 3,
            'medium': 1,
            'hard': 0.5
        };
        return intervals[difficulty] || 1;
    }
    
    // Get concepts due for review today
    getDueConcepts() {
        const now = new Date();
        const due = [];
        
        for (const [id, schedule] of this.conceptSchedule) {
            const dueDate = new Date(schedule.dueDate);
            if (dueDate <= now) {
                due.push({
                    id,
                    ...schedule,
                    overdueDays: Math.floor((now - dueDate) / (1000 * 60 * 60 * 24))
                });
            }
        }
        
        return due.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    
    // Mark concept as reviewed
    markReviewed(conceptId, performance = 'good') {
        const schedule = this.conceptSchedule.get(conceptId);
        if (!schedule) return;
        
        schedule.lastReviewed = new Date().toISOString();
        schedule.reviewCount++;
        
        // Adjust interval based on performance
        const performanceMultipliers = {
            'excellent': 2.0,
            'good': 1.5,
            'okay': 1.0,
            'poor': 0.5
        };
        
        const multiplier = performanceMultipliers[performance] || 1.0;
        schedule.interval = Math.min(
            Math.max(1, Math.floor(schedule.interval * multiplier)),
            120
        );
        
        const dueDate = new Date(schedule.lastReviewed);
        dueDate.setDate(dueDate.getDate() + schedule.interval);
        schedule.dueDate = dueDate.toISOString();
        
        this.conceptSchedule.set(conceptId, schedule);
    }
    
    // Get review statistics
    getReviewStats() {
        const total = this.conceptSchedule.size;
        const due = this.getDueConcepts().length;
        const overdue = this.getDueConcepts().filter(c => c.overdueDays > 0).length;
        
        return {
            totalConcepts: total,
            dueToday: due,
            overdue: overdue,
            onTrack: total - overdue
        };
    }
}

// Export systems
window.TagMasteryTracker = TagMasteryTracker;
window.ConfidenceTracker = ConfidenceTracker;
window.SpacedRepetitionSystem = SpacedRepetitionSystem;
window.TAG_DEFINITIONS = TAG_DEFINITIONS;
window.PROBLEM_TAGS = PROBLEM_TAGS;