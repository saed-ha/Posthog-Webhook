// PostHog App - Hello World Sidebar
// This plugin creates a custom app in PostHog

// Enhanced logging system
function logToPostHog(message, level = 'info', meta = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
        timestamp,
        level,
        message,
        plugin: 'hello-world-sidebar',
        ...meta
    }
    
    // Log to console (visible in PostHog logs)
    console.log(`[HelloWorldApp] ${timestamp} [${level.toUpperCase()}] ${message}`)
}

// Main plugin function
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