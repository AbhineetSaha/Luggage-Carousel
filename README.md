# Luggage Carousel

A production-ready web application simulating a luggage carousel system with drag-and-drop functionality and LIFO (Last In, First Out) unloading logic.

![Luggage Carousel Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://yourusername.github.io/luggage-carousel/)

## Live Demo

**[View Live Demo](https://yourusername.github.io/luggage-carousel/)** _(Replace with your actual GitHub Pages URL)_

## Features

### Core Functionality

- **Infinite Luggage Carousel**: Continuously spawning luggage items that move from left to right
- **Native HTML5 Drag & Drop**: Drag luggage from the carousel to storage cells without external libraries
- **3×3 Storage Grid**:
  - Top row marked as **Priority** (dotted orange border)
  - Each cell holds exactly one luggage item
  - Visual feedback on hover and drag-over states
- **LIFO Unload Logic**:
  - Priority row unloads first (last-in, first-out)
  - Then regular rows (also LIFO)
  - Animated unloading with smooth transitions

### Technical Highlights

- Zero External DnD Libraries - Pure HTML5 Drag & Drop API
- Optimized Animations - requestAnimationFrame for smooth 60fps movement
- Memory Efficient - Automatic luggage recycling prevents DOM bloat
- TypeScript Strong Typing - Full type safety across the application
- Responsive Design - Works on desktop and tablet devices
- Production Build - Optimized for deployment to GitHub Pages

## Tech Stack

| Technology                | Purpose                                 |
| ------------------------- | --------------------------------------- |
| **React 19**              | UI framework with functional components |
| **TypeScript**            | Type-safe development                   |
| **Vite**                  | Fast build tool and dev server          |
| **Tailwind CSS**          | Utility-first styling                   |
| **HTML5 Drag & Drop API** | Native browser drag-and-drop            |
| **Vitest**                | Unit testing framework                  |
| **Playwright**            | End-to-end testing framework            |
| **Husky**                 | Git hooks for pre-commit checks         |
| **Size Limit**            | Bundle size monitoring                  |

## Testing

### Unit Tests (Vitest)

Run unit tests for components, hooks, and utilities:

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Generate coverage report
npm run test:coverage

# Run tests with UI
npm run test:ui
```

**Test Coverage:**

- ✅ All React components
- ✅ Custom hooks (useCarouselAnimation, useDragAndDrop)
- ✅ Utility functions and constants
- ✅ 35+ test cases with 100% coverage goal

### E2E Tests (Playwright)

Run end-to-end tests for full application workflows:

```bash
# Run E2E tests headless
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

**E2E Test Scenarios:**

- ✅ Carousel animation and luggage spawning
- ✅ Drag and drop interactions
- ✅ Storage grid functionality
- ✅ LIFO unload logic
- ✅ Responsive design on mobile
- ✅ Cross-browser compatibility

### Pre-commit Hooks

Husky is configured to run linting and tests before each commit:

```bash
# Automatically runs on git commit
- ESLint fixes
- Related unit tests
- Code formatting (Prettier)
```

### Bundle Size Monitoring

Check bundle size to ensure performance:

```bash
# Check current bundle size
npm run size

# Analyze bundle composition
npm run size:why
```

**Size Limits:**

- Main JS Bundle: < 100 KB (gzipped)
- CSS Bundle: < 10 KB (gzipped)

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/luggage-carousel.git
   cd luggage-carousel
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🚢 Deployment

### GitHub Pages Deployment

#### Option 1: Manual Deployment

```bash
npm run deploy
```

This will:

1. Build the production bundle
2. Deploy to the `gh-pages` branch
3. Make your app available at `https://yourusername.github.io/luggage-carousel/`

#### Option 2: Automated CI/CD with GitHub Actions

This repository includes comprehensive GitHub Actions workflows:

**CI/CD Pipeline (`.github/workflows/ci-cd.yml`):**

- ✅ Linting (ESLint)
- ✅ Type checking (TypeScript)
- ✅ Unit tests (Vitest)
- ✅ E2E tests (Playwright)
- ✅ Build verification
- ✅ Automatic deployment to GitHub Pages on main branch

**Bundle Size Check (`.github/workflows/size-check.yml`):**

- 📦 Monitors bundle size on pull requests
- 🚨 Alerts if bundle exceeds limits

**Setup:**

1. Go to your repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. Push to `main` branch - deployment happens automatically!
4. (Optional) Add `CODECOV_TOKEN` secret for code coverage reports

## 📁 Project Structure

```
luggage-carousel/
├── public/              # Static assets
├── src/
│   ├── components/
│   │   ├── Carousel/
│   │   │   ├── Carousel.tsx          # Carousel container
│   │   │   ├── Carousel.test.tsx     # Carousel tests
│   │   │   ├── LuggageItem.tsx       # Individual luggage item
│   │   │   └── LuggageItem.test.tsx  # LuggageItem tests
│   │   ├── Storage/
│   │   │   ├── StorageGrid.tsx       # 3×3 grid container
│   │   │   ├── StorageGrid.test.tsx  # StorageGrid tests
│   │   │   └── StorageCell.tsx       # Individual storage cell
│   │   └── Controls/
│   │       └── UnloadButton.tsx      # LIFO unload button
│   ├── hooks/
│   │   ├── useCarouselAnimation.ts      # Carousel movement logic
│   │   ├── useCarouselAnimation.test.ts # Hook tests
│   │   ├── useDragAndDrop.ts            # Drag state management
│   │   └── useDragAndDrop.test.ts       # Hook tests
│   ├── utils/
│   │   ├── constants.ts                 # App constants
│   │   └── constants.test.ts            # Constants tests
│   ├── types/
│   │   └── luggage.ts                   # TypeScript type definitions
│   ├── test/
│   │   ├── setup.ts                     # Test setup
│   │   └── utils.tsx                    # Test utilities
│   ├── App.tsx                          # Main app component
│   ├── App.test.tsx                     # App tests
│   ├── main.tsx                         # React entry point
│   └── index.css                        # Global styles
├── e2e/
│   └── luggage-carousel.spec.ts    # E2E test suite
├── .github/
│   └── workflows/
│       ├── ci-cd.yml               # Main CI/CD pipeline
│       └── size-check.yml          # Bundle size monitoring
├── .husky/
│   └── pre-commit                  # Pre-commit hooks
├── vite.config.ts                  # Vite configuration
├── vitest.config.ts                # Vitest configuration
├── playwright.config.ts            # Playwright configuration
├── .size-limit.cjs                 # Size limit configuration
├── tailwind.config.cjs             # Tailwind CSS config
├── tsconfig.json                   # TypeScript config
└── package.json
```

## 🎮 How to Use

1. **Watch the Carousel**: Luggage items spawn automatically every 2 seconds
2. **Drag & Drop**:
   - Click and hold any luggage item on the carousel
   - Drag it to an empty storage cell
   - Release to drop it in the cell
3. **Unload**:
   - Click the "🚚 Unload Storage (LIFO)" button
   - Priority row items unload first (last dropped, first unloaded)
   - Then regular rows unload (also LIFO)

## 🧩 Key Implementation Details

### Animation Loop

Uses `requestAnimationFrame` for optimal performance:

- Spawns new luggage every 2 seconds
- Moves luggage at 2px per frame
- Removes off-screen items to prevent memory leaks

### Drag & Drop Flow

```typescript
1. onDragStart → Store dragged luggage reference
2. onDragOver  → Prevent default, allow drop
3. onDrop      → Add luggage to cell, remove from carousel
4. onDragEnd   → Clear drag state
```

### LIFO Unload Logic

```typescript
Priority cells (indices 0-2):
  - Find last filled priority cell
  - Unload from there first

Regular cells (indices 3-8):
  - If no priority cells, unload from last filled regular cell
```

## 📝 Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint                       |
| `npm run deploy`  | Deploy to GitHub Pages           |

## 🐛 Troubleshooting

**Issue**: Carousel not animating

- **Fix**: Check browser console for errors. Ensure React 19 is installed.

**Issue**: Drag & Drop not working

- **Fix**: This app uses native HTML5 DnD, which doesn't work on touch devices without additional polyfills.

**Issue**: GitHub Pages shows 404

- **Fix**: Ensure `base: "/luggage-carousel/"` in `vite.config.ts` matches your repo name.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with React, TypeScript, Vite, and Tailwind CSS.

## 🙏 Acknowledgments

- Built as a demonstration of React best practices
- Uses native browser APIs for optimal performance
- Inspired by real-world luggage carousel systems

---

**⭐ If you found this project helpful, please consider giving it a star!**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
globalIgnores(['dist']),
{
files: ['**/*.{ts,tsx}'],
extends: [
// Other configs...
// Enable lint rules for React
reactX.configs['recommended-typescript'],
// Enable lint rules for React DOM
reactDom.configs.recommended,
],
languageOptions: {
parserOptions: {
project: ['./tsconfig.node.json', './tsconfig.app.json'],
tsconfigRootDir: import.meta.dirname,
},
// other options...
},
},
])

```

```
