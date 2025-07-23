const axios = require('axios')

// Enhanced logging system
function logToPostHog(message, level = 'info', meta = {}) {
    const timestamp = new Date().toISOString()
    const logEntry = {
        timestamp,
        level,
        message,
        plugin: 'webhook-filter',
        ...meta
    }
    
    // Log to console (visible in PostHog logs)
    console.log(`[WebhookFilter] ${timestamp} [${level.toUpperCase()}] ${message}`)
    
    // If you want to store logs in PostHog, you can send them as events
    // This requires additional setup but gives you persistent logs
    try {
        // You can send logs as custom events to PostHog for tracking
        // This is optional but useful for debugging
        if (meta.event) {
            console.log(`[WebhookFilter] Event processed: ${meta.event.event} -> ${meta.success ? 'SENT' : 'SKIPPED'}`)
        }
    } catch (error) {
        console.error(`[WebhookFilter] Error logging: ${error.message}`)
    }
}

// Helper function to evaluate conditions
function evaluateCondition(event, condition) {
    const { property, operator, value } = condition
    
    let eventValue
    
    // Handle different property types
    if (property === 'event_name') {
        eventValue = event.event
    } else if (property === 'distinct_id') {
        eventValue = event.distinct_id
    } else if (property === 'timestamp') {
        eventValue = event.timestamp
    } else {
        // Handle custom properties
        eventValue = event.properties?.[property]
    }
    
    // Handle different operators
    switch (operator) {
        case 'equals':
            return eventValue === value
        case 'not_equals':
            return eventValue !== value
        case 'contains':
            return String(eventValue).includes(String(value))
        case 'not_contains':
            return !String(eventValue).includes(String(value))
        case 'starts_with':
            return String(eventValue).startsWith(String(value))
        case 'ends_with':
            return String(eventValue).endsWith(String(value))
        case 'greater_than':
            return Number(eventValue) > Number(value)
        case 'less_than':
            return Number(eventValue) < Number(value)
        case 'greater_than_or_equal':
            return Number(eventValue) >= Number(value)
        case 'less_than_or_equal':
            return Number(eventValue) <= Number(value)
        case 'is_set':
            return eventValue !== undefined && eventValue !== null
        case 'is_not_set':
            return eventValue === undefined || eventValue === null
        default:
            return false
    }
}

// Helper function to check if event matches all conditions
function eventMatchesConditions(event, conditions) {
    if (!conditions || conditions.length === 0) {
        return true // No conditions means all events match
    }
    
    return conditions.every(condition => evaluateCondition(event, condition))
}

// Helper function to send webhook
async function sendWebhook(webhookUrl, payload, customHeaders = {}) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            ...customHeaders
        }
        
        logToPostHog(`Sending webhook to ${webhookUrl}`, 'info', { webhookUrl, payloadSize: JSON.stringify(payload).length })
        
        const response = await axios.post(webhookUrl, payload, { headers })
        
        logToPostHog(`Webhook sent successfully to ${webhookUrl}. Status: ${response.status}`, 'info', { 
            webhookUrl, 
            status: response.status,
            responseSize: JSON.stringify(response.data).length 
        })
        
        return { success: true, status: response.status }
    } catch (error) {
        logToPostHog(`Failed to send webhook to ${webhookUrl}: ${error.message}`, 'error', { 
            webhookUrl, 
            error: error.message,
            errorCode: error.code 
        })
        return { success: false, error: error.message }
    }
}

// Main plugin function
function processEvent(event, meta) {
    const webhookUrl = meta.config.webhook_url
    const conditions = meta.config.conditions ? JSON.parse(meta.config.conditions) : []
    const includeEventData = meta.config.include_event_data === 'true'
    const customHeaders = meta.config.custom_headers ? JSON.parse(meta.config.custom_headers) : {}
    
    // Log event received
    logToPostHog(`Event received: ${event.event}`, 'info', { 
        event: event.event,
        distinctId: event.distinct_id,
        propertiesCount: Object.keys(event.properties || {}).length
    })
    
    // Check if webhook URL is configured
    if (!webhookUrl) {
        logToPostHog('Webhook URL not configured, skipping event processing', 'warning', { event: event.event })
        return
    }
    
    // Check if event matches conditions
    if (!eventMatchesConditions(event, conditions)) {
        logToPostHog(`Event ${event.event} does not match conditions, skipping`, 'info', { 
            event: event.event,
            conditions: conditions,
            conditionsCount: conditions.length
        })
        return
    }
    
    logToPostHog(`Event ${event.event} matches conditions, sending to webhook`, 'info', { 
        event: event.event,
        conditions: conditions,
        webhookUrl: webhookUrl
    })
    
    // Prepare payload
    const payload = {
        event: event.event,
        distinct_id: event.distinct_id,
        timestamp: event.timestamp,
        properties: event.properties,
        ...(includeEventData && { full_event: event })
    }
    
    // Send webhook asynchronously (don't wait for response)
    sendWebhook(webhookUrl, payload, customHeaders)
        .then(result => {
            if (result.success) {
                logToPostHog(`Successfully sent event ${event.event} to webhook`, 'info', { 
                    event: event.event,
                    webhookUrl: webhookUrl,
                    status: result.status
                })
            } else {
                logToPostHog(`Failed to send event ${event.event} to webhook: ${result.error}`, 'error', { 
                    event: event.event,
                    webhookUrl: webhookUrl,
                    error: result.error
                })
            }
        })
        .catch(error => {
            logToPostHog(`Error sending event ${event.event} to webhook: ${error.message}`, 'error', { 
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