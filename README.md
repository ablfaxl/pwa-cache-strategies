# PWA Cache Strategies

A React-based Progressive Web App (PWA) implemented with Vite, showcasing various caching strategies using Workbox. This repository demonstrates how to configure and utilize caching strategies to optimize performance and offline capabilities in a PWA.

## Features

- **React and Vite Integration**: Fast and modern development setup using Vite and React.
- **Service Worker Setup**: Configured with Workbox for efficient caching and offline capabilities.
- **Versioned Service Worker**: Implements versioning to manage service worker updates and cache invalidation.
- **Custom Caching Strategies**: Demonstrates different caching strategies including `CacheFirst`, `StaleWhileRevalidate`, and runtime caching.
- **Asset Caching**: Pre-caches static assets like JavaScript, CSS, HTML, and images.
- **Specific Asset Caching**: Example of caching specific assets like `/images/pwa.png` with custom expiration policies.
- **PWA Manifest**: Configured manifest file with app icons, theme color, and display options for a better user experience.

## Getting Started

### Prerequisites

- Node.js (>=18.x)
- npm (>=6.x) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ablfaxl/pwa-cache-strategies.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pwa-cache-strategies
   ```
3. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Production

To start the production server:

```bash
npm run build
npm run preview
# or
yarn build
yarn preview
# or
pnpm build
pnpm preview
```
