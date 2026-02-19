# Chess Clock

Professional chess clock web app — Progressive Web App (PWA) with install support.

- Theme colors used in assets and icons: Blue and Maze Yellow.

## Features

- Installable PWA (standalone display)
- Offline fallback page for quick offline messaging
- Service worker for asset precaching (via VitePWA)
- Responsive, full-screen clock halves with easy tap controls

## Quick start

1. Install dependencies:

```bash
npm install
```

2. Run in development (localhost):

```bash
npm run dev
```

3. Build and preview production:

```bash
npm run build
npm run preview    # or npm run preview:host to bind to network
```

Open the site in Chrome (or Safari on iOS) and use *Add to Home Screen* to install.

## PWA notes

- Manifest: `public/manifest.webmanifest` (start_url, display: `standalone`)
- Service worker: injected by `vite-plugin-pwa` and registered in `index.tsx`
- Icons: `public/icons/` (replace placeholder PNGs with final artwork if desired)
- Offline fallback: `public/offline.html`

## Contributing / Git

This project is tracked in this repository. To contribute:

```bash
git checkout -b my-feature
# make changes
git add -A
git commit -m "feat: description"
git push origin my-feature
# Open a Pull Request on GitHub
```

## License

MIT
