// PostHog Destination Plugin - Hello World
// This plugin sends events to a Hello World destination

// Enhanced logging system
function logToPostHog(message, level = 'info', meta = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
        timestamp,
        level,
        message,
        plugin: 'hello-world-destination',
        ...meta
    }
    
    // Log to console (visible in PostHog logs)
    console.log(`[HelloWorldDestination] ${timestamp} [${level.toUpperCase()}] ${message}`)
}

// Helper function to send webhook
async function sendWebhook(webhookUrl, payload) {
    try {
        logToPostHog(`Sending webhook to ${webhookUrl}`, 'info', { webhookUrl, payloadSize: JSON.stringify(payload).length })
        
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        
        const responseData = await response.text()
        
        logToPostHog(`Webhook sent successfully. Status: ${response.status}`, 'info', { 
            webhookUrl, 
            status: response.status,
            responseSize: responseData.length 
        })
        
        return { success: true, status: response.status }
    } catch (error) {
        logToPostHog(`Failed to send webhook: ${error.message}`, 'error', { 
            webhookUrl, 
            error: error.message
        })
        return { success: false, error: error.message }
    }
}

// Main plugin function
function processEvent(event, meta) {
    const webhookUrl = meta.config.webhook_url
    const messageTemplate = meta.config.message_template || 'Hello World! Event: {event}'
    
    // Check if webhook URL is configured
    if (!webhookUrl) {
        logToPostHog('Webhook URL not configured, skipping event', 'warning', { event: event.event })
        return
    }
    
    // Log event received
    logToPostHog(`Event received: ${event.event}`, 'info', { 
        event: event.event,
        distinctId: event.distinct_id,
        propertiesCount: Object.keys(event.properties || {}).length
    })
    
    // Prepare message using template
    const message = messageTemplate.replace('{event}', event.event)
    
    // Prepare payload
    const payload = {
        message: message,
        event: event.event,
        distinct_id: event.distinct_id,
        timestamp: event.timestamp,
        properties: event.properties,
        source: 'posthog-hello-world-destination'
    }
    
    // Send webhook asynchronously
    sendWebhook(webhookUrl, payload)
        .then(result => {
            if (result.success) {
                logToPostHog(`Successfully sent event ${event.event} to Hello World destination`, 'info', { 
                    event: event.event,
                    webhookUrl: webhookUrl,
                    status: result.status
                })
            } else {
                logToPostHog(`Failed to send event ${event.event}: ${result.error}`, 'error', { 
                    event: event.event,
                    webhookUrl: webhookUrl,
                    error: result.error
                })
            }
        })
        .catch(error => {
            logToPostHog(`Error sending event ${event.event}: ${error.message}`, 'error', { 
                event: event.event,
                webhookUrl: webhookUrl,
                error: error.message
            })
        })
}

// Export the main function
module.exports = {
    processEvent
} 