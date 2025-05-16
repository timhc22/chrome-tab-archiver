# Chrome Tab Archiver

Vibe Coded.

A lightweight Chrome extension that lets you archive the current tab into a quarterly-organised bookmark folder with one click (context-menu) or via a keyboard shortcut.

## Features

- **Quick Archive**: Archive tabs via context menu or keyboard shortcut (Ctrl+Shift+A)
- **Organized Structure**: Automatically organizes bookmarks into quarterly and monthly folders
- **Smart Folder Creation**: Only creates folders for the current quarter and month
- **Top Placement**: New bookmarks are added at the top of their respective folders

## Installation

### From Source

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/chrome-tab-archiver.git
   cd chrome-tab-archiver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   # For development (includes manifest and icon)
   npm run dev

   # For production build
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked"
   - Select the `dist` directory (not the root directory)

### Development

For development with automatic rebuilding:
```bash
npm run watch
```

After making changes:
1. The TypeScript files will be automatically recompiled
2. Copy the `manifest.json` and `icon.svg` to the `dist` directory
3. Reload the extension in Chrome

## Usage

### Archiving Tabs

You can archive the current tab in two ways:

1. **Context Menu**:
   - Right-click anywhere on the page
   - Select "Archive to current quarter"

2. **Keyboard Shortcut**:
   - Press `Ctrl+Shift+A` (Windows/Linux) or `Cmd+Shift+A` (Mac)

### Folder Structure

The extension creates the following structure in your bookmarks:
```
Bookmarks Bar
└── (Archived)
    └── YYYY-Qn (e.g., 2024-Q2)
        └── Month (e.g., May)
            └── [Your archived bookmarks]
```

- The "(Archived)" folder is created if it doesn't exist
- Quarterly folders (e.g., "2024-Q2") are created only for the current quarter
- Monthly folders are created only for the current month
- New bookmarks are added at the top of their respective folders

## Development

### Project Structure

- `manifest.json` - Extension configuration
- `background.ts` - Core functionality
- `icon.svg` - Extension icon
- `tsconfig.json` - TypeScript configuration
- `package.json` - Project dependencies

### Building

The extension is written in TypeScript and needs to be compiled before use. There are several npm scripts available:

```bash
# Clean the dist directory
npm run clean

# Build for production
npm run build

# Build for development (includes manifest and icon)
npm run dev

# Watch for changes during development
npm run watch
```

## License

MIT License - feel free to use this in your own projects!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
