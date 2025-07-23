// PostHog Plugin - Hello World Sidebar
// Simple plugin that shows Hello World in the sidebar

function processEvent(event, meta) {
    // This plugin doesn't process events, it just shows a sidebar page
    console.log('[HelloWorldPlugin] Plugin is running')
}

module.exports = {
    processEvent
} 