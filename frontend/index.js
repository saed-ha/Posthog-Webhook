// Hello World App for PostHog
// Simple Hello World page

// Add CSS styles
const style = document.createElement('style')
style.textContent = `
.hello-world-app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    padding: 2rem;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.hello-world-app h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hello-world-app p {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: 2rem;
}

.hello-world-app .emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
}

.hello-world-app .config-info {
    background: rgba(255,255,255,0.1);
    padding: 1.5rem;
    border-radius: 10px;
    margin-top: 2rem;
    backdrop-filter: blur(10px);
    max-width: 400px;
}

.hello-world-app .config-info h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.hello-world-app .config-info p {
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    text-align: left;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}
`
document.head.appendChild(style)

// Render Hello World page
function renderHelloWorld(config) {
    const container = document.createElement('div')
    container.className = 'hello-world-app'
    
    // Get config values
    const webhookUrl = config.webhook_url || 'Not configured'
    const messageTemplate = config.message_template || 'Hello World! Event: {event}'
    
    container.innerHTML = `
        <div class="emoji">🚀</div>
        <h1>Hello World!</h1>
        <p>Welcome to your PostHog app</p>
        
        <div class="config-info">
            <h3>Configuration</h3>
            <p><strong>Webhook URL:</strong> ${webhookUrl}</p>
            <p><strong>Message Template:</strong> ${messageTemplate}</p>
        </div>
    `
    
    return container
}

// Export for PostHog
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { renderHelloWorld }
}

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
    // This will be called by PostHog when the app page loads
    window.renderHelloWorldApp = renderHelloWorld
    
    // Also initialize immediately if possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const container = renderHelloWorld({})
            document.body.appendChild(container)
        })
    } else {
        const container = renderHelloWorld({})
        document.body.appendChild(container)
    }
} 