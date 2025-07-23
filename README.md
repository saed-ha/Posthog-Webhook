# PostHog Webhook Filter Plugin

A PostHog plugin that allows you to filter events based on configurable conditions and send matching events to an external webhook.

## Features

- **Event Filtering**: Define conditions to filter events based on event name, properties, or other criteria
- **External Webhook**: Send filtered events to any HTTP endpoint
- **Flexible Conditions**: Support for multiple operators (equals, contains, greater than, etc.)
- **Custom Headers**: Add custom headers to webhook requests (e.g., for authentication)
- **Configurable Payload**: Choose whether to include full event data or just essential fields

## Installation

1. Open your PostHog instance
2. Go to Settings → Plugins
3. Click on "Advanced" tab
4. Click "Install from GitHub, GitLab or npm"
5. Enter this repository URL or install from npm

## Configuration

### Required Settings

- **Webhook URL**: The HTTP endpoint where filtered events will be sent

### Optional Settings

- **Filter Conditions**: JSON array of conditions to filter events
- **Include Event Data**: Whether to include the full event data in the webhook payload
- **Custom Headers**: JSON object of custom headers to send with the webhook

## Condition Format

Conditions are defined as a JSON array with the following structure:

```json
[
  {
    "property": "event_name",
    "operator": "equals",
    "value": "pageview"
  },
  {
    "property": "$current_url",
    "operator": "contains",
    "value": "example.com"
  }
]
```

### Supported Properties

- `event_name`: The name of the event
- `distinct_id`: The user's distinct ID
- `timestamp`: The event timestamp
- Any custom property from `event.properties`

### Supported Operators

- `equals`: Exact match
- `not_equals`: Not equal to
- `contains`: Contains substring
- `not_contains`: Does not contain substring
- `starts_with`: Starts with string
- `ends_with`: Ends with string
- `greater_than`: Numeric comparison
- `less_than`: Numeric comparison
- `greater_than_or_equal`: Numeric comparison
- `less_than_or_equal`: Numeric comparison
- `is_set`: Property exists and is not null
- `is_not_set`: Property does not exist or is null

## Example Configurations

### Send all pageview events to webhook

```json
{
  "webhook_url": "https://your-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"equals\", \"value\": \"pageview\"}]"
}
```

### Send events from specific users

```json
{
  "webhook_url": "https://your-api.com/webhook",
  "conditions": "[{\"property\": \"distinct_id\", \"operator\": \"starts_with\", \"value\": \"user_\"}]"
}
```

### Send events with custom property

```json
{
  "webhook_url": "https://your-api.com/webhook",
  "conditions": "[{\"property\": \"$current_url\", \"operator\": \"contains\", \"value\": \"checkout\"}]"
}
```

### Multiple conditions (ALL must be true)

```json
{
  "webhook_url": "https://your-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"equals\", \"value\": \"purchase\"}, {\"property\": \"$value\", \"operator\": \"greater_than\", \"value\": 100}]"
}
```

### With custom headers

```json
{
  "webhook_url": "https://your-api.com/webhook",
  "conditions": "[{\"property\": \"event_name\", \"operator\": \"equals\", \"value\": \"pageview\"}]",
  "custom_headers": "{\"Authorization\": \"Bearer your-token\", \"X-Custom-Header\": \"value\"}"
}
```

## Webhook Payload Format

The webhook will receive a POST request with the following JSON structure:

```json
{
  "event": "pageview",
  "distinct_id": "user123",
  "timestamp": "2024-01-01T12:00:00Z",
  "properties": {
    "$current_url": "https://example.com",
    "$referrer": "https://google.com"
  },
  "full_event": {
    // Complete event object (if include_event_data is true)
  }
}
```

## Development

To run tests:

```bash
npm install
npm test
```

## License

MIT 