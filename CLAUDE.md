# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Fury of Thor" is a static web game project built with vanilla HTML, CSS, and JavaScript. The project uses a responsive design approach with different background images for desktop and mobile devices. Assets (backgrounds, wooden board images) are hosted on Cloudinary.

## Project Structure

```
fury-of-thor/
├── index.html              # Main entry point
├── css/styles.css          # All styling and responsive design
├── js/script.js           # Game logic (currently minimal)
├── assets/fonts/          # Custom BoldPixels font (OTF and TTF)
└── README.md              # Project documentation
```

## Development

This is a static website project with no build process or package manager. Changes can be tested by opening `index.html` directly in a browser or using a local development server.

### Testing Changes

To test the site locally:
```bash
# Option 1: Open directly in browser
start index.html  # Windows
open index.html   # macOS
xdg-open index.html  # Linux

# Option 2: Use a simple HTTP server (if Python is available)
python -m http.server 8000
# Then navigate to http://localhost:8000
```

## Architecture Notes

### UI Structure
- The project uses a screen-based UI system where different game states/screens are represented by elements with class `screen`
- Currently implements `#home-screen` with a wooden board overlay containing the game title
- The wooden board serves as a container for UI elements, with absolutely positioned content overlaid on top

### Styling Approach
- Uses a custom pixel-art font (BoldPixels) for the retro game aesthetic
- Responsive design via media queries: desktop (>768px) and mobile (≤768px)
- Different Cloudinary-hosted backgrounds for each viewport size
- Gradient text effects with stroke for the game title using `-webkit-background-clip` and `-webkit-text-stroke`

### Asset Management
- External assets are hosted on Cloudinary CDN
- Background images are different for mobile vs desktop (mobile-background-start-cropped vs desktop-background-start-cropped)
- Fonts are stored locally in `assets/fonts/` with both OTF and TTF formats for browser compatibility

## Git Workflow

Main branch: `main`
Current branch: `alvaro`

When committing changes, follow the existing commit message style (lowercase, concise descriptions like "added main menu board", "Added image background").
