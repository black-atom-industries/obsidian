# Black Atom for Obsidian

A theme for [Obsidian](https://obsidian.md/) by
[Black Atom Industries](https://github.com/black-atom-industries).

## Available Themes

| Collection  | Variants                               |
| ----------- | -------------------------------------- |
| **Default** | Dark, Dark Dimmed, Light, Light Dimmed |

## Installation

Copy `theme.css` and `manifest.json` into your vault's theme directory:

```bash
mkdir -p /path/to/vault/.obsidian/themes/Black-Atom
cp theme.css manifest.json /path/to/vault/.obsidian/themes/Black-Atom/
```

Then in Obsidian: **Settings > Appearance > Theme > Black Atom**.

## Configuration

Install the
[Style Settings](https://github.com/mgmeyers/obsidian-style-settings) plugin to
switch between theme variants:

**Settings > Style Settings > Black Atom > Theme Variant**

## Development

This adapter uses a pure CSS template approach. The
[core CLI](https://github.com/black-atom-industries/core) processes Eta
templates to generate per-theme CSS, and `build.sh` assembles them into
`theme.css`.

```bash
git clone https://github.com/black-atom-industries/obsidian.git
cd obsidian
```

Edit templates in `templates/`, then build:

```bash
./build.sh
```

For faster iteration, symlink into your vault instead of copying:

```bash
mkdir -p ~/path/to/vault/.obsidian/themes/Black-Atom
ln -s "$(pwd)/theme.css" ~/path/to/vault/.obsidian/themes/Black-Atom/theme.css
ln -s "$(pwd)/manifest.json" ~/path/to/vault/.obsidian/themes/Black-Atom/manifest.json
```

## Related Projects

- [Black Atom Core](https://github.com/black-atom-industries/core) -- Core theme
  definitions
- [Black Atom for Neovim](https://github.com/black-atom-industries/nvim) --
  Neovim adapter
- [Black Atom for Ghostty](https://github.com/black-atom-industries/ghostty) --
  Ghostty terminal adapter
- [Black Atom for Zed](https://github.com/black-atom-industries/zed) -- Zed
  editor adapter

## License

MIT
