import os
import json
import re

# Root directory of the project
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TRACKER_DIR = os.path.join(ROOT_DIR, "tracker-app")
OUTPUT_FILE = os.path.join(TRACKER_DIR, "study_content_bundle.js")

def extract_files_from_js(filepath):
    """Extract file paths from STUDY_MATERIAL_CATALOG in study_reader.js"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Simple regex to find "file: '...'"
    matches = re.findall(r"file:\s*['\"]([^'\"]+)['\"]", content)
    return list(set(matches))

def main():
    print(f"Project root: {ROOT_DIR}")
    study_reader_js = os.path.join(TRACKER_DIR, "study_reader.js")
    
    if not os.path.exists(study_reader_js):
        print(f"Error: {study_reader_js} not found")
        return

    files_to_bundle = extract_files_from_js(study_reader_js)
    print(f"Found {len(files_to_bundle)} unique files to bundle")

    bundle = {}
    for rel_path in files_to_bundle:
        full_path = os.path.join(ROOT_DIR, rel_path)
        if os.path.exists(full_path):
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if content.strip():
                        bundle[rel_path] = content
                        print(f"Bundled: {rel_path} ({len(content)} bytes)")
                    else:
                        print(f"Skipping empty file: {rel_path}")
            except Exception as e:
                print(f"Error reading {rel_path}: {e}")
        else:
            print(f"File not found: {rel_path}")

    # Write as a global JS object
    js_content = f"window.STUDY_CONTENT_BUNDLE = {json.dumps(bundle, indent=4)};"
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"\nSuccessfully wrote bundle to {OUTPUT_FILE}")
    print("Next step: Add <script src=\"study_content_bundle.js\"></script> to index.html")

if __name__ == "__main__":
    main()
