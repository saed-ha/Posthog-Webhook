// Hello World Sidebar Plugin
// Simple Hello World page for PostHog sidebar

// Add CSS styles
const style = document.createElement('style')
style.textContent = `
.hello-world {
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

.hello-world h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hello-world p {
    font-size: 1.2rem;
    opacity: 0.9;
}

.hello-world .emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
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
function renderHelloWorld() {
    const container = document.createElement('div')
    container.className = 'hello-world'
    container.innerHTML = `
        <div class="emoji">🚀</div>
        <h1>Hello World!</h1>
        <p>Welcome to your PostHog sidebar plugin</p>
    `
    
    // Add to page
    document.body.appendChild(container)
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderHelloWorld)
} else {
    renderHelloWorld()
} 