import os
import json

# Path to study guides (relative to tracker-app)
GUIDES_DIR = "../Study_Guides"
OUTPUT_FILE = "study_data.js"

# Map of ID to filename (from app.js logic)
FILES = {
    0: 'SG_01_Prefix and Partial Sums.md',
    1: 'SG_02_Math.md',
    2: 'SG_03_Binary Search.md',
    3: 'SG_04_Sliding Window Two Pointers.md',
    4: 'SG_05_Bit Manipulation.md',
    5: 'SG_06_Recursion_Backtracking_Meet-in-the-Middle.md',
    6: 'SG_07_Graphs_Zero_to_Pro.md',
    7: 'SG_08_Trees_Zero_to_Hero.md',
    8: 'SG_09_DSU.md',
    9: 'SG_10_Dynamic_Programming_Pro.md',
    10: 'SG_11_Segment Trees With Application and Ideas.md',
    11: 'SG_12_String and Trie.md',
    12: 'SG_13_DP with Bitmasking.md',
    13: 'SG_14_Digit DP Techniques.md',
    14: 'SG_15_Greedy and Sweep Line Techniques.md',
    15: 'SG_16_Square Root Decomposition.md',
    16: 'SG_17_Binary Tree Mastery.md',
    17: 'SG_18_Linked List Atomic Techniques.md'
}

content_map = {}

print("Bundling study guides...")

for id, filename in FILES.items():
    path = os.path.join(GUIDES_DIR, filename)
    try:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            content_map[id] = content
            print(f"Read {filename}")
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        content_map[id] = f"Error loading content locally. Please check {filename}"

# Write to JS file
js_content = f"const STUDY_CONTENT = {json.dumps(content_map, indent=4)};"

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"Successfully wrote {OUTPUT_FILE}")
