# Black Atom Obsidian Adapter Guide

## Project Overview

This is the Obsidian adapter for Black Atom themes. It implements the Black Atom theme collections (JPN, Stations, Terra, and CRBN) as Obsidian theme files. The adapter uses a hybrid approach combining the adapter pattern with SCSS to create theme files.

## Repository Structure

- **src/**: Source files for the theme
  - **scss/**: SCSS source files
    - **components/**: Component-based SCSS files
    - **main.scss**: Main entry point for the SCSS
- **templates/**: Template files for generating theme tokens
  - **theme-tokens.template.css**: Template for generating theme color tokens
- **.build/**: Temporary directory used during build process
- **theme.css**: The main CSS file (final output)
- **manifest.json**: Theme metadata file
- **black-atom-adapter.json**: Configuration file mapping themes to templates

## Adapter Pattern + SCSS

This repository implements a hybrid approach for Obsidian:

1. **Theme Tokens**: The adapter generates CSS variable files with color tokens from core definitions
2. **SCSS Structure**: Styling is organized into component-based SCSS files
3. **Style Settings**: Configuration at the top of the main SCSS file for theme variant switching
4. **Build Process**: Combines everything into a single theme.css file

## Build Process

1. The core CLI reads the `black-atom-adapter.json` file
2. It processes templates to generate theme token files in the templates directory
3. The build script copies these to a temporary .build directory
4. The SCSS build process compiles the main SCSS file, importing the token files
5. The resulting theme.css file is moved to the repository root
6. The file includes Style Settings configuration for variant switching

## Working with Theme Tokens

The adapter generates CSS variable files with color tokens from core definitions:

```css
.theme-dark.black-atom-stations-engineering {
  --primary-0: #252e2c;
  --primary-1: #2e3f3b;
  /* ...other colors */
  
  --ui-bg-default: #2e3f3b;
  --ui-fg-default: #c1efd5;
  /* ...other UI variables */
}
```

## SCSS Component Structure

The SCSS files are organized into components:

- **_base.scss**: Base styling and variable mapping
- **_typography.scss**: Typography and text styling
- **_editor.scss**: Editor-specific styling
- **_code.scss**: Code block and syntax highlighting
- **_tables.scss**: Table styling
- **_sidebar.scss**: Sidebar and navigation
- **_workspace.scss**: Workspace layout and UI components

## Style Settings Integration

Style Settings plugin configuration is at the top of the main SCSS file:

```scss
/* @settings
name: Black Atom Theme Settings
id: black-atom-theme
settings:
    - 
        id: theme-variant
        title: Theme Variant
        type: class-select
        allowEmpty: false
        default: black-atom-stations-engineering
        options:
            - 
                label: "Stations: Engineering"
                value: black-atom-stations-engineering
*/
```

This allows users to switch between theme variants within the Obsidian interface.

## Development Workflow

The development workflow follows these steps:

1. Edit theme tokens template or SCSS files
2. Run the build process:
   ```
   ./build.sh
   ```
   or for development with auto-reloading:
   ```
   npm run dev
   ```
3. View changes in Obsidian (using symlinks for quick feedback)

## Development with Symlinks

For theme development, it's more efficient to use symlinks:

```bash
# Create the themes directory if it doesn't exist
mkdir -p ~/path/to/vault/.obsidian/themes/Black-Atom

# Create symlinks for the theme files
ln -s ~/repos/black-atom-industries/obsidian/theme.css ~/path/to/vault/.obsidian/themes/Black-Atom/theme.css
ln -s ~/repos/black-atom-industries/obsidian/manifest.json ~/path/to/vault/.obsidian/themes/Black-Atom/manifest.json
```

## Adding New Themes

To add a new theme:

1. Add the theme to `black-atom-adapter.json`
2. Update `src/scss/main.scss` to include the new theme variant in Style Settings
3. Add appropriate styling in the SCSS components for the new theme
4. Run the build process to generate the theme files

## Troubleshooting

- If theme tokens aren't generating properly, check the `black-atom-adapter.json` file
- If SCSS isn't compiling, check for syntax errors in the SCSS files
- Ensure the Style Settings configuration at the top of main.scss is properly formatted
- Make sure the token CSS files are being properly imported in the SCSS

## Commands

- `npm run build`: Build the theme files
- `npm run dev`: Watch for changes and rebuild automatically
- `./build.sh`: Complete build process including token generation and SCSS compilation