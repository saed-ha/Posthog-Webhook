const { processEvent } = require('./index')

// Mock axios
const axios = require('axios')
jest.mock('axios')

describe('Webhook Filter Plugin', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        axios.post.mockResolvedValue({ status: 200 })
    })

    describe('Condition Evaluation', () => {
        const mockEvent = {
            event: 'pageview',
            distinct_id: 'user123',
            timestamp: '2024-01-01T12:00:00Z',
            properties: {
                '$current_url': 'https://example.com/page',
                '$referrer': 'https://google.com',
                'value': 150,
                'category': 'electronics'
            }
        }

        test('should send event when no conditions are set', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[]'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).toHaveBeenCalledWith(
                'https://test.com/webhook',
                expect.objectContaining({
                    event: 'pageview',
                    distinct_id: 'user123'
                }),
                expect.any(Object)
            )
        })

        test('should send event when conditions match', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "event_name", "operator": "equals", "value": "pageview"}]'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).toHaveBeenCalled()
        })

        test('should not send event when conditions do not match', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "event_name", "operator": "equals", "value": "purchase"}]'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).not.toHaveBeenCalled()
        })

        test('should handle multiple conditions (ALL must be true)', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "event_name", "operator": "equals", "value": "pageview"}, {"property": "$current_url", "operator": "contains", "value": "example.com"}]'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).toHaveBeenCalled()
        })

        test('should not send when one condition fails', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "event_name", "operator": "equals", "value": "pageview"}, {"property": "$current_url", "operator": "contains", "value": "nonexistent.com"}]'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).not.toHaveBeenCalled()
        })
    })

    describe('Operators', () => {
        const mockEvent = {
            event: 'test',
            distinct_id: 'user123',
            properties: {
                'string_prop': 'hello world',
                'number_prop': 100,
                'url_prop': 'https://example.com/page'
            }
        }

        test('equals operator', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "string_prop", "operator": "equals", "value": "hello world"}]'
                }
            }

            processEvent(mockEvent, meta)
            expect(axios.post).toHaveBeenCalled()
        })

        test('contains operator', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "string_prop", "operator": "contains", "value": "hello"}]'
                }
            }

            processEvent(mockEvent, meta)
            expect(axios.post).toHaveBeenCalled()
        })

        test('starts_with operator', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "string_prop", "operator": "starts_with", "value": "hello"}]'
                }
            }

            processEvent(mockEvent, meta)
            expect(axios.post).toHaveBeenCalled()
        })

        test('greater_than operator', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "number_prop", "operator": "greater_than", "value": 50}]'
                }
            }

            processEvent(mockEvent, meta)
            expect(axios.post).toHaveBeenCalled()
        })

        test('is_set operator', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[{"property": "string_prop", "operator": "is_set", "value": null}]'
                }
            }

            processEvent(mockEvent, meta)
            expect(axios.post).toHaveBeenCalled()
        })
    })

    describe('Webhook Configuration', () => {
        const mockEvent = {
            event: 'pageview',
            distinct_id: 'user123',
            properties: {}
        }

        test('should not send when webhook URL is not configured', () => {
            const meta = {
                config: {}
            }

            processEvent(mockEvent, meta)

            expect(axios.post).not.toHaveBeenCalled()
        })

        test('should include custom headers', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[]',
                    custom_headers: '{"Authorization": "Bearer token", "X-Custom": "value"}'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).toHaveBeenCalledWith(
                'https://test.com/webhook',
                expect.any(Object),
                expect.objectContaining({
                    headers: expect.objectContaining({
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer token',
                        'X-Custom': 'value'
                    })
                })
            )
        })

        test('should handle webhook errors gracefully', () => {
            axios.post.mockRejectedValue(new Error('Network error'))

            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[]'
                }
            }

            // Should not throw error
            expect(() => {
                processEvent(mockEvent, meta)
            }).not.toThrow()
        })
    })

    describe('Payload Format', () => {
        const mockEvent = {
            event: 'pageview',
            distinct_id: 'user123',
            timestamp: '2024-01-01T12:00:00Z',
            properties: {
                '$current_url': 'https://example.com'
            }
        }

        test('should send basic payload by default', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[]'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).toHaveBeenCalledWith(
                'https://test.com/webhook',
                expect.objectContaining({
                    event: 'pageview',
                    distinct_id: 'user123',
                    timestamp: '2024-01-01T12:00:00Z',
                    properties: {
                        '$current_url': 'https://example.com'
                    }
                }),
                expect.any(Object)
            )
        })

        test('should include full event when include_event_data is true', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[]',
                    include_event_data: 'true'
                }
            }

            processEvent(mockEvent, meta)

            expect(axios.post).toHaveBeenCalledWith(
                'https://test.com/webhook',
                expect.objectContaining({
                    full_event: mockEvent
                }),
                expect.any(Object)
            )
        })

        test('should not include full event when include_event_data is false', () => {
            const meta = {
                config: {
                    webhook_url: 'https://test.com/webhook',
                    conditions: '[]',
                    include_event_data: 'false'
                }
            }

            processEvent(mockEvent, meta)

            const callArgs = axios.post.mock.calls[0]
            expect(callArgs[1]).not.toHaveProperty('full_event')
        })
    })
}) 