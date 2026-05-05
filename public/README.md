# Public Assets

This directory contains static assets that are served directly by Next.js.

## Current Assets

- `placeholder-logo.png` - Logo placeholder image
- `placeholder-logo.svg` - Logo placeholder SVG
- `placeholder-user.jpg` - User avatar placeholder
- `placeholder.jpg` - General placeholder image
- `placeholder.svg` - General placeholder SVG

## Recommended Structure

```
public/
├── images/
│   ├── logos/
│   ├── avatars/
│   └── general/
├── icons/
│   ├── favicon.ico
│   └── app-icons/
└── documents/
    └── templates/
```

## Usage

Reference these assets in your components using the root path:
```jsx
<img src="/placeholder-logo.svg" alt="Logo" />
