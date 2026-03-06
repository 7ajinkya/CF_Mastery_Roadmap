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
        category: '🎓 Foundation Lessons',
        icon: '🎓',
        files: [
            { id: 'lesson0', title: 'Lesson 0: Python I/O Setup', file: 'Study_Guides/Lesson0_Python_IO_Setup.md', type: 'lesson', priority: 1 },
            { id: 'lesson1', title: 'Lesson 1: Math for CP', file: 'Study_Guides/Lesson1_Math_for_CP.md', type: 'lesson', priority: 1 },
            { id: 'lesson2', title: 'Lesson 2: Arrays & Strings', file: 'Study_Guides/Lesson2_Arrays_Strings.md', type: 'lesson', priority: 1 },
            { id: 'lesson3', title: 'Lesson 3: Sorting & Greedy', file: 'Study_Guides/Lesson3_Sorting_Greedy.md', type: 'lesson', priority: 2 },
            { id: 'lesson4', title: 'Lesson 4: Prefix Sums & Two Pointers', file: 'Study_Guides/Lesson4_Prefix_Sums_Two_Pointers.md', type: 'lesson', priority: 2 },
            { id: 'lesson5', title: 'Lesson 5: Number Theory Basics', file: 'Study_Guides/Lesson5_Number_Theory.md', type: 'lesson', priority: 2 },
            { id: 'lesson6', title: 'Lesson 6: Binary Search', file: 'Study_Guides/Lesson6_Binary_Search.md', type: 'lesson', priority: 3 },
            { id: 'lesson7', title: 'Lesson 7: Data Structures', file: 'Study_Guides/Lesson7_Data_Structures.md', type: 'lesson', priority: 3 },
            { id: 'lesson8', title: 'Lesson 8: Graphs BFS/DFS', file: 'Study_Guides/Lesson8_Graphs_BFS_DFS.md', type: 'lesson', priority: 3 },
            { id: 'lesson9', title: 'Lesson 9: Dynamic Programming', file: 'Study_Guides/Lesson9_Dynamic_Programming.md', type: 'lesson', priority: 4 },
            { id: 'lesson10', title: 'Lesson 10: Combinatorics', file: 'Study_Guides/Lesson10_Combinatorics.md', type: 'lesson', priority: 4 },
            { id: 'lesson11', title: 'Lesson 11: Trees', file: 'Study_Guides/Lesson11_Trees.md', type: 'lesson', priority: 4 },
            { id: 'lesson12', title: 'Lesson 12: Recursion & Backtracking', file: 'Study_Guides/Lesson12_Recursion_Backtracking.md', type: 'lesson', priority: 5 },
            { id: 'lesson13', title: 'Lesson 13: Shortest Paths', file: 'Study_Guides/Lesson13_Shortest_Paths.md', type: 'lesson', priority: 5 }
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
        if (!fileEntry) return;

        this.showLoading(true);
        this.currentFile = fileEntry;

        try {
            let markdown = '';

            // Priority 1: Check the global bundle (prevents 404s in production)
            if (window.STUDY_CONTENT_BUNDLE && window.STUDY_CONTENT_BUNDLE[fileEntry.file]) {
                console.log('Loading from bundle:', fileEntry.file);
                markdown = window.STUDY_CONTENT_BUNDLE[fileEntry.file];
            } else {
                // Priority 2: Fetch from server (fallback for local dev or missing files)
                console.log('Fetching from server:', fileEntry.file);
                // Encode the URI to handle spaces and special characters
                const url = encodeURI(`/${fileEntry.file}`);
                const response = await fetch(url);
                if (!response.ok) {
                    console.error(`HTTP ${response.status} for file:`, fileEntry.file);
                    throw new Error(`HTTP ${response.status}`);
                }
                markdown = await response.text();
            }

            this.renderMarkdown(markdown);
            this.updateActiveFile(fileId);
            this.saveLastRead(fileId);

            const contentArea = document.getElementById('reader-content');
            if (contentArea) contentArea.scrollTop = 0;
        } catch (error) {
            console.error('Failed to load study material:', error);
            const contentArea = document.getElementById('reader-content');
            if (contentArea) {
                contentArea.innerHTML = `
                    <div class="reader-error">
                        <h3>Failed to load file: ${error.message}</h3>
                        <p>File path: ${fileEntry.file}</p>
                        <p>Please ensure you've run the bundle script or that the file exists in the repository.</p>
                    </div>
                `;
            }
        } finally {
            this.showLoading(false);
        }
    }

    showLoading(show) {
        const contentArea = document.getElementById('reader-content');
        if (!contentArea) return;
        if (show) {
            contentArea.innerHTML = `
                <div class="loading-container">
                    <div class="loading-spinner"></div>
                    <span>Loading material...</span>
                </div>
            `;
        }
    }

    renderMarkdown(markdown) {
        const contentArea = document.getElementById('reader-content');
        if (!contentArea) return;
        const html = this.renderer.render(markdown);
        contentArea.innerHTML = html;
    }

    updateActiveFile(fileId) {
        document.querySelectorAll('.quick-file-link').forEach(link => {
            const onclick = link.getAttribute('onclick');
            if (onclick && onclick.includes(`'${fileId}'`)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        const fileEntry = this.findFileById(fileId);
        if (fileEntry) {
            const titleEl = document.getElementById('reader-file-title');
            const iconEl = document.getElementById('reader-icon');
            if (titleEl) titleEl.textContent = fileEntry.title;
            if (iconEl) iconEl.textContent = fileEntry.icon || '📚';
        }
    }

    saveLastRead(fileId) {
        localStorage.setItem('studyLastRead', fileId);
        this.addToHistory(fileId);
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

// ==========================================
// Global UI Functions
// ==========================================

let currentStudyView = 'browse';
let studyReaderInstance = null;
let currentStudyFileId = null;
let studyMaterialInitialized = false;

function initializeStudyMaterial() {
    if (studyMaterialInitialized && studyReaderInstance) {
        return;
    }

    try {
        studyReaderInstance = new StudyMaterialReader();
        studyReaderInstance.loadHistory();

        renderCategoryGrid();
        renderRecentFiles();
        renderBookmarkedFiles();

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('keypress', function (e) {
                if (e.key === 'Enter') performSearch();
            });
        }

        studyMaterialInitialized = true;
        console.log('Study material system initialized');
    } catch (e) {
        console.error('Failed to initialize study material:', e);
    }
}

function switchStudyView(view) {
    document.querySelectorAll('.study-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-view="${view}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    document.querySelectorAll('.study-view').forEach(viewEl => {
        viewEl.classList.remove('active');
        viewEl.style.display = 'none';
    });

    const targetView = document.getElementById(`${view}-view`);
    if (targetView) {
        targetView.classList.add('active');
        targetView.style.display = 'block';
    }

    currentStudyView = view;
    if (view === 'recent') renderRecentFiles();
    else if (view === 'bookmarks') renderBookmarkedFiles();
}

function renderCategoryGrid() {
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
                    <a href="#" class="quick-file-link" onclick="loadStudyFile('${file.id}')">
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

function renderRecentFiles() {
    if (!studyReaderInstance) return;
    const recentFiles = studyReaderInstance.getRecentFiles(10);
    const container = document.getElementById('recent-files-list');
    if (!container) return;

    if (recentFiles.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">🕒</div>
                <h3 class="empty-title">No Recent Files</h3>
                <p class="empty-message">Explore the library to see recently accessed materials.</p>
            </div>
        `;
        return;
    }

    let html = '<ul>' + recentFiles.map(file => `
        <li>
            <a href="#" class="quick-file-link" onclick="loadStudyFile('${file.id}')">
                <span>${file.title}</span>
            </a>
            <span class="file-meta">${file.type}</span>
        </li>
    `).join('') + '</ul>';
    container.innerHTML = html;
}

function renderBookmarkedFiles() {
    if (!studyReaderInstance) return;
    const bookmarkedFiles = studyReaderInstance.getBookmarkedFiles();
    const container = document.getElementById('bookmarked-files-list');
    if (!container) return;

    if (bookmarkedFiles.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⭐</div>
                <h3 class="empty-title">No Bookmarks Yet</h3>
                <p class="empty-message">Bookmark your favorite guides to see them here.</p>
            </div>
        `;
        return;
    }

    let html = '<ul>' + bookmarkedFiles.map(file => `
        <li>
            <a href="#" class="quick-file-link" onclick="loadStudyFile('${file.id}')">
                <span>${file.title}</span>
            </a>
            <span class="file-meta">${file.type}</span>
        </li>
    `).join('') + '</ul>';
    container.innerHTML = html;
}

async function loadStudyFile(fileId) {
    if (!studyReaderInstance) initializeStudyMaterial();

    document.querySelectorAll('.study-view').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    const readerView = document.getElementById('reader-view');
    if (readerView) {
        readerView.classList.add('active');
        readerView.style.display = 'block';
    }

    try {
        await studyReaderInstance.loadFile(fileId);
        currentStudyFileId = fileId;
        window.currentStudyFileId = fileId; // Expose for theory matrix integration
        console.log(`[DEBUG loadStudyFile] Set currentStudyFileId to: ${fileId} | window.currentStudyFileId = ${window.currentStudyFileId}`);

        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (bookmarkBtn) {
            if (studyReaderInstance.bookmarks.has(fileId)) {
                bookmarkBtn.classList.add('active');
                bookmarkBtn.innerHTML = '<span>⭐</span> Bookmarked';
            } else {
                bookmarkBtn.classList.remove('active');
                bookmarkBtn.innerHTML = '<span>⭐</span> Bookmark';
            }
        }

        // Update Mark as Read button for theory matrix sync
        if (typeof updateMarkAsReadBtn === 'function') {
            updateMarkAsReadBtn();
        }
    } catch (e) {
        console.error('Error loading file:', fileId, e);
    }
}

function closeReader() {
    document.getElementById('reader-view').style.display = 'none';
    switchStudyView(currentStudyView);
    currentStudyFileId = null;
}

function toggleBookmark() {
    if (!currentStudyFileId || !studyReaderInstance) return;
    const isBookmarked = studyReaderInstance.toggleBookmark(currentStudyFileId);
    const bookmarkBtn = document.getElementById('bookmark-btn');
    if (bookmarkBtn) {
        bookmarkBtn.classList.toggle('active', isBookmarked);
        bookmarkBtn.innerHTML = isBookmarked ? '<span>⭐</span> Bookmarked' : '<span>⭐</span> Bookmark';
    }
    if (typeof showToast === 'function') {
        showToast(isBookmarked ? 'Added to bookmarks!' : 'Removed from bookmarks', 'info');
    }
    if (currentStudyView === 'bookmarks') renderBookmarkedFiles();
}

function performSearch() {
    if (!studyReaderInstance) return;
    const query = document.getElementById('search-input').value.trim();
    if (!query) return;

    const results = studyReaderInstance.search(query);
    const container = document.getElementById('search-results');
    const listContainer = document.getElementById('search-results-list');

    if (!container || !listContainer) return;

    if (results.length === 0) {
        listContainer.innerHTML = '<div class="empty-state">No results found.</div>';
    } else {
        listContainer.innerHTML = '<ul>' + results.map(file => `
            <li>
                <a href="#" class="quick-file-link" onclick="loadStudyFile('${file.id}')">
                    <span>${file.categoryIcon} ${file.title}</span>
                </a>
                <span class="file-meta">${file.category}</span>
            </li>
        `).join('') + '</ul>';
    }
    container.style.display = 'block';
}

function toggleStudyFullscreen() {
    const reader = document.querySelector('.reader-container');
    if (reader) {
        reader.classList.toggle('study-fullscreen');
        if (reader.classList.contains('study-fullscreen')) {
            document.body.style.overflow = 'hidden';
            const btn = document.getElementById('fullscreen-btn');
            if (btn) btn.innerHTML = '<span>📴</span> Exit Fullscreen';
        } else {
            document.body.style.overflow = '';
            const btn = document.getElementById('fullscreen-btn');
            if (btn) btn.innerHTML = '<span>⛶</span> Fullscreen';
        }
    }
}

function getCurrentStudyFileId() {
    return currentStudyFileId;
}

// Export functions to window
window.initializeStudyMaterial = initializeStudyMaterial;
window.switchStudyView = switchStudyView;
window.loadStudyFile = loadStudyFile;
window.closeReader = closeReader;
window.toggleBookmark = toggleBookmark;
window.performSearch = performSearch;
window.toggleStudyFullscreen = toggleStudyFullscreen;
window.getCurrentStudyFileId = getCurrentStudyFileId;