// PostHog Site App - Hello World Sidebar
// This file is specifically for PostHog Site Apps integration

import { renderHelloWorldSidebar } from './frontend/index.js'

// Site App configuration
export const siteAppConfig = {
    name: 'Hello World Sidebar',
    description: 'Interactive Hello World page in the sidebar',
    icon: '🚀',
    url: 'https://github.com/saed-ha/Posthog-Webhook.git',
    render: renderHelloWorldSidebar
}

// Initialize the site app
export function initializeSiteApp() {
    console.log('🚀 Hello World Sidebar Site App initialized!')
    renderHelloWorldSidebar()
}

// Export for PostHog
export default {
    siteAppConfig,
    initializeSiteApp
} 