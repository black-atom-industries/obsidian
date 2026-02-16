#!/bin/bash
set -euo pipefail

echo "Building Black Atom Obsidian theme..."

# Step 1: Generate per-theme CSS files from templates
echo "Generating theme tokens..."
black-atom-core generate

# Step 2: Assemble theme.css
echo "Assembling theme.css..."
cat templates/style-settings.css > theme.css
echo "" >> theme.css

# Concatenate all generated theme CSS files
for dir in templates/*/; do
  for file in "$dir"*.css; do
    # Skip template files and the style-settings header
    [[ "$file" == *.template.css ]] && continue
    [[ "$file" == templates/style-settings.css ]] && continue
    [ -f "$file" ] || continue
    echo "" >> theme.css
    cat "$file" >> theme.css
  done
done

echo "Build complete: theme.css"
