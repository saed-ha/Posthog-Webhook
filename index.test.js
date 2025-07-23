// Tests for Hello World Sidebar Plugin
const { processEvent } = require('./index.js')

// Mock console.log to capture logs
const originalConsoleLog = console.log
let logOutput = []

beforeEach(() => {
    logOutput = []
    console.log = jest.fn((...args) => {
        logOutput.push(args.join(' '))
        originalConsoleLog(...args)
    })
})

afterEach(() => {
    console.log = originalConsoleLog
})

describe('Hello World Sidebar Plugin', () => {
    test('should log when processing events', () => {
        const event = {
            event: 'pageview',
            distinct_id: 'user123',
            properties: { url: '/home' }
        }
        
        const meta = {
            config: {}
        }
        
        processEvent(event, meta)
        
        // Check that the plugin logs its activity
        expect(logOutput.some(log => log.includes('Plugin loaded and processing events'))).toBe(true)
        expect(logOutput.some(log => log.includes('SidebarPlugin'))).toBe(true)
        expect(logOutput.some(log => log.includes('INFO'))).toBe(true)
    })

    test('should handle events without properties', () => {
        const event = {
            event: 'test_event',
            distinct_id: 'user456'
        }
        
        const meta = {
            config: {}
        }
        
        expect(() => {
            processEvent(event, meta)
        }).not.toThrow()
        
        expect(logOutput.some(log => log.includes('Plugin loaded and processing events'))).toBe(true)
    })

    test('should handle empty config', () => {
        const event = {
            event: 'pageview',
            distinct_id: 'user789'
        }
        
        const meta = {}
        
        expect(() => {
            processEvent(event, meta)
        }).not.toThrow()
    })

    test('should log with correct plugin name', () => {
        const event = {
            event: 'test',
            distinct_id: 'user'
        }
        
        const meta = {}
        
        processEvent(event, meta)
        
        expect(logOutput.some(log => log.includes('SidebarPlugin'))).toBe(true)
    })
}) 