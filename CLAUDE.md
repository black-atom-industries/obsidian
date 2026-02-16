# Black Atom Obsidian Adapter Guide

## Project Overview

This is the Obsidian adapter for Black Atom themes. It uses a pure CSS template approach -- no SCSS, no npm dependencies. The core CLI processes Eta templates to generate per-theme CSS files, and `build.sh` assembles them into a single `theme.css`.

## Repository Structure

```
.
├── .editorconfig
├── .github/
├── .gitignore
├── black-atom-adapter.json    # Adapter config for core CLI
├── build.sh                   # Build script (generate + concatenate)
├── CLAUDE.md                  # Project guide
├── docs/plans/                # Design & implementation plans
├── manifest.json              # Obsidian theme metadata
├── README.md                  # User-facing docs
├── templates/
│   ├── default/
│   │   └── collection.template.css  # Eta template for Default collection
│   ├── interface/                   # Static interface CSS (not Eta-processed)
│   │   ├── scrollbars.css
│   │   ├── borders.css
│   │   ├── typography.css
│   │   └── shadows-accents.css
│   └── style-settings.css           # Style Settings plugin config
└── theme.css                  # Generated output (committed)
```

## How the Adapter Pattern Works

1. `black-atom-core generate` reads `black-atom-adapter.json`
2. For each collection, it processes the Eta template once per theme, injecting the theme object
3. Generated CSS files land next to the template (e.g. `templates/default/black-atom-default-dark.css`)
4. `build.sh` concatenates `templates/style-settings.css` + all generated CSS files + `templates/interface/*.css` into `theme.css`

The `black-atom-adapter.json` maps collections to templates and lists their themes:

```json
{
  "collections": {
    "default": {
      "template": "templates/default/collection.template.css",
      "themes": [
        "black-atom-default-dark",
        "black-atom-default-dark-dimmed",
        "black-atom-default-light",
        "black-atom-default-light-dimmed"
      ]
    }
  }
}
```

## Template Syntax Reference

Templates use [Eta](https://eta.js.org/) syntax. The `theme` object is injected by the core CLI.

**Output a value:**
```
<%= theme.meta.key %>
<%= theme.primaries.d10 %>
<%= theme.palette.red %>
<%= theme.ui.bg.default %>
<%= theme.syntax.keyword.default %>
```

**JavaScript logic:**
```
<% if (theme.meta.appearance === "dark") { %>
  --color-base-00: <%= theme.primaries.d10 %>;
<% } else { %>
  --color-base-00: <%= theme.primaries.l40 %>;
<% } %>
```

**Theme object structure:**
- `theme.meta` -- key, label, appearance, collection
- `theme.primaries` -- d10-d40, m10-m40, l10-l40 (dark/mid/light scale)
- `theme.palette` -- red, green, blue, yellow, cyan, magenta, darkYellow, darkMagenta, etc.
- `theme.ui` -- bg (default, panel, float, hover, active, selection, search, negative, positive, info, warn), fg (default, subtle, disabled, accent, contrast, negative, positive, warn)
- `theme.syntax` -- keyword, func, string, variable, constant, comment, operator, property, punctuation, tag, markup (heading, strong, italic, quote, link, code)

## Development Workflow

1. Edit the template (`templates/default/collection.template.css`), `templates/style-settings.css`, or files in `templates/interface/`
2. Run `./build.sh`
3. Reload Obsidian to see changes

### Symlink Setup

For faster iteration, symlink the output files into your vault:

```bash
mkdir -p ~/path/to/vault/.obsidian/themes/Black-Atom

ln -s ~/repos/black-atom-industries/obsidian/theme.css ~/path/to/vault/.obsidian/themes/Black-Atom/theme.css
ln -s ~/repos/black-atom-industries/obsidian/manifest.json ~/path/to/vault/.obsidian/themes/Black-Atom/manifest.json
```

## Adding New Collections

1. Create a new template directory: `templates/<collection-name>/collection.template.css`
2. Add the collection to `black-atom-adapter.json` with its template path and theme keys
3. Add the new theme variants to `templates/style-settings.css`
4. Run `./build.sh`

## Commands

- `./build.sh` -- Full build (generate tokens + assemble theme.css)
