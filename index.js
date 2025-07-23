const axios = require('axios')

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
        
        const response = await axios.post(webhookUrl, payload, { headers })
        
        console.log(`Webhook sent successfully to ${webhookUrl}. Status: ${response.status}`)
        return { success: true, status: response.status }
    } catch (error) {
        console.error(`Failed to send webhook to ${webhookUrl}:`, error.message)
        return { success: false, error: error.message }
    }
}

// Main plugin function
function processEvent(event, meta) {
    const webhookUrl = meta.config.webhook_url
    const conditions = meta.config.conditions ? JSON.parse(meta.config.conditions) : []
    const includeEventData = meta.config.include_event_data === 'true'
    const customHeaders = meta.config.custom_headers ? JSON.parse(meta.config.custom_headers) : {}
    
    // Check if webhook URL is configured
    if (!webhookUrl) {
        console.log('Webhook URL not configured, skipping event processing')
        return
    }
    
    // Check if event matches conditions
    if (!eventMatchesConditions(event, conditions)) {
        console.log(`Event ${event.event} does not match conditions, skipping`)
        return
    }
    
    console.log(`Event ${event.event} matches conditions, sending to webhook`)
    
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
                console.log(`Successfully sent event ${event.event} to webhook`)
            } else {
                console.error(`Failed to send event ${event.event} to webhook:`, result.error)
            }
        })
        .catch(error => {
            console.error(`Error sending event ${event.event} to webhook:`, error)
        })
}

// Export the main function
module.exports = {
    processEvent
} 