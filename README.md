# Logseq Task Unschedule Plugin

A Logseq plugin that automatically removes the `SCHEDULED` property from to-do items when they are marked as complete.

## Features

- 🎯 **Automatic Detection**: Monitors when todo items are marked as complete
- 🗑️ **Auto-removal**: Automatically removes the `SCHEDULED` property from completed todos
- 📝 **Multiple Formats**: Supports various todo completion formats:
  - `TODO` → `DONE` / `CANCELED` / `CANCELLED`
  - `[ ]` → `[x]` (Markdown checkboxes)
  - `-` → `x` (Simple markers)
- 🔧 **Manual Control**: Right-click context menu option for manual removal
- 📊 **Non-intrusive**: Works silently in the background

## Installation

### From Logseq Marketplace (Recommended)

1. Open Logseq
2. Go to Settings → Plugins
3. Click on "Marketplace"
4. Search for "Task Unschedule"
5. Click "Install"

### Manual Installation

1. Download the latest release from [GitHub Releases](https://github.com/twaugh/logseq-plugin-task-unschedule/releases)
2. Extract the ZIP file
3. Open Logseq
4. Go to Settings → Plugins
5. Click "Load unpacked plugin"
6. Select the extracted plugin folder

### Development Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/twaugh/logseq-plugin-task-unschedule.git
   cd logseq-plugin-task-unschedule
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. Load the plugin in Logseq:
   - Open Logseq
   - Go to Settings → Plugins
   - Click "Load unpacked plugin"
   - Select the plugin folder

## Usage

Once installed, the plugin works automatically in the background. Here's how it works:

### Automatic Removal

When you mark a todo as complete, the plugin automatically removes the `SCHEDULED` property:

**Before:**
```
TODO Buy groceries
SCHEDULED: <2024-01-15 Mon>
```

**After marking as DONE:**
```
DONE Buy groceries
```

### Supported Todo Formats

The plugin recognizes these completion patterns:

1. **Logseq Native:**
   - `TODO` → `DONE`
   - `TODO` → `COMPLETED`
   - `TODO` → `CANCELED`
   - `TODO` → `CANCELLED`

2. **Markdown Checkboxes:**
   - `[ ] Task` → `[x] Task`

3. **Simple Markers:**
   - `- Task` → `x Task`

## Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

### Project Structure

```
logseq-plugin-task-unschedule/
├── src/
│   └── main.ts          # Main plugin logic
├── dist/                # Built plugin files
├── package.json         # Plugin metadata
├── index.html          # HTML entry point
├── vite.config.ts      # Build configuration
└── README.md           # This file
```

## Configuration

The plugin works out-of-the-box with no configuration required. It automatically detects various todo completion formats and removes the `SCHEDULED` property accordingly.

## Troubleshooting

### Plugin not working?

1. **Check if the plugin is enabled:**
   - Go to Settings → Plugins
   - Ensure "Task Unschedule" is enabled

2. **Verify todo format:**
   - Make sure your todos use supported formats (TODO, [ ], etc.)

3. **Check console logs:**
   - Open Developer Tools (F12)
   - Look for "Task Unschedule Plugin" messages in the console

### Common Issues

- **SCHEDULED property not removed**: Ensure the todo is properly marked as complete using supported formats
- **Plugin not loading**: Try disabling and re-enabling the plugin in Settings → Plugins

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This plugin is released under the MIT License. See [LICENSE](LICENSE) for details.
