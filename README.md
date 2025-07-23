# Hello World Sidebar Plugin for PostHog

A simple PostHog plugin that displays a beautiful "Hello World" page in the PostHog sidebar with interactive features.

## Features

- 🚀 **Beautiful Sidebar Page**: Custom-designed interface with gradient background
- ⏰ **Real-time Clock**: Live clock that updates every second
- 🎯 **Interactive Buttons**: Click counter with reset functionality
- ✨ **Modern Design**: Responsive layout with animations
- 📱 **Mobile Friendly**: Works on all screen sizes

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saed-ha/Posthog-Webhook.git
   cd Posthog-Webhook
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Install in PostHog**:
   - Go to your PostHog instance
   - Navigate to **Settings → Plugins**
   - Click **Install from GitHub**
   - Enter: `https://github.com/saed-ha/Posthog-Webhook.git`
   - Click **Install**

## Usage

Once installed, the plugin will:

1. **Show in Sidebar**: The Hello World page will appear in your PostHog sidebar
2. **Interactive Features**: 
   - Click the "Click Me!" button to increment the counter
   - Click "Reset Count" to reset the counter to zero
   - Watch the real-time clock update every second
3. **Logging**: The plugin logs its activity to PostHog's plugin logs

## Plugin Structure

```
├── index.js              # Main plugin logic
├── frontend/index.js     # Sidebar UI component
├── plugin.json          # Plugin configuration
├── package.json         # Dependencies
├── index.test.js        # Unit tests
└── README.md           # This file
```

## Development

### Running Tests
```bash
npm test
```

### Plugin Logs
To view plugin logs in PostHog:
1. Go to **Settings → Plugins**
2. Find "Hello World Sidebar Plugin"
3. Click on the plugin
4. Check the **Logs** tab

## Customization

You can customize the plugin by modifying:

- **Colors**: Update the CSS gradient in `frontend/index.js`
- **Content**: Change the text and features in the sidebar
- **Functionality**: Add new interactive elements
- **Styling**: Modify the CSS classes and animations

## License

MIT License - feel free to use and modify as needed.

## Support

If you encounter any issues:
1. Check the plugin logs in PostHog
2. Ensure the plugin is properly installed
3. Try disabling and re-enabling the plugin 