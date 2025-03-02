# Black Atom for Obsidian

<div align="center">
  <img src="https://github.com/black-atom-industries/.github/blob/main/profile/assets/black-atom-banner.jpg" alt="Black Atom Banner" style="width:100%"/>
</div>

> A collection of elegant, cohesive themes for Obsidian by Black Atom Industries

## What is a Black Atom Adapter?

This repository is an **Obsidian adapter** for the Black Atom theme ecosystem. In the Black Atom architecture:

- The [core repository](https://github.com/black-atom-industries/core) is the single source of truth for all theme definitions
- Each adapter implements these themes for a specific platform (Neovim, VS Code, Alacritty, etc.)
- The adapter uses templates to transform core theme definitions into platform-specific files

This modular approach ensures consistent colors and styling across all supported platforms while allowing for platform-specific optimizations.

## Available Themes

Black Atom includes multiple theme collections, each with its own distinct style:

| Collection   | Themes                                                     | Description                   |
| ------------ | ---------------------------------------------------------- | ----------------------------- |
| **JPN**      | koyo-hiru, koyo-yoru, tsuki-yoru                           | Japanese-inspired themes      |
| **Stations** | engineering, operations, medical, research                 | Space station-inspired themes |
| **Terra**    | seasons (spring, summer, fall, winter) × time (day, night) | Earth season-inspired themes  |
| **CRBN**     | null, supr                                                 | Minimalist carbon themes      |

All themes are available in both dark and light variants.

## Installation

### Prerequisites

- [Obsidian](https://obsidian.md/) note-taking application
- [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin for Obsidian (optional, for theme variant selection)
- [Black Atom Core](https://github.com/black-atom-industries/core) (for adapting themes)
- [Sass](https://sass-lang.com/) for compiling the theme styles

### Setup

1. Clone this repository:

```bash
git clone https://github.com/black-atom-industries/obsidian.git
cd obsidian
```

2. Install dependencies:

```bash
npm install
```

3. Build the theme:

```bash
./build.sh
```

4. Copy the generated theme to your Obsidian themes directory:

```bash
# Create themes directory if it doesn't exist
mkdir -p /path/to/your/vault/.obsidian/themes/Black-Atom

# Copy the theme files
cp theme.css /path/to/your/vault/.obsidian/themes/Black-Atom/
cp manifest.json /path/to/your/vault/.obsidian/themes/Black-Atom/
```

## Usage

### Applying a Theme in Obsidian

1. Open Obsidian
2. Go to **Settings** → **Appearance**
3. Select "Black Atom" from the dropdown menu
4. The theme will be applied immediately

### Switching Between Theme Variants

To switch between different theme variants (Engineering, Operations, Medical, Research):

1. Install the [Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin
2. Go to **Settings** → **Style Settings** → **Black Atom Theme Settings**
3. Select your preferred theme variant from the dropdown

## Development

### Architecture

The Black Atom Obsidian adapter uses a hybrid approach combining our adapter pattern with SCSS:

1. **Adapter Templates (`templates/`)**: Generate CSS variable files with theme color tokens
2. **SCSS Structure (`src/scss/`)**: Organizes styling into components and handles theme variants
3. **Build Process**: Combines generated tokens with SCSS styling into a cohesive theme

### Workflow

1. **Theme Tokens**: The adapter generates CSS files with theme-specific color tokens
2. **SCSS Components**: Styling is organized into modular SCSS files
3. **Style Settings**: Configuration at the top of the main SCSS file enables variant switching
4. **Build Process**: Combines everything into a single theme.css file

### Theme Structure

Obsidian themes consist of two files:

- **theme.css**: The main CSS file containing all styles for the theme
- **manifest.json**: Metadata for the theme

### Development Workflow

The development workflow follows these steps:

1. Edit theme tokens or SCSS files
2. Run `npm run dev` to watch for changes and automatically rebuild
3. View changes in Obsidian (using symlinks for quick feedback)

### Development with Symlinks

For theme development, it's more efficient to use symlinks rather than copying files:

```bash
# Create the themes directory if it doesn't exist
mkdir -p ~/path/to/vault/.obsidian/themes/Black-Atom

# Create symlinks for the theme files
ln -s ~/repos/black-atom-industries/obsidian/theme.css ~/path/to/vault/.obsidian/themes/Black-Atom/theme.css
ln -s ~/repos/black-atom-industries/obsidian/manifest.json ~/path/to/vault/.obsidian/themes/Black-Atom/manifest.json
```

With symlinks in place, your workflow becomes:

1. Make changes to theme tokens or SCSS files
2. Run `npm run dev` or `./build.sh`
3. Reload Obsidian to see changes immediately

## Contributing

Contributions are welcome! If you'd like to improve existing themes or add new features:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Create a pull request

## License

MIT - See [LICENSE](./LICENSE) for details

## Related Projects

- [Black Atom Core](https://github.com/black-atom-industries/core) - Core theme definitions
- [Black Atom for Neovim](https://github.com/black-atom-industries/nvim) - Neovim adapter
- [Black Atom for Ghostty](https://github.com/black-atom-industries/ghostty) - Ghostty terminal adapter
- [Black Atom for Zed](https://github.com/black-atom-industries/zed) - Zed editor adapter