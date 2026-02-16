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
for file in templates/*.css; do
  # Skip source files (templates, style-settings)
  [[ "$file" == *.template.css ]] && continue
  [[ "$file" == templates/style-settings.css ]] && continue
  [ -f "$file" ] || continue
  echo "" >> theme.css
  cat "$file" >> theme.css
done

# Append static interface customizations
for file in templates/interface/*.css; do
  [ -f "$file" ] || continue
  echo "" >> theme.css
  cat "$file" >> theme.css
done

echo "Build complete: theme.css"
