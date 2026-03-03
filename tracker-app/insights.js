// ==========================================
// CF Insights — 6 Confidence-Building Features
// All data stored in localStorage under 'insights_*' keys
// ==========================================

// ── Shared Helpers ───────────────────────
function insightsDate(ts) {
    const d = new Date(ts);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function insightsNow() { return Date.now(); }
function insightsSave(key, val) { localStorage.setItem('insights_' + key, JSON.stringify(val)); }
function insightsLoad(key, def) {
    try { const r = localStorage.getItem('insights_' + key); return r ? JSON.parse(r) : def; }
    catch(e) { return def; }
}

// ============================================================
// 1. AHA MOMENT LOG
// ============================================================
let ahaEntries = insightsLoad('aha', []);

function ahaRender() {
    const container = document.getElementById('aha-entries-list');
    if (!container) return;
    if (ahaEntries.length === 0) {
        container.innerHTML = `<div class="evidence-empty"><div class="evidence-empty-icon">💡</div>No Aha moments recorded yet. Add your first one above!</div>`;
        updateAhaAccuracy();
        return;
    }
    container.innerHTML = ahaEntries.slice().reverse().map((e, ri) => {
        const i = ahaEntries.length - 1 - ri;
        return `
        <div class="aha-entry">
          <div class="aha-entry-header">
            <span class="aha-entry-problem">🔗 ${e.problem || 'Unnamed problem'}</span>
            <div style="display:flex;align-items:center;gap:8px">
              <span class="aha-entry-date">${insightsDate(e.ts)}</span>
              <button class="aha-delete-btn" onclick="ahaDelete(${i})" title="Delete">✕</button>
            </div>
          </div>
          <div class="aha-entry-noticed">👀 Noticed: <em>${e.noticed || '—'}</em></div>
          <div class="aha-entry-trigger">⚡ Trigger: ${e.trigger || '—'}</div>
          ${e.timeToClick ? `<div class="aha-entry-time">⏱ Clicked in: ${e.timeToClick} min</div>` : ''}
        </div>`;
    }).join('');
    updateAhaAccuracy();
}

function updateAhaAccuracy() {
    const el = document.getElementById('aha-accuracy-fill');
    const pct_el = document.getElementById('aha-accuracy-pct');
    if (!el) return;
    // Simple heuristic: ratio of entries with both "noticed" and "trigger" filled
    const total = ahaEntries.length;
    if (total === 0) { el.style.width = '0%'; if (pct_el) pct_el.textContent = '0%'; return; }
    const complete = ahaEntries.filter(e => e.noticed && e.trigger).length;
    const pct = Math.round((complete / total) * 100);
    el.style.width = pct + '%';
    if (pct_el) pct_el.textContent = pct + '%';
}

function ahaAdd() {
    const problem = document.getElementById('aha-problem').value.trim();
    const noticed = document.getElementById('aha-noticed').value.trim();
    const trigger = document.getElementById('aha-trigger').value.trim();
    const timeToClick = document.getElementById('aha-time').value.trim();
    if (!problem || !noticed) { showToast('Please fill in at least the problem and what you noticed.', 'warning'); return; }
    ahaEntries.push({ problem, noticed, trigger, timeToClick, ts: insightsNow() });
    insightsSave('aha', ahaEntries);
    document.getElementById('aha-problem').value = '';
    document.getElementById('aha-noticed').value = '';
    document.getElementById('aha-trigger').value = '';
    document.getElementById('aha-time').value = '';
    ahaRender();
    showToast('+10 XP — Aha moment logged! Your pattern library grows 🧠', 'success');
}

function ahaDelete(i) {
    ahaEntries.splice(i, 1);
    insightsSave('aha', ahaEntries);
    ahaRender();
}

// ============================================================
// 2. SOLVE-WITHOUT-SOLVING  (Pattern Recognition Drill)
// ============================================================
// Uses solved problems from `state` (app.js global)
let swsSession = insightsLoad('sws_session', { correct: 0, total: 0 });
let swsCurrent = null;
let swsRevealed = false;

// Problem pool: from the user's own solved list (pulls live from state)
function swsGetPool() {
    if (typeof state === 'undefined' || !state.solvedProblems) return [];
    const pool = [];
    for (const [pid, p] of state.solvedProblems) {
        if (p.tags && p.tags.length > 0 && p.name) {
            pool.push({ pid, name: p.name, tags: p.tags, rating: p.rating || 800 });
        }
    }
    return pool;
}

function swsPickRandom() {
    const pool = swsGetPool();
    if (pool.length < 3) return null;
    return pool[Math.floor(Math.random() * pool.length)];
}

function swsLoad() {
    swsCurrent = swsPickRandom();
    swsRevealed = false;
    const area = document.getElementById('sws-problem-area');
    const result = document.getElementById('sws-result-box');
    if (!area) return;
    if (!swsCurrent) {
        area.innerHTML = `<div class="evidence-empty"><div class="evidence-empty-icon">🤔</div>Solve more problems first to unlock the Pattern Drill! You need at least 3 problems with tags.</div>`;
        return;
    }
    if (result) { result.style.display = 'none'; result.className = 'sws-result-box'; }
    document.getElementById('sws-guess').value = '';
    area.innerHTML = `
      <div class="sws-problem-box">
        <div class="sws-problem-id">Problem #${swsCurrent.pid}</div>
        <div class="sws-problem-name">${swsCurrent.name}</div>
        <div class="sws-tags" id="sws-tags-reveal" style="display:none">
          ${swsCurrent.tags.map(t => `<span class="sws-tag">${t}</span>`).join('')}
        </div>
        <span class="sws-rating-badge" id="sws-rating-reveal" style="display:none">⭐ ${swsCurrent.rating}</span>
      </div>`;
    swsUpdateStats();
}

function swsReveal() {
    if (!swsCurrent || swsRevealed) return;
    swsRevealed = true;
    const guessEl = document.getElementById('sws-guess');
    const guess = guessEl ? guessEl.value.trim().toLowerCase() : '';
    const result = document.getElementById('sws-result-box');
    const tagsDiv = document.getElementById('sws-tags-reveal');
    const ratingDiv = document.getElementById('sws-rating-reveal');
    if (tagsDiv) tagsDiv.style.display = 'flex';
    if (ratingDiv) ratingDiv.style.display = '';

    // Check: does guess mention at least one actual tag?
    const tags = swsCurrent.tags.map(t => t.toLowerCase());
    const isCorrect = tags.some(t => guess.includes(t));

    swsSession.total++;
    if (isCorrect) swsSession.correct++;
    insightsSave('sws_session', swsSession);

    if (result) {
        result.style.display = 'block';
        if (isCorrect) {
            result.className = 'sws-result-box correct';
            result.textContent = `✅ Correct! You spotted: ${swsCurrent.tags.join(', ')}`;
        } else {
            result.className = 'sws-result-box incorrect';
            result.textContent = `❌ Not quite. Actual tags: ${swsCurrent.tags.join(', ')}. Keep training — this is how recognition is built!`;
        }
    }
    swsUpdateStats();
}

function swsNext() { swsLoad(); }
function swsSkip() { swsLoad(); }

function swsUpdateStats() {
    const el = document.getElementById('sws-correct-count');
    const el2 = document.getElementById('sws-total-count');
    const el3 = document.getElementById('sws-accuracy-pct');
    if (el) el.textContent = swsSession.correct;
    if (el2) el2.textContent = swsSession.total;
    const pct = swsSession.total > 0 ? Math.round((swsSession.correct / swsSession.total) * 100) : 0;
    if (el3) el3.textContent = pct + '%';
}

// ============================================================
// 3. NEMESIS TAG WEEK
// ============================================================
let nemesisData = insightsLoad('nemesis', { active: null, history: [] });

const NEMESIS_TIPS = {
    'dp': 'Define state explicitly before coding. Ask: what varies between subproblems?',
    'greedy': 'Prove it with exchange argument. Why is swapping never beneficial?',
    'graphs': 'Model the problem first — what are nodes? What are edges?',
    'binary search': 'Ask: is the predicate monotonic? What is the invariant?',
    'math': 'Check parity, mod, GCD first. Most math problems have a pattern.',
    'constructive algorithms': 'Work backwards from the target. What invariant must be maintained?',
    'number theory': 'Factor everything. Euler\'s totient and modular inverse are your friends.',
    'strings': 'Think KMP/Z-function for prefix/suffix patterns. Hashing for equality.',
    'data structures': 'Match the operation to the data structure. Query type determines tool.',
    'sortings': 'Sorting + two pointers covers 80% of array problems. Try it first.',
    'two pointers': 'Expand right until condition fails; shrink left until it holds again.',
    'bitmasks': 'n ≤ 20 means bitmask DP. Enumerate subsets with (sub-1)&mask.',
    'trees': 'Root it, DFS it, reroot it. Most tree info flows bottom-up.',
    'brute force': 'Enumerate all cases ≤ n=15, then optimize constraints up.',
    'default': 'Focus on recognizing the pattern instantly — not just solving it.'
};

function nemesisGetTopWeakTags() {
    if (typeof state === 'undefined') return [];
    const tagCounts = state.tagCounts || {};
    const allKnown = ['dp', 'greedy', 'graphs', 'binary search', 'math', 'constructive algorithms',
        'number theory', 'strings', 'data structures', 'sortings', 'two pointers', 'bitmasks', 'trees', 'brute force'];
    // Sort tags by count ascending (weakest first)
    return allKnown.sort((a, b) => (tagCounts[a] || 0) - (tagCounts[b] || 0));
}

function nemesisRender() {
    const selectEl = document.getElementById('nemesis-tag-select');
    const activeEl = document.getElementById('nemesis-active-zone');
    const histEl = document.getElementById('nemesis-history-list');

    // Populate select
    if (selectEl && !selectEl.options.length) {
        const weak = nemesisGetTopWeakTags();
        weak.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t;
            opt.textContent = t + ' (' + ((state && state.tagCounts && state.tagCounts[t]) || 0) + ' solved)';
            selectEl.appendChild(opt);
        });
    }

    // Render active week
    if (activeEl) {
        const active = nemesisData.active;
        if (active) {
            const now = Date.now();
            const daysLeft = Math.max(0, Math.ceil((active.endTs - now) / 86400000));
            const tagCount = (state && state.tagCounts && state.tagCounts[active.tag]) || 0;
            const progress = Math.min(1, (tagCount - active.startCount) / Math.max(1, active.goal));
            const tip = NEMESIS_TIPS[active.tag] || NEMESIS_TIPS['default'];
            activeEl.innerHTML = `
              <div class="nemesis-active">
                <div class="nemesis-active-header">
                  <span class="nemesis-tag-badge">🐉 ${active.tag.toUpperCase()}</span>
                  <span class="nemesis-days-left">${daysLeft > 0 ? daysLeft + ' days left' : '⚡ Week complete!'}</span>
                </div>
                <div class="nemesis-progress-row">
                  <div class="nemesis-track">
                    <div class="nemesis-fill" style="width:${Math.round(progress*100)}%"></div>
                  </div>
                  <span class="nemesis-count">${tagCount - active.startCount}/${active.goal} problems</span>
                </div>
                <div class="nemesis-tip">💡 Tip: ${tip}</div>
                ${daysLeft === 0 ? `<button class="nemesis-start-btn" style="margin-top:12px" onclick="nemesisComplete()">✅ Mark Complete & Record</button>` : ''}
              </div>`;
        } else {
            activeEl.innerHTML = '<div style="color:var(--text-muted);font-size:14px;padding:10px 0">No active Nemesis Week. Start one above! 👆</div>';
        }
    }

    // Render history
    if (histEl) {
        const hist = nemesisData.history;
        if (!hist.length) { histEl.innerHTML = '<div style="color:var(--text-muted);font-size:13px">No completed Nemesis Weeks yet.</div>'; return; }
        histEl.innerHTML = hist.slice().reverse().map(h => `
          <div class="nemesis-hist-row">
            <span class="nemesis-hist-tag">🐉 ${h.tag}</span>
            <span class="nemesis-hist-count">+${h.gained} solved</span>
            <span class="nemesis-hist-date">${insightsDate(h.ts)}</span>
          </div>`).join('');
    }
}

function nemesisStart() {
    const selectEl = document.getElementById('nemesis-tag-select');
    if (!selectEl) return;
    const tag = selectEl.value;
    if (!tag) return;
    const goal = parseInt(document.getElementById('nemesis-goal').value || '10');
    const startCount = (state && state.tagCounts && state.tagCounts[tag]) || 0;
    nemesisData.active = { tag, startCount, goal, startTs: Date.now(), endTs: Date.now() + 7 * 86400000 };
    insightsSave('nemesis', nemesisData);
    nemesisRender();
    showToast(`Nemesis Week started: ${tag.toUpperCase()}! Defeat ${goal} problems this week 🐉`, 'success', 4000);
}

function nemesisComplete() {
    if (!nemesisData.active) return;
    const tagCount = (state && state.tagCounts && state.tagCounts[nemesisData.active.tag]) || 0;
    const gained = tagCount - nemesisData.active.startCount;
    nemesisData.history.push({ tag: nemesisData.active.tag, gained, ts: Date.now() });
    nemesisData.active = null;
    insightsSave('nemesis', nemesisData);
    const selectEl = document.getElementById('nemesis-tag-select');
    if (selectEl) { while (selectEl.options.length) selectEl.remove(0); }
    nemesisRender();
    showToast(`Nemesis Week complete! +${gained} ${nemesisData.history.slice(-1)[0]?.tag || ''} problems vanquished 🏆`, 'success', 5000);
}

// ============================================================
// 4. FAILURE AUTOPSY
// ============================================================
let autopsyEntries = insightsLoad('autopsy', []);
let autopsySelectedCause = null;

const AUTOPSY_CAUSES = [
    'Wrong Model', 'Edge Case', 'TLE / Complexity', 'Wrong Formula',
    'Panicked', 'Overthought', 'Implementation Bug', 'Misread Problem'
];

function autopsyRender() {
    const list = document.getElementById('autopsy-list');
    const insightsEl = document.getElementById('autopsy-insights-area');
    if (!list) return;

    // Render cause frequency chart
    if (insightsEl) {
        const counts = {};
        AUTOPSY_CAUSES.forEach(c => { counts[c] = 0; });
        autopsyEntries.forEach(e => { if (e.cause) counts[e.cause] = (counts[e.cause] || 0) + 1; });
        const maxCount = Math.max(...Object.values(counts), 1);
        const topCause = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
        insightsEl.innerHTML = `
          <div class="autopsy-insights">
            <h4>📊 Root Cause Frequency (${autopsyEntries.length} autopsies)</h4>
            <div class="autopsy-cause-bars">
              ${AUTOPSY_CAUSES.map(c => `
                <div class="autopsy-cause-row">
                  <span class="autopsy-cause-name">${c}</span>
                  <div class="autopsy-cause-track"><div class="autopsy-cause-fill" style="width:${Math.round((counts[c]/maxCount)*100)}%"></div></div>
                  <span class="autopsy-cause-count">${counts[c]}</span>
                </div>`).join('')}
            </div>
            ${topCause && topCause[1] > 0 ? `<div class="autopsy-top-nemesis">🎯 Main culprit: <strong>${topCause[0]}</strong> — target this in your next practice session!</div>` : ''}
          </div>`;
    }

    if (autopsyEntries.length === 0) {
        list.innerHTML = `<div class="evidence-empty"><div class="evidence-empty-icon">🔬</div>No autopsies yet. Log your first failure to find patterns.</div>`;
        return;
    }
    list.innerHTML = autopsyEntries.slice().reverse().map(e => `
      <div class="autopsy-entry">
        <div class="autopsy-entry-left">
          <div class="autopsy-entry-problem">${e.problem || 'Unknown problem'}</div>
          <div class="autopsy-entry-approach">My approach: ${e.approach || '—'}</div>
          <div class="autopsy-entry-fix">Fix: ${e.fix || '—'}</div>
        </div>
        ${e.cause ? `<span class="autopsy-cause-chip">${e.cause}</span>` : ''}
      </div>`).join('');
}

function autopsySelectCause(cause, el) {
    autopsySelectedCause = cause;
    document.querySelectorAll('.autopsy-cause-btn').forEach(b => b.classList.remove('selected'));
    el.classList.add('selected');
}

function autopsySubmit() {
    const problem = document.getElementById('autopsy-problem').value.trim();
    const approach = document.getElementById('autopsy-approach').value.trim();
    const fix = document.getElementById('autopsy-fix').value.trim();
    if (!problem) { showToast('Please enter the problem ID/name.', 'warning'); return; }
    autopsyEntries.push({ problem, approach, fix, cause: autopsySelectedCause, ts: insightsNow() });
    insightsSave('autopsy', autopsyEntries);
    document.getElementById('autopsy-problem').value = '';
    document.getElementById('autopsy-approach').value = '';
    document.getElementById('autopsy-fix').value = '';
    autopsySelectedCause = null;
    document.querySelectorAll('.autopsy-cause-btn').forEach(b => b.classList.remove('selected'));
    autopsyRender();
    showToast('Autopsy logged. Patterns become clear over time 🔬', 'success');
}

// ============================================================
// 5. EVIDENCE FILE (30-Day Evidence Journal)
// ============================================================
let evidenceEntries = insightsLoad('evidence', []);

const EVIDENCE_ICONS = ['🚀', '⚡', '💡', '🏆', '🎯', '✅', '🔥', '💪', '🌟', '🧠'];

function evidenceRender() {
    const list = document.getElementById('evidence-list');
    const badge = document.getElementById('evidence-streak-badge');
    if (!list) return;

    // Check 30-day streak badge
    if (badge) {
        const today = new Date().toDateString();
        const last7 = evidenceEntries.filter(e => Date.now() - e.ts < 7 * 86400000);
        if (last7.length >= 7) {
            badge.style.display = 'flex';
            badge.querySelector('.esb-text').textContent = `🔥 ${last7.length} entries this week — Evidence compounding!`;
        } else {
            badge.style.display = 'none';
        }
    }

    if (evidenceEntries.length === 0) {
        list.innerHTML = `<div class="evidence-empty"><div class="evidence-empty-icon">📋</div>Your Evidence File is empty. Start documenting your wins — even tiny ones!</div>`;
        return;
    }
    list.innerHTML = evidenceEntries.slice().reverse().map((e, ri) => {
        const i = evidenceEntries.length - 1 - ri;
        const icon = EVIDENCE_ICONS[i % EVIDENCE_ICONS.length];
        return `
        <div class="evidence-entry">
          <div class="evidence-icon">${icon}</div>
          <div class="evidence-text-col">
            <div class="evidence-text">${e.text}</div>
            <div class="evidence-date">${insightsDate(e.ts)}</div>
          </div>
          <button class="evidence-del-btn" onclick="evidenceDelete(${i})" title="Remove">✕</button>
        </div>`;
    }).join('');
}

function evidenceAdd() {
    const input = document.getElementById('evidence-input');
    const text = input ? input.value.trim() : '';
    if (!text) { showToast('Write something you\'re proud of today!', 'warning'); return; }
    evidenceEntries.push({ text, ts: insightsNow() });
    insightsSave('evidence', evidenceEntries);
    if (input) input.value = '';
    evidenceRender();
    showToast('Evidence logged! Your file grows stronger every day 📋', 'success');
}

function evidenceDelete(i) {
    evidenceEntries.splice(i, 1);
    insightsSave('evidence', evidenceEntries);
    evidenceRender();
}

// ============================================================
// 6. CALIBRATION CONTESTS
// ============================================================
let calibData = insightsLoad('calib', []);
let calibSelectedMetrics = new Set();

const CALIB_METRIC_OPTIONS = [
    'Read all problems first', 'Moved on when stuck', 'Submitted confidently',
    'No panic', 'Correct time allocation', 'Solved in order of difficulty',
    'Caught own bugs', 'Clean implementation', 'Recognized pattern fast', 'No wrong approaches'
];

function calibRender() {
    const list = document.getElementById('calib-history-list');
    const trend = document.getElementById('calib-trend-area');
    if (!list) return;

    if (calibData.length === 0) {
        list.innerHTML = `<div class="evidence-empty"><div class="evidence-empty-icon">🏁</div>No calibration contests logged yet. Run a blind virtual contest and record your decision quality!</div>`;
        if (trend) trend.style.display = 'none';
        return;
    }

    list.innerHTML = calibData.slice().reverse().map(c => `
      <div class="calib-entry">
        <div class="calib-entry-header">
          <span class="calib-entry-name">🏁 ${c.name || 'Virtual Contest'}</span>
          <span class="calib-entry-date">${insightsDate(c.ts)}</span>
        </div>
        <div class="calib-scores">
          <span class="calib-score-chip">Solved: <span>${c.solved}/${c.total}</span></span>
          <span class="calib-score-chip">Rating est: <span>${c.ratingEst || '—'}</span></span>
          <span class="calib-score-chip">Process score: <span>${c.processScore}/${CALIB_METRIC_OPTIONS.length}</span></span>
        </div>
        ${c.metrics && c.metrics.length ? `<div class="calib-metrics-list">${c.metrics.map(m => `<span class="calib-metric-tag">✓ ${m}</span>`).join('')}</div>` : ''}
      </div>`).join('');

    // Trend bars
    if (trend && calibData.length > 1) {
        trend.style.display = 'block';
        const recent = calibData.slice(-8);
        const maxScore = CALIB_METRIC_OPTIONS.length;
        trend.querySelector('.calib-trend-bars').innerHTML = recent.map(c => {
            const h = Math.round((c.processScore / maxScore) * 56) + 4;
            return `<div class="calib-trend-bar-wrap">
              <div class="calib-trend-bar" style="height:${h}px" title="Score: ${c.processScore}/${maxScore}"></div>
              <div class="calib-trend-bar-lbl">${new Date(c.ts).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</div>
            </div>`;
        }).join('');
    } else if (trend) {
        trend.style.display = 'none';
    }
}

function calibToggleMetric(metric, el) {
    if (calibSelectedMetrics.has(metric)) {
        calibSelectedMetrics.delete(metric);
        el.classList.remove('selected');
    } else {
        calibSelectedMetrics.add(metric);
        el.classList.add('selected');
    }
}

function calibSave() {
    const name = document.getElementById('calib-name').value.trim();
    const solved = parseInt(document.getElementById('calib-solved').value) || 0;
    const total = parseInt(document.getElementById('calib-total').value) || 4;
    const ratingEst = document.getElementById('calib-rating').value.trim();
    const metrics = [...calibSelectedMetrics];
    calibData.push({ name, solved, total, ratingEst, metrics, processScore: metrics.length, ts: insightsNow() });
    insightsSave('calib', calibData);
    // Reset form
    document.getElementById('calib-name').value = '';
    document.getElementById('calib-solved').value = '';
    document.getElementById('calib-rating').value = '';
    calibSelectedMetrics.clear();
    document.querySelectorAll('.calib-metric-btn').forEach(b => b.classList.remove('selected'));
    document.getElementById('calib-form-area').style.display = 'none';
    calibRender();
    showToast(`Calibration contest logged! Process score: ${metrics.length}/${CALIB_METRIC_OPTIONS.length} 🏁`, 'success');
}

// ============================================================
// TAB RENDERER — builds the entire Insights tab HTML
// ============================================================
function renderInsightsTab() {
    const tab = document.getElementById('tab-insights');
    if (!tab) return;
    if (tab.dataset.initialized === '1') {
        // Just refresh dynamic parts
        ahaRender();
        swsUpdateStats();
        nemesisRender();
        autopsyRender();
        evidenceRender();
        calibRender();
        return;
    }
    tab.dataset.initialized = '1';

    tab.innerHTML = `
    <!-- ===== AHA MOMENT LOG ===== -->
    <div class="insights-section-title">💡 Aha Moment Log</div>
    <p style="color:var(--text-secondary);font-size:14px;margin-bottom:18px">Every time a pattern <em>clicks</em>, record it here. After 30 entries you'll have your personal recognition encyclopedia — calibrated to your own brain.</p>
    <div class="insights-grid">
      <div class="insights-card">
        <h3>📝 Log New Aha Moment</h3>
        <div class="aha-log-form">
          <div class="aha-row">
            <input id="aha-problem" placeholder="Problem ID or name (e.g. 455A)">
            <input id="aha-time" type="number" placeholder="Time to click (min)" style="max-width:160px">
          </div>
          <textarea id="aha-noticed" placeholder="What did you notice? (e.g. 'array elements ≤ n → pigeonhole')"></textarea>
          <textarea id="aha-trigger" placeholder="Mental trigger for next time? (e.g. 'see bounded elements → think pigeonhole')"></textarea>
          <button class="aha-add-btn" onclick="ahaAdd()">+ Log Aha Moment</button>
        </div>
        <div class="aha-accuracy-bar">
          <span class="aha-accuracy-label">Pattern completeness</span>
          <div class="aha-accuracy-track"><div class="aha-accuracy-fill" id="aha-accuracy-fill" style="width:0%"></div></div>
          <span class="aha-accuracy-pct" id="aha-accuracy-pct">0%</span>
        </div>
      </div>
      <div class="insights-card">
        <h3>📚 Your Aha Library (${() => ahaEntries.length})</h3>
        <div class="aha-list" id="aha-entries-list" style="max-height:380px;overflow-y:auto"></div>
      </div>
    </div>

    <!-- ===== PATTERN RECOGNITION DRILL ===== -->
    <div class="insights-section-title">🎯 Pattern Recognition Drill</div>
    <p style="color:var(--text-secondary);font-size:14px;margin-bottom:18px">See a problem from your solved history. Guess its tags <em>before</em> revealing them. When your accuracy hits 70%, your rating will move. This is exactly what separates 1200 from 1600.</p>
    <div class="insights-card sws-card" style="margin-bottom:24px">
      <h3>🔍 Solve Without Solving</h3>
      <div id="sws-problem-area"></div>
      <div class="sws-guess-area" style="margin-top:14px">
        <label>What topic/approach does this feel like? (e.g. "greedy, binary search")</label>
        <input id="sws-guess" class="sws-guess-input" placeholder="Type your guess...">
      </div>
      <div class="sws-btn-row">
        <button class="sws-btn sws-btn-reveal" onclick="swsReveal()">👁 Reveal Tags</button>
        <button class="sws-btn sws-btn-next" onclick="swsNext()">→ Next Problem</button>
        <button class="sws-btn sws-btn-skip" onclick="swsSkip()">Skip</button>
      </div>
      <div class="sws-result-box" id="sws-result-box"></div>
      <div class="sws-stats-row">
        <div class="sws-stat"><div class="sws-stat-val" id="sws-correct-count">0</div><div class="sws-stat-lbl">Correct</div></div>
        <div class="sws-stat"><div class="sws-stat-val" id="sws-total-count">0</div><div class="sws-stat-lbl">Total</div></div>
        <div class="sws-stat"><div class="sws-stat-val" id="sws-accuracy-pct">0%</div><div class="sws-stat-lbl">Accuracy</div></div>
      </div>
    </div>

    <!-- ===== NEMESIS TAG WEEK ===== -->
    <div class="insights-section-title">🐉 Nemesis Tag Week</div>
    <p style="color:var(--text-secondary);font-size:14px;margin-bottom:18px">Pick your weakest tag and go to war with it for 7 days — nothing else. Concentrated exposure builds myelin faster for that specific pattern than spreading practice evenly.</p>
    <div class="insights-grid">
      <div class="insights-card">
        <h3>⚔️ Declare Your Nemesis</h3>
        <div class="nemesis-selector">
          <label>Choose your weakest tag (auto-sorted by your solves):</label>
          <div class="nemesis-controls">
            <select id="nemesis-tag-select" class="nemesis-select"></select>
            <input id="nemesis-goal" type="number" value="10" min="5" max="50" style="width:80px;background:var(--bg-secondary);border:1px solid var(--border);color:var(--text-primary);border-radius:var(--radius-sm);padding:10px;font-size:14px" title="Goal: problems to solve in 7 days">
            <button class="nemesis-start-btn" onclick="nemesisStart()">🐉 Start Nemesis Week</button>
          </div>
        </div>
        <div id="nemesis-active-zone"></div>
      </div>
      <div class="insights-card">
        <h3>📜 Nemesis Hall of Fame</h3>
        <div class="nemesis-history" id="nemesis-history-list"></div>
      </div>
    </div>

    <!-- ===== FAILURE AUTOPSY ===== -->
    <div class="insights-section-title">🔬 Failure Autopsy</div>
    <p style="color:var(--text-secondary);font-size:14px;margin-bottom:18px">When you fail or struggle, don't just move on — dissect it. After 8 entries, one root cause always dominates. That's your real training target.</p>
    <div class="insights-grid">
      <div class="insights-card">
        <h3>📋 Log a Failure</h3>
        <div class="autopsy-form">
          <div>
            <label>Problem ID / Name</label>
            <input id="autopsy-problem" placeholder="e.g. 1234C or 'Binary String Problem'">
          </div>
          <div>
            <label>My approach (what I tried)</label>
            <textarea id="autopsy-approach" placeholder="I tried to sort and then use greedy..."></textarea>
          </div>
          <div>
            <label>Root cause (circle one):</label>
            <div class="autopsy-cause-grid">
              ${AUTOPSY_CAUSES.map(c => `<button class="autopsy-cause-btn" onclick="autopsySelectCause('${c}',this)">${c}</button>`).join('')}
            </div>
          </div>
          <div>
            <label>One thing I'll do differently next time</label>
            <textarea id="autopsy-fix" placeholder="I'll check parity invariant before jumping to brute force..."></textarea>
          </div>
          <button class="autopsy-submit-btn" onclick="autopsySubmit()">🔬 Log Autopsy</button>
        </div>
      </div>
      <div class="insights-card">
        <h3>📊 Pattern Analysis</h3>
        <div id="autopsy-insights-area"></div>
        <h3 style="margin-top:18px">📁 Past Autopsies</h3>
        <div class="autopsy-list" id="autopsy-list"></div>
      </div>
    </div>

    <!-- ===== EVIDENCE FILE ===== -->
    <div class="insights-section-title">📋 30-Day Evidence File</div>
    <p style="color:var(--text-secondary);font-size:14px;margin-bottom:18px">Confidence built on evidence doesn't collapse the way feelings-based confidence does. Every day, add one concrete proof that you are improving. When doubt hits — open this file.</p>
    <div class="insights-card" style="margin-bottom:24px">
      <h3>✍️ Add Evidence</h3>
      <div id="evidence-streak-badge" class="evidence-streak-badge" style="display:none">
        <span class="esb-icon">🔥</span>
        <div><div class="esb-text"></div><div class="esb-sub">Keep it up — evidence compounds!</div></div>
      </div>
      <div class="evidence-add-form">
        <input id="evidence-input" class="evidence-add-input" placeholder='e.g. "Recognized binary search on answer in <2 min — didn\'t need to read tags first"'>
        <button class="evidence-add-btn" onclick="evidenceAdd()">+ Add Evidence</button>
      </div>
      <div class="evidence-list" id="evidence-list"></div>
    </div>

    <!-- ===== CALIBRATION CONTESTS ===== -->
    <div class="insights-section-title">🏁 Calibration Contests</div>
    <p style="color:var(--text-secondary);font-size:14px;margin-bottom:18px">Once a week, do a blind virtual contest from 2+ years ago. Track <em>decision quality</em> — not just score. Process metrics improve faster than rating and are its leading indicator.</p>
    <div class="insights-card calib-card" style="margin-bottom:40px">
      <h3>📊 Log a Calibration Contest</h3>
      <button class="calib-new-btn" onclick="document.getElementById('calib-form-area').style.display='block';this.style.display='none'">+ Log New Calibration Contest</button>
      <div id="calib-form-area" style="display:none">
        <div class="calib-form">
          <div>
            <label>Contest Name / Round</label>
            <input id="calib-name" placeholder="e.g. Div.2 Round 750 (virtual)">
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap">
            <div style="flex:1;min-width:100px">
              <label>Problems Solved</label>
              <input id="calib-solved" type="number" min="0" placeholder="2">
            </div>
            <div style="flex:1;min-width:100px">
              <label>Total Problems</label>
              <input id="calib-total" type="number" min="1" value="4">
            </div>
            <div style="flex:1;min-width:120px">
              <label>Rating Estimate</label>
              <input id="calib-rating" placeholder="e.g. 1350">
            </div>
          </div>
          <div>
            <label>Process quality check (select all that applied):</label>
            <div class="calib-metrics">
              ${CALIB_METRIC_OPTIONS.map(m => `<button class="calib-metric-btn" onclick="calibToggleMetric('${m}',this)">${m}</button>`).join('')}
            </div>
          </div>
          <button class="calib-save-btn" onclick="calibSave()">💾 Save Contest</button>
        </div>
      </div>
      <div class="calib-history" id="calib-history-list"></div>
      <div id="calib-trend-area" class="calib-trend" style="display:none">
        <h4>📈 Process Score Trend</h4>
        <div class="calib-trend-bars"></div>
      </div>
    </div>`;

    // Now load all data
    ahaRender();
    swsLoad();
    swsUpdateStats();
    nemesisRender();
    autopsyRender();
    evidenceRender();
    calibRender();

    // Fix dynamic library count in aha header
    const ahaHeader = tab.querySelector('.insights-card:nth-child(2) h3');
    if (ahaHeader) ahaHeader.textContent = `📚 Your Aha Library (${ahaEntries.length})`;
}

// Hook into showTab
(function patchShowTab() {
    const _orig = window.showTab;
    if (typeof _orig !== 'function') {
        // app.js not loaded yet, retry once
        setTimeout(patchShowTab, 200);
        return;
    }
    window.showTab = function(tabId, element) {
        _orig(tabId, element);
        if (tabId === 'insights') renderInsightsTab();
    };
})();
