// Webhook Filter Plugin Configuration UI
// This component provides an interactive interface for configuring the plugin

// Load CSS styles
const style = document.createElement('style')
style.textContent = `
/* Webhook Filter Plugin Styles */

.webhook-filter-config {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 800px;
    margin: 0 auto;
}

.webhook-filter-config .space-y-6 > * + * {
    margin-top: 1.5rem;
}

.webhook-filter-config .bg-bg-light {
    background-color: #f8f9fa;
}

.webhook-filter-config .rounded-lg {
    border-radius: 0.5rem;
}

.webhook-filter-config .p-4 {
    padding: 1rem;
}

.webhook-filter-config .mb-3 {
    margin-bottom: 0.75rem;
}

.webhook-filter-config .mb-4 {
    margin-bottom: 1rem;
}

.webhook-filter-config .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
}

.webhook-filter-config .font-semibold {
    font-weight: 600;
}

.webhook-filter-config .font-medium {
    font-weight: 500;
}

.webhook-filter-config .text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}

.webhook-filter-config .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}

.webhook-filter-config .text-muted {
    color: #6c757d;
}

.webhook-filter-config .text-blue-800 {
    color: #1e40af;
}

.webhook-filter-config .bg-blue-50 {
    background-color: #eff6ff;
}

.webhook-filter-config .bg-white {
    background-color: #ffffff;
}

.webhook-filter-config .bg-gray-100 {
    background-color: #f3f4f6;
}

.webhook-filter-config .border {
    border: 1px solid #e5e7eb;
}

.webhook-filter-config .rounded {
    border-radius: 0.25rem;
}

.webhook-filter-config .form-input,
.webhook-filter-config .form-select {
    display: block;
    width: 100%;
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #374151;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.webhook-filter-config .form-input:focus,
.webhook-filter-config .form-select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.webhook-filter-config .form-input:disabled {
    background-color: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
}

.webhook-filter-config .form-checkbox {
    width: 1rem;
    height: 1rem;
    color: #3b82f6;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
}

.webhook-filter-config .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.25rem;
    border: 1px solid transparent;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    text-decoration: none;
}

.webhook-filter-config .btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.webhook-filter-config .btn-secondary {
    color: #374151;
    background-color: #f9fafb;
    border-color: #d1d5db;
}

.webhook-filter-config .btn-secondary:hover {
    background-color: #f3f4f6;
    border-color: #9ca3af;
}

.webhook-filter-config .btn-danger {
    color: #ffffff;
    background-color: #dc2626;
    border-color: #dc2626;
}

.webhook-filter-config .btn-danger:hover {
    background-color: #b91c1c;
    border-color: #b91c1c;
}

.webhook-filter-config .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
}

.webhook-filter-config .grid {
    display: grid;
}

.webhook-filter-config .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
}

.webhook-filter-config .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
}

.webhook-filter-config .gap-3 {
    gap: 0.75rem;
}

.webhook-filter-config .flex {
    display: flex;
}

.webhook-filter-config .justify-between {
    justify-content: space-between;
}

.webhook-filter-config .items-center {
    align-items: center;
}

.webhook-filter-config .items-start {
    align-items: flex-start;
}

.webhook-filter-config .text-center {
    text-align: center;
}

.webhook-filter-config .py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
}

.webhook-filter-config .py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}

.webhook-filter-config .p-2 {
    padding: 0.5rem;
}

.webhook-filter-config .p-3 {
    padding: 0.75rem;
}

.webhook-filter-config .mt-1 {
    margin-top: 0.25rem;
}

.webhook-filter-config .mt-2 {
    margin-top: 0.5rem;
}

.webhook-filter-config .mt-4 {
    margin-top: 1rem;
}

.webhook-filter-config .ml-2 {
    margin-left: 0.5rem;
}

.webhook-filter-config .overflow-x-auto {
    overflow-x: auto;
}

.webhook-filter-config pre {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* Responsive Design */
@media (max-width: 768px) {
    .webhook-filter-config .grid-cols-3 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    
    .webhook-filter-config .flex {
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .webhook-filter-config .justify-between {
        justify-content: flex-start;
    }
}
`
document.head.appendChild(style)

export function WebhookFilterConfig({ config, setConfig }) {
    // Initialize state from config
    let webhookUrl = config.webhook_url || ''
    let conditions = config.conditions ? JSON.parse(config.conditions) : []
    let includeEventData = config.include_event_data !== 'false'
    let customHeaders = config.custom_headers ? JSON.parse(config.custom_headers) : {}

    const OPERATORS = [
        { value: 'equals', label: 'Equals' },
        { value: 'not_equals', label: 'Not Equals' },
        { value: 'contains', label: 'Contains' },
        { value: 'not_contains', label: 'Not Contains' },
        { value: 'starts_with', label: 'Starts With' },
        { value: 'ends_with', label: 'Ends With' },
        { value: 'greater_than', label: 'Greater Than' },
        { value: 'less_than', label: 'Less Than' },
        { value: 'greater_than_or_equal', label: 'Greater Than or Equal' },
        { value: 'less_than_or_equal', label: 'Less Than or Equal' },
        { value: 'is_set', label: 'Is Set' },
        { value: 'is_not_set', label: 'Is Not Set' }
    ]

    const COMMON_PROPERTIES = [
        { value: 'event_name', label: 'Event Name' },
        { value: 'distinct_id', label: 'User ID' },
        { value: 'timestamp', label: 'Timestamp' },
        { value: '$current_url', label: 'Current URL' },
        { value: '$referrer', label: 'Referrer' },
        { value: '$user_agent', label: 'User Agent' },
        { value: '$browser', label: 'Browser' },
        { value: '$os', label: 'Operating System' },
        { value: '$device_type', label: 'Device Type' },
        { value: '$country', label: 'Country' },
        { value: '$city', label: 'City' },
        { value: '$value', label: 'Event Value' }
    ]

    // Helper functions
    function updateConfig() {
        setConfig({
            webhook_url: webhookUrl,
            conditions: JSON.stringify(conditions),
            include_event_data: includeEventData.toString(),
            custom_headers: JSON.stringify(customHeaders)
        })
    }

    function addCondition() {
        conditions.push({ property: 'event_name', operator: 'equals', value: '' })
        updateConfig()
        renderConditions()
    }

    function removeCondition(index) {
        conditions.splice(index, 1)
        updateConfig()
        renderConditions()
    }

    function updateCondition(index, field, value) {
        conditions[index][field] = value
        updateConfig()
        renderConditions()
    }

    function addHeader() {
        const key = document.getElementById('header-key').value
        const value = document.getElementById('header-value').value
        if (key && value) {
            customHeaders[key] = value
            document.getElementById('header-key').value = ''
            document.getElementById('header-value').value = ''
            updateConfig()
            renderHeaders()
        }
    }

    function removeHeader(key) {
        delete customHeaders[key]
        updateConfig()
        renderHeaders()
    }

    function getPropertyLabel(value) {
        const property = COMMON_PROPERTIES.find(p => p.value === value)
        return property ? property.label : value
    }

    function getOperatorLabel(value) {
        const operator = OPERATORS.find(o => o.value === value)
        return operator ? operator.label : value
    }

    // Render functions
    function renderConditions() {
        const container = document.getElementById('conditions-container')
        if (!container) return

        if (conditions.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-muted">
                    <p>No conditions set. All events will be sent to the webhook.</p>
                    <button onclick="addCondition()" class="btn btn-secondary btn-sm mt-2">
                        Add First Condition
                    </button>
                </div>
            `
            return
        }

        container.innerHTML = conditions.map((condition, index) => `
            <div class="border rounded-lg p-4 bg-white mb-4">
                <div class="flex justify-between items-start mb-3">
                    <h4 class="font-medium">Condition ${index + 1}</h4>
                    <button onclick="removeCondition(${index})" class="btn btn-danger btn-sm">
                        Remove
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                        <label class="block text-sm font-medium mb-1">Property</label>
                        <select onchange="updateCondition(${index}, 'property', this.value)" class="form-select w-full">
                            ${COMMON_PROPERTIES.map(p => 
                                `<option value="${p.value}" ${condition.property === p.value ? 'selected' : ''}>${p.label}</option>`
                            ).join('')}
                            <option value="custom" ${condition.property === 'custom' ? 'selected' : ''}>Custom Property...</option>
                        </select>
                        ${condition.property === 'custom' ? `
                            <input type="text" 
                                   value="${condition.property}" 
                                   onchange="updateCondition(${index}, 'property', this.value)"
                                   placeholder="Enter custom property name"
                                   class="form-input w-full mt-2">
                        ` : ''}
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-1">Operator</label>
                        <select onchange="updateCondition(${index}, 'operator', this.value)" class="form-select w-full">
                            ${OPERATORS.map(o => 
                                `<option value="${o.value}" ${condition.operator === o.value ? 'selected' : ''}>${o.label}</option>`
                            ).join('')}
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium mb-1">Value</label>
                        ${['is_set', 'is_not_set'].includes(condition.operator) ? `
                            <input type="text" value="" disabled placeholder="Not needed for this operator" class="form-input w-full">
                        ` : `
                            <input type="text" 
                                   value="${condition.value}" 
                                   onchange="updateCondition(${index}, 'value', this.value)"
                                   placeholder="Enter value"
                                   class="form-input w-full">
                        `}
                    </div>
                </div>
                
                <div class="mt-2 text-xs text-muted">
                    ${getPropertyLabel(condition.property)} ${getOperatorLabel(condition.operator).toLowerCase()}
                    ${!['is_set', 'is_not_set'].includes(condition.operator) ? ` "${condition.value}"` : ''}
                </div>
            </div>
        `).join('')
    }

    function renderHeaders() {
        const container = document.getElementById('headers-container')
        if (!container) return

        if (Object.keys(customHeaders).length === 0) {
            container.innerHTML = '<p class="text-muted">No custom headers added.</p>'
            return
        }

        container.innerHTML = Object.entries(customHeaders).map(([key, value]) => `
            <div class="flex items-center justify-between p-2 bg-white rounded border mb-2">
                <div>
                    <span class="font-medium">${key}:</span>
                    <span class="ml-2 text-muted">${value}</span>
                </div>
                <button onclick="removeHeader('${key}')" class="btn btn-danger btn-sm">
                    Remove
                </button>
            </div>
        `).join('')
    }

    function renderPreview() {
        const container = document.getElementById('config-preview')
        if (!container) return

        container.innerHTML = `
            <pre class="text-xs overflow-x-auto bg-gray-100 p-3 rounded">
${JSON.stringify({
    webhook_url: webhookUrl,
    conditions: conditions,
    include_event_data: includeEventData,
    custom_headers: customHeaders
}, null, 2)}
            </pre>
        `
    }

    // Main render function
    function render() {
        const container = document.getElementById('webhook-filter-config')
        if (!container) return

        container.innerHTML = `
            <div class="space-y-6">
                <!-- Webhook URL Section -->
                <div class="bg-bg-light rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-3">Webhook Configuration</h3>
                    <div class="space-y-3">
                        <div>
                            <label class="block text-sm font-medium mb-1">Webhook URL *</label>
                            <input type="url" 
                                   value="${webhookUrl}" 
                                   onchange="webhookUrl = this.value; updateConfig(); renderPreview()"
                                   placeholder="https://your-api.com/webhook"
                                   class="form-input w-full">
                            <p class="text-xs text-muted mt-1">
                                The HTTP endpoint where filtered events will be sent
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Conditions Section -->
                <div class="bg-bg-light rounded-lg p-4">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-lg font-semibold">Filter Conditions</h3>
                        <button onclick="addCondition()" class="btn btn-secondary btn-sm">
                            Add Condition
                        </button>
                    </div>
                    <div id="conditions-container"></div>
                    ${conditions.length > 0 ? `
                        <div class="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p class="text-sm text-blue-800">
                                <strong>Note:</strong> All conditions must be true for an event to be sent to the webhook.
                            </p>
                        </div>
                    ` : ''}
                </div>

                <!-- Options Section -->
                <div class="bg-bg-light rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-3">Options</h3>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <div>
                                <label class="text-sm font-medium">Include Full Event Data</label>
                                <p class="text-xs text-muted">Send the complete event object in the webhook payload</p>
                            </div>
                            <input type="checkbox" 
                                   ${includeEventData ? 'checked' : ''} 
                                   onchange="includeEventData = this.checked; updateConfig(); renderPreview()"
                                   class="form-checkbox">
                        </div>
                    </div>
                </div>

                <!-- Custom Headers Section -->
                <div class="bg-bg-light rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-3">Custom Headers</h3>
                    <div class="space-y-3">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <input type="text" 
                                   id="header-key"
                                   placeholder="Header name (e.g., Authorization)"
                                   class="form-input w-full">
                            <input type="text" 
                                   id="header-value"
                                   placeholder="Header value (e.g., Bearer token)"
                                   class="form-input w-full">
                            <button onclick="addHeader()" class="btn btn-secondary">
                                Add Header
                            </button>
                        </div>
                        <div id="headers-container"></div>
                    </div>
                </div>

                <!-- Preview Section -->
                <div class="bg-bg-light rounded-lg p-4">
                    <h3 class="text-lg font-semibold mb-3">Configuration Preview</h3>
                    <div id="config-preview"></div>
                </div>
            </div>
        `

        // Render sub-components
        renderConditions()
        renderHeaders()
        renderPreview()
    }

    // Initial render
    render()

    // Make functions globally available for onclick handlers
    window.addCondition = addCondition
    window.removeCondition = removeCondition
    window.updateCondition = updateCondition
    window.addHeader = addHeader
    window.removeHeader = removeHeader
} 