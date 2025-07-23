// Hello World Destination Plugin Configuration UI
// This component provides an interface for configuring the destination

// Add CSS styles
const style = document.createElement('style')
style.textContent = `
.hello-world-destination-config {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.hello-world-destination-config h2 {
    color: #1f2937;
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
}

.hello-world-destination-config .form-group {
    margin-bottom: 1.5rem;
}

.hello-world-destination-config label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
}

.hello-world-destination-config input,
.hello-world-destination-config textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: border-color 0.15s ease-in-out;
}

.hello-world-destination-config input:focus,
.hello-world-destination-config textarea:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.hello-world-destination-config .hint {
    font-size: 0.75rem;
    color: #6b7280;
    margin-top: 0.25rem;
}

.hello-world-destination-config .preview {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-top: 1rem;
}

.hello-world-destination-config .preview h4 {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
}

.hello-world-destination-config .preview-content {
    font-family: monospace;
    font-size: 0.75rem;
    color: #1f2937;
    white-space: pre-wrap;
}

.hello-world-destination-config .status {
    padding: 0.75rem;
    border-radius: 0.375rem;
    margin-top: 1rem;
    font-size: 0.875rem;
}

.hello-world-destination-config .status.success {
    background: #d1fae5;
    color: #065f46;
    border: 1px solid #a7f3d0;
}

.hello-world-destination-config .status.error {
    background: #fee2e2;
    color: #991b1b;
    border: 1px solid #fecaca;
}

.hello-world-destination-config .test-button {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: background-color 0.15s ease-in-out;
}

.hello-world-destination-config .test-button:hover {
    background: #2563eb;
}

.hello-world-destination-config .test-button:disabled {
    background: #9ca3af;
    cursor: not-allowed;
}
`
document.head.appendChild(style)

// Main configuration component
function renderConfig(config, setConfig) {
    const container = document.createElement('div')
    container.className = 'hello-world-destination-config'
    
    // Get current values
    const webhookUrl = config.webhook_url || ''
    const messageTemplate = config.message_template || 'Hello World! Event: {event}'
    
    // Update config function
    function updateConfig(key, value) {
        const newConfig = { ...config, [key]: value }
        setConfig(newConfig)
        renderPreview(newConfig)
    }
    
    // Test webhook function
    async function testWebhook() {
        const testButton = document.getElementById('test-button')
        const statusDiv = document.getElementById('status')
        
        testButton.disabled = true
        testButton.textContent = 'Testing...'
        statusDiv.innerHTML = ''
        
        try {
            const testPayload = {
                message: messageTemplate.replace('{event}', 'test_event'),
                event: 'test_event',
                distinct_id: 'test_user',
                timestamp: new Date().toISOString(),
                properties: { test: true },
                source: 'posthog-hello-world-destination'
            }
            
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testPayload)
            })
            
            if (response.ok) {
                statusDiv.innerHTML = `
                    <div class="status success">
                        ✅ Test successful! Webhook sent successfully (Status: ${response.status})
                    </div>
                `
            } else {
                statusDiv.innerHTML = `
                    <div class="status error">
                        ❌ Test failed! Server responded with status: ${response.status}
                    </div>
                `
            }
        } catch (error) {
            statusDiv.innerHTML = `
                <div class="status error">
                    ❌ Test failed! Error: ${error.message}
                </div>
            `
        } finally {
            testButton.disabled = false
            testButton.textContent = 'Test Webhook'
        }
    }
    
    // Render preview function
    function renderPreview(config) {
        const previewDiv = document.getElementById('preview-content')
        if (previewDiv) {
            const previewPayload = {
                message: config.message_template?.replace('{event}', 'example_event') || 'Hello World! Event: example_event',
                event: 'example_event',
                distinct_id: 'example_user',
                timestamp: new Date().toISOString(),
                properties: { example: true },
                source: 'posthog-hello-world-destination'
            }
            previewDiv.textContent = JSON.stringify(previewPayload, null, 2)
        }
    }
    
    container.innerHTML = `
        <h2>🚀 Hello World Destination Configuration</h2>
        
        <div class="form-group">
            <label for="webhook-url">Webhook URL *</label>
            <input 
                type="url" 
                id="webhook-url"
                value="${webhookUrl}"
                placeholder="https://your-api.com/webhook"
                onchange="updateConfig('webhook_url', this.value)"
            >
            <div class="hint">The URL where events will be sent</div>
        </div>
        
        <div class="form-group">
            <label for="message-template">Message Template</label>
            <textarea 
                id="message-template"
                rows="3"
                placeholder="Hello World! Event: {event}"
                onchange="updateConfig('message_template', this.value)"
            >${messageTemplate}</textarea>
            <div class="hint">Use {event} to include the event name in your message</div>
        </div>
        
        <button 
            id="test-button"
            class="test-button"
            onclick="testWebhook()"
            ${!webhookUrl ? 'disabled' : ''}
        >
            Test Webhook
        </button>
        
        <div id="status"></div>
        
        <div class="preview">
            <h4>Payload Preview</h4>
            <div id="preview-content" class="preview-content">
                ${JSON.stringify({
                    message: messageTemplate.replace('{event}', 'example_event'),
                    event: 'example_event',
                    distinct_id: 'example_user',
                    timestamp: new Date().toISOString(),
                    properties: { example: true },
                    source: 'posthog-hello-world-destination'
                }, null, 2)}
            </div>
        </div>
    `
    
    // Make functions globally available
    window.updateConfig = updateConfig
    window.testWebhook = testWebhook
    
    return container
}

// Export for PostHog
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderConfig }
}

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
    // This will be called by PostHog when the configuration page loads
    window.renderHelloWorldDestinationConfig = renderConfig
} 