// PostHog Plugin - Sidebar Page
// This plugin opens a custom page in the PostHog sidebar

// Enhanced logging system
function logToPostHog(message, level = 'info', meta = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
        timestamp,
        level,
        message,
        plugin: 'sidebar-hello-world',
        ...meta
    }
    
    // Log to console (visible in PostHog logs)
    console.log(`[SidebarPlugin] ${timestamp} [${level.toUpperCase()}] ${message}`)
}

// Main plugin function - just log that the plugin is loaded
function processEvent(event, meta) {
    // Log that plugin is working
    logToPostHog(`Plugin loaded and processing events`, 'info', { 
        event: event.event,
        distinctId: event.distinct_id
    })
    
    // This plugin doesn't process events, it just shows a sidebar page
    // The actual functionality is in the frontend component
}

// Export the main function
module.exports = {
    processEvent
} 