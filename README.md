# chrome-tab-archiver

A lightweight Chrome extension that lets you archive the current browser tab into a quarterly-organised bookmark folder in one click or via a keyboard shortcut. It automatically detects or creates your “Archived” root folder, the current `YYYY-Qn` folder (and optional month subfolder), and saves the new bookmark at the top for instant access.

## Features

- **Context-menu & Shortcut**  
  Right-click any page or press your chosen hotkey (e.g. Ctrl+Shift+A) to archive the active tab.

- **Auto-create Folders**  
  Finds or creates:
    - `Archived` root folder
    - Current quarter folder (e.g. `2025-Q2`)
    - Optional month folder (e.g. `May`)

- **Top-of-Folder Insertion**  
  New bookmarks are placed at the top for quick retrieval.

- **Customisable**  
  Configure:
    - Root folder name
    - Whether to use month-based subfolders
    - Keyboard shortcut

## Installation & Development

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/chrome-tab-archiver.git
