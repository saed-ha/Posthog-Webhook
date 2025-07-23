// Hello World Sidebar Plugin
// This component shows a simple Hello World page in the PostHog sidebar

// Load CSS styles
const style = document.createElement('style')
style.textContent = `
.hello-world-sidebar {
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

.hello-world-sidebar h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hello-world-sidebar p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.hello-world-sidebar .emoji {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: bounce 2s infinite;
}

.hello-world-sidebar .timestamp {
    font-size: 0.9rem;
    opacity: 0.7;
    margin-top: 2rem;
}

.hello-world-sidebar .features {
    background: rgba(255,255,255,0.1);
    padding: 1.5rem;
    border-radius: 10px;
    margin-top: 2rem;
    backdrop-filter: blur(10px);
}

.hello-world-sidebar .features h3 {
    margin-bottom: 1rem;
    font-size: 1.3rem;
}

.hello-world-sidebar .features ul {
    list-style: none;
    padding: 0;
    text-align: left;
}

.hello-world-sidebar .features li {
    padding: 0.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.hello-world-sidebar .features li:last-child {
    border-bottom: none;
}

.hello-world-sidebar .features li:before {
    content: "✨ ";
    margin-right: 0.5rem;
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

.hello-world-sidebar .button {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.5rem;
    text-decoration: none;
    display: inline-block;
}

.hello-world-sidebar .button:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.hello-world-sidebar .stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
    max-width: 300px;
}

.hello-world-sidebar .stat {
    background: rgba(255,255,255,0.1);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
}

.hello-world-sidebar .stat-number {
    font-size: 2rem;
    font-weight: bold;
    display: block;
}

.hello-world-sidebar .stat-label {
    font-size: 0.8rem;
    opacity: 0.8;
}
`
document.head.appendChild(style)

export function HelloWorldSidebar({ config, setConfig }) {
    const [clickCount, setClickCount] = useState(0)
    const [currentTime, setCurrentTime] = useState(new Date())

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleClick = () => {
        setClickCount(prev => prev + 1)
    }

    const resetCount = () => {
        setClickCount(0)
    }

    return (
        <div className="hello-world-sidebar">
            <div className="emoji">🚀</div>
            <h1>Hello World!</h1>
            <p>Welcome to your custom PostHog sidebar plugin</p>
            
            <div className="stats">
                <div className="stat">
                    <span className="stat-number">{clickCount}</span>
                    <span className="stat-label">Clicks</span>
                </div>
                <div className="stat">
                    <span className="stat-number">{currentTime.getHours().toString().padStart(2, '0')}:{currentTime.getMinutes().toString().padStart(2, '0')}</span>
                    <span className="stat-label">Current Time</span>
                </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
                <button className="button" onClick={handleClick}>
                    Click Me! 🎯
                </button>
                <button className="button" onClick={resetCount}>
                    Reset Count 🔄
                </button>
            </div>

            <div className="features">
                <h3>Plugin Features</h3>
                <ul>
                    <li>Custom sidebar page</li>
                    <li>Interactive buttons</li>
                    <li>Real-time clock</li>
                    <li>Click counter</li>
                    <li>Beautiful design</li>
                    <li>Responsive layout</li>
                </ul>
            </div>

            <div className="timestamp">
                Last updated: {currentTime.toLocaleString()}
            </div>
        </div>
    )
}

// Simple state management for React-like functionality
function useState(initialValue) {
    let state = initialValue
    const setState = (newValue) => {
        state = typeof newValue === 'function' ? newValue(state) : newValue
        // Re-render the component
        renderComponent()
    }
    return [state, setState]
}

function useEffect(callback, dependencies) {
    // Simple effect implementation
    callback()
}

// Main render function
function renderComponent() {
    const container = document.getElementById('hello-world-sidebar')
    if (!container) return

    // Get current state
    const currentTime = new Date()
    
    container.innerHTML = `
        <div class="hello-world-sidebar">
            <div class="emoji">🚀</div>
            <h1>Hello World!</h1>
            <p>Welcome to your custom PostHog sidebar plugin</p>
            
            <div class="stats">
                <div class="stat">
                    <span class="stat-number" id="click-count">0</span>
                    <span class="stat-label">Clicks</span>
                </div>
                <div class="stat">
                    <span class="stat-number">${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}</span>
                    <span class="stat-label">Current Time</span>
                </div>
            </div>

            <div style="margin-top: 2rem;">
                <button class="button" onclick="handleClick()">
                    Click Me! 🎯
                </button>
                <button class="button" onclick="resetCount()">
                    Reset Count 🔄
                </button>
            </div>

            <div class="features">
                <h3>Plugin Features</h3>
                <ul>
                    <li>Custom sidebar page</li>
                    <li>Interactive buttons</li>
                    <li>Real-time clock</li>
                    <li>Click counter</li>
                    <li>Beautiful design</li>
                    <li>Responsive layout</li>
                </ul>
            </div>

            <div class="timestamp">
                Last updated: ${currentTime.toLocaleString()}
            </div>
        </div>
    `

    // Add click handlers
    window.handleClick = function() {
        const clickCountElement = document.getElementById('click-count')
        const currentCount = parseInt(clickCountElement.textContent) || 0
        clickCountElement.textContent = currentCount + 1
    }

    window.resetCount = function() {
        const clickCountElement = document.getElementById('click-count')
        clickCountElement.textContent = '0'
    }

    // Update time every second
    setInterval(() => {
        const timeElement = document.querySelector('.stat-number:last-child')
        if (timeElement) {
            const now = new Date()
            timeElement.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
        }
    }, 1000)
}

// Initialize the component
renderComponent() 