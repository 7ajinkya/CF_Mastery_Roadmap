// ==========================================
// Study Material Reader System
// ==========================================

// Study material catalog
const STUDY_MATERIAL_CATALOG = [
    {
        category: '🎯 Core Roadmap',
        icon: '🏆',
        files: [
            { id: 'overview', title: 'CF Roadmap Overview', file: 'CF_Roadmap_Overview.md', type: 'core', priority: 1 },
            { id: 'enhancement', title: 'Enhancement Summary', file: 'Enhancement_Summary.md', type: 'core', priority: 2 }
        ]
    },
    {
        category: '📚 Tag-Based Learning',
        icon: '🏷️',
        files: [
            { id: 'math', title: 'Math Problems (25)', file: 'Tag_Problems/01_Math.md', type: 'tag', priority: 1 },
            { id: 'implementation', title: 'Implementation (25)', file: 'Tag_Problems/02_Implementation.md', type: 'tag', priority: 1 },
            { id: 'greedy', title: 'Greedy Algorithms (20)', file: 'Tag_Problems/03_Greedy.md', type: 'tag', priority: 2 },
            { id: 'sorting', title: 'Sorting & Two Pointers (20)', file: 'Tag_Problems/04_Sorting_TwoPointers.md', type: 'tag', priority: 2 },
            { id: 'binary', title: 'Binary Search (15)', file: 'Tag_Problems/05_BinarySearch.md', type: 'tag', priority: 3 },
            { id: 'prefix', title: 'Prefix Sums (15)', file: 'Tag_Problems/06_PrefixSums.md', type: 'tag', priority: 3 },
            { id: 'number-theory', title: 'Number Theory (15)', file: 'Tag_Problems/07_NumberTheory.md', type: 'tag', priority: 3 }
        ]
    },
    {
        category: '💪 Confidence & Mindset',
        icon: '🧠',
        files: [
            { id: 'confidence', title: 'Confidence Building System', file: 'Confidence_Building_System.md', type: 'mindset', priority: 1 },
            { id: 'contest-prep', title: 'Contest Preparation Guide', file: 'Contest_Preparation_Guide.md', type: 'mindset', priority: 2 },
            { id: 'weekly-review', title: 'Weekly Review Template', file: 'Weekly_Review_Template.md', type: 'mindset', priority: 3 }
        ]
    },
    {
        category: '📖 Phase Guides',
        icon: '📈',
        files: [
            { id: 'phase1', title: 'Phase 1: Foundation', file: 'Phase1_Foundation.md', type: 'phase', priority: 1 },
            { id: 'phase2', title: 'Phase 2: Intermediate', file: 'Phase2_Intermediate.md', type: 'phase', priority: 2 },
            { id: 'phase3', title: 'Phase 3: Advanced Beginner', file: 'Phase3_Advanced_Beginner.md', type: 'phase', priority: 3 },
            { id: 'phase4', title: 'Phase 4: Specialist', file: 'Phase4_Specialist.md', type: 'phase', priority: 4 },
            { id: 'phase5', title: 'Phase 5: Expert Foundation', file: 'Phase5_Expert_Foundation.md', type: 'phase', priority: 5 },
            { id: 'phase6', title: 'Phase 6: Expert', file: 'Phase6_Expert.md', type: 'phase', priority: 6 }
        ]
    },
    {
        category: '🔧 Extended Practice',
        icon: '💪',
        files: [
            { id: 'extended-800', title: 'Extended Problems 800-1200', file: 'Extended_Problems_800_1200.md', type: 'practice', priority: 1 },
            { id: 'extended-1300', title: 'Extended Problems 1300-1900', file: 'Extended_Problems_1300_1900.md', type: 'practice', priority: 2 }
        ]
    },
    {
        category: '🎮 Gamification',
        icon: '🎮',
        files: [
            { id: 'gamification', title: 'Gamification System', file: 'Gamification_System.md', type: 'system', priority: 1 },
            { id: 'ideas', title: 'Ideas Encyclopedia', file: 'Ideas_Encyclopedia.md', type: 'system', priority: 2 }
        ]
    },
    {
        category: '📘 Study Guides',
        icon: '📘',
        files: [
            { id: 'guide0', title: 'SG 01: Prefix and Partial Sums', file: 'Study_Guides/SG_01_Prefix and Partial Sums.md', type: 'guide', priority: 1 },
            { id: 'guide1', title: 'SG 02: Math', file: 'Study_Guides/SG_02_Math.md', type: 'guide', priority: 1 },
            { id: 'guide2', title: 'SG 03: Binary Search', file: 'Study_Guides/SG_03_Binary Search.md', type: 'guide', priority: 1 },
            { id: 'guide3', title: 'SG 04: Sliding Window Two Pointers', file: 'Study_Guides/SG_04_Sliding Window Two Pointers.md', type: 'guide', priority: 2 },
            { id: 'guide4', title: 'SG 05: Bit Manipulation', file: 'Study_Guides/SG_05_Bit Manipulation.md', type: 'guide', priority: 2 },
            { id: 'guide5', title: 'SG 06: Recursion, Backtracking, Meet-in-the-Middle', file: 'Study_Guides/SG_06_Recursion_Backtracking_Meet-in-the-Middle.md', type: 'guide', priority: 3 },
            { id: 'guide6', title: 'SG 07: Graphs: Zero to Pro', file: 'Study_Guides/SG_07_Graphs_Zero_to_Pro.md', type: 'guide', priority: 3 },
            { id: 'guide7', title: 'SG 08: Trees: Zero to Hero', file: 'Study_Guides/SG_08_Trees_Zero_to_Hero.md', type: 'guide', priority: 4 },
            { id: 'guide8', title: 'SG 09: DSU', file: 'Study_Guides/SG_09_DSU.md', type: 'guide', priority: 4 },
            { id: 'guide9', title: 'SG 10: Dynamic Programming Pro', file: 'Study_Guides/SG_10_Dynamic_Programming_Pro.md', type: 'guide', priority: 5 },
            { id: 'guide10', title: 'SG 11: Segment Trees', file: 'Study_Guides/SG_11_Segment Trees With Application and Ideas.md', type: 'guide', priority: 5 },
            { id: 'guide11', title: 'SG 12: String and Trie', file: 'Study_Guides/SG_12_String and Trie.md', type: 'guide', priority: 6 },
            { id: 'guide12', title: 'SG 13: DP with Bitmasking', file: 'Study_Guides/SG_13_DP with Bitmasking.md', type: 'guide', priority: 6 },
            { id: 'guide13', title: 'SG 14: Digit DP Techniques', file: 'Study_Guides/SG_14_Digit DP Techniques.md', type: 'guide', priority: 7 },
            { id: 'guide14', title: 'SG 15: Greedy & Sweep Line', file: 'Study_Guides/SG_15_Greedy and Sweep Line Techniques.md', type: 'guide', priority: 7 },
            { id: 'guide15', title: 'SG 16: Square Root Decomposition', file: 'Study_Guides/SG_16_Square Root Decomposition.md', type: 'guide', priority: 8 },
            { id: 'guide16', title: 'SG 17: Binary Tree Mastery', file: 'Study_Guides/SG_17_Binary Tree Mastery.md', type: 'guide', priority: 8 },
            { id: 'guide17', title: 'SG 18: Linked List Atomic Techniques', file: 'Study_Guides/SG_18_Linked List Atomic Techniques.md', type: 'guide', priority: 9 }
        ]
    }
];

// Simple markdown renderer
class MarkdownRenderer {
    constructor() {
        this.rules = [
            // Headers
            { pattern: /^# (.*$)/gm, replacement: '<h1>$1</h1>' },
            { pattern: /^## (.*$)/gm, replacement: '<h2>$1</h2>' },
            { pattern: /^### (.*$)/gm, replacement: '<h3>$1</h3>' },
            { pattern: /^#### (.*$)/gm, replacement: '<h4>$1</h4>' },

            // Emphasis
            { pattern: /\*\*(.*?)\*\*/g, replacement: '<strong>$1</strong>' },
            { pattern: /\*(.*?)\*/g, replacement: '<em>$1</em>' },
            { pattern: /__(.*?)__/g, replacement: '<strong>$1</strong>' },
            { pattern: /_(.*?)_/g, replacement: '<em>$1</em>' },

            // Lists
            { pattern: /^\* (.*$)/gm, replacement: '<li>$1</li>' },
            { pattern: /^- (.*$)/gm, replacement: '<li>$1</li>' },
            { pattern: /^\d+\. (.*$)/gm, replacement: '<li>$1</li>' },

            // Code
            { pattern: /`(.*?)`/g, replacement: '<code>$1</code>' },

            // Links
            { pattern: /\[([^\]]+)\]\(([^)]+)\)/g, replacement: '<a href="$2" target="_blank">$1</a>' },

            // Horizontal rules
            { pattern: /^---$/gm, replacement: '<hr>' },

            // Blockquotes
            { pattern: /^> (.*$)/gm, replacement: '<blockquote>$1</blockquote>' }
        ];
    }

    render(markdown) {
        let html = markdown;

        // Process lists
        html = this.processLists(html);

        // Apply rules
        this.rules.forEach(rule => {
            html = html.replace(rule.pattern, rule.replacement);
        });

        // Convert newlines to paragraphs
        html = html.replace(/\n\n/g, '</p><p>');
        html = '<p>' + html + '</p>';
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p><(h[1-6]|ul|ol|blockquote|hr|pre)/g, '<$1');
        html = html.replace(/<\/(h[1-6]|ul|ol|blockquote|hr|pre)><\/p>/g, '</$1>');

        return html;
    }

    processLists(text) {
        const lines = text.split('\n');
        let inList = false;
        let listType = '';
        let result = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const unorderedMatch = /^[\*\-] (.*)$/.exec(line);
            const orderedMatch = /^\d+\. (.*)$/.exec(line);

            if (unorderedMatch) {
                if (!inList) {
                    result.push('<ul>');
                    inList = true;
                    listType = 'ul';
                }
                result.push(`<li>${unorderedMatch[1]}</li>`);
            } else if (orderedMatch) {
                if (!inList) {
                    result.push('<ol>');
                    inList = true;
                    listType = 'ol';
                }
                result.push(`<li>${orderedMatch[1]}</li>`);
            } else {
                if (inList) {
                    result.push(`</${listType}>`);
                    inList = false;
                    listType = '';
                }
                result.push(line);
            }
        }

        if (inList) {
            result.push(`</${listType}>`);
        }

        return result.join('\n');
    }
}

// Study material reader system
class StudyMaterialReader {
    constructor() {
        this.renderer = new MarkdownRenderer();
        this.currentFile = null;
        this.history = [];
        this.bookmarks = new Set();
        this.loadBookmarks();
    }

    loadBookmarks() {
        const saved = localStorage.getItem('studyBookmarks');
        if (saved) {
            try {
                const bookmarks = JSON.parse(saved);
                bookmarks.forEach(id => this.bookmarks.add(id));
            } catch (e) {
                console.warn('Failed to load bookmarks:', e);
            }
        }
    }

    saveBookmarks() {
        localStorage.setItem('studyBookmarks', JSON.stringify(Array.from(this.bookmarks)));
    }

    async loadFile(fileId) {
        const fileEntry = this.findFileById(fileId);
        if (!fileEntry) {
            console.error('File entry not found for:', fileId);
            return null;
        }

        try {
            const url = `/api/study/?file=${encodeURIComponent(fileEntry.file)}`;
            console.log('Fetching file from:', url);

            const response = await fetch(url);
            if (!response.ok) {
                console.error(`HTTP ${response.status} for file:`, fileEntry.file);
                throw new Error(`HTTP ${response.status}`);
            }

            const content = await response.text();
            this.currentFile = {
                id: fileId,
                ...fileEntry,
                content: content,
                html: this.renderer.render(content),
                lastAccessed: new Date()
            };

            // Add to history
            this.addToHistory(fileId);

            console.log('Successfully loaded file:', fileId);
            return this.currentFile;
        } catch (error) {
            console.error('Failed to load file:', fileId, error);
            return null;
        }
    }

    findFileById(fileId) {
        for (const category of STUDY_MATERIAL_CATALOG) {
            const file = category.files.find(f => f.id === fileId);
            if (file) return file;
        }
        return null;
    }

    addToHistory(fileId) {
        // Remove if already in history
        this.history = this.history.filter(id => id !== fileId);
        // Add to beginning
        this.history.unshift(fileId);
        // Keep only last 20
        if (this.history.length > 20) {
            this.history = this.history.slice(0, 20);
        }
        this.saveHistory();
    }

    saveHistory() {
        localStorage.setItem('studyHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('studyHistory');
        if (saved) {
            try {
                this.history = JSON.parse(saved);
            } catch (e) {
                console.warn('Failed to load history:', e);
            }
        }
    }

    toggleBookmark(fileId) {
        if (this.bookmarks.has(fileId)) {
            this.bookmarks.delete(fileId);
        } else {
            this.bookmarks.add(fileId);
        }
        this.saveBookmarks();
        return this.bookmarks.has(fileId);
    }

    search(query) {
        const results = [];
        const lowerQuery = query.toLowerCase();

        for (const category of STUDY_MATERIAL_CATALOG) {
            for (const file of category.files) {
                if (file.title.toLowerCase().includes(lowerQuery) ||
                    file.file.toLowerCase().includes(lowerQuery)) {
                    results.push({
                        ...file,
                        category: category.category,
                        categoryIcon: category.icon
                    });
                }
            }
        }

        return results;
    }

    getRecentFiles(count = 5) {
        return this.history.slice(0, count).map(id => this.findFileById(id)).filter(Boolean);
    }

    getBookmarkedFiles() {
        return Array.from(this.bookmarks).map(id => this.findFileById(id)).filter(Boolean);
    }

    getCategoryFiles(categoryName) {
        const category = STUDY_MATERIAL_CATALOG.find(cat => cat.category === categoryName);
        return category ? category.files : [];
    }
}

// Export for global use
window.STUDY_MATERIAL_CATALOG = STUDY_MATERIAL_CATALOG;
window.StudyMaterialReader = StudyMaterialReader;